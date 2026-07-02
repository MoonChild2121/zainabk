import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zainab — Software Engineer",
  description:
    "Zainab, a software engineer. A portfolio of work, skills, and the life beyond the screen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla adds
          cz-shortcut-listen) mutate <body> before hydration; this silences that
          one-level noise without masking real mismatches deeper in the tree. */}
      <body suppressHydrationWarning className="flex min-h-full flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
