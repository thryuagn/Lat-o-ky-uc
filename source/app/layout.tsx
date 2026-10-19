import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lật ô ký ức · Nước đi lịch sử",
  description: "Game ghép thẻ lịch sử, thi nhiều nhóm theo mã trận.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
