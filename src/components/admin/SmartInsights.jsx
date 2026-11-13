import React, { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  RotateCw
} from "lucide-react";
import { generateSmartInsights } from "../../utils/insightsEngine";

export function SmartInsights({
  menu = [],
  cleanlinessData = {},
  wasteRecords = [],
  alternativeRequests = [],
  feedbackLogs = []
}) {
  const [filterPriority, setFilterPriority] = useState("all");

  // Compute insights dynamically from current localStorage states
  const insights = generateSmartInsights({
    menuItems: menu,
    wasteRecords,
    cleanlinessData,
    alternativeRequests,
    feedbackLogs
  });

  const filteredInsights = insights.filter((ins) => {
    if (filterPriority === "all") return true;
    return ins.priority.toLowerCase() === filterPriority.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-leaf-800 rounded-3xl p-6 sm:p-8 text-cream-50 border border-leaf-900 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-turmeric-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-leaf-900/80 border border-leaf-700 inline-flex items-center gap-1.5 mb-3 text-turmeric-300">
            <Sparkles className="w-3.5 h-3.5 text-turmeric-400" />
            <span>Local Rule-Based Heuristic Engine</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-cream-50">
            Smart Mess Intelligence & Insights
          </h1>
          <p className="mt-2 text-sm text-cream-200/90 leading-relaxed">
            Automated algorithmic recommendations derived from live South Indian student ratings, thali waste logs, and hygiene inspection data without external API overhead.
          </p>
        </div>
      </div>

      {/* Priority Filter Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-cream-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-charcoal-700">Filter Priority:</span>
          {["All", "High", "Medium", "Low"].map((p) => {
            const isSelected = filterPriority.toLowerCase() === p.toLowerCase();
            return (
              <button
                key={p}
                onClick={() => setFilterPriority(p.toLowerCase())}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-leaf-700 text-cream-50 shadow-2xs"
                    : "text-charcoal-600 hover:bg-cream-100"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-charcoal-500 font-medium">
          {filteredInsights.length} Actionable Intelligence Cards
        </span>
      </div>

      {/* Insights Cards Feed */}
      <div className="space-y-4">
        {filteredInsights.map((ins) => {
          const isHigh = ins.priority === "High";
          const isMedium = ins.priority === "Medium";

          return (
            <div
              key={ins.id}
              className={`p-6 rounded-3xl border transition-all ${
                isHigh
                  ? "bg-terracotta-50/40 border-terracotta-200 hover:border-terracotta-300 shadow-2xs"
                  : isMedium
                  ? "bg-turmeric-50/40 border-turmeric-200 hover:border-turmeric-300 shadow-2xs"
                  : "bg-white border-cream-200 shadow-2xs"
              } space-y-4`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      isHigh
                        ? "bg-terracotta-700 text-white"
                        : isMedium
                        ? "bg-turmeric-600 text-charcoal-900"
                        : "bg-leaf-700 text-white"
                    }`}
                  >
                    {ins.priority} Priority
                  </span>
                  <span className="text-xs font-semibold text-charcoal-600 bg-white px-2.5 py-0.5 rounded-md border border-cream-200">
                    {ins.category}
                  </span>
                  {ins.isPreliminary && (
                    <span className="text-[10px] font-bold text-turmeric-900 bg-turmeric-100 border border-turmeric-300 px-2 py-0.5 rounded-full">
                      Preliminary (Low Data)
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-charcoal-500 font-medium">
                  {ins.impact}
                </div>
              </div>

              {/* Title & Problem Description */}
              <div>
                <h3 className="text-base font-bold font-display text-charcoal-900">
                  {ins.title}
                </h3>
                <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                  <strong className="text-charcoal-800">Problem Identified: </strong>
                  {ins.problem}
                </p>
              </div>

              {/* Supporting Data Pill */}
              <div className="bg-white p-3 rounded-2xl border border-cream-200 text-xs text-charcoal-700 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-turmeric-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal-900">Supporting Evidence: </strong>
                  <span>{ins.supportingData}</span>
                </div>
              </div>

              {/* Suggested Action Bar */}
              <div className="bg-leaf-50 border border-leaf-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-leaf-950">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-leaf-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-leaf-900">Recommended Next Step: </span>
                    <span className="font-medium text-leaf-800">{ins.suggestedAction}</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-leaf-800 bg-white px-2.5 py-1 rounded-md border border-leaf-200 shrink-0 self-start sm:self-center">
                  Ready to Deploy
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
