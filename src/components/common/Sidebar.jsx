import React from "react";
import {
  LayoutDashboard,
  Clock,
  Calendar,
  MessageSquare,
  UtensilsCrossed,
  Trash2,
  ShieldCheck,
  Award,
  BarChart3,
  Calculator,
  FileText,
  X,
  ChefHat,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

export function Sidebar({
  activeSection = "dashboard",
  onSelectSection,
  currentRole = "student",
  onSwitchRole,
  studentProfile,
  cleanlinessData = {},
  alternativeRequests = [],
  feedbackLogs = [],
  isMobileOpen = false,
  onCloseMobile
}) {
  // Pending high severity issues
  const unresolvedHygiene = (cleanlinessData?.hygieneReports || []).filter(
    (r) => r.severity === "High" && r.status !== "Resolved"
  ).length;

  const pendingAlternatives = alternativeRequests.filter((a) => a.status === "Pending").length;

  const navGroups = [
    {
      group: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "today", label: "Today's Mess", icon: Clock }
      ]
    },
    {
      group: "MEAL MANAGEMENT",
      items: [
        { id: "menu", label: "Weekly Menu", icon: Calendar },
        { id: "feedback", label: "Meal Feedback", icon: MessageSquare, badge: feedbackLogs.length > 0 ? feedbackLogs.length : null },
        { id: "alternatives", label: "Alternative Requests", icon: UtensilsCrossed, badge: pendingAlternatives > 0 ? pendingAlternatives : null }
      ]
    },
    {
      group: "SUSTAINABILITY",
      items: [
        { id: "waste", label: "Food Waste Intelligence", icon: Trash2 },
        {
          id: "cleanliness",
          label: "Cleanliness Monitoring",
          icon: ShieldCheck,
          badge: unresolvedHygiene > 0 ? `${unresolvedHygiene} Alert` : null,
          badgeStyle: "bg-terracotta text-white"
        },
        { id: "eco", label: "Eco Champion", icon: Award }
      ]
    },
    {
      group: "ANALYTICS",
      items: [
        { id: "heatmap", label: "Satisfaction Analytics", icon: BarChart3 },
        { id: "demand", label: "Food Demand Predictor", icon: Calculator },
        { id: "reports", label: "Reports", icon: FileText }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-charcoal-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-charcoal-800 text-charcoal-100 border-r border-charcoal-700/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Top Brand Banner */}
          <div className="h-16 px-5 border-b border-charcoal-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center text-ivory font-bold border border-forest-600 shadow-2xs">
                <span className="font-display font-black text-sm">M</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display font-bold text-sm tracking-tight text-ivory">
                    MESSMATE
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-charcoal-700 text-mustard border border-charcoal-600">
                    Hostel Ops
                  </span>
                </div>
                <p className="text-[10px] text-charcoal-400 mt-1 font-mono tracking-tight">
                  Kaveri Dining • Block B
                </p>
              </div>
            </div>

            {/* Close button for mobile drawer */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-md text-charcoal-400 hover:text-white hover:bg-charcoal-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Role Mode Banner */}
          <div className="px-4 py-2.5 bg-charcoal-900/50 border-b border-charcoal-700/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${currentRole === "student" ? "bg-sage" : "bg-mustard"}`} />
              <span className="text-[11px] font-semibold text-charcoal-300">
                {currentRole === "student" ? "Student Workspace" : "Mess Administration"}
              </span>
            </div>
            <button
              onClick={() => onSwitchRole(currentRole === "student" ? "admin" : "student")}
              className="text-[10px] font-bold uppercase tracking-wider text-mustard hover:text-white transition-colors"
            >
              Switch &rarr;
            </button>
          </div>

          {/* Navigation Links Grouped by Spec */}
          <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-210px)] text-xs">
            {navGroups.map((group) => (
              <div key={group.group}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 px-3 py-1.5">
                  {group.group}
                </div>
                <div className="space-y-0.5 mt-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectSection(item.id);
                          if (onCloseMobile) onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                          isActive
                            ? "bg-forest-700 text-ivory font-semibold shadow-2xs border border-forest-600/70"
                            : "text-charcoal-300 hover:text-ivory hover:bg-charcoal-700/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-sage" : "text-charcoal-400"}`} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              item.badgeStyle || "bg-charcoal-700 text-charcoal-200 border border-charcoal-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer: User Identity & Portal Toggle */}
        <div className="p-3 border-t border-charcoal-700/80 bg-charcoal-900/60">
          <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-charcoal-800/80 border border-charcoal-700/50">
            <div className="min-w-0">
              <div className="font-semibold text-ivory truncate text-[11px]">
                {currentRole === "student" ? (studentProfile?.name || "Rahul Sharma") : "K. Subramanian"}
              </div>
              <div className="text-[10px] text-charcoal-400 truncate">
                {currentRole === "student" ? `${studentProfile?.room || "Room B-204"} • 420 pts` : "Chief Mess Warden"}
              </div>
            </div>

            <button
              onClick={() => onSwitchRole(currentRole === "student" ? "admin" : "student")}
              className="p-1.5 rounded bg-charcoal-700 hover:bg-forest-700 text-mustard hover:text-ivory transition-colors shrink-0"
              title={`Switch to ${currentRole === "student" ? "Admin Portal" : "Student Portal"}`}
            >
              {currentRole === "student" ? <ChefHat className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
