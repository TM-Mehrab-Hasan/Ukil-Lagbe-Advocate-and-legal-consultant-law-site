import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const tranId = (formData.get("tran_id") as string) || "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return NextResponse.redirect(
    `${appUrl}/payment/success?bookingId=${encodeURIComponent(tranId)}&status=failed`,
    303
  );
}