import React from "react";
import { User, Calendar, Smartphone, Mail, MapPin, Briefcase } from "lucide-react";

export function Step1BasicDetails({ formData, onChange, errors = {} }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-sm font-bold text-slate-900">Personal & Business Information</h3>
        <p className="text-xs text-slate-500">
          Ensure all required details match official government IDs and business registration to proceed to Step 2.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Legal Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={formData.fullName || ""}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="As per Aadhaar/PAN"
              className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.fullName
                  ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Date of Birth <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => onChange("dob", e.target.value)}
              className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 transition ${
                errors.dob
                  ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
              }`}
            />
          </div>
          {errors.dob && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.dob}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Mobile Number (Aadhaar linked) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              maxLength={10}
              value={formData.phone || ""}
              onChange={(e) => onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit mobile number"
              className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.phone
                  ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="yourname@domain.com"
              className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Business Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Business Type <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <select
              value={formData.businessType || "Retail Merchant"}
              onChange={(e) => onChange("businessType", e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            >
              <option value="Retail Merchant">Retail Merchant</option>
              <option value="Wholesaler">Wholesaler / Distributor</option>
              <option value="Water Utility Provider">Water Utility Provider</option>
              <option value="Individual Business">Sole Proprietorship</option>
              <option value="Private Limited">Private Limited Company</option>
            </select>
          </div>
        </div>

        {/* Shop Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Shop / Business Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={formData.shopAddress || formData.address || ""}
              onChange={(e) => onChange("shopAddress", e.target.value)}
              placeholder="Shop No., Street, Landmark"
              className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.shopAddress
                  ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
              }`}
            />
          </div>
          {errors.shopAddress && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.shopAddress}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            City <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.city || ""}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="City / District"
            className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 transition ${
              errors.city
                ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
            }`}
          />
          {errors.city && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            State <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.state || ""}
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="State"
            className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 transition ${
              errors.state
                ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
            }`}
          />
          {errors.state && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.state}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Pincode <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            maxLength={6}
            value={formData.pincode || ""}
            onChange={(e) => onChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="6-digit PIN code"
            className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 transition ${
              errors.pincode
                ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
            }`}
          />
          {errors.pincode && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.pincode}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step1BasicDetails;
