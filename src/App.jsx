import React, { useState, useEffect } from "react";
import { RoleSelector } from "./components/common/RoleSelector";
import { Sidebar } from "./components/common/Sidebar";
import { Navbar } from "./components/common/Navbar";
import { Toast } from "./components/common/Toast";
import { JudgeDemoBar } from "./components/common/JudgeDemoBar";
import { LocalInsightsAssistant } from "./components/common/LocalInsightsAssistant";
import { FoodSatisfactionHeatmap } from "./components/common/FoodSatisfactionHeatmap";

// Student Components
import { StudentDashboard } from "./components/student/StudentDashboard";
import { StudentMenuCalendar } from "./components/student/StudentMenuCalendar";
import { CleanlinessSection } from "./components/student/CleanlinessSection";
import { AlternativeFoodHub } from "./components/student/AlternativeFoodHub";
import { GamificationHistory } from "./components/student/GamificationHistory";
import { MealRatingModal } from "./components/student/MealRatingModal";
import { AlternativeFoodModal } from "./components/student/AlternativeFoodModal";

// Admin Components
import { AdminOverview } from "./components/admin/AdminOverview";
import { WeeklyMenuManager } from "./components/admin/WeeklyMenuManager";
import { RatingAnalytics } from "./components/admin/RatingAnalytics";
import { AnonymousFeedbackLogs } from "./components/admin/AnonymousFeedbackLogs";
import { FoodWasteManager } from "./components/admin/FoodWasteManager";
import { CleanlinessManager } from "./components/admin/CleanlinessManager";
import { AlternativeRequestsManager } from "./components/admin/AlternativeRequestsManager";
import { AnnouncementsManager } from "./components/admin/AnnouncementsManager";
import { SmartInsights } from "./components/admin/SmartInsights";
import { ReportsExporter } from "./components/admin/ReportsExporter";
import { FoodDemandPredictor } from "./components/admin/FoodDemandPredictor";
import { SmartAlternativeRecommender } from "./components/admin/SmartAlternativeRecommender";

import {
  initializeStorage,
  resetDemoData,
  getWeeklyMenu,
  saveWeeklyMenu,
  publishWeeklyMenu,
  getMenuLastPublished,
  getStudentProfile,
  getStudentRatings,
  submitMealRating,
  getFeedbackLogs,
  getCleanlinessData,
  submitCleanlinessRating,
  submitHygieneReport,
  updateHygieneReportStatus,
  addStaffInspectionLog,
  getFoodWasteRecords,
  addFoodWasteRecord,
  getAlternativeRequests,
  submitAlternativeRequest,
  updateAlternativeRequestStatus,
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  getPointsHistory,
  getSystemSettings,
  updateSystemSettings,
  replaceMealDish,
  loadJudgePresetScenario
} from "./utils/storage";

const SECTION_TITLES = {
  dashboard: "Overview Dashboard",
  today: "Today's Mess Schedule",
  menu: "Weekly Menu Timetable",
  feedback: "Meal Feedback & Ratings",
  alternatives: "Alternative Food Requests",
  waste: "Food Waste Intelligence",
  cleanliness: "Cleanliness & Hygiene Monitoring",
  eco: "Eco Champion Leaderboard",
  heatmap: "Satisfaction Analytics Heatmap",
  demand: "Food Demand Predictor & Simulator",
  reports: "Operations Reports & CSV Export",
  recommender: "Smart Alternative Recommender"
};

