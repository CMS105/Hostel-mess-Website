// Two-Choice Rating System & Calculations for MESSMATE
// Option 1: GOOD (+5 pts)
// Option 2: NEEDS IMPROVEMENT (+1 pt)

/**
 * Formats average rating and total count according to hackathon rules:
 * - 0 votes: "Not rated yet | 0 ratings"
 * - 1 vote:  "5.0 / 5 | 1 rating"
 * - N votes: "4.2 / 5 | 25 ratings"
 * 
 * @param {number|string} avgRating
 * @param {number|string} count
 * @returns {string}
 */
export function formatRatingDisplay(avgRating, count) {
  const numCount = Number(count);

  if (isNaN(numCount) || numCount <= 0) {
    return "Not rated yet | 0 ratings";
  }

  const numAvg = Number(avgRating);
  const safeAvg = isNaN(numAvg) ? 0 : numAvg;
  const countLabel = numCount === 1 ? "1 rating" : `${numCount} ratings`;

  return `${safeAvg.toFixed(1)} / 5 | ${countLabel}`;
}

/**
 * Compact format for tight badges
 */
export function formatRatingCompact(avgRating, count) {
  const numCount = Number(count);

  if (isNaN(numCount) || numCount <= 0) {
    return "Not rated | 0";
  }

  const numAvg = Number(avgRating);
  const safeAvg = isNaN(numAvg) ? 0 : numAvg;
  const countLabel = numCount === 1 ? "1 vote" : `${numCount} votes`;

  return `${safeAvg.toFixed(1)} / 5 (${countLabel})`;
}

/**
 * Calculates updated dish score after receiving a binary vote.
 * - 'good' => 5 points
 * - 'needs_improvement' => 1 point
 * 
 * @param {Object} meal
 * @param {'good' | 'needs_improvement'} choice
 * @returns {{
 *   newAvg: number,
 *   newCount: number,
 *   newGoodVotes: number,
 *   newBadVotes: number,
 *   satisfactionPct: number
 * }}
 */
export function calculateBinaryVote(meal, choice) {
  const pointValue = choice === "good" ? 5 : 1;
  const currentCount = Math.max(0, Number(meal.ratingCount) || 0);
  const currentAvg = Number(meal.avgRating) || 0;
  const currentGood = Number(meal.goodVotes) || (currentCount > 0 ? Math.round((currentAvg / 5) * currentCount) : 0);
  const currentBad = Number(meal.badVotes) || (currentCount - currentGood);

  const newCount = currentCount + 1;
  const newGoodVotes = choice === "good" ? currentGood + 1 : currentGood;
  const newBadVotes = choice === "needs_improvement" ? currentBad + 1 : currentBad;

  const totalPoints = (currentAvg * currentCount) + pointValue;
  const newAvg = Number((totalPoints / newCount).toFixed(1));
  const satisfactionPct = Math.round((newGoodVotes / newCount) * 100);

  return {
    newAvg,
    newCount,
    newGoodVotes,
    newBadVotes,
    satisfactionPct
  };
}

export function isValidRating(val) {
  const n = Number(val);
  return !isNaN(n) && n >= 1 && n <= 5;
}
