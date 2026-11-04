import React from "react";
import { RefreshCw, LogOut } from "lucide-react";

export function KycHeader({ savedDraftTime, onSaveDraft, onLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 flex items-center justify-between shadow-xs">
      <div className="flex items-center space-x-3">
        {/* Brand Logo */}
        <div className="h-10 w-auto flex items-center">
          <img
            src="/aquapay-logo.png"
            alt="AquaPay"
            className="h-9 w-auto object-contain select-none"
          />
        </div>

        <div className="hidden sm:block border-l border-slate-200 pl-3">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
              KYC Verification Portal
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Smart Payments. Seamless Future.</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Draft Saved ({savedDraftTime})</span>
        </div>

        <button
          type="button"
          onClick={onSaveDraft}
          className="text-xs text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Save Draft</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition flex items-center gap-1.5 cursor-pointer"
          title="Log Out"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default KycHeader;
