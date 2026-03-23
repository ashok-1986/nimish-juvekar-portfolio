import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/data";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
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
    url: "https://nimishjuvekar.com",
    siteName: "Nimish Juvekar",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimish Juvekar — Lecturer & Industry Expert",
    description:
      "Lecturer in Work-Based Learning at UEL with 15+ years of international experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nimishjuvekar.com",
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
    url: "https://nimishjuvekar.com",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
