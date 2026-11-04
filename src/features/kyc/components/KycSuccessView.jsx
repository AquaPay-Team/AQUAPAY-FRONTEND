import React from "react";
import { CheckCircle2, LayoutDashboard } from "lucide-react";

export function KycSuccessView({ onGoToDashboard, onReviewApplication, referenceId }) {
  return (
    <div className="py-8 text-center space-y-6 max-w-lg mx-auto animate-fadeIn">
      <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <CheckCircle2 className="w-10 h-10 text-white" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-black text-slate-900">KYC Application Submitted!</h3>
        <p className="text-xs text-slate-600">
          Your AQUAPAY merchant verification reference ID is{" "}
          <span className="text-blue-700 font-mono font-bold">
            {referenceId || "AQP-88294-2026"}
          </span>
        </p>
      </div>

      {/* Status Timeline */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-4">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Verification Status Tracker
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
              1
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-900">Document Submission</p>
              <p className="text-[10px] text-emerald-600 font-medium">Completed</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold animate-pulse">
              2
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-900">Automated Risk & Fraud Screening</p>
              <p className="text-[10px] text-blue-600 font-medium">In progress (Est. 5 mins)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 opacity-60">
            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-700">AQUAPAY Merchant Account Activation</p>
              <p className="text-[10px] text-slate-500">Pending step 2 completion</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onGoToDashboard}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Go to Dashboard</span>
        </button>

        <button
          type="button"
          onClick={onReviewApplication}
          className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
        >
          Review Application
        </button>
      </div>
    </div>
  );
}

export default KycSuccessView;
