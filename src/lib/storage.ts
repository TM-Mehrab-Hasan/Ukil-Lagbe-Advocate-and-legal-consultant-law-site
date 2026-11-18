"use client";

import { useSyncExternalStore } from "react";
import {
  ClientCase,
  ConsultationBooking,
  LawyerProfile,
  initialCases,
  initialLawyers,
} from "@/data/content";

const LAWYERS_KEY = "ukil_platform_lawyers_v1";
const CASES_KEY = "ukil_platform_cases_v1";
const BOOKINGS_KEY = "ukil_platform_bookings_v1";
const STORAGE_EVENT = "ukil-storage-update";

function notifyStorageUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

// --- LAWYERS ---
let cachedLawyersRaw: string | null = null;
let cachedLawyers: LawyerProfile[] = initialLawyers;

export function getStoredLawyers(): LawyerProfile[] {
  if (typeof window === "undefined") return initialLawyers;
  const raw = localStorage.getItem(LAWYERS_KEY);
  if (!raw) {
    localStorage.setItem(LAWYERS_KEY, JSON.stringify(initialLawyers));
    return initialLawyers;
  }
  if (raw !== cachedLawyersRaw) {
    cachedLawyersRaw = raw;
    cachedLawyers = JSON.parse(raw);
  }
  return cachedLawyers;
}

export function useLawyers(): LawyerProfile[] {
  return useSyncExternalStore(subscribe, getStoredLawyers, () => initialLawyers);
}

export function addStoredLawyer(lawyer: LawyerProfile) {
  if (typeof window === "undefined") return;
  const existing = getStoredLawyers();
  localStorage.setItem(LAWYERS_KEY, JSON.stringify([lawyer, ...existing]));
  notifyStorageUpdate();
}

// --- CASES ---
let cachedCasesRaw: string | null = null;
let cachedCases: ClientCase[] = initialCases;

export function getStoredCases(): ClientCase[] {
  if (typeof window === "undefined") return initialCases;
  const raw = localStorage.getItem(CASES_KEY);
  if (!raw) {
    localStorage.setItem(CASES_KEY, JSON.stringify(initialCases));
    return initialCases;
  }
  if (raw !== cachedCasesRaw) {
    cachedCasesRaw = raw;
    cachedCases = JSON.parse(raw);
  }
  return cachedCases;
}

export function useCases(): ClientCase[] {
  return useSyncExternalStore(subscribe, getStoredCases, () => initialCases);
}

export function saveStoredCases(cases: ClientCase[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CASES_KEY, JSON.stringify(cases));
  notifyStorageUpdate();
}

// --- BOOKINGS ---
const emptyBookings: ConsultationBooking[] = [];
let cachedBookingsRaw: string | null = null;
let cachedBookings: ConsultationBooking[] = emptyBookings;

export function getStoredBookings(): ConsultationBooking[] {
  if (typeof window === "undefined") return emptyBookings;
  const raw = localStorage.getItem(BOOKINGS_KEY);
  if (!raw) return emptyBookings;
  if (raw !== cachedBookingsRaw) {
    cachedBookingsRaw = raw;
    cachedBookings = JSON.parse(raw);
  }
  return cachedBookings;
}

export function useBookings(): ConsultationBooking[] {
  return useSyncExternalStore(subscribe, getStoredBookings, () => emptyBookings);
}

export function addStoredBooking(booking: ConsultationBooking) {
  if (typeof window === "undefined") return;
  const existing = getStoredBookings();
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([booking, ...existing]));
  notifyStorageUpdate();
}