'use client'

import { useEffect, useRef, useCallback } from 'react'

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Update TOTAL_FRAMES to match your actual frame count
// Run: (ls public/images/frames/).Count in PowerShell to get the number
const TOTAL_FRAMES = 60
const FRAME_PATH = (i: number) =>
  `/images/frames/frame-${String(i + 1).padStart(3, '0')}.jpg`
// ─────────────────────────────────────────────────────────────────────────────

export default function ScrollyCanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const imagesRef  = useRef<HTMLImageElement[]>([])
  const loadedRef  = useRef<boolean[]>([])
  const frameRef   = useRef(0)
  const rafRef     = useRef<number>(0)
  const ctxRef     = useRef<CanvasRenderingContext2D | null>(null)

  // Draw a single frame with object-fit:cover logic
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx    = ctxRef.current
    if (!canvas || !ctx) return

    const dpr = window.devicePixelRatio || 1
    const cw  = canvas.width  / dpr
    const ch  = canvas.height / dpr
    const img = imagesRef.current[index]

    if (img && loadedRef.current[index]) {
      const imgAR    = img.naturalWidth / img.naturalHeight
      const canvasAR = cw / ch
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

      if (imgAR > canvasAR) {
        sw = img.naturalHeight * canvasAR
        sx = (img.naturalWidth - sw) / 2
      } else {
        sh = img.naturalWidth / canvasAR
        sy = (img.naturalHeight - sh) / 2
      }

      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
    } else {
      // Animated gradient fallback while images load
      const progress = index / Math.max(TOTAL_FRAMES - 1, 1)
      const grad = ctx.createLinearGradient(0, 0, 0, ch)
      const r = Math.round(249 - (249 - 26) * progress)
      const g = Math.round(248 - (248 - 26) * progress)
      const b = Math.round(246 - (246 - 46) * progress)
      grad.addColorStop(0, `rgb(${r},${g},${b})`)
      grad.addColorStop(1, '#0A66C2')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, cw, ch)

      // Dot grid
      ctx.fillStyle = `rgba(26,26,46,${0.02 + progress * 0.04})`
      for (let x = 0; x < cw; x += 28) {
        for (let y = 0; y < ch; y += 28) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }, [])

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES)
    const loaded: boolean[]          = new Array(TOTAL_FRAMES).fill(false)
    imagesRef.current = images
    loadedRef.current = loaded

    const loadFrame = (i: number) => {
      const img = new Image()
      img.src   = FRAME_PATH(i)
      img.onload = () => {
        loaded[i] = true
        if (i === frameRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => drawFrame(i))
        }
      }
      images[i] = img
    }

    // Load frame 0 first for instant first-paint
    loadFrame(0)
    // Rest load staggered to avoid bandwidth spike
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const idx = i
      setTimeout(() => loadFrame(idx), idx * 20)
    }
  }, [drawFrame])

  // Canvas resize — pixel-perfect at all DPRs
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w   = window.innerWidth
      const h   = window.visualViewport?.height ?? window.innerHeight
      canvas.width        = w * dpr
      canvas.height       = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(dpr, dpr)
      ctxRef.current = ctx
      drawFrame(frameRef.current)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  // Scroll handler — maps progress 0→1 to frame 0→TOTAL_FRAMES-1
  useEffect(() => {
    const container = document.getElementById('scrolly-container')
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => {
      if (prefersReduced) return
      const rect     = container.getBoundingClientRect()
      const total    = container.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / total)
      const newFrame = Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1)))

      if (newFrame !== frameRef.current) {
        frameRef.current = newFrame
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawFrame(newFrame))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    drawFrame(0) // Draw first frame on mount
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [drawFrame])

  return (
    <div
      id="scrolly-container"
      className="relative"
      style={{ height: '500vh' }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh' }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}
        />
        {/* Vignette for text legibility */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(26,26,46,0.1) 0%, transparent 30%, transparent 70%, rgba(26,26,46,0.15) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>
    </div>
  )
}