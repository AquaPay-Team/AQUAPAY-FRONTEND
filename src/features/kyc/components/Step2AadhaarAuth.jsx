import React, { useState } from "react";
import { Smartphone, CheckCircle2, ShieldCheck, Lock, RefreshCw, AlertCircle } from "lucide-react";

export function Step2AadhaarAuth({
  formData,
  onChange,
  otpSent,
  otpTimer,
  otpValue,
  onOtpValueChange,
  onTriggerOtp,
  aadhaarVerified,
  isVerifyingOtp,
  onVerifyOtp,
}) {
  const [aadhaarError, setAadhaarError] = useState("");
  const [otpError, setOtpError] = useState("");

  const cleanAadhaar = String(formData.aadhaarNumber || "").replace(/\D/g, "");

  const handleAadhaarChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 12);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    onChange("aadhaarNumber", formatted);

    if (raw.length > 0 && raw.length < 12) {
      setAadhaarError(`Entered ${raw.length} of 12 digits`);
    } else {
      setAadhaarError("");
    }
  };

  const handleOtpDigitChange = (index, val, e) => {
    const clean = val.replace(/\D/g, "");
    const newArr = [...otpValue];
    newArr[index] = clean;
    onOtpValueChange(newArr);
    setOtpError("");

    if (clean && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  };

  const handleVerifyClick = () => {
    const entered = otpValue.join("");
    if (entered.length !== 6) {
      setOtpError("Please enter all 6 digits of the Aadhaar OTP sent to your registered mobile.");
      return;
    }
    setOtpError("");
    onVerifyOtp();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-1.5 mb-6">
        <div className="w-11 h-11 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl mx-auto flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">Aadhaar Identity Verification</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Enter your 12-digit Aadhaar number to initiate verification via UIDAI / DigiLocker OTP authentication.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
        {/* Aadhaar Input */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Aadhaar Number (12 Digits) <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={14}
              disabled={aadhaarVerified}
              value={formData.aadhaarNumber || ""}
              onChange={handleAadhaarChange}
              placeholder="•••• •••• ••••"
              className={`flex-1 bg-white border rounded-xl px-4 py-2.5 text-base tracking-widest font-mono text-slate-900 focus:outline-none transition placeholder:tracking-normal placeholder:font-sans placeholder:text-sm ${
                aadhaarError
                  ? "border-amber-400 bg-amber-50/20 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  : aadhaarVerified
                  ? "border-emerald-300 bg-emerald-50/20 text-slate-700"
                  : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              }`}
            />
            <button
              type="button"
              disabled={aadhaarVerified || cleanAadhaar.length !== 12}
              onClick={onTriggerOtp}
              className="bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium px-5 py-2.5 rounded-xl text-xs transition shadow-xs whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>
          </div>

          {/* Instant feedback on Aadhaar input */}
          {aadhaarError && (
            <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {aadhaarError}
            </p>
          )}
          {!aadhaarError && cleanAadhaar.length === 12 && !otpSent && !aadhaarVerified && (
            <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              12-digit Aadhaar complete. Click 'Send OTP' to request authentication code.
            </p>
          )}
        </div>

        {/* Verified Aadhaar State */}
        {aadhaarVerified && (
          <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Aadhaar e-KYC Verified Successfully via UIDAI</span>
            </div>
            <div className="text-xs text-slate-700 grid grid-cols-2 gap-3 pt-2 border-t border-emerald-200/60">
              <div>
                <span className="text-slate-500 block text-[11px]">Aadhaar Masked ID:</span>
                <span className="font-mono font-semibold text-slate-900">
                  •••• •••• {cleanAadhaar.slice(-4) || "9999"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Authentication Status:</span>
                <span className="text-emerald-700 font-semibold">Active & Biometrically Valid</span>
              </div>
            </div>
          </div>
        )}

        {/* OTP Entry Section (when OTP is sent and not yet verified) */}
        {otpSent && !aadhaarVerified && (
          <div className="pt-4 border-t border-slate-200 space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">
                Enter 6-Digit OTP sent to your Aadhaar-linked mobile ({formData.phone ? `••••••${formData.phone.slice(-4)}` : "registered mobile"})
              </span>
              <span className="text-blue-700 font-mono font-bold">
                00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}
              </span>
            </div>

            {/* 6 OTP Boxes */}
            <div className="flex justify-between gap-2 max-w-xs mx-auto pt-1">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otpValue[index] || ""}
                  onChange={(e) => handleOtpDigitChange(index, e.target.value, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otpValue[index] && e.target.previousElementSibling) {
                      e.target.previousElementSibling.focus();
                    }
                  }}
                  className={`w-11 h-11 text-center text-base font-bold bg-white border rounded-xl text-slate-900 focus:outline-none shadow-xs transition ${
                    otpError
                      ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  }`}
                />
              ))}
            </div>

            {/* Instant Error message on OTP */}
            {otpError && (
              <p className="text-xs text-rose-500 text-center font-medium flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {otpError}
              </p>
            )}

            {/* Explicit VERIFY OTP BUTTON */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleVerifyClick}
                disabled={isVerifyingOtp}
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isVerifyingOtp ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying with UIDAI...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Aadhaar OTP</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 p-3 rounded-xl mt-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>UIDAI Consent: Verified data is encrypted and handled in compliance with Aadhaar Act guidelines.</span>
            </div>
          </div>
        )}

        {/* Default hint before sending OTP */}
        {!otpSent && !aadhaarVerified && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 p-3 rounded-xl">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Click 'Send OTP' to request authentication code from UIDAI.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step2AadhaarAuth;
