import React, { useState } from "react";

/**
 * Responsive Bar Chart with Tooltips
 */
export function BarChart({
  data = [], // [{ label: "Mon", value: 4.2, secondaryValue: 12 }]
  height = 200,
  barColor = "#f97316", // Tailwind orange-500
  secondaryColor = "#3b82f6",
  maxValue = null,
  unit = "",
  showSecondary = false
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) {
    return <div className="h-40 flex items-center justify-center text-slate-400 text-sm">No data available</div>;
  }

  const values = data.map(d => d.value);
  const calculatedMax = maxValue || Math.max(...values, 1) * 1.15;

  return (
    <div className="w-full relative">
      <div className="flex items-end justify-between gap-2 pt-8" style={{ height: `${height}px` }}>
        {data.map((item, idx) => {
          const heightPct = Math.min(100, Math.max(8, (item.value / calculatedMax) * 100));
          const secHeightPct = item.secondaryValue ? Math.min(100, Math.max(8, (item.secondaryValue / calculatedMax) * 100)) : 0;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-12 z-20 bg-charcoal-900 text-cream-50 text-xs py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none transform -translate-y-1 transition-all border border-charcoal-700">
                  <div className="font-semibold">{item.label}</div>
                  <div>Value: {item.value} {unit} {item.count !== undefined ? `| ${item.count} ${item.count === 1 ? 'rating' : 'ratings'}` : ''}</div>
                  {showSecondary && item.secondaryValue !== undefined && (
                    <div className="text-turmeric-300 text-[10px]">Target: {item.secondaryValue} {unit}</div>
                  )}
                </div>
              )}

              {/* Bars Container */}
              <div className="w-full flex items-end justify-center gap-1 h-full pb-1">
                <div
                  className="w-full max-w-[28px] rounded-t-md transition-all duration-300 group-hover:brightness-110"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: barColor,
                    boxShadow: isHovered ? "0 4px 12px rgba(249, 115, 22, 0.4)" : "none"
                  }}
                />
                {showSecondary && item.secondaryValue !== undefined && (
                  <div
                    className="w-full max-w-[28px] rounded-t-md transition-all duration-300 opacity-80 group-hover:opacity-100"
                    style={{
                      height: `${secHeightPct}%`,
                      backgroundColor: secondaryColor
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <span className={`text-[11px] font-medium mt-1 truncate max-w-full ${isHovered ? "text-orange-600 font-bold" : "text-slate-500"}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Line / Area Trend Chart
 */
export function AreaTrendChart({
  data = [], // [{ label: "W1", value: 4.1 }]
  height = 180,
  strokeColor = "#10b981", // Emerald
  fillColor = "rgba(16, 185, 129, 0.15)",
  unit = "",
  minY = null,
  maxY = null
}) {
  const [hoverPoint, setHoverPoint] = useState(null);

  if (!data || data.length < 2) {
    return <div className="h-36 flex items-center justify-center text-slate-400 text-sm">Insufficient data points</div>;
  }

  const values = data.map(d => d.value);
  const minVal = minY !== null ? minY : Math.min(...values) * 0.9;
  const maxVal = maxY !== null ? maxY : Math.max(...values) * 1.1;
  const range = maxVal - minVal || 1;

  const width = 500;
  const chartHeight = height - 40;
  const stepX = width / (data.length - 1);

  // Compute SVG coordinates
  const points = data.map((d, i) => {
    const x = i * stepX;
    const y = chartHeight - ((d.value - minVal) / range) * chartHeight + 10;
    return { x, y, data: d };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.y}`, "");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight + 10} L ${points[0].x} ${chartHeight + 10} Z`;

  return (
    <div className="w-full relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full overflow-visible"
        style={{ height: `${height}px` }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <line x1="0" y1="10" x2={width} y2="10" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="0" y1={chartHeight / 2 + 10} x2={width} y2={chartHeight / 2 + 10} stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="0" y1={chartHeight + 10} x2={width} y2={chartHeight + 10} stroke="#e2e8f0" strokeWidth="1" />

        {/* Shaded Area */}
        <path d={areaD} fill="url(#areaGradient)" />

        {/* Line Stroke */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data Points */}
        {points.map((p, idx) => (
          <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoverPoint(p)} onMouseLeave={() => setHoverPoint(null)}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hoverPoint?.x === p.x ? "6" : "4"}
              fill="#ffffff"
              stroke={strokeColor}
              strokeWidth="2.5"
              className="transition-all duration-200"
            />
            {/* X-axis labels */}
            <text
              x={p.x}
              y={height - 6}
              textAnchor="middle"
              className="text-[11px] fill-slate-500 font-medium"
            >
              {p.data.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating tooltip */}
      {hoverPoint && (
        <div
          className="absolute z-30 bg-slate-900 text-white text-xs py-1 px-2.5 rounded-lg shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-8"
          style={{
            left: `${(hoverPoint.x / width) * 100}%`,
            top: `${hoverPoint.y}px`
          }}
        >
          <div className="font-semibold">{hoverPoint.data.label}</div>
          <div>{hoverPoint.data.value} {unit}</div>
        </div>
      )}
    </div>
  );
}

/**
 * Circular / Gauge Progress Indicator
 */
export function DonutProgress({
  percentage = 85,
  size = 110,
  strokeWidth = 10,
  color = "#f97316",
  bgColor = "#f1f5f9",
  label = "",
  valueText = ""
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safePercentage = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (safePercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            {valueText || `${Math.round(safePercentage)}%`}
          </span>
          {label && <span className="text-[10px] font-medium text-slate-500 uppercase">{label}</span>}
        </div>
      </div>
    </div>
  );
}

/**
 * Rating Category Horizontal Bar
 */
export function RatingCategoryBar({ label, value = 4.0, max = 5.0, count = null, color = "bg-orange-500" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full mb-2.5">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-1.5 font-semibold text-slate-900">
          <span>{Number(value).toFixed(1)}</span>
          <span className="text-slate-400 font-normal">/ {max} ★</span>
          {count !== null && <span className="text-slate-400 font-normal text-[11px]">({count})</span>}
        </div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
