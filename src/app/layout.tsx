import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/global/theme-provider";

export const metadata: Metadata = {
  title: "PC Parts Shop",
  description: "Best PC hardware retailer!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex-col w-4/5 mx-auto my-5">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
