'use client'
import dynamic from 'next/dynamic'

const ScrollyCanvas = dynamic(
  () => import('./ScrollyCanvas'),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: '500vh', background: '#1A1A2E' }} className="relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    ),
  }
)

export default function ScrollyTellingWrapper() {
  return <ScrollyCanvas />
}