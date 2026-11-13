import React, { useState } from "react";
import {
  HeartHandshake,
  CheckCircle2,
  XCircle,
  Clock,
  PlusCircle,
  ThumbsUp,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Modal } from "../common/Modal";

export function AlternativeRequestsManager({
  alternativeRequests = [],
  onUpdateStatus,
  onAddAlternativeToMenu
}) {
  const [rejectModalItem, setRejectModalItem] = useState(null);
  const [rejectExplanation, setRejectExplanation] = useState("");

  const handleAccept = (item) => {
    onUpdateStatus(item.id, "Accepted", "Approved for auxiliary meal counter.", true);
  };

  const handleMarkPlanned = (item) => {
    onUpdateStatus(item.id, "Planned", "Included in next week's menu review.", false);
  };

  const handleOpenReject = (item) => {
    setRejectModalItem(item);
    setRejectExplanation("");
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectExplanation.trim()) return;

    onUpdateStatus(
      rejectModalItem.id,
      "Rejected",
      rejectExplanation.trim(),
      false
    );
    setRejectModalItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
            <HeartHandshake className="w-4 h-4 text-leaf-700" />
            <span>Student Food Democracy Queue</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            Alternative Food Requests Management
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Review aggregated backup South Indian meal preferences, authorize auxiliary counters, or integrate into weekly rotations.
          </p>
        </div>
      </div>

      {/* Requests Table / Cards */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-4">
        <h3 className="text-base font-bold font-display text-charcoal-900">
          Student Alternative Requests Queue ({alternativeRequests.length})
        </h3>

        <div className="space-y-4">
          {alternativeRequests.map((req) => {
            const isAccepted = req.status === "Accepted";
            const isRejected = req.status === "Rejected";
            const isPlanned = req.status === "Planned";
            const isPending = req.status === "Pending";

            return (
              <div
                key={req.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isAccepted
                    ? "bg-leaf-50/50 border-leaf-200"
                    : isRejected
                    ? "bg-terracotta-50/50 border-terracotta-200"
                    : "bg-cream-50/70 border-cream-200"
                } flex flex-col md:flex-row md:items-center justify-between gap-4`}
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-base font-bold font-display text-charcoal-900">
                      {req.requestedDish}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isAccepted
                          ? "bg-leaf-100 text-leaf-800 border border-leaf-300"
                          : isPlanned
                          ? "bg-turmeric-100 text-turmeric-900 border border-turmeric-300"
                          : isRejected
                          ? "bg-terracotta-100 text-terracotta-800 border border-terracotta-300"
                          : "bg-cream-200 text-charcoal-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal-600 mt-1">
                    Requested as alternative for: <strong className="text-charcoal-800">{req.mealName}</strong> • Date: {req.date}
                  </p>

                  {req.adminNotes && (
                    <div className="mt-2 text-xs text-charcoal-700 bg-white p-2 rounded-lg border border-cream-200 inline-block">
                      <strong>Admin Resolution:</strong> {req.adminNotes}
                    </div>
                  )}
                </div>

                {/* Right: Vote count & Action buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="text-right sm:text-center sm:px-4">
                    <span className="text-xl font-bold font-display text-leaf-800">
                      {req.requestCount}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-charcoal-500 block -mt-1">
                      Student Votes
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isAccepted && (
                      <button
                        onClick={() => handleAccept(req)}
                        className="px-3.5 py-2 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                    )}

                    {!isPlanned && !isAccepted && (
                      <button
                        onClick={() => handleMarkPlanned(req)}
                        className="px-3.5 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-900 text-cream-50 text-xs font-bold shadow-2xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Plan</span>
                      </button>
                    )}

                    {!isRejected && (
                      <button
                        onClick={() => handleOpenReject(req)}
                        className="px-3.5 py-2 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-800 text-xs font-bold border border-terracotta-200 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reject Explanation Modal */}
      {rejectModalItem && (
        <Modal
          isOpen={Boolean(rejectModalItem)}
          onClose={() => setRejectModalItem(null)}
          title={`Reject Alternative Request: ${rejectModalItem.requestedDish}`}
          subtitle="A polite explanation will be displayed to students in the demo log"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleConfirmReject} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Reason for Rejection <span className="text-terracotta-600">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={rejectExplanation}
                onChange={(e) => setRejectExplanation(e.target.value)}
                placeholder="e.g. Insufficient kitchen prep capacity, ingredients out of stock..."
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-terracotta-500 bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-cream-200">
              <button
                type="button"
                onClick={() => setRejectModalItem(null)}
                className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-600 hover:bg-cream-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-terracotta-700 hover:bg-terracotta-800 text-cream-50 text-xs font-bold shadow-2xs cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
