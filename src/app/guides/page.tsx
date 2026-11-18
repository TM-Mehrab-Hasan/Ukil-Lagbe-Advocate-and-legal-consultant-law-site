"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ArrowRight, Scale, FileCheck2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language, legalIssues } from "@/data/content";
import { useLawyers } from "@/lib/storage";

export default function LegalGuidesPage() {
  const [lang, setLang] = useState<Language>("en");
  const lawyers = useLawyers();

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${lang === "bn" ? "font-[family-name:var(--font-bangla)]" : ""}`}>
      <Navbar lang={lang} setLang={setLang} />

      {/* Header */}
      <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            {lang === "en" ? "Citizen Legal Literacy Hub" : "সাধারণ মানুষের জন্য আইনি সহায়িকা"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {lang === "en"
              ? "Which Type of Lawyer Should You Look For?"
              : "আপনার সমস্যার জন্য কোন ধরনের আইনজীবী খুঁজবেন?"}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {lang === "en"
              ? "Understanding legal categories saves you time and money. Explore each common legal situation below to learn which specialist handles it, the step-by-step court process, and required documents."
              : "সঠিক আইনজীবী নির্বাচন করতে পারলে সময় ও অর্থ উভয়ই বাঁচে। নিচের প্রতিটি আইনি সমস্যার ধরন, প্রয়োজনীয় কাগজপত্র এবং সংশ্লিষ্ট বিশেষজ্ঞ আইনজীবীদের তালিকা দেখুন।"}
          </p>
        </div>
      </section>

      {/* Detailed Guides */}
      <main className="flex-1 max-w-5xl w-full mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        {legalIssues.map((guide, index) => {
          const matchingLawyers = lawyers.filter((l) =>
            l.specialties.includes(guide.id)
          );

          return (
            <article
              key={guide.id}
              id={guide.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Category 0{index + 1} •{" "}
                    {lang === "en" ? guide.lawyerTypeNeeded : guide.bnLawyerTypeNeeded}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {lang === "en" ? guide.problemTitle : guide.bnProblemTitle}
                  </h2>
                </div>

                <Link
                  href={`/?issue=${guide.id}#directory`}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition"
                >
                  <span>
                    {lang === "en"
                      ? `View ${matchingLawyers.length} Available Lawyers`
                      : `${matchingLawyers.length} জন আইনজীবী দেখুন`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {lang === "en" ? guide.plainExplanation : guide.bnPlainExplanation}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Step-by-step Action */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-600" />
                    {lang === "en" ? "Typical Legal Process" : "সাধারণ আইনি প্রক্রিয়া"}
                  </h3>
                  <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
                    {guide.stepByStep.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Required Documents */}
                <div className="bg-amber-50/60 p-5 rounded-xl border border-amber-200/80 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-amber-700" />
                    {lang === "en" ? "Documents to Prepare" : "প্রয়োজনীয় কাগজপত্র"}
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-800">
                    {guide.checklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Linked Advocates Preview */}
              <div className="pt-2">
                <span className="block text-xs font-semibold text-slate-500 mb-2.5">
                  {lang === "en"
                    ? "Verified Advocates Practicing in This Area:"
                    : "এই বিষয়ে অভিজ্ঞ ও নবীন আইনজীবীগণ:"}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {matchingLawyers.map((lawyer) => (
                    <Link
                      key={lawyer.id}
                      href={`/lawyers/${lawyer.id}`}
                      className="px-3.5 py-2 rounded-lg border border-slate-200 hover:border-amber-500 bg-white text-xs font-semibold text-slate-800 flex items-center gap-2 transition"
                    >
                      <span>{lang === "en" ? lawyer.name : lawyer.bnName}</span>
                      <span className="text-amber-700">• ৳{lawyer.onlineFee}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}