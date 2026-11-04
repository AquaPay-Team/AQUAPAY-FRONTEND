import React, { useState } from "react";
import { 
  Download, 
  Printer, 
  RotateCw, 
  Menu, 
  ZoomIn, 
  ZoomOut,
  Maximize2,
  FileCheck2,
  Check
} from "lucide-react";
import { toast } from "sonner";

export function Step6Agreements({ formData, onChange }) {
  const [zoomLevel, setZoomLevel] = useState(100);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const agentName = formData.fullName || "[Agent Name]";
  const agentCity = formData.city ? `${formData.city} City` : "[Place]";
  const agentMobile = formData.phone || "[Mobile Number]";

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Downloading AquaPay Agent Agreement (PDF)...");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">AquaPay Agent Agreement</h3>
          <p className="text-xs text-slate-500">
            Review and digitally execute your formal Merchant & Agent Master Agreement.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
          Version 1.0 (Official)
        </span>
      </div>

      {/* Embedded Sleek PDF Document Viewer */}
      <div className="rounded-2xl border border-slate-300 shadow-md overflow-hidden bg-slate-700">
        
        {/* PDF Viewer Dark Toolbar */}
        <div className="bg-[#323639] text-slate-200 px-4 py-2.5 flex items-center justify-between text-xs select-none">
          {/* Left: Menu & Hash Title */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="text-slate-300 hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer"
              title="Menu"
            >
              <Menu size={16} />
            </button>
            <span className="font-mono text-[11px] text-slate-300 truncate max-w-[180px] sm:max-w-[280px]">
              4cfb7c48-5913-44e0-8b2c-5e75b346ff14
            </span>
          </div>

          {/* Middle: Page & Zoom Controls */}
          <div className="flex items-center space-x-2">
            <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] font-mono text-slate-300">
              1 / 1
            </span>
            <div className="h-4 w-px bg-slate-600 hidden sm:block"></div>
            
            <div className="hidden sm:flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-[11px] font-mono w-12 text-center text-slate-300">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
            </div>
          </div>

          {/* Right: Actions (Rotate, Download, Print) */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleDownload}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition cursor-pointer"
              title="Download Agreement"
            >
              <Download size={15} />
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition cursor-pointer"
              title="Print Document"
            >
              <Printer size={15} />
            </button>
          </div>
        </div>

        {/* PDF Canvas Viewport */}
        <div className="bg-[#525659] p-4 sm:p-8 md:p-10 overflow-x-auto min-h-[560px] flex justify-center items-start">
          
          {/* Authentic A4 Document Page */}
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
            className="w-full max-w-[740px] bg-white text-slate-900 shadow-2xl p-8 sm:p-14 md:p-16 transition-transform duration-200 font-sans"
          >
            {/* Agreement Document Title */}
            <div className="text-center mb-8">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 underline underline-offset-4 decoration-1">
                AquaPay Agent Agreement
              </h1>
            </div>

            {/* Intro Parties Clause */}
            <div className="space-y-4 text-[13px] sm:text-sm text-slate-800 leading-relaxed mb-6">
              <p>
                This Agent Agreement (<strong>"Agreement"</strong>) is made on this{" "}
                <span className="font-semibold underline">{currentDate}</span> by and between:
              </p>

              <p>
                <strong>AquaPay</strong>, a company incorporated under the Companies Act, 2013, hereinafter referred to as the <strong>"Company"</strong>.
              </p>

              <p className="font-bold tracking-wider text-xs uppercase text-slate-600">
                AND
              </p>

              <p>
                <strong className="underline">{agentName}</strong>, residing at{" "}
                <span className="underline">{agentCity}</span>, hereinafter referred to as the <strong>"Agent"</strong>
              </p>
            </div>

            {/* 10 Clauses List */}
            <ol className="space-y-3.5 text-[12.5px] sm:text-[13.5px] text-slate-800 leading-relaxed list-none mb-10 pl-0">
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">1.</span>
                <span>
                  I hereby undertake to use Payment Gateway services with my "user ID" only after agreeing to the online agreement on AquaPay portal.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">2.</span>
                <span>
                  I hereby declare that I will use my own Credit Card/Debit Card/Net banking/UPI only.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">3.</span>
                <span>
                  In case of any chargeback or fraud transaction claim, AquaPay reserves the right to recover the amount.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">4.</span>
                <span>
                  AquaPay may suspend settlement during suspicious activities.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">5.</span>
                <span>
                  I agree to use services only for legal business purposes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">6.</span>
                <span>
                  I will not tamper, hack, or misuse the services.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">7.</span>
                <span>
                  AquaPay shall not be liable for any damages arising from misuse.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">8.</span>
                <span>
                  I confirm all information provided by me is correct.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">9.</span>
                <span>
                  I do not have any criminal background.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold shrink-0">10.</span>
                <span>
                  This declaration is made voluntarily and knowingly.
                </span>
              </li>
            </ol>

            {/* Signature Block Separator Line */}
            <div className="border-t border-slate-900 my-8"></div>

            {/* Signature Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-xs text-slate-800 font-medium mb-12">
              <p>
                <span className="text-slate-500">Date:</span> {currentDate}
              </p>
              <p>
                <span className="text-slate-500">Place:</span> {agentCity}
              </p>
              <p>
                <span className="text-slate-500">Signature Name:</span> <strong>{agentName}</strong>
              </p>
              <p>
                <span className="text-slate-500">Mobile Number:</span> {agentMobile}
              </p>
            </div>

            {/* System Generated Stamp */}
            <div className="text-center pt-4 border-t border-dashed border-slate-300">
              <p className="text-[11px] text-slate-500 italic">
                This is a system generated document. No physical signature required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Acceptance Checkbox Section */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreedTerms}
            onChange={(e) => onChange("agreedTerms", e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white cursor-pointer accent-blue-600"
          />
          <div className="text-xs text-slate-800">
            <span className="font-bold text-slate-900">
              I have read, understood, and accept the AquaPay Agent Agreement in its entirety.
            </span>
            <p className="text-slate-600 mt-0.5">
              By checking this box, I authorize electronic stamping and execution of this contract under the Information Technology Act.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Step6Agreements;
