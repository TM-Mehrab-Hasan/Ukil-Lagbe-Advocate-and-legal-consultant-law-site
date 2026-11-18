"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Globe, FolderLock, UserPlus, BookOpen } from "lucide-react";
import { Language } from "@/data/content";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    `transition text-sm font-medium ${
      pathname === href ? "text-amber-400" : "text-slate-300 hover:text-amber-400"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2.5 bg-amber-500/15 border border-amber-500/40 rounded-xl group-hover:bg-amber-500/25 transition">
            <Scale className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <span className="block text-lg font-bold tracking-tight text-white">
              {lang === "en" ? "UkilSheba" : "উকিলসেবা"}
              <span className="text-amber-400">.</span>
            </span>
            <span className="block text-[11px] text-slate-400">
              {lang === "en" ? "Global Legal Access Network" : "বিশ্বস্ত আইনি সেবা নেটওয়ার্ক"}
            </span>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className={navLinkClass("/")}>
            {lang === "en" ? "Find Advocates" : "আইনজীবী খুঁজুন"}
          </Link>
          <Link href="/guides" className={`flex items-center gap-1.5 ${navLinkClass("/guides")}`}>
            <BookOpen className="w-4 h-4 text-amber-400/80" />
            {lang === "en" ? "Which Lawyer Do I Need?" : "কোন আইনজীবী প্রয়োজন?"}
          </Link>
          <Link href="/dashboard" className={`flex items-center gap-1.5 ${navLinkClass("/dashboard")}`}>
            <FolderLock className="w-4 h-4 text-amber-400/80" />
            {lang === "en" ? "Track Case" : "মামলা ট্র্যাক"}
          </Link>
          <Link href="/admin" className={navLinkClass("/admin")}>
            {lang === "en" ? "Lawyer Diary" : "আইনজীবী ডায়েরি"}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 hover:border-amber-500 text-xs font-semibold text-slate-200 transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            {lang === "en" ? "বাংলা" : "English"}
          </button>

          <Link
            href="/join-lawyer"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>{lang === "en" ? "Join as Advocate" : "আইনজীবী নিবন্ধন"}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}