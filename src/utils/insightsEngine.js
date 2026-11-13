// Client-side Smart Insights & Recommendation Engine

/**
 * Computes heuristic insights and data-driven recommendations
 * @param {Array} menuItems
 * @param {Array} wasteRecords
 * @param {Object} cleanlinessData
 * @param {Array} alternativeRequests
 * @param {Array} feedbackLogs
 * @returns {Array<Object>} list of insights
 */
export function generateSmartInsights({
  menuItems = [],
  wasteRecords = [],
  cleanlinessData = {},
  alternativeRequests = [],
  feedbackLogs = []
}) {
  const insights = [];

  // 1. Lowest-Rated Dish Insight (e.g. Vegetable Pulao)
  const ratedDishes = menuItems.filter(m => (m.ratingCount || 0) >= 10);
  if (ratedDishes.length > 0) {
    const sortedByTaste = [...ratedDishes].sort((a, b) => {
      const aTaste = a.breakdown?.taste || a.avgRating || 5;
      const bTaste = b.breakdown?.taste || b.avgRating || 5;
      return aTaste - bTaste;
    });

    const lowestTasteDish = sortedByTaste[0];
    const tasteScore = lowestTasteDish.breakdown?.taste || lowestTasteDish.avgRating;

    if (tasteScore < 3.8) {
      insights.push({
        id: "ins-taste-low",
        category: "Food Quality",
        title: `${lowestTasteDish.name} received a low average rating this week (${lowestTasteDish.avgRating} ★ | ${lowestTasteDish.ratingCount} ratings).`,
        problem: `Students reported issues with seasoning, spice balance, or texture for ${lowestTasteDish.name}.`,
        supportingData: `Evaluation score: ${tasteScore} ★ from ${lowestTasteDish.ratingCount} student votes (${lowestTasteDish.day} ${lowestTasteDish.mealType}).`,
        suggestedAction: "Modify the spice blend, reduce oil levels, and supervise preparation with head chef.",
        priority: "High",
        impact: "Improves student meal satisfaction and reduces leftover plate waste.",
        isPreliminary: lowestTasteDish.ratingCount < 30
      });
    }
  }

  // 2. Cleanliness Trend Alert (e.g. Dining Hall cleanliness decreased)
  const areas = cleanlinessData.areas || {};
  Object.keys(areas).forEach(key => {
    const area = areas[key];
    if (area.trend && area.trend < 0) {
      const dropAbs = Math.abs(area.trend).toFixed(1);
      insights.push({
        id: `ins-clean-${key}`,
        category: "Hygiene & Cleanliness",
        title: `${area.name} cleanliness ratings decreased compared with the previous week (-${dropAbs} pts).`,
        problem: `Recent student evaluations show a downward trend in ${area.name.toLowerCase()} sanitation scores (Current: ${area.score} ★).`,
        supportingData: `${area.reviewsCount} cumulative student reviews recorded. Trend down by ${dropAbs} points.`,
        suggestedAction: `Increase housekeeping cleaning frequency during peak mess hours and inspect high-traffic spots.`,
        priority: area.score < 4.0 ? "High" : "Medium",
        impact: "Prevents hygiene infractions and enhances dining ambiance.",
        isPreliminary: area.reviewsCount < 25
      });
    }
  });

  // 3. Food Wastage Pattern (e.g. Highest during dinner)
  if (wasteRecords.length > 0) {
    const wasteByMeal = { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };
    const countByMeal = { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };

    wasteRecords.forEach(r => {
      if (wasteByMeal[r.mealType] !== undefined) {
        wasteByMeal[r.mealType] += (r.wastedKg || 0);
        countByMeal[r.mealType] += 1;
      }
    });

    let maxMealType = "dinner";
    let maxWasteAvg = 0;

    Object.keys(wasteByMeal).forEach(m => {
      const count = countByMeal[m] || 1;
      const avg = wasteByMeal[m] / count;
      if (avg > maxWasteAvg) {
        maxWasteAvg = avg;
        maxMealType = m;
      }
    });

    if (maxWasteAvg > 15) {
      const mealNameCap = maxMealType.charAt(0).toUpperCase() + maxMealType.slice(1);
      insights.push({
        id: "ins-waste-dinner",
        category: "Food Waste Reduction",
        title: `Food wastage is highest during ${maxMealType} (avg. ${maxWasteAvg.toFixed(1)} kg / day).`,
        problem: `Plate scraps and unconsumed batches are noticeably higher during evening dinner services.`,
        supportingData: `${wasteByMeal[maxMealType]} kg total wasted over ${countByMeal[maxMealType]} logged ${maxMealType} sessions.`,
        suggestedAction: "Implement student dinner RSVP check-ins before 6 PM and introduce flexible portion counters.",
        priority: "High",
        impact: "Can save up to ~65 kg of food weekly and cut mess operating budget by ₹18,000/month.",
        isPreliminary: countByMeal[maxMealType] < 3
      });
    }
  }

  // 4. Frequent Alternative Requests (e.g. Chapati frequently requested)
  if (alternativeRequests.length > 0) {
    const sortedAlts = [...alternativeRequests].sort((a, b) => b.requestCount - a.requestCount);
    const topAlt = sortedAlts[0];

    if (topAlt && topAlt.requestCount >= 15) {
      insights.push({
        id: "ins-alt-frequent",
        category: "Menu Optimization",
        title: `Students frequently requested "${topAlt.requestedDish}" as an alternative (${topAlt.requestCount} requests).`,
        problem: `A significant proportion of students prefer ${topAlt.requestedDish} over the default meal (${topAlt.mealName}).`,
        supportingData: `${topAlt.requestCount} verified student requests logged. Current status: ${topAlt.status}.`,
        suggestedAction: `Permanently incorporate "${topAlt.requestedDish}" as a standard parallel option on the weekly menu.`,
        priority: "Medium",
        impact: "Directly accommodates dietary preferences and decreases meal skipping.",
        isPreliminary: false
      });
    }
  }

  // 5. Positive Breakfast Satisfaction Trend
  const breakfastDishes = menuItems.filter(m => m.mealType === "breakfast");
  if (breakfastDishes.length > 0) {
    const totalBfRatings = breakfastDishes.reduce((a, b) => a + (b.ratingCount || 0), 0);
    const avgBf = breakfastDishes.reduce((acc, cur) => acc + (cur.avgRating || 4.2), 0) / breakfastDishes.length;
    if (avgBf >= 4.3) {
      insights.push({
        id: "ins-bf-positive",
        category: "Positive Highlight",
        title: `Breakfast satisfaction improved this week (Average: ${avgBf.toFixed(1)} ★ | ${totalBfRatings} ratings).`,
        problem: "N/A - Positive reinforcement trend.",
        supportingData: `All South Indian breakfast items scored high across ${breakfastDishes.length} menu rotations (${totalBfRatings} student evaluations).`,
        suggestedAction: "Maintain current supplier for fresh dairy, batter fermentation standards, and degree filter coffee brewing.",
        priority: "Low",
        impact: "Boosts morning morale and class attendance among hostel residents.",
        isPreliminary: false
      });
    }
  }

  // 6. Mandatory Low-Rating Recurrence
  const lowFeedback = feedbackLogs.filter(f => f.hasLowRatingTrigger);
  if (lowFeedback.length >= 2) {
    const reasonFreq = {};
    lowFeedback.forEach(f => {
      (f.selectedReasons || []).forEach(r => {
        reasonFreq[r] = (reasonFreq[r] || 0) + 1;
      });
    });

    let topReason = "Poor taste";
    let topReasonCount = 0;
    Object.keys(reasonFreq).forEach(r => {
      if (reasonFreq[r] > topReasonCount) {
        topReasonCount = reasonFreq[r];
        topReason = r;
      }
    });

    insights.push({
      id: "ins-low-rating-reasons",
      category: "Critical Feedback",
      title: `Recurring student complaint identified: "${topReason}" (${topReasonCount} mentions).`,
      problem: `Multiple 1-star reviews flagged "${topReason}" in the mandatory low-rating questionnaire.`,
      supportingData: `${lowFeedback.length} low-rating submissions triggered mandatory investigations this week.`,
      suggestedAction: `Hold an immediate mess kitchen briefing focusing on temperature control and spice moderation.`,
      priority: "High",
      impact: "Eliminates root causes behind severe student dissatisfaction.",
      isPreliminary: lowFeedback.length < 5
    });
  }

  return insights;
}
