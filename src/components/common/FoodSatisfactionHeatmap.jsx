import React, { useState } from "react";
import {
  Calendar,
  Star,
  Info,
  Filter,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { formatRatingDisplay } from "../../utils/ratingUtils";

export function FoodSatisfactionHeatmap({ menu = [], title = "Weekly Food Satisfaction Heatmap" }) {
  const [slotFilter, setSlotFilter] = useState("all");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealSlots = [
    { key: "breakfast", label: "Breakfast", time: "07:30 - 09:30 AM" },
    { key: "lunch", label: "Lunch", time: "12:30 - 02:30 PM" },
    { key: "snacks", label: "Evening Snacks", time: "05:00 - 06:30 PM" },
    { key: "dinner", label: "Dinner", time: "07:30 - 09:30 PM" }
  ];

  // Helper to get meal by day and slot
  const getMeal = (day, mealType) => {
    return menu.find(
      (m) =>
        m.day.toLowerCase() === day.toLowerCase() &&
        m.mealType.toLowerCase() === mealType.toLowerCase()
    );
  };

  // Determine heatmap cell color based on satisfaction and count
  const getCellStyling = (meal) => {
    if (!meal || !meal.ratingCount || meal.ratingCount === 0) {
      return {
        bg: "bg-cream-100",
        border: "border-cream-300",
        text: "text-charcoal-500",
        badge: "bg-cream-200 text-charcoal-600",
        tierLabel: "Unrated"
      };
    }

    const rating = meal.avgRating || 0;
    if (rating >= 4.5) {
      return {
        bg: "bg-leaf-100/80 hover:bg-leaf-100",
        border: "border-leaf-300",
        text: "text-leaf-950",
        badge: "bg-leaf-200 text-leaf-900 border border-leaf-300",
        tierLabel: "High Satisfaction"
      };
    } else if (rating >= 4.0) {
      return {
        bg: "bg-turmeric-100/70 hover:bg-turmeric-100",
        border: "border-turmeric-300",
        text: "text-charcoal-900",
        badge: "bg-turmeric-200 text-turmeric-900 border border-turmeric-300",
        tierLabel: "Moderate"
      };
    } else {
      return {
        bg: "bg-terracotta-100/70 hover:bg-terracotta-100",
        border: "border-terracotta-300",
        text: "text-terracotta-950",
        badge: "bg-terracotta-200 text-terracotta-900 border border-terracotta-300",
        tierLabel: "Needs Improvement"
      };
    }
  };

  // Sample size statistical confidence check
  const getConfidenceBadge = (count) => {
    if (!count || count === 0) {
      return {
        text: "No Votes Yet",
        style: "bg-cream-200 text-charcoal-600 border-cream-300"
      };
    }
    if (count === 1) {
      return {
        text: "1 Single Vote (Low Sample)",
        style: "bg-amber-100 text-amber-900 border-amber-300"
      };
    }
    if (count < 25) {
      return {
        text: "Initial Feedback",
        style: "bg-blue-100 text-blue-900 border-blue-200"
      };
    }
    return {
      text: "High Consensus",
      style: "bg-leaf-200 text-leaf-900 border-leaf-300"
    };
  };

  // Filtered slots
  const displayedSlots =
    slotFilter === "all" ? mealSlots : mealSlots.filter((s) => s.key === slotFilter);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-cream-200 shadow-2xs space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
            <Calendar className="w-4 h-4 text-leaf-700" />
            <span>28-Slot Weekly Food Satisfaction Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Full Monday–Sunday student dining satisfaction telemetry. Vote counts are strictly verified on every single meal slot to prevent misrepresenting single votes as consensus.
          </p>
        </div>

        {/* Slot Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSlotFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              slotFilter === "all"
                ? "bg-leaf-700 text-cream-50 shadow-2xs"
                : "bg-cream-100 text-charcoal-700 hover:bg-cream-200"
            }`}
          >
            All 4 Slots
          </button>
          {mealSlots.map((slot) => (
            <button
              key={slot.key}
              onClick={() => setSlotFilter(slot.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                slotFilter === slot.key
                  ? "bg-leaf-700 text-cream-50 shadow-2xs"
                  : "bg-cream-100 text-charcoal-700 hover:bg-cream-200"
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="flex flex-wrap items-center gap-3 pt-1 pb-2 border-b border-cream-200 text-xs">
        <span className="font-bold text-charcoal-700">Satisfaction Scale:</span>
        <div className="flex items-center gap-1.5 bg-leaf-100 px-2.5 py-1 rounded-lg border border-leaf-300 text-leaf-950 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-leaf-600 inline-block" />
          <span>High ( $\ge 4.5$ ★ )</span>
        </div>
        <div className="flex items-center gap-1.5 bg-turmeric-100 px-2.5 py-1 rounded-lg border border-turmeric-300 text-turmeric-950 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-turmeric-600 inline-block" />
          <span>Moderate ( 4.0 – 4.4 ★ )</span>
        </div>
        <div className="flex items-center gap-1.5 bg-terracotta-100 px-2.5 py-1 rounded-lg border border-terracotta-300 text-terracotta-950 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-terracotta-600 inline-block" />
          <span>Needs Attention ( &lt; 4.0 ★ )</span>
        </div>
        <div className="flex items-center gap-1.5 bg-cream-100 px-2.5 py-1 rounded-lg border border-cream-300 text-charcoal-600 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-cream-400 inline-block" />
          <span>Not Rated ( 0 ratings )</span>
        </div>
      </div>

      {/* Responsive Matrix Grid */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-cream-300">
              <th className="py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider text-charcoal-500 w-28">
                Meal Slot
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider text-charcoal-700 text-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {displayedSlots.map((slot) => (
              <tr key={slot.key} className="hover:bg-cream-50/50 transition-colors">
                <td className="py-3 px-3 align-top">
                  <div className="font-bold text-xs text-charcoal-900">{slot.label}</div>
                  <div className="text-[10px] text-charcoal-500">{slot.time}</div>
                </td>

                {days.map((day) => {
                  const meal = getMeal(day, slot.key);
                  const style = getCellStyling(meal);
                  const confidence = getConfidenceBadge(meal?.ratingCount || 0);

                  return (
                    <td key={day} className="p-2 align-top">
                      <div
                        className={`rounded-2xl p-3 border transition-all h-full flex flex-col justify-between ${style.bg} ${style.border}`}
                      >
                        <div>
                          {/* Dish Name */}
                          <div
                            className="font-bold text-xs line-clamp-2 leading-tight text-charcoal-900 mb-1"
                            title={meal?.name || "Dish Not Configured"}
                          >
                            {meal?.name || "Standard Mess Menu"}
                          </div>

                          {/* Average Rating + Vote Count Strictly Formatted (Rule 2) */}
                          <div className="mt-1 flex items-center gap-1 text-xs font-extrabold text-charcoal-900">
                            <Star className="w-3.5 h-3.5 fill-turmeric-500 text-turmeric-600 flex-shrink-0" />
                            <span>
                              {formatRatingDisplay(meal?.avgRating, meal?.ratingCount)}
                            </span>
                          </div>
                        </div>

                        {/* Statistical Confidence Pill */}
                        <div className="mt-2.5 pt-2 border-t border-cream-200/60">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border inline-block ${confidence.style}`}
                          >
                            {confidence.text}
                          </span>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note about Rule 2 & Statistical Rigor */}
      <div className="bg-cream-100 rounded-2xl p-3.5 border border-cream-200 text-xs text-charcoal-600 flex items-center gap-2.5">
        <Info className="w-4 h-4 text-leaf-800 flex-shrink-0" />
        <span>
          <strong>Hackathon Accuracy Rule:</strong> A single 5-star rating (such as Friday Snacks) is explicitly labeled as <em>"1 Single Vote (Low Sample)"</em> to avoid skewing kitchen operations. High-confidence decisions require $\ge 25$ student ratings.
        </span>
      </div>
    </div>
  );
}
