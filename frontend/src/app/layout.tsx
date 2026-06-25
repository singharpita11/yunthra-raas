import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Tech | Next-Gen Software & Digital Innovation Agency",
  description: "Accelerate your growth with Nexus Tech. We engineer high-performance SaaS platforms, custom AI integrations, and state-of-the-art web architectures with premium design aesthetics.",
  keywords: ["SaaS Agency", "Next.js Development", "Express.js API", "Tech Consulting", "Premium Web Design"],
  authors: [{ name: "Nexus Tech R&D Team" }],
  openGraph: {
    title: "Nexus Tech | Next-Gen Software & Digital Innovation Agency",
    description: "Accelerate your growth with Nexus Tech. We build premium SaaS platforms, custom AI integrations, and cutting-edge web architectures.",
    type: "website",
    locale: "en_US",
    url: "https://nexus-tech-agency.com",
    siteName: "Nexus Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Tech | Digital Innovation Agency",
    description: "Premium SaaS engineering and state-of-the-art web architectures.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-secondary text-accent font-body antialiased selection:bg-primary selection:text-secondary">
        {children}
      </body>
    </html>
  );
}
