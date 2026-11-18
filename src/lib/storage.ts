"use client";

import { useState, useEffect } from "react";
import {
  ClientCase,
  ConsultationBooking,
  LawyerProfile,
  initialCases,
  initialLawyers,
} from "@/data/content";
import { supabase } from "./supabase";

const DB_SYNC_EVENT = "ukil-db-sync";

function notifyDbSync() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DB_SYNC_EVENT));
  }
}

// --- LAWYERS ---
export function useLawyers(): LawyerProfile[] {
  const [lawyers, setLawyers] = useState<LawyerProfile[]>(initialLawyers);

  useEffect(() => {
    let active = true;
    async function fetchLawyers() {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0 && active) {
        const mapped: LawyerProfile[] = data.map((row) => ({
          id: row.id,
          userId: row.user_id,
          name: row.name,
          bnName: row.bn_name,
          title: row.title,
          education: row.education,
          barEnrollmentYear: row.bar_enrollment_year,
          barCouncilId: row.bar_council_id,
          isJuniorFriendly: row.is_junior_friendly,
          court: row.court,
          city: row.city,
          chamberAddress: row.chamber_address,
          visitingHours: row.visiting_hours,
          whatsapp: row.whatsapp,
          specialties: row.specialties || [],
          chamberFee: row.chamber_fee,
          onlineFee: row.online_fee,
          availableToday: row.available_today,
          languages: row.languages || ["Bangla", "English"],
          bio: row.bio,
          bnBio: row.bn_bio,
        }));
        setLawyers([...mapped, ...initialLawyers]);
      }
    }

    fetchLawyers();
    window.addEventListener(DB_SYNC_EVENT, fetchLawyers);
    return () => {
      active = false;
      window.removeEventListener(DB_SYNC_EVENT, fetchLawyers);
    };
  }, []);

  return lawyers;
}

export async function addStoredLawyer(lawyer: LawyerProfile) {
  const { error } = await supabase.from("lawyers").insert({
    id: lawyer.id,
    user_id: lawyer.userId || null,
    name: lawyer.name,
    bn_name: lawyer.bnName,
    title: lawyer.title,
    education: lawyer.education,
    bar_enrollment_year: lawyer.barEnrollmentYear,
    bar_council_id: lawyer.barCouncilId,
    is_junior_friendly: lawyer.isJuniorFriendly,
    court: lawyer.court,
    city: lawyer.city,
    chamber_address: lawyer.chamberAddress,
    visiting_hours: lawyer.visitingHours,
    whatsapp: lawyer.whatsapp,
    specialties: lawyer.specialties,
    chamber_fee: lawyer.chamberFee,
    online_fee: lawyer.onlineFee,
    available_today: lawyer.availableToday,
    languages: lawyer.languages,
    bio: lawyer.bio,
    bn_bio: lawyer.bnBio,
  });

  if (error) {
    console.error("Failed to save lawyer to Supabase:", error.message);
    alert(`Database error: ${error.message}`);
    return;
  }

  notifyDbSync();
}

export async function updateLawyerProfile(
  lawyerId: string,
  updates: {
    available_today?: boolean;
    online_fee?: number;
    chamber_fee?: number;
    visiting_hours?: string;
  }
) {
  const { error } = await supabase
    .from("lawyers")
    .update(updates)
    .eq("id", lawyerId);

  if (error) {
    alert(`Update failed: ${error.message}`);
    return false;
  }
  notifyDbSync();
  return true;
}

// --- CASES ---
export function useCases(): ClientCase[] {
  const [cases, setCases] = useState<ClientCase[]>(initialCases);

  useEffect(() => {
    let active = true;
    async function fetchCases() {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && active) {
        const mapped: ClientCase[] = data.map((row) => ({
          caseId: row.case_id,
          lawyerId: row.lawyer_id,
          clientPhone: row.client_phone,
          clientName: row.client_name,
          assignedLawyer: row.assigned_lawyer,
          caseNumber: row.case_number,
          courtName: row.court_name,
          caseType: row.case_type,
          status: row.status,
          nextHearingDate: row.next_hearing_date,
          lastOrderSummary: row.last_order_summary,
          documents: row.documents || [],
        }));
        setCases([...mapped, ...initialCases]);
      }
    }

    fetchCases();
    window.addEventListener(DB_SYNC_EVENT, fetchCases);
    return () => {
      active = false;
      window.removeEventListener(DB_SYNC_EVENT, fetchCases);
    };
  }, []);

  return cases;
}

export async function addStoredCase(newCase: ClientCase) {
  const { error } = await supabase.from("cases").insert({
    case_id: newCase.caseId,
    lawyer_id: newCase.lawyerId || null,
    client_phone: newCase.clientPhone,
    client_name: newCase.clientName,
    assigned_lawyer: newCase.assignedLawyer,
    case_number: newCase.caseNumber,
    court_name: newCase.courtName,
    case_type: newCase.caseType,
    status: newCase.status,
    next_hearing_date: newCase.nextHearingDate,
    last_order_summary: newCase.lastOrderSummary,
    documents: newCase.documents,
  });

  if (error) {
    console.error("Failed to save case:", error.message);
    alert(`Database error: ${error.message}`);
    return;
  }

  notifyDbSync();
}

export async function updateCaseRecord(
  caseId: string,
  updates: {
    status: string;
    next_hearing_date: string;
    last_order_summary: string;
  }
) {
  const { error } = await supabase
    .from("cases")
    .update(updates)
    .eq("case_id", caseId);

  if (error) {
    alert(`Case update failed: ${error.message}`);
    return false;
  }
  notifyDbSync();
  return true;
}

// --- BOOKINGS ---
export function useBookings(): ConsultationBooking[] {
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);

  useEffect(() => {
    let active = true;
    async function fetchBookings() {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && active) {
        setBookings(
          data.map((row) => ({
            id: row.id,
            lawyerId: row.lawyer_id,
            lawyerName: row.lawyer_name,
            clientName: row.client_name,
            phone: row.phone,
            matter: row.matter,
            mode: row.mode,
            date: row.booking_date,
            fee: row.fee,
            paymentStatus: row.payment_status,
            createdAt: new Date(row.created_at).toLocaleDateString(),
          }))
        );
      }
    }

    fetchBookings();
    window.addEventListener(DB_SYNC_EVENT, fetchBookings);
    return () => {
      active = false;
      window.removeEventListener(DB_SYNC_EVENT, fetchBookings);
    };
  }, []);

  return bookings;
}

export async function addStoredBooking(booking: ConsultationBooking) {
  const { error } = await supabase.from("bookings").insert({
    id: booking.id,
    lawyer_id: booking.lawyerId,
    lawyer_name: booking.lawyerName,
    client_name: booking.clientName,
    phone: booking.phone,
    matter: booking.matter,
    mode: booking.mode,
    booking_date: booking.date,
    fee: booking.fee,
    payment_status: booking.paymentStatus,
  });

  if (error) {
    console.error("Failed to save booking:", error.message);
    alert(`Database error: ${error.message}`);
    return;
  }

  notifyDbSync();
}