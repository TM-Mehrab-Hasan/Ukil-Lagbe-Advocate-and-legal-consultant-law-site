import Link from "next/link";
import { Scale, ShieldCheck, Globe2, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <Scale className="w-6 h-6 text-amber-400" />
            <span className="text-lg font-bold tracking-tight">
              UkilSheba<span className="text-amber-400">.</span>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400">
            Bridging the gap between everyday citizens seeking the right legal guidance and verified advocates—empowering both senior practitioners and newly enrolled lawyers.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Bar Council Ethics Compliant Directory</span>
          </div>
        </div>

        {/* For Clients */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            For Citizens & Clients
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/guides" className="hover:text-amber-400 transition">
                Which Lawyer Do I Need? (Issue Guide)
              </Link>
            </li>
            <li>
              <Link href="/#directory" className="hover:text-amber-400 transition">
                Browse Verified Advocates & Fees
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-amber-400 transition">
                Client Case & Hearing Date Tracker
              </Link>
            </li>
            <li>
              <Link href="/?filter=junior#directory" className="hover:text-amber-400 transition">
                Budget-Friendly Newly Enrolled Lawyers
              </Link>
            </li>
          </ul>
        </div>

        {/* For Advocates */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            For Advocates & Chambers
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/join-lawyer" className="hover:text-amber-400 transition inline-flex items-center gap-1">
                Create Free Advocate Profile <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-amber-400 transition">
                Advocate Case Diary & Appointment Login
              </Link>
            </li>
            <li>
              <Link href="/lawyers/nusrat-jahan" className="hover:text-amber-400 transition">
                Sample Shareable Advocate Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Practice Jurisdictions */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Coverage & Support
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-1.5 text-slate-300">
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              Supreme Court & All District Judge Courts
            </li>
            <li>Dhaka • Chattogram • Sylhet • Rajshahi • Khulna</li>
            <li>Online Video Consultations Worldwide</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © 2026 UkilSheba Global. Designed & Developed by{" "}
            <strong className="text-slate-300">T. M. Mehrab Hasan</strong>.
          </p>
          <p className="text-center sm:text-right max-w-lg">
            Legal Disclaimer: This platform facilitates informational discovery and appointment scheduling in accordance with Bar Council rules and does not provide automated legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}