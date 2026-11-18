"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ArrowLeft, FolderLock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language } from "@/data/content";

function PaymentReceiptContent() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Language>("en");

  const bookingId = searchParams.get("bookingId") || "N/A";
  const method = searchParams.get("method") || "Online Payment";
  const amount = searchParams.get("amount") || "";
  const isFailed = searchParams.get("status") === "failed";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar lang={lang} setLang={setLang} />

      <main className="flex-1 max-w-lg w-full mx-auto py-16 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center space-y-5">
          {isFailed ? (
            <>
              <AlertTriangle className="w-14 h-14 text-amber-500 mx-auto" />
              <h1 className="text-2xl font-bold text-slate-900">
                Payment Cancelled or Incomplete
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your consultation slot (Ref: <strong>{bookingId}</strong>) is saved as{" "}
                <strong>Pending Payment</strong>. You can pay directly at the chamber or retry booking anytime.
              </p>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h1 className="text-2xl font-bold text-slate-900">
                Consultation Payment Confirmed!
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your appointment fee has been verified and recorded in the advocate&apos;s diary.
              </p>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-bold text-slate-900">{bookingId}</span>
                </div>
                {amount && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Paid:</span>
                    <span className="font-bold text-emerald-700">৳{amount} BDT</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Channel:</span>
                  <span className="font-semibold text-slate-900">{method}</span>
                </div>
              </div>
            </>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg inline-flex items-center justify-center gap-1.5"
            >
              <FolderLock className="w-4 h-4 text-amber-400" />
              Go to Case Tracker
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 border border-slate-300 hover:border-slate-900 text-slate-800 text-xs font-semibold rounded-lg inline-flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Directory
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-600">
          Verifying payment receipt...
        </div>
      }
    >
      <PaymentReceiptContent />
    </Suspense>
  );
}