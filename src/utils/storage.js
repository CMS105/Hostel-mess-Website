// LocalStorage Data Management Layer for MESSMATE

import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_WEEKLY_MENU,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CLEANLINESS_DATA,
  INITIAL_FOOD_WASTE_RECORDS,
  INITIAL_FEEDBACK_LOGS,
  INITIAL_ALTERNATIVE_REQUESTS,
  INITIAL_POINTS_HISTORY,
  INITIAL_STUDENT_RATINGS,
  INITIAL_ECO_LEADERBOARD,
} from "../data/mockData";
import { isMealInFuture, getWeekDates } from "./mealTiming";

const STORAGE_KEYS = {
  MENU: "messmate_weekly_menu",
  MENU_LAST_PUBLISHED: "messmate_menu_last_published",
  STUDENT_PROFILE: "messmate_student_profile",
  STUDENT_RATINGS: "messmate_student_ratings",
  FEEDBACK_LOGS: "messmate_feedback_logs",
  CLEANLINESS: "messmate_cleanliness_data",
  FOOD_WASTE: "messmate_food_waste_records",
  ALTERNATIVES: "messmate_alternative_requests",
  ANNOUNCEMENTS: "messmate_announcements",
  POINTS_HISTORY: "messmate_points_history",
  SETTINGS: "messmate_system_settings"
};

// Safe JSON parser with fallback
function getStoredItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

// Safe JSON writer
function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event so reactive components in same window can sync if needed
    window.dispatchEvent(new Event("messmate_storage_update"));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

/**
 * Initialize all storage collections if not already present
 */
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.MENU)) {
    setStoredItem(STORAGE_KEYS.MENU, INITIAL_WEEKLY_MENU);
    setStoredItem(STORAGE_KEYS.MENU_LAST_PUBLISHED, new Date().toISOString());
  }
  if (!localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE)) {
    setStoredItem(STORAGE_KEYS.STUDENT_PROFILE, INITIAL_STUDENT_PROFILE);
  }
  if (!localStorage.getItem(STORAGE_KEYS.STUDENT_RATINGS)) {
    setStoredItem(STORAGE_KEYS.STUDENT_RATINGS, INITIAL_STUDENT_RATINGS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK_LOGS)) {
    setStoredItem(STORAGE_KEYS.FEEDBACK_LOGS, INITIAL_FEEDBACK_LOGS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CLEANLINESS)) {
    setStoredItem(STORAGE_KEYS.CLEANLINESS, INITIAL_CLEANLINESS_DATA);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FOOD_WASTE)) {
    setStoredItem(STORAGE_KEYS.FOOD_WASTE, INITIAL_FOOD_WASTE_RECORDS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ALTERNATIVES)) {
    setStoredItem(STORAGE_KEYS.ALTERNATIVES, INITIAL_ALTERNATIVE_REQUESTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
    setStoredItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.POINTS_HISTORY)) {
    setStoredItem(STORAGE_KEYS.POINTS_HISTORY, INITIAL_POINTS_HISTORY);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    setStoredItem(STORAGE_KEYS.SETTINGS, {
      wasteWarningThreshold: 15, // percent
      demoModeBypassFuture: false
    });
  }
}

// Reset everything to pristine mock data
export function resetDemoData() {
  const weekDates = getWeekDates(new Date());
  const datedMenu = INITIAL_WEEKLY_MENU.map((m) => ({
    ...m,
    date: weekDates[m.day] || m.date
  }));
  setStoredItem(STORAGE_KEYS.MENU, datedMenu);
  setStoredItem(STORAGE_KEYS.MENU_LAST_PUBLISHED, new Date().toISOString());
  setStoredItem(STORAGE_KEYS.STUDENT_PROFILE, INITIAL_STUDENT_PROFILE);
  setStoredItem(STORAGE_KEYS.STUDENT_RATINGS, INITIAL_STUDENT_RATINGS);
  setStoredItem(STORAGE_KEYS.FEEDBACK_LOGS, INITIAL_FEEDBACK_LOGS);
  setStoredItem(STORAGE_KEYS.CLEANLINESS, INITIAL_CLEANLINESS_DATA);
  setStoredItem(STORAGE_KEYS.FOOD_WASTE, INITIAL_FOOD_WASTE_RECORDS);
  setStoredItem(STORAGE_KEYS.ALTERNATIVES, INITIAL_ALTERNATIVE_REQUESTS);
  setStoredItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  setStoredItem(STORAGE_KEYS.POINTS_HISTORY, INITIAL_POINTS_HISTORY);
  setStoredItem(STORAGE_KEYS.SETTINGS, {
    wasteWarningThreshold: 15,
    demoModeBypassFuture: false
  });
  window.dispatchEvent(new Event("messmate_data_reset"));
}

