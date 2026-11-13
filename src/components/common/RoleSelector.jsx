import React from "react";
import {
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  ChefHat,
  CheckCircle2,
  Building2,
  Clock,
  Sparkles
} from "lucide-react";

export function RoleSelector({ onSelectRole }) {
  return (
    <div className="min-h-screen bg-ivory text-charcoal-800 flex flex-col justify-between p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between py-2 border-b border-ivory-300 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-forest-700 flex items-center justify-center text-ivory font-bold border border-forest-600 shadow-2xs">
            <span className="font-display font-black text-base">M</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold font-display text-xl tracking-tight text-forest-700">MESSMATE</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-ivory-200 text-charcoal-600 border border-ivory-300">
                Institutional v2.0
              </span>
            </div>
            <p className="text-xs text-charcoal-500 font-mono">Smart Hostel Operations &amp; Sustainability Platform</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-charcoal-600 bg-white border border-ivory-300 px-3.5 py-1.5 rounded-lg shadow-2xs font-mono">
          <Clock className="w-3.5 h-3.5 text-forest-700" />
          <span>Kaveri Hostel Dining Hall • Block B</span>
        </div>
      </header>

      {/* Hero Body */}
      <main className="relative z-10 max-w-5xl mx-auto w-full my-auto py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-md border border-forest-200 mb-3">
            Better Meals. Less Waste. Healthier Communities.
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-charcoal-900 tracking-tight leading-tight">
            Institutional Hostel Dining &amp; Waste Management
          </h1>
          <p className="mt-3 text-sm sm:text-base text-charcoal-600 leading-relaxed font-sans">
            A comprehensive, data-driven campus operations system empowering hostellers with structured meal feedback while giving mess management real-time waste telemetry and hygiene oversight.
          </p>
        </div>

        {/* 2 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Card 1: Student Workspace */}
          <div
            onClick={() => onSelectRole("student")}
            className="group relative bg-white rounded-xl p-7 border border-ivory-300 hover:border-forest-700 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-lg bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded-full bg-ivory-100 flex items-center justify-center text-charcoal-400 group-hover:bg-forest-700 group-hover:text-ivory transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div className="inline-block px-2 py-0.5 rounded bg-forest-50 text-forest-800 text-[10px] font-mono font-bold tracking-wider uppercase mb-1.5 border border-forest-200">
                Student Workspace
              </div>

              <h2 className="text-xl font-bold font-display text-charcoal-900 group-hover:text-forest-700 transition-colors">
                Continue as Student
              </h2>

              <p className="text-xs text-charcoal-600 mt-2 leading-relaxed">
                Review today's structured timetable, evaluate meals with simplified 2-choice feedback (👍 Good / 👎 Needs Improvement), request alternative dishes, audit cleanliness zones, and earn Eco Champion points.
              </p>

              <div className="mt-5 space-y-2 border-t border-ivory-200 pt-4 font-mono text-[11px] text-charcoal-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>Structured Timetable (Breakfast, Lunch, Snacks, Dinner)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>Strict Future-Meal Protection (Serving Window Lock)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>Mandatory Vote Count Transparency on Every Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>Eco Champion Weekly Sustainability Leaderboard</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 flex items-center justify-between border-t border-ivory-200 text-xs font-mono">
              <span className="text-charcoal-400">Demo Persona:</span>
              <span className="font-bold text-charcoal-800">Rahul Sharma (Room B-204)</span>
            </div>
          </div>

          {/* Card 2: Admin Operations */}
          <div
            onClick={() => onSelectRole("admin")}
            className="group relative bg-white rounded-xl p-7 border border-ivory-300 hover:border-forest-700 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-lg bg-mustard-50 border border-mustard-200 flex items-center justify-center text-mustard-800">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded-full bg-ivory-100 flex items-center justify-center text-charcoal-400 group-hover:bg-forest-700 group-hover:text-ivory transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div className="inline-block px-2 py-0.5 rounded bg-mustard-50 text-mustard-900 text-[10px] font-mono font-bold tracking-wider uppercase mb-1.5 border border-mustard-200">
                Mess Management
              </div>

              <h2 className="text-xl font-bold font-display text-charcoal-900 group-hover:text-forest-700 transition-colors">
                Continue as Mess Admin
              </h2>

              <p className="text-xs text-charcoal-600 mt-2 leading-relaxed">
                Access executive operational dashboard, Smart Food Demand Predictor, What-If Simulator, 7-day food waste intelligence, 28-cell satisfaction heatmap, and 1-click alternative dish publisher.
              </p>

              <div className="mt-5 space-y-2 border-t border-ivory-200 pt-4 font-mono text-[11px] text-charcoal-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>5 Real-Time KPI Tiles (Satisfaction, Votes, Waste, Hygiene)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>Food Demand Predictor &amp; What-If Attendance Simulator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>1-Click Dish Replacement (Publishes Directly to Menu)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>Automated Cleanliness &amp; Food Waste CSV Export Engine</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 flex items-center justify-between border-t border-ivory-200 text-xs font-mono">
              <span className="text-charcoal-400">Demo Persona:</span>
              <span className="font-bold text-charcoal-800">Chief Warden Subramanian</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full text-center text-xs text-charcoal-400 font-mono py-2 border-t border-ivory-300">
        MESSMATE Campus Operations • Better Meals. Less Waste. Healthier Communities.
      </footer>
    </div>
  );
}
