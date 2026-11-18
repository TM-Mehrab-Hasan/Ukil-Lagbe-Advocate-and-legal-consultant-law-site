"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Language, legalIssues } from "@/data/content";
import { addStoredLawyer } from "@/lib/storage";

export default function JoinLawyerPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("en");

  const [name, setName] = useState("");
  const [bnName, setBnName] = useState("");
  const [title, setTitle] = useState("Advocate, Dhaka Bar Association");
  const [education, setEducation] = useState("LL.B. (Hons), LL.M.");
  const [enrollmentYear, setEnrollmentYear] = useState(2025);
  const [barCouncilId, setBarCouncilId] = useState("");
  const [court, setCourt] = useState("Dhaka Judge Court & CMM Court");
  const [city, setCity] = useState("Dhaka");
  const [chamberAddress, setChamberAddress] = useState("");
  const [visitingHours, setVisitingHours] = useState("Sat – Thu: 5:30 PM – 9:00 PM");
  const [whatsapp, setWhatsapp] = useState("");
  const [onlineFee, setOnlineFee] = useState(500);
  const [chamberFee, setChamberFee] = useState(800);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(["land"]);
  const [bio, setBio] = useState("");

  const toggleSpecialty = (id: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRegister = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedSpecialties.length === 0) {
      alert("Please select at least one practice area.");
      return;
    }

    const cleanWhatsapp = whatsapp.replace(/\D/g, "");
    const formattedWhatsapp = cleanWhatsapp.startsWith("88")
      ? cleanWhatsapp
      : `88${cleanWhatsapp || "01700000000"}`;

    const slugId = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${Date.now().toString().slice(-3)}`;

    addStoredLawyer({
      id: slugId,
      name,
      bnName: bnName || name,
      title,
      education,
      barEnrollmentYear: Number(enrollmentYear),
      barCouncilId: barCouncilId || `BBC-${enrollmentYear}-${Date.now().toString().slice(-4)}`,
      isJuniorFriendly: Number(enrollmentYear) >= 2022,
      court,
      city,
      chamberAddress: chamberAddress || `${court}, ${city}`,
      visitingHours,
      whatsapp: formattedWhatsapp,
      specialties: selectedSpecialties,
      onlineFee: Number(onlineFee),
      chamberFee: Number(chamberFee),
      availableToday: true,
      languages: ["Bangla", "English"],
      bio,
      bnBio: bio,
    });

    router.push(`/lawyers/${slugId}`);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-100 ${
        lang === "bn" ? "font-[family-name:var(--font-bangla)]" : ""
      }`}
    >
      <Navbar lang={lang} setLang={setLang} />

      {/* Top Breadcrumb */}
      <div className="bg-slate-900 text-slate-300 py-3.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-3xl mx-auto flex justify-between items-center text-xs">
          <Link href="/#directory" className="hover:text-amber-400 flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to Advocates Directory" : "আইনজীবী তালিকায় ফিরে যান"}
          </Link>
          <span className="text-amber-400 font-semibold">
            {lang === "en" ? "Free Advocate Onboarding" : "বিনামূল্যে আইনজীবী নিবন্ধন"}
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto py-10 px-4 sm:px-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <UserPlus className="w-4 h-4" />
            {lang === "en" ? "Grow Your Legal Practice" : "আপনার আইনি পেশা প্রসারিত করুন"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {lang === "en"
              ? "Create Your Verified Advocate Profile"
              : "আপনার যাচাইকৃত আইনজীবী প্রোফাইল তৈরি করুন"}
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 mb-6 leading-relaxed">
            {lang === "en"
              ? "Whether you are newly enrolled with the Bar Council or an experienced practitioner, set your transparent consultation fees and connect directly with clients needing your expertise."
              : "আপনি নবীন বা অভিজ্ঞ যে আইনজীবীই হোন না কেন, আপনার স্বচ্ছ পরামর্শ ফি নির্ধারণ করুন এবং সরাসরি মক্কেলদের সাথে যুক্ত হোন।"}
          </p>

          <form onSubmit={handleRegister} className="space-y-5 text-sm">
            {/* Name & Bangla Name */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (English) *
                </label>
                <input
                  required
                  placeholder="Adv. Tanvir Hasan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (Bangla - Optional)
                </label>
                <input
                  placeholder="অ্যাডভোকেট তানভীর হাসান"
                  value={bnName}
                  onChange={(e) => setBnName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Title, Education, Bar Council ID */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bar Association / Title *
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Education & Degree *
                </label>
                <input
                  required
                  placeholder="LL.B. (Hons), LL.M."
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bar Council Sanad / ID
                </label>
                <input
                  placeholder="e.g., BBC-2025-1042"
                  value={barCouncilId}
                  onChange={(e) => setBarCouncilId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Enrollment Year, Court, City */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bar Enrollment Year *
                </label>
                <input
                  required
                  type="number"
                  min={1975}
                  max={2026}
                  value={enrollmentYear}
                  onChange={(e) => setEnrollmentYear(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Practicing Court *
                </label>
                <input
                  required
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / District *
                </label>
                <input
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Chamber Address & Visiting Hours */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chamber Address *
                </label>
                <input
                  required
                  placeholder="Room 305, Bar Association Building, Dhaka"
                  value={chamberAddress}
                  onChange={(e) => setChamberAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Visiting Hours *
                </label>
                <input
                  required
                  value={visitingHours}
                  onChange={(e) => setVisitingHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Fees & WhatsApp */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Online Video Fee (BDT) *
                </label>
                <input
                  required
                  type="number"
                  min={100}
                  value={onlineFee}
                  onChange={(e) => setOnlineFee(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  In-Chamber Fee (BDT) *
                </label>
                <input
                  required
                  type="number"
                  min={100}
                  value={chamberFee}
                  onChange={(e) => setChamberFee(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chamber WhatsApp Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="017XXXXXXXX"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Client Issues You Handle: *
              </label>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {legalIssues.map((issue) => {
                  const active = selectedSpecialties.includes(issue.id);
                  return (
                    <button
                      type="button"
                      key={issue.id}
                      onClick={() => toggleSpecialty(issue.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition cursor-pointer ${
                        active
                          ? "border-amber-600 bg-amber-50 text-slate-900"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          active ? "text-amber-600" : "text-slate-300"
                        }`}
                      />
                      <span>{issue.problemTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Bio & Practice Focus *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe your legal background, areas of focus, and how you assist clients..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition cursor-pointer"
            >
              Publish Advocate Profile & View Live Page
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}