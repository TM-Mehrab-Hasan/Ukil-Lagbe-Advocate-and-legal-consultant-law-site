"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, CalendarClock, FileText, ArrowLeft, Scale, ShieldAlert, UserCheck } from "lucide-react";
import { useCases } from "@/lib/storage";

export default function ClientPortalPage() {
  const cases = useCases();
  const [query, setQuery] = useState("01711000000");
  const [searchedTerm, setSearchedTerm] = useState("01711000000");

  const cleaned = searchedTerm.trim().toLowerCase();
  const selectedCase = cleaned
    ? cases.find(
        (c) =>
          c.clientPhone === cleaned ||
          c.caseId.toLowerCase() === cleaned ||
          c.caseNumber.toLowerCase().includes(cleaned)
      ) ?? null
    : null;

  const handleLookup = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedTerm(query);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Bar */}
      <div className="bg-slate-950 text-white py-4 px-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm sm:text-base">
              Client Case Tracking Portal
            </span>
          </div>
          <Link
            href="/"
            className="text-xs sm:text-sm text-slate-300 hover:text-amber-400 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8">
        {/* Search Box */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <h1 className="text-xl font-bold text-slate-900">Track Case Status & Next Hearing Date</h1>
          <p className="text-sm text-slate-600 mt-1 mb-4">
            Enter your registered mobile number (demo: <code className="bg-slate-100 px-1.5 py-0.5 rounded">01711000000</code>) or Case Number.
          </p>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mobile Number or Case Number..."
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-amber-600"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-amber-400" />
              Find Case
            </button>
          </form>

          {searchedTerm && !selectedCase && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              No active case found for &ldquo;{searchedTerm}&rdquo;. Try demo phone &apos;01711000000&apos;.
            </div>
          )}
        </div>

        {/* Case Details Card */}
        {selectedCase && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="bg-slate-900 text-white p-6 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  {selectedCase.courtName}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold mt-1">
                  {selectedCase.caseNumber}
                </h2>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  Advocate: {selectedCase.assignedLawyer} • Client: {selectedCase.clientName}
                </p>
              </div>

              <div className="bg-amber-500/15 border border-amber-500/40 px-4 py-2.5 rounded-lg text-right">
                <span className="block text-xs text-amber-300 font-medium">
                  Next Hearing Date (Tarikh)
                </span>
                <span className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <CalendarClock className="w-4 h-4 text-amber-400" />
                  {selectedCase.nextHearingDate}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase text-slate-500">
                  Current Status
                </span>
                <p className="mt-1 inline-block ml-3 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  {selectedCase.status}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">
                  Last Court Order Summary
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {selectedCase.lastOrderSummary}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Case Filings & Certified Copies
                </h3>
                {selectedCase.documents.length === 0 ? (
                  <p className="text-xs text-slate-500">No PDF filings uploaded yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedCase.documents.map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-amber-600" />
                          <div>
                            <p className="text-sm font-medium text-slate-800">{doc.title}</p>
                            <p className="text-xs text-slate-500">Uploaded: {doc.date}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => alert(`Demo mode: Connect cloud storage to download ${doc.title}`)}
                          className="text-xs font-semibold text-amber-700 hover:text-amber-600 cursor-pointer"
                        >
                          Download PDF
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}