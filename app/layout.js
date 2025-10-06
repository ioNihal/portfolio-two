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
  title: "Nihal K - Full Stack Developer Portfolio",
  description: "Full Stack Developer specializing in modern web technologies. Explore my projects, skills, and professional journey.",
  metadataBase: new URL('https://ionihal.vercel.app'),
  keywords: ['Full Stack Developer', 'Frontend Developer Intern', 'Web Development', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Nihal K' }],
  creator: 'Nihal K',
  publisher: 'Nihal K',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Nihal K - Full Stack Developer Portfolio',
    description: 'Full Stack Developer specializing in modern web technologies. Explore my projects, skills, and professional journey.',
    url: 'https://ionihal.vercel.app',
    siteName: 'Nihal K Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nihal K - Full Stack Developer Portfolio',
    description: 'Full Stack Developer specializing in modern web technologies. Explore my projects, skills, and professional journey.',
    creator: '@nihal',
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code here
  },
  alternates: {
    canonical: 'https://ionihal.vercel.app',
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
