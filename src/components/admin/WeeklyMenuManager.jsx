import React, { useState } from "react";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Save,
  Send,
  Upload,
  Image,
  UtensilsCrossed,
  X
} from "lucide-react";
import { Modal } from "../common/Modal";
import { SOUTH_INDIAN_FOOD } from "../../data/foodAssets";
import { formatRatingDisplay } from "../../utils/ratingUtils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["breakfast", "lunch", "snacks", "dinner"];
const CATEGORIES = ["South Indian", "Thali Meals", "Snacks", "Dinner Special", "Special"];

export function WeeklyMenuManager({
  menu = [],
  onSaveMenu,
  onPublishMenu,
  lastPublished
}) {
  const [activeDay, setActiveDay] = useState("Monday");
  const [workingMenu, setWorkingMenu] = useState(menu);
  const [editModalItem, setEditModalItem] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Sync workingMenu if parent menu changes
  React.useEffect(() => {
    setWorkingMenu(menu);
  }, [menu]);

  // Filter items for current active day
  const dayMeals = workingMenu.filter((m) => m.day === activeDay);

  // Open modal to add a new food item
  const handleAddNewItem = () => {
    setIsNewItem(true);
    setEditModalItem({
      id: `m-custom-${Date.now()}`,
      day: activeDay,
      dayIndex: DAYS.indexOf(activeDay) + 1,
      mealType: "lunch",
      name: "",
      description: "",
      timing: "12:30 PM - 02:30 PM",
      category: "South Indian",
      imageUrl: SOUTH_INDIAN_FOOD.meals_thali,
      avgRating: 0,
      ratingCount: 0,
      goodVotes: 0,
      badVotes: 0,
      alternativeDishes: [{ id: `alt-${Date.now()}`, name: "Curd Rice with Pickle", count: 0 }],
      isAvailable: true
    });
  };

  // Open modal to edit existing food item
  const handleEditItem = (item) => {
    setIsNewItem(false);
    setEditModalItem({ ...item, alternativeDishes: [...(item.alternativeDishes || [])] });
  };

  // Delete an item
  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this meal item from the weekly menu?")) {
      const updated = workingMenu.filter((m) => m.id !== id);
      setWorkingMenu(updated);
      onSaveMenu(updated);
    }
  };

  // Save changes from modal
  const handleSaveModalItem = (e) => {
    e.preventDefault();
    if (!editModalItem.name.trim()) return;

    let updated;
    if (isNewItem) {
      updated = [...workingMenu, editModalItem];
    } else {
      updated = workingMenu.map((m) => (m.id === editModalItem.id ? editModalItem : m));
    }

    setWorkingMenu(updated);
    onSaveMenu(updated);
    setEditModalItem(null);
  };

  // Publish to Student Portal
  const handlePublish = () => {
    onPublishMenu(workingMenu);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
            <Calendar className="w-4 h-4 text-leaf-700" />
            <span>Official Menu Administration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            Weekly South Indian Menu Manager
          </h2>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Configure South Indian tiffins, thalis, meal timings, alternatives & publish live updates to the student portal.
          </p>
        </div>

        {/* Action Buttons: Save & Publish */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddNewItem}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-cream-300 hover:bg-cream-100 text-charcoal-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4 text-leaf-700" />
            <span>Add Dish</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs active:scale-98 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Publish Weekly Menu</span>
          </button>
        </div>
      </div>

      {/* Publish confirmation alert */}
      {publishSuccess && (
        <div className="p-4 rounded-2xl bg-leaf-50 border border-leaf-300 text-leaf-900 flex items-center justify-between animate-fade-in shadow-2xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-leaf-700 shrink-0" />
            <div>
              <div className="font-bold text-sm font-display">Weekly Menu Published Successfully!</div>
              <p className="text-xs text-leaf-800">
                All South Indian dishes and timing changes are now visible live on the Student Portal.
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-leaf-800">Just now</span>
        </div>
      )}

      {/* Day Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {DAYS.map((day) => {
          const isSelected = activeDay === day;
          const count = workingMenu.filter((m) => m.day === day).length;

          return (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? "bg-leaf-700 text-cream-50 border-leaf-700 shadow-xs"
                  : "bg-white border-cream-200 hover:border-leaf-300 text-charcoal-700"
              }`}
            >
              <div className="text-xs font-bold font-display">{day}</div>
              <div className={`text-[10px] mt-0.5 ${isSelected ? "text-cream-200" : "text-charcoal-400"}`}>
                {count} Courses
              </div>
            </button>
          );
        })}
      </div>

      {/* Meals Table / Cards for Selected Day */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-charcoal-900">
            {activeDay}'s Scheduled Menu ({dayMeals.length} Items)
          </h3>
          <span className="text-xs text-charcoal-500">
            Last Published: {lastPublished ? new Date(lastPublished).toLocaleDateString() : "Active"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {dayMeals.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-cream-200 shadow-2xs hover:shadow-xs transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border border-cream-200"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cream-100 text-charcoal-700 border border-cream-200">
                        {item.mealType}
                      </span>
                      <h4 className="text-sm font-bold font-display text-charcoal-900 mt-1 line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-charcoal-500 mt-0.5">
                        <Clock className="w-3 h-3 text-charcoal-400" />
                        <span>{item.timing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-leaf-700 hover:bg-cream-100 transition-colors cursor-pointer"
                      title="Edit Item"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-terracotta-700 hover:bg-terracotta-50 transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-charcoal-600 line-clamp-2 mb-3">
                  {item.description}
                </p>

                {/* Alternatives */}
                <div className="bg-cream-50/70 rounded-xl p-2.5 text-xs space-y-1 border border-cream-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block">
                    Alternatives Configured ({item.alternativeDishes?.length || 0})
                  </span>
                  {item.alternativeDishes?.map((alt) => (
                    <div key={alt.id} className="text-charcoal-700 truncate">
                      • {alt.name} ({alt.count || 0} req)
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom stats & Availability (RULE 2: MUST ALWAYS SHOW COUNT BESIDE AVERAGE) */}
              <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-leaf-800">
                  {formatRatingDisplay(item.avgRating, item.ratingCount)}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.isAvailable ? "bg-leaf-100 text-leaf-800 border border-leaf-300" : "bg-terracotta-100 text-terracotta-800 border border-terracotta-300"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Meal Modal */}
      {editModalItem && (
        <Modal
          isOpen={Boolean(editModalItem)}
          onClose={() => setEditModalItem(null)}
          title={isNewItem ? "Add New South Indian Dish" : "Edit Dish Information"}
          subtitle="Configure dish names, timings, categories and backup alternatives"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSaveModalItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Day */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Day of Week</label>
                <select
                  value={editModalItem.day}
                  onChange={(e) => setEditModalItem({ ...editModalItem, day: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Meal Slot */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Meal Slot</label>
                <select
                  value={editModalItem.mealType}
                  onChange={(e) => setEditModalItem({ ...editModalItem, mealType: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white uppercase font-bold"
                >
                  {MEAL_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dish Name */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Dish Name</label>
              <input
                type="text"
                required
                value={editModalItem.name}
                onChange={(e) => setEditModalItem({ ...editModalItem, name: e.target.value })}
                placeholder="e.g. Masala Dosa with Coconut Chutney & Sambar"
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>

            {/* Serving Timing & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Serving Timing Window</label>
                <input
                  type="text"
                  required
                  value={editModalItem.timing}
                  onChange={(e) => setEditModalItem({ ...editModalItem, timing: e.target.value })}
                  placeholder="e.g. 07:30 AM - 09:30 AM"
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">Category</label>
                <select
                  value={editModalItem.category}
                  onChange={(e) => setEditModalItem({ ...editModalItem, category: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={editModalItem.description}
                onChange={(e) => setEditModalItem({ ...editModalItem, description: e.target.value })}
                placeholder="Crispy fermented rice-lentil crepe filled with spiced potato masala..."
                className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-cream-200">
              <button
                type="button"
                onClick={() => setEditModalItem(null)}
                className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-600 hover:bg-cream-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
