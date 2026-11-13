import React, { useState } from "react";
import {
  Star,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Sparkles,
  AlertTriangle,
  Award,
  ChevronDown,
  BarChart2,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { RatingCategoryBar } from "../common/Charts";
import { formatRatingDisplay } from "../../utils/ratingUtils";

export function RatingAnalytics({ menu = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating-desc");

  const categories = ["All", "South Indian", "Thali Meals", "Snacks", "Dinner Special", "Special"];
  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Filter menu items
  const filtered = menu.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesDay = selectedDay === "All" || item.day === selectedDay;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDay && matchesQuery;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating-desc") return (b.avgRating || 0) - (a.avgRating || 0);
    if (sortBy === "rating-asc") return (a.avgRating || 0) - (b.avgRating || 0);
    if (sortBy === "reviews-desc") return (b.ratingCount || 0) - (a.ratingCount || 0);
    return 0;
  });

  // Top 5 Best-Rated Dishes (across full menu with valid ratings)
  const top5Best = [...menu]
    .filter((m) => (m.ratingCount || 0) > 0)
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
    .slice(0, 5);

  // Top 5 Lowest-Rated Dishes (Dishes Needing Improvement)
  const top5Lowest = [...menu]
    .filter((m) => (m.ratingCount || 0) > 0)
    .sort((a, b) => (a.avgRating || 0) - (b.avgRating || 0))
    .slice(0, 5);

  // Most Popular Dishes (by number of ratings)
  const mostPopular = [...menu]
    .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
    .slice(0, 5);

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900 tracking-tight">
            South Indian Dish Rating Analytics
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Evaluate individual dishes via 2-choice student ratings (👍 Good / 👎 Needs Improvement) with full vote count transparency
          </p>
        </div>
      </div>

      {/* Top 3 Insight Highlights Cards (RULE 2: MUST ALWAYS SHOW COUNT BESIDE AVERAGE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Top Rated Dish */}
        <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-leaf-100 text-leaf-800 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500">
              #1 Ranked Dish
            </span>
            <div className="text-sm font-bold font-display text-charcoal-900 line-clamp-1 mt-0.5">
              {top5Best[0]?.name}
            </div>
            <div className="text-xs font-bold text-leaf-800 mt-0.5">
              {formatRatingDisplay(top5Best[0]?.avgRating, top5Best[0]?.ratingCount)}
            </div>
          </div>
        </div>

        {/* Card 2: Dish Needing Improvement */}
        <div className="bg-white p-5 rounded-3xl border border-terracotta-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-700">
              Needs Attention
            </span>
            <div className="text-sm font-bold font-display text-charcoal-900 line-clamp-1 mt-0.5">
              {top5Lowest[0]?.name}
            </div>
            <div className="text-xs font-bold text-terracotta-800 mt-0.5">
              {formatRatingDisplay(top5Lowest[0]?.avgRating, top5Lowest[0]?.ratingCount)}
            </div>
          </div>
        </div>

        {/* Card 3: Most Popular Dish */}
        <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-turmeric-100 text-turmeric-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500">
              Highest Student Turnout
            </span>
            <div className="text-sm font-bold font-display text-charcoal-900 line-clamp-1 mt-0.5">
              {mostPopular[0]?.name}
            </div>
            <div className="text-xs font-bold text-charcoal-800 mt-0.5">
              {formatRatingDisplay(mostPopular[0]?.avgRating, mostPopular[0]?.ratingCount)}
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Best vs Lowest Rated Comparison Cards (RULE 2: Always displays count) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 5 Best Rated */}
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200 mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-leaf-700" />
              <h3 className="text-sm font-bold font-display text-charcoal-900">
                Top 5 Best-Rated Dishes
              </h3>
            </div>
            <span className="text-[10px] font-bold text-leaf-800 bg-leaf-100 px-2 py-0.5 rounded-full border border-leaf-200">
              Hall of Fame
            </span>
          </div>

          <div className="space-y-3">
            {top5Best.map((dish, i) => (
              <div key={dish.id} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2.5 truncate pr-2">
                  <span className="w-5 h-5 rounded-full bg-leaf-100 text-leaf-800 flex items-center justify-center font-bold text-[10px] shrink-0 border border-leaf-200">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-charcoal-800 truncate">{dish.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-leaf-800 bg-cream-100 px-2 py-0.5 rounded-md border border-cream-200">
                    {formatRatingDisplay(dish.avgRating, dish.ratingCount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Lowest Rated */}
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-terracotta-700" />
              <h3 className="text-sm font-bold font-display text-charcoal-900">
                Top 5 Dishes Needing Improvement
              </h3>
            </div>
            <span className="text-[10px] font-bold text-terracotta-800 bg-terracotta-100 px-2 py-0.5 rounded-full border border-terracotta-200">
              Attention Required
            </span>
          </div>

          <div className="space-y-3">
            {top5Lowest.map((dish, i) => (
              <div key={dish.id} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2.5 truncate pr-2">
                  <span className="w-5 h-5 rounded-full bg-terracotta-100 text-terracotta-800 flex items-center justify-center font-bold text-[10px] shrink-0 border border-terracotta-200">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-charcoal-800 truncate">{dish.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-terracotta-700 bg-terracotta-50 px-2 py-0.5 rounded-md border border-terracotta-200">
                    {formatRatingDisplay(dish.avgRating, dish.ratingCount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Dish Breakdown Table with Filters */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-5">
        {/* Filters Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-cream-200">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search dish by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-8 pr-3 py-2 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-600 w-48 text-charcoal-800"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs p-2 rounded-xl border border-cream-300 bg-cream-50 font-medium text-charcoal-700 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>

            {/* Day Filter */}
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="text-xs p-2 rounded-xl border border-cream-300 bg-cream-50 font-medium text-charcoal-700 cursor-pointer"
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All Days" : d}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-charcoal-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs p-2 rounded-xl border border-cream-300 bg-cream-50 font-semibold text-charcoal-800 cursor-pointer"
            >
              <option value="rating-desc">Highest Rated First</option>
              <option value="rating-asc">Lowest Rated First</option>
              <option value="reviews-desc">Most Reviews</option>
            </select>
          </div>
        </div>

        {/* Dishes Sensory Breakdown Grid (RULE 2: MUST ALWAYS SHOW COUNT BESIDE AVERAGE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((item) => {
            const ratingText = formatRatingDisplay(item.avgRating, item.ratingCount);
            const goodCount = item.goodVotes || 0;
            const badCount = item.badVotes || 0;

            return (
              <div
                key={item.id}
                className="bg-cream-50/70 p-4.5 rounded-2xl border border-cream-200 flex flex-col justify-between hover:border-leaf-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold uppercase text-[10px] text-charcoal-500">
                      {item.day} • {item.mealType}
                    </span>
                    <span className="font-bold text-leaf-800 bg-white px-2.5 py-0.5 rounded-md border border-cream-200 shadow-2xs">
                      {ratingText}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold font-display text-charcoal-900 line-clamp-1 mb-3">
                    {item.name}
                  </h4>

                  {/* 2-Choice Voting Breakdown */}
                  <div className="mb-3 p-2.5 bg-white rounded-xl border border-cream-200 flex items-center justify-around text-xs">
                    <div className="flex items-center gap-1.5 text-leaf-800 font-bold">
                      <ThumbsUp className="w-3.5 h-3.5 text-leaf-700" />
                      <span>{goodCount} Good</span>
                    </div>
                    <div className="w-px h-4 bg-cream-200" />
                    <div className="flex items-center gap-1.5 text-terracotta-700 font-bold">
                      <ThumbsDown className="w-3.5 h-3.5 text-terracotta-600" />
                      <span>{badCount} Needs Imp.</span>
                    </div>
                  </div>

                  {/* Sensory Criteria Bars */}
                  <div className="space-y-1">
                    <RatingCategoryBar
                      label="Taste & Spices"
                      value={item.breakdown?.taste || item.avgRating}
                      color="bg-leaf-700"
                    />
                    <RatingCategoryBar
                      label="Ingredient Freshness"
                      value={item.breakdown?.quality || item.avgRating}
                      color="bg-turmeric-500"
                    />
                    <RatingCategoryBar
                      label="Serving Portion"
                      value={item.breakdown?.quantity || item.avgRating}
                      color="bg-charcoal-700"
                    />
                    <RatingCategoryBar
                      label="Serving Temperature"
                      value={item.breakdown?.temperature || item.avgRating}
                      color="bg-terracotta-600"
                    />
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-cream-200 flex items-center justify-between text-[11px] text-charcoal-500">
                  <span className="font-medium">{item.ratingCount} student evaluations</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-cream-200 font-semibold text-leaf-800">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
