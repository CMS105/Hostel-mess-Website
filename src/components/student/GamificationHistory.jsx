import React, { useState } from "react";
import {
  Trophy,
  Award,
  Sparkles,
  Star,
  CheckCircle2,
  Clock,
  History,
  ShieldAlert,
  UtensilsCrossed,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Leaf,
  Shield,
  Lightbulb,
  Heart,
  Flame,
  AlertCircle
} from "lucide-react";
import { getEcoLeaderboard, awardEcoCleanPlate } from "../../utils/storage";
export function GamificationHistory({
  studentProfile,
  pointsHistory = [],
  studentRatings = [],
  feedbackLogs = [],
  alternativeRequests = [],
  hygieneReports = []
}) {
  const [activeTab, setActiveTab] = useState("ecoLeaderboard");
  const [cleanPlateSuccess, setCleanPlateSuccess] = useState(false);
  const points = studentProfile?.totalPoints || 420;
  const level = studentProfile?.engagementLevel || "Gold Messmate";
  const leaderboard = getEcoLeaderboard() || [];
  // Tier calculation
  const tiers = [
    { name: "Bronze Explorer", min: 0, max: 150, color: "text-amber-800 bg-amber-100 border-amber-300" },
    { name: "Silver Contributor", min: 151, max: 300, color: "text-charcoal-700 bg-cream-200 border-cream-300" },
    { name: "Gold Messmate", min: 301, max: 500, color: "text-turmeric-900 bg-turmeric-100 border-turmeric-400" },
    { name: "Platinum Legend", min: 501, max: 1000, color: "text-leaf-900 bg-leaf-100 border-leaf-400" }
  ];

  // Weekly points calculation
  const weeklyEarned = pointsHistory.slice(0, 5).reduce((acc, p) => acc + (p.points || 0), 0);

  const handleLogCleanPlate = () => {
    awardEcoCleanPlate();
    setCleanPlateSuccess(true);
    setTimeout(() => {
      setCleanPlateSuccess(false);
    }, 4500);
  };

  const ecoBadges = [
    {
      id: "b-zero-waste",
      title: "Zero Waste Champion",
      desc: "Logged 10+ consecutive clean plates with zero scraped food wastage",
      icon: Leaf,
      color: "bg-leaf-100 text-leaf-800 border-leaf-300",
      isUnlocked: true
    },
    {
      id: "b-sentinel",
      title: "Hygiene Sentinel",
      desc: "Verified 3+ dining hall hygiene and water cooler audits",
      icon: Shield,
      color: "bg-blue-100 text-blue-800 border-blue-300",
      isUnlocked: true
    },
    {
      id: "b-critic",
      title: "Constructive Critic",
      desc: "Provided high-value menu improvement remarks for kitchen supervisors",
      icon: Lightbulb,
      color: "bg-turmeric-100 text-turmeric-900 border-turmeric-400",
      isUnlocked: true
    },
    {
      id: "b-advocate",
      title: "Culinary Advocate",
      desc: "Voted for authentic South Indian traditional alternative dishes",
      icon: UtensilsCrossed,
      color: "bg-amber-100 text-amber-900 border-amber-300",
      isUnlocked: false
    }
  ];

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Student Profile & Gamification Badge Card */}
      <div className="bg-leaf-800 rounded-3xl p-6 sm:p-8 text-cream-50 border border-leaf-900 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-turmeric-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-turmeric-500 text-charcoal-900 flex items-center justify-center font-extrabold text-2xl shadow-sm">
              <Trophy className="w-9 h-9" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold font-display tracking-tight text-cream-50">
                  {studentProfile?.name || "Rahul Sharma"}
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-leaf-900 border border-leaf-700 text-cream-200">
                  {studentProfile?.room || "Room B-204"}
                </span>
              </div>
              <p className="text-xs text-cream-200/80 mt-0.5">
                {studentProfile?.hostelBlock} • Roll: {studentProfile?.rollNo} • Diet: {studentProfile?.dietPreference}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-turmeric-400/20 text-turmeric-300 border border-turmeric-400/30 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{level}</span>
                </span>
                <span className="text-xs text-cream-200/80">
                  Total Accumulated Points: <strong className="text-cream-50">{points} pts</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Weekly Summary Widget */}
          <div className="bg-leaf-900/80 rounded-2xl p-4 border border-leaf-700 backdrop-blur-md flex items-center gap-4 min-w-[220px]">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-cream-200/70">
                This Week's Contribution
              </div>
              <div className="text-2xl font-bold font-display text-turmeric-300 mt-0.5">
                +{weeklyEarned} Pts
              </div>
              <div className="text-[11px] text-cream-200 font-medium">
                Civic & sustainability rewards earned
              </div>
            </div>
          </div>
        </div>

        {/* Tier progress bar */}
        <div className="mt-6 pt-5 border-t border-leaf-700/80">
          <div className="flex items-center justify-between text-xs text-cream-200/80 mb-2">
            <span>Engagement Progress to Platinum Legend</span>
            <span className="text-cream-50 font-bold">{points} / 500 Pts</span>
          </div>
          <div className="w-full bg-leaf-900 rounded-full h-3 overflow-hidden p-0.5 border border-leaf-700">
            <div
              className="bg-turmeric-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (points / 500) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* History Sub-Tabs */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2 border-b border-cream-200 pb-4">
          {[
            { id: "ecoLeaderboard", label: "Eco Champion Leaderboard", icon: Trophy, count: "Top 7" },
            { id: "points", label: "Points History", icon: Sparkles, count: pointsHistory.length },
            { id: "ratedMeals", label: "Rated Meals", icon: Star, count: studentRatings.length },
            { id: "feedback", label: "My Feedback Logs", icon: History, count: feedbackLogs.length },
            { id: "cleanliness", label: "Hygiene Tickets", icon: ShieldAlert, count: hygieneReports.length },
            { id: "alternatives", label: "Alternative Votes", icon: UtensilsCrossed, count: alternativeRequests.length }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-leaf-700 text-cream-50 shadow-2xs"
                    : "text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? "bg-white/20 text-cream-50" : "bg-cream-200 text-charcoal-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 0: Eco Champion Leaderboard */}
        {activeTab === "ecoLeaderboard" && (
          <div className="mt-5 space-y-6">
            {/* Non-Coercive Reward Policy Banner */}
            <div className="bg-leaf-50 border border-leaf-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Leaf className="w-5 h-5 text-leaf-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-leaf-950 font-display">
                    MESSMATE Eco Champion & Sustainability Principle
                  </h4>
                  <p className="text-[11px] text-leaf-800 mt-0.5">
                    Points and eco badges are awarded for <strong>zero-waste clean plates, objective feedback, and hygiene audits</strong> — NEVER for positive ratings! A critical or low rating that uncovers quality issues earns identical participation points.
                  </p>
                </div>
              </div>

              {/* One-Click Clean Plate Log Button */}
              <button
                onClick={handleLogCleanPlate}
                className="px-4 py-2.5 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs hover:shadow-xs active:scale-98 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Leaf className="w-4 h-4 text-turmeric-300" />
                <span>+ Log Clean Plate (+20 pts)</span>
              </button>
            </div>

            {/* Clean Plate Confirmation */}
            {cleanPlateSuccess && (
              <div className="bg-turmeric-100 border border-turmeric-300 text-turmeric-950 p-3.5 rounded-2xl flex items-center gap-3 text-xs font-semibold animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-turmeric-700 flex-shrink-0" />
                <span>
                  <strong>Clean Plate Recorded!</strong> +20 Eco Points added to your profile. Thank you for cutting Kaveri Hostel food waste!
                </span>
              </div>
            )}

            {/* Eco Badges Showcase */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-turmeric-600" />
                <span>Hostel Eco Badges & Recognition</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ecoBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        badge.isUnlocked
                          ? `${badge.color} shadow-2xs`
                          : "bg-cream-100/60 border-cream-200 text-charcoal-400 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/70">
                          {badge.isUnlocked ? "Unlocked" : "Locked"}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs">{badge.title}</h4>
                      <p className="text-[10px] mt-0.5 leading-snug">{badge.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Hostel Leaderboard Table */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-turmeric-600" />
                <span>Kaveri Hostel Weekly Sustainability Leaderboard</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-cream-200 text-charcoal-500 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Rank</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Room</th>
                      <th className="py-2.5 px-3 text-center">Clean Plates</th>
                      <th className="py-2.5 px-3 text-center">Verified Audits</th>
                      <th className="py-2.5 px-3">Eco Badge</th>
                      <th className="py-2.5 px-3 text-right">Total Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {leaderboard.map((student) => {
                      const isCurrentUser = student.studentId === "std-001";
                      return (
                        <tr
                          key={student.studentId}
                          className={`hover:bg-cream-50 transition-colors ${
                            isCurrentUser ? "bg-leaf-50/70 font-semibold" : ""
                          }`}
                        >
                          <td className="py-3 px-3">
                            <span
                              className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs ${
                                student.rank === 1
                                  ? "bg-turmeric-400 text-charcoal-900"
                                  : student.rank === 2
                                  ? "bg-slate-300 text-charcoal-900"
                                  : student.rank === 3
                                  ? "bg-amber-600 text-white"
                                  : "text-charcoal-500"
                              }`}
                            >
                              {student.rank}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-bold text-charcoal-900">
                            {student.name}
                            {isCurrentUser && (
                              <span className="ml-1.5 text-[9px] uppercase px-1.5 py-0.5 rounded bg-leaf-200 text-leaf-800 font-bold">
                                You
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-charcoal-600">{student.room}</td>
                          <td className="py-3 px-3 text-center font-bold text-leaf-800">
                            {student.cleanPlatesCount} 🍃
                          </td>
                          <td className="py-3 px-3 text-center font-medium text-charcoal-700">
                            {student.verifiedAudits}
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-200 text-charcoal-800 border border-cream-300">
                              {student.badge}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-extrabold text-charcoal-900 font-display">
                            {student.totalPoints} pts
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Points Log */}
        {activeTab === "points" && (
          <div className="mt-5 space-y-3">
            <p className="text-xs text-charcoal-500">
              * Participation points are awarded for your activity, feedback, and hygiene vigilance — never contingent on positive ratings.
            </p>
            <div className="divide-y divide-cream-100">
              {pointsHistory.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-turmeric-100 text-turmeric-900 border border-turmeric-300 flex items-center justify-center font-bold">
                      +{item.points}
                    </div>
                    <div>
                      <div className="font-bold text-charcoal-900">{item.activity}</div>
                      <div className="text-charcoal-600 text-[11px]">{item.details}</div>
                    </div>
                  </div>
                  <span className="text-charcoal-400 font-medium">{item.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Rated Meals */}
        {activeTab === "ratedMeals" && (
          <div className="mt-5 space-y-3">
            {studentRatings.length === 0 ? (
              <div className="text-center py-10 text-charcoal-400 text-xs">
                No meals rated yet in this session. Head to Today's Dashboard to submit your first rating!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentRatings.map((rated, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-cream-50/70 border border-cream-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-charcoal-900 line-clamp-1 font-display">
                          {rated.mealName}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                            rated.choice === "needs_improvement"
                              ? "bg-terracotta-100 text-terracotta-800 border-terracotta-200"
                              : "bg-leaf-100 text-leaf-800 border-leaf-200"
                          }`}
                        >
                          {rated.choice === "good"
                            ? "👍 Good"
                            : rated.choice === "needs_improvement"
                            ? "👎 Needs Imp."
                            : `${rated.avgScore || 5.0} ★`}
                        </span>
                      </div>
                      <div className="text-[11px] text-charcoal-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-charcoal-400" />
                        <span>Evaluated on {rated.ratedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Feedback Logs */}
        {activeTab === "feedback" && (
          <div className="mt-5 space-y-3">
            <p className="text-xs text-charcoal-500">
              * Note: Your feedback is stored anonymously with a masked ID (e.g. FB-001) in mess manager logs to protect student privacy.
            </p>
            <div className="space-y-3">
              {feedbackLogs.slice(0, 5).map((fb) => (
                <div
                  key={fb.id}
                  className="p-4 rounded-2xl bg-cream-50/70 border border-cream-200 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-charcoal-900">{fb.mealName}</span>
                    <span className="font-bold text-leaf-800 bg-white px-2 py-0.5 rounded-md border border-cream-200">
                      Ref: {fb.id} ({fb.choice === "needs_improvement" ? "👎 Needs Imp." : "👍 Good"})
                    </span>
                  </div>

                  <p className="text-xs text-charcoal-700 italic">
                    "{fb.studentFeedback}"
                  </p>

                  {fb.constructiveSuggestion && (
                    <div className="text-xs text-leaf-900 bg-leaf-50 p-2.5 rounded-xl border border-leaf-200">
                      <strong>Suggestion: </strong> {fb.constructiveSuggestion}
                    </div>
                  )}

                  <div className="text-[10px] text-charcoal-500 flex items-center justify-between pt-1">
                    <span>Category: {fb.mealCategory}</span>
                    <span>{fb.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Cleanliness Reports */}
        {activeTab === "cleanliness" && (
          <div className="mt-5 space-y-3">
            {hygieneReports.map((rep) => (
              <div
                key={rep.id}
                className="p-4 rounded-2xl bg-cream-50/70 border border-cream-200 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-charcoal-900">{rep.issueType}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rep.severity === "High"
                          ? "bg-terracotta-100 text-terracotta-800 border border-terracotta-200"
                          : rep.severity === "Medium"
                          ? "bg-turmeric-100 text-turmeric-900 border border-turmeric-200"
                          : "bg-leaf-100 text-leaf-800 border border-leaf-200"
                      }`}
                    >
                      {rep.severity} Severity
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-700 mt-1">{rep.description}</p>
                  <div className="text-[11px] text-charcoal-500 mt-1">
                    Location: {rep.location} • {rep.timestamp}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      rep.status === "Resolved"
                        ? "bg-leaf-100 text-leaf-800 border border-leaf-300"
                        : rep.status === "In Progress"
                        ? "bg-turmeric-100 text-turmeric-900 border border-turmeric-300"
                        : "bg-cream-200 text-charcoal-800"
                    }`}
                  >
                    {rep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Alternative Requests */}
        {activeTab === "alternatives" && (
          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {alternativeRequests.map((alt) => (
                <div
                  key={alt.id}
                  className="p-4 rounded-2xl bg-cream-50/70 border border-cream-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-leaf-800 font-display">{alt.requestedDish}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          alt.status === "Accepted"
                            ? "bg-leaf-100 text-leaf-800 border border-leaf-300"
                            : alt.status === "Planned"
                            ? "bg-turmeric-100 text-turmeric-900 border border-turmeric-300"
                            : alt.status === "Rejected"
                            ? "bg-terracotta-100 text-terracotta-800 border border-terracotta-300"
                            : "bg-cream-200 text-charcoal-700"
                        }`}
                      >
                        {alt.status}
                      </span>
                    </div>
                    <div className="text-xs text-charcoal-600 mt-1 font-medium">
                      Original: {alt.mealName}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-cream-200 text-[11px] text-charcoal-500 flex items-center justify-between">
                    <span>{alt.requestCount} Student Votes</span>
                    <span>{alt.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
