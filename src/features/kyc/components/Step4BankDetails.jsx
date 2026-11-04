import React from "react";
import { Check, Sparkles } from "lucide-react";

export function Step4BankDetails({ formData, onChange }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-sm font-bold text-slate-900">Payout Bank Details</h3>
        <p className="text-xs text-slate-500">
          All AQUAPAY sales settlements will be credited directly to this verified account.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Account Holder Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.accountHolderName || formData.fullName}
            onChange={(e) => onChange("accountHolderName", e.target.value)}
            placeholder="As registered in Bank passbook"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Bank Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.bankName}
            onChange={(e) => onChange("bankName", e.target.value)}
            placeholder="e.g. HDFC Bank, ICICI Bank"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Bank Account Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => onChange("accountNumber", e.target.value)}
            placeholder="Enter account number"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Confirm Account Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.confirmAccountNumber}
            onChange={(e) => onChange("confirmAccountNumber", e.target.value)}
            placeholder="Re-enter account number"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            IFSC Code <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.ifscCode}
            onChange={(e) => onChange("ifscCode", e.target.value.toUpperCase())}
            placeholder="e.g. HDFC0001234"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 uppercase font-mono focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["Savings", "Current"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange("accountType", type)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  formData.accountType === type
                    ? "bg-blue-50 border-blue-600 text-blue-800 shadow-xs"
                    : "bg-white border-slate-300 text-slate-600 hover:border-slate-400"
                }`}
              >
                <span>{type}</span>
                {formData.accountType === type && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 text-xs text-blue-900">
        <Sparkles className="w-5 h-5 shrink-0 text-blue-600" />
        <span>
          AQUAPAY conducts automated penny-drop verification upon submission to validate the account holder before releasing settlements.
        </span>
      </div>
    </div>
  );
}

export default Step4BankDetails;
