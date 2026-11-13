import React from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  TrendingUp,
  Award,
  AlertCircle,
  Megaphone,
  UtensilsCrossed,
  ShieldCheck,
  Star
} from "lucide-react";
import { getMealAvailability, isMealInFuture } from "../../utils/mealTiming";
import { formatRatingDisplay } from "../../utils/ratingUtils";
import { getTranslation } from "../../utils/i18n";

export function StudentDashboard({
  menu = [],
  announcements = [],
  studentProfile,
  studentRatings = [],
  onRateMeal,
  onRequestAlternative,
  onNavigateTab,
  demoBypass = false,
  selectedLang = "en"
}) {
  const todayDateObj = new Date();
  const todayDayName = todayDateObj.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = todayDateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // Filter 4 meals for today (fallback to Friday if current day has no matching entries)
  const todayMeals = menu.filter((m) => m.day === todayDayName);
  const activeMeals = todayMeals.length === 4 ? todayMeals : menu.filter((m) => m.day === "Friday");

  // Metrics
  const ratedMealIds = new Set(studentRatings.map((r) => r.mealId));
  const mealsRatedTodayCount = activeMeals.filter((m) => ratedMealIds.has(m.id)).length;
  const mealsAvailableTodayCount = activeMeals.length;

  const totalRatingsCount = menu.reduce((acc, m) => acc + (m.ratingCount || 0), 0);
  const totalAvg =
    menu.reduce((acc, m) => acc + (m.avgRating || 4.2), 0) / (menu.length || 1);
  const satisfactionScore = Number(totalAvg.toFixed(1));

  const studentName = studentProfile?.name?.split(" ")[0] || "Rahul";

  return (
    <div className="space-y-6 animate-fade-in text-charcoal-800">
      {/* Editorial Header Section */}
      <div className="bg-white rounded-xl p-6 border border-ivory-300 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-charcoal-400 font-semibold mb-1">
              Hostel Dining Administration • {formattedDate}
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-forest-700 tracking-tight">
              Good morning, {studentName}.
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Here is your hostel mess overview for today.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-charcoal-500 font-mono">
              Hostel Block B • Room {studentProfile?.room || "B-204"}
            </span>
          </div>
        </div>

        {/* 4 Compact Information Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-ivory-200">
          {/* Metric 1: Meals Available Today */}
          <div className="p-3.5 rounded-lg bg-ivory-50 border border-ivory-200">
            <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
              Meals Available Today
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-charcoal-800">
                {mealsAvailableTodayCount}
              </span>
              <span className="text-xs text-charcoal-400 font-medium">meal slots</span>
            </div>
            <div className="text-[11px] text-forest-700 font-medium mt-1">
              Breakfast, Lunch, Snacks, Dinner
            </div>
          </div>

          {/* Metric 2: Meals Rated Today */}
          <div className="p-3.5 rounded-lg bg-ivory-50 border border-ivory-200">
            <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
              Meals Rated
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-charcoal-800">
                {mealsRatedTodayCount} <span className="text-sm text-charcoal-400">/ {mealsAvailableTodayCount}</span>
              </span>
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              {mealsRatedTodayCount === mealsAvailableTodayCount
                ? "All active meals evaluated"
                : `${mealsAvailableTodayCount - mealsRatedTodayCount} pending evaluation`}
            </div>
          </div>

          {/* Metric 3: Participation Points */}
          <div className="p-3.5 rounded-lg bg-ivory-50 border border-ivory-200">
            <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
              Your Participation Points
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-forest-700">
                {studentProfile?.totalPoints || 420}
              </span>
              <span className="text-xs text-charcoal-400 font-medium">pts</span>
            </div>
            <div className="text-[11px] text-mustard-700 font-semibold mt-1">
              {studentProfile?.engagementLevel || "Gold Messmate"}
            </div>
          </div>

          {/* Metric 4: Current Weekly Satisfaction */}
          <div className="p-3.5 rounded-lg bg-ivory-50 border border-ivory-200">
            <span className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider block">
              Current Weekly Satisfaction
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-charcoal-800">
                {satisfactionScore} <span className="text-sm text-charcoal-400">/ 5.0</span>
              </span>
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1 font-mono">
              Based on {totalRatingsCount} verified student votes
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S MESS SCHEDULE (Structured Institutional Timetable) */}
      <div className="bg-white rounded-xl border border-ivory-300 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm sm:text-base font-bold font-display uppercase tracking-wider text-charcoal-800">
              Today's Mess Schedule
            </h2>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Structured operational schedule and food feedback register for {todayDayName}.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-charcoal-400">
            <span>RULE 1: Future slots lock rating until serving</span>
          </div>
        </div>

        {/* Timetable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-ivory-100/70 border-b border-ivory-200 text-charcoal-500 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 w-32">Time</th>
                <th className="py-3 px-4 w-28">Meal</th>
                <th className="py-3 px-4 min-w-[240px]">Menu</th>
                <th className="py-3 px-4 w-40">Satisfaction</th>
                <th className="py-3 px-4 w-28 text-center">Status</th>
                <th className="py-3 px-4 w-44 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200 font-sans">
              {activeMeals.map((meal) => {
                const availability = getMealAvailability(meal, new Date());
                const isRated = ratedMealIds.has(meal.id);
                const existingRating = studentRatings.find((r) => r.mealId === meal.id);
                const isFuture = isMealInFuture(meal, new Date());

                return (
                  <tr key={meal.id} className="hover:bg-ivory-50/70 transition-colors">
                    {/* Time */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-charcoal-600 align-middle">
                      {meal.timing}
                    </td>

                    {/* Meal Slot */}
                    <td className="py-3.5 px-4 align-middle">
                      <span className="font-bold uppercase text-[11px] tracking-wider text-charcoal-800">
                        {meal.mealType}
                      </span>
                    </td>

                    {/* Menu Item & Thumbnail */}
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        {/* Compact thumbnail only (40px) */}
                        <img
                          src={meal.imageUrl}
                          alt={meal.name}
                          className="w-10 h-10 rounded-md object-cover border border-ivory-300 shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-charcoal-800 text-xs leading-snug truncate max-w-sm">
                            {meal.name}
                          </div>
                          <div className="text-[11px] text-charcoal-400 truncate max-w-sm mt-0.5">
                            {meal.description}
                          </div>
                          {meal.alternativeDishes && meal.alternativeDishes.length > 0 && (
                            <div className="text-[10px] text-forest-700 font-medium mt-0.5">
                              Alternative: {meal.alternativeDishes[0].name}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Satisfaction / Rating */}
                    <td className="py-3.5 px-4 align-middle font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 text-charcoal-800 font-bold">
                        <Star className="w-3.5 h-3.5 fill-mustard text-mustard shrink-0" />
                        <span>{formatRatingDisplay(meal.avgRating, meal.ratingCount)}</span>
                      </div>
                      {meal.goodVotes !== undefined && meal.badVotes !== undefined && (
                        <div className="text-[10px] text-charcoal-400 mt-0.5">
                          👍 {meal.goodVotes} / 👎 {meal.badVotes}
                        </div>
                      )}
                    </td>

                    {/* Subtle Status Indicator */}
                    <td className="py-3.5 px-4 align-middle text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${
                          availability.status === "SERVING_NOW"
                            ? "bg-mustard-100 text-mustard-900 border-mustard-300 font-bold"
                            : availability.status === "SERVED"
                            ? "bg-sage-100 text-forest-800 border-sage-300"
                            : "bg-ivory-200 text-charcoal-500 border-ivory-300"
                        }`}
                      >
                        {availability.badgeText}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 align-middle text-right">
                      {isRated ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest-50 border border-forest-200 text-forest-800 text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                          <span>Rated ({existingRating?.choice === "needs_improvement" ? "👎 Needs Imp." : "👍 Good"})</span>
                        </span>
                      ) : isFuture && !demoBypass ? (
                        <div
                          className="inline-flex items-center gap-1 text-[11px] text-charcoal-400 italic"
                          title="Rating will open when this meal is available."
                        >
                          <Lock className="w-3 h-3 text-charcoal-400" />
                          <span>Locked until serving</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onRateMeal(meal)}
                            className="px-2.5 py-1 rounded bg-forest-700 hover:bg-forest-800 text-ivory text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
                          >
                            Rate Food
                          </button>
                          {meal.alternativeDishes && (
                            <button
                              onClick={() => onRequestAlternative(meal)}
                              className="px-2 py-1 rounded bg-ivory-100 hover:bg-ivory-200 text-charcoal-700 border border-ivory-300 text-[10px] font-medium transition-colors cursor-pointer"
                              title="Request Alternative Dish"
                            >
                              Alt
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcements & Cleanliness Scorecard Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Notice Board */}
        <div className="bg-white rounded-xl p-5 border border-ivory-300 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-forest-700" />
              <h3 className="font-bold font-display text-sm uppercase tracking-wide text-charcoal-800">
                Official Mess Announcements
              </h3>
            </div>
            <span className="text-[10px] font-mono text-charcoal-400">Admin Broadcasts</span>
          </div>

          <div className="space-y-2.5">
            {announcements.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-ivory-50 border border-ivory-200 text-xs">
                <div className="flex items-center justify-between font-bold text-charcoal-800">
                  <span>{item.title}</span>
                  <span className="text-[10px] font-mono text-charcoal-400">{item.date}</span>
                </div>
                <p className="text-charcoal-600 mt-1 leading-relaxed text-[11px]">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Civic Navigation Cards */}
        <div className="bg-white rounded-xl p-5 border border-ivory-300 shadow-2xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <h3 className="font-bold font-display text-sm uppercase tracking-wide text-charcoal-800">
                  Campus Dining Governance
                </h3>
              </div>
              <span className="text-[10px] font-mono text-charcoal-400">Direct Actions</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-3">
              <button
                onClick={() => onNavigateTab("menu")}
                className="p-3 rounded-lg bg-ivory-50 hover:bg-ivory-100 border border-ivory-200 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-xs text-charcoal-800">7-Day Timetable</div>
                <p className="text-[10px] text-charcoal-500 mt-0.5">Explore full weekly South Indian menu</p>
              </button>

              <button
                onClick={() => onNavigateTab("cleanliness")}
                className="p-3 rounded-lg bg-ivory-50 hover:bg-ivory-100 border border-ivory-200 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-xs text-charcoal-800">Hygiene Audits</div>
                <p className="text-[10px] text-charcoal-500 mt-0.5">Audit 5 mess zones (+40 pts)</p>
              </button>

              <button
                onClick={() => onNavigateTab("alternatives")}
                className="p-3 rounded-lg bg-ivory-50 hover:bg-ivory-100 border border-ivory-200 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-xs text-charcoal-800">Alternative Food Hub</div>
                <p className="text-[10px] text-charcoal-500 mt-0.5">Vote for backup dishes</p>
              </button>

              <button
                onClick={() => onNavigateTab("eco")}
                className="p-3 rounded-lg bg-ivory-50 hover:bg-ivory-100 border border-ivory-200 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-xs text-charcoal-800">Eco Champion</div>
                <p className="text-[10px] text-charcoal-500 mt-0.5">Weekly sustainability leaderboard</p>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-ivory-200 text-[11px] text-charcoal-500 flex items-center justify-between">
            <span>Mess Committee Contact: hostel-mess@campus.edu</span>
            <span className="font-mono text-forest-700 font-bold">Kaveri Hall</span>
          </div>
        </div>
      </div>
    </div>
  );
}
