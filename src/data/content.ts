export type Language = 'en' | 'bn';

export interface LawyerProfile {
  id: string;
  name: string;
  bnName: string;
  title: string;
  education: string;
  barEnrollmentYear: number;
  barCouncilId: string;
  isJuniorFriendly: boolean;
  court: string;
  city: string;
  chamberAddress: string;
  visitingHours: string;
  whatsapp: string;
  specialties: string[];
  chamberFee: number;
  onlineFee: number;
  availableToday: boolean;
  languages: string[];
  bio: string;
  bnBio: string;
}

export interface LegalIssueGuide {
  id: string;
  problemTitle: string;
  bnProblemTitle: string;
  lawyerTypeNeeded: string;
  bnLawyerTypeNeeded: string;
  plainExplanation: string;
  bnPlainExplanation: string;
  checklist: string[];
  stepByStep: string[];
}

export const legalIssues: LegalIssueGuide[] = [
  {
    id: "land",
    problemTitle: "Land Dispute, Khatian / Mutation, or Property Deed",
    bnProblemTitle: "জমি দখল, খতিয়ান / নামজারি বা দলিল সংক্রান্ত সমস্যা",
    lawyerTypeNeeded: "Civil & Land Property Advocate",
    bnLawyerTypeNeeded: "দেওয়ানি ও জমি-জমা বিষয়ক আইনজীবী (Civil Lawyer)",
    plainExplanation:
      "Ownership disputes, fake deeds, or boundary issues are handled in Civil Courts (Assistant Judge / District Judge Court) and Land Revenue offices.",
    bnPlainExplanation:
      "জমির মালিকানা, জাল দলিল বা সীমানা বিরোধ দেওয়ানি আদালতে (সহকারী জজ বা জেলা জজ আদালত) এবং ভূমি অফিসে নিষ্পত্তি হয়।",
    checklist: [
      "CS, SA, RS, or BS Khatian copies",
      "Registered Sale/Gift Deed (Dalil)",
      "Up-to-date Land Development Tax (Khajna) receipt",
    ],
    stepByStep: [
      "Collect certified copies of all historical Khatians (CS, SA, RS, BS) from the Sub-Registry or AC Land office.",
      "Have a Civil Advocate perform a 25-year chain-of-title vetting before buying or filing a suit.",
      "File a Title Suit or Permanent Injunction in the local Assistant Judge / Joint District Judge Court if possession is threatened.",
    ],
  },
  {
    id: "family",
    problemTitle: "Divorce, Denmohor, Maintenance, or Child Custody",
    bnProblemTitle: "তালাক, দেনমোহর, ভরণপোষণ বা সন্তানের অভিভাবকত্ব",
    lawyerTypeNeeded: "Family Court Advocate",
    bnLawyerTypeNeeded: "পারিবারিক আদালত আইনজীবী (Family Lawyer)",
    plainExplanation:
      "Marriage dissolution, unpaid dower (Denmohor), maintenance, and child guardianship are resolved under the Family Courts Ordinance.",
    bnPlainExplanation:
      "বিবাহ বিচ্ছেদ, বকেয়া দেনমোহর, ভরণপোষণ এবং সন্তানের অভিভাবকত্ব পারিবারিক আদালতে নিষ্পত্তি হয়।",
    checklist: [
      "Nikahnama (Marriage Certificate)",
      "NID copies of both parties",
      "Any prior legal notices or City Corporation / Union Parishad notices",
    ],
    stepByStep: [
      "Serve a formal written Talaq notice to the spouse and the local City Corporation Mayor / Union Parishad Chairman.",
      "Attend the mandatory 90-day reconciliation arbitration council meetings.",
      "File a Family Suit in the Family Court to recover unpaid Denmohor, maintenance (Iddat & child support), or custody.",
    ],
  },
  {
    id: "criminal",
    problemTitle: "False Case, Police Arrest, Bail, or Bounced Cheque",
    bnProblemTitle: "মিথ্যা মামলা, গ্রেফতার, জামিন বা চেক ডিজঅনার",
    lawyerTypeNeeded: "Criminal Defense & NI Act Advocate",
    bnLawyerTypeNeeded: "ফৌজদারি ও চেক ডিজঅনার আইনজীবী (Criminal Lawyer)",
    plainExplanation:
      "Bail applications (anticipatory or regular), FIR quashing, and dishonored cheque cases (Section 138 of NI Act) require a Criminal Law practitioner.",
    bnPlainExplanation:
      "আগাম বা নিয়মিত জামিন, ফৌজদারি মামলা এবং চেক ডিজঅনার (NI Act ১৩৮ ধারা) মামলার জন্য ফৌজদারি আইনজীবী প্রয়োজন।",
    checklist: [
      "Copy of FIR / Ejahar or Complaint",
      "Dishonored Cheque & Bank Return Memo",
      "30-day Legal Notice copy & postal receipt",
    ],
    stepByStep: [
      "For a bounced cheque: Send a formal legal notice within 30 days of receiving the bank dishonor slip.",
      "Give the issuer 30 days to pay; if unpaid, file a CR Case under Section 138 of the Negotiable Instruments Act within the next 30 days.",
      "For false FIRs: Consult a High Court advocate immediately for Anticipatory Bail (আগাম জামিন).",
    ],
  },
  {
    id: "corporate",
    problemTitle: "Company Registration (RJSC), Startup Contracts, or Tax",
    bnProblemTitle: "কোম্পানি নিবন্ধন (RJSC), চুক্তি বা আয়কর-ভ্যাট",
    lawyerTypeNeeded: "Corporate, Commercial & Tax Advocate",
    bnLawyerTypeNeeded: "কর্পোরেট ও ট্যাক্স আইনজীবী (Corporate Lawyer)",
    plainExplanation:
      "Setting up a Private Limited Company, drafting founder/vendor agreements, and handling NBR tax or trademark registration.",
    bnPlainExplanation:
      "প্রাইভেট লিমিটেড কোম্পানি গঠন, ব্যবসায়িক চুক্তি, ট্রেডমার্ক এবং আয়কর-ভ্যাট সংক্রান্ত কাজের জন্য কর্পোরেট আইনজীবী প্রয়োজন।",
    checklist: [
      "3 proposed company names for RJSC clearance",
      "NID/Passport & TIN certificates of directors",
      "Shareholding split & draft business terms",
    ],
    stepByStep: [
      "Apply for Name Clearance on the RJSC portal.",
      "Draft the Memorandum of Association (MOA) and Articles of Association (AOA) with a Corporate Advocate.",
      "Complete incorporation, obtain Trade License, e-TIN, and BIN (VAT) registration.",
    ],
  },
  {
    id: "writ",
    problemTitle: "Government / Institutional Injustice or Fundamental Rights",
    bnProblemTitle: "সরকারি প্রতিষ্ঠানের অন্যায় সিদ্ধান্ত বা মৌলিক অধিকার লঙ্ঘন",
    lawyerTypeNeeded: "High Court Constitutional / Writ Advocate",
    bnLawyerTypeNeeded: "সুপ্রিম কোর্ট রিট আইনজীবী (High Court Advocate)",
    plainExplanation:
      "When a public authority acts unlawfully and no other equal remedy exists, a Writ Petition is filed directly in the High Court Division.",
    bnPlainExplanation:
      "কোনো সরকারি বা সংবিধিবদ্ধ প্রতিষ্ঠান বেআইনি সিদ্ধান্ত নিলে সরাসরি হাইকোর্ট বিভাগে রিট পিটিশন দায়ের করা হয়।",
    checklist: [
      "Impugned government order/notice",
      "Prior representation/application copies",
      "Relevant service, tender, or institutional documents",
    ],
    stepByStep: [
      "Serve a formal 'Demand for Justice' notice to the concerned government authority.",
      "Prepare the Writ Petition affidavit under Article 102 of the Constitution of Bangladesh.",
      "Move the petition before a Division Bench of the High Court Division for Rule Nisi and Stay Order.",
    ],
  },
];

