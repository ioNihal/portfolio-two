import { Anton, Geist, Geist_Mono, Michroma, Space_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import FooterSection from "@/components/FooterSection/FooterSection";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/ThemeToggle";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  description: "Full-Stack Developer specializing in modern web technologies, including React, Next.js, Node.js, and database engineering. Explore my projects, skills, and professional journey.",
  metadataBase: new URL('https://ionihal.vercel.app'),

  // Keywords
  keywords: [
    'Full Stack Developer',
    'Full-Stack Developer',
    'Software Developer',
    'Software Engineer',
    'Backend Developer',
    'React Developer',
    'Next.js Portfolio',
    'Node.js Developer',
    'Web Developer India',
    'MERN Stack',
    'Frontend Developer'
  ],

  authors: [{ name: 'Nihal K' }],
  creator: 'Nihal K',
  publisher: 'Nihal K',

  // Open Graph
  openGraph: {
    title: 'Nihal K - Full Stack Developer Portfolio',
    description: 'Full-Stack Developer showcasing projects built with React, Next.js, Node.js, and modern web technologies.',
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
    description: 'Full-Stack Developer showcasing projects built with React, Next.js, Node.js, and modern web technologies.',
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${microma.variable} ${spaceMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeToggle />
          <JsonLd />
          {/* <WebVitals /> */}
          {children}
          <FooterSection />
          <GoogleAnalytics gaId="G-44W01T0085" />
        </ThemeProvider>
      </body>
    </html>
  );
}
