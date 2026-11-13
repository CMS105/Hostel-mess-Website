import React, { useState } from "react";
import {
  ShieldCheck,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  MapPin,
  Camera,
  Download,
  Filter,
  Check,
  ChevronDown,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Modal } from "../common/Modal";
import { exportCleanlinessReportsCSV } from "../../utils/csvExport";

export function CleanlinessManager({
  cleanlinessData = {},
  onAddInspectionLog,
  onUpdateReportStatus
}) {
  const [activeSubTab, setActiveSubTab] = useState("complaints");
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [selectedReportForAction, setSelectedReportForAction] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const areas = cleanlinessData.areas || {};
  const hygieneReports = cleanlinessData.hygieneReports || [];
  const inspectionLogs = cleanlinessData.inspectionLogs || [];

  // Inspection form
  const [inspectionForm, setInspectionForm] = useState({
    inspector: "K. Subramanian (Mess Warden)",
    location: "Kitchen & Cooking Prep Zone",
    status: "Clean",
    notes: "Steam vessels and dosa tawa sanitized. Cooks wearing hairnets and aprons.",
    correctiveAction: "Routine check verified. High standard maintained."
  });

  // Filter complaints
  const filteredReports = hygieneReports.filter((r) => {
    if (filterSeverity === "all") return true;
    return r.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  // Unresolved high severity
  const highSeverityAlerts = hygieneReports.filter(
    (r) => r.severity === "High" && r.status !== "Resolved"
  );

  const handleCreateInspection = (e) => {
    e.preventDefault();
    onAddInspectionLog(inspectionForm);
    setIsInspectionModalOpen(false);
  };

  const handleUpdateStatus = (reportId, status) => {
    onUpdateReportStatus(reportId, status, adminNoteInput);
    setSelectedReportForAction(null);
    setAdminNoteInput("");
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
            <ShieldCheck className="w-4 h-4 text-leaf-700" />
            <span>Health & Safety Compliance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            Hostel Hygiene & Cleanliness Operations
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Real-time 2-choice student zone audits (👍 Clean / 👎 Needs Attention), incident triage, and staff inspection logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportCleanlinessReportsCSV(hygieneReports)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-cream-300 hover:bg-cream-100 text-charcoal-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-charcoal-500" />
            <span>Export Reports (CSV)</span>
          </button>

          <button
            onClick={() => setIsInspectionModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Staff Inspection</span>
          </button>
        </div>
      </div>

      {/* Prominent Unresolved High-Severity Banner */}
      {highSeverityAlerts.length > 0 && (
        <div className="bg-terracotta-50 border-2 border-terracotta-300 rounded-3xl p-5 shadow-2xs animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-200 text-terracotta-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-display text-terracotta-900">
                  CRITICAL ATTENTION REQUIRED: {highSeverityAlerts.length} High-Severity Student Hygiene Complaint Pending
                </h3>
                <span className="text-xs font-bold bg-terracotta-200 text-terracotta-900 px-2 py-0.5 rounded-md">
                  Immediate Action
                </span>
              </div>
              <div className="mt-2 space-y-2">
                {highSeverityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-white p-3 rounded-xl border border-terracotta-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-charcoal-900">{alert.issueType}</span>
                      <span className="text-charcoal-500 ml-2">@ {alert.location}</span>
                      <p className="text-charcoal-700 mt-0.5">{alert.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedReportForAction(alert)}
                      className="px-3 py-1.5 rounded-lg bg-terracotta-700 text-white font-bold text-xs hover:bg-terracotta-800 cursor-pointer shadow-2xs"
                    >
                      Resolve Ticket
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5 Area Cleanliness Scorecards (SIMPLIFIED 2-CHOICE MODEL) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {[
          { key: "diningHall", label: "Dining Hall", desc: "Floors & Waste Bins" },
          { key: "diningTables", label: "Dining Tables", desc: "Tabletops & Chairs" },
          { key: "drinkingWater", label: "Drinking Water", desc: "Coolers & UV Filters" },
          { key: "kitchenHygiene", label: "Kitchen Area", desc: "Cauldrons & Prep" },
          { key: "washrooms", label: "Washrooms", desc: "Basins & Soap" }
        ].map((item) => {
          const area = areas[item.key] || {};
          const cleanVotes = Number(area.cleanVotes) || 0;
          const needsVotes = Number(area.needsAttentionVotes) || 0;
          const totalVotes = cleanVotes + needsVotes;
          const satisfaction = totalVotes > 0 ? Math.round((cleanVotes / totalVotes) * 100) : (area.satisfactionPct || 80);
          const isWarning = satisfaction < 80;

          return (
            <div
              key={item.key}
              className={`p-4 rounded-2xl border transition-all ${
                isWarning ? "bg-terracotta-50/60 border-terracotta-200" : "bg-white border-cream-200 shadow-2xs"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block truncate">
                {item.label}
              </span>
              <div className="text-2xl font-bold font-display text-charcoal-900 mt-1 flex items-baseline gap-1">
                <span>{satisfaction}%</span>
                <span className="text-xs text-charcoal-500 font-normal">Clean</span>
              </div>
              <div className="text-[11px] text-charcoal-600 mt-1">
                {cleanVotes} 👍 • {needsVotes} 👎 ({totalVotes} audits)
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub Tabs: Student Reports vs Staff Inspection Logs */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cream-200 gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab("complaints")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === "complaints"
                  ? "bg-leaf-700 text-cream-50 shadow-2xs"
                  : "text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-100"
              }`}
            >
              Student Hygiene Tickets ({hygieneReports.length})
            </button>
            <button
              onClick={() => setActiveSubTab("inspections")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === "inspections"
                  ? "bg-leaf-700 text-cream-50 shadow-2xs"
                  : "text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-100"
              }`}
            >
              Official Staff Inspection Logs ({inspectionLogs.length})
            </button>
          </div>

          {activeSubTab === "complaints" && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-charcoal-500 font-medium">Severity:</span>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="text-xs p-1.5 rounded-lg border border-cream-300 bg-cream-50 font-semibold text-charcoal-800 cursor-pointer"
              >
                <option value="all">All Severities</option>
                <option value="high">High Severity Only</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Student Hygiene Tickets */}
        {activeSubTab === "complaints" && (
          <div className="divide-y divide-cream-100">
            {filteredReports.map((report) => {
              const isResolved = report.status === "Resolved";
              const isInProgress = report.status === "In Progress";

              return (
                <div key={report.id} className="py-4 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold bg-cream-100 text-charcoal-800 px-2.5 py-0.5 rounded-md border border-cream-300">
                        {report.id}
                      </span>
                      <span className="text-xs font-bold font-display text-charcoal-900">{report.issueType}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          report.severity === "High"
                            ? "bg-terracotta-100 text-terracotta-800 border border-terracotta-200"
                            : report.severity === "Medium"
                            ? "bg-turmeric-100 text-turmeric-900 border border-turmeric-200"
                            : "bg-leaf-100 text-leaf-800 border border-leaf-200"
                        }`}
                      >
                        {report.severity} Severity
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          isResolved
                            ? "bg-leaf-100 text-leaf-800 border border-leaf-300"
                            : isInProgress
                            ? "bg-turmeric-100 text-turmeric-900 border border-turmeric-300 animate-pulse"
                            : "bg-cream-200 text-charcoal-800"
                        }`}
                      >
                        {report.status}
                      </span>

                      {!isResolved && (
                        <button
                          onClick={() => setSelectedReportForAction(report)}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-charcoal-900 text-cream-50 hover:bg-charcoal-800 cursor-pointer"
                        >
                          Update Status
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-charcoal-700 leading-relaxed">
                    {report.description}
                  </p>

                  <div className="text-[11px] text-charcoal-500 flex items-center justify-between">
                    <span>Location: {report.location} • Anonymous Ref: {report.feedbackId}</span>
                    <span>{report.timestamp}</span>
                  </div>

                  {report.adminNotes && (
                    <div className="p-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-800">
                      <strong>Admin Notes / Corrective Action: </strong> {report.adminNotes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Staff Inspection Logs */}
        {activeSubTab === "inspections" && (
          <div className="divide-y divide-cream-100">
            {inspectionLogs.map((log) => (
              <div key={log.id} className="py-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-display text-charcoal-900">{log.location}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-leaf-100 text-leaf-800 border border-leaf-200">
                      {log.status}
                    </span>
                  </div>
                  <span className="text-charcoal-400 text-[11px]">{log.date}</span>
                </div>
                <p className="text-xs text-charcoal-700">{log.notes}</p>
                <div className="text-[11px] text-leaf-800 font-medium">
                  <strong>Corrective Action: </strong> {log.correctiveAction}
                </div>
                <div className="text-[10px] text-charcoal-400">Inspector: {log.inspector}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: New Staff Inspection */}
      {isInspectionModalOpen && (
        <Modal
          isOpen={isInspectionModalOpen}
          onClose={() => setIsInspectionModalOpen(false)}
          title="Record Staff Hygiene Inspection"
          subtitle="Routine warden or mess secretary cleanliness checklist"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateInspection} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Inspector Name</label>
              <input
                type="text"
                required
                value={inspectionForm.inspector}
                onChange={(e) => setInspectionForm({ ...inspectionForm, inspector: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Location / Zone</label>
              <input
                type="text"
                required
                value={inspectionForm.location}
                onChange={(e) => setInspectionForm({ ...inspectionForm, location: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Status</label>
              <select
                value={inspectionForm.status}
                onChange={(e) => setInspectionForm({ ...inspectionForm, status: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white cursor-pointer"
              >
                <option value="Clean">👍 Clean (Standard Met)</option>
                <option value="Needs Attention">👎 Needs Attention</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Inspection Notes</label>
              <textarea
                rows={2}
                value={inspectionForm.notes}
                onChange={(e) => setInspectionForm({ ...inspectionForm, notes: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Corrective Action Taken</label>
              <textarea
                rows={2}
                value={inspectionForm.correctiveAction}
                onChange={(e) => setInspectionForm({ ...inspectionForm, correctiveAction: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-cream-200">
              <button
                type="button"
                onClick={() => setIsInspectionModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-600 hover:bg-cream-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs cursor-pointer"
              >
                Save Inspection
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Update Complaint Status */}
      {selectedReportForAction && (
        <Modal
          isOpen={Boolean(selectedReportForAction)}
          onClose={() => setSelectedReportForAction(null)}
          title={`Update Complaint Status: ${selectedReportForAction.id}`}
          subtitle={`Issue: ${selectedReportForAction.issueType} at ${selectedReportForAction.location}`}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Admin Corrective Action Notes
              </label>
              <textarea
                rows={3}
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                placeholder="Describe resolution (e.g. deployed plumber, cleaned tables, calibrated dishwasher temperature)..."
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white text-charcoal-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-cream-200">
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedReportForAction.id, "In Progress")}
                className="px-3.5 py-2 rounded-xl bg-turmeric-100 border border-turmeric-300 text-turmeric-900 text-xs font-bold hover:bg-turmeric-200 cursor-pointer"
              >
                Mark In Progress
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedReportForAction.id, "Resolved")}
                className="px-4 py-2 rounded-xl bg-leaf-700 text-cream-50 text-xs font-bold hover:bg-leaf-800 cursor-pointer shadow-2xs"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
