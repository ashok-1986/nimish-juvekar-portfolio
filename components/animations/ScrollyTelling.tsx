'use client'
import { Suspense, lazy } from 'react'

// Dynamic imports to avoid SSR issues with canvas/scroll APIs
const ScrollyCanvas = lazy(() => import('./ScrollyCanvas'))
const Overlay       = lazy(() => import('./Overlay'))

export default function ScrollyTelling() {
  return (
    <section
      id="scrolly"
      className="relative"
      aria-label="Scrollytelling introduction"
    >
      <Suspense
        fallback={
          // Fallback shown during SSR / lazy load
          <div
            className="relative"
            style={{ height: '500vh', background: 'var(--navy)' }}
          >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
              <div className="text-center">
                <p className="font-sans text-white/40 text-sm">Loading experience...</p>
              </div>
            </div>
          </div>
        }
      >
        {/* Canvas sits in the background */}
        <ScrollyCanvas />
        {/* Overlay text floats above canvas — positioned absolute over the scroll container */}
        <div className="absolute inset-0 top-0" style={{ pointerEvents: 'none' }}>
          <Overlay />
        </div>
      </Suspense>

      {/* Scroll progress hint at start */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        aria-hidden="true"
      >
        <span
          className="font-sans text-[10px] font-600 uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Scroll to explore
        </span>
        <div className="flex flex-col gap-1 items-center">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-[2px] rounded-full"
              style={{
                height: i === 1 ? '16px' : '8px',
                background: 'rgba(255,255,255,0.4)',
                opacity: 1 - i * 0.25,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