export const initialLawyers: LawyerProfile[] = [
  {
    id: "nusrat-jahan",
    name: "Adv. Nusrat Jahan Chowdhury",
    bnName: "অ্যাডভোকেট নুসরাত জাহান চৌধুরী",
    title: "Advocate, Supreme Court of Bangladesh",
    education: "LL.B. (Hons), LL.M. — University of Dhaka",
    barEnrollmentYear: 2016,
    barCouncilId: "BBC-2016-4419",
    isJuniorFriendly: false,
    court: "High Court Division & Dhaka Judge Court",
    city: "Dhaka",
    chamberAddress: "Suite 504, Star Tower, Satmasjid Road, Dhanmondi, Dhaka-1209",
    visitingHours: "Sat – Thu: 6:00 PM – 9:30 PM",
    whatsapp: "8801711000001",
    specialties: ["family", "writ"],
    chamberFee: 1500,
    onlineFee: 1000,
    availableToday: true,
    languages: ["Bangla", "English"],
    bio: "9+ years of experience representing clients in Family Courts, child custody disputes, and High Court writ petitions.",
    bnBio: "পারিবারিক আদালত, সন্তানের অভিভাবকত্ব এবং হাইকোর্ট বিভাগের রিট পিটিশন পরিচালনায় ৯ বছরেরও বেশি অভিজ্ঞতা।",
  },
  {
    id: "rafiul-karim",
    name: "Adv. Rafiul Karim",
    bnName: "অ্যাডভোকেট রাফিউল করিম",
    title: "Advocate, Dhaka Bar Association",
    education: "LL.B. (Hons), LL.M. — Jagannath University",
    barEnrollmentYear: 2024,
    barCouncilId: "BBC-2024-8912",
    isJuniorFriendly: true,
    court: "Dhaka Judge Court & CMM Court",
    city: "Dhaka",
    chamberAddress: "Room 218, Dhaka Bar Association Annex Building-2, Kotwali, Dhaka",
    visitingHours: "Sun – Thu: 4:30 PM – 8:30 PM",
    whatsapp: "8801711000002",
    specialties: ["criminal", "family", "land"],
    chamberFee: 600,
    onlineFee: 400,
    availableToday: true,
    languages: ["Bangla", "English"],
    bio: "Newly enrolled advocate dedicated to accessible legal aid, bail hearings, NI Act cheque cases, and initial document verification.",
    bnBio: "নবীন তালিকাভুক্ত আইনজীবী—সাশ্রয়ী পরামর্শ ফিতে জামিন, চেক ডিজঅনার (NI Act) এবং প্রাথমিক দলিল যাচাই সেবা প্রদান করেন।",
  },
  {
    id: "mahbubur-rahman",
    name: "Adv. Mahbubur Rahman",
    bnName: "অ্যাডভোকেট মাহবুবুর রহমান",
    title: "Advocate, Supreme Court of Bangladesh",
    education: "LL.B. (Hons) — Rajshahi University; Bar-at-Law (Lincoln's Inn)",
    barEnrollmentYear: 2014,
    barCouncilId: "BBC-2014-3108",
    isJuniorFriendly: false,
    court: "High Court Division & Joint District Judge Court",
    city: "Dhaka",
    chamberAddress: "Room 412, Supreme Court Bar Association Building, Ramna, Dhaka-1000",
    visitingHours: "Sat – Wed: 5:30 PM – 9:00 PM",
    whatsapp: "8801711000003",
    specialties: ["land", "corporate"],
    chamberFee: 2000,
    onlineFee: 1200,
    availableToday: false,
    languages: ["Bangla", "English"],
    bio: "Specializes in complex CS/SA/RS/BS land title vetting, civil suits, and RJSC corporate compliance.",
    bnBio: "জটিল সিএস/এসএ/আরএস/বিএস খতিয়ান যাচাই, দেওয়ানি মামলা এবং আরজেএসসি কর্পোরেট আইনে বিশেষজ্ঞ।",
  },
  {
    id: "sadia-afrin",
    name: "Adv. Sadia Afrin",
    bnName: "অ্যাডভোকেট সাদিয়া আফরিন",
    title: "Advocate, Chittagong & Dhaka Bar",
    education: "LL.B. (Hons), LL.M. — University of Chittagong",
    barEnrollmentYear: 2025,
    barCouncilId: "BBC-2025-1140",
    isJuniorFriendly: true,
    court: "Judge Court & Income Tax Bar",
    city: "Chattogram",
    chamberAddress: "Chamber 12, Court Hill Road, Kotwali, Chattogram (Online Nationwide)",
    visitingHours: "Sat – Thu: 5:00 PM – 9:00 PM",
    whatsapp: "8801711000004",
    specialties: ["corporate", "land"],
    chamberFee: 500,
    onlineFee: 350,
    availableToday: true,
    languages: ["Bangla", "English"],
    bio: "Helps startups, freelancers, and small businesses with contract drafting, TIN/Tax filing, and property deed reviews.",
    bnBio: "স্টার্টআপ, ফ্রিল্যান্সার এবং ক্ষুদ্র ব্যবসায়ীদের চুক্তিপত্র তৈরি, আয়কর রিটার্ন ও দলিল পর্যালোচনায় সহায়তা করেন।",
  },
];

