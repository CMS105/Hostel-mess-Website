import React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const borderColors = {
    success: "border-emerald-500/30 bg-emerald-50/95 text-emerald-950",
    warning: "border-amber-500/30 bg-amber-50/95 text-amber-950",
    error: "border-rose-500/30 bg-rose-50/95 text-rose-950",
    info: "border-blue-500/30 bg-blue-50/95 text-blue-950"
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-fade-in shadow-2xl rounded-xl">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md ${
          borderColors[toast.type || "info"]
        }`}
      >
        {icons[toast.type || "info"]}
        <div className="flex-1 pr-2">
          {toast.title && <div className="font-semibold text-sm">{toast.title}</div>}
          <div className="text-xs text-slate-700 mt-0.5 leading-relaxed">{toast.message}</div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