export function App() {
  // Current active view & role
  const [currentRole, setCurrentRole] = useState("student"); // 'student' | 'admin' | 'selector'
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Modals
  const [ratingModalMeal, setRatingModalMeal] = useState(null);
  const [altModalMeal, setAltModalMeal] = useState(null);

  // Core Application Data states
  const [menu, setMenu] = useState([]);
  const [lastPublished, setLastPublished] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [studentRatings, setStudentRatings] = useState([]);
  const [cleanlinessData, setCleanlinessData] = useState({});
  const [wasteRecords, setWasteRecords] = useState([]);
  const [feedbackLogs, setFeedbackLogs] = useState([]);
  const [alternativeRequests, setAlternativeRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [demoBypass, setDemoBypass] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      return localStorage.getItem("messmate_lang") || "en";
    } catch {
      return "en";
    }
  });
  const [currentScenario, setCurrentScenario] = useState("standard");

  // Initialize and load all data on mount
  const refreshAllData = () => {
    setMenu(getWeeklyMenu());
    setLastPublished(getMenuLastPublished());
    setStudentProfile(getStudentProfile());
    setStudentRatings(getStudentRatings());
    setCleanlinessData(getCleanlinessData());
    setWasteRecords(getFoodWasteRecords());
    setFeedbackLogs(getFeedbackLogs());
    setAlternativeRequests(getAlternativeRequests());
    setAnnouncements(getAnnouncements());
    setPointsHistory(getPointsHistory());
    const settings = getSystemSettings();
    setDemoBypass(settings.demoModeBypassFuture || false);
  };

  useEffect(() => {
    initializeStorage();
    refreshAllData();

    const handleStorageUpdate = () => {
      refreshAllData();
    };
    window.addEventListener("messmate_storage_update", handleStorageUpdate);
    window.addEventListener("messmate_data_reset", handleStorageUpdate);

    return () => {
      window.removeEventListener("messmate_storage_update", handleStorageUpdate);
      window.removeEventListener("messmate_data_reset", handleStorageUpdate);
    };
  }, []);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Toggle Demo Mode (Strict future lock vs Unlock for testing)
  const handleToggleDemoBypass = () => {
    const updated = !demoBypass;
    setDemoBypass(updated);
    updateSystemSettings({ demoModeBypassFuture: updated });
    showToast(
      "info",
      updated ? "Demo Unlock Active" : "Strict Timing Lock Active",
      updated
        ? "Future meal rating restriction bypassed for hackathon evaluation."
        : "Future meal restriction enabled: only served or active meals can be rated."
    );
  };

  // Reset demo data to pristine mock state
  const handleResetData = () => {
    if (window.confirm("Reset all MESSMATE data back to pristine demo state?")) {
      resetDemoData();
      refreshAllData();
      setCurrentScenario("standard");
      showToast("success", "Demo Data Reset", "Application data restored to initial hackathon defaults.");
    }
  };

  // Language switcher handler
  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    try {
      localStorage.setItem("messmate_lang", lang);
    } catch {}
    showToast(
      "info",
      "Language Updated",
      lang === "kn" ? "ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ" : lang === "hi" ? "हिन्दी भाषा चुनी गई" : "English selected"
    );
  };

  // Judge Scenario Selection
  const handleSelectScenario = (scenarioKey) => {
    setCurrentScenario(scenarioKey);
    const msg = loadJudgePresetScenario(scenarioKey);
    refreshAllData();
    showToast("info", "Scenario Loaded", msg);
  };

  // Rate a meal (RULE 1 & 2 compliant)
  const handleRateMeal = (ratingData) => {
    try {
      const result = submitMealRating(ratingData);
      refreshAllData();
      showToast(
        "success",
        "Evaluation Logged",
        `Thank you for your feedback! Earned +${result.pointsAwarded} participation points.`
      );
    } catch (err) {
      showToast("error", "Error Submitting Rating", err.message);
    }
  };

  // Cleanliness vote & ticket
  const handleRateArea = (areaKey, score) => {
    submitCleanlinessRating(areaKey, score);
    refreshAllData();
    showToast("success", "Zone Audit Logged", "Mess sanitation score updated. +25 participation points awarded.");
  };

  const handleSubmitHygieneReport = (reportData) => {
    const newReport = submitHygieneReport(reportData);
    refreshAllData();
    showToast(
      "success",
      "Hygiene Ticket Created",
      `Anonymous report (${newReport.id}) dispatched to housekeeping. +40 participation points earned!`
    );
  };

  // Alternative food request
  const handleRequestAlternative = (mealId, requestedDishName) => {
    submitAlternativeRequest(mealId, requestedDishName);
    refreshAllData();
    showToast(
      "success",
      "Alternative Vote Recorded",
      `Voted for "${requestedDishName}". Mess supervisor notified. +15 points awarded!`
    );
  };

  // Admin menu save & publish
  const handleSaveMenu = (updatedMenu) => {
    saveWeeklyMenu(updatedMenu);
    setMenu(updatedMenu);
    showToast("info", "Menu Draft Saved", "Changes saved locally in mess draft manager.");
  };

  const handlePublishMenu = (updatedMenu) => {
    publishWeeklyMenu(updatedMenu);
    setMenu(updatedMenu);
    setLastPublished(new Date().toISOString());
    showToast("success", "Weekly Menu Published!", "Changes are now live across all student dashboard screens.");
  };

  // Replace dish live (Feature 3)
  const handleReplaceMealDish = (mealId, newDish) => {
    const updated = replaceMealDish(mealId, newDish);
    refreshAllData();
    showToast(
      "success",
      "Dish Replaced Live!",
      `"${newDish.name}" is now published on the student menu calendar.`
    );
    return updated;
  };

  // Food waste record
  const handleAddWasteRecord = (recordData) => {
    addFoodWasteRecord(recordData);
    refreshAllData();
    showToast("success", "Waste Log Recorded", "Daily disposal record added. Waste metrics re-computed.");
  };

  // Hygiene ticket status update
  const handleUpdateReportStatus = (reportId, status, notes) => {
    updateHygieneReportStatus(reportId, status, notes);
    refreshAllData();
    showToast("success", "Ticket Updated", `Hygiene report ${reportId} marked as ${status}.`);
  };

  // Staff inspection log
  const handleAddInspectionLog = (logData) => {
    addStaffInspectionLog(logData);
    refreshAllData();
    showToast("success", "Inspection Saved", "Official hygiene inspection added to campus audit trail.");
  };

  // Alternative request status update
  const handleUpdateAlternativeStatus = (requestId, status, notes, addToMenu) => {
    updateAlternativeRequestStatus(requestId, status, notes, addToMenu);
    refreshAllData();
    showToast("success", "Request Updated", `Alternative request updated to ${status}.`);
  };

  // Announcements
  const handleAddAnnouncement = (annData) => {
    addAnnouncement(annData);
    refreshAllData();
    showToast("success", "Notice Broadcasted", "Announcement published to student dashboard banner.");
  };

  const handleDeleteAnnouncement = (id) => {
    deleteAnnouncement(id);
    refreshAllData();
    showToast("info", "Announcement Removed", "Notice deleted from feed.");
  };

  // Role Selector View
  if (currentRole === "selector") {
    return <RoleSelector onSelectRole={(role) => setCurrentRole(role)} />;
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal-800 flex flex-col font-sans selection:bg-forest-700 selection:text-white">
      {/* Permanent Vertical Sidebar on Desktop (w-64) */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        currentRole={currentRole}
        onSwitchRole={(role) => setCurrentRole(role)}
        studentProfile={studentProfile}
        cleanlinessData={cleanlinessData}
        alternativeRequests={alternativeRequests}
        feedbackLogs={feedbackLogs}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Offset by lg:pl-64 for permanent desktop sidebar) */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        {/* Judge Demo Preset Bar */}
        <JudgeDemoBar
          onSelectScenario={handleSelectScenario}
          onResetData={handleResetData}
          currentScenario={currentScenario}
        />

        {/* Compact Top Header */}
        <Navbar
          currentRole={currentRole}
          onSwitchRole={(newRole) => setCurrentRole(newRole)}
          onResetData={handleResetData}
          studentProfile={studentProfile}
          demoBypass={demoBypass}
          onToggleDemoBypass={handleToggleDemoBypass}
          selectedLang={selectedLang}
          onLanguageChange={handleLanguageChange}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          announcements={announcements}
          cleanlinessData={cleanlinessData}
          activeSectionTitle={SECTION_TITLES[activeSection] || "Overview"}
        />

        {/* Dynamic Section Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* 1. OVERVIEW: DASHBOARD */}
          {activeSection === "dashboard" && (
            currentRole === "student" ? (
              <StudentDashboard
                menu={menu}
                announcements={announcements}
                studentProfile={studentProfile}
                studentRatings={studentRatings}
                onRateMeal={(meal) => setRatingModalMeal(meal)}
                onRequestAlternative={(meal) => setAltModalMeal(meal)}
                onNavigateTab={(sec) => setActiveSection(sec)}
                demoBypass={demoBypass}
                selectedLang={selectedLang}
              />
            ) : (
              <AdminOverview
                menu={menu}
                cleanlinessData={cleanlinessData}
                wasteRecords={wasteRecords}
                feedbackLogs={feedbackLogs}
                alternativeRequests={alternativeRequests}
                onNavigateSection={(sec) => setActiveSection(sec)}
              />
            )
          )}

          {/* 2. OVERVIEW: TODAY'S MESS */}
          {activeSection === "today" && (
            <StudentDashboard
              menu={menu}
              announcements={announcements}
              studentProfile={studentProfile}
              studentRatings={studentRatings}
              onRateMeal={(meal) => setRatingModalMeal(meal)}
              onRequestAlternative={(meal) => setAltModalMeal(meal)}
              onNavigateTab={(sec) => setActiveSection(sec)}
              demoBypass={demoBypass}
              selectedLang={selectedLang}
            />
          )}

          {/* 3. MEAL MANAGEMENT: WEEKLY MENU */}
          {activeSection === "menu" && (
            currentRole === "student" ? (
              <StudentMenuCalendar
                menu={menu}
                studentRatings={studentRatings}
                onRateMeal={(meal) => setRatingModalMeal(meal)}
                onRequestAlternative={(meal) => setAltModalMeal(meal)}
                demoBypass={demoBypass}
              />
            ) : (
              <div className="space-y-6">
                <WeeklyMenuManager
                  menu={menu}
                  onSaveMenu={handleSaveMenu}
                  onPublishMenu={handlePublishMenu}
                  lastPublished={lastPublished}
                />
                <SmartAlternativeRecommender
                  menu={menu}
                  feedbackLogs={feedbackLogs}
                  onReplaceDish={handleReplaceMealDish}
                />
              </div>
            )
          )}

          {/* 4. MEAL MANAGEMENT: MEAL FEEDBACK */}
          {activeSection === "feedback" && (
            currentRole === "student" ? (
              <GamificationHistory
                studentProfile={studentProfile}
                pointsHistory={pointsHistory}
                studentRatings={studentRatings}
                feedbackLogs={feedbackLogs}
                alternativeRequests={alternativeRequests}
                hygieneReports={cleanlinessData?.hygieneReports || []}
              />
            ) : (
              <div className="space-y-6">
                <RatingAnalytics menu={menu} />
                <AnonymousFeedbackLogs feedbackLogs={feedbackLogs} />
              </div>
            )
          )}

          {/* 5. MEAL MANAGEMENT: ALTERNATIVE REQUESTS */}
          {activeSection === "alternatives" && (
            currentRole === "student" ? (
              <AlternativeFoodHub
                menu={menu}
                alternativeRequests={alternativeRequests}
                onRequestAlternative={(mealId, dishName) => handleRequestAlternative(mealId, dishName)}
              />
            ) : (
              <AlternativeRequestsManager
                alternativeRequests={alternativeRequests}
                onUpdateStatus={handleUpdateAlternativeStatus}
              />
            )
          )}

          {/* 6. SUSTAINABILITY: FOOD WASTE INTELLIGENCE */}
          {activeSection === "waste" && (
            <FoodWasteManager
              wasteRecords={wasteRecords}
              onAddRecord={handleAddWasteRecord}
            />
          )}

          {/* 7. SUSTAINABILITY: CLEANLINESS MONITORING */}
          {activeSection === "cleanliness" && (
            currentRole === "student" ? (
              <CleanlinessSection
                cleanlinessData={cleanlinessData}
                onRateArea={handleRateArea}
                onSubmitReport={handleSubmitHygieneReport}
              />
            ) : (
              <CleanlinessManager
                cleanlinessData={cleanlinessData}
                onAddInspectionLog={handleAddInspectionLog}
                onUpdateReportStatus={handleUpdateReportStatus}
              />
            )
          )}

          {/* 8. SUSTAINABILITY: ECO CHAMPION */}
          {activeSection === "eco" && (
            <GamificationHistory
              studentProfile={studentProfile}
              pointsHistory={pointsHistory}
              studentRatings={studentRatings}
              feedbackLogs={feedbackLogs}
              alternativeRequests={alternativeRequests}
              hygieneReports={cleanlinessData?.hygieneReports || []}
            />
          )}

          {/* 9. ANALYTICS: SATISFACTION ANALYTICS / HEATMAP */}
          {activeSection === "heatmap" && (
            <div className="space-y-6">
              <FoodSatisfactionHeatmap menu={menu} title="Weekly 28-Slot Food Satisfaction Matrix" />
              <RatingAnalytics menu={menu} />
            </div>
          )}

          {/* 10. ANALYTICS: FOOD DEMAND PREDICTOR */}
          {activeSection === "demand" && (
            <FoodDemandPredictor />
          )}

          {/* 11. ANALYTICS: REPORTS */}
          {activeSection === "reports" && (
            <ReportsExporter
              menu={menu}
              cleanlinessData={cleanlinessData}
              wasteRecords={wasteRecords}
              feedbackLogs={feedbackLogs}
            />
          )}

          {/* SMART RECOMMENDER (Direct Access) */}
          {activeSection === "recommender" && (
            <SmartAlternativeRecommender
              menu={menu}
              feedbackLogs={feedbackLogs}
              onReplaceDish={handleReplaceMealDish}
            />
          )}
        </main>

        {/* Minimalist Institutional Footer */}
        <footer className="bg-white border-t border-ivory-300 py-4 px-6 text-xs text-charcoal-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold text-forest-700">MESSMATE</span>
            <span>•</span>
            <span>Better Meals. Less Waste. Healthier Communities.</span>
          </div>
          <div className="text-charcoal-400">
            Kaveri Hostel Dining Hall • Block B Operations
          </div>
        </footer>
      </div>

      {/* Global Evaluation Modals */}
      <MealRatingModal
        isOpen={Boolean(ratingModalMeal)}
        onClose={() => setRatingModalMeal(null)}
        meal={ratingModalMeal}
        onSubmitRating={handleRateMeal}
      />

      <AlternativeFoodModal
        isOpen={Boolean(altModalMeal)}
        onClose={() => setAltModalMeal(null)}
        meal={altModalMeal}
        onSubmitRequest={handleRequestAlternative}
      />

      {/* MESSMATE Local Insights Assistant (On-Device AI Assistant) */}
      <LocalInsightsAssistant
        menu={menu}
        wasteRecords={wasteRecords}
        cleanlinessData={cleanlinessData}
        feedbackLogs={feedbackLogs}
        alternativeRequests={alternativeRequests}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
