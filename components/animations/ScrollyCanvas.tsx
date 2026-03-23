'use client'
import { useEffect, useRef, useCallback } from 'react'

// Image sequence scrubbing via scroll.
// Expected assets (optional):
// - public/images/frames/frame-001.jpg ... frame-060.jpg
// - (or .webp equivalents)
const TOTAL_FRAMES = 60
const FRAME_DIR = '/images/frames'
const FRAME_EXTS: Array<'webp' | 'jpg'> = ['webp', 'jpg']

function frameNumberToSlug(index: number) {
  return String(index + 1).padStart(3, '0')
}

function getFrameUrl(index: number, ext: 'webp' | 'jpg') {
  return `${FRAME_DIR}/frame-${frameNumberToSlug(index)}.${ext}`
}

// Procedural "frame" renderer — creates a visual when no images are available
function drawProceduralFrame(ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) {
  ctx.clearRect(0, 0, w, h)

  // Sky gradient interpolating from dawn → midday → dusk based on progress
  const r1 = Math.round(26  + (234 - 26)  * progress)
  const g1 = Math.round(26  + (242 - 26)  * progress)
  const b1 = Math.round(46  + (251 - 46)  * progress)
  const r2 = Math.round(249 + (10  - 249) * progress)
  const g2 = Math.round(248 + (102 - 248) * progress)
  const b2 = Math.round(246 + (194 - 246) * progress)

  const grad = ctx.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, `rgb(${r1},${g1},${b1})`)
  grad.addColorStop(1, `rgb(${r2},${g2},${b2})`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Grid dots
  ctx.fillStyle = `rgba(255,255,255,${0.03 + progress * 0.05})`
  for (let x = 0; x < w; x += 28) {
    for (let y = 0; y < h; y += 28) {
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Floating geometric shapes — simulates depth/motion
  const numShapes = 6
  for (let i = 0; i < numShapes; i++) {
    const phase = (i / numShapes) + progress
    const x = w * 0.1 + (w * 0.8) * ((Math.sin(phase * Math.PI * 2) + 1) / 2)
    const y = h * 0.2 + (h * 0.6) * ((i / numShapes) + progress * 0.3) % 1
    const size = 40 + i * 20 + progress * 60
    const alpha = 0.04 + (0.06 * Math.sin(phase * Math.PI))

    ctx.save()
    ctx.globalAlpha = alpha
    ctx.strokeStyle = i % 2 === 0 ? '#0A66C2' : '#1A1A2E'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }
}

export default function ScrollyCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const imagesRef    = useRef<Array<HTMLImageElement | undefined>>([])
  const frameRef     = useRef(0)
  const rafRef       = useRef<number>(0)
  const loadedRef    = useRef(false)

  // Load frames if URLs exist
  useEffect(() => {
    // Avoid heavy work for reduced motion.
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    if (reduceMotion) {
      loadedRef.current = true
      imagesRef.current = []
      return
    }

    let mounted = true
    const tryLoadFirstFrameExists = () =>
      new Promise<boolean>((resolve) => {
        const img = new Image()
        img.decoding = 'async'

        let extIndex = 0
        const tryExt = () => {
          const ext = FRAME_EXTS[extIndex]
          if (!ext) return resolve(false)

          img.onload = () => resolve(true)
          img.onerror = () => {
            extIndex++
            tryExt()
          }

          img.src = getFrameUrl(0, ext)
        }

        tryExt()
      })

    tryLoadFirstFrameExists().then((exists) => {
      if (!mounted) return
      if (!exists) {
        // No image sequence assets provided; procedural fallback only.
        loadedRef.current = true
        imagesRef.current = []
        return
      }

      let loadedCount = 0
      const images: Array<HTMLImageElement | undefined> = new Array(TOTAL_FRAMES)

      // Concurrency-limited preloader to avoid blocking the main thread.
      const maxConcurrent = 6
      let inFlight = 0
      let nextIndex = 0

      const loadNext = () => {
        if (!mounted) return
        while (inFlight < maxConcurrent && nextIndex < TOTAL_FRAMES) {
          const index = nextIndex++
          inFlight++

          const img = new Image()
          img.decoding = 'async'

          let extIndex = 0
          const tryExt = () => {
            const ext = FRAME_EXTS[extIndex]
            if (!ext) {
              inFlight--
              loadNext()
              return
            }

            img.onload = () => {
              if (!mounted) return
              images[index] = img
              loadedCount++
              inFlight--
              // Mark as ready once at least one frame is loaded; draw will progressively enhance.
              if (loadedCount > 0) loadedRef.current = true
              loadNext()
            }

            img.onerror = () => {
              extIndex++
              tryExt()
            }

            img.src = getFrameUrl(index, ext)
          }

          tryExt()
        }
      }

      loadNext()
      imagesRef.current = images
    })

    // Safety net: if sequence exists but is slow, we still keep procedural fallback responsive.
    const fallbackTimeout = window.setTimeout(() => {
      if (!mounted) return
      loadedRef.current = true
    }, 6000)

    return () => {
      mounted = false
      window.clearTimeout(fallbackTimeout)
    }
  }, [])

  // Draw frame — cover logic for canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const progress = index / Math.max(TOTAL_FRAMES - 1, 1)
    const img = imagesRef.current[index]

    if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      // Object-fit: cover
      const imgAR = img.naturalWidth / img.naturalHeight
      const canvasAR = w / h
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

      if (imgAR > canvasAR) {
        sw = img.naturalHeight * canvasAR
        sx = (img.naturalWidth - sw) / 2
      } else {
        sh = img.naturalWidth / canvasAR
        sy = (img.naturalHeight - sh) / 2
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h)
    } else {
      // Procedural fallback
      drawProceduralFrame(ctx, w, h, progress)
    }
  }, [])

  // Scroll-scrub handler (GSAP ScrollTrigger)
  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    if (reduceMotion) {
      drawFrame(0)
      return
    }

    const container = document.getElementById('scrolly-container')
    if (!container) return

    let killed = false
    let st: any = null

    const setup = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (killed) return
      gsap.registerPlugin(ScrollTrigger)

      st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self: any) => {
          const progress = Math.min(1, Math.max(0, self.progress ?? 0))
          const newFrame = Math.round(progress * (TOTAL_FRAMES - 1))

          if (newFrame !== frameRef.current) {
            frameRef.current = newFrame
            cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => drawFrame(newFrame))
          }
        },
      })
    }

    setup()

    return () => {
      killed = true
      st?.kill?.()
      cancelAnimationFrame(rafRef.current)
    }
  }, [drawFrame])

  // Resize handler — maintain pixel-perfect canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      drawFrame(frameRef.current)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  // Initial draw
  useEffect(() => { drawFrame(0) }, [drawFrame])

  return (
    <div
      id="scrolly-container"
      className="relative"
      style={{ height: '500vh' }}
    >
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          aria-hidden="true"
          style={{ display: 'block' }}
        />
        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(26,26,46,0.15) 0%, rgba(26,26,46,0.05) 50%, rgba(26,26,46,0.2) 100%)' }}
        />
      </div>
    </div>
  )
}
