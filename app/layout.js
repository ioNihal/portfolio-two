import { Anton, Fredoka, Geist, Geist_Mono, Staatliches, Urbanist } from "next/font/google";
import "./globals.css";
import { WebVitals } from "./components/web-vitals";

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
  title: "Nihal K - Portfolio",
  description: "Updated Portfolio v3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${staatliches.variable} ${urbanist.variable} ${anton.variable} antialiased`}
      >
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
