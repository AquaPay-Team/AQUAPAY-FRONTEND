import React from "react";

export function Step7ReviewSubmit({ formData, onEditStep }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-sm font-bold text-slate-900">Final Summary & Application Review</h3>
        <p className="text-xs text-slate-500">
          Please review all submitted details before triggering final AQUAPAY verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal & Business Info */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-blue-700 border-b border-slate-200 pb-2">
            <span>Personal & Business Info</span>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-slate-500 hover:text-blue-700 underline font-medium cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="text-xs space-y-1 text-slate-700">
            <p><span className="text-slate-400">Name:</span> <strong className="text-slate-900">{formData.fullName}</strong></p>
            <p><span className="text-slate-400">Business:</span> {formData.businessType || "Retail Merchant"}</p>
            <p><span className="text-slate-400">DOB:</span> {formData.dob}</p>
            <p><span className="text-slate-400">Phone:</span> +91 {formData.phone}</p>
            <p><span className="text-slate-400">Email:</span> {formData.email}</p>
            <p><span className="text-slate-400">Address:</span> {formData.shopAddress || formData.address}, {formData.city} ({formData.pincode})</p>
          </div>
        </div>

        {/* Identity IDs */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-blue-700 border-b border-slate-200 pb-2">
            <span>Identity & Tax IDs</span>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-slate-500 hover:text-blue-700 underline font-medium cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="text-xs space-y-1 text-slate-700">
            <p><span className="text-slate-400">Aadhaar:</span> {formData.aadhaarNumber}</p>
            <p><span className="text-slate-400">PAN:</span> {formData.panNumber}</p>
            <p className="text-emerald-700 font-semibold pt-1">✓ Verified via NSDL & UIDAI</p>
          </div>
        </div>

        {/* Bank Account */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-blue-700 border-b border-slate-200 pb-2">
            <span>Payout Bank Account</span>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-slate-500 hover:text-blue-700 underline font-medium cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="text-xs space-y-1 text-slate-700">
            <p><span className="text-slate-400">Bank:</span> {formData.bankName}</p>
            <p><span className="text-slate-400">Account No:</span> {formData.accountNumber}</p>
            <p><span className="text-slate-400">IFSC:</span> {formData.ifscCode}</p>
            <p><span className="text-slate-400">Type:</span> {formData.accountType}</p>
          </div>
        </div>

        {/* Documents & Media */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-blue-700 border-b border-slate-200 pb-2">
            <span>Documents & Declarations</span>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="text-slate-500 hover:text-blue-700 underline font-medium cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="text-xs space-y-1 text-slate-700">
            <p><span className="text-slate-400">Selfie:</span> Attached ({typeof formData.selfieFile === "string" ? formData.selfieFile : formData.selfieFile?.name || "Ready"})</p>
            <p><span className="text-slate-400">Consent Video:</span> Attached ({typeof formData.videoFile === "string" ? formData.videoFile : formData.videoFile?.name || "Ready"})</p>
            <p><span className="text-slate-400">Shop Photo:</span> Attached ({typeof formData.shopPhotoFile === "string" ? formData.shopPhotoFile : formData.shopPhotoFile?.name || "Ready"})</p>
            <p className="text-emerald-700 font-semibold pt-1">✓ Terms & Declarations Accepted</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step7ReviewSubmit;
