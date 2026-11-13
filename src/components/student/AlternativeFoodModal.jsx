import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { UtensilsCrossed, AlertCircle, Check, Plus, Users, Sparkles } from "lucide-react";

export function AlternativeFoodModal({ isOpen, onClose, meal, onSubmitRequest }) {
  if (!meal) return null;

  const [selectedAlt, setSelectedAlt] = useState(
    meal.alternativeDishes && meal.alternativeDishes.length > 0
      ? meal.alternativeDishes[0].name
      : ""
  );
  const [customDish, setCustomDish] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalDish = isCustomMode ? customDish.trim() : selectedAlt;

    if (!finalDish) {
      setErrorMsg("Please select or enter an alternative dish name.");
      return;
    }

    onSubmitRequest(meal.id, finalDish);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Alternative Dish"
      subtitle={`${meal.day} • ${meal.name}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Important Disclaimer Notice */}
        <div className="bg-cream-100 border border-cream-300 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-terracotta-700 shrink-0 mt-0.5" />
          <div className="text-xs text-charcoal-800 leading-relaxed">
            <span className="font-bold text-charcoal-900">Student Notice: </span>
            Alternative requests are aggregated recommendations reviewed by the mess management committee to prepare auxiliary counters. They are
            <span className="font-bold text-leaf-800"> suggestions and not guaranteed instant substitutions</span>.
          </div>
        </div>

        {/* Existing Alternatives Options */}
        <div>
          <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2.5">
            Select A Pre-Configured Alternative Option
          </label>

          <div className="space-y-2">
            {(meal.alternativeDishes || []).map((alt) => {
              const isSelected = !isCustomMode && selectedAlt === alt.name;

              return (
                <div
                  key={alt.id}
                  onClick={() => {
                    setSelectedAlt(alt.name);
                    setIsCustomMode(false);
                    setErrorMsg("");
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-leaf-50/90 border-leaf-600 shadow-2xs"
                      : "bg-white border-cream-200 hover:border-leaf-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-leaf-700 bg-leaf-700 text-white"
                          : "border-cream-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-semibold text-charcoal-900">{alt.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-charcoal-600 bg-cream-100 px-2.5 py-1 rounded-full font-medium">
                    <Users className="w-3.5 h-3.5 text-charcoal-400" />
                    <span>{alt.count || 0} students requested</span>
                  </div>
                </div>
              );
            })}

            {/* Custom Option Button */}
            <div
              onClick={() => {
                setIsCustomMode(true);
                setErrorMsg("");
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                isCustomMode
                  ? "bg-leaf-50/90 border-leaf-600 shadow-2xs"
                  : "bg-white border-dashed border-cream-300 hover:border-leaf-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isCustomMode
                    ? "border-leaf-700 bg-leaf-700 text-white"
                    : "border-cream-300 bg-white"
                }`}
              >
                {isCustomMode && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-sm font-semibold text-charcoal-700 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-leaf-700" />
                Suggest Another Custom Dish
              </span>
            </div>
          </div>
        </div>

        {/* Custom Input Field */}
        {isCustomMode && (
          <div className="animate-fade-in">
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Custom Dish Name
            </label>
            <input
              type="text"
              value={customDish}
              onChange={(e) => setCustomDish(e.target.value)}
              placeholder="e.g. Curd Rice with Pomegranate, Plain Khichdi, etc."
              className="w-full text-xs p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-leaf-600 bg-white text-charcoal-800 placeholder-charcoal-400"
              autoFocus
            />
          </div>
        )}

        {/* Error */}
        {errorMsg && (
          <div className="text-xs text-terracotta-700 font-semibold">{errorMsg}</div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-cream-200">
          <div className="flex items-center gap-1 text-xs text-leaf-800 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-turmeric-600" />
            <span>Earn +15 Participation Pts</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-600 hover:bg-cream-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-leaf-700 hover:bg-leaf-800 text-cream-50 text-xs font-bold shadow-2xs active:scale-98 transition-all cursor-pointer"
            >
              Submit Alternative Vote
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
