import React, { useState } from "react";
import { StudentDashboard } from "./StudentDashboard";
import { StudentMenuCalendar } from "./StudentMenuCalendar";
import { CleanlinessSection } from "./CleanlinessSection";
import { AlternativeFoodHub } from "./AlternativeFoodHub";
import { GamificationHistory } from "./GamificationHistory";
import { MealRatingModal } from "./MealRatingModal";
import { AlternativeFoodModal } from "./AlternativeFoodModal";
import { FoodSatisfactionHeatmap } from "../common/FoodSatisfactionHeatmap";
import { getTranslation } from "../../utils/i18n";
import {
  Utensils,
  Calendar,
  Sparkles,
  ShieldCheck,
  Trophy,
  History,
  HeartHandshake
} from "lucide-react";

export function StudentPortal({
  menu,
  announcements,
  cleanlinessData,
  studentProfile,
  studentRatings,
  pointsHistory,
  feedbackLogs,
  alternativeRequests,
  onRateMeal,
  onRateArea,
  onSubmitHygieneReport,
  onRequestAlternative,
  demoBypass,
  selectedLang = "en"
}) {
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'calendar' | 'cleanliness' | 'alternatives' | 'history' | 'heatmap'
  const [ratingModalMeal, setRatingModalMeal] = useState(null);
  const [altModalMeal, setAltModalMeal] = useState(null);

  const tabs = [
    { id: "dashboard", label: getTranslation(selectedLang, "todaysMeals"), icon: Utensils },
    { id: "calendar", label: getTranslation(selectedLang, "weeklyMenu"), icon: Calendar },
    { id: "cleanliness", label: getTranslation(selectedLang, "hygieneCleanliness"), icon: ShieldCheck },
    { id: "alternatives", label: getTranslation(selectedLang, "altFoodHub"), icon: HeartHandshake },
    { id: "history", label: getTranslation(selectedLang, "pointsActivity"), icon: Trophy },
    { id: "heatmap", label: getTranslation(selectedLang, "satisfactionHeatmap"), icon: Sparkles }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Student Navigation Pill Bar */}
      <div className="bg-white rounded-2xl p-2 border border-cream-200 shadow-2xs flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-leaf-700 text-cream-50 shadow-xs"
                    : "text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cream-100" : "text-charcoal-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Small Student Profile Chip */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cream-50 border border-cream-200 text-xs font-semibold text-charcoal-700">
          <div className="w-2 h-2 rounded-full bg-leaf-600 animate-pulse" />
          <span>{studentProfile?.name}</span>
          <span className="text-charcoal-400">({studentProfile?.room})</span>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "dashboard" && (
        <StudentDashboard
          menu={menu}
          announcements={announcements}
          studentProfile={studentProfile}
          studentRatings={studentRatings}
          onRateMeal={(meal) => setRatingModalMeal(meal)}
          onRequestAlternative={(meal) => setAltModalMeal(meal)}
          onNavigateTab={(tab) => setActiveTab(tab)}
          demoBypass={demoBypass}
          selectedLang={selectedLang}
        />
      )}

      {activeTab === "calendar" && (
        <StudentMenuCalendar
          menu={menu}
          studentRatings={studentRatings}
          onRateMeal={(meal) => setRatingModalMeal(meal)}
          onRequestAlternative={(meal) => setAltModalMeal(meal)}
          demoBypass={demoBypass}
        />
      )}

      {activeTab === "cleanliness" && (
        <CleanlinessSection
          cleanlinessData={cleanlinessData}
          onRateArea={onRateArea}
          onSubmitReport={onSubmitHygieneReport}
        />
      )}

      {activeTab === "alternatives" && (
        <AlternativeFoodHub
          menu={menu}
          alternativeRequests={alternativeRequests}
          onRequestAlternative={(mealId, dishName) => onRequestAlternative(mealId, dishName)}
        />
      )}

      {activeTab === "history" && (
        <GamificationHistory
          studentProfile={studentProfile}
          pointsHistory={pointsHistory}
          studentRatings={studentRatings}
          feedbackLogs={feedbackLogs}
          alternativeRequests={alternativeRequests}
          hygieneReports={cleanlinessData?.hygieneReports || []}
        />
      )}

      {activeTab === "heatmap" && (
        <FoodSatisfactionHeatmap
          menu={menu}
          title={
            selectedLang === "kn"
              ? "ವಾರದ ಆಹಾರ ತೃಪ್ತಿ ಹೀಟ್‌ಮ್ಯಾಪ್ (28 ಊಟದ ಸ್ಲಾಟ್‌ಗಳು)"
              : selectedLang === "hi"
              ? "साप्ताहिक भोजन संतुष्टि हीटमैप (28 भोजन स्लॉट)"
              : "Student Weekly Food Satisfaction Heatmap (28 Meal Slots)"
          }
        />
      )}

      {/* Modals */}
      <MealRatingModal
        isOpen={Boolean(ratingModalMeal)}
        onClose={() => setRatingModalMeal(null)}
        meal={ratingModalMeal}
        onSubmitRating={onRateMeal}
      />

      <AlternativeFoodModal
        isOpen={Boolean(altModalMeal)}
        onClose={() => setAltModalMeal(null)}
        meal={altModalMeal}
        onSubmitRequest={onRequestAlternative}
      />
    </div>
  );
}
