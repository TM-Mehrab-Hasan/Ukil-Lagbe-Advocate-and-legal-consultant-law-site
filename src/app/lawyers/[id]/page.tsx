"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  PhoneCall,
  Share2,
  Sparkles,
  Video,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Language, legalIssues } from "@/data/content";
import { useLawyers } from "@/lib/storage";

function AdvocateProfileContent() {
  const params = useParams<{ id: string }>();
  const lawyers = useLawyers();
  const [lang, setLang] = useState<Language>("en");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const lawyer = lawyers.find((item) => item.id === params.id);

  if (!lawyer) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar lang={lang} setLang={setLang} />
        <main className="flex-1 max-w-3xl mx-auto py-20 px-4 text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Advocate Profile Not Found</h1>
          <p className="text-sm text-slate-600">
            The advocate profile link may have changed or is still loading from the database.
          </p>
          <Link
            href="/#directory"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Browse All Advocates
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const matchedIssues = legalIssues.filter((issue) =>
    lawyer.specialties.includes(issue.id)
  );

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-50 ${
        lang === "bn" ? "font-[family-name:var(--font-bangla)]" : ""
      }`}
    >
      <Navbar lang={lang} setLang={setLang} />

      {/* Top Breadcrumb Bar */}
      <div className="bg-slate-900 text-slate-300 py-3.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs">
          <Link href="/#directory" className="hover:text-amber-400 flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to Advocates Directory" : "আইনজীবী তালিকায় ফিরে যান"}
          </Link>
          <button
            onClick={handleCopyProfileLink}
            className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied
              ? lang === "en"
                ? "Profile Link Copied!"
                : "লিঙ্ক কপি হয়েছে!"
              : lang === "en"
              ? "Share Profile"
              : "প্রোফাইল শেয়ার করুন"}
          </button>
        </div>
      </div>

      {/* Main Profile Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Credentials, Bio, Practice Areas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    Bar ID: {lawyer.barCouncilId}
                  </span>
                  {lawyer.isJuniorFriendly && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      <Sparkles className="w-3 h-3" />
                      {lang === "en"
                        ? `Enrolled ${lawyer.barEnrollmentYear} • Accessible Fees`
                        : `তালিকাভুক্ত ${lawyer.barEnrollmentYear}`}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {lang === "en" ? lawyer.name : lawyer.bnName}
                </h1>
                <p className="text-sm font-medium text-amber-700 mt-1">{lawyer.title}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  lawyer.availableToday
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {lawyer.availableToday
                  ? lang === "en"
                    ? "● Available Today"
                    : "● আজ পরামর্শের জন্য উপলব্ধ"
                  : lang === "en"
                  ? "By Appointment"
                  : "অ্যাপয়েন্টমেন্ট সাপেক্ষ"}
              </span>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {lang === "en" ? lawyer.bio : lawyer.bnBio}
            </p>

            {/* Key Credentials Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500">Education</span>
                  <span className="font-semibold text-slate-900">{lawyer.education}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500">Practicing Courts</span>
                  <span className="font-semibold text-slate-900">{lawyer.court}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500">Chamber Address</span>
                  <span className="font-semibold text-slate-900">{lawyer.chamberAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500">Chamber Hours</span>
                  <span className="font-semibold text-slate-900">{lawyer.visitingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Handled by This Advocate */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              {lang === "en"
                ? "Client Issues Handled by This Advocate"
                : "এই আইনজীবী যে সকল বিষয়ে সহায়তা করেন"}
            </h2>
            <div className="space-y-3">
              {matchedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === "en" ? issue.problemTitle : issue.bnProblemTitle}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    {lang === "en" ? issue.plainExplanation : issue.bnPlainExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Sticky Fee & Booking Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              {lang === "en" ? "Transparent Consultation Fees" : "পরামর্শ ফি বিবরণী"}
            </h2>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      {lang === "en" ? "Online Video Call" : "অনলাইন ভিডিও পরামর্শ"}
                    </span>
                    <span className="text-[11px] text-slate-500">30 mins via Google Meet / Zoom</span>
                  </div>
                </div>
                <span className="text-base font-bold text-slate-900">৳{lawyer.onlineFee}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      {lang === "en" ? "In-Chamber Visit" : "সরাসরি চেম্বার সাক্ষাৎ"}
                    </span>
                    <span className="text-[11px] text-slate-500">{lawyer.city} Chamber</span>
                  </div>
                </div>
                <span className="text-base font-bold text-slate-900">৳{lawyer.chamberFee}</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              {lang === "en" ? "Book Appointment Now" : "অ্যাপয়েন্টমেন্ট বুক করুন"}
            </button>

            <a
              href={`https://wa.me/${lawyer.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" />
              {lang === "en" ? "Message on WhatsApp" : "হোয়াটসঅ্যাপে বার্তা দিন"}
            </a>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              No hidden platform charges. Pay online via bKash/Nagad or directly at the chamber.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        lawyer={isBookingOpen ? lawyer : null}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default function AdvocateProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-600">
          Loading advocate profile...
        </div>
      }
    >
      <AdvocateProfileContent />
    </Suspense>
  );
}