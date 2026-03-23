import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

export const metadata: Metadata = {
  title: 'Nimish Juvekar — Lecturer & Industry Expert | University of East London',
  description: 'Nimish Juvekar is a Lecturer in Work-Based Learning at UEL with 15+ years of international experience in operations, supply chain, and project management.',
  openGraph: {
    title: 'Nimish Juvekar — Lecturer & Industry Expert',
    description: 'Bridging 15+ years of global industry experience with academic excellence at the University of East London.',
    url: 'https://nimishjuvekar.com',
    siteName: 'Nimish Juvekar Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nimish Juvekar',
  jobTitle: 'Lecturer (Work-Based Learning)',
  affiliation: { '@type': 'Organization', name: 'University of East London', url: 'https://www.uel.ac.uk' },
  url: 'https://nimishjuvekar.com',
  sameAs: [
    'https://www.linkedin.com/in/nimishjuvekar',
    'https://orcid.org/0009-0000-4319-2899',
    'https://www.uel.ac.uk/about-uel/staff/nimish-vivek-juvekar',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
