"use client";

import { useState } from "react";
import { X, CheckCircle2, Calendar, Video, Building2, CreditCard, Loader2 } from "lucide-react";
import { Language, LawyerProfile } from "@/data/content";
import { addStoredBooking } from "@/lib/storage";

interface BookingModalProps {
  lawyer: LawyerProfile | null;
  onClose: () => void;
  lang: Language;
}

export default function BookingModal({ lawyer, onClose, lang }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<"chamber" | "online">("online");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [matter, setMatter] = useState("");
  const [payNow, setPayNow] = useState(true);

  if (!lawyer) return null;

  const activeFee = mode === "chamber" ? lawyer.chamberFee : lawyer.onlineFee;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = `BK-${Date.now().toString().slice(-6)}`;

    await addStoredBooking({
      id: bookingId,
      lawyerId: lawyer.id,
      lawyerName: lawyer.name,
      clientName: name,
      phone,
      matter: matter || "General Legal Consultation",
      mode,
      date,
      fee: `৳${activeFee}`,
      paymentStatus: "Pending",
      createdAt: new Date().toLocaleDateString(),
    });

    if (payNow) {
      try {
        const res = await fetch("/api/payment/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId,
            amount: activeFee,
            clientName: name,
            phone,
            matter,
            lawyerName: lawyer.name,
          }),
        });

        const data = await res.json();
        if (data.gatewayUrl) {
          window.location.href = data.gatewayUrl;
          return;
        } else {
          alert(data.error || "Could not open payment gateway. Booking saved as Pending.");
        }
      } catch {
        alert("Payment gateway unreachable. Booking saved as Pending.");
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setDate("");
    setMatter("");
    setPayNow(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">
              {lang === "en" ? "Consultation Booked!" : "পরামর্শ বুকিং সম্পন্ন হয়েছে!"}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === "en"
                ? `Your request with ${lawyer.name} (Fee: ৳${activeFee}) has been saved as Pay at Chamber.`
                : `${lawyer.bnName}-এর সাথে আপনার অ্যাপয়েন্টমেন্ট অনুরোধ সংরক্ষণ করা হয়েছে (ফি: ৳${activeFee})।`}
            </p>
            <button
              onClick={resetAndClose}
              className="mt-4 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              {lang === "en" ? "Done" : "বন্ধ করুন"}
            </button>
          </div>
        ) : (
          <>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {lang === "en" ? "Book Appointment With" : "অ্যাপয়েন্টমেন্ট নিন"}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {lang === "en" ? lawyer.name : lawyer.bnName}
            </h3>
            <p className="text-xs text-slate-500 mb-5">{lawyer.court}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMode("online")}
                  className={`p-3 rounded-lg border text-left text-xs font-medium flex items-start gap-2.5 cursor-pointer ${
                    mode === "online"
                      ? "border-amber-600 bg-amber-50 text-slate-900"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  <Video className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {lang === "en" ? "Online Video Call" : "অনলাইন ভিডিও কল"} —{" "}
                    <strong>৳{lawyer.onlineFee}</strong>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("chamber")}
                  className={`p-3 rounded-lg border text-left text-xs font-medium flex items-start gap-2.5 cursor-pointer ${
                    mode === "chamber"
                      ? "border-amber-600 bg-amber-50 text-slate-900"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  <Building2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {lang === "en" ? "In-Chamber Visit" : "সরাসরি চেম্বার"} —{" "}
                    <strong>৳{lawyer.chamberFee}</strong>
                  </span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === "en" ? "Your Full Name" : "আপনার পূর্ণ নাম"}
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === "en" ? "Mobile Number" : "মোবাইল নম্বর"}
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === "en" ? "Preferred Date" : "পছন্দের তারিখ"}
                  </label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === "en" ? "Briefly describe your issue" : "আপনার সমস্যা সংক্ষেপে লিখুন"}
                </label>
                <textarea
                  rows={2}
                  required
                  value={matter}
                  onChange={(e) => setMatter(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={payNow}
                  onChange={(e) => setPayNow(e.target.checked)}
                  className="accent-amber-600"
                />
                <CreditCard className="w-4 h-4 text-pink-600 shrink-0" />
                <span>
                  {lang === "en"
                    ? `Pay ৳${activeFee} online now (bKash / Nagad / Rocket / Card)`
                    : `অনলাইনে এখনই ৳${activeFee} পরিশোধ করুন (বিকাশ / নগদ / কার্ড)`}
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                ) : (
                  <Calendar className="w-4 h-4 text-amber-400" />
                )}
                {isSubmitting
                  ? lang === "en"
                    ? "Connecting to Payment Gateway..."
                    : "পেমেন্ট গেটওয়েতে যুক্ত হচ্ছে..."
                  : payNow
                  ? lang === "en"
                    ? `Proceed to Pay ৳${activeFee}`
                    : `৳${activeFee} পরিশোধ করুন`
                  : lang === "en"
                  ? "Confirm Booking (Pay at Chamber)"
                  : "বুকিং নিশ্চিত করুন"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}