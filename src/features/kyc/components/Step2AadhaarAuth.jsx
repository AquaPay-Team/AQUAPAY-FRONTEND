import React, { useState, useRef, useEffect } from "react";
import {
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Lock,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";

/**
 * Step 2 – Normal Aadhaar OTP Verification
 *
 * Flow:
 * 1. User enters 12-digit Aadhaar card number.
 * 2. Clicks "Send OTP" -> triggers UIDAI OTP to their Aadhaar-registered mobile.
 * 3. 6 OTP input boxes appear with 60-second countdown timer.
 * 4. User inputs the OTP received on their mobile.
 * 5. Clicks "Verify Aadhaar OTP" -> validates and marks verified.
 * 6. Advances to Step 3 (PAN Verification).
 */
export function Step2AadhaarAuth({
  formData = {},
  onChange = () => {},
  otpSent = false,
  otpTimer = 60,
  otpValue = ["", "", "", "", "", ""],
  onOtpValueChange = () => {},
  onTriggerOtp = () => {},
  aadhaarVerified = false,
  isVerifyingOtp = false,
  onVerifyOtp = () => {},
  verifiedData = {},
  isInitiating = false,
  onResetOtp = null,
}) {
  const [aadhaarError, setAadhaarError] = useState("");
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef([]);

  const cleanAadhaar = String(formData.aadhaarNumber || "").replace(/\D/g, "");

  // Format Aadhaar with spaces: "XXXX XXXX XXXX"
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

  // Handle single digit input with auto-advance and paste support
  const handleOtpDigitChange = (index, e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setOtpError("");

    // Support paste of entire 6-digit OTP
    if (raw.length > 1) {
      const digits = raw.slice(0, 6).split("");
      const newArr = [...otpValue];
      digits.forEach((d, i) => {
        if (index + i < 6) newArr[index + i] = d;
      });
      onOtpValueChange(newArr);
      const nextFocus = Math.min(index + digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newArr = [...otpValue];
    newArr[index] = raw;
    onOtpValueChange(newArr);

    if (raw && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtpClick = () => {
    if (cleanAadhaar.length !== 12) {
      setAadhaarError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setAadhaarError("");
    onTriggerOtp();
  };

  const handleVerifyClick = () => {
    const entered = otpValue.join("");
    if (entered.length !== 6) {
      setOtpError("Please enter all 6 digits of the OTP received on your mobile.");
      return;
    }
    setOtpError("");
    onVerifyOtp();
  };

  // Auto-focus first OTP box when OTP is dispatched
  useEffect(() => {
    if (otpSent && !aadhaarVerified) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 200);
    }
  }, [otpSent, aadhaarVerified]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="text-center space-y-1.5 mb-6">
        <div className="w-11 h-11 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl mx-auto flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">Aadhaar Identity Verification</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Enter your 12-digit Aadhaar number. A real OTP will be sent by UIDAI to your
          Aadhaar-linked mobile number for verification.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-5 md:p-6 rounded-2xl space-y-5">
        {/* Aadhaar Input Section */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Aadhaar Card Number (12 Digits) <span className="text-rose-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              maxLength={14}
              disabled={aadhaarVerified || isInitiating}
              value={formData.aadhaarNumber || ""}
              onChange={handleAadhaarChange}
              placeholder="•••• •••• ••••"
              className={`flex-1 bg-white border rounded-xl px-4 py-3 text-base tracking-widest font-mono text-slate-900 focus:outline-none transition placeholder:tracking-normal placeholder:font-sans placeholder:text-sm ${
                aadhaarError
                  ? "border-amber-400 bg-amber-50/20 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  : aadhaarVerified
                  ? "border-emerald-300 bg-emerald-50/20 text-slate-700 cursor-not-allowed"
                  : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
              }`}
            />
            <button
              type="button"
              disabled={aadhaarVerified || cleanAadhaar.length !== 12 || isInitiating}
              onClick={handleSendOtpClick}
              className="bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold px-6 py-3 rounded-xl text-xs transition shadow-xs whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isInitiating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending OTP…</span>
                </>
              ) : otpSent ? (
                <span>Resend OTP</span>
              ) : (
                <span>Send OTP</span>
              )}
            </button>
          </div>

          {/* Aadhaar Input Feedback */}
          {aadhaarError && (
            <p className="text-xs text-amber-600 mt-2 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {aadhaarError}
            </p>
          )}

          {!aadhaarError && cleanAadhaar.length === 12 && !otpSent && !aadhaarVerified && (
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              12-digit Aadhaar complete. Click 'Send OTP' to request authentication code.
            </p>
          )}
        </div>

        {/* ───────────── OTP Entry Section (Shown when OTP is sent) ───────────── */}
        {otpSent && !aadhaarVerified && (
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 font-medium flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>
                  Enter 6-digit OTP sent to your Aadhaar-linked mobile
                  {formData.phone ? ` (ending in •••• ${formData.phone.slice(-4)})` : ""}
                </span>
              </span>
              <span className="text-blue-700 font-mono font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}
              </span>
            </div>

            {/* 6 OTP Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-2.5 max-w-xs mx-auto pt-1">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpValue[index] || ""}
                  onChange={(e) => handleOtpDigitChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-11 h-12 sm:w-12 sm:h-12 text-center text-lg font-bold bg-white border rounded-xl text-slate-900 focus:outline-none shadow-xs transition ${
                    otpError
                      ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  }`}
                />
              ))}
            </div>

            {/* OTP Error */}
            {otpError && (
              <p className="text-xs text-rose-500 text-center font-medium flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {otpError}
              </p>
            )}

            {/* Verify OTP Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleVerifyClick}
                disabled={isVerifyingOtp || otpValue.join("").length !== 6}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold px-8 py-3 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isVerifyingOtp ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with UIDAI…</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Aadhaar OTP</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onTriggerOtp}
                disabled={otpTimer > 0 || isInitiating}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 disabled:text-slate-400 disabled:no-underline cursor-pointer"
              >
                {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
              </button>

              {onResetOtp && (
                <button
                  type="button"
                  onClick={onResetOtp}
                  className="text-xs text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  Change Aadhaar Number
                </button>
              )}
            </div>

            {/* Helpful UIDAI Link */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onTriggerOtp}
                className="text-[11px] text-slate-500 hover:text-blue-600 inline-flex items-center gap-1 cursor-pointer transition"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Didn't receive code? Click to reopen UIDAI portal</span>
              </button>
            </div>
          </div>
        )}

        {/* ───────────── Verified Aadhaar Card State ───────────── */}
        {aadhaarVerified && (
          <div className="p-5 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Aadhaar e-KYC Verified Successfully via UIDAI</span>
            </div>

            <div className="text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-emerald-200/60">
              <div>
                <span className="text-slate-500 block text-[11px] mb-0.5">Verified Legal Name</span>
                <span className="font-semibold text-slate-900">
                  {verifiedData?.verifiedName || formData.fullName || "Verified User"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] mb-0.5">Masked Aadhaar ID</span>
                <span className="font-mono font-semibold text-slate-900">
                  {verifiedData?.maskedIdentifier || `•••• •••• ${cleanAadhaar.slice(-4) || "9999"}`}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] mb-0.5">Authentication Status</span>
                <span className="text-emerald-700 font-semibold">Active &amp; Biometrically Valid</span>
              </div>
            </div>

            <p className="text-xs text-emerald-800 pt-2 font-medium">
              ✓ Aadhaar verification complete. Click 'Continue to Step 3' below to verify your PAN.
            </p>
          </div>
        )}

        {/* Default hint before sending OTP */}
        {!otpSent && !aadhaarVerified && (
          <div className="flex items-start gap-2.5 text-xs text-slate-500 bg-white border border-slate-200 p-3.5 rounded-xl">
            <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Enter your 12-digit Aadhaar number and click <strong>'Send OTP'</strong>. You will
              receive a one-time password on the mobile number linked with your Aadhaar.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step2AadhaarAuth;
