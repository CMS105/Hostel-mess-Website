import React, { useState } from "react";
import { Star } from "lucide-react";

const STAR_LABELS = {
  1: "Poor / Unsatisfactory",
  2: "Needs Improvement",
  3: "Average / Fair",
  4: "Good / Tasty",
  5: "Excellent / Outstanding"
};

export function StarRating({
  value = 0,
  onChange = null,
  readOnly = false,
  size = "md", // "sm", "md", "lg", "xl"
  showLabel = false,
  color = "text-amber-400"
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  const activeVal = hoverValue || value;

  return (
    <div className="inline-flex flex-col">
      <div className="inline-flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = activeVal >= starIndex;
          const isHalf = !readOnly && false; // Full star steps for clarity

          return (
            <button
              key={starIndex}
              type="button"
              disabled={readOnly}
              onClick={() => onChange && onChange(starIndex)}
              onMouseEnter={() => !readOnly && setHoverValue(starIndex)}
              onMouseLeave={() => !readOnly && setHoverValue(0)}
              className={`transition-all duration-150 focus:outline-none ${
                readOnly ? "cursor-default" : "cursor-pointer hover:scale-115 active:scale-95"
              }`}
              title={!readOnly ? STAR_LABELS[starIndex] : `${value} Stars`}
            >
              <Star
                className={`${sizeClasses[size] || "w-5 h-5"} ${
                  isFilled
                    ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                    : "fill-slate-100 text-slate-300 stroke-[1.5]"
                }`}
              />
            </button>
          );
        })}
        {readOnly && (
          <span className="ml-1.5 font-bold text-slate-700 text-sm">
            {Number(value).toFixed(1)}
          </span>
        )}
      </div>

      {showLabel && !readOnly && activeVal > 0 && (
        <span className="text-[12px] font-medium text-amber-600 mt-1 animate-fade-in">
          {STAR_LABELS[activeVal]}
        </span>
      )}
    </div>
  );
}
