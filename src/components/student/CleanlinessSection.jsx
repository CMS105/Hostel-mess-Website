import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Camera,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  X,
  Droplets,
  Building2,
  Utensils
} from "lucide-react";

const HYGIENE_ISSUES = [
  "Dirty tables or uncleaned thalis.",
  "Unclean wet floors / sambar spills.",
  "Improper waste bin disposal.",
  "Drinking water dispenser / filter area.",
  "Insects or pests noticed.",
  "Unclean stainless steel utensils.",
  "Wash basin soap dispenser empty."
];

const LOCATIONS = [
  "Dining Hall A (Main Floor)",
  "Dining Hall B (Upper Floor)",
  "Dining Table Rows (Central)",
  "Plate Washing & Tray Return Area",
  "Drinking Water Dispenser #1",
  "Drinking Water Dispenser #2",
  "Mess Handwash Basins",
  "Mess Washrooms",
  "Food Serving Counters",
  "Kitchen & Food Prep Zone"
];

export function CleanlinessSection({ cleanlinessData, onRateArea, onSubmitReport }) {
  const areas = cleanlinessData?.areas || {};
  const [ratedAreaBanner, setRatedAreaBanner] = useState(null);

  // Issue reporting form state
  const [issueType, setIssueType] = useState(HYGIENE_ISSUES[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [severity, setSeverity] = useState("Medium"); // 'Low' | 'Medium' | 'High'
  const [description, setDescription] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const zonesList = [
    { key: "diningHall", label: "1. Dining Hall Ambience", desc: "Floors, trash bins, general dining environment", defaultLoc: "Dining Hall A (Main Floor)" },
    { key: "diningTables", label: "2. Dining Tables & Seating", desc: "Tabletops, benches, stainless-steel wipe quality", defaultLoc: "Dining Table Rows (Central)" },
    { key: "drinkingWater", label: "3. Pure Drinking Water", desc: "UV coolers, dispenser nozzles, drain tray hygiene", defaultLoc: "Drinking Water Dispenser #1" },
    { key: "kitchenHygiene", label: "4. Kitchen & Cooking Prep", desc: "Cooking cauldrons, steam vessels, chef attire", defaultLoc: "Kitchen & Food Prep Zone" },
    { key: "washrooms", label: "5. Handwash & Basins", desc: "Handwash soap dispensers, mirrors, basin drains", defaultLoc: "Mess Handwash Basins" }
  ];

  const handleVoteArea = (zoneKey, vote, zoneLabel, defaultLoc) => {
    onRateArea(zoneKey, vote);
    setRatedAreaBanner({
      zone: zoneLabel,
      vote: vote === "clean" ? "👍 Clean" : "👎 Needs Attention"
    });

    if (vote === "needs_attention") {
      setLocation(defaultLoc);
      // Auto-populate issue context
      setDescription((prev) => prev || `Cleanliness concern reported at ${zoneLabel}. Housekeeping inspection requested.`);
    }

    setTimeout(() => setRatedAreaBanner(null), 3500);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError("Photo size exceeds 2MB. Please select a smaller photo.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || description.trim().length < 5) {
      setFormError("Please provide a brief description (at least 5 characters).");
      return;
    }

    setFormError("");
    onSubmitReport({
      issueType: issueType.replace(/\.$/, ""),
      location,
      severity,
      description,
      photoUrl: photoPreview
    });

    setReportSuccess(true);
    setDescription("");
    setPhotoPreview(null);
    setTimeout(() => setReportSuccess(false), 5000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="bg-leaf-800 rounded-3xl p-6 sm:p-8 text-cream-50 shadow-md relative overflow-hidden border border-leaf-900">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-turmeric-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-leaf-900/80 text-cream-200 border border-leaf-700/60 inline-block mb-3">
            Hostel Hygiene & Cleanliness System
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-cream-50">
            Clean Mess, Healthy Students
          </h2>
          <p className="mt-2 text-sm text-cream-200/90 leading-relaxed font-sans">
            Every student voice directly triggers housekeeping dispatches and mess inspections. Audit our 5 mess zones with a single tap or submit an anonymous complaint with photo evidence.
          </p>
        </div>
      </div>

      {/* Part 1: Simplified 2-Choice Mess Zone Sanitation Scorecard */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-cream-200 gap-2">
          <div>
            <h3 className="text-lg font-bold font-display text-charcoal-900">
              Mess Zone Sanitation Scorecard
            </h3>
            <p className="text-xs text-charcoal-600 mt-0.5">
              Simplified 2-choice rating: Tap <span className="font-bold text-leaf-800">👍 Clean</span> or <span className="font-bold text-terracotta-700">👎 Needs Attention</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {ratedAreaBanner && (
              <span className="text-xs font-semibold text-leaf-800 bg-leaf-50 px-3 py-1 rounded-lg border border-leaf-200 flex items-center gap-1.5 animate-fade-in shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-leaf-600" />
                <span>Saved {ratedAreaBanner.vote} for {ratedAreaBanner.zone} (+15 pts)</span>
              </span>
            )}
            <span className="text-xs text-charcoal-500 font-medium hidden sm:inline">
              Instant sync with mess administration
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {zonesList.map((zone) => {
            const area = areas[zone.key] || {};
            const cleanVotes = Number(area.cleanVotes) || 0;
            const needsVotes = Number(area.needsAttentionVotes) || 0;
            const totalVotes = cleanVotes + needsVotes;
            const satisfaction = totalVotes > 0 ? Math.round((cleanVotes / totalVotes) * 100) : 80;

            return (
              <div
                key={zone.key}
                className="bg-cream-50/60 p-4.5 rounded-2xl border border-cream-200 flex flex-col justify-between hover:border-leaf-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold font-display text-charcoal-900">{zone.label}</span>
                    <span className="text-xs font-bold text-leaf-800 bg-leaf-100/80 px-2 py-0.5 rounded-md border border-leaf-200/80">
                      {satisfaction}% Clean
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-600 mb-2 leading-relaxed">{zone.desc}</p>
                  <div className="text-[10px] text-charcoal-500 mb-3 font-medium">
                    Total audits: {totalVotes} ({cleanVotes} clean • {needsVotes} flagged)
                  </div>
                </div>

                <div className="pt-3 border-t border-cream-200 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleVoteArea(zone.key, "clean", zone.label, zone.defaultLoc)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white hover:bg-leaf-50 border border-cream-300 hover:border-leaf-500 text-leaf-800 text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-leaf-700" />
                    <span>Clean</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVoteArea(zone.key, "needs_attention", zone.label, zone.defaultLoc)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white hover:bg-terracotta-50 border border-cream-300 hover:border-terracotta-500 text-terracotta-700 text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 text-terracotta-600" />
                    <span>Needs Attention</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Report Hygiene Complaint / Issue */}
      <div id="hygiene-complaint-form" className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-2xs">
        <div className="border-b border-cream-200 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-charcoal-900">
                Report a Cleanliness Issue or Hygiene Hazard
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Anonymous student report delivered directly to Mess Inspection Officers
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-turmeric-900 bg-turmeric-100/80 px-3 py-1.5 rounded-xl border border-turmeric-300">
            <Sparkles className="w-3.5 h-3.5 text-turmeric-700" />
            <span>Earn +40 Participation Pts</span>
          </div>
        </div>

        {reportSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-leaf-50 border border-leaf-300 text-leaf-900 flex items-start gap-3 animate-fade-in shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-leaf-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm font-display">Cleanliness Report Dispatched!</div>
              <p className="text-xs text-leaf-800 mt-0.5 leading-relaxed">
                Your anonymous complaint has been assigned a tracking ID and routed to hostel maintenance. +40 participation points credited to your profile!
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleReportSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Issue Type */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                1. Issue Category <span className="text-terracotta-600">*</span>
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-600 text-charcoal-800 font-medium cursor-pointer"
              >
                {HYGIENE_ISSUES.map((issue) => (
                  <option key={issue} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Specific Location */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                2. Exact Location <span className="text-terracotta-600">*</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-600 text-charcoal-800 font-medium cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Severity Level */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                3. Severity Level <span className="text-terracotta-600">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Low", "Medium", "High"].map((lvl) => {
                  const isSelected = severity === lvl;
                  const colors = {
                    Low: isSelected ? "bg-leaf-700 text-white font-bold" : "bg-leaf-50 text-leaf-800 border-leaf-200",
                    Medium: isSelected ? "bg-turmeric-600 text-charcoal-900 font-bold" : "bg-turmeric-50 text-turmeric-900 border-turmeric-200",
                    High: isSelected ? "bg-terracotta-700 text-white font-bold" : "bg-terracotta-50 text-terracotta-800 border-terracotta-200"
                  };

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeverity(lvl)}
                      className={`text-xs py-2.5 rounded-xl border transition-all text-center cursor-pointer ${colors[lvl]}`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Issue Description <span className="text-terracotta-600">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide clear details (e.g. water pooling on floor near table 12, trash bin overflow, unwashed plates)..."
              className="w-full text-xs p-3.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-leaf-600 text-charcoal-800 placeholder-charcoal-400 bg-white"
            />
          </div>

          {/* Optional Photo Attachment Preview */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Attach Photo Evidence (Optional)
            </label>

            {photoPreview ? (
              <div className="relative w-40 h-28 rounded-2xl overflow-hidden border-2 border-leaf-600 shadow-sm group">
                <img src={photoPreview} alt="Evidence Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-charcoal-900/80 text-white hover:bg-terracotta-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-charcoal-900/70 text-white text-[10px] text-center py-0.5 font-medium">
                  Photo Attached
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-cream-300 hover:border-leaf-600 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 cursor-pointer bg-cream-50/60 hover:bg-leaf-50/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white border border-cream-200 flex items-center justify-center text-charcoal-500 shadow-2xs">
                  <Camera className="w-5 h-5 text-leaf-700" />
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-leaf-800">Click to upload photo</span>
                  <span className="text-xs text-charcoal-500"> or drag and drop image (JPG, PNG up to 2MB)</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {formError && (
            <div className="text-xs font-semibold text-terracotta-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Dispatch Hygiene Ticket (+40 pts)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
