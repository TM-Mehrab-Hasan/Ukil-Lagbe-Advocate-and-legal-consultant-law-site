"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, Plus, Calendar, Users, ArrowLeft, Lock } from "lucide-react";
import { ClientCase } from "@/data/content";
import { useCases, saveStoredCases, useBookings, useLawyers } from "@/lib/storage";

export default function PlatformAdminDiaryPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");

  const cases = useCases();
  const bookings = useBookings();
  const lawyers = useLawyers();

  // New Case Form State
  const [assignedLawyer, setAssignedLawyer] = useState("Adv. Nusrat Jahan Chowdhury");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [courtName, setCourtName] = useState("High Court Division, Supreme Court of Bangladesh");
  const [caseType, setCaseType] = useState("Civil / Land Matter");
  const [status, setStatus] = useState("Notice Issued");
  const [nextHearingDate, setNextHearingDate] = useState("");
  const [lastOrderSummary, setLastOrderSummary] = useState("");

  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin === "1234") setAuthenticated(true);
    else alert("Invalid PIN. Use demo PIN: 1234");
  };

  const handleAddCase = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCase: ClientCase = {
      caseId: `CASE-${100 + cases.length + 1}`,
      assignedLawyer,
      clientName,
      clientPhone,
      caseNumber,
      courtName,
      caseType,
      status,
      nextHearingDate,
      lastOrderSummary: lastOrderSummary || "Case registered in advocate diary.",
      documents: [],
    };
    saveStoredCases([newCase, ...cases]);

    setClientName("");
    setClientPhone("");
    setCaseNumber("");
    setNextHearingDate("");
    setLastOrderSummary("");
    alert("Case published! The client can now track it on /dashboard using their phone number.");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-slate-900 border border-slate-800 p-8 rounded-xl max-w-sm w-full space-y-4 text-white"
        >
          <div className="flex items-center gap-2 text-amber-400">
            <Lock className="w-5 h-5" />
            <span className="font-bold text-sm uppercase tracking-wider">Advocate Diary</span>
          </div>
          <h1 className="text-xl font-bold">UkilSheba Global</h1>
          <p className="text-xs text-slate-400">Enter Advocate / Admin PIN (Demo PIN: 1234)</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 font-semibold text-sm rounded-lg cursor-pointer"
          >
            Open Lawyer Diary
          </button>
          <Link href="/" className="block text-center text-xs text-slate-400 hover:text-white pt-2">
            ← Back to Directory
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-950 text-white py-4 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm sm:text-base">
              Advocate Case Diary & Appointment Manager
            </span>
          </div>
          <Link href="/" className="text-xs text-slate-300 hover:text-amber-400 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Public Directory
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 grid lg:grid-cols-12 gap-8">
        {/* Left Column: Add / Update Client Case */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs h-fit">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5 text-amber-600" />
            Add Case to Client Tracker
          </h2>
          <form onSubmit={handleAddCase} className="space-y-3 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned Advocate
              </label>
              <select
                value={assignedLawyer}
                onChange={(e) => setAssignedLawyer(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg bg-white"
              >
                {lawyers.map((l) => (
                  <option key={l.id} value={l.name}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              required
              placeholder="Client Full Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
            />
            <input
              required
              placeholder="Client Mobile (used for portal lookup)"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
            />
            <input
              required
              placeholder="Case Number (e.g., Title Suit No. 45/2026)"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
            />
            <input
              required
              placeholder="Court Name"
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="Status (e.g., Hearing)"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
              />
              <input
                required
                type="date"
                value={nextHearingDate}
                onChange={(e) => setNextHearingDate(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <textarea
              rows={3}
              placeholder="Last Court Order / Next Step Notes..."
              value={lastOrderSummary}
              onChange={(e) => setLastOrderSummary(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg cursor-pointer"
            >
              Publish to Client Portal
            </button>
          </form>
        </div>

        {/* Right Column: Bookings & Active Cases */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-amber-600" />
              Client Consultation Bookings ({bookings.length})
            </h2>
            {bookings.length === 0 ? (
              <p className="text-xs text-slate-500">
                No appointments booked yet. Click &ldquo;Book Consultation&rdquo; on any lawyer card on the homepage to test!
              </p>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-lg border border-slate-200 flex flex-wrap justify-between items-center gap-2 text-xs"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase">
                        For: {b.lawyerName}
                      </span>
                      <p className="font-bold text-slate-900 text-sm">
                        {b.clientName} ({b.phone})
                      </p>
                      <p className="text-slate-600">
                        {b.matter} • {b.mode === "online" ? "Online Video" : "In-Chamber"} • Date: {b.date}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full font-semibold ${
                        b.paymentStatus.startsWith("Paid")
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.fee} — {b.paymentStatus}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-amber-600" />
              Tracked Cases ({cases.length})
            </h2>
            <div className="space-y-3">
              {cases.map((c) => (
                <div
                  key={c.caseId}
                  className="p-3.5 rounded-lg border border-slate-200 flex justify-between items-center text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{c.caseNumber}</p>
                    <p className="text-slate-600">
                      Client: {c.clientName} ({c.clientPhone}) • {c.assignedLawyer}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-semibold text-amber-700">
                      Next Tarikh: {c.nextHearingDate}
                    </span>
                    <span className="text-slate-500">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}