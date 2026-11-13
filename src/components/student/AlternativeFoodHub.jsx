import React, { useState } from "react";
import { UtensilsCrossed, Plus, Users, CheckCircle2, AlertCircle, ThumbsUp, Sparkles } from "lucide-react";

export function AlternativeFoodHub({
  menu = [],
  alternativeRequests = [],
  onRequestAlternative
}) {
  const [selectedMealId, setSelectedMealId] = useState(menu[0]?.id || "");
  const [customDish, setCustomDish] = useState("");

  const selectedMeal = menu.find((m) => m.id === selectedMealId) || menu[0];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customDish.trim()) return;

    onRequestAlternative(selectedMeal.id, customDish.trim());
    setCustomDish("");
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-leaf-800 rounded-3xl p-6 sm:p-8 text-cream-50 shadow-md relative overflow-hidden border border-leaf-900">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-leaf-900/80 text-turmeric-300 border border-leaf-700/60 inline-block mb-3">
            Democratized Hostel Dining
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-cream-50">
            Alternative Food Voting Hub
          </h2>
          <p className="mt-2 text-sm text-cream-200/90 leading-relaxed">
            Hostel food doesn't have to be one-size-fits-all. If today's main South Indian dish doesn't suit your dietary preference, vote for your favorite backup alternative or propose new dishes.
          </p>
        </div>
      </div>

      {/* Info notice */}
      <div className="bg-cream-100 border border-cream-300 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-terracotta-700 shrink-0 mt-0.5" />
        <div className="text-xs text-charcoal-800 leading-relaxed">
          <strong className="font-bold text-charcoal-900">How Alternative Requests Work: </strong>
          When an alternative receives sufficient votes (15+ students), the mess administration prepares an auxiliary counter (e.g. tawa chapatis or curd rice). Note: requests are
          <span className="font-bold text-leaf-800"> advisory recommendations</span> reviewed daily by the mess supervisor.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left: Interactive Voting Panel */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-lg font-bold font-display text-charcoal-900">
              Submit or Vote on a Meal Alternative
            </h3>
            <p className="text-xs text-charcoal-600 mt-0.5">
              Select any meal slot from this week to inspect and vote for alternatives
            </p>
          </div>

          {/* Meal Slot Selector */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
              Select Scheduled Meal
            </label>
            <select
              value={selectedMealId}
              onChange={(e) => setSelectedMealId(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-600 font-semibold text-charcoal-800 cursor-pointer"
            >
              {menu.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.day} - {m.mealType.toUpperCase()}: {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Currently Configured Alternatives for Selected Meal */}
          {selectedMeal && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-600">
                Official Backup Alternatives for {selectedMeal.name}
              </span>

              {selectedMeal.alternativeDishes && selectedMeal.alternativeDishes.length > 0 ? (
                <div className="space-y-2.5">
                  {selectedMeal.alternativeDishes.map((alt) => (
                    <div
                      key={alt.id}
                      className="p-4 rounded-2xl bg-cream-50/70 border border-cream-200 flex items-center justify-between hover:border-leaf-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-leaf-100 text-leaf-800 flex items-center justify-center font-bold">
                          <UtensilsCrossed className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-charcoal-900">{alt.name}</div>
                          <div className="text-[11px] text-charcoal-500">
                            {alt.count || 0} students voted for this
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRequestAlternative(selectedMeal.id, alt.name)}
                        className="px-3.5 py-1.5 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Vote (+15 pts)</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-charcoal-400">No alternatives pre-listed for this dish yet.</p>
              )}
            </div>
          )}

          {/* Custom Dish Proposal Form */}
          <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-cream-200 space-y-3">
            <span className="text-xs font-bold text-charcoal-700 uppercase tracking-wider block">
              Propose A New Alternative Dish
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                value={customDish}
                onChange={(e) => setCustomDish(e.target.value)}
                placeholder="e.g. Curd Rice with Boondi, Plain Khichdi, Chapati & Kurma..."
                className="flex-1 text-xs p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-leaf-600 bg-white placeholder-charcoal-400 text-charcoal-800"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 text-xs font-bold shadow-2xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Submit (+15 pts)</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Trending Alternative Requests Queue */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-cream-200">
              <h3 className="text-base font-bold font-display text-charcoal-900">
                Most Requested Alternatives
              </h3>
              <span className="text-[11px] font-bold text-leaf-800 bg-leaf-100 px-2 py-0.5 rounded-full border border-leaf-200">
                Active Queue
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {alternativeRequests.slice(0, 5).map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-cream-50/70 border border-cream-200 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-charcoal-900">{req.requestedDish}</div>
                    <div className="text-[11px] text-charcoal-500 truncate max-w-[200px]">
                      For {req.mealName}
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1 ${
                        req.status === "Accepted"
                          ? "bg-leaf-100 text-leaf-800 border border-leaf-300"
                          : req.status === "Planned"
                          ? "bg-turmeric-100 text-turmeric-900 border border-turmeric-300"
                          : req.status === "Rejected"
                          ? "bg-terracotta-100 text-terracotta-800 border border-terracotta-300"
                          : "bg-cream-200 text-charcoal-700"
                      }`}
                    >
                      {req.status}
                    </span>
                    <span className="text-[11px] text-charcoal-500 font-medium">
                      {req.requestCount} votes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-cream-200 text-center">
            <span className="text-xs text-charcoal-500">
              Approved requests are routed directly to kitchen prep counters
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
