import type { Metadata } from "next";

require("./globals.css");

export const metadata: Metadata = {
  title: "Faishal Syarif — Graphic Designer & Video Editor",
  description: "Portfolio of Muhammad Faishal Syarif - Freelance Graphic Design & Video Editor based in Surabaya, Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,800,700,500,400&display=swap"
        />
      </head>
      <body className="bg-white text-textPrimary font-satoshi antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
