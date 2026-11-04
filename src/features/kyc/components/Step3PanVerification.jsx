import React from "react";
import { CreditCard, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export function Step3PanVerification({
  formData,
  onChange,
  panVerified,
  panLoading,
  onVerifyPan,
}) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-2xl mx-auto flex items-center justify-center">
          <CreditCard className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">PAN Card Real-time Verification</h3>
        <p className="text-xs text-slate-500">
          Verify your Permanent Account Number directly against NSDL/Income Tax databases.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            PAN Number (10 Alphanumeric Digits)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={10}
              value={formData.panNumber}
              onChange={(e) => onChange("panNumber", e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-base uppercase tracking-widest font-mono text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
            <button
              type="button"
              onClick={onVerifyPan}
              disabled={panLoading || panVerified}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {panLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              {panVerified ? "Verified" : "Verify PAN"}
            </button>
          </div>
        </div>

        {panVerified && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>PAN Verified Successfully with NSDL Database</span>
            </div>
            <div className="text-xs text-slate-700 grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/80">
              <div>
                <span className="text-slate-500 block">Name on Card:</span>
                <span className="font-semibold text-slate-900">{formData.panName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status:</span>
                <span className="text-emerald-700 font-semibold">Active / Valid</span>
              </div>
            </div>
          </div>
        )}

        {!panVerified && (
          <div className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Click 'Verify PAN' to run an instant check. Verification ensures fast approval for high-volume transactions.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step3PanVerification;
