import type { Metadata } from "next";
import { Inter, Playfair_Display, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bangla",
});

export const metadata: Metadata = {
  title: "Ukil Lagbe? | Advocates & Legal Consultants, Bangladesh",
  description:
    "Supreme Court & Judge Court Advocates in Dhaka, Bangladesh. Corporate, Land, Writ, Family & Criminal Law.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${hindSiliguri.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans bg-slate-50 text-slate-900 antialiased"
      >
        {children}
      </body>
    </html>
  );
}