/* ================= WEEKLY MENU ================= */
export function getWeeklyMenu() {
  const menu = getStoredItem(STORAGE_KEYS.MENU, INITIAL_WEEKLY_MENU);
  const weekDates = getWeekDates(new Date());

  // Ensure every meal has its explicit scheduled date set for the active week
  let updated = false;
  const synchronized = menu.map((m) => {
    const expectedDate = weekDates[m.day];
    if (expectedDate && m.date !== expectedDate) {
      updated = true;
      return { ...m, date: expectedDate };
    }
    return m;
  });

  if (updated) {
    setStoredItem(STORAGE_KEYS.MENU, synchronized);
  }

  return synchronized;
}

export function saveWeeklyMenu(menu) {
  setStoredItem(STORAGE_KEYS.MENU, menu);
}

export function publishWeeklyMenu(menu) {
  setStoredItem(STORAGE_KEYS.MENU, menu);
  setStoredItem(STORAGE_KEYS.MENU_LAST_PUBLISHED, new Date().toISOString());
}

export function getMenuLastPublished() {
  return getStoredItem(STORAGE_KEYS.MENU_LAST_PUBLISHED, new Date().toISOString());
}

/* ================= RATINGS & STUDENT SESSION ================= */
export function getStudentRatings() {
  return getStoredItem(STORAGE_KEYS.STUDENT_RATINGS, INITIAL_STUDENT_RATINGS);
}

export function hasStudentRatedMeal(mealId) {
  const ratings = getStudentRatings();
  return ratings.some((r) => r.mealId === mealId);
}

/**
 * Submits a new meal rating using the simplified TWO-CHOICE SYSTEM:
 * - Option 1: GOOD (+5 points)
 * - Option 2: NEEDS IMPROVEMENT (+1 point)
 * 
 * STRICT VALIDATIONS ENFORCED:
 * 1. Duplicate rating prevention.
 * 2. Strict future meal rating restriction (never allows rating future meals).
 * 3. Exact mathematical average: total points / total valid votes.
 */
