import React, { useState, useRef } from "react";
import { 
  Lightbulb, 
  User, 
  Mic, 
  CreditCard, 
  Camera, 
  Video, 
  Store, 
  Upload, 
  CheckCircle2,
  Sparkles,
  Volume2
} from "lucide-react";

export function Step5MediaUploads({ formData, onFileUpload }) {
  const [activeTab, setActiveTab] = useState("consent"); // "consent" | "media" | "shop"

  const selfieRef = useRef(null);
  const videoRef = useRef(null);
  const shopRef = useRef(null);

  const handleSelect = (e, assetType, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file, assetType, fieldName);
    }
  };

  const nameVal = formData.fullName || "[Your Full Name]";
  const aadhaarVal = formData.aadhaarNumber || "[Your Aadhaar]";
  const panVal = formData.panNumber || "[Your PAN]";

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-bold text-slate-900">Video KYC Verification</h3>
        <p className="text-xs text-slate-500">
          Complete all 3 steps to verify your identity
        </p>
      </div>

      {/* 3 Step Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6 sm:gap-8 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("consent")}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === "consent"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            1. Consent Script
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("media")}
            className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "media"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>2. Upload Video & Selfie</span>
            {(formData.videoFile || formData.selfieFile) && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("shop")}
            className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "shop"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>3. Shop Image</span>
            {formData.shopPhotoFile && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>
        </div>
      </div>

      {/* Instruction Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-lg">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          Well-lit area
        </span>
        <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-lg">
          <User className="w-3.5 h-3.5 text-blue-500" />
          Face visible
        </span>
        <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-lg">
          <Mic className="w-3.5 h-3.5 text-emerald-500" />
          Speak clearly
        </span>
        <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-lg">
          <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
          Show ID to camera
        </span>
      </div>

      {/* TAB 1: CONSENT SCRIPTS */}
      {activeTab === "consent" && (
        <div className="space-y-4 animate-fadeIn">
          {/* English Script */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-extrabold text-[10px]">GB</span>
                ENGLISH — Read aloud on camera
              </span>
              <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> Voice Prompt
              </span>
            </div>
            <p className="text-[13.5px] text-slate-800 leading-relaxed font-serif sm:font-sans bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              "My name is <strong className="text-blue-700 underline underline-offset-2">{nameVal}</strong>, my Aadhaar number is <strong className="text-blue-700 underline underline-offset-2">{aadhaarVal}</strong>. My PAN card number is <strong className="text-blue-700 underline underline-offset-2">{panVal}</strong>. I want to use AquaPay. I will ensure I collect all KYC documents from customers for every transaction. I take full responsibility for any fraudulent activity under my ID and will provide required documents for any chargebacks."
            </p>
          </div>

          {/* Hindi Script */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold text-[10px]">IN</span>
                हिंदी — ज़ोर से पढ़ें
              </span>
            </div>
            <p className="text-[13.5px] text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              "मेरा नाम <strong className="text-blue-700 underline underline-offset-2">{nameVal}</strong> है, मेरा आधार नंबर <strong className="text-blue-700 underline underline-offset-2">{aadhaarVal}</strong> है। मेरा पैन कार्ड नंबर <strong className="text-blue-700 underline underline-offset-2">{panVal}</strong> है। मैं AquaPay का उपयोग करना चाहता हूँ। मैं सुनिश्चित करूँगा कि प्रत्येक लेन-देन में ग्राहक से सभी केवाईसी दस्तावेज़ लूँ। मेरे आईडी के तहत किसी भी धोखाधड़ी की पूरी जिम्मेदारी मेरी होगी।"
            </p>
          </div>

          {/* Gujarati Script */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">IN</span>
                ગુજરાતી — જોરથી વાંચો
              </span>
            </div>
            <p className="text-[13.5px] text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              "મારું નામ <strong className="text-blue-700 underline underline-offset-2">{nameVal}</strong> છે, મારો આધાર નંબર <strong className="text-blue-700 underline underline-offset-2">{aadhaarVal}</strong> છે. મારો પાન કાર્ડ નંબર <strong className="text-blue-700 underline underline-offset-2">{panVal}</strong> છે. હું AquaPay નો ઉપયોગ કરવા માંગું છું. હું ખાતરી કરીશ કે દરેક ટ્રાન્ઝેક્શનમાં ગ્રાહક પાસેથી તમામ KYC દસ્તાવેજો લઈશ. મારી ID હેઠળ થતી કોઈપણ છેતરપિંડી માટે સંપૂર્ણ જવાબદારી મારી રહેશે."
            </p>
          </div>

          {/* Quick Action to next tab */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
            >
              Ready to Record / Upload Video & Selfie →
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: UPLOAD VIDEO & SELFIE */}
      {activeTab === "media" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
          {/* Consent Video KYC Upload */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Video KYC Clip</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Record a 5-10 sec video reading any of the consent scripts above
              </p>
            </div>

            <input
              type="file"
              ref={videoRef}
              accept="video/*"
              className="hidden"
              onChange={(e) => handleSelect(e, "consent_video", "videoFile")}
            />

            <div
              onClick={() => videoRef.current?.click()}
              className="w-full h-36 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center p-3 text-center group hover:border-blue-500 hover:bg-blue-50/20 transition cursor-pointer shadow-xs"
            >
              {formData.videoFile ? (
                <div className="flex flex-col items-center space-y-1.5">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  <span className="text-xs text-slate-800 font-semibold truncate max-w-[200px]">
                    {typeof formData.videoFile === "string" ? formData.videoFile : formData.videoFile.name}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">Video Attached • Click to change</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition mb-1.5" />
                  <span className="text-xs text-slate-700 font-semibold">Click to select video file</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">MP4, WEBM, MOV up to 50MB</span>
                </>
              )}
            </div>
          </div>

          {/* Selfie Upload */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Live Agent Selfie</h4>
              <p className="text-xs text-slate-500 mt-0.5">Clear frontal headshot with plain background</p>
            </div>

            <input
              type="file"
              ref={selfieRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleSelect(e, "selfie", "selfieFile")}
            />

            <div
              onClick={() => selfieRef.current?.click()}
              className="w-full h-36 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center p-3 text-center group hover:border-blue-500 hover:bg-blue-50/20 transition cursor-pointer shadow-xs"
            >
              {formData.selfieFile ? (
                <div className="flex flex-col items-center space-y-1.5">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  <span className="text-xs text-slate-800 font-semibold truncate max-w-[200px]">
                    {typeof formData.selfieFile === "string" ? formData.selfieFile : formData.selfieFile.name}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">Photo Attached • Click to change</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition mb-1.5" />
                  <span className="text-xs text-slate-700 font-semibold">Click to upload photo</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG up to 10MB</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SHOP IMAGE */}
      {activeTab === "shop" && (
        <div className="max-w-xl mx-auto animate-fadeIn">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Shop / Office Exterior Photo</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Front exterior photo showing business signboard and entrance clearly
              </p>
            </div>

            <input
              type="file"
              ref={shopRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleSelect(e, "shop_image", "shopPhotoFile")}
            />

            <div
              onClick={() => shopRef.current?.click()}
              className="w-full h-40 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center p-3 text-center group hover:border-blue-500 hover:bg-blue-50/20 transition cursor-pointer shadow-xs"
            >
              {formData.shopPhotoFile ? (
                <div className="flex flex-col items-center space-y-1.5">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  <span className="text-xs text-slate-800 font-semibold truncate max-w-[220px]">
                    {typeof formData.shopPhotoFile === "string" ? formData.shopPhotoFile : formData.shopPhotoFile.name}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">Storefront Attached • Click to change</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition mb-1.5" />
                  <span className="text-xs text-slate-700 font-semibold">Click to upload store photo</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Ensure signboard is readable</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Step5MediaUploads;
