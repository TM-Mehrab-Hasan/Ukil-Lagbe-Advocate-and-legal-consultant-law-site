import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const formData = await req.formData();
  const tranId = formData.get("tran_id") as string;
  const cardType = (formData.get("card_type") as string) || "SSLCommerz";
  const amount = (formData.get("amount") as string) || "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (tranId) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase
      .from("bookings")
      .update({ payment_status: `Paid (${cardType})` })
      .eq("id", tranId);
  }

  return NextResponse.redirect(
    `${appUrl}/payment/success?bookingId=${encodeURIComponent(tranId || "")}&method=${encodeURIComponent(cardType)}&amount=${encodeURIComponent(amount)}`,
    303
  );
}