export function submitMealRating({
  mealId,
  choice = "good", // 'good' | 'needs_improvement'
  selectedReasons = [],
  studentFeedback = "",
  constructiveSuggestion = ""
}) {
  const menu = getWeeklyMenu();
  const mealIndex = menu.findIndex((m) => m.id === mealId);

  if (mealIndex === -1) {
    throw new Error("Meal not found in current weekly menu.");
  }

  const meal = { ...menu[mealIndex] };

  // VALIDATION 1: Duplicate rating attempt
  if (hasStudentRatedMeal(mealId)) {
    throw new Error("Duplicate rating attempt rejected. You have already rated this meal in this demo session.");
  }

  // VALIDATION 2: Strict Future Meal Rating Restriction
  if (isMealInFuture(meal, new Date())) {
    throw new Error("Rating will open when this meal is available. Future meals cannot be rated.");
  }

  // Two-choice mapping: GOOD = 5 points, NEEDS IMPROVEMENT = 1 point
  const normalizedChoice = choice === "needs_improvement" ? "needs_improvement" : "good";
  const pointValue = normalizedChoice === "good" ? 5 : 1;

  // Mathematical Calculation: Average rating = total points / total valid votes
  const currentCount = Math.max(0, Number(meal.ratingCount) || 0);
  const currentAvg = Number(meal.avgRating) || 0;
  const currentGood = Number(meal.goodVotes) || (currentCount > 0 ? Math.round((currentAvg / 5) * currentCount) : 0);
  const currentBad = Number(meal.badVotes) || (currentCount - currentGood);

  const newCount = currentCount + 1;
  const newGoodVotes = normalizedChoice === "good" ? currentGood + 1 : currentGood;
  const newBadVotes = normalizedChoice === "needs_improvement" ? currentBad + 1 : currentBad;

  const totalPoints = (currentAvg * currentCount) + pointValue;
  const newAvg = Number((totalPoints / newCount).toFixed(1));

  meal.ratingCount = newCount;
  meal.avgRating = newAvg;
  meal.goodVotes = newGoodVotes;
  meal.badVotes = newBadVotes;

  menu[mealIndex] = meal;
  saveWeeklyMenu(menu);

  // Save to Student's rated list to prevent duplicate rating
  const studentRatings = getStudentRatings();
  const nowStr = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  studentRatings.unshift({
    mealId,
    mealName: meal.name,
    ratedAt: nowStr,
    choice: normalizedChoice,
    score: pointValue
  });
  setStoredItem(STORAGE_KEYS.STUDENT_RATINGS, studentRatings);

  // Record anonymous feedback log (STRICT PRIVACY: Anonymous FB-XXX only)
  const feedbackLogs = getStoredItem(STORAGE_KEYS.FEEDBACK_LOGS, INITIAL_FEEDBACK_LOGS);
  const nextNum = feedbackLogs.length + 1;
  const anonymousId = `FB-${String(nextNum).padStart(3, "0")}`;

  const feedbackEntry = {
    id: anonymousId,
    mealId: meal.id,
    mealName: meal.name,
    choice: normalizedChoice,
    overallRating: pointValue,
    selectedReasons: normalizedChoice === "needs_improvement" ? selectedReasons : [],
    studentFeedback: studentFeedback.trim() || (normalizedChoice === "good" ? "Rated Good 👍" : "Needs Improvement 👎"),
    constructiveSuggestion: constructiveSuggestion.trim(),
    timestamp: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }),
    mealCategory: meal.category
  };

  feedbackLogs.unshift(feedbackEntry);
  setStoredItem(STORAGE_KEYS.FEEDBACK_LOGS, feedbackLogs);

  // Award participation points (NOT dependent on rating value!)
  let pointsToAward = 25; // Base participation points
  let activityNote = `Evaluated ${meal.name.slice(0, 22)} (${normalizedChoice === "good" ? "👍 Good" : "👎 Needs Improvement"})`;

  if (constructiveSuggestion.trim().length > 0 || (studentFeedback.trim().length > 0 && normalizedChoice === "needs_improvement")) {
    pointsToAward += 15; // Bonus for feedback explanation
    activityNote += " with notes";
  }

  awardStudentPoints(pointsToAward, "Meal Evaluation Submitted", activityNote);

  return { meal, feedbackId: anonymousId, pointsAwarded: pointsToAward };
}

/* ================= ANONYMOUS FEEDBACK LOGS ================= */
export function getFeedbackLogs() {
  return getStoredItem(STORAGE_KEYS.FEEDBACK_LOGS, INITIAL_FEEDBACK_LOGS);
}

/* ================= ALTERNATIVE FOOD REQUESTS ================= */
export function getAlternativeRequests() {
  return getStoredItem(STORAGE_KEYS.ALTERNATIVES, INITIAL_ALTERNATIVE_REQUESTS);
}

export function submitAlternativeRequest(mealId, requestedDishName) {
  const requests = getAlternativeRequests();
  const menu = getWeeklyMenu();
  const meal = menu.find((m) => m.id === mealId);
  const mealName = meal ? meal.name : "Scheduled Meal";

  // Check if this alternative dish already exists in the request queue
  const existingIndex = requests.findIndex(
    (r) => r.mealId === mealId && r.requestedDish.toLowerCase() === requestedDishName.toLowerCase()
  );

  let updatedRecord;
  if (existingIndex > -1) {
    requests[existingIndex].requestCount += 1;
    updatedRecord = requests[existingIndex];
  } else {
    updatedRecord = {
      id: `req-${Date.now()}`,
      mealId,
      mealName,
      requestedDish: requestedDishName,
      requestCount: 1,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      adminNotes: "Submitted via Student Portal",
      addedToFutureMenu: false
    };
    requests.unshift(updatedRecord);
  }

  // Also update count inside meal's alternativeDishes array
  if (meal && meal.alternativeDishes) {
    const altItem = meal.alternativeDishes.find((a) => a.name.toLowerCase() === requestedDishName.toLowerCase());
    if (altItem) {
      altItem.count = (altItem.count || 0) + 1;
      saveWeeklyMenu(menu);
    }
  }

  setStoredItem(STORAGE_KEYS.ALTERNATIVES, requests);

  // Award gamification points
  awardStudentPoints(15, "Alternative Meal Requested", `Voted for ${requestedDishName}`);

  return updatedRecord;
}

