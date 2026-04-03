import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/data";
import UnicornBackground from "@/components/ui/UnicornBackground";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nimish.drievu.com"),
  title: "Nimish Juvekar — Lecturer & Industry Expert | University of East London",
  description:
    "Nimish Juvekar is a Lecturer in Work-Based Learning at UEL with 15+ years of international experience in operations, supply chain, and project management.",
  keywords: [
    "Nimish Juvekar",
    "Lecturer",
    "Work-Based Learning",
    "University of East London",
    "Operations Management",
    "Project Management",
    "Supply Chain",
    "ELV Systems",
  ],
  authors: [{ name: "Nimish Juvekar" }],
  openGraph: {
    title: "Nimish Juvekar — Lecturer & Industry Expert | University of East London",
    description:
      "Nimish Juvekar is a Lecturer in Work-Based Learning at UEL with 15+ years of international experience.",
    url: "https://nimish.drievu.com",
    siteName: "Nimish Juvekar",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nimish Juvekar — Lecturer & Industry Expert at University of East London",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimish Juvekar — Lecturer & Industry Expert",
    description:
      "Lecturer in Work-Based Learning at UEL with 15+ years of international experience.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nimish.drievu.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: "https://nimish.drievu.com",
    email: personalInfo.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "UK",
    },
    sameAs: [personalInfo.linkedin, personalInfo.uel, personalInfo.orcid],
    worksFor: {
      "@type": "Organization",
      name: personalInfo.institution,
    },
  };

  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <UnicornBackground />
        {children}
      </body>
    </html>
  );
}