export interface ClientCase {
  caseId: string;
  clientPhone: string;
  clientName: string;
  assignedLawyer: string;
  caseNumber: string;
  courtName: string;
  caseType: string;
  status: string;
  nextHearingDate: string;
  lastOrderSummary: string;
  documents: { title: string; date: string }[];
}

export interface ConsultationBooking {
  id: string;
  lawyerId: string;
  lawyerName: string;
  clientName: string;
  phone: string;
  matter: string;
  mode: "chamber" | "online";
  date: string;
  fee: string;
  paymentStatus: "Pending" | "Paid (bKash/SSL)";
  createdAt: string;
}

export const initialCases: ClientCase[] = [
  {
    caseId: "CASE-101",
    clientPhone: "01711000000",
    clientName: "Tanvir Ahmed",
    assignedLawyer: "Adv. Nusrat Jahan Chowdhury",
    caseNumber: "Writ Petition No. 4812 of 2026",
    courtName: "High Court Division, Supreme Court of Bangladesh",
    caseType: "Constitutional / Writ",
    status: "Rule Issued & Stay Granted",
    nextHearingDate: "2026-12-08",
    lastOrderSummary:
      "Hon'ble Court granted 6 months stay order and issued Rule Nisi returnable within 4 weeks.",
    documents: [
      { title: "Certified Copy of Stay Order.pdf", date: "2026-10-14" },
      { title: "Writ Petition Filing Copy.pdf", date: "2026-09-28" },
    ],
  },
];