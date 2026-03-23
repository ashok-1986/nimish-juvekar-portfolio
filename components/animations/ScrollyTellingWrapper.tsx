'use client'
import dynamic from 'next/dynamic'
import ScrollyOverlay from './ScrollyOverlay'

const ScrollyCanvas = dynamic(
  () => import('./ScrollyCanvas'),
  { ssr: false }
)

export default function ScrollyTellingWrapper() {
  return (
    <div className="relative" style={{ height: '500vh' }}>
      <ScrollyCanvas />
      <div className="absolute inset-0 top-0" style={{ pointerEvents: 'none', zIndex: 10 }}>
        <ScrollyOverlay />
      </div>
    </div>
  )
}