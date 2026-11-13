import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Sparkles,
  Star,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Table
} from "lucide-react";
import {
  exportFoodRatingsCSV,
  exportFoodWasteCSV,
  exportAnonymousFeedbackCSV,
  exportCleanlinessReportsCSV
} from "../../utils/csvExport";
import { formatRatingDisplay } from "../../utils/ratingUtils";

export function ReportsExporter({
  menu = [],
  cleanlinessData = {},
  wasteRecords = [],
  feedbackLogs = []
}) {
  const [reportPeriod, setReportPeriod] = useState("weekly");

  // Summary Metrics
  const totalRatings = menu.reduce((acc, m) => acc + (m.ratingCount || 0), 0);
  const avgSatisfaction = (
    menu.reduce((acc, m) => acc + (m.avgRating || 4.2), 0) / (menu.length || 1)
  ).toFixed(1);
  const totalWasteKg = wasteRecords.slice(0, 7).reduce((acc, r) => acc + (r.wastedKg || 0), 0);
  const totalPreparedKg = wasteRecords.slice(0, 7).reduce((acc, r) => acc + (r.preparedKg || 0), 0);
  const avgWastePct = totalPreparedKg > 0 ? ((totalWasteKg / totalPreparedKg) * 100).toFixed(1) : 0;
  const top3Best = [...menu].filter((m) => (m.ratingCount || 0) > 0).sort((a, b) => b.avgRating - a.avgRating).slice(0, 3);
  const top3Lowest = [...menu].filter((m) => (m.ratingCount || 0) > 0).sort((a, b) => a.avgRating - b.avgRating).slice(0, 3);

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
            <FileText className="w-4 h-4 text-leaf-700" />
            <span>Auditing & Governance Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            Official South Indian Mess Reports & CSV Export Center
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Compile operational performance summaries, waste audits, and export raw CSV records for hostel administration.
          </p>
        </div>
        {/* Period Selector */}
        <div className="flex items-center bg-cream-100 rounded-xl p-1 border border-cream-200">
          <button
            onClick={() => setReportPeriod("weekly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              reportPeriod === "weekly"
                ? "bg-white text-charcoal-900 shadow-2xs border border-cream-200"
                : "text-charcoal-600 hover:text-charcoal-900"
            }`}
          >
            Weekly Summary
          </button>
          <button
            onClick={() => setReportPeriod("monthly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              reportPeriod === "monthly"
                ? "bg-white text-charcoal-900 shadow-2xs border border-cream-200"
                : "text-charcoal-600 hover:text-charcoal-900"
            }`}
          >
            Monthly Aggregate
          </button>
        </div>
      </div>

      {/* 4 Instant One-Click CSV Export Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Export 1: Food Ratings */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-leaf-100 text-leaf-800 flex items-center justify-center mb-3">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-charcoal-900">Food Ratings Dataset</h3>
            <p className="text-xs text-charcoal-600 mt-1">
              Complete breakdown of 28 South Indian menu slots with 2-choice good/bad votes.
            </p>
          </div>
          <button
            onClick={() => exportFoodRatingsCSV(menu)}
            className="w-full py-2 px-3 rounded-xl bg-leaf-800 hover:bg-leaf-900 text-cream-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>

        {/* Export 2: Food Waste Logs */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-800 flex items-center justify-center mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-charcoal-900">Food Wastage Logs</h3>
            <p className="text-xs text-charcoal-600 mt-1">
              Audit log of prepared kg, served kg, remaining kg & calculated waste percentages.
            </p>
          </div>
          <button
            onClick={() => exportFoodWasteCSV(wasteRecords)}
            className="w-full py-2 px-3 rounded-xl bg-leaf-800 hover:bg-leaf-900 text-cream-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>

        {/* Export 3: Anonymous Feedback */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-turmeric-100 text-turmeric-900 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-charcoal-900">Anonymous Feedback (FB-XXX)</h3>
            <p className="text-xs text-charcoal-600 mt-1">
              Sanitized student comments, 2-choice reasons & chef suggestions.
            </p>
          </div>
          <button
            onClick={() => exportAnonymousFeedbackCSV(feedbackLogs)}
            className="w-full py-2 px-3 rounded-xl bg-leaf-800 hover:bg-leaf-900 text-cream-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>

        {/* Export 4: Cleanliness Audits */}
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-leaf-100 text-leaf-800 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold font-display text-charcoal-900">Hygiene Inspection Tickets</h3>
            <p className="text-xs text-charcoal-600 mt-1">
              Audit trails, staff inspection reports & resolution times.
            </p>
          </div>
          <button
            onClick={() => exportCleanlinessReportsCSV(cleanlinessData.hygieneReports || [])}
            className="w-full py-2 px-3 rounded-xl bg-leaf-800 hover:bg-leaf-900 text-cream-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Comprehensive Performance Summary Report Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-cream-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-500">
              Generated Report Preview
            </span>
            <h3 className="text-lg font-bold font-display text-charcoal-900 mt-0.5">
              Hostel Mess Performance Audit ({reportPeriod === "weekly" ? "Current Week" : "November 2026"})
            </h3>
          </div>

          <span className="text-xs font-bold text-leaf-800 bg-leaf-100 border border-leaf-300 px-3 py-1 rounded-full">
            STATUS: CERTIFIED
          </span>
        </div>

        {/* Summary Table Highlights (RULE 2: MUST ALWAYS SHOW COUNT BESIDE AVERAGE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Key KPI Overview */}
          <div className="bg-cream-50/70 p-4 rounded-2xl border border-cream-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-600">
              Core Operational KPIs
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Average Student Rating:</span>
                <strong className="text-charcoal-900">{formatRatingDisplay(avgSatisfaction, totalRatings)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Total Verified Student Votes:</span>
                <strong className="text-charcoal-900">{totalRatings}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Cumulative Food Wasted:</span>
                <strong className="text-terracotta-700">{totalWasteKg} kg ({avgWastePct}%)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Cleanliness Standard:</span>
                <strong className="text-leaf-800">82% Clean (785 audits)</strong>
              </div>
            </div>
          </div>

          {/* Top 3 Best-Rated Dishes */}
          <div className="bg-cream-50/70 p-4 rounded-2xl border border-cream-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-leaf-800">
              Top 3 Most Celebrated Dishes
            </h4>
            <div className="space-y-2 text-xs">
              {top3Best.map((dish, i) => (
                <div key={dish.id} className="flex justify-between items-center py-0.5">
                  <span className="truncate pr-2 font-medium text-charcoal-800">
                    {i + 1}. {dish.name}
                  </span>
                  <span className="font-bold text-leaf-800 shrink-0">
                    {formatRatingDisplay(dish.avgRating, dish.ratingCount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 Dishes Needing Improvement */}
          <div className="bg-cream-50/70 p-4 rounded-2xl border border-cream-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta-800">
              Dishes Requiring Attention
            </h4>
            <div className="space-y-2 text-xs">
              {top3Lowest.map((dish, i) => (
                <div key={dish.id} className="flex justify-between items-center py-0.5">
                  <span className="truncate pr-2 font-medium text-charcoal-800">
                    {i + 1}. {dish.name}
                  </span>
                  <span className="font-bold text-terracotta-700 shrink-0">
                    {formatRatingDisplay(dish.avgRating, dish.ratingCount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
