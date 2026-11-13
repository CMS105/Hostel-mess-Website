import React, { useState } from "react";
import {
  Menu,
  Clock,
  Unlock,
  Lock,
  Globe,
  Bell,
  ChefHat,
  GraduationCap,
  RotateCcw,
  User,
  ShieldAlert,
  Megaphone,
  Check
} from "lucide-react";
import { SUPPORTED_LANGUAGES, getTranslation } from "../../utils/i18n";

export function Navbar({
  currentRole = "student",
  onSwitchRole,
  onResetData,
  studentProfile,
  demoBypass,
  onToggleDemoBypass,
  selectedLang = "en",
  onLanguageChange,
  onOpenMobileSidebar,
  announcements = [],
  cleanlinessData = {},
  activeSectionTitle = "Dashboard"
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const highSeverityCount = (cleanlinessData?.hygieneReports || []).filter(
    (r) => r.severity === "High" && r.status !== "Resolved"
  ).length;
  const totalNotifications = highSeverityCount + Math.min(announcements.length, 3);

  return (
    <header className="sticky top-0 z-30 h-14 bg-ivory/95 backdrop-blur-sm border-b border-ivory-300 text-charcoal-800 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
      {/* Left Area: Mobile Menu + Institutional Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 rounded-md hover:bg-ivory-200 text-charcoal-700 cursor-pointer"
          title="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm text-forest-700 hidden sm:inline">
            MESSMATE
          </span>
          <span className="text-charcoal-300 hidden sm:inline">/</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            {activeSectionTitle}
          </span>
          <span className="hidden xl:inline-block text-[11px] text-charcoal-400 font-normal ml-2 pl-2 border-l border-ivory-300">
            Better Meals. Less Waste. Healthier Communities.
          </span>
        </div>
      </div>

      {/* Right Area: Status, Language, Notifications, Role, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-charcoal-600 font-mono bg-ivory-100 px-2.5 py-1 rounded-md border border-ivory-200">
          <Clock className="w-3.5 h-3.5 text-charcoal-400" />
          <span>{todayFormatted}</span>
        </div>

        {/* Strict Lock vs Demo Mode Toggle */}
        <button
          onClick={onToggleDemoBypass}
          className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md border transition-colors cursor-pointer ${
            demoBypass
              ? "bg-mustard-100 text-mustard-900 border-mustard-300"
              : "bg-forest-50 text-forest-700 border-forest-200"
          }`}
          title={
            demoBypass
              ? "Demo Mode: All meal ratings unlocked for evaluation"
              : "Strict Validation: Future meals are locked until serving time"
          }
        >
          {demoBypass ? (
            <>
              <Unlock className="w-3 h-3 text-mustard-700" />
              <span className="hidden sm:inline">Unlock Active</span>
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 text-forest-700" />
              <span className="hidden sm:inline">Strict Time Lock</span>
            </>
          )}
        </button>

        {/* Language Switcher */}
        <div className="flex items-center bg-ivory-200/80 rounded-md p-0.5 border border-ivory-300">
          <Globe className="w-3 h-3 text-charcoal-500 ml-1.5 mr-1" />
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onLanguageChange && onLanguageChange(lang.code)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? "bg-forest-700 text-ivory font-bold shadow-2xs"
                    : "text-charcoal-600 hover:text-charcoal-900"
                }`}
                title={`Switch language to ${lang.label}`}
              >
                {lang.native}
              </button>
            );
          })}
        </div>

        {/* Notifications Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded-md text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200 border border-ivory-300 transition-colors relative cursor-pointer"
            title="Campus & Hygiene Notifications"
          >
            <Bell className="w-4 h-4" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[9px] font-bold flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Card */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-ivory-300 p-3 z-50 text-xs animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-ivory-200 font-bold text-charcoal-800">
                <span>Campus Mess Notifications</span>
                <span className="text-[10px] text-charcoal-400 font-normal">Live Feeds</span>
              </div>

              <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                {highSeverityCount > 0 && (
                  <div className="p-2 rounded-lg bg-terracotta-50 border border-terracotta-200 text-terracotta-900 text-[11px]">
                    <div className="font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-terracotta" />
                      <span>{highSeverityCount} Critical Hygiene Alert</span>
                    </div>
                    <p className="mt-0.5 text-charcoal-600">
                      Plumbing or sanitation issue flagged in drinking water area.
                    </p>
                  </div>
                )}

                {announcements.slice(0, 3).map((a) => (
                  <div key={a.id} className="p-2 rounded-lg bg-ivory-50 border border-ivory-200 text-[11px]">
                    <div className="font-semibold text-charcoal-800 flex items-center gap-1">
                      <Megaphone className="w-3 h-3 text-forest-700" />
                      <span>{a.title}</span>
                    </div>
                    <p className="mt-0.5 text-charcoal-500 line-clamp-1">{a.content}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowNotifications(false)}
                className="w-full mt-1 pt-2 border-t border-ivory-200 text-center text-[11px] font-bold text-forest-700 hover:underline cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Student/Admin Switcher Button */}
        <button
          onClick={() => onSwitchRole(currentRole === "student" ? "admin" : "student")}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-forest-700 text-ivory hover:bg-forest-800 transition-colors shadow-2xs cursor-pointer"
          title={`Switch to ${currentRole === "student" ? "Admin Portal" : "Student Portal"}`}
        >
          {currentRole === "student" ? (
            <>
              <ChefHat className="w-3.5 h-3.5 text-mustard" />
              <span className="hidden sm:inline">Admin</span>
            </>
          ) : (
            <>
              <GraduationCap className="w-3.5 h-3.5 text-mustard" />
              <span className="hidden sm:inline">Student</span>
            </>
          )}
        </button>

        {/* Profile Pill */}
        <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-ivory-300 text-xs">
          <div className="w-7 h-7 rounded-md bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-xs border border-forest-200">
            {currentRole === "student" ? "RS" : "KS"}
          </div>
          <div className="text-left leading-tight">
            <div className="font-bold text-charcoal-800 text-[11px]">
              {currentRole === "student" ? (studentProfile?.name || "Rahul Sharma") : "K. Subramanian"}
            </div>
            <div className="text-[10px] text-charcoal-400">
              {currentRole === "student" ? "Room B-204" : "Chief Warden"}
            </div>
          </div>
        </div>

        {/* Reset Data Button */}
        <button
          onClick={onResetData}
          className="p-1.5 rounded-md text-charcoal-400 hover:text-terracotta hover:bg-terracotta-50 border border-ivory-300 transition-colors cursor-pointer"
          title="Reset Demo Data to Initial State"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
