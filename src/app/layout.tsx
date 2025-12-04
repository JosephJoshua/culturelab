import type { Metadata } from "next";
import { Geist_Mono, Noto_Serif_SC } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const puhuiti = localFont({
  src: [
    {
      path: "../../public/fonts/AlibabaPuHuiTi-3-55-Regular/AlibabaPuHuiTi-3-55-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AlibabaPuHuiTi-3-65-Medium/AlibabaPuHuiTi-3-65-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AlibabaPuHuiTi-3-75-SemiBold/AlibabaPuHuiTi-3-75-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/AlibabaPuHuiTi-3-85-Bold/AlibabaPuHuiTi-3-85-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-puhui",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CultureLab · 阅读 · 文化 · 社群",
  description:
    "Slow reading for a fast world. CultureLab 的阅读与跨文化对话社区。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body
        className={`${puhuiti.variable} ${geistMono.variable} ${notoSerif.variable} antialiased`}
      >
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(242,166,90,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(88,192,201,0.16),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.06),transparent_30%)]" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 pb-20 pt-10 sm:px-8 lg:px-10">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
