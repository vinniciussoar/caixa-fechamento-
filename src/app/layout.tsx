import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Desenvolvimento Humano Sustentável`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: [
    "desenvolvimento socioemocional",
    "saúde mental escolar",
    "saúde mental corporativa",
    "NR-01 riscos psicossociais",
    "neurodiversidade e inclusão",
    "diagnóstico institucional",
    "BNCC competências socioemocionais",
    "INSAUDEHS",
  ],
  authors: [{ name: "INSAUDEHS" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title: `${siteConfig.name} — Desenvolvimento Humano Sustentável`,
    description: siteConfig.shortDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Desenvolvimento Humano Sustentável`,
    description: siteConfig.shortDescription,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  email: siteConfig.email,
  founder: {
    "@type": "Person",
    name: "Sandra Moura",
    jobTitle: "CEO & Psicoterapeuta",
  },
  areaServed: "BR",
  audience: {
    "@type": "Audience",
    audienceType: "Escolas, instituições de ensino e empresas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
