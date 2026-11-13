import React, { useState } from "react";
import { AdminOverview } from "./AdminOverview";
import { WeeklyMenuManager } from "./WeeklyMenuManager";
import { RatingAnalytics } from "./RatingAnalytics";
import { AnonymousFeedbackLogs } from "./AnonymousFeedbackLogs";
import { FoodWasteManager } from "./FoodWasteManager";
import { CleanlinessManager } from "./CleanlinessManager";
import { AlternativeRequestsManager } from "./AlternativeRequestsManager";
import { AnnouncementsManager } from "./AnnouncementsManager";
import { SmartInsights } from "./SmartInsights";
import { ReportsExporter } from "./ReportsExporter";
import { FoodDemandPredictor } from "./FoodDemandPredictor";
import { SmartAlternativeRecommender } from "./SmartAlternativeRecommender";
import {
  LayoutDashboard,
  Calendar,
  Star,
  MessageSquare,
  Trash2,
  ShieldCheck,
  HeartHandshake,
  Megaphone,
  Sparkles,
  FileText,
  Menu,
  X,
  ChefHat,
  Calculator,
  RefreshCw
} from "lucide-react";

export function AdminPortal({
  menu,
  cleanlinessData,
  wasteRecords,
  feedbackLogs,
  alternativeRequests,
  announcements,
  onSaveMenu,
  onPublishMenu,
  lastPublished,
  onAddInspectionLog,
  onUpdateReportStatus,
  onAddWasteRecord,
  onUpdateAlternativeStatus,
  onAddAnnouncement,
  onDeleteAnnouncement,
  onSwitchToStudent,
  onReplaceDish
}) {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Unresolved high severity badge count
  const highSeverityCount = (cleanlinessData?.hygieneReports || []).filter(
    (r) => r.severity === "High" && r.status !== "Resolved"
  ).length;

  const navItems = [
    { id: "overview", label: "Overview Dashboard", icon: LayoutDashboard },
    { id: "demand", label: "Demand & What-If Simulator", icon: Calculator, isHighlight: true },
    { id: "recommender", label: "Smart Dish Alternatives", icon: RefreshCw },
    { id: "menu", label: "Weekly Menu Manager", icon: Calendar },
    { id: "ratings", label: "Rating Analytics", icon: Star },
    { id: "feedback", label: "Anonymous Feedback", icon: MessageSquare, badge: feedbackLogs.length },
    { id: "waste", label: "Food Waste Manager", icon: Trash2 },
    {
      id: "cleanliness",
      label: "Hygiene & Cleanliness",
      icon: ShieldCheck,
      badge: highSeverityCount > 0 ? highSeverityCount : null,
      badgeColor: "bg-terracotta-600 text-white"
    },
    { id: "alternatives", label: "Alternative Requests", icon: HeartHandshake, badge: alternativeRequests.length },
    { id: "announcements", label: "Mess Announcements", icon: Megaphone },
    { id: "insights", label: "Smart Mess Insights", icon: Sparkles, isHighlight: true },
    { id: "reports", label: "Reports & CSV Export", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col lg:flex-row">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-charcoal-900 text-cream-50 p-4 flex items-center justify-between border-b border-charcoal-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-leaf-700 flex items-center justify-center font-bold">
            <ChefHat className="w-5 h-5 text-cream-50" />
          </div>
          <div>
            <span className="font-bold font-display text-sm tracking-tight text-cream-50">MESSMATE</span>
            <span className="text-[10px] text-cream-300 block -mt-0.5">Admin Command Center</span>
          </div>
        </div>

        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 rounded-lg bg-charcoal-800 text-cream-200 cursor-pointer"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-charcoal-900 text-cream-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col justify-between border-r border-charcoal-800 shadow-xl ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="p-6 border-b border-charcoal-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-leaf-700 flex items-center justify-center text-cream-50 shadow-2xs">
                <ChefHat className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-bold font-display text-lg text-cream-50 tracking-tight">MESSMATE</span>
                <span className="text-[10px] uppercase font-bold text-turmeric-400 tracking-wider block">
                  Kaveri Hostel Admin
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden text-cream-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 px-3 py-2">
              Operations Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-leaf-700 text-cream-50 shadow-xs"
                      : item.isHighlight
                      ? "text-turmeric-300 hover:bg-charcoal-800 hover:text-turmeric-200"
                      : "text-cream-300 hover:text-cream-50 hover:bg-charcoal-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-cream-50" : "text-cream-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.2 rounded-full ${
                        item.badgeColor || "bg-charcoal-800 text-cream-200 border border-charcoal-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Persona info */}
        <div className="p-4 border-t border-charcoal-800 bg-charcoal-950/60">
          <div className="flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-cream-50">Chief Mess Warden</div>
              <div className="text-[11px] text-cream-400">Hostel Ops • Kaveri Hall</div>
            </div>
            <button
              onClick={onSwitchToStudent}
              className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-turmeric-300 text-[11px] font-bold cursor-pointer border border-charcoal-700"
              title="Preview Student Portal"
            >
              Student View
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeSection === "overview" && (
          <AdminOverview
            menu={menu}
            cleanlinessData={cleanlinessData}
            wasteRecords={wasteRecords}
            feedbackLogs={feedbackLogs}
            alternativeRequests={alternativeRequests}
            onNavigateSection={(sec) => setActiveSection(sec)}
          />
        )}

        {activeSection === "demand" && (
          <FoodDemandPredictor />
        )}

        {activeSection === "recommender" && (
          <SmartAlternativeRecommender
            menu={menu}
            feedbackLogs={feedbackLogs}
            onReplaceDish={onReplaceDish}
          />
        )}

        {activeSection === "menu" && (
          <WeeklyMenuManager
            menu={menu}
            onSaveMenu={onSaveMenu}
            onPublishMenu={onPublishMenu}
            lastPublished={lastPublished}
          />
        )}

        {activeSection === "ratings" && (
          <RatingAnalytics menu={menu} />
        )}

        {activeSection === "feedback" && (
          <AnonymousFeedbackLogs feedbackLogs={feedbackLogs} />
        )}

        {activeSection === "waste" && (
          <FoodWasteManager
            wasteRecords={wasteRecords}
            onAddRecord={onAddWasteRecord}
          />
        )}

        {activeSection === "cleanliness" && (
          <CleanlinessManager
            cleanlinessData={cleanlinessData}
            onAddInspectionLog={onAddInspectionLog}
            onUpdateReportStatus={onUpdateReportStatus}
          />
        )}

        {activeSection === "alternatives" && (
          <AlternativeRequestsManager
            alternativeRequests={alternativeRequests}
            onUpdateStatus={onUpdateAlternativeStatus}
          />
        )}

        {activeSection === "announcements" && (
          <AnnouncementsManager
            announcements={announcements}
            onAddAnnouncement={onAddAnnouncement}
            onDeleteAnnouncement={onDeleteAnnouncement}
          />
        )}

        {activeSection === "insights" && (
          <SmartInsights
            menu={menu}
            cleanlinessData={cleanlinessData}
            wasteRecords={wasteRecords}
            alternativeRequests={alternativeRequests}
            feedbackLogs={feedbackLogs}
          />
        )}

        {activeSection === "reports" && (
          <ReportsExporter
            menu={menu}
            cleanlinessData={cleanlinessData}
            wasteRecords={wasteRecords}
            feedbackLogs={feedbackLogs}
          />
        )}
      </main>
    </div>
  );
}
