import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Star,
  CheckCircle2,
  Lock,
  Filter,
  UtensilsCrossed,
  Eye,
  LayoutGrid,
  Table as TableIcon
} from "lucide-react";
import { getMealAvailability, isMealInFuture } from "../../utils/mealTiming";
import { formatRatingDisplay } from "../../utils/ratingUtils";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_SLOTS = [
  { key: "breakfast", label: "Breakfast", defaultTime: "07:30 AM - 09:30 AM" },
  { key: "lunch", label: "Lunch", defaultTime: "12:30 PM - 02:30 PM" },
  { key: "snacks", label: "Evening Snacks", defaultTime: "05:00 PM - 06:30 PM" },
  { key: "dinner", label: "Dinner", defaultTime: "07:30 PM - 09:30 PM" }
];

export function StudentMenuCalendar({
  menu = [],
  studentRatings = [],
  onRateMeal,
  onRequestAlternative,
  demoBypass = false
}) {
  const todayDayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState(
    DAYS_OF_WEEK.includes(todayDayName) ? todayDayName : "Friday"
  );
  const [viewMode, setViewMode] = useState("matrix"); // 'matrix' (7-day grid) | 'daily' (structured day view)
  const [categoryFilter, setCategoryFilter] = useState("All");

  const ratedMealIds = new Set(studentRatings.map((r) => r.mealId));

  const categories = ["All", "South Indian", "Thali Meals", "Snacks", "Dinner Special"];

  // Helper to find a meal by day and slot
  const getMeal = (day, slotKey) => {
    return menu.find(
      (m) =>
        m.day.toLowerCase() === day.toLowerCase() &&
        m.mealType.toLowerCase() === slotKey.toLowerCase()
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-charcoal-800">
      {/* Header & Controls Bar */}
      <div className="bg-white rounded-xl p-5 border border-ivory-300 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-charcoal-400 font-semibold mb-1">
            Hostel Operations • Dining Schedule Matrix
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-forest-700 tracking-tight">
            Weekly Mess Menu Timetable
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Institutional 7-day schedule with ratings, portion categories, and strict serving-window rating eligibility.
          </p>
        </div>

        {/* View Controls & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-ivory-200 rounded-lg p-0.5 border border-ivory-300">
            <button
              onClick={() => setViewMode("matrix")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "matrix"
                  ? "bg-forest-700 text-ivory font-bold shadow-2xs"
                  : "text-charcoal-600 hover:text-charcoal-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>7-Day Matrix</span>
            </button>
            <button
              onClick={() => setViewMode("daily")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "daily"
                  ? "bg-forest-700 text-ivory font-bold shadow-2xs"
                  : "text-charcoal-600 hover:text-charcoal-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Day View</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-ivory-100 px-2.5 py-1.5 rounded-lg border border-ivory-300">
            <Filter className="w-3 h-3 text-charcoal-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-charcoal-700 focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: 7-DAY STRUCTURED CALENDAR MATRIX (TABLE) */}
      {viewMode === "matrix" && (
        <div className="bg-white rounded-xl border border-ivory-300 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-left text-xs">
              <thead>
                <tr className="bg-ivory-100 border-b border-ivory-300">
                  <th className="py-3 px-3.5 text-[10px] font-mono uppercase tracking-widest text-charcoal-500 w-28">
                    Slot
                  </th>
                  {DAYS_OF_WEEK.map((day) => {
                    const isToday = day === todayDayName;
                    return (
                      <th
                        key={day}
                        className={`py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-center ${
                          isToday
                            ? "bg-forest-100/70 text-forest-800 border-x border-forest-200"
                            : "text-charcoal-700"
                        }`}
                      >
                        <div>{day}</div>
                        {isToday && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-forest-700 text-ivory font-semibold mt-0.5 inline-block">
                            Today
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                {MEAL_SLOTS.map((slot) => (
                  <tr key={slot.key} className="hover:bg-ivory-50/50 transition-colors">
                    {/* Slot Header Row */}
                    <td className="py-3 px-3.5 align-top bg-ivory-50/60 border-r border-ivory-200">
                      <div className="font-bold text-xs text-charcoal-800 uppercase tracking-wide">
                        {slot.label}
                      </div>
                      <div className="text-[10px] text-charcoal-400 font-mono mt-0.5">
                        {slot.defaultTime}
                      </div>
                    </td>

                    {/* Day Cells */}
                    {DAYS_OF_WEEK.map((day) => {
                      const meal = getMeal(day, slot.key);
                      const isToday = day === todayDayName;
                      if (!meal) {
                        return (
                          <td key={day} className="p-2 align-top text-charcoal-300 italic text-[11px]">
                            —
                          </td>
                        );
                      }

                      const availability = getMealAvailability(meal, new Date());
                      const isRated = ratedMealIds.has(meal.id);
                      const isFuture = isMealInFuture(meal, new Date());

                      return (
                        <td
                          key={day}
                          className={`p-2 align-top ${
                            isToday ? "bg-forest-50/20 border-x border-forest-200" : ""
                          }`}
                        >
                          <div className="rounded-lg p-2.5 bg-ivory-50 border border-ivory-200 flex flex-col justify-between h-full space-y-2 hover:border-charcoal-300 transition-colors">
                            <div>
                              {/* Thumbnail & Dish Name */}
                              <div className="flex items-start gap-2">
                                <img
                                  src={meal.imageUrl}
                                  alt={meal.name}
                                  className="w-8 h-8 rounded object-cover border border-ivory-300 shrink-0"
                                  loading="lazy"
                                />
                                <div className="min-w-0">
                                  <div
                                    className="font-bold text-xs leading-tight text-charcoal-800 line-clamp-2"
                                    title={meal.name}
                                  >
                                    {meal.name}
                                  </div>
                                </div>
                              </div>

                              {/* Serving Time & Category */}
                              <div className="mt-1.5 flex items-center justify-between text-[10px] text-charcoal-500 font-mono">
                                <span>{meal.timing.split(" - ")[0]}</span>
                                <span className="text-charcoal-400 truncate max-w-[80px]">
                                  {meal.category}
                                </span>
                              </div>

                              {/* Rating & Votes Count strictly formatted (Rule 2) */}
                              <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-charcoal-800 font-bold">
                                <Star className="w-3 h-3 fill-mustard text-mustard shrink-0" />
                                <span>{formatRatingDisplay(meal.avgRating, meal.ratingCount)}</span>
                              </div>
                            </div>

                            {/* Eligibility Status / Rate Button */}
                            <div className="pt-1.5 border-t border-ivory-200 flex items-center justify-between text-[10px]">
                              {isRated ? (
                                <span className="text-forest-700 font-bold flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Rated</span>
                                </span>
                              ) : isFuture && !demoBypass ? (
                                <span
                                  className="text-charcoal-400 italic flex items-center gap-1"
                                  title="Rating will open when this meal is available."
                                >
                                  <Lock className="w-2.5 h-2.5" />
                                  <span>Locked</span>
                                </span>
                              ) : (
                                <button
                                  onClick={() => onRateMeal(meal)}
                                  className="px-2 py-0.5 rounded bg-forest-700 hover:bg-forest-800 text-ivory font-bold transition-colors cursor-pointer"
                                >
                                  Rate
                                </button>
                              )}

                              <button
                                onClick={() => onRequestAlternative(meal)}
                                className="text-charcoal-500 hover:text-forest-700 hover:underline cursor-pointer"
                                title="Alternative Request"
                              >
                                Alt
                              </button>
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
        </div>
      )}

      {/* VIEW MODE 2: DAY-BY-DAY TIMETABLE VIEW */}
      {viewMode === "daily" && (
        <div className="space-y-4">
          {/* Day Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = selectedDay === day;
              const isToday = day === todayDayName;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-forest-700 text-ivory border-forest-800 font-bold shadow-2xs"
                      : isToday
                      ? "bg-forest-50 text-forest-800 border-forest-300"
                      : "bg-white text-charcoal-700 border-ivory-300 hover:bg-ivory-100"
                  }`}
                >
                  <div>{day}</div>
                  {isToday && <div className="text-[9px] uppercase font-mono mt-0.5">Today</div>}
                </button>
              );
            })}
          </div>

          {/* Daily Table for Selected Day */}
          <div className="bg-white rounded-xl border border-ivory-300 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-ivory-200 flex items-center justify-between">
              <h3 className="font-bold font-display text-sm uppercase tracking-wider text-charcoal-800">
                {selectedDay} Mess Timetable
              </h3>
              <span className="text-xs font-mono text-charcoal-400">4 Serving Slots</span>
            </div>

            <div className="divide-y divide-ivory-200">
              {menu
                .filter((m) => m.day === selectedDay)
                .map((meal) => {
                  const availability = getMealAvailability(meal, new Date());
                  const isRated = ratedMealIds.has(meal.id);
                  const isFuture = isMealInFuture(meal, new Date());

                  return (
                    <div key={meal.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-ivory-50/50">
                      <div className="flex items-center gap-3">
                        <img
                          src={meal.imageUrl}
                          alt={meal.name}
                          className="w-12 h-12 rounded-md object-cover border border-ivory-300 shrink-0"
                          loading="lazy"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-ivory-200 text-charcoal-700">
                              {meal.mealType}
                            </span>
                            <span className="text-xs font-mono text-charcoal-500">{meal.timing}</span>
                          </div>
                          <h4 className="font-bold text-sm text-charcoal-800 mt-1">{meal.name}</h4>
                          <p className="text-xs text-charcoal-500 mt-0.5 line-clamp-1">{meal.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 sm:self-center">
                        <div className="text-right font-mono text-xs">
                          <div className="flex items-center justify-end gap-1 font-bold text-charcoal-800">
                            <Star className="w-3.5 h-3.5 fill-mustard text-mustard" />
                            <span>{formatRatingDisplay(meal.avgRating, meal.ratingCount)}</span>
                          </div>
                          <span className="text-[10px] text-charcoal-400">{availability.badgeText}</span>
                        </div>

                        {isRated ? (
                          <span className="px-3 py-1 rounded bg-forest-50 border border-forest-200 text-forest-800 text-xs font-bold">
                            Rated
                          </span>
                        ) : isFuture && !demoBypass ? (
                          <span
                            className="text-xs text-charcoal-400 italic"
                            title="Rating will open when this meal is available."
                          >
                            Locked
                          </span>
                        ) : (
                          <button
                            onClick={() => onRateMeal(meal)}
                            className="px-3 py-1.5 rounded bg-forest-700 hover:bg-forest-800 text-ivory text-xs font-bold cursor-pointer"
                          >
                            Rate
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
