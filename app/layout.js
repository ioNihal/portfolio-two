import { Anton, Fredoka, Geist, Geist_Mono, Staatliches, Urbanist } from "next/font/google";
import "./globals.css";
import { WebVitals } from "./components/web-vitals";
import JsonLd from "./components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500"]
});

const staatliches = Staatliches({
  variable: "--font-staatliches",
  subsets: ["latin"],
  weight: ["400"]
})

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
})


export const metadata = {
  title: "Nihal K - Full Stack Developer | React & Next.js Portfolio",
  description: "Full Stack Developer specializing in modern web technologies, including React, Next.js, and the MERN stack. Explore my projects, skills, and professional journey.",
  metadataBase: new URL('https://ionihal.vercel.app'),

  // Keywords: Expanded to cover the full stack technologies mentioned
  keywords: [
    'Full Stack Developer',
    'Frontend Developer Intern',
    'Web Development',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'MERN Stack',
    'MongoDB',
    'Portfolio'
  ],

  authors: [{ name: 'Nihal K' }],
  creator: 'Nihal K',
  publisher: 'Nihal K',


  robots: {
    index: true,
    follow: true,
  },

  // Open Graph
  openGraph: {
    title: 'Nihal K - Full Stack Developer Portfolio',
    description: 'MERN stack enthusiast and Frontend Developer Intern showcasing projects built with React, Next.js, and modern web technologies.',
    url: 'https://ionihal.vercel.app',
    siteName: 'Nihal K Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://ionihal.vercel.app/social-share-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nihal K Portfolio Banner'
      }
    ]
  },

  // Twitter Card:
  twitter: {
    card: 'summary_large_image',
    title: 'Nihal K - Full Stack Developer Portfolio',
    description: 'MERN stack enthusiast and Frontend Developer Intern showcasing projects built with React, Next.js, and modern web technologies.',
    creator: '@n1haaaal', 
    images: ['https://ionihal.vercel.app/social-share-image.jpg'],
  },

  // Verification
  verification: {
    google: 'nJTi0WblYTwIGSD_CRF7Gzz5CI2BhPvHV0Uq6qSYoIw',
  },

  // Canonical
  alternates: {
    canonical: 'https://ionihal.vercel.app/',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${staatliches.variable} ${urbanist.variable} ${anton.variable} antialiased`}
      >
        <JsonLd />
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
