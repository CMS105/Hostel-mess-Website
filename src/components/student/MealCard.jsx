import React from "react";
import { Star, Clock, Lock, CheckCircle2, UtensilsCrossed, ThumbsUp, ThumbsDown } from "lucide-react";
import { getMealAvailability, isMealInFuture } from "../../utils/mealTiming";
import { formatRatingDisplay } from "../../utils/ratingUtils";

export function MealCard({
  meal,
  onRateClick,
  onRequestAltClick,
  isRatedByStudent = false,
  studentRatingData = null
}) {
  // Always evaluate against browser's current local date and time (RULE 1)
  const availability = getMealAvailability(meal, new Date());
  const isFuture = isMealInFuture(meal, new Date());

  const ratingLabel = formatRatingDisplay(meal.avgRating, meal.ratingCount);

  return (
    <div className="bg-white rounded-xl border border-ivory-300 p-4 shadow-2xs hover:border-charcoal-300 transition-colors flex flex-col justify-between text-charcoal-800">
      <div>
        {/* Top Header Row: Slot, Category, Status */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-ivory-200 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-ivory-200 text-charcoal-700">
              {meal.mealType}
            </span>
            <span className="text-[10px] font-mono text-charcoal-400">
              {meal.category}
            </span>
          </div>

          <span
            className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded border ${
              availability.status === "SERVING_NOW"
                ? "bg-mustard-100 text-mustard-900 border-mustard-300 font-bold"
                : availability.status === "SERVED"
                ? "bg-sage-100 text-forest-800 border-sage-300"
                : "bg-ivory-200 text-charcoal-500 border-ivory-300"
            }`}
          >
            {availability.badgeText}
          </span>
        </div>

        {/* Dish Title & Compact Thumbnail */}
        <div className="flex items-start gap-3">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-12 h-12 rounded-lg object-cover border border-ivory-300 shrink-0"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-xs sm:text-sm font-display text-charcoal-800 leading-snug truncate">
              {meal.name}
            </h3>
            <p className="text-[11px] text-charcoal-500 mt-0.5 line-clamp-2 leading-relaxed">
              {meal.description}
            </p>
          </div>
        </div>

        {/* Serving Window & Rating Metric Row */}
        <div className="mt-3 pt-2.5 border-t border-ivory-200 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1 text-[11px] text-charcoal-500">
            <Clock className="w-3 h-3 text-charcoal-400" />
            <span>{meal.timing}</span>
          </div>

          <div className="flex items-center gap-1 font-bold text-charcoal-800">
            <Star className="w-3.5 h-3.5 fill-mustard text-mustard shrink-0" />
            <span>{ratingLabel}</span>
          </div>
        </div>

        {/* Alternative Dishes Snippet */}
        {meal.alternativeDishes && meal.alternativeDishes.length > 0 && (
          <div className="mt-2 text-[10px] text-charcoal-500 bg-ivory-50 p-1.5 rounded border border-ivory-200 flex items-center justify-between">
            <span className="truncate">Alt: {meal.alternativeDishes[0].name}</span>
            <button
              type="button"
              onClick={() => onRequestAltClick && onRequestAltClick(meal)}
              className="text-forest-700 font-bold hover:underline shrink-0 ml-1 cursor-pointer"
            >
              Vote
            </button>
          </div>
        )}
      </div>

      {/* Action Row */}
      <div className="mt-3 pt-2.5 border-t border-ivory-200 flex items-center justify-between">
        {isRatedByStudent ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Rated ({studentRatingData?.choice === "needs_improvement" ? "👎 Needs Imp." : "👍 Good"})</span>
          </span>
        ) : isFuture ? (
          <div
            className="inline-flex items-center gap-1 text-[11px] text-charcoal-400 italic"
            title="Rating will open when this meal is available."
          >
            <Lock className="w-3 h-3" />
            <span>Locked until serving</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onRateClick && onRateClick(meal)}
            className="px-3 py-1 rounded bg-forest-700 hover:bg-forest-800 text-ivory text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            Rate Meal
          </button>
        )}

        {meal.alternativeDishes && (
          <button
            type="button"
            onClick={() => onRequestAltClick && onRequestAltClick(meal)}
            className="text-[11px] text-charcoal-600 hover:text-charcoal-900 font-semibold cursor-pointer"
          >
            Request Alt &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
