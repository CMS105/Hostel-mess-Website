import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Utensils,
  RefreshCw,
  Flame,
  ThumbsDown,
  ChefHat
} from "lucide-react";
import { SMART_SOUTH_INDIAN_REPLACEMENTS } from "../../data/mockData";
import { formatRatingDisplay } from "../../utils/ratingUtils";

export function SmartAlternativeRecommender({
  menu = [],
  feedbackLogs = [],
  onReplaceDish
}) {
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [replacementSuccess, setReplacementSuccess] = useState(null);

  // Find dishes that have ratings < 4.2 or higher negative votes or match disliked keywords
  const candidateDishes = menu.map((m) => {
    // Check if dish name matches any disliked keywords
    const matchedReplacement = SMART_SOUTH_INDIAN_REPLACEMENTS.find((rec) =>
      rec.dislikedKeywords.some((kw) => m.name.toLowerCase().includes(kw.toLowerCase()))
    );

    const badVoteRatio = m.badVotes && m.goodVotes ? (m.badVotes / (m.goodVotes + m.badVotes)) : 0;
    const isLowRated = (m.avgRating && m.avgRating < 4.2) || badVoteRatio > 0.2;

    return {
      meal: m,
      isFlagged: isLowRated || !!matchedReplacement,
      matchedReplacement: matchedReplacement || {
        recommendedReplacement: "Crispy Masala Dosa with Potato Palya & Sambhar",
        reason: "Highest rated South Indian favorite with near zero plate wastage.",
        projectedSatisfactionDelta: "+0.8 ★",
        mealType: m.mealType,
        category: "South Indian"
      }
    };
  }).filter((item) => item.isFlagged);

  const handleApplyReplacement = (meal, rec) => {
    const updatedDish = {
      name: rec.recommendedReplacement,
      category: rec.category || "South Indian",
      description: `${rec.recommendedReplacement} prepared with traditional spices and fresh tempering. Recommended based on hostel student preference analysis (${rec.reason}).`,
      // Fresh dish starts with baseline projected rating
      avgRating: 4.8,
      ratingCount: 1, // Rule 2 compliant
      goodVotes: 1,
      badVotes: 0
    };

    if (onReplaceDish) {
      onReplaceDish(meal.id, updatedDish);
    }

    setReplacementSuccess({
      mealId: meal.id,
      dishName: rec.recommendedReplacement,
      previousDish: meal.name
    });

    setTimeout(() => {
      setReplacementSuccess(null);
    }, 5000);
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
              <Sparkles className="w-4 h-4 text-turmeric-600" />
              <span>Smart Alternative Recommendations • AI Culinary Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 tracking-tight">
              South Indian Menu Optimization & Replacement Hub
            </h1>
            <p className="text-xs text-charcoal-600 mt-1 max-w-3xl leading-relaxed">
              Analyzes student taste dissatisfaction, feedback logs, and uneaten plate ratios. Algorithmic South Indian dish replacements boost satisfaction, eliminate recurrent student complaints, and reduce mess waste.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-leaf-50 px-4 py-2.5 rounded-2xl border border-leaf-200">
            <ChefHat className="w-5 h-5 text-leaf-700" />
            <div className="text-xs">
              <div className="font-bold text-leaf-900">{candidateDishes.length} Optimization Opportunities</div>
              <div className="text-leaf-700 text-[11px]">Identified from student ratings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {replacementSuccess && (
        <div className="bg-leaf-100 border border-leaf-300 text-leaf-900 p-4 rounded-2xl flex items-center justify-between shadow-xs animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-leaf-700 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold">Menu Updated Successfully! </span>
              Replaced <span className="line-through text-charcoal-500">{replacementSuccess.previousDish}</span> with{" "}
              <strong className="text-leaf-800 font-bold">{replacementSuccess.dishName}</strong>. The change is now live on all student dashboards.
            </div>
          </div>
          <span className="text-[11px] font-bold bg-leaf-200 px-2.5 py-1 rounded-full text-leaf-800">
            Published Live
          </span>
        </div>
      )}

      {/* Recommended Replacements Grid */}
      <div className="grid grid-cols-1 gap-5">
        {candidateDishes.map(({ meal, matchedReplacement }) => {
          const isSelected = selectedMealId === meal.id;

          return (
            <div
              key={meal.id}
              className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-2xs ${
                isSelected ? "border-leaf-600 ring-2 ring-leaf-200" : "border-cream-200 hover:border-cream-300"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Current Underperforming Dish */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cream-200 text-charcoal-700">
                      {meal.day} • {meal.mealType.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-semibold text-charcoal-500">
                      {meal.timing}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 border border-terracotta-200 flex items-center gap-1">
                      <ThumbsDown className="w-3 h-3" />
                      Low Satisfaction
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-charcoal-900">
                    {meal.name}
                  </h3>

                  <p className="text-xs text-charcoal-500 line-clamp-2">
                    {meal.description}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <div className="font-bold text-terracotta-800 bg-terracotta-50 px-2.5 py-1 rounded-lg border border-terracotta-200">
                      Current Rating: {formatRatingDisplay(meal.avgRating, meal.ratingCount)}
                    </div>
                    {meal.badVotes > 0 && (
                      <span className="text-charcoal-500 text-[11px]">
                        👎 {meal.badVotes} students dissatisfied
                      </span>
                    )}
                  </div>
                </div>

                {/* Center Arrow Indicator */}
                <div className="hidden lg:flex flex-col items-center justify-center px-4">
                  <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-800 border border-leaf-200">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-leaf-800 mt-1">
                    Replace With
                  </span>
                </div>

                {/* Right: Recommended South Indian Dish */}
                <div className="flex-1 bg-cream-50 rounded-2xl p-4 sm:p-5 border border-cream-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-leaf-800 bg-leaf-100 px-2 py-0.5 rounded-md border border-leaf-200">
                      Chef Recommendation
                    </span>
                    <span className="text-xs font-bold text-leaf-800 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {matchedReplacement.projectedSatisfactionDelta} Projected Boost
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-display text-charcoal-900">
                    {matchedReplacement.recommendedReplacement}
                  </h4>

                  <p className="text-xs text-charcoal-600 italic">
                    "{matchedReplacement.reason}"
                  </p>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-charcoal-500">
                      Est. Waste Reduction: <strong className="text-leaf-800">12–16 kg/serving</strong>
                    </span>

                    <button
                      onClick={() => handleApplyReplacement(meal, matchedReplacement)}
                      className="px-4 py-2 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs hover:shadow-sm active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Publish Replacement</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {candidateDishes.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-cream-200 text-charcoal-500">
            <CheckCircle2 className="w-12 h-12 text-leaf-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg font-display text-charcoal-800">
              All Weekly Dishes Meet Quality Standards
            </h3>
            <p className="text-xs text-charcoal-500 max-w-md mx-auto mt-1">
              Every dish across all 28 weekly meal slots holds an average rating $\ge 4.2$ ★. No low-satisfaction replacements are currently needed.
            </p>
          </div>
        )}
      </div>

      {/* Replacement Rule & Method Note */}
      <div className="bg-cream-100/70 rounded-2xl p-4 border border-cream-200 text-xs text-charcoal-600 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-turmeric-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-charcoal-800">Hostel Mess Menu Governance:</strong> Replacement dishes adhere to the South Indian College Mess Charter. When admin publishes a replacement, all student dashboards automatically update their menu calendar and meal slot descriptions without restarting or database sync.
        </div>
      </div>
    </div>
  );
}
