import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  AlertTriangle,
  Star,
  Clock,
  Download,
  MessageSquare,
  Lock,
  Tag,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { exportAnonymousFeedbackCSV } from "../../utils/csvExport";

export function AnonymousFeedbackLogs({ feedbackLogs = [] }) {
  const [filterChoice, setFilterChoice] = useState("all");
  const [onlyNeedsImpAlerts, setOnlyNeedsImpAlerts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = feedbackLogs.filter((fb) => {
    if (filterChoice === "good" && fb.choice !== "good" && fb.overallRating < 4) return false;
    if (filterChoice === "needs_improvement" && fb.choice !== "needs_improvement" && fb.overallRating >= 4) return false;
    if (onlyNeedsImpAlerts && fb.choice !== "needs_improvement" && !fb.hasLowRatingTrigger) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchMeal = fb.mealName?.toLowerCase().includes(q);
      const matchMsg = fb.studentFeedback?.toLowerCase().includes(q);
      const matchSugg = fb.constructiveSuggestion?.toLowerCase().includes(q);
      const matchId = fb.id?.toLowerCase().includes(q);
      if (!matchMeal && !matchMsg && !matchSugg && !matchId) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
            <Lock className="w-4 h-4 text-leaf-700" />
            <span>Zero-Knowledge Student Privacy Protocol</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            Anonymous Student Feedback Logs
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Individual student PII is permanently masked. Only anonymous IDs (FB-XXX) and 2-choice evaluations are recorded.
          </p>
        </div>

        <button
          onClick={() => exportAnonymousFeedbackCSV(feedbackLogs)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cream-300 hover:bg-cream-100 text-charcoal-800 text-xs font-bold transition-all shadow-2xs self-start md:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-charcoal-500" />
          <span>Export Feedback (CSV)</span>
        </button>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="bg-charcoal-900 text-cream-50 p-4 rounded-2xl flex items-center justify-between text-xs border border-charcoal-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-leaf-700 text-cream-50 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-cream-50 font-display">
              Hostel Food Democracy & Non-Retaliation Policy
            </div>
            <div className="text-cream-300/80 text-[11px]">
              Students evaluate meals objectively without fear. Identifiers are generated purely as sequential anonymous hashes.
            </div>
          </div>
        </div>

        <div className="hidden sm:block text-turmeric-300 text-[11px] font-mono">
          AES-MASKED • LOCALSTORAGE PERSISTED
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-cream-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by feedback ID, dish or comment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-8 pr-3 py-2 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-600 w-64 text-charcoal-800"
              />
            </div>

            {/* Evaluation Choice Filter */}
            <select
              value={filterChoice}
              onChange={(e) => setFilterChoice(e.target.value)}
              className="text-xs p-2 rounded-xl border border-cream-300 bg-cream-50 font-medium text-charcoal-800 cursor-pointer"
            >
              <option value="all">All Feedback</option>
              <option value="good">👍 Good Evaluations</option>
              <option value="needs_improvement">👎 Needs Improvement</option>
            </select>

            {/* Needs Improvement toggle */}
            <button
              onClick={() => setOnlyNeedsImpAlerts(!onlyNeedsImpAlerts)}
              className={`text-xs px-3 py-2 rounded-xl border font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                onlyNeedsImpAlerts
                  ? "bg-terracotta-100 text-terracotta-900 border-terracotta-300"
                  : "bg-cream-100 text-charcoal-700 border-cream-200 hover:bg-cream-200"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-terracotta-700" />
              <span>Needs Improvement Only</span>
            </button>
          </div>

          <div className="text-xs text-charcoal-500 font-medium">
            Showing <strong>{filteredLogs.length}</strong> of {feedbackLogs.length} logs
          </div>
        </div>

        {/* Logs Feed */}
        <div className="divide-y divide-cream-100">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-charcoal-400 text-xs">
              No feedback entries match the selected filter criteria.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isNeedsImp = log.choice === "needs_improvement" || log.overallRating <= 1 || log.hasLowRatingTrigger;

              return (
                <div key={log.id} className="py-5 space-y-3">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-xs bg-cream-100 text-charcoal-800 px-2.5 py-0.5 rounded-md border border-cream-300">
                        {log.id}
                      </span>
                      <span className="text-sm font-bold font-display text-charcoal-900">
                        {log.mealName}
                      </span>
                      <span className="text-[10px] font-semibold text-leaf-800 bg-leaf-50 px-2 py-0.5 rounded border border-leaf-200">
                        {log.mealCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${
                          isNeedsImp
                            ? "bg-terracotta-100 text-terracotta-800 border-terracotta-300"
                            : "bg-leaf-100 text-leaf-800 border-leaf-300"
                        }`}
                      >
                        {isNeedsImp ? (
                          <>
                            <ThumbsDown className="w-3.5 h-3.5 text-terracotta-700" />
                            <span>Needs Improvement</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3.5 h-3.5 text-leaf-700" />
                            <span>Good</span>
                          </>
                        )}
                      </span>
                      <span className="text-charcoal-400 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{log.timestamp}</span>
                      </span>
                    </div>
                  </div>

                  {/* Selected reasons badges */}
                  {log.selectedReasons && log.selectedReasons.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-700">
                        Flagged Reasons:
                      </span>
                      {log.selectedReasons.map((reason, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold text-terracotta-800 bg-terracotta-50 border border-terracotta-200 px-2.5 py-0.5 rounded-md"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Student Feedback Body */}
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isNeedsImp
                        ? "bg-terracotta-50/70 border border-terracotta-200 text-terracotta-900 font-medium"
                        : "bg-cream-50/80 border border-cream-200 text-charcoal-700"
                    }`}
                  >
                    "{log.studentFeedback}"
                  </div>

                  {/* Constructive Suggestion if provided */}
                  {log.constructiveSuggestion && (
                    <div className="bg-leaf-50 border border-leaf-200 p-3 rounded-2xl text-xs text-leaf-950 flex items-start gap-2">
                      <span className="font-bold text-leaf-800 shrink-0">Chef Suggestion:</span>
                      <span>{log.constructiveSuggestion}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
