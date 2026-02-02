import { Anton, Geist, Geist_Mono, Michroma, Space_Mono, Staatliches, Urbanist } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
// import { WebVitals } from "./components/web-vitals";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
})

const microma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
})


export const metadata = {
  title: "Nihal K - Full Stack Developer | React & Next.js Portfolio",
  description: "Frontend / Full-Stack Developer specializing in modern web technologies, including React, Next.js, and the MERN stack. Explore my projects, skills, and professional journey.",
  metadataBase: new URL('https://ionihal.vercel.app'),

  // Keywords
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Portfolio',
    'MERN Stack',
    'Web Developer India'
  ],

  authors: [{ name: 'Nihal K' }],
  creator: 'Nihal K',
  publisher: 'Nihal K',

  // Open Graph
  openGraph: {
    title: 'Nihal K - Full Stack Developer Portfolio',
    description: 'Frontend / Full-Stack Developer showcasing projects built with React, Next.js, and modern web technologies.',
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
    description: 'Frontend / Full-Stack Developer showcasing projects built with React, Next.js, and modern web technologies.',
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
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${microma.variable} ${spaceMono.variable} antialiased`}
      >
        <JsonLd />
        {/* <WebVitals /> */}
        {children}
      </body>
    </html>
  );
}
