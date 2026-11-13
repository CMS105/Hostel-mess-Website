import React, { useState } from "react";
import { Megaphone, Plus, Trash2, CheckCircle2, Clock, Calendar, Sparkles } from "lucide-react";
import { Modal } from "../common/Modal";

const CATEGORIES = ["Special Feast", "Menu Update", "Timings Change", "Hygiene", "Green Campus", "General Notice"];
const PRIORITIES = ["Normal", "High", "Critical"];

export function AnnouncementsManager({
  announcements = [],
  onAddAnnouncement,
  onDeleteAnnouncement
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Menu Update",
    priority: "Normal",
    content: "",
    author: "Kaveri Mess Supervisor"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    onAddAnnouncement(formData);
    setIsModalOpen(false);
    setFormData({
      title: "",
      category: "Menu Update",
      priority: "Normal",
      content: "",
      author: "Kaveri Mess Supervisor"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
            <Megaphone className="w-4 h-4 text-leaf-700" />
            <span>Campus Broadcast Feed</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            Mess Notice & Announcements
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Broadcast South Indian special feasts, counter updates, and maintenance schedules directly to student portals.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-4">
        <h3 className="text-base font-bold font-display text-charcoal-900">
          Published Notices ({announcements.length})
        </h3>

        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-5 rounded-2xl bg-cream-50/70 border border-cream-200 hover:border-leaf-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold font-display text-charcoal-900">{ann.title}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cream-200 text-leaf-800 border border-cream-300">
                    {ann.category}
                  </span>
                  {ann.priority === "High" && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
                      High Priority
                    </span>
                  )}
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed max-w-3xl">
                  {ann.content}
                </p>

                <div className="text-[11px] text-charcoal-500 flex items-center gap-3">
                  <span>Author: {ann.author}</span>
                  <span>•</span>
                  <span>Published: {ann.date} {ann.time && `at ${ann.time}`}</span>
                </div>
              </div>

              <button
                onClick={() => onDeleteAnnouncement(ann.id)}
                className="p-2 rounded-xl text-charcoal-400 hover:text-terracotta-700 hover:bg-terracotta-50 transition-colors self-end md:self-center cursor-pointer"
                title="Delete Announcement"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: New Announcement */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Campus Announcement"
          subtitle="Instant broadcast to all hostel residents"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Announcement Title <span className="text-terracotta-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Special Sunday Grand Feast, Counter Timing Extension..."
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-leaf-600 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white cursor-pointer"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Message Content <span className="text-terracotta-600">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Detailed announcement text for student dashboard..."
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-leaf-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Sender Tag / Designation</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-cream-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-600 hover:bg-cream-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs cursor-pointer"
              >
                Broadcast Notice
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
