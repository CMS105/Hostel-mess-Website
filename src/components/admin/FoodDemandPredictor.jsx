import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Scale,
  Users,
  AlertTriangle,
  Sparkles,
  Info,
  Calendar,
  Clock,
  Layers,
  Utensils,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sliders
} from "lucide-react";

const ATTENDANCE_PRESETS = [
  { label: "Regular Weekday", count: 420, desc: "Standard 84% student turnout" },
  { label: "Weekend / Sunday", count: 260, desc: "38% students on home leave" },
  { label: "Monsoon Rain Day", count: 460, desc: "92% turnout; hostellers stay indoors" },
  { label: "Exam Night Dinner", count: 340, desc: "68% turnout; library late hours" },
  { label: "Sunday Grand Feast", count: 490, desc: "98% peak attendance for special menu" }
];

const MEAL_SLOTS = [
  { id: "breakfast", label: "Breakfast (Tiffin)", typicalAttendancePct: 82 },
  { id: "lunch", label: "Lunch (Grand Thali)", typicalAttendancePct: 88 },
  { id: "snacks", label: "Evening Snacks & Tea", typicalAttendancePct: 75 },
  { id: "dinner", label: "Dinner", typicalAttendancePct: 84 }
];

export function FoodDemandPredictor({ menu = [], wasteRecords = [] }) {
  const [selectedSlot, setSelectedSlot] = useState("lunch");
  const [expectedStudents, setExpectedStudents] = useState(420);
  const [safetyBufferPct, setSafetyBufferPct] = useState(10); // 10% default buffer
  const [simulationAttendance, setSimulationAttendance] = useState(420);
  const [isSimulatorActive, setIsSimulatorActive] = useState(false);

  // Per-student standard South Indian portions (in kg or litres)
  const PORTION_STANDARDS = {
    breakfast: {
      dishType: "Thatte Idlis & Medu Vada",
      rawIngredientsKg: 0.11, // batter grains
      cookedPortionKg: 0.28,
      sambarLitre: 0.15,
      sidePortionKg: 0.08, // Chutney
      approxCostPerStudent: 32
    },
    lunch: {
      dishType: "Grand South Thali Meals",
      rawIngredientsKg: 0.14, // raw rice
      cookedPortionKg: 0.35, // cooked rice
      sambarLitre: 0.18, // sambar & rasam
      sidePortionKg: 0.09, // Poriyal / Palya
      approxCostPerStudent: 55
    },
    snacks: {
      dishType: "Maddur Vada / Sundal & Tea",
      rawIngredientsKg: 0.08,
      cookedPortionKg: 0.18,
      sambarLitre: 0.12, // Filter coffee/tea
      sidePortionKg: 0.05,
      approxCostPerStudent: 22
    },
    dinner: {
      dishType: "Tawa Chapatis & Bisibelebath",
      rawIngredientsKg: 0.13,
      cookedPortionKg: 0.33,
      sambarLitre: 0.16,
      sidePortionKg: 0.08,
      approxCostPerStudent: 48
    }
  };

  const std = PORTION_STANDARDS[selectedSlot];

  // Helper calculation function
  const calculateRequirements = (students) => {
    const rawRiceKg = Number((students * std.rawIngredientsKg).toFixed(1));
    const cookedRiceKg = Number((students * std.cookedPortionKg).toFixed(1));
    const sambarLitres = Number((students * std.sambarLitre).toFixed(1));
    const poriyalKg = Number((students * std.sidePortionKg).toFixed(1));
    const chapatisCount = Math.round(students * 2.2);

    // Buffer Margin
    const bufferKg = Number((cookedRiceKg * (safetyBufferPct / 100)).toFixed(1));
    const totalRecommendedPrepKg = Number((cookedRiceKg + bufferKg).toFixed(1));

    // Potential Leftovers Risk if actual attendance is 10% or 20% lower
    const leftoverAtMinus10 = Number((totalRecommendedPrepKg - (students * 0.9 * std.cookedPortionKg)).toFixed(1));
    const leftoverAtMinus20 = Number((totalRecommendedPrepKg - (students * 0.8 * std.cookedPortionKg)).toFixed(1));
    const estCost = Math.round(students * std.approxCostPerStudent);

    return {
      rawRiceKg,
      cookedRiceKg,
      sambarLitres,
      poriyalKg,
      chapatisCount,
      bufferKg,
      totalRecommendedPrepKg,
      leftoverAtMinus10,
      leftoverAtMinus20,
      estCost
    };
  };

  // Base predicted requirements
  const baseReq = calculateRequirements(expectedStudents);

  // Simulated requirements (What-If scenario)
  const simReq = calculateRequirements(simulationAttendance);
  const attendanceDelta = simulationAttendance - expectedStudents;
  const attendanceDeltaPct = Math.round((attendanceDelta / expectedStudents) * 100);

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-800 mb-1">
            <Scale className="w-4 h-4 text-leaf-700" />
            <span>Kitchen Batch Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 tracking-tight">
            Smart Food Demand Predictor & What-If Simulator
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5 max-w-2xl">
            Forecast raw grains, cooked rice cauldrons, sambar litres and side portions based on expected student turnout. Simulate attendance shifts to eliminate kitchen surplus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-leaf-800 bg-leaf-100 border border-leaf-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-turmeric-600" />
            <span>Local Predictive Engine</span>
          </span>
        </div>
      </div>

      {/* Prominent Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 flex items-start gap-3 text-xs text-charcoal-700">
        <Info className="w-4 h-4 text-leaf-800 shrink-0 mt-0.5" />
        <div>
          <strong className="text-charcoal-900 font-bold">Predictive Model Transparency: </strong>
          All figures shown below are algorithmic forecasts derived from historical South Indian college mess consumption records and standard per-student portions.
          <span className="font-bold text-leaf-800"> Clearly labeled as estimates</span> to assist mess supervisors during morning prep.
        </div>
      </div>

      {/* Meal Slot Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {MEAL_SLOTS.map((slot) => {
          const isSelected = selectedSlot === slot.id;
          return (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-leaf-700 text-cream-50 border-leaf-700 shadow-xs"
                  : "bg-white border-cream-200 hover:border-leaf-300 text-charcoal-800"
              }`}
            >
              <div className="text-xs font-bold font-display">{slot.label}</div>
              <div className={`text-[10px] mt-0.5 ${isSelected ? "text-cream-200" : "text-charcoal-500"}`}>
                Typical attendance: {slot.typicalAttendancePct}%
              </div>
            </button>
          );
        })}
      </div>

      {/* Controls: Attendance Input & Scenarios */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-2xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cream-200">
          <div>
            <h3 className="text-base font-bold font-display text-charcoal-900">
              1. Expected Student Attendance
            </h3>
            <p className="text-xs text-charcoal-500">
              Enter target student count or choose a realistic campus scenario preset
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-charcoal-600">Buffer Margin:</span>
            <select
              value={safetyBufferPct}
              onChange={(e) => setSafetyBufferPct(Number(e.target.value))}
              className="text-xs p-2 rounded-xl border border-cream-300 bg-cream-50 font-bold text-charcoal-800 cursor-pointer"
            >
              <option value="5">+5% (Tight)</option>
              <option value="8">+8% (Eco-Lean)</option>
              <option value="10">+10% (Recommended)</option>
              <option value="15">+15% (Comfort Buffer)</option>
            </select>
          </div>
        </div>

        {/* Preset Buttons */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
            Hostel Scenario Quick Presets
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {ATTENDANCE_PRESETS.map((p) => {
              const isSelected = expectedStudents === p.count;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setExpectedStudents(p.count);
                    setSimulationAttendance(p.count);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cream-100 border-leaf-600 text-charcoal-900 shadow-2xs ring-1 ring-leaf-600/30"
                      : "bg-white border-cream-200 hover:border-cream-300 text-charcoal-700"
                  }`}
                >
                  <div className="text-xs font-bold text-charcoal-900">{p.label}</div>
                  <div className="text-sm font-bold font-display text-leaf-800 mt-0.5">{p.count} students</div>
                  <div className="text-[10px] text-charcoal-500 mt-0.5 truncate">{p.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Attendance Slider */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-charcoal-700">
              Fine-tune Expected Attendance:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="100"
                max="600"
                value={expectedStudents}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setExpectedStudents(val);
                  setSimulationAttendance(val);
                }}
                className="w-24 text-center font-bold text-sm p-1.5 rounded-xl border border-cream-300 bg-cream-50 text-charcoal-900"
              />
              <span className="text-xs text-charcoal-500 font-medium">Students</span>
            </div>
          </div>
          <input
            type="range"
            min="100"
            max="600"
            step="10"
            value={expectedStudents}
            onChange={(e) => {
              const val = Number(e.target.value);
              setExpectedStudents(val);
              setSimulationAttendance(val);
            }}
            className="w-full accent-leaf-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Prediction Output Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-charcoal-900">
              2. Forecasted Batch Requirements (For {expectedStudents} Students)
            </h3>
            <span className="text-[11px] text-leaf-800 font-semibold bg-leaf-50 px-2 py-0.5 rounded-md border border-leaf-200">
              PREDICTED ESTIMATE
            </span>
          </div>
          <span className="text-xs text-charcoal-500 font-medium">
            Est. Cost: ₹{baseReq.estCost.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Raw Rice / Grains */}
          <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
              Raw Rice / Batter Grains
            </span>
            <div className="text-2xl font-bold font-display text-charcoal-900 mt-1">
              {baseReq.rawRiceKg} kg
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              ~135g raw per student
            </div>
          </div>

          {/* Card 2: Cooked Rice + Buffer */}
          <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
              Cooked Batch Prep (+{safetyBufferPct}%)
            </span>
            <div className="text-2xl font-bold font-display text-leaf-800 mt-1">
              {baseReq.totalRecommendedPrepKg} kg
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              {baseReq.cookedRiceKg} kg base + {baseReq.bufferKg} kg buffer
            </div>
          </div>

          {/* Card 3: Sambar / Rasam Cauldrons */}
          <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
              Sambar / Rasam Volume
            </span>
            <div className="text-2xl font-bold font-display text-turmeric-800 mt-1">
              {baseReq.sambarLitres} L
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              ~180 ml hot serving per head
            </div>
          </div>

          {/* Card 4: Palya / Side Dishes */}
          <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
              Vegetable Poriyal / Palya
            </span>
            <div className="text-2xl font-bold font-display text-charcoal-900 mt-1">
              {baseReq.poriyalKg} kg
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              {selectedSlot === "dinner" ? `Or ~${baseReq.chapatisCount} chapatis` : "~85g portion per head"}
            </div>
          </div>
        </div>

        {/* Potential Leftovers / Surplus Risk Card */}
        <div className="bg-cream-100/80 p-5 rounded-3xl border border-cream-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-charcoal-900">Potential Surplus Risk Analysis:</span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white text-charcoal-700 border border-cream-300">
                Surplus Modeling
              </span>
            </div>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              If attendance is 10% lower ({Math.round(expectedStudents * 0.9)} students), expected surplus is <strong>{baseReq.leftoverAtMinus10} kg</strong>.
              If attendance drops by 20% ({Math.round(expectedStudents * 0.8)} students), surplus rises to <strong className="text-terracotta-700">{baseReq.leftoverAtMinus20} kg</strong> (actionable alert).
            </p>
          </div>

          <div className="shrink-0 bg-white px-3.5 py-2 rounded-2xl border border-cream-200 text-right">
            <span className="text-[10px] font-bold uppercase text-charcoal-400 block">Surplus Management</span>
            <span className="text-xs font-bold text-leaf-800">RSVP Staggered Cooking</span>
          </div>
        </div>
      </div>

      {/* ================= FEATURE 8: WHAT-IF SIMULATOR ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-terracotta-600" />
              <h3 className="text-lg font-bold font-display text-charcoal-900">
                What-If Attendance Simulator
              </h3>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
                SIMULATION SCENARIO
              </span>
            </div>
            <p className="text-xs text-charcoal-600 mt-0.5">
              Drag the slider to test what happens if hostel attendance swings unexpectedly (e.g. +25% sudden hostel return or -30% festival departure).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimulationAttendance(expectedStudents)}
              className="text-xs font-bold text-charcoal-600 hover:text-charcoal-900 px-3 py-1.5 rounded-xl border border-cream-300 bg-cream-50 cursor-pointer"
            >
              Reset to Base ({expectedStudents})
            </button>
          </div>
        </div>

        {/* Simulator Slider */}
        <div className="space-y-3 bg-cream-50/70 p-5 rounded-2xl border border-cream-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-800">
              Simulated Attendance Level:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold font-display text-charcoal-900">
                {simulationAttendance} Students
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  attendanceDelta > 0
                    ? "bg-leaf-100 text-leaf-800 border border-leaf-300"
                    : attendanceDelta < 0
                    ? "bg-terracotta-100 text-terracotta-800 border border-terracotta-300"
                    : "bg-cream-200 text-charcoal-700"
                }`}
              >
                {attendanceDelta >= 0 ? `+${attendanceDelta}` : attendanceDelta} ({attendanceDeltaPct}%)
              </span>
            </div>
          </div>

          <input
            type="range"
            min="100"
            max="600"
            step="10"
            value={simulationAttendance}
            onChange={(e) => setSimulationAttendance(Number(e.target.value))}
            className="w-full accent-terracotta-600 cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-charcoal-400 font-medium">
            <span>100 Students (-76%)</span>
            <span>350 Mid-range</span>
            <span>600 Students (Capacity Full)</span>
          </div>
        </div>

        {/* Side-by-Side Before & After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Base Case */}
          <div className="bg-cream-50/50 p-5 rounded-2xl border border-cream-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-cream-200">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                Baseline Prediction
              </span>
              <span className="text-xs font-bold text-charcoal-900">{expectedStudents} Students</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Cooked Food Requirement:</span>
                <strong className="text-charcoal-900">{baseReq.totalRecommendedPrepKg} kg</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Sambar / Rasam Volume:</span>
                <strong className="text-charcoal-900">{baseReq.sambarLitres} Litres</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Vegetable Side Dish:</span>
                <strong className="text-charcoal-900">{baseReq.poriyalKg} kg</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Estimated Batch Cost:</span>
                <strong className="text-charcoal-900">₹{baseReq.estCost.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Box 2: Simulated Case */}
          <div className="bg-white p-5 rounded-2xl border-2 border-terracotta-300 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-cream-200">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-800">
                Simulated Outcome
              </span>
              <span className="text-xs font-bold text-terracotta-800 font-display">{simulationAttendance} Students</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-charcoal-600">Cooked Food Requirement:</span>
                <div className="flex items-center gap-1.5">
                  <strong className="text-charcoal-900">{simReq.totalRecommendedPrepKg} kg</strong>
                  <span className={`text-[11px] font-bold ${simReq.totalRecommendedPrepKg >= baseReq.totalRecommendedPrepKg ? "text-leaf-800" : "text-terracotta-700"}`}>
                    ({Number((simReq.totalRecommendedPrepKg - baseReq.totalRecommendedPrepKg).toFixed(1))} kg)
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal-600">Sambar / Rasam Volume:</span>
                <div className="flex items-center gap-1.5">
                  <strong className="text-charcoal-900">{simReq.sambarLitres} Litres</strong>
                  <span className={`text-[11px] font-bold ${simReq.sambarLitres >= baseReq.sambarLitres ? "text-leaf-800" : "text-terracotta-700"}`}>
                    ({Number((simReq.sambarLitres - baseReq.sambarLitres).toFixed(1))} L)
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal-600">Vegetable Side Dish:</span>
                <strong className="text-charcoal-900">{simReq.poriyalKg} kg</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal-600">Cost Impact:</span>
                <strong className={simReq.estCost >= baseReq.estCost ? "text-leaf-800" : "text-terracotta-700"}>
                  ₹{simReq.estCost.toLocaleString()} ({simReq.estCost >= baseReq.estCost ? `+₹${(simReq.estCost - baseReq.estCost).toLocaleString()}` : `-₹${(baseReq.estCost - simReq.estCost).toLocaleString()}`})
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
