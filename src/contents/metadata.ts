import { getMetadataItems } from "@/lib/metadata";

const metadataItems = getMetadataItems();

export const BASE_METADATA = {
  title: metadataItems.title ?? "ETC — Temukan Tim dan Bangun Kolaborasi",
  description:
    metadataItems.description ??
    "ETC adalah platform untuk membantu mahasiswa menemukan tim, mencari partner, dan merekrut anggota untuk berbagai kebutuhan seperti lomba, proyek kampus, dan side project.",
  applicationName: "ETC",
  authors: [{ name: "ETC Team" }],
  creator: "ETC",
  publisher: "ETC",

  keywords: [
    "ETC",
    "cari tim mahasiswa",
    "rekrut anggota tim",
    "platform kolaborasi mahasiswa",
    "tim lomba mahasiswa",
    "project kampus",
    "side project mahasiswa",
    "team finder",
    "student collaboration platform",
    "build team",
    "recruit team members",
    "college team platform",
    "hackathon team finder",
    "PKM team",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  generator: "Next.js",

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: metadataItems.pathname,
    title: metadataItems.title ?? "ETC — Temukan Tim dan Bangun Kolaborasi",
    description:
      metadataItems.description ??
      "Temukan partner, bentuk tim, dan mulai kolaborasi untuk lomba, proyek kampus, dan side project bersama ETC.",
    siteName: "ETC",
    // images: [
    //   {
    //     url: "/images/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "ETC",
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    title: metadataItems.title ?? "ETC — Platform Kolaborasi Mahasiswa",
    description:
      metadataItems.description ??
      "Cari tim, rekrut anggota, dan mulai kolaborasi dengan ETC.",
    // creator: "@etc_app",
    // images: ["/images/og-image.png"],
  },

  alternates: {
    canonical: metadataItems.pathname,
  },

  // nanti pake ini kalo udah ada asset
  // icons: {
  //   icon: [
  //     {
  //       url: "/favicon/android-chrome-192x192.png",
  //       sizes: "192x192",
  //       type: "image/png",
  //     },
  //   ],
  // },
};