export function updateAlternativeRequestStatus(requestId, newStatus, adminNotes = "", addToMenu = false) {
  const requests = getAlternativeRequests();
  const index = requests.findIndex((r) => r.id === requestId);
  if (index !== -1) {
    requests[index].status = newStatus;
    if (adminNotes) requests[index].adminNotes = adminNotes;
    if (addToMenu !== undefined) requests[index].addedToFutureMenu = addToMenu;
    setStoredItem(STORAGE_KEYS.ALTERNATIVES, requests);
  }
  return requests;
}

/* ================= CLEANLINESS & HYGIENE ================= */
export function getCleanlinessData() {
  return getStoredItem(STORAGE_KEYS.CLEANLINESS, INITIAL_CLEANLINESS_DATA);
}

export function submitCleanlinessVote(areaKey, vote = "clean") {
  const data = getCleanlinessData();
  if (data.areas && data.areas[areaKey]) {
    const area = data.areas[areaKey];
    if (vote === "clean") {
      area.cleanVotes = (Number(area.cleanVotes) || 0) + 1;
    } else {
      area.needsAttentionVotes = (Number(area.needsAttentionVotes) || 0) + 1;
    }
    const total = (Number(area.cleanVotes) || 0) + (Number(area.needsAttentionVotes) || 0);
    area.satisfactionPct = total > 0 ? Math.round(((Number(area.cleanVotes) || 0) / total) * 100) : 0;
    setStoredItem(STORAGE_KEYS.CLEANLINESS, data);
    awardStudentPoints(15, "Cleanliness Feedback", `Voted for ${area.name} (${vote === "clean" ? "👍 Clean" : "👎 Needs attention"})`);
    return area;
  }
  return null;
}

export function submitCleanlinessRating(areaKey, score) {
  return submitCleanlinessVote(areaKey, score >= 3 ? "clean" : "needs_attention");
}

export function submitHygieneReport({ issueType, location, severity, description, photoUrl = null }) {
  const data = getCleanlinessData();
  const reports = data.hygieneReports || [];
  const nextNum = reports.length + 400 + 1;
  const reportId = `REP-${nextNum}`;
  const feedbackId = `FB-${String(Math.floor(Math.random() * 800) + 100).padStart(3, "0")}`;

  const newReport = {
    id: reportId,
    feedbackId,
    issueType,
    location,
    severity, // 'Low' | 'Medium' | 'High'
    description,
    status: "Pending", // 'Pending' | 'In Progress' | 'Resolved'
    timestamp: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }),
    adminNotes: "Received from student complaint desk.",
    resolvedAt: null,
    hasPhoto: Boolean(photoUrl),
    photoUrl: photoUrl || null
  };

  reports.unshift(newReport);
  data.hygieneReports = reports;
  setStoredItem(STORAGE_KEYS.CLEANLINESS, data);

  // Award gamification points for reporting an issue
  awardStudentPoints(40, "Hygiene Issue Reported", `Reported ${issueType} at ${location}`);

  return newReport;
}

