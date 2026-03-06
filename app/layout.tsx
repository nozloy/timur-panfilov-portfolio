import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://timur.makegood.group"),
  title: "Тимур Панфилов | Застройка, декор, тендерные сметы, ЭКСПО",
  description:
    "Тимур Панфилов: застройка и декор мероприятий, тендерные сметы, шеф-монтаж, стенды и проекты ЭКСПО. Опыт 10+ лет в производстве и 5+ лет в ивенте.",
  keywords: [
    "Тимур Панфилов",
    "застройка мероприятий",
    "декор мероприятий",
    "тендерные сметы",
    "шеф-монтаж",
    "ЭКСПО",
    "выставочные стенды",
  ],
  authors: [{ name: "Тимур Панфилов" }],
  applicationName: "Тимур Панфилов",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      ru: "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    locale: "ru_RU",
    type: "website",
    siteName: "Тимур Панфилов",
    title: "Тимур Панфилов | Застройка, декор, тендерные сметы, ЭКСПО",
    description:
      "Портфолио и контакты Тимура Панфилова: застройка и декор мероприятий, проекты ЭКСПО, шеф-монтаж и тендерные сметы.",
    url: "https://timur.makegood.group/",
    images: [
      {
        url: "https://timur.makegood.group/og-image.png",
        width: 1200,
        height: 630,
        alt: "Портфолио Тимура Панфилова: застройка и декор мероприятий",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Тимур Панфилов | Застройка, декор, тендерные сметы, ЭКСПО",
    description:
      "Портфолио и контакты Тимура Панфилова: застройка и декор мероприятий, проекты ЭКСПО, шеф-монтаж и тендерные сметы.",
    images: ["https://timur.makegood.group/og-image.png"],
  },
};

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://timur.makegood.group/#person",
      name: "Тимур Панфилов",
      url: "https://timur.makegood.group/",
      jobTitle: "Специалист по застройке и декору мероприятий",
      email: "mailto:panfilov.timur@gmail.com",
      telephone: "+7-999-164-99-19",
      sameAs: ["https://t.me/timur_panfilovich"],
      knowsLanguage: ["ru", "en"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://timur.makegood.group/#service",
      name: "Застройка и декор мероприятий",
      url: "https://timur.makegood.group/",
      provider: { "@id": "https://timur.makegood.group/#person" },
      areaServed: "RU",
      serviceType: [
        "Тендерные сметы",
        "Застройка под ключ",
        "Шеф-монтаж и демонтаж",
        "Проекты ЭКСПО",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Тендерные сметы" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Застройка под ключ" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Шеф-монтаж и демонтаж" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Проекты ЭКСПО" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://timur.makegood.group/#website",
      url: "https://timur.makegood.group/",
      name: "Тимур Панфилов",
      inLanguage: "ru",
      publisher: { "@id": "https://timur.makegood.group/#person" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${montserrat.variable} bg-background-light dark:bg-background-dark`}>
        {children}
        <Toaster richColors closeButton position="top-right" />
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </body>
    </html>
  );
}
