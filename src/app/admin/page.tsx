"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import {
  Scale,
  Plus,
  Calendar,
  Users,
  ArrowLeft,
  Lock,
  Loader2,
  LogOut,
  CheckCircle2,
  ExternalLink,
  Save,
  Edit3,
  X,
} from "lucide-react";
import { ClientCase } from "@/data/content";
import {
  useCases,
  addStoredCase,
  updateCaseRecord,
  useBookings,
  useLawyers,
  updateLawyerProfile,
} from "@/lib/storage";
import { supabase } from "@/lib/supabase";

export default function AdvocatePrivateWorkspacePage() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const lawyers = useLawyers();
  const allCases = useCases();
  const allBookings = useBookings();

  // Check active Supabase session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const myProfile = user ? lawyers.find((l) => l.userId === user.id) : undefined;

  // Profile quick-edit state
  const [availableToday, setAvailableToday] = useState<boolean | null>(null);
  const [onlineFeeInput, setOnlineFeeInput] = useState<string>("");
  const [chamberFeeInput, setChamberFeeInput] = useState<string>("");
  const [savingProfile, setSavingProfile] = useState(false);

  // New Case Form State
  const [isSubmittingCase, setIsSubmittingCase] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [courtName, setCourtName] = useState("High Court Division, Supreme Court of Bangladesh");
  const [caseType, setCaseType] = useState("Civil / Land Matter");
  const [status, setStatus] = useState("Notice Issued");
  const [nextHearingDate, setNextHearingDate] = useState("");
  const [lastOrderSummary, setLastOrderSummary] = useState("");

  // Edit Existing Case Track State
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNextDate, setEditNextDate] = useState("");
  const [editOrderSummary, setEditOrderSummary] = useState("");
  const [updatingCase, setUpdatingCase] = useState(false);

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setAuthLoading(false);
    if (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const effectiveAvailability =
    availableToday !== null ? availableToday : (myProfile?.availableToday ?? true);
  const effectiveOnlineFee =
    onlineFeeInput !== "" ? Number(onlineFeeInput) : (myProfile?.onlineFee ?? 500);
  const effectiveChamberFee =
    chamberFeeInput !== "" ? Number(chamberFeeInput) : (myProfile?.chamberFee ?? 800);

  const handleSaveProfileSettings = async () => {
    if (!myProfile) return;
    setSavingProfile(true);
    const ok = await updateLawyerProfile(myProfile.id, {
      available_today: effectiveAvailability,
      online_fee: effectiveOnlineFee,
      chamber_fee: effectiveChamberFee,
    });
    setSavingProfile(false);
    if (ok) alert("Your public availability and consultation fees have been updated!");
  };

  const handleAddCase = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!myProfile) return;
    setIsSubmittingCase(true);

    const newCase: ClientCase = {
      caseId: `CASE-${Date.now().toString().slice(-4)}`,
      lawyerId: myProfile.id,
      assignedLawyer: myProfile.name,
      clientName,
      clientPhone: clientPhone.trim(),
      caseNumber,
      courtName,
      caseType,
      status,
      nextHearingDate,
      lastOrderSummary: lastOrderSummary || "Case registered in advocate diary.",
      documents: [],
    };

    await addStoredCase(newCase);

    setIsSubmittingCase(false);
    setClientName("");
    setClientPhone("");
    setCaseNumber("");
    setNextHearingDate("");
    setLastOrderSummary("");
  };

  const startEditingCase = (c: ClientCase) => {
    setEditingCaseId(c.caseId);
    setEditStatus(c.status);
    setEditNextDate(c.nextHearingDate);
    setEditOrderSummary(c.lastOrderSummary);
  };

  const handleSaveCaseTrack = async (caseId: string) => {
    setUpdatingCase(true);
    const ok = await updateCaseRecord(caseId, {
      status: editStatus,
      next_hearing_date: editNextDate,
      last_order_summary: editOrderSummary,
    });
    setUpdatingCase(false);
    if (ok) {
      setEditingCaseId(null);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300 text-sm">
        Checking advocate session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full space-y-4 text-white shadow-2xl"
        >
          <div className="flex items-center gap-2 text-amber-400">
            <Lock className="w-5 h-5" />
            <span className="font-bold text-xs uppercase tracking-wider">Advocate Portal</span>
          </div>
          <h1 className="text-2xl font-bold">Sign in to Your Lawyer Diary</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Manage your public profile, availability status, consultation appointments, and client hearing dates.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="advocate@example.com"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            {authLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {authLoading ? "Signing in..." : "Sign In to Workspace"}
          </button>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              ← Public Directory
            </Link>
            <Link href="/join-lawyer" className="text-amber-400 hover:underline font-semibold">
              Create Advocate Account →
            </Link>
          </div>
        </form>
      </div>
    );
  }

  const myBookings = myProfile
    ? allBookings.filter((b) => b.lawyerId === myProfile.id)
    : [];
  const myCases = myProfile
    ? allCases.filter((c) => c.lawyerId === myProfile.id || c.assignedLawyer === myProfile.name)
    : [];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-950 text-white py-4 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <div>
              <span className="font-bold text-sm sm:text-base block">
                {myProfile ? myProfile.name : user.email}
              </span>
              <span className="text-[11px] text-slate-400">Private Advocate Workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {myProfile && (
              <Link
                href={`/lawyers/${myProfile.id}`}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                View Public Profile <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
            <Link href="/" className="text-slate-300 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Directory
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
        {/* Profile Availability & Fee Control Bar */}
        {myProfile && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Live Directory Controls
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAvailableToday(!effectiveAvailability)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border flex items-center gap-2 cursor-pointer transition ${
                    effectiveAvailability
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                      : "bg-slate-100 border-slate-300 text-slate-600"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {effectiveAvailability ? "Status: Available Today" : "Status: By Appointment Only"}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Online Fee (BDT)</label>
                <input
                  type="number"
                  value={effectiveOnlineFee}
                  onChange={(e) => setOnlineFeeInput(e.target.value)}
                  className="w-28 px-3 py-2 border border-slate-300 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chamber Fee (BDT)</label>
                <input
                  type="number"
                  value={effectiveChamberFee}
                  onChange={(e) => setChamberFeeInput(e.target.value)}
                  className="w-28 px-3 py-2 border border-slate-300 rounded-lg font-bold"
                />
              </div>
              <button
                onClick={handleSaveProfileSettings}
                disabled={savingProfile}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Add Client Case */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs h-fit">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-amber-600" />
              Add Client Case to Tracker
            </h2>
            <form onSubmit={handleAddCase} className="space-y-3 text-sm">
              <input
                required
                placeholder="Client Full Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
              />
              <input
                required
                placeholder="Client Mobile (used for /dashboard lookup)"
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
              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option>Civil / Land Matter</option>
                <option>Constitutional / Writ</option>
                <option>Family / Custody</option>
                <option>Criminal / NI Act</option>
                <option>Corporate / Tax</option>
              </select>
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
                disabled={isSubmittingCase || !myProfile}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmittingCase && <Loader2 className="w-4 h-4 animate-spin text-amber-400" />}
                {isSubmittingCase ? "Saving Case..." : "Publish to Client Portal"}
              </button>
            </form>
          </div>

          {/* Right Column: My Bookings & My Cases */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-amber-600" />
                My Consultation Appointments ({myBookings.length})
              </h2>
              {myBookings.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No appointments booked for your profile yet. Share your public profile link with clients!
                </p>
              ) : (
                <div className="space-y-3">
                  {myBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-lg border border-slate-200 flex flex-wrap justify-between items-center gap-2 text-xs"
                    >
                      <div>
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

            {/* Active Cases with Inline Track Editor */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-amber-600" />
                My Active Cases ({myCases.length})
              </h2>
              {myCases.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No cases added yet. Use the form on the left to register a client case.
                </p>
              ) : (
                <div className="space-y-4">
                  {myCases.map((c) => {
                    const isEditing = editingCaseId === c.caseId;

                    return (
                      <div
                        key={c.caseId}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs"
                      >
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{c.caseNumber}</p>
                            <p className="text-slate-600">
                              Client: {c.clientName} ({c.clientPhone}) • {c.courtName}
                            </p>
                          </div>

                          {!isEditing && (
                            <button
                              type="button"
                              onClick={() => startEditingCase(c)}
                              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-amber-600 text-slate-800 font-semibold flex items-center gap-1.5 cursor-pointer transition"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                              Update Track / Tarikh
                            </button>
                          )}
                        </div>

                        {isEditing ? (
                          <div className="bg-white p-4 rounded-lg border border-amber-300 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-amber-800 uppercase tracking-wider text-[11px]">
                                Update Hearing Status & Next Tarikh
                              </span>
                              <button
                                type="button"
                                onClick={() => setEditingCaseId(null)}
                                className="text-slate-400 hover:text-slate-700 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                  Current Case Status
                                </label>
                                <input
                                  value={editStatus}
                                  onChange={(e) => setEditStatus(e.target.value)}
                                  placeholder="e.g., Witness Examination / Stay Extended"
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                  Next Hearing Date (Tarikh)
                                </label>
                                <input
                                  type="date"
                                  value={editNextDate}
                                  onChange={(e) => setEditNextDate(e.target.value)}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                Latest Court Order Summary (Visible to Client)
                              </label>
                              <textarea
                                rows={2}
                                value={editOrderSummary}
                                onChange={(e) => setEditOrderSummary(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                              />
                            </div>

                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingCaseId(null)}
                                className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                disabled={updatingCase}
                                onClick={() => handleSaveCaseTrack(c.caseId)}
                                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-1.5 cursor-pointer"
                              >
                                {updatingCase && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                Save & Notify Client Tracker
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="pt-2 border-t border-slate-200/80 flex flex-wrap justify-between items-center gap-2">
                            <p className="text-slate-700 max-w-md">{c.lastOrderSummary}</p>
                            <div className="text-right shrink-0">
                              <span className="block font-bold text-amber-700">
                                Next Tarikh: {c.nextHearingDate}
                              </span>
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                                {c.status}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}