export function updateHygieneReportStatus(reportId, status, adminNotes = "") {
  const data = getCleanlinessData();
  const reports = data.hygieneReports || [];
  const index = reports.findIndex((r) => r.id === reportId);
  if (index !== -1) {
    reports[index].status = status;
    if (adminNotes) reports[index].adminNotes = adminNotes;
    if (status === "Resolved") {
      reports[index].resolvedAt = new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    setStoredItem(STORAGE_KEYS.CLEANLINESS, data);
  }
  return data;
}

export function addStaffInspectionLog(logData) {
  const data = getCleanlinessData();
  const logs = data.inspectionLogs || [];
  const newLog = {
    id: `insp-${Date.now()}`,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    ...logData,
    isCompleted: true
  };
  logs.unshift(newLog);
  data.inspectionLogs = logs;
  setStoredItem(STORAGE_KEYS.CLEANLINESS, data);
  return data;
}

/* ================= FOOD WASTE MANAGEMENT ================= */
export function getFoodWasteRecords() {
  return getStoredItem(STORAGE_KEYS.FOOD_WASTE, INITIAL_FOOD_WASTE_RECORDS);
}

export function addFoodWasteRecord({
  date,
  mealType,
  foodType,
  preparedKg,
  servedKg,
  remainingKg,
  wastedKg,
  studentsServed,
  reason
}) {
  const records = getFoodWasteRecords();
  const prep = Number(preparedKg);
  const wasted = Number(wastedKg);
  const wastePercentage = prep > 0 ? Number(((wasted / prep) * 100).toFixed(1)) : 0;

  const newRecord = {
    id: `fw-${Date.now()}`,
    date: date || new Date().toISOString().split("T")[0],
    mealType,
    foodType,
    preparedKg: prep,
    servedKg: Number(servedKg),
    remainingKg: Number(remainingKg),
    wastedKg: wasted,
    wastePercentage,
    studentsServed: Number(studentsServed),
    reason: reason || "Daily disposal tracking",
    recordedBy: "Mess Duty Officer"
  };

  records.unshift(newRecord);
  setStoredItem(STORAGE_KEYS.FOOD_WASTE, records);
  return newRecord;
}

/* ================= ANNOUNCEMENTS ================= */
export function getAnnouncements() {
  return getStoredItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
}

export function addAnnouncement({ title, category, priority, content, author }) {
  const announcements = getAnnouncements();
  const newAnnouncement = {
    id: `ann-${Date.now()}`,
    title,
    category: category || "General",
    priority: priority || "Normal",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    content,
    author: author || "Mess Admin"
  };
  announcements.unshift(newAnnouncement);
  setStoredItem(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
  return newAnnouncement;
}

export function deleteAnnouncement(id) {
  const announcements = getAnnouncements();
  const filtered = announcements.filter((a) => a.id !== id);
  setStoredItem(STORAGE_KEYS.ANNOUNCEMENTS, filtered);
  return filtered;
}

/* ================= GAMIFICATION & PARTICIPATION POINTS ================= */
export function getStudentProfile() {
  return getStoredItem(STORAGE_KEYS.STUDENT_PROFILE, INITIAL_STUDENT_PROFILE);
}

export function getPointsHistory() {
  return getStoredItem(STORAGE_KEYS.POINTS_HISTORY, INITIAL_POINTS_HISTORY);
}

export function awardStudentPoints(points, activity, details) {
  const profile = getStudentProfile();
  const history = getPointsHistory();

  const newTotal = (profile.totalPoints || 0) + points;

  // Calculate Engagement Level
  let engagementLevel = "Bronze Explorer";
  if (newTotal >= 500) engagementLevel = "Platinum Legend";
  else if (newTotal >= 300) engagementLevel = "Gold Messmate";
  else if (newTotal >= 150) engagementLevel = "Silver Contributor";

  profile.totalPoints = newTotal;
  profile.engagementLevel = engagementLevel;
  setStoredItem(STORAGE_KEYS.STUDENT_PROFILE, profile);

  history.unshift({
    id: `pt-${Date.now()}`,
    activity,
    details,
    points,
    timestamp: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  });
  setStoredItem(STORAGE_KEYS.POINTS_HISTORY, history);

  return { totalPoints: newTotal, engagementLevel };
}

/* ================= SYSTEM SETTINGS ================= */
export function getSystemSettings() {
  return getStoredItem(STORAGE_KEYS.SETTINGS, {
    wasteWarningThreshold: 15,
    demoModeBypassFuture: false
  });
}

export function updateSystemSettings(newSettings) {
  const current = getSystemSettings();
  const updated = { ...current, ...newSettings };
  setStoredItem(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

/* ================= SMART ALTERNATIVE REPLACEMENT ================= */
export function replaceMealDish(mealId, newDish) {
  const menu = getWeeklyMenu();
  const index = menu.findIndex((m) => m.id === mealId);
  if (index !== -1) {
    const existing = menu[index];
    menu[index] = {
      ...existing,
      name: newDish.name || existing.name,
      description: newDish.description || existing.description,
      category: newDish.category || existing.category,
      imageUrl: newDish.imageUrl || existing.imageUrl,
      avgRating: newDish.avgRating !== undefined ? newDish.avgRating : 0,
      ratingCount: newDish.ratingCount !== undefined ? newDish.ratingCount : 0,
      goodVotes: newDish.goodVotes !== undefined ? newDish.goodVotes : 0,
      badVotes: newDish.badVotes !== undefined ? newDish.badVotes : 0,
      previousDishName: existing.name,
      isReplaced: true
    };
    saveWeeklyMenu(menu);
    publishWeeklyMenu(menu);
    return menu[index];
  }
  return null;
}

/* ================= ECO CHAMPION LEADERBOARD ================= */
const ECO_LEADERBOARD_KEY = "messmate_eco_leaderboard";

export function getEcoLeaderboard() {
  return getStoredItem(ECO_LEADERBOARD_KEY, INITIAL_ECO_LEADERBOARD);
}

export function awardEcoCleanPlate() {
  awardStudentPoints(20, "Zero Waste Clean Plate", "Finished entire meal without plate scraping waste.");
}

/* ================= JUDGE DEMO MODE PRESETS ================= */
export function loadJudgePresetScenario(scenarioKey) {
  // Scenario 1: Standard Reset
  if (scenarioKey === "standard") {
    resetDemoData();
    return "Standard South Indian hostel week restored.";
  }

  // Scenario 2: Sunday Grand Feast Peak Rush
  if (scenarioKey === "sunday_feast") {
    const menu = getWeeklyMenu();
    // Boost Sunday lunch to 4.9 stars, 280 votes
    const sunLu = menu.find((m) => m.day === "Sunday" && m.mealType === "lunch");
    if (sunLu) {
      sunLu.avgRating = 4.9;
      sunLu.ratingCount = 280;
      sunLu.goodVotes = 274;
      sunLu.badVotes = 6;
      saveWeeklyMenu(menu);
    }
    return "Loaded 'Sunday Grand Feast' scenario: 4.9 ★ satisfaction & 280 student votes.";
  }

  // Scenario 3: Rainy Day High Leftovers
  if (scenarioKey === "rainy_waste" || scenarioKey === "rainy_day_waste") {
    const records = getFoodWasteRecords();
    records.unshift({
      id: `fw-rain-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      mealType: "dinner",
      foodType: "Bisibelebath & Potato Fry",
      preparedKg: 160,
      servedKg: 122,
      remainingKg: 38,
      wastedKg: 32, // 20% waste - triggers threshold alert!
      wastePercentage: 20.0,
      studentsServed: 310,
      reason: "Heavy monsoon shower prevented 110 hostellers from attending dinner",
      recordedBy: "Mess Warden on Duty"
    });
    setStoredItem(STORAGE_KEYS.FOOD_WASTE, records);
    return "Loaded 'Rainy Day Leftovers' scenario: 20% waste recorded, 15% threshold warning triggered.";
  }

  // Scenario 4: Critical Hygiene Triage
  if (scenarioKey === "hygiene_alert") {
    const data = getCleanlinessData();
    const reports = data.hygieneReports || [];
    reports.unshift({
      id: `REP-${reports.length + 405}`,
      feedbackId: "FB-099",
      issueType: "Water cleanliness problems",
      location: "Drinking Water Area (Dispenser #2)",
      severity: "High",
      description: "Severe drip pooling across the floor creating a slippery safety hazard near row 5.",
      status: "Pending",
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      adminNotes: "Plumbing contractor notified.",
      resolvedAt: null
    });
    data.hygieneReports = reports;
    setStoredItem(STORAGE_KEYS.CLEANLINESS, data);
    return "Loaded 'Hygiene Alert Triage' scenario: High-severity ticket pending.";
  }

  return "Preset loaded.";
}
