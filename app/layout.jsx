import { Anton, Geist, Geist_Mono, Instrument_Serif, Michroma, Space_Mono } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata = {
  title: "Nihal K - Full Stack Developer | React & Next.js Portfolio",
  description: "Full-Stack Developer specializing in modern web technologies, including React, Next.js, Node.js, and database engineering. Explore my projects, skills, and professional journey.",
  metadataBase: new URL('https://www.nihalu.com'),

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
    url: 'https://www.nihalu.com',
    siteName: 'Nihal K Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.nihalu.com/social-share-image.jpg',
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
    images: ['https://www.nihalu.com/social-share-image.jpg'],
  },

  // Verification
  verification: {
    google: 'nJTi0WblYTwIGSD_CRF7Gzz5CI2BhPvHV0Uq6qSYoIw',
  },

  // Canonical
  alternates: {
    canonical: 'https://www.nihalu.com',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${anton.variable} ${microma.variable} ${spaceMono.variable} antialiased`}
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
