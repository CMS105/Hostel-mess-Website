import React, { useState } from "react";
import {
  Sparkles,
  RotateCcw,
  Award,
  CloudRain,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Calendar
} from "lucide-react";

export function JudgeDemoBar({
  onSelectScenario,
  onResetData,
  currentScenario = "standard"
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const scenarios = [
    {
      id: "standard",
      name: "Standard Week",
      desc: "Balanced South Indian menu & baseline analytics",
      icon: Calendar,
      color: "border-cream-300 hover:border-leaf-500"
    },
    {
      id: "sunday_feast",
      name: "Sunday Feast",
      desc: "450 attendance, Mysore Pak & high satisfaction",
      icon: Sparkles,
      color: "border-turmeric-300 hover:border-turmeric-500 bg-turmeric-50/50"
    },
    {
      id: "rainy_day_waste",
      name: "Rainy Day Waste Alert",
      desc: "310 attendance, 42kg rice leftover risk",
      icon: CloudRain,
      color: "border-terracotta-300 hover:border-terracotta-500 bg-terracotta-50/50"
    },
    {
      id: "hygiene_alert",
      name: "Hygiene Triage Demo",
      desc: "Urgent water cooler & dining hall audit tickets",
      icon: ShieldAlert,
      color: "border-amber-300 hover:border-amber-500 bg-amber-50/50"
    }
  ];

  return (
    <aside
      aria-label="Hackathon Evaluation Bar"
      className="bg-charcoal-900 text-cream-100 border-b border-charcoal-800 text-xs shadow-md transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-turmeric-400 animate-pulse inline-block" />
            <span className="font-bold uppercase tracking-wider text-[11px] text-turmeric-300 font-sans">
              Judge Evaluation Mode
            </span>
            <span className="hidden md:inline text-cream-300 text-[11px]">
              • Instant South Indian hostel scenarios & telemetry presets
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-cream-300 hover:text-white flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded hover:bg-charcoal-800 cursor-pointer"
            >
              <span>{isExpanded ? "Hide Scenarios" : "Show Scenarios"}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onResetData}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-terracotta-900/80 text-cream-200 border border-charcoal-700 transition-colors cursor-pointer"
              title="Reset all application data back to factory demo state"
            >
              <RotateCcw className="w-3 h-3 text-terracotta-400" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Collapsible Scenarios Bar */}
        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 pb-1 animate-fade-in">
            {scenarios.map((sc) => {
              const Icon = sc.icon;
              const isActive = currentScenario === sc.id;

              return (
                <button
                  key={sc.id}
                  onClick={() => onSelectScenario(sc.id)}
                  className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                    isActive
                      ? "bg-leaf-800 text-cream-50 border-leaf-500 ring-1 ring-leaf-400"
                      : "bg-charcoal-800/80 text-cream-200 border-charcoal-700 hover:bg-charcoal-800 hover:text-white"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? "bg-leaf-600 text-cream-50" : "bg-charcoal-700 text-turmeric-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[11px] truncate flex items-center justify-between">
                      <span>{sc.name}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-leaf-300" />}
                    </div>
                    <div className="text-[10px] text-cream-400/80 line-clamp-1">{sc.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
