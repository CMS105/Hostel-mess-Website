import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Modal } from "../common/Modal";
import {
  AlertTriangle,
  Check,
  ThumbsUp,
  ThumbsDown,
  Lock,
  MessageSquare,
  Clock,
  Star,
  Sparkles
} from "lucide-react";
import { isMealInFuture } from "../../utils/mealTiming";
import { formatRatingDisplay } from "../../utils/ratingUtils";

const NEGATIVE_REASONS = [
  "Food was too spicy.",
  "Food was too oily.",
  "Food was not fresh.",
  "Food was cold.",
  "Poor taste.",
  "Poor quality.",
  "Insufficient quantity.",
  "Other."
];

export function MealRatingModal({ isOpen, onClose, meal, onSubmitRating }) {
  if (!meal) return null;

  // Strict check on meal timing (RULE 1)
  const isFuture = isMealInFuture(meal, new Date());
  const currentRatingFormatted = formatRatingDisplay(meal.avgRating, meal.ratingCount);

  // Simplified 2-Choice System: 'good' (+5 points) or 'needs_improvement' (+1 point)
  const [choice, setChoice] = useState("good");
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [studentFeedback, setStudentFeedback] = useState("");
  const [constructiveSuggestion, setConstructiveSuggestion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isNegative = choice === "needs_improvement";

  const totalVotes = meal.ratingCount || (meal.goodVotes || 0) + (meal.badVotes || 0);
  const goodVotes = meal.goodVotes || 0;
  const badVotes = meal.badVotes || 0;
  const satisfactionPct = totalVotes > 0 ? Math.round((goodVotes / totalVotes) * 100) : 80;

  const toggleReason = (reason) => {
    if (isFuture) return;
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // RULE 1: STRICT FUTURE MEAL REJECTION
    if (isMealInFuture(meal, new Date())) {
      setErrorMsg("Rating will open when this meal is available. Future meals cannot be rated.");
      return;
    }

    // Mandatory Negative Feedback Validation
    if (isNegative) {
      if (selectedReasons.length === 0) {
        setErrorMsg("Please select at least one reason explaining why this meal needs improvement.");
        return;
      }
      if (!studentFeedback.trim() || studentFeedback.trim().length < 5) {
        setErrorMsg("Please provide a brief explanation of the issue (minimum 5 characters).");
        return;
      }
    }

    try {
      if (choice === "good") {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {}

    onSubmitRating({
      mealId: meal.id,
      choice,
      selectedReasons: isNegative ? selectedReasons : [],
      studentFeedback: studentFeedback.trim(),
      constructiveSuggestion: constructiveSuggestion.trim()
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hostel Meal Evaluation"
      subtitle="Institutional Dining Feedback Register • Kaveri Hall"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-charcoal-800">
        {/* Meal Header & Historical Metrics Display */}
        <div className="bg-ivory-100 p-3.5 rounded-lg border border-ivory-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
              {meal.day} • {meal.mealType.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-charcoal-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{meal.timing}</span>
            </span>
          </div>

          <h3 className="text-sm font-bold font-display text-charcoal-800 mt-1.5">
            {meal.name}
          </h3>

          {/* Historical Rating Data Grid (RULE 2: MUST ALWAYS SHOW COUNT) */}
          <div className="grid grid-cols-4 gap-2 mt-3 pt-2.5 border-t border-ivory-200 text-center font-mono">
            <div className="bg-white p-1.5 rounded border border-ivory-200">
              <span className="text-[9px] uppercase text-charcoal-400 block font-sans font-semibold">Average</span>
              <span className="text-xs font-bold text-charcoal-800">
                {meal.avgRating ? `${meal.avgRating.toFixed(1)} ★` : "—"}
              </span>
            </div>

            <div className="bg-white p-1.5 rounded border border-ivory-200">
              <span className="text-[9px] uppercase text-charcoal-400 block font-sans font-semibold">Total Votes</span>
              <span className="text-xs font-bold text-charcoal-800">{totalVotes}</span>
            </div>

            <div className="bg-white p-1.5 rounded border border-ivory-200">
              <span className="text-[9px] uppercase text-forest-700 block font-sans font-semibold">Good 👍</span>
              <span className="text-xs font-bold text-forest-700">{goodVotes}</span>
            </div>

            <div className="bg-white p-1.5 rounded border border-ivory-200">
              <span className="text-[9px] uppercase text-terracotta block font-sans font-semibold">Needs Imp 👎</span>
              <span className="text-xs font-bold text-terracotta">{badVotes}</span>
            </div>
          </div>
        </div>

        {/* Future Meal Warning (RULE 1) */}
        {isFuture && (
          <div className="p-3 rounded-lg bg-terracotta-50 border border-terracotta-200 text-terracotta-900 flex items-start gap-2.5 text-xs">
            <Lock className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Rating Locked: Future Meal Window</div>
              <p className="mt-0.5 text-[11px] text-charcoal-600">
                "Rating will open when this meal is available." You cannot submit an evaluation before food service begins.
              </p>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-terracotta-50 border border-terracotta-300 text-terracotta-900 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-terracotta shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* EXACTLY TWO RATING CHOICES (No 5-star controls!) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">
            Your Meal Evaluation (Select Exactly One)
          </label>

          <div className="grid grid-cols-2 gap-3">
            {/* Choice 1: GOOD 👍 */}
            <button
              type="button"
              disabled={isFuture}
              onClick={() => {
                setChoice("good");
                setErrorMsg("");
              }}
              className={`p-3.5 rounded-lg border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                choice === "good"
                  ? "bg-forest-50 border-forest-700 text-forest-900 shadow-2xs"
                  : "bg-white border-ivory-300 hover:border-charcoal-300 text-charcoal-700 opacity-80"
              } ${isFuture ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm flex items-center gap-1.5 font-display">
                  <span>GOOD</span>
                  <span className="text-base">👍</span>
                </span>
                {choice === "good" && (
                  <div className="w-5 h-5 rounded-full bg-forest-700 text-ivory flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-[11px] text-charcoal-600 mt-1.5">
                Tastes good, fresh, and properly prepared.
              </p>
              <div className="mt-2 text-[10px] font-mono font-bold text-forest-700">
                +5 Participation Pts
              </div>
            </button>

            {/* Choice 2: NEEDS IMPROVEMENT 👎 */}
            <button
              type="button"
              disabled={isFuture}
              onClick={() => {
                setChoice("needs_improvement");
                setErrorMsg("");
              }}
              className={`p-3.5 rounded-lg border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                choice === "needs_improvement"
                  ? "bg-terracotta-50 border-terracotta text-terracotta-900 shadow-2xs"
                  : "bg-white border-ivory-300 hover:border-charcoal-300 text-charcoal-700 opacity-80"
              } ${isFuture ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm flex items-center gap-1.5 font-display">
                  <span>NEEDS IMPROVEMENT</span>
                  <span className="text-base">👎</span>
                </span>
                {choice === "needs_improvement" && (
                  <div className="w-5 h-5 rounded-full bg-terracotta text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-[11px] text-charcoal-600 mt-1.5">
                Substandard quality, cold, oily, or taste issue.
              </p>
              <div className="mt-2 text-[10px] font-mono font-bold text-terracotta">
                +1 Participation Pt (Help Cooks)
              </div>
            </button>
          </div>
        </div>

        {/* NEGATIVE FEEDBACK SECTION (Appears only after Needs Improvement is selected) */}
        {isNegative && (
          <div className="space-y-3 pt-2 border-t border-ivory-300 animate-fade-in">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                What went wrong? <span className="text-terracotta">*</span> (Select at least one)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {NEGATIVE_REASONS.map((reason) => {
                  const isChecked = selectedReasons.includes(reason);
                  return (
                    <button
                      key={reason}
                      type="button"
                      disabled={isFuture}
                      onClick={() => toggleReason(reason)}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-medium text-left border transition-colors cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? "bg-terracotta text-white border-terracotta font-semibold"
                          : "bg-white text-charcoal-700 border-ivory-300 hover:bg-ivory-100"
                      }`}
                    >
                      <span className="truncate">{reason}</span>
                      {isChecked && <Check className="w-3 h-3 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Brief Explanation <span className="text-terracotta">*</span> (Min 5 characters)
              </label>
              <textarea
                rows={2}
                disabled={isFuture}
                value={studentFeedback}
                onChange={(e) => {
                  setStudentFeedback(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="Describe the issue accurately for the kitchen committee..."
                className="w-full text-xs p-2.5 rounded-lg border border-ivory-300 focus:outline-none focus:border-forest-700 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Constructive Suggestion for Head Chef (Optional)
              </label>
              <input
                type="text"
                disabled={isFuture}
                value={constructiveSuggestion}
                onChange={(e) => setConstructiveSuggestion(e.target.value)}
                placeholder="e.g. Reduce red chilli powder in sambar, roast spices lightly"
                className="w-full text-xs p-2 rounded-lg border border-ivory-300 focus:outline-none focus:border-forest-700 bg-white"
              />
            </div>
          </div>
        )}

        {/* Positive Note for Good choice (Optional) */}
        {!isNegative && (
          <div className="pt-2 border-t border-ivory-200">
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">
              Add a note for the kitchen cooks (Optional)
            </label>
            <input
              type="text"
              disabled={isFuture}
              value={studentFeedback}
              onChange={(e) => setStudentFeedback(e.target.value)}
              placeholder="e.g. Perfectly fermented batter, chutney was authentic!"
              className="w-full text-xs p-2 rounded-lg border border-ivory-300 focus:outline-none focus:border-forest-700 bg-white"
            />
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-ivory-200 text-xs">
          <span className="text-[11px] text-charcoal-400">
            Anonymous ID: FB-XXX • Zero PII Stored
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-ivory-300 text-charcoal-600 hover:bg-ivory-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isFuture}
              className="px-4 py-1.5 rounded-lg bg-forest-700 hover:bg-forest-800 disabled:opacity-40 disabled:cursor-not-allowed text-ivory font-bold shadow-2xs transition-colors cursor-pointer"
            >
              Submit Evaluation
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
