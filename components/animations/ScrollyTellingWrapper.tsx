'use client'
import dynamic from 'next/dynamic'

const ScrollyTelling = dynamic(
  () => import('./ScrollyTelling'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ height: '500vh', background: 'var(--navy)' }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-blue rounded-full animate-spin mx-auto mb-3" />
            <p className="font-sans text-white/40 text-sm">Loading experience...</p>
          </div>
        </div>
      </div>
    ),
  }
)

export default function ScrollyTellingWrapper() {
  return <ScrollyTelling />
}
