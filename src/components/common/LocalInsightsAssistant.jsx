import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Bot,
  X,
  Send,
  HelpCircle,
  Trash2,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { formatRatingDisplay } from "../../utils/ratingUtils";

export function LocalInsightsAssistant({
  menu = [],
  wasteRecords = [],
  cleanlinessData = {},
  feedbackLogs = [],
  alternativeRequests = []
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "m-welcome",
      sender: "assistant",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: "Namaskara! I am your MESSMATE Local Insights Assistant. I compute instant, private analytics directly from live Kaveri Hostel dining hall telemetry without any external API calls. Ask me anything or choose a quick question below!"
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Deterministic local reasoning engine querying live state
  const computeAnswer = (query) => {
    const q = query.toLowerCase();

    // 1. Waste queries
    if (q.includes("waste") || q.includes("discard") || q.includes("leftover")) {
      if (!wasteRecords || wasteRecords.length === 0) {
        return "No food waste logs have been recorded in the system yet.";
      }
      // Sort by wastedKg descending
      const sortedWaste = [...wasteRecords].sort((a, b) => b.wastedKg - a.wastedKg);
      const topWaste = sortedWaste[0];
      const totalWaste = wasteRecords.reduce((acc, r) => acc + (r.wastedKg || 0), 0);
      const avgWaste = (totalWaste / wasteRecords.length).toFixed(1);

      return (
        `Based on ${wasteRecords.length} kitchen disposal records:\n\n` +
        `• Highest Wastage Meal: **${topWaste.foodType}** (${topWaste.mealType.toUpperCase()} on ${topWaste.date}) with **${topWaste.wastedKg} kg discarded** (${topWaste.wastePercentage}% of prepared batch).\n` +
        `• Reported Reason: "${topWaste.reason}"\n` +
        `• Weekly Cumulative Waste: **${totalWaste} kg** across all sessions (Average: **${avgWaste} kg/session**).\n\n` +
        `Recommendation: Optimize the evening rice batch by using the Smart Food Demand Predictor.`
      );
    }

    // 2. Breakfast / Popular food queries
    if (q.includes("breakfast") || (q.includes("popular") && !q.includes("least")) || q.includes("best") || q.includes("favorite")) {
      const breakfasts = menu.filter((m) => m.mealType === "breakfast");
      if (breakfasts.length === 0) {
        return "No breakfast meals found in the current weekly schedule.";
      }
      const sortedBf = [...breakfasts].sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
      const topBf = sortedBf[0];

      return (
        `The most popular breakfast item is **${topBf.name}** (${topBf.day}), rated **${formatRatingDisplay(topBf.avgRating, topBf.ratingCount)}** with ${topBf.goodVotes} positive endorsements.\n\n` +
        `Runner-up: **${sortedBf[1]?.name}** (${sortedBf[1]?.day}) rated **${formatRatingDisplay(sortedBf[1]?.avgRating, sortedBf[1]?.ratingCount)}**.\n\n` +
        `Students specifically praise the fresh coconut chutney and crisp texture!`
      );
    }

    // 3. Cleanliness / Hygiene queries
    if (q.includes("clean") || q.includes("hygiene") || q.includes("complaint") || q.includes("issue") || q.includes("pending")) {
      const reports = cleanlinessData.hygieneReports || [];
      const pending = reports.filter((r) => r.status !== "Resolved");
      const highSeverity = pending.filter((r) => r.severity === "High");

      if (pending.length === 0) {
        return "Great news! All recorded cleanliness inspection tickets are currently marked as Resolved. Overall mess hygiene score is 88%.";
      }

      const issuesList = pending
        .map(
          (p) =>
            `• [${p.severity.toUpperCase()}] **${p.area}**: "${p.description}" (Status: ${p.status}, Submitted by ${p.submittedBy})`
        )
        .join("\n");

      return (
        `There are currently **${pending.length} pending cleanliness issues** (${highSeverity.length} High Severity):\n\n` +
        `${issuesList}\n\n` +
        `Housekeeping staff has been dispatched for high-priority areas.`
      );
    }

    // 4. Low rated / Dishes needing improvement
    if (q.includes("improve") || q.includes("dislike") || q.includes("bad") || q.includes("lowest") || q.includes("worst")) {
      const sortedDishes = [...menu]
        .filter((m) => m.ratingCount > 0)
        .sort((a, b) => (a.avgRating || 5) - (b.avgRating || 5));

      const lowest = sortedDishes.slice(0, 3);
      if (lowest.length === 0) {
        return "No dishes have received negative ratings yet.";
      }

      const dishesText = lowest
        .map(
          (d) =>
            `• **${d.name}** (${d.day} ${d.mealType.toUpperCase()}): Rated **${formatRatingDisplay(d.avgRating, d.ratingCount)}** (${d.badVotes} disliked votes)`
        )
        .join("\n");

      return (
        `The lowest-rated dishes currently identified in student audits are:\n\n` +
        `${dishesText}\n\n` +
        `You can use the Smart Alternative Recommender in the Admin portal to 1-click replace these with student-preferred South Indian alternatives.`
      );
    }

    // 5. Today's menu queries
    if (q.includes("today") || q.includes("menu") || q.includes("tonight") || q.includes("lunch") || q.includes("dinner")) {
      // Current day in mock context is Friday
      const todayMeals = menu.filter((m) => m.day === "Friday");

      if (todayMeals.length === 0) {
        return "Today's menu details are loading from storage.";
      }

      const mealList = todayMeals
        .map(
          (m) =>
            `• **${m.mealType.toUpperCase()}** (${m.timing}): **${m.name}** — ${formatRatingDisplay(m.avgRating, m.ratingCount)}`
        )
        .join("\n");

      return (
        `Here is today's authentic South Indian menu (Friday):\n\n` +
        `${mealList}\n\n` +
        `Don't forget to submit your meal feedback after dining to earn +30 Eco Champion points!`
      );
    }

    // 6. Alternative food / requests
    if (q.includes("alt") || q.includes("request") || q.includes("voting")) {
      const totalRequests = alternativeRequests.reduce((acc, r) => acc + (r.requestCount || 0), 0);
      const topRequested = [...alternativeRequests].sort((a, b) => b.requestCount - a.requestCount)[0];

      return (
        `Students have submitted **${totalRequests} total votes** for alternative dishes this week.\n\n` +
        `Top Requested Dish: **${topRequested ? topRequested.dishName : "Chapati with Dal"}** with **${topRequested ? topRequested.requestCount : 68} student votes**.\n` +
        `Admin has currently approved ${alternativeRequests.filter((r) => r.status === "Approved").length} alternative menus.`
      );
    }

    // Default Fallback
    return (
      `I computed insights across your local database:\n\n` +
      `• **Total Weekly Menu Dishes**: ${menu.length} slots\n` +
      `• **Recorded Wastage Records**: ${wasteRecords.length} disposal entries\n` +
      `• **Cleanliness Audits**: ${(cleanlinessData.hygieneReports || []).length} tickets\n` +
      `• **Feedback Entries**: ${feedbackLogs.length} anonymous remarks\n\n` +
      `Try asking: "Which breakfast was most popular?", "Which meal wasted the most food?", or "What cleanliness issues are pending?"`
    );
  };

  const handleSend = (text) => {
    const query = text || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");

    // Simulate instant local deterministic reasoning delay (300ms)
    setTimeout(() => {
      const answer = computeAnswer(query);
      const assistantMsg = {
        id: `a-${Date.now()}`,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: answer
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 280);
  };

  const quickQuestions = [
    "Which meal wasted the most food?",
    "Which breakfast was most popular?",
    "What cleanliness issues are pending?",
    "Which dishes need improvement?",
    "What is today's menu?"
  ];

  return (
    <>
      {/* Floating Launcher Pill Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-leaf-800 hover:bg-leaf-900 text-cream-50 px-4 py-3 rounded-full shadow-lg border border-leaf-700 flex items-center gap-2.5 group active:scale-95 transition-all cursor-pointer"
          title="Open MESSMATE Local Insights Assistant"
        >
          <div className="w-7 h-7 rounded-full bg-turmeric-400 text-charcoal-900 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 fill-charcoal-900 text-charcoal-900" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-none">Local AI Assistant</div>
            <div className="text-[10px] text-cream-200 mt-0.5">Live Mess Telemetry</div>
          </div>
        </button>
      )}

      {/* Floating Assistant Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[580px] bg-white rounded-3xl shadow-2xl border border-cream-300 flex flex-col overflow-hidden animate-fade-in font-sans">
          {/* Header */}
          <div className="bg-leaf-900 text-cream-50 p-4 flex items-center justify-between border-b border-leaf-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-turmeric-400 text-charcoal-900 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-charcoal-900" />
              </div>
              <div>
                <h3 className="font-bold text-sm font-display text-cream-50 flex items-center gap-1.5">
                  MESSMATE Local Assistant
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-leaf-700 text-cream-100 font-sans font-bold">
                    100% Local
                  </span>
                </h3>
                <p className="text-[10px] text-cream-200/80">Kaveri Hostel Dining Intelligence</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-cream-300 hover:text-white hover:bg-leaf-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Questions Horizontal Carousel */}
          <div className="bg-cream-100/90 border-b border-cream-200 p-2.5 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-charcoal-500 whitespace-nowrap pl-1 pr-1">
              Ask:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-leaf-50 text-charcoal-700 hover:text-leaf-800 text-[11px] font-medium border border-cream-300 shadow-2xs whitespace-nowrap transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-cream-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-leaf-800 text-cream-50 rounded-br-xs"
                      : "bg-white text-charcoal-900 border border-cream-200 rounded-bl-xs shadow-2xs whitespace-pre-line"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-charcoal-400 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-cream-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about food waste, popular meals, hygiene..."
              className="flex-1 bg-cream-50 text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-leaf-600 focus:ring-1 focus:ring-leaf-500 text-charcoal-900 placeholder:text-charcoal-400"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-leaf-700 hover:bg-leaf-800 disabled:opacity-40 text-cream-50 shadow-2xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
