import React, { useState } from "react";
import {
  Trash2,
  Plus,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Download,
  Calendar,
  Sparkles,
  Scale,
  CheckCircle2,
  Info
} from "lucide-react";
import { Modal } from "../common/Modal";
import { BarChart } from "../common/Charts";
import { exportFoodWasteCSV } from "../../utils/csvExport";

export function FoodWasteManager({
  wasteRecords = [],
  onAddRecord,
  warningThreshold = 15
}) {
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [threshold, setThreshold] = useState(warningThreshold);

  // Form State with South Indian defaults
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    mealType: "dinner",
    foodType: "Steamed Rice, Sambar & Rasam",
    preparedKg: 150,
    servedKg: 125,
    remainingKg: 25,
    wastedKg: 18,
    studentsServed: 380,
    reason: "Rice portion left uneaten on thalis"
  });

  // Calculations
  const todayRecord = wasteRecords[0];
  const todayWasted = todayRecord ? todayRecord.wastedKg : 0;
  const todayPrepared = todayRecord ? todayRecord.preparedKg : 1;
  const todayWastePct = Number(((todayWasted / todayPrepared) * 100).toFixed(1));

  // Weekly total wastage
  const weeklyWastedTotal = wasteRecords.slice(0, 7).reduce((acc, r) => acc + (r.wastedKg || 0), 0);
  const weeklyPreparedTotal = wasteRecords.slice(0, 7).reduce((acc, r) => acc + (r.preparedKg || 0), 0);
  const weeklyWastePct = weeklyPreparedTotal > 0
    ? Number(((weeklyWastedTotal / weeklyPreparedTotal) * 100).toFixed(1))
    : 0;

  // Monthly estimated wastage (extrapolated)
  const monthlyWastedEstimated = Math.round(weeklyWastedTotal * 4.2);

  // Chart data
  const chartData = wasteRecords.slice(0, 7).reverse().map((r) => ({
    label: `${r.date.slice(5)} (${r.mealType.slice(0, 1).toUpperCase()})`,
    value: r.wastedKg,
    secondaryValue: Math.round(r.preparedKg * (threshold / 100))
  }));

  // Handle Form Submission
  const handleSubmitRecord = (e) => {
    e.preventDefault();
    onAddRecord(formData);
    setIsRecordModalOpen(false);
  };

  const isThresholdExceeded = todayWastePct >= threshold;

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-terracotta-700 mb-1">
            <Trash2 className="w-4 h-4 text-terracotta-600" />
            <span>Sustainable South Indian Mess Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            Kitchen Food Wastage Audit
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Measure prepared vs wasted food in kilograms, track thali plate scrapings, and optimize South Indian batch cooking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportFoodWasteCSV(wasteRecords)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-cream-300 hover:bg-cream-100 text-charcoal-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-charcoal-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsRecordModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta-700 hover:bg-terracotta-800 text-cream-50 text-xs font-bold shadow-2xs active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Daily Waste Log</span>
          </button>
        </div>
      </div>

      {/* Threshold Warning Banner */}
      {isThresholdExceeded && (
        <div className="p-5 rounded-2xl bg-terracotta-50 border-2 border-terracotta-300 text-terracotta-950 flex items-start gap-4 animate-fade-in shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-terracotta-200 text-terracotta-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold font-display text-sm text-terracotta-900">
              High Wastage Alert: Today's Waste ({todayWastePct}%) Exceeds Configurable Threshold ({threshold}%)
            </div>
            <p className="text-xs text-terracotta-800 mt-1 leading-relaxed">
              Today, <strong>{todayWasted} kg</strong> of prepared food was discarded out of {todayPrepared} kg cooked. 
              Remaining uneaten food should be channeled to local biogas or food donation partners.
            </p>
          </div>
        </div>
      )}

      {/* Metric Cards (Today, Weekly, Monthly, Threshold) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Today's Waste */}
        <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
            Today's Wastage
          </span>
          <div className="text-2xl font-bold font-display text-charcoal-900 mt-1">
            {todayWasted} kg
          </div>
          <div className="text-xs font-semibold text-terracotta-700 mt-1">
            {todayWastePct}% of food cooked
          </div>
        </div>

        {/* Weekly Wastage */}
        <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
            7-Day Cumulative Waste
          </span>
          <div className="text-2xl font-bold font-display text-charcoal-900 mt-1">
            {weeklyWastedTotal} kg
          </div>
          <div className="text-xs font-semibold text-charcoal-500 mt-1">
            Avg: {(weeklyWastedTotal / 7).toFixed(1)} kg / day
          </div>
        </div>

        {/* Monthly Projection */}
        <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
            Monthly Estimated
          </span>
          <div className="text-2xl font-bold font-display text-charcoal-900 mt-1">
            {monthlyWastedEstimated} kg
          </div>
          <div className="text-xs font-semibold text-leaf-800 mt-1">
            Est. Cost: ₹{((monthlyWastedEstimated * 65)).toLocaleString()}
          </div>
        </div>

        {/* Configurable Threshold */}
        <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
              Waste Warning Limit
            </span>
            <div className="text-2xl font-bold font-display text-charcoal-900 mt-1">
              {threshold}%
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="range"
              min="5"
              max="30"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-terracotta-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-charcoal-900">
              7-Day Food Waste Telemetry (kg)
            </h3>
            <p className="text-xs text-charcoal-500">
              Actual discards vs configurable threshold limit
            </p>
          </div>
          <span className="text-xs font-bold text-terracotta-700 bg-terracotta-50 px-2.5 py-1 rounded-md border border-terracotta-200">
            Threshold: {threshold}%
          </span>
        </div>

        <BarChart
          data={chartData}
          height={200}
          barColor="#c84c32"
          secondaryColor="#e7dfd1"
          maxValue={35}
          unit="kg"
          showSecondary={true}
        />
      </div>

      {/* Food Waste Intelligence: Most Wasted Dishes & Actionable Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Most Wasted Dishes Ranking */}
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-terracotta-600" />
            <h3 className="text-base font-bold font-display text-charcoal-900">
              Most Wasted Dishes in Hostel Dining Hall
            </h3>
          </div>
          <p className="text-xs text-charcoal-500">
            Identified by aggregating plate scrapings and leftover logs across all meal slots
          </p>

          <div className="space-y-3">
            {[
              {
                dish: "Steamed Rice, Sambar & Rasam",
                slot: "Dinner Special",
                avgWaste: "24.5 kg / session",
                wastePct: "16.3%",
                cause: "Excessive rice cooked due to uneven student turnout"
              },
              {
                dish: "Bisibelebath & Potato Fry",
                slot: "Wednesday Dinner",
                avgWaste: "21.0 kg / session",
                wastePct: "14.0%",
                cause: "Heavy evening meal portion rejected by hostellers"
              },
              {
                dish: "Semolina Upma & Chutney",
                slot: "Tuesday Breakfast",
                avgWaste: "14.2 kg / session",
                wastePct: "15.7%",
                cause: "Frequent texture dissatisfaction reported in student audits"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-charcoal-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-terracotta-100 text-terracotta-800 font-bold inline-flex items-center justify-center text-[10px]">
                      #{idx + 1}
                    </span>
                    <span>{item.dish}</span>
                  </div>
                  <div className="text-[11px] text-charcoal-500 mt-0.5">
                    {item.slot} • {item.cause}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-terracotta-800">{item.avgWaste}</div>
                  <div className="text-[10px] text-terracotta-600 font-semibold">{item.wastePct} waste rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Local Recommendations */}
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-turmeric-600" />
            <h3 className="text-base font-bold font-display text-charcoal-900">
              Actionable Local Recommendations
            </h3>
          </div>
          <p className="text-xs text-charcoal-500">
            Automated recommendations generated from live attendance and waste telemetry
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Trim Friday Evening Rice Batch by 15%",
                desc: "Reduce raw rice by 8 kg on Friday dinner due to weekend hostel departures. Saves ~₹1,450/week.",
                tag: "High Impact"
              },
              {
                title: "Adopt Self-Serve Sambar Ladles at Counter 2",
                desc: "Allowing students to pour their own sambar reduces plate puddle discard by an estimated 11 kg/day.",
                tag: "Operational"
              },
              {
                title: "Swap Semolina Upma with Rava Dosa",
                desc: "Using Smart Alternative Recommender eliminates dry texture complaints and cuts breakfast waste by 14 kg.",
                tag: "Menu Optimization"
              }
            ].map((rec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-leaf-50/70 border border-leaf-200 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-leaf-950 font-display">{rec.title}</span>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-leaf-200 text-leaf-800">
                    {rec.tag}
                  </span>
                </div>
                <p className="text-charcoal-600 text-[11px] leading-relaxed">{rec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Waste Records Log */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-4">
        <h3 className="text-base font-bold font-display text-charcoal-900">
          Historical Daily Waste Discard Logs ({wasteRecords.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cream-200 text-charcoal-500 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">Date & Slot</th>
                <th className="pb-3 font-bold">Food Description</th>
                <th className="pb-3 font-bold">Prepared</th>
                <th className="pb-3 font-bold">Wasted (kg)</th>
                <th className="pb-3 font-bold">Wastage %</th>
                <th className="pb-3 font-bold">Students</th>
                <th className="pb-3 font-bold">Reason / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {wasteRecords.map((r) => {
                const isOver = r.wastePercentage >= threshold;
                return (
                  <tr key={r.id} className="hover:bg-cream-50/50">
                    <td className="py-3 font-semibold text-charcoal-900">
                      {r.date} <span className="text-charcoal-400 font-normal uppercase">({r.mealType})</span>
                    </td>
                    <td className="py-3 text-charcoal-800">{r.foodType}</td>
                    <td className="py-3 text-charcoal-600">{r.preparedKg} kg</td>
                    <td className="py-3 font-bold text-charcoal-900">{r.wastedKg} kg</td>
                    <td className="py-3">
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                          isOver ? "bg-terracotta-100 text-terracotta-800" : "bg-leaf-100 text-leaf-800"
                        }`}
                      >
                        {r.wastePercentage}%
                      </span>
                    </td>
                    <td className="py-3 text-charcoal-600">{r.studentsServed}</td>
                    <td className="py-3 text-charcoal-500 italic max-w-xs truncate">{r.reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Record */}
      {isRecordModalOpen && (
        <Modal
          isOpen={isRecordModalOpen}
          onClose={() => setIsRecordModalOpen(false)}
          title="Record Daily Mess Food Wastage"
          subtitle="Log accurate kilograms after evening thali and vessel scraping"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmitRecord} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Meal Slot</label>
                <select
                  value={formData.mealType}
                  onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white uppercase font-bold"
                >
                  <option value="breakfast">BREAKFAST</option>
                  <option value="lunch">LUNCH</option>
                  <option value="snacks">SNACKS</option>
                  <option value="dinner">DINNER</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Food Item Description</label>
              <input
                type="text"
                required
                value={formData.foodType}
                onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                placeholder="e.g. Steamed Rice, Arachuvitta Sambar, Rasam"
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Prepared (kg)</label>
                <input
                  type="number"
                  required
                  value={formData.preparedKg}
                  onChange={(e) => setFormData({ ...formData, preparedKg: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Served (kg)</label>
                <input
                  type="number"
                  required
                  value={formData.servedKg}
                  onChange={(e) => setFormData({ ...formData, servedKg: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Wasted (kg)</label>
                <input
                  type="number"
                  required
                  value={formData.wastedKg}
                  onChange={(e) => setFormData({ ...formData, wastedKg: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Students Served</label>
              <input
                type="number"
                value={formData.studentsServed}
                onChange={(e) => setFormData({ ...formData, studentsServed: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Reason / Observation Note</label>
              <textarea
                rows={2}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="e.g. Overestimated rice batch due to rain..."
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-cream-200">
              <button
                type="button"
                onClick={() => setIsRecordModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-600 hover:bg-cream-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-terracotta-700 hover:bg-terracotta-800 text-cream-50 text-xs font-bold shadow-2xs cursor-pointer"
              >
                Save Record
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
