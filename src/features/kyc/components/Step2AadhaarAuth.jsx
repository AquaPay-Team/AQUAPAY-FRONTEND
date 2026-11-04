import React from "react";
import { Smartphone, CheckCircle2 } from "lucide-react";

export function Step2AadhaarAuth({
  formData,
  onChange,
  otpSent,
  otpTimer,
  otpValue,
  onOtpValueChange,
  onTriggerOtp,
}) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-2xl mx-auto flex items-center justify-center">
          <Smartphone className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Instant UIDAI Aadhaar Verification</h3>
        <p className="text-xs text-slate-500">
          Enter your 12-digit Aadhaar number to authenticate via UIDAI OTP or DigiLocker.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Aadhaar Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={14}
              value={formData.aadhaarNumber}
              onChange={(e) => onChange("aadhaarNumber", e.target.value)}
              placeholder="XXXX XXXX XXXX"
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-base tracking-widest font-mono text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
            <button
              type="button"
              onClick={onTriggerOtp}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition shadow-xs whitespace-nowrap cursor-pointer"
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>
          </div>
        </div>

        {otpSent && (
          <div className="pt-4 border-t border-slate-200 space-y-3 animate-fadeIn">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">
                Enter 6-Digit OTP sent to linked phone ({formData.phone ? `******${formData.phone.slice(-4)}` : "******3210"})
              </span>
              <span className="text-blue-600 font-mono font-bold">
                00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}
              </span>
            </div>

            <div className="flex justify-between gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otpValue[index] || ""}
                  onChange={(e) => {
                    const newArr = [...otpValue];
                    newArr[index] = e.target.value;
                    onOtpValueChange(newArr);
                  }}
                  className="w-12 h-12 text-center text-lg font-bold bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 focus:outline-none"
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl mt-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>UIDAI Security: Encrypted token authentication active.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step2AadhaarAuth;
