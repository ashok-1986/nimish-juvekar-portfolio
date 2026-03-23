'use client'
import { useEffect, useRef, useCallback } from 'react'

// Placeholder frame URLs — replace with actual image sequence
// For production: use a folder of /images/frames/frame-001.jpg ... frame-060.jpg
const TOTAL_FRAMES = 60

function getFrameUrl(_index: number): string | null {
  // Replace with: return `/images/frames/frame-${String(_index + 1).padStart(3, '0')}.jpg`
  return null // procedural fallback active until images are provided
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
  const imagesRef    = useRef<HTMLImageElement[]>([])
  const frameRef     = useRef(0)
  const rafRef       = useRef<number>(0)
  const loadedRef    = useRef(false)

  // Load frames if URLs exist
  useEffect(() => {
    const allUrls = Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameUrl(i))
    const urls: string[] = allUrls.filter((u): u is string => u !== null)
    if (urls.length === 0) { loadedRef.current = true; return }

    let loaded = 0
    const images: HTMLImageElement[] = []

    urls.forEach((url, i) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        loaded++
        if (loaded === urls.length) loadedRef.current = true
      }
      images[i] = img
    })
    imagesRef.current = images
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

    if (img && img.complete) {
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

  // Scroll handler
  useEffect(() => {
    const container = document.getElementById('scrolly-container')
    if (!container) return

    const onScroll = () => {
      const rect   = container.getBoundingClientRect()
      const total  = container.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress  = Math.min(1, scrolled / total)
      const newFrame  = Math.round(progress * (TOTAL_FRAMES - 1))

      if (newFrame !== frameRef.current) {
        frameRef.current = newFrame
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawFrame(newFrame))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [drawFrame])

  // Resize handler — maintain pixel-perfect canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width  = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      const ctx = canvas.getContext('2d')
      ctx?.scale(dpr, dpr)
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
