// Comprehensive Automated Verification Suite for MESSMATE Redesign
import { getMealAvailability, isMealInFuture, getWeekDates } from "./src/utils/mealTiming.js";
import { formatRatingDisplay, formatRatingCompact, calculateBinaryVote, isValidRating } from "./src/utils/ratingUtils.js";
import { INITIAL_WEEKLY_MENU, INITIAL_CLEANLINESS_DATA, INITIAL_FOOD_WASTE_RECORDS, INITIAL_ANNOUNCEMENTS } from "./src/data/mockData.js";
import { convertToCSV } from "./src/utils/csvExport.js";

console.log("=================================================");
console.log("  MESSMATE AUTOMATED VERIFICATION SUITE  ");
console.log("=================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// ==========================================
// TEST SUITE 1: RULE 2 - RATING COUNT TRANSPARENCY
// ==========================================
console.log("--- 1. Testing Rule 2: Rating Count Must Always Be Visible ---");

// Test zero ratings
const zeroRatingStr = formatRatingDisplay(0, 0);
assert(zeroRatingStr === "Not rated yet | 0 ratings", `Zero ratings formatted correctly: "${zeroRatingStr}"`);

// Test 1 rating (Singular form: "1 rating")
const singleRatingStr = formatRatingDisplay(5.0, 1);
assert(singleRatingStr === "5.0 / 5 | 1 rating", `Single rating shows singular "1 rating": "${singleRatingStr}"`);

// Test multiple ratings (Plural form: "X ratings")
const multiRatingStr = formatRatingDisplay(4.3, 4);
assert(multiRatingStr === "4.3 / 5 | 4 ratings", `Multiple ratings shows "X ratings": "${multiRatingStr}"`);

// Compact badge test
assert(formatRatingCompact(0, 0) === "Not rated | 0", "Compact zero rating format");
assert(formatRatingCompact(5.0, 1) === "5.0 / 5 (1 vote)", "Compact single vote format");
assert(formatRatingCompact(4.5, 20) === "4.5 / 5 (20 votes)", "Compact multi vote format");


// ==========================================
// TEST SUITE 2: TEST DISHES PRE-SEEDED DATA
// ==========================================
console.log("\n--- 2. Testing Pre-seeded Test Dishes in Mock Data ---");

// Sat Snacks: m-sat-sn (0 ratings)
const satSnack = INITIAL_WEEKLY_MENU.find(m => m.id === "m-sat-sn");
assert(satSnack !== undefined, "Saturday Snack dish exists");
assert(satSnack.ratingCount === 0, `Saturday Snack ratingCount is 0 (actual: ${satSnack.ratingCount})`);
assert(formatRatingDisplay(satSnack.avgRating, satSnack.ratingCount) === "Not rated yet | 0 ratings", "Saturday Snack displays 'Not rated yet | 0 ratings'");

// Fri Snacks: m-fri-sn (1 rating)
const friSnack = INITIAL_WEEKLY_MENU.find(m => m.id === "m-fri-sn");
assert(friSnack !== undefined, "Friday Snack dish exists");
assert(friSnack.ratingCount === 1, `Friday Snack ratingCount is 1 (actual: ${friSnack.ratingCount})`);
assert(formatRatingDisplay(friSnack.avgRating, friSnack.ratingCount) === "5.0 / 5 | 1 rating", "Friday Snack displays '5.0 / 5 | 1 rating'");

// Sat Breakfast: m-sat-bf (4 ratings)
const satBf = INITIAL_WEEKLY_MENU.find(m => m.id === "m-sat-bf");
assert(satBf !== undefined, "Saturday Breakfast dish exists");
assert(satBf.ratingCount === 4, `Saturday Breakfast ratingCount is 4 (actual: ${satBf.ratingCount})`);
assert(formatRatingDisplay(satBf.avgRating, satBf.ratingCount) === "4.3 / 5 | 4 ratings", "Saturday Breakfast displays '4.3 / 5 | 4 ratings'");


// ==========================================
// TEST SUITE 3: TWO-CHOICE BINARY RATING MATH
// ==========================================
console.log("\n--- 3. Testing Simplified 2-Choice Rating Math ---");

// Test voting "good" on a 0-rating dish
const freshDish = { avgRating: 0, ratingCount: 0, goodVotes: 0, badVotes: 0 };
const vote1 = calculateBinaryVote(freshDish, "good");
assert(vote1.newCount === 1, `After 1st good vote, count = 1 (actual: ${vote1.newCount})`);
assert(vote1.newAvg === 5.0, `After 1st good vote, avg = 5.0 (actual: ${vote1.newAvg})`);
assert(vote1.newGoodVotes === 1, "Good votes = 1");
assert(vote1.newBadVotes === 0, "Bad votes = 0");
assert(vote1.satisfactionPct === 100, "Satisfaction = 100%");

// Test voting "needs_improvement" next
const vote2 = calculateBinaryVote({
  avgRating: vote1.newAvg,
  ratingCount: vote1.newCount,
  goodVotes: vote1.newGoodVotes,
  badVotes: vote1.newBadVotes
}, "needs_improvement");
assert(vote2.newCount === 2, `After 2nd vote (needs improvement), count = 2 (actual: ${vote2.newCount})`);
// (5 + 1) / 2 = 3.0
assert(vote2.newAvg === 3.0, `After needs_improvement, avg = 3.0 (actual: ${vote2.newAvg})`);
assert(vote2.newGoodVotes === 1, "Good votes = 1");
assert(vote2.newBadVotes === 1, "Bad votes = 1");
assert(vote2.satisfactionPct === 50, "Satisfaction = 50%");


// ==========================================
// TEST SUITE 4: RULE 1 - STRICT FUTURE MEAL RESTRICTION
// ==========================================
console.log("\n--- 4. Testing Rule 1: Strict Future Meal Restriction ---");

// Mock a future meal (tomorrow's lunch)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDateStr = tomorrow.toISOString().split("T")[0];

const futureMeal = {
  id: "m-test-future",
  name: "Future South Indian Thali",
  date: tomorrowDateStr,
  timing: "12:30 PM - 02:30 PM",
  isAvailable: true
};

const isFuture = isMealInFuture(futureMeal, new Date());
assert(isFuture === true, "Meal scheduled for tomorrow is recognized as future meal");

const availFuture = getMealAvailability(futureMeal, new Date());
assert(availFuture.canRate === false, "canRate is false for future meal");
assert(availFuture.status === "UPCOMING", "Status is UPCOMING for future meal");
assert(availFuture.lockReason === "Rating will open when this meal is available.", `Displays exact required lock reason: "${availFuture.lockReason}"`);

// Mock a past meal (yesterday's breakfast)
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayDateStr = yesterday.toISOString().split("T")[0];

const pastMeal = {
  id: "m-test-past",
  name: "Past Ghee Pongal",
  date: yesterdayDateStr,
  timing: "07:30 AM - 09:30 AM",
  isAvailable: true
};

const isPast = isMealInFuture(pastMeal, new Date());
assert(isPast === false, "Meal scheduled for yesterday is NOT in future");
const availPast = getMealAvailability(pastMeal, new Date());
assert(availPast.canRate === true, "canRate is true for past meal");
assert(availPast.status === "SERVED", "Status is SERVED for past meal");


// ==========================================
// TEST SUITE 5: SOUTH INDIAN CUISINE AUTHENTICITY
// ==========================================
console.log("\n--- 5. Testing South Indian Cuisine Authenticity ---");

const southIndianDishes = INITIAL_WEEKLY_MENU.map(m => m.name);
assert(INITIAL_WEEKLY_MENU.length === 28, `All 28 menu slots present (4 slots x 7 days) (actual: ${INITIAL_WEEKLY_MENU.length})`);

const sampleExpectedDishes = [
  "Idli", "Sambar", "Dosa", "Pongal", "Poori", "Vada",
  "Bisibelebath", "Curd Rice", "Bonda", "Sundal"
];

sampleExpectedDishes.forEach(dishKeyword => {
  const found = southIndianDishes.some(name => name.toLowerCase().includes(dishKeyword.toLowerCase()));
  assert(found, `South Indian staple "${dishKeyword}" found in weekly menu`);
});


// ==========================================
// TEST SUITE 6: SIMPLIFIED CLEANLINESS 2-CHOICE SYSTEM
// ==========================================
console.log("\n--- 6. Testing Cleanliness 2-Choice System ---");

assert(INITIAL_CLEANLINESS_DATA.areas !== undefined, "Cleanliness areas object exists");
const diningHall = INITIAL_CLEANLINESS_DATA.areas.diningHall;
assert(diningHall.cleanVotes !== undefined, "diningHall has cleanVotes");
assert(diningHall.needsAttentionVotes !== undefined, "diningHall has needsAttentionVotes");
assert(diningHall.satisfactionPct !== undefined, "diningHall has satisfactionPct");
const calculatedHallPct = Math.round((diningHall.cleanVotes / (diningHall.cleanVotes + diningHall.needsAttentionVotes)) * 100);
assert(diningHall.satisfactionPct === calculatedHallPct, `diningHall satisfaction matches clean vote ratio: ${diningHall.satisfactionPct}%`);


// ==========================================
// TEST SUITE 7: CSV EXPORT UTILITY
// ==========================================
console.log("\n--- 7. Testing CSV Export Data Format ---");

const sampleMenuForCSV = [
  { id: "m-1", day: "Friday", mealType: "breakfast", name: "Masala Dosa", category: "South Indian", avgRating: 4.8, ratingCount: 215, goodVotes: 205, badVotes: 10 }
];
const csvResult = convertToCSV([
  { "Meal ID": "m-1", "Dish Name": "Masala Dosa", "Average Rating": "4.8 ★ | 215 ratings" }
], ["Meal ID", "Dish Name", "Average Rating"]);

assert(csvResult.includes("4.8 ★ | 215 ratings"), "CSV includes formatted rating with vote count");
assert(csvResult.includes("Masala Dosa"), "CSV includes dish name");


// ==========================================
// SUMMARY
// ==========================================
console.log("\n=================================================");
console.log(`  ALL TESTS COMPLETED: ${passedTests} / ${totalTests} PASSED  `);
console.log("=================================================");

if (passedTests === totalTests) {
  console.log("🎉 ALL REQUIREMENTS AND HACKATHON CONSTRAINTS VERIFIED 100%!");
} else {
  console.error("❌ Some verification checks failed!");
  process.exit(1);
}
