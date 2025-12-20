"use client";

import * as React from "react";

type Props = {
  open: boolean;
  onClose: () => void;     // single close handler (backdrop/Esc/cancel)
  onConfirm: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

export default function ConfirmBookingCard({
  open,
  onClose,
  onConfirm,
  title = "Are you sure you want to book this room ?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}: Props) {
  
  // Close on ESC
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleConfirm = () => {
    if (loading) return;
    onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-title"
      onMouseDown={onClose}            // click outside closes
    >
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="relative w-[92vw] max-w-[560px] rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
        onMouseDown={(e) => e.stopPropagation()} // prevent outside close when clicking inside
      >
        <div className="px-6 sm:px-8 py-8">
          <h2 id="confirm-title" className="text-center text-xl sm:text-2xl font-medium text-slate-900">
            {title}
          </h2>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full sm:w-auto rounded-xl bg-[#0A66FF] px-6 py-3 text-white text-[15px] font-semibold hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Processing..." : confirmText}
            </button>

            <button
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-6 py-3 text-[15px] font-semibold text-[#0A66FF] hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {cancelText}
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-4 rounded-b-2xl bg-black/5 blur-sm" />
      </div>
    </div>
  );
}
