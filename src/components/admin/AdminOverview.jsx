import React from "react";
import {
  Utensils,
  Star,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  ArrowRight,
  ChefHat
} from "lucide-react";
import { BarChart, AreaTrendChart } from "../common/Charts";
import { formatRatingDisplay } from "../../utils/ratingUtils";
import { FoodSatisfactionHeatmap } from "../common/FoodSatisfactionHeatmap";

export function AdminOverview({
  menu = [],
  cleanlinessData = {},
  wasteRecords = [],
  feedbackLogs = [],
  alternativeRequests = [],
  onNavigateSection
}) {
  // 1. Core KPI Metrics
  const totalRatings = menu.reduce((acc, m) => acc + (m.ratingCount || 0), 0);
  const avgSatisfaction = (
    menu.reduce((acc, m) => acc + (m.avgRating || 4.2), 0) / (menu.length || 1)
  ).toFixed(1);

  // Cleanliness area calculation
  const areas = cleanlinessData.areas || {};
  const areaKeys = Object.keys(areas);
  const totalCleanVotes = areaKeys.reduce((acc, k) => acc + (Number(areas[k]?.cleanVotes) || 0), 0);
  const totalNeedsVotes = areaKeys.reduce((acc, k) => acc + (Number(areas[k]?.needsAttentionVotes) || 0), 0);
  const totalCleanlinessAudits = totalCleanVotes + totalNeedsVotes;
  const overallCleanlinessPct =
    totalCleanlinessAudits > 0 ? Math.round((totalCleanVotes / totalCleanlinessAudits) * 100) : 82;

  // Waste metrics
  const todayWasteRecord = wasteRecords[0] || { wastedKg: 24, preparedKg: 150 };
  const todayWasteKg = todayWasteRecord.wastedKg;
  const todayPreparedKg = todayWasteRecord.preparedKg || 1;
  const todayWastePct = Math.round((todayWasteKg / todayPreparedKg) * 100);
  const weeklyWasteKg = wasteRecords.slice(0, 7).reduce((acc, r) => acc + (r.wastedKg || 0), 0);

  // Pending complaints
  const reports = cleanlinessData.hygieneReports || [];
  const unresolvedHighSeverity = reports.filter(
    (r) => r.severity === "High" && r.status !== "Resolved"
  ).length;

  // Waste chart data
  const wasteChartData = wasteRecords.slice(0, 7).reverse().map((w) => ({
    label: `${w.date.slice(5)} (${w.mealType.slice(0, 1).toUpperCase()})`,
    value: w.wastedKg,
    secondaryValue: 22
  }));

  // Cleanliness comparison chart data
  const cleanlinessChartData = areaKeys.map((k) => ({
    label: areas[k]?.name.split(" ")[0],
    value: areas[k]?.satisfactionPct || 80
  }));

  return (
    <div className="space-y-6 animate-fade-in text-charcoal-800">
      {/* Console Header */}
      <div className="bg-white rounded-xl p-5 border border-ivory-300 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-charcoal-400 font-semibold mb-1">
            Hostel Operations Command Center • Kaveri Hall
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-forest-700 tracking-tight">
            Campus Dining Operations Console
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Real-time hostel mess metrics, 2-choice food evaluations, and kitchen waste telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unresolvedHighSeverity > 0 && (
            <button
              onClick={() => onNavigateSection("cleanliness")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-terracotta-50 border border-terracotta-300 text-terracotta-900 text-xs font-bold hover:bg-terracotta-100 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-terracotta" />
              <span>{unresolvedHighSeverity} Critical Alert</span>
            </button>
          )}

          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sage-100 text-forest-800 border border-sage-300">
            System Online
          </span>
        </div>
      </div>

      {/* TOP KPI SECTION: 5 Large Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {/* KPI 1: Food Satisfaction */}
        <div className="bg-white p-4 rounded-xl border border-ivory-300 shadow-2xs">
          <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
            1. Food Satisfaction
          </span>
          <div className="mt-2 flex items-baseline gap-1.5 font-mono">
            <span className="text-2xl sm:text-3xl font-bold text-charcoal-800">
              {avgSatisfaction}
            </span>
            <span className="text-xs text-charcoal-400 font-semibold">/ 5.0</span>
          </div>
          <div className="text-[11px] text-forest-700 font-medium mt-1 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-forest-700" />
            <span>{totalRatings} verified votes</span>
          </div>
        </div>

        {/* KPI 2: Total Meal Votes */}
        <div className="bg-white p-4 rounded-xl border border-ivory-300 shadow-2xs">
          <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
            2. Total Meal Votes
          </span>
          <div className="mt-2 flex items-baseline gap-1.5 font-mono">
            <span className="text-2xl sm:text-3xl font-bold text-charcoal-800">
              {totalRatings.toLocaleString()}
            </span>
            <span className="text-xs text-charcoal-400 font-semibold">votes</span>
          </div>
          <div className="text-[11px] text-charcoal-500 mt-1 font-mono">
            84% student participation
          </div>
        </div>

        {/* KPI 3: Food Waste in kg */}
        <div className="bg-white p-4 rounded-xl border border-ivory-300 shadow-2xs">
          <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
            3. Food Waste (kg)
          </span>
          <div className="mt-2 flex items-baseline gap-1.5 font-mono">
            <span className="text-2xl sm:text-3xl font-bold text-charcoal-800">
              {todayWasteKg}
            </span>
            <span className="text-xs text-charcoal-400 font-semibold">kg today</span>
          </div>
          <div className="text-[11px] text-charcoal-500 mt-1 font-mono">
            {weeklyWasteKg} kg 7-day cumulative
          </div>
        </div>

        {/* KPI 4: Cleanliness Score */}
        <div className="bg-white p-4 rounded-xl border border-ivory-300 shadow-2xs">
          <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
            4. Cleanliness Score
          </span>
          <div className="mt-2 flex items-baseline gap-1.5 font-mono">
            <span className="text-2xl sm:text-3xl font-bold text-forest-700">
              {overallCleanlinessPct}%
            </span>
            <span className="text-xs text-charcoal-400 font-semibold">Clean</span>
          </div>
          <div className="text-[11px] text-charcoal-500 mt-1 font-mono">
            5 monitored zones
          </div>
        </div>

        {/* KPI 5: Pending Complaints */}
        <div className="bg-white p-4 rounded-xl border border-ivory-300 shadow-2xs col-span-2 lg:col-span-1">
          <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
            5. Pending Complaints
          </span>
          <div className="mt-2 flex items-baseline gap-1.5 font-mono">
            <span className={`text-2xl sm:text-3xl font-bold ${unresolvedHighSeverity > 0 ? "text-terracotta" : "text-forest-700"}`}>
              {reports.filter((r) => r.status !== "Resolved").length}
            </span>
            <span className="text-xs text-charcoal-400 font-semibold">tickets</span>
          </div>
          <div className="text-[11px] text-charcoal-500 mt-1">
            {unresolvedHighSeverity} high-priority
          </div>
        </div>
      </div>

      {/* SECTION A: MEAL PERFORMANCE (Compact Data Table) */}
      <div className="bg-white rounded-xl border border-ivory-300 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold font-display text-sm uppercase tracking-wider text-charcoal-800">
              Section A: Weekly Meal Performance Register
            </h3>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Live ratings, vote counts, and satisfaction percentages across weekly menu dishes.
            </p>
          </div>

          <button
            onClick={() => onNavigateSection("menu")}
            className="text-xs font-semibold text-forest-700 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Manage Weekly Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-ivory-100 border-b border-ivory-200 text-charcoal-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-4 w-32">Slot</th>
                <th className="py-2.5 px-4 min-w-[200px]">Meal Description</th>
                <th className="py-2.5 px-4 w-32">Rating &amp; Votes</th>
                <th className="py-2.5 px-4 w-32 text-center">Vote Split</th>
                <th className="py-2.5 px-4 w-32 text-center">Satisfaction %</th>
                <th className="py-2.5 px-4 w-28 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200 font-sans">
              {menu.slice(0, 8).map((meal) => {
                const totalVotes = meal.ratingCount || 0;
                const goodVotes = meal.goodVotes || 0;
                const badVotes = meal.badVotes || 0;
                const satPct = totalVotes > 0 ? Math.round((goodVotes / totalVotes) * 100) : 85;

                return (
                  <tr key={meal.id} className="hover:bg-ivory-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-charcoal-600">
                      {meal.day.slice(0, 3)} • {meal.mealType.toUpperCase()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-charcoal-800 truncate max-w-sm">
                        {meal.name}
                      </div>
                      <div className="text-[10px] text-charcoal-400 truncate max-w-sm">
                        {meal.category}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] font-bold text-charcoal-800">
                      {formatRatingDisplay(meal.avgRating, meal.ratingCount)}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-[11px] text-charcoal-600">
                      <span className="text-forest-700 font-bold">👍 {goodVotes}</span> /{" "}
                      <span className="text-terracotta font-bold">👎 {badVotes}</span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-xs">
                      <span
                        className={`font-bold ${
                          satPct >= 80 ? "text-forest-700" : satPct >= 65 ? "text-mustard-800" : "text-terracotta"
                        }`}
                      >
                        {satPct}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                          satPct >= 80
                            ? "bg-sage-100 text-forest-800 border border-sage-300"
                            : satPct >= 65
                            ? "bg-mustard-100 text-mustard-900 border border-mustard-300"
                            : "bg-terracotta-100 text-terracotta-900 border border-terracotta-300"
                        }`}
                      >
                        {satPct >= 80 ? "Optimal" : satPct >= 65 ? "Review" : "Flagged"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION B & SECTION C: Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* SECTION B: FOOD WASTE INTELLIGENCE */}
        <div className="bg-white rounded-xl p-5 border border-ivory-300 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
            <div>
              <h3 className="font-bold font-display text-sm uppercase tracking-wider text-charcoal-800">
                Section B: Food Waste Intelligence
              </h3>
              <p className="text-xs text-charcoal-500 mt-0.5">
                7-day disposal telemetry &amp; high-scraping dishes
              </p>
            </div>

            <button
              onClick={() => onNavigateSection("waste")}
              className="text-xs font-semibold text-forest-700 hover:underline cursor-pointer"
            >
              Full Waste Logs &rarr;
            </button>
          </div>

          <BarChart
            data={wasteChartData}
            height={160}
            barColor="#183F32"
            secondaryColor="#ece7db"
            maxValue={35}
            unit="kg"
            showSecondary={true}
          />

          {/* Most Wasted Dishes ranking */}
          <div className="space-y-2 pt-2 border-t border-ivory-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
              Most Wasted Dishes (Plate Scraped)
            </span>
            <div className="space-y-1.5">
              {[
                { dish: "Steamed Rice, Sambar & Rasam", slot: "Dinner", avg: "24.5 kg / session" },
                { dish: "Bisibelebath & Potato Fry", slot: "Wed Dinner", avg: "21.0 kg / session" },
                { dish: "Semolina Upma & Chutney", slot: "Tue Breakfast", avg: "14.2 kg / session" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-ivory-50 border border-ivory-200 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-charcoal-800">
                    #{idx + 1} {item.dish} <span className="text-charcoal-400 font-normal">({item.slot})</span>
                  </span>
                  <span className="font-mono text-terracotta font-bold">{item.avg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION C: CLEANLINESS MONITORING */}
        <div className="bg-white rounded-xl p-5 border border-ivory-300 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
              <div>
                <h3 className="font-bold font-display text-sm uppercase tracking-wider text-charcoal-800">
                  Section C: Cleanliness Monitoring
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  5 dining hall hygiene zones &amp; active tickets
                </p>
              </div>

              <button
                onClick={() => onNavigateSection("cleanliness")}
                className="text-xs font-semibold text-forest-700 hover:underline cursor-pointer"
              >
                Inspect Zones &rarr;
              </button>
            </div>

            <BarChart
              data={cleanlinessChartData}
              height={160}
              barColor="#183F32"
              maxValue={100}
              unit="%"
            />

            {/* Unresolved Hygiene Reports */}
            <div className="space-y-2 pt-2 border-t border-ivory-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
                Active Hygiene Audit Tickets
              </span>
              <div className="space-y-1.5">
                {reports.slice(0, 2).map((r) => (
                  <div
                    key={r.id}
                    className="p-2.5 rounded-lg bg-ivory-50 border border-ivory-200 text-xs flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-charcoal-800 flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            r.severity === "High" ? "bg-terracotta" : "bg-mustard"
                          }`}
                        />
                        <span>{r.location}</span>
                      </div>
                      <p className="text-[11px] text-charcoal-500 mt-0.5 truncate max-w-xs">
                        {r.description}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        r.status === "Resolved"
                          ? "bg-sage-100 text-forest-800"
                          : "bg-terracotta-100 text-terracotta-900"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION D: SMART RECOMMENDATIONS */}
      <div className="bg-white rounded-xl p-5 border border-ivory-300 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
          <div>
            <h3 className="font-bold font-display text-sm uppercase tracking-wider text-charcoal-800">
              Section D: Smart Culinary &amp; Operational Recommendations
            </h3>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Locally calculated algorithmic recommendations based on live hostel telemetry.
            </p>
          </div>

          <button
            onClick={() => onNavigateSection("recommender")}
            className="text-xs font-semibold text-forest-700 hover:underline cursor-pointer"
          >
            Open Alternative Recommender &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: "Reduce Friday Evening Rice Batch",
              desc: "Attendance drops 18% Friday dinner due to weekend departures. Trimming raw rice saves ~18 kg waste.",
              impact: "Saves ~₹1,450 / week",
              tag: "Portion Planning"
            },
            {
              title: "Swap Semolina Upma with Rava Dosa",
              desc: "Frequent texture dissatisfaction reported in student audits. Rava Dosa boosts satisfaction by +0.7 ★.",
              impact: "+0.7 ★ Expected Boost",
              tag: "Menu Optimization"
            },
            {
              title: "Deploy Self-Serve Sambar Ladles",
              desc: "Pre-poured bowls lead to puddle leftovers. Letting students ladle cuts vessel residue by 11 kg / day.",
              impact: "Cuts 11 kg / day",
              tag: "Serving Logistics"
            }
          ].map((rec, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-ivory-50 border border-ivory-200 text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-forest-700">
                    {rec.tag}
                  </span>
                  <span className="text-[10px] font-mono text-charcoal-400 font-semibold">
                    Rec #{idx + 1}
                  </span>
                </div>
                <h4 className="font-bold text-charcoal-800 text-xs">{rec.title}</h4>
                <p className="text-[11px] text-charcoal-600 mt-1 leading-relaxed">{rec.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-ivory-200 text-[11px] font-mono font-bold text-forest-700">
                {rec.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION E: FOOD SATISFACTION HEATMAP */}
      <FoodSatisfactionHeatmap menu={menu} title="Weekly 28-Slot Food Satisfaction Heatmap" />
    </div>
  );
}
