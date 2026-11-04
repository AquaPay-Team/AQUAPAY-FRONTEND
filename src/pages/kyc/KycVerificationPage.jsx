import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  User, 
  CreditCard, 
  Building2, 
  Camera, 
  FileText, 
  Send, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Upload, 
  RefreshCw, 
  AlertCircle, 
  Check, 
  Smartphone, 
  Mail, 
  Calendar, 
  MapPin, 
  Lock, 
  Sparkles, 
  Store, 
  Video, 
  FileSignature,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import { toast } from "sonner";

export function KycVerificationPage() {
  const navigate = useNavigate();

  // Load existing logged-in user info if present
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const [currentStep, setCurrentStep] = useState(
    storedUser?.kyc?.currentStep ? Number(storedUser.kyc.currentStep) : 1
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(
    storedUser?.kyc?.status === "submitted" || storedUser?.kyc?.status === "under_review"
  );
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(30);
  const [panVerified, setPanVerified] = useState(false);
  const [panLoading, setPanLoading] = useState(false);
  const [savedDraftTime, setSavedDraftTime] = useState("Just now");

  // Form Data State
  const [formData, setFormData] = useState({
    // Step 1
    fullName: storedUser?.name || "Rahul Sharma",
    dob: "1995-08-14",
    phone: storedUser?.mobile || "9876543210",
    email: storedUser?.email || "rahul.sharma@example.com",
    address: "102, Green Valley Apartments, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",

    // Step 2
    aadhaarNumber: "1234 5678 9012",
    aadhaarOtp: "",

    // Step 3
    panNumber: "ABCDE1234F",
    panName: storedUser?.name ? storedUser.name.toUpperCase() : "RAHUL SHARMA",

    // Step 4
    accountNumber: "91827364501234",
    confirmAccountNumber: "91827364501234",
    ifscCode: "HDFC0001234",
    bankName: "HDFC Bank Ltd.",
    accountType: "Savings",

    // Step 5
    selfieFile: "selfie_rahul.jpg",
    videoFile: "kyc_video_clip.mp4",
    shopPhotoFile: "store_front_view.jpg",

    // Step 6
    agreedTerms: false,
    agreedDataProcessing: false,
    agreedCreditCheck: false,
  });

  // Step Definitions
  const steps = [
    { id: 1, name: "Basic Details", icon: User, desc: "Personal info" },
    { id: 2, name: "Aadhaar Auth", icon: Smartphone, desc: "UIDAI OTP verify" },
    { id: 3, name: "PAN Verification", icon: CreditCard, desc: "Tax ID validation" },
    { id: 4, name: "Bank Details", icon: Building2, desc: "Account payout" },
    { id: 5, name: "Media Uploads", icon: Camera, desc: "Photos & Video" },
    { id: 6, name: "Agreements", icon: FileSignature, desc: "Terms & consent" },
    { id: 7, name: "Review & Submit", icon: Send, desc: "Final application" },
  ];

  // Handling Form Change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle OTP timer
  useEffect(() => {
    let interval = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    } else if (otpTimer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const triggerOtp = () => {
    setOtpSent(true);
    setOtpTimer(30);
    toast.info("Aadhaar OTP sent to linked mobile number");
  };

  const handlePanVerify = () => {
    if (!formData.panNumber || formData.panNumber.length !== 10) {
      toast.error("Please enter a valid 10-character PAN number");
      return;
    }
    setPanLoading(true);
    setTimeout(() => {
      setPanLoading(false);
      setPanVerified(true);
      toast.success("PAN verified successfully with NSDL");
    }, 1200);
  };

  const handleNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmitApplication = () => {
    if (!formData.agreedTerms) {
      toast.error("Please agree to the Merchant Agreement before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Update user state in localStorage
      if (storedUser) {
        const updated = {
          ...storedUser,
          kyc: {
            ...(storedUser.kyc || {}),
            status: "under_review",
            submittedAt: new Date().toISOString(),
          },
        };
        localStorage.setItem("user", JSON.stringify(updated));
      }

      toast.success("KYC Application submitted successfully!");
    }, 1800);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top AQUAPAY Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          {/* AquaPay Brand Logo */}
          <div className="h-10 w-auto flex items-center">
            <img
              src="/aquapay-logo.png"
              alt="AquaPay"
              className="h-9 w-auto object-contain select-none brightness-0 invert"
            />
          </div>

          <div className="hidden sm:block border-l border-slate-700 pl-3">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50">
                KYC Verification Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Smart Payments. Seamless Future.</p>
          </div>
        </div>

        {/* Status / Auto-save Indicator & Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Draft Saved ({savedDraftTime})</span>
          </div>

          <button 
            type="button"
            onClick={() => {
              setSavedDraftTime("Just now");
              toast.success("KYC draft progress saved");
            }}
            className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="text-xs text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 px-3 py-1.5 rounded-lg border border-rose-800/40 transition flex items-center gap-1.5 cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        
        {/* Banner Announcement */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 via-cyan-900/20 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Merchant Onboarding KYC
                <span className="text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Level 2 Verified Merchant
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Complete all 7 steps to unlock instant AQUAPAY settlements, payout links, and POS terminal access.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
            Estimated time: <span className="text-cyan-400 font-semibold">~4 mins</span>
          </div>
        </div>

        {/* STEPPER HEADER (Progress Bar) */}
        <div className="mb-10 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
          {/* Top Progress Bar Line */}
          <div className="relative mb-6 hidden md:block">
            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-800">
              <div
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 transition-all duration-500 ease-out"
              ></div>
            </div>
          </div>

          {/* Step Icons List */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const isDone = step.id < currentStep || isSubmitted;
              const isCurrent = step.id === currentStep && !isSubmitted;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (step.id < currentStep || isDone) setCurrentStep(step.id);
                  }}
                  disabled={step.id > currentStep && !isDone}
                  className={`flex flex-col items-center p-2.5 rounded-xl transition-all duration-200 text-center relative ${
                    isCurrent
                      ? "bg-gradient-to-b from-blue-600/30 to-cyan-600/10 border border-cyan-500/60 text-white shadow-lg shadow-cyan-900/30 ring-1 ring-cyan-500/40"
                      : isDone
                      ? "bg-slate-800/60 hover:bg-slate-800 text-cyan-400 border border-slate-700/60 cursor-pointer"
                      : "bg-slate-950/40 text-slate-500 border border-slate-800/40 opacity-70 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-all ${
                      isCurrent
                        ? "bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isDone ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <span className={`text-xs font-semibold line-clamp-1 ${isCurrent ? "text-white" : isDone ? "text-slate-200" : "text-slate-500"}`}>
                    {step.id}. {step.name}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden lg:block mt-0.5">
                    {step.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP CONTENT CONTAINER */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg">
          
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 border border-blue-500/30">
                {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  Step {currentStep} of 7
                </span>
                <h2 className="text-lg font-bold text-white">
                  {steps[currentStep - 1].name}
                </h2>
              </div>
            </div>

            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700">
              AQUAPAY Secure Encryption Active
            </span>
          </div>

          {/* Form Content Body */}
          <div className="p-6 md:p-8 min-h-[380px]">
            
            {/* ---------------- STEP 1: BASIC DETAILS ---------------- */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-semibold text-slate-200">Personal & Identity Information</h3>
                  <p className="text-xs text-slate-400">Ensure details match official government IDs to prevent application rejection.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Legal Name <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder="As per Aadhaar/PAN"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Date of Birth <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleChange("dob", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Mobile Number (Linked with Aadhaar) <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Residential / Business Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      placeholder="Street, Flat/Shop No., Landmark"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Pincode</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- STEP 2: AADHAAR VERIFICATION ---------------- */}
            {currentStep === 2 && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center space-y-2 mb-6">
                  <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/30 text-cyan-400 rounded-2xl mx-auto flex items-center justify-center">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">Instant UIDAI Aadhaar Verification</h3>
                  <p className="text-xs text-slate-400">Enter your 12-digit Aadhaar number to receive a 6-digit OTP on your registered phone.</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Aadhaar Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={14}
                        value={formData.aadhaarNumber}
                        onChange={(e) => handleChange("aadhaarNumber", e.target.value)}
                        placeholder="XXXX XXXX XXXX"
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-base tracking-widest font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={triggerOtp}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-cyan-900/30 whitespace-nowrap cursor-pointer"
                      >
                        {otpSent ? "Resend OTP" : "Send OTP"}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="pt-4 border-t border-slate-800/80 space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300">Enter 6-Digit OTP sent to +91 ******3210</span>
                        <span className="text-cyan-400 font-mono">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</span>
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
                              setOtpValue(newArr);
                            }}
                            className="w-12 h-12 text-center text-lg font-bold bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none"
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl mt-3">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Mock Mode: Simulated OTP verification active. Auto-verifies upon clicking next step.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---------------- STEP 3: PAN VERIFICATION ---------------- */}
            {currentStep === 3 && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center space-y-2 mb-6">
                  <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/30 text-cyan-400 rounded-2xl mx-auto flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">PAN Card Real-time Verification</h3>
                  <p className="text-xs text-slate-400">Verify your Permanent Account Number directly with NSDL/UTIITSL databases.</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      PAN Number (10 Alphanumeric Digits)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={10}
                        value={formData.panNumber}
                        onChange={(e) => {
                          setPanVerified(false);
                          handleChange("panNumber", e.target.value.toUpperCase());
                        }}
                        placeholder="ABCDE1234F"
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-base uppercase tracking-widest font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={handlePanVerify}
                        disabled={panLoading || panVerified}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-medium transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                      >
                        {panLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                        {panVerified ? "Verified" : "Verify PAN"}
                      </button>
                    </div>
                  </div>

                  {panVerified && (
                    <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>PAN Verified Successfully with NSDL Database</span>
                      </div>
                      <div className="text-xs text-slate-300 grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/40">
                        <div>
                          <span className="text-slate-500 block">Name on Card:</span>
                          <span className="font-semibold text-white">{formData.panName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Status:</span>
                          <span className="text-emerald-400 font-medium">Active / Valid</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!panVerified && (
                    <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Click 'Verify PAN' to simulate live check. Tax verification ensures fast approval of high-volume merchant transactions.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---------------- STEP 4: BANK ACCOUNT DETAILS ---------------- */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-semibold text-slate-200">Payout Bank Details</h3>
                  <p className="text-xs text-slate-400">All AQUAPAY sales settlements will be credited directly to this verified account.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Bank Account Number <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => handleChange("accountNumber", e.target.value)}
                      placeholder="Enter account number"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Confirm Account Number <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.confirmAccountNumber}
                      onChange={(e) => handleChange("confirmAccountNumber", e.target.value)}
                      placeholder="Re-enter account number"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      IFSC Code <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ifscCode}
                      onChange={(e) => handleChange("ifscCode", e.target.value.toUpperCase())}
                      placeholder="e.g. HDFC0001234"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-cyan-300 uppercase font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => handleChange("bankName", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["Savings", "Current", "Overdraft"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleChange("accountType", type)}
                        className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition cursor-pointer ${
                          formData.accountType === type
                            ? "bg-blue-600/20 border-cyan-500 text-cyan-300"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span>{type} Account</span>
                        {formData.accountType === type && <Check className="w-4 h-4 text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-cyan-950/20 border border-cyan-800/30 rounded-xl flex items-center gap-3 text-xs text-cyan-300">
                  <Sparkles className="w-5 h-5 shrink-0 text-cyan-400" />
                  <span>AQUAPAY conducts a 1-Rupee penny-drop verification upon submission to instantly validate account holder match.</span>
                </div>
              </div>
            )}

            {/* ---------------- STEP 5: MEDIA & UPLOADS ---------------- */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-semibold text-slate-200">Visual Verification & Store Photos</h3>
                  <p className="text-xs text-slate-400">Upload recent clear photos and a short video clip for visual identity match.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Selfie Upload */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 text-cyan-400 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Live Selfie</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Clear face without glasses/hat</p>
                    </div>

                    <div className="w-full h-32 rounded-xl border-2 border-dashed border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center p-2 text-center group hover:border-cyan-500/50 transition">
                      {formData.selfieFile ? (
                        <div className="flex flex-col items-center space-y-1">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          <span className="text-xs text-slate-300 truncate max-w-[140px]">{formData.selfieFile}</span>
                          <span className="text-[10px] text-emerald-400 font-medium">Ready</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition mb-1" />
                          <span className="text-xs text-slate-400">Click to upload photo</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Video KYC Upload */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 text-cyan-400 flex items-center justify-center">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Video KYC Recording</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">5-sec video reading OTP aloud</p>
                    </div>

                    <div className="w-full h-32 rounded-xl border-2 border-dashed border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center p-2 text-center group hover:border-cyan-500/50 transition">
                      {formData.videoFile ? (
                        <div className="flex flex-col items-center space-y-1">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          <span className="text-xs text-slate-300 truncate max-w-[140px]">{formData.videoFile}</span>
                          <span className="text-[10px] text-emerald-400 font-medium">Video Uploaded</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition mb-1" />
                          <span className="text-xs text-slate-400">Click to record or upload</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Shop Photo Upload */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 text-cyan-400 flex items-center justify-center">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Shop / Office Photo</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Exterior view with signboard</p>
                    </div>

                    <div className="w-full h-32 rounded-xl border-2 border-dashed border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center p-2 text-center group hover:border-cyan-500/50 transition">
                      {formData.shopPhotoFile ? (
                        <div className="flex flex-col items-center space-y-1">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          <span className="text-xs text-slate-300 truncate max-w-[140px]">{formData.shopPhotoFile}</span>
                          <span className="text-[10px] text-emerald-400 font-medium">Shop Image Ready</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition mb-1" />
                          <span className="text-xs text-slate-400">Click to upload store image</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- STEP 6: AGREEMENTS & CONSENT ---------------- */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-semibold text-slate-200">Merchant Agreement & Terms</h3>
                  <p className="text-xs text-slate-400">Review terms of AQUAPAY payment gateway services, privacy rules, and settlements.</p>
                </div>

                {/* Terms Scroll Box */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 h-48 overflow-y-auto text-xs text-slate-400 space-y-3 leading-relaxed shadow-inner scrollbar-thin">
                  <h5 className="font-bold text-white">1. Master Services Agreement</h5>
                  <p>
                    By agreeing to this Merchant Onboarding Framework, you authorize AQUAPAY Technologies Pvt. Ltd. to process payment gateway collections, settlements, refunds, and chargebacks on behalf of your business entity.
                  </p>
                  <h5 className="font-bold text-white">2. Data Privacy & Compliance</h5>
                  <p>
                    We collect personal data including Aadhaar, PAN, and Bank details strictly in compliance with RBI KYC norms and PMLA regulations. Your data is encrypted using 256-bit AES standards.
                  </p>
                  <h5 className="font-bold text-white">3. Payout Timelines</h5>
                  <p>
                    Standard T+1 settlement cycles apply. Instant settlements can be triggered via AQUAPAY Dashboard subject to risk check evaluations.
                  </p>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedTerms}
                      onChange={(e) => handleChange("agreedTerms", e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-950 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300">
                      I have read, understood, and accept the <span className="text-cyan-400 underline">AQUAPAY Merchant Agreement</span> and Fee Schedule.
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedDataProcessing}
                      onChange={(e) => handleChange("agreedDataProcessing", e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-950 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300">
                      I authorize AQUAPAY to pull UIDAI and NSDL records for official verification purposes.
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedCreditCheck}
                      onChange={(e) => handleChange("agreedCreditCheck", e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-950 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300">
                      I confirm that all provided business details, documents, and payout accounts belong to me.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* ---------------- STEP 7: REVIEW & SUBMIT ---------------- */}
            {currentStep === 7 && !isSubmitted && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-semibold text-slate-200">Final Summary & Application Review</h3>
                  <p className="text-xs text-slate-400">Please review all submitted details before triggering final AQUAPAY verification.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Info Summary */}
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2">
                      <span>Personal Info</span>
                      <button type="button" onClick={() => setCurrentStep(1)} className="text-slate-400 hover:text-white underline cursor-pointer">Edit</button>
                    </div>
                    <div className="text-xs space-y-1 text-slate-300">
                      <p><span className="text-slate-500">Name:</span> {formData.fullName}</p>
                      <p><span className="text-slate-500">DOB:</span> {formData.dob}</p>
                      <p><span className="text-slate-500">Phone:</span> +91 {formData.phone}</p>
                      <p><span className="text-slate-500">Email:</span> {formData.email}</p>
                      <p><span className="text-slate-500">Address:</span> {formData.address}, {formData.city}</p>
                    </div>
                  </div>

                  {/* ID & Verification */}
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2">
                      <span>Identity IDs</span>
                      <button type="button" onClick={() => setCurrentStep(2)} className="text-slate-400 hover:text-white underline cursor-pointer">Edit</button>
                    </div>
                    <div className="text-xs space-y-1 text-slate-300">
                      <p><span className="text-slate-500">Aadhaar:</span> {formData.aadhaarNumber}</p>
                      <p><span className="text-slate-500">PAN:</span> {formData.panNumber}</p>
                      <p className="text-emerald-400 font-semibold pt-1">✓ Verified via NSDL & UIDAI</p>
                    </div>
                  </div>

                  {/* Bank Account */}
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2">
                      <span>Payout Bank Account</span>
                      <button type="button" onClick={() => setCurrentStep(4)} className="text-slate-400 hover:text-white underline cursor-pointer">Edit</button>
                    </div>
                    <div className="text-xs space-y-1 text-slate-300">
                      <p><span className="text-slate-500">Bank:</span> {formData.bankName}</p>
                      <p><span className="text-slate-500">Account No:</span> {formData.accountNumber}</p>
                      <p><span className="text-slate-500">IFSC:</span> {formData.ifscCode}</p>
                      <p><span className="text-slate-500">Type:</span> {formData.accountType}</p>
                    </div>
                  </div>

                  {/* Uploads & Consent */}
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2">
                      <span>Documents & Legal</span>
                      <button type="button" onClick={() => setCurrentStep(5)} className="text-slate-400 hover:text-white underline cursor-pointer">Edit</button>
                    </div>
                    <div className="text-xs space-y-1 text-slate-300">
                      <p><span className="text-slate-500">Selfie:</span> Attached ({formData.selfieFile})</p>
                      <p><span className="text-slate-500">Video KYC:</span> Attached ({formData.videoFile})</p>
                      <p><span className="text-slate-500">Shop Image:</span> Attached ({formData.shopPhotoFile})</p>
                      <p className="text-emerald-400 font-semibold pt-1">✓ Terms & Declarations Signed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SUCCESS SUBMISSION STATE ---------------- */}
            {isSubmitted && (
              <div className="py-8 text-center space-y-6 max-w-lg mx-auto animate-fadeIn">
                <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">KYC Application Submitted!</h3>
                  <p className="text-xs text-slate-300">
                    Your AQUAPAY merchant verification reference ID is <span className="text-cyan-400 font-mono font-bold">AQP-88294-2026</span>
                  </p>
                </div>

                {/* Status Timeline */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verification Status Tracker</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-white">Document Submission</p>
                        <p className="text-[10px] text-emerald-400">Completed</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold animate-pulse">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-white">Automated Risk & Fraud Screening</p>
                        <p className="text-[10px] text-cyan-400">In progress (Est. 5 mins)</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 opacity-50">
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-300">AQUAPAY Merchant Account Activation</p>
                        <p className="text-[10px] text-slate-500">Pending step 2 completion</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-cyan-900/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to Dashboard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-6 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer"
                  >
                    Review Application
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Controls */}
          {!isSubmitted && (
            <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <div className="flex items-center space-x-3">
                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-900/30 transition hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitApplication}
                    disabled={isSubmitting || !formData.agreedTerms}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold px-8 py-2.5 rounded-xl shadow-xl shadow-emerald-900/30 transition disabled:opacity-50 hover:scale-[1.02] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit KYC Verification</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Security Footer Note */}
        <div className="mt-8 text-center text-slate-500 text-xs flex items-center justify-center space-x-4">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-cyan-500" /> 256-Bit SSL Encrypted
          </span>
          <span>•</span>
          <span>RBI KYC Compliant</span>
          <span>•</span>
          <span>AQUAPAY Verified Platform</span>
        </div>
      </main>
    </div>
  );
}

export default KycVerificationPage;
