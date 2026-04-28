import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shikaku-minder.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "シカクマインダー | 資格試験の日程・申込期間を一元管理",
    template: "%s | シカクマインダー",
  },
  description:
    "宅建・行政書士・TOEIC・FPなど国内主要30資格の試験日・申込期間をまとめてチェック。締切前にカレンダー登録・通知で申込忘れゼロへ。",
  keywords: [
    "資格", "資格試験", "申込期間", "試験日", "スケジュール管理", "リマインド",
    "宅建", "行政書士", "TOEIC", "FP", "簿記", "基本情報技術者", "社労士",
  ],
  authors: [{ name: "シカクマインダー", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: "シカクマインダー",
    title: "シカクマインダー | 資格試験の日程・申込期間を一元管理",
    description:
      "宅建・行政書士・TOEIC・FPなど国内主要30資格の試験日・申込期間をまとめてチェック。申込忘れゼロへ。",
    images: [{ url: "/img/shikaku-minder-ogp.png", width: 2563, height: 1354, alt: "シカクマインダー" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "シカクマインダー | 資格試験の日程・申込期間を一元管理",
    description:
      "宅建・行政書士・TOEIC・FPなど国内主要30資格の試験日・申込期間をまとめてチェック。",
    images: ["/img/shikaku-minder-ogp.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "シカクマインダー",
  url: SITE_URL,
  description: "国内主要30資格の試験日・申込期間を一元管理するサービス",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-(--color-background) text-(--color-foreground)">
        <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <Image src="/img/shikaku-minder.png" alt="シカクマインダー" width={32} height={32} />
              <span>シカクマインダー</span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/"
                className="rounded-md px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              >
                検索
              </Link>
              <Link
                href="/my-list"
                className="rounded-md px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              >
                マイリスト
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:py-10">
          {children}
        </main>
        <footer className="border-t border-[var(--color-border)] bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Shikaku Minder</span>
            <span>
              掲載情報は参考です。申込前に必ず公式サイトをご確認ください。
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
