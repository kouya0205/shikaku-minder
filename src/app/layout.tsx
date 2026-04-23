import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "シカクマインダー | 資格スケジュール管理",
  description:
    "国内トップ30の資格試験の申込期間・試験日を一元管理し、申込忘れをゼロにするサービス。",
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
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
        <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <span
                aria-hidden
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand)] text-[var(--color-brand-foreground)] text-sm font-bold"
              >
                資
              </span>
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
