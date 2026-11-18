"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  CheckCircle2,
  MapPin,
  Sparkles,
  Calendar,
  FolderLock,
  Filter,
  ArrowRight,
  Search,
  UserPlus,
  BookOpen,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Language, LawyerProfile, legalIssues } from "@/data/content";
import { useLawyers } from "@/lib/storage";

export default function MarketplaceHomePage() {
  const [lang, setLang] = useState<Language>("en");
  const [selectedIssueId, setSelectedIssueId] = useState<string>("all");
  const [searchCity, setSearchCity] = useState<string>("");
  const [onlyNewAdvocates, setOnlyNewAdvocates] = useState(false);
  const [bookingLawyer, setBookingLawyer] = useState<LawyerProfile | null>(null);

  const lawyers = useLawyers();

  const activeIssue = legalIssues.find((i) => i.id === selectedIssueId);

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesIssue =
      selectedIssueId === "all" || lawyer.specialties.includes(selectedIssueId);
    const matchesJunior = !onlyNewAdvocates || lawyer.isJuniorFriendly;
    const matchesQuery =
      !searchCity.trim() ||
      lawyer.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      lawyer.name.toLowerCase().includes(searchCity.toLowerCase()) ||
      lawyer.court.toLowerCase().includes(searchCity.toLowerCase());
    return matchesIssue && matchesJunior && matchesQuery;
  });

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${lang === "bn" ? "font-[family-name:var(--font-bangla)]" : ""}`}>
      <Navbar lang={lang} setLang={setLang} />

      {/* Redesigned Split Hero Section */}
      <section className="relative bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          {/* Left 7 Cols: Value Prop + Interactive Quick Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              {lang === "en"
                ? "Verified Bar Council Advocates • Transparent Consultation Fees"
                : "যাচাইকৃত বার কাউন্সিল আইনজীবী • স্বচ্ছ পরামর্শ ফি"}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.15]">
              {lang === "en" ? (
                <>
                  Find the <span className="text-amber-400">Right Lawyer</span> for Your Exact Legal Issue.
                </>
              ) : (
                <>
                  আপনার আইনি সমস্যার জন্য <span className="text-amber-400">সঠিক আইনজীবী</span> খুঁজে নিন।
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {lang === "en"
                ? "Not sure whether you need a Civil, Family, Criminal, or Writ advocate? Identify your legal category in plain language, compare fees from senior and newly enrolled lawyers, and track your case."
                : "আপনার সমস্যার জন্য দেওয়ানি, পারিবারিক, ফৌজদারি নাকি রিট আইনজীবী প্রয়োজন জানেন না? সহজ ভাষায় সমস্যার ধরন বুঝুন, অভিজ্ঞ ও নবীন আইনজীবীদের ফি তুলনা করুন এবং মামলা ট্র্যাক করুন।"}
            </p>

            {/* Hero Search & Filter Bar */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-2.5 max-w-2xl shadow-xl">
              <select
                value={selectedIssueId}
                onChange={(e) => setSelectedIssueId(e.target.value)}
                aria-label="Select Legal Issue"
                className="flex-1 bg-slate-800 text-white text-xs sm:text-sm px-3.5 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
              >
                <option value="all">
                  {lang === "en" ? "All Legal Issues (Select Issue)" : "সকল আইনি বিষয় (সমস্যা বাছুন)"}
                </option>
                {legalIssues.map((issue) => (
                  <option key={issue.id} value={issue.id}>
                    {lang === "en" ? issue.problemTitle : issue.bnProblemTitle}
                  </option>
                ))}
              </select>

              <div className="relative sm:w-48">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder={lang === "en" ? "City or Court..." : "শহর বা আদালত..."}
                  className="w-full bg-slate-800 text-white text-xs sm:text-sm pl-9 pr-3 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              <a
                href="#directory"
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 transition shrink-0"
              >
                {lang === "en" ? "Find Lawyers" : "খুঁজুন"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Hero Quick Links */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-slate-400">
              <Link href="/guides" className="hover:text-amber-400 flex items-center gap-1.5 transition">
                <BookOpen className="w-4 h-4 text-amber-400" />
                {lang === "en" ? "Read Legal Guides" : "আইনি সহায়িকা পড়ুন"}
              </Link>
              <Link href="/dashboard" className="hover:text-amber-400 flex items-center gap-1.5 transition">
                <FolderLock className="w-4 h-4 text-amber-400" />
                {lang === "en" ? "Client Case Tracker" : "মামলা ট্র্যাকিং পোর্টাল"}
              </Link>
              <Link href="/join-lawyer" className="hover:text-amber-400 flex items-center gap-1.5 transition">
                <UserPlus className="w-4 h-4 text-amber-400" />
                {lang === "en" ? "Newly Enrolled Lawyer? Join Free" : "নবীন আইনজীবী? ফ্রি যুক্ত হোন"}
              </Link>
            </div>
          </div>

          {/* Right 5 Cols: How It Works / Platform Highlights Card */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {lang === "en" ? "How UkilSheba Works" : "কীভাবে কাজ করে"}
            </span>

            <div className="space-y-4">
              <div className="flex gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  01
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {lang === "en" ? "Understand Your Legal Category" : "সঠিক আইনজীবীর ধরন জানুন"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Select your problem to see which specialist handles it and what documents to prepare.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  02
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {lang === "en" ? "Compare Senior & Newly Enrolled Advocates" : "অভিজ্ঞ ও নবীন আইনজীবী তুলনা করুন"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    View Bar enrollment year, court jurisdiction, and transparent online/chamber fees.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  03
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {lang === "en" ? "Book & Track Hearing Dates (Tarikh)" : "অ্যাপয়েন্টমেন্ট ও মামলার তারিখ ট্র্যাক"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Schedule video or chamber consultations and track next court dates online.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Have an ongoing case?</span>
              <Link
                href="/dashboard"
                className="font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
              >
                Open Case Tracker <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Interactive Issue-to-Lawyer Matcher */}
      <section id="issue-finder" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              {lang === "en" ? "Step 1 • Legal Guidance Guide" : "ধাপ ১ • আইনি দিকনির্দেশনা"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {lang === "en"
                ? "What problem are you facing?"
                : "আপনি কোন ধরনের সমস্যার সম্মুখীন হচ্ছেন?"}
            </h2>
          </div>

          <Link
            href="/guides"
            className="text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-600 inline-flex items-center gap-1"
          >
            {lang === "en" ? "Explore Detailed Legal Guides" : "বিস্তারিত আইনি গাইড দেখুন"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Issue Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          <button
            onClick={() => setSelectedIssueId("all")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
              selectedIssueId === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-white text-slate-700 border-slate-300 hover:border-amber-500"
            }`}
          >
            {lang === "en" ? "All Legal Issues" : "সকল আইনি বিষয়"}
          </button>

          {legalIssues.map((issue) => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssueId(issue.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                selectedIssueId === issue.id
                  ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                  : "bg-white text-slate-700 border-slate-300 hover:border-amber-500"
              }`}
            >
              {lang === "en" ? issue.problemTitle : issue.bnProblemTitle}
            </button>
          ))}
        </div>

        {/* Educational Explanation Card when an Issue is Selected */}
        {activeIssue && (
          <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-6 sm:p-8 mb-10 grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {lang === "en" ? "Recommended Specialist:" : "আপনার জন্য উপযুক্ত আইনজীবী:"}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {lang === "en" ? activeIssue.lawyerTypeNeeded : activeIssue.bnLawyerTypeNeeded}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === "en" ? activeIssue.plainExplanation : activeIssue.bnPlainExplanation}
              </p>
              <Link
                href={`/guides#${activeIssue.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-700 pt-1"
              >
                {lang === "en" ? "Read step-by-step legal process →" : "ধাপে ধাপে আইনি প্রক্রিয়া পড়ুন →"}
              </Link>
            </div>

            <div className="md:col-span-5 bg-white p-5 rounded-xl border border-amber-200 shadow-2xs">
              <h4 className="text-xs font-bold uppercase text-slate-700 mb-2.5">
                {lang === "en"
                  ? "Documents to Keep Ready Before Consultation:"
                  : "পরামর্শের আগে যে কাগজপত্র সাথে রাখবেন:"}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeIssue.checklist.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Step 2: Filtered Lawyer Directory */}
        <div id="directory" className="pt-6">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {lang === "en"
                  ? `Verified Advocates (${filteredLawyers.length})`
                  : `যাচাইকৃত আইনজীবীগণ (${filteredLawyers.length})`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === "en"
                  ? "Click any advocate's name to view full credentials, chamber hours, and WhatsApp contact."
                  : "বিস্তারিত যোগ্যতা, চেম্বারের সময়সূচি এবং হোয়াটসঅ্যাপ নম্বর দেখতে আইনজীবীর নামে ক্লিক করুন।"}
              </p>
            </div>

            <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 cursor-pointer shadow-2xs">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              <input
                type="checkbox"
                checked={onlyNewAdvocates}
                onChange={(e) => setOnlyNewAdvocates(e.target.checked)}
                className="accent-amber-600"
              />
              <span>
                {lang === "en"
                  ? "Newly Enrolled Advocates (Budget-Friendly Fees)"
                  : "নবীন আইনজীবী (সাশ্রয়ী পরামর্শ ফি)"}
              </span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-amber-500/70 transition"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <Link
                        href={`/lawyers/${lawyer.id}`}
                        className="text-lg font-bold text-slate-900 hover:text-amber-700 inline-flex items-center gap-1.5 transition"
                      >
                        <span>{lang === "en" ? lawyer.name : lawyer.bnName}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <p className="text-xs font-medium text-amber-700">{lawyer.title}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {lawyer.isJuniorFriendly && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <Sparkles className="w-3 h-3" />
                          {lang === "en"
                            ? `Enrolled ${lawyer.barEnrollmentYear}`
                            : `তালিকাভুক্ত ${lawyer.barEnrollmentYear}`}
                        </span>
                      )}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          lawyer.availableToday
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {lawyer.availableToday
                          ? lang === "en"
                            ? "Available Today"
                            : "আজ উপলব্ধ"
                          : lang === "en"
                          ? "By Appointment"
                          : "অ্যাপয়েন্টমেন্ট সাপেক্ষ"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {lawyer.court} • {lawyer.city}
                  </p>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {lang === "en" ? lawyer.bio : lawyer.bnBio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="block text-slate-500">
                        {lang === "en" ? "Online Fee" : "অনলাইন ফি"}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        ৳{lawyer.onlineFee}
                      </span>
                    </div>
                    <div className="border-l border-slate-200 pl-4">
                      <span className="block text-slate-500">
                        {lang === "en" ? "Chamber Fee" : "চেম্বার ফি"}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        ৳{lawyer.chamberFee}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/lawyers/${lawyer.id}`}
                      className="px-3.5 py-2 border border-slate-300 hover:border-slate-900 text-slate-800 text-xs font-semibold rounded-lg transition"
                    >
                      {lang === "en" ? "View Profile" : "প্রোফাইল"}
                    </Link>

                    <button
                      onClick={() => setBookingLawyer(lawyer)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {lang === "en" ? "Book" : "বুক করুন"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA Banner for Newly Enrolled Advocates */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {lang === "en" ? "For Newly Graduated & Enrolled Advocates" : "নবীন আইনজীবীদের জন্য সুযোগ"}
            </span>
            <h2 className="text-2xl font-bold">
              {lang === "en"
                ? "Are you a newly enrolled advocate looking to build your client base?"
                : "আপনি কি নবীন আইনজীবী এবং নতুন মক্কেলদের সাথে যুক্ত হতে চান?"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Create your verified profile for free, highlight your Bar enrollment, set accessible consultation fees, and connect directly with clients who need document verification, bail assistance, and legal advice.
            </p>
          </div>
          <Link
            href="/join-lawyer"
            className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-xl shrink-0 transition"
          >
            {lang === "en" ? "Register Free Profile →" : "বিনামূল্যে নিবন্ধন করুন →"}
          </Link>
        </div>
      </section>

      <Footer />

      <BookingModal
        lawyer={bookingLawyer}
        onClose={() => setBookingLawyer(null)}
        lang={lang}
      />
    </div>
  );
}