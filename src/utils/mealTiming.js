// Strict Meal Timing & Future Meal Restriction Engine for MESSMATE
// Enforces mandatory rule: Students must NEVER be allowed to submit a rating for a future meal.

export const DAY_MAP = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const MEAL_HOURS = {
  breakfast: { startHour: 7, startMinute: 30, endHour: 9, endMinute: 30, display: "07:30 AM - 09:30 AM" },
  lunch: { startHour: 12, startMinute: 30, endHour: 14, endMinute: 30, display: "12:30 PM - 02:30 PM" },
  snacks: { startHour: 17, startMinute: 0, endHour: 18, endMinute: 30, display: "05:00 PM - 06:30 PM" },
  dinner: { startHour: 19, startMinute: 30, endHour: 21, endMinute: 30, display: "07:30 PM - 09:30 PM" },
};

/**
 * Returns a mapping of { Monday: 'YYYY-MM-DD', ..., Sunday: 'YYYY-MM-DD' }
 * based on the browser's current local date and time.
 * Handles month/year boundaries correctly.
 * 
 * @param {Date} [referenceDate]
 * @returns {Record<string, string>}
 */
export function getWeekDates(referenceDate = new Date()) {
  const ref = new Date(referenceDate);
  const currentDay = ref.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday

  // Calculate Monday of current week
  // If currentDay is Sunday (0), Monday was 6 days ago (-6)
  // If currentDay is Monday (1), Monday is today (0)
  // Otherwise 1 - currentDay
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate() + mondayOffset);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dateMap = {};

  days.forEach((dayName, idx) => {
    const dayDate = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + idx);
    const yyyy = dayDate.getFullYear();
    const mm = String(dayDate.getMonth() + 1).padStart(2, "0");
    const dd = String(dayDate.getDate()).padStart(2, "0");
    dateMap[dayName] = `${yyyy}-${mm}-${dd}`;
  });

  return dateMap;
}

/**
 * Parses a timing string like "07:30 AM - 09:30 AM" or "12:30 PM - 02:30 PM"
 * into numerical start and end hours/minutes.
 * 
 * @param {string} timingStr
 * @param {string} mealType
 * @returns {{ startHour: number, startMinute: number, endHour: number, endMinute: number }}
 */
export function parseServingTime(timingStr, mealType = "lunch") {
  const fallback = MEAL_HOURS[mealType] || MEAL_HOURS.lunch;

  if (!timingStr || typeof timingStr !== "string") {
    return fallback;
  }

  try {
    // Expected format: "HH:MM AM - HH:MM PM"
    const parts = timingStr.split("-").map((s) => s.trim());
    if (parts.length < 2) return fallback;

    const parseTimePart = (part) => {
      const match = part.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (!match) return null;
      let hour = parseInt(match[1], 10);
      const minute = parseInt(match[2], 10);
      const meridiem = (match[3] || "").toUpperCase();

      if (meridiem === "PM" && hour < 12) hour += 12;
      if (meridiem === "AM" && hour === 12) hour = 0;

      return { hour, minute };
    };

    const start = parseTimePart(parts[0]);
    const end = parseTimePart(parts[1]);

    if (!start || !end) return fallback;

    return {
      startHour: start.hour,
      startMinute: start.minute,
      endHour: end.hour,
      endMinute: end.minute
    };
  } catch (e) {
    return fallback;
  }
}

/**
 * Returns the exact Date objects for meal start and meal end.
 * Uses meal.date (YYYY-MM-DD) if available; otherwise computes date for meal.day in current week.
 * 
 * @param {Object} meal
 * @param {Date} [referenceDate]
 * @returns {{ mealStart: Date, mealEnd: Date, mealDateStr: string }}
 */
export function getMealScheduleDates(meal, referenceDate = new Date()) {
  const weekDates = getWeekDates(referenceDate);
  const mealDateStr = meal.date || weekDates[meal.day] || new Date().toISOString().split("T")[0];

  const timeInfo = parseServingTime(meal.timing, meal.mealType);

  const [yearStr, monthStr, dayStr] = mealDateStr.split("-");
  const year = parseInt(yearStr, 10);
  const monthIndex = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const mealStart = new Date(year, monthIndex, day, timeInfo.startHour, timeInfo.startMinute, 0, 0);
  const mealEnd = new Date(year, monthIndex, day, timeInfo.endHour, timeInfo.endMinute, 0, 0);

  return { mealStart, mealEnd, mealDateStr };
}

/**
 * STRICT RULE 1 CHECK:
 * Determines if a meal is strictly in the future compared to current local browser date & time.
 * A meal is considered FUTURE if current time is BEFORE its scheduled start serving time.
 * 
 * @param {Object} meal
 * @param {Date} [referenceDate] - current browser local time
 * @returns {boolean} true if meal is in the future
 */
export function isMealInFuture(meal, referenceDate = new Date()) {
  if (!meal) return true;
  const { mealStart } = getMealScheduleDates(meal, referenceDate);
  return referenceDate < mealStart;
}

/**
 * Validates meal availability for rating.
 * 
 * Rules:
 * - If referenceDate < mealStart: UPCOMING (Future) -> canRate = false, lockReason = "Rating will open when this meal is available."
 * - If referenceDate >= mealStart && referenceDate <= mealEnd: SERVING_NOW -> canRate = true
 * - If referenceDate > mealEnd: SERVED (Past) -> canRate = true
 * 
 * @param {Object} meal
 * @param {Date} [referenceDate] - defaults to browser's current local date & time
 * @returns {{
 *   status: 'SERVED' | 'SERVING_NOW' | 'UPCOMING',
 *   canRate: boolean,
 *   badgeText: string,
 *   lockReason: string | null,
 *   mealDateStr: string,
 *   mealStart: Date,
 *   mealEnd: Date
 * }}
 */
export function getMealAvailability(meal, referenceDate = new Date()) {
  const { mealStart, mealEnd, mealDateStr } = getMealScheduleDates(meal, referenceDate);

  if (referenceDate < mealStart) {
    // Scheduled serving time has not arrived yet
    return {
      status: "UPCOMING",
      canRate: false,
      badgeText: "Upcoming",
      lockReason: "Rating will open when this meal is available.",
      mealDateStr,
      mealStart,
      mealEnd
    };
  } else if (referenceDate >= mealStart && referenceDate <= mealEnd) {
    // Currently being served right now!
    return {
      status: "SERVING_NOW",
      canRate: true,
      badgeText: "Serving Now",
      lockReason: null,
      mealDateStr,
      mealStart,
      mealEnd
    };
  } else {
    // Scheduled serving time has passed
    return {
      status: "SERVED",
      canRate: true,
      badgeText: "Served",
      lockReason: null,
      mealDateStr,
      mealStart,
      mealEnd
    };
  }
}

/**
 * Formats date for display in calendar header or card.
 * @param {string} dayName
 * @param {Date} [referenceDate]
 */
export function getDateForDayName(dayName, referenceDate = new Date()) {
  const weekDates = getWeekDates(referenceDate);
  const dateStr = weekDates[dayName];
  if (!dateStr) return "";

  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);

  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
