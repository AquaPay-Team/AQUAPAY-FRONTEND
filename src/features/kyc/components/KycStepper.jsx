import React from "react";
import { Check, Lock } from "lucide-react";
import { toast } from "sonner";

export function KycStepper({
  steps,
  currentStep,
  completedSteps = [],
  onSelectStep,
  isSubmitted,
}) {
  return (
    <div className="mb-8 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Top Progress Bar Line */}
      <div className="relative mb-6 hidden md:block">
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-100">
          <div
            style={{
              width: `${(completedSteps.length / steps.length) * 100}%`,
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 transition-all duration-500 ease-out"
          ></div>
        </div>
      </div>

      {/* Step Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isDone = completedSteps.includes(step.id) || isSubmitted;
          const isCurrent = step.id === currentStep && !isSubmitted;

          // Check if all preceding steps are completed
          const allPreviousStepsDone = steps
            .filter((s) => s.id < step.id)
            .every((s) => completedSteps.includes(s.id));

          // Step 1 is always accessible. Subsequent steps require all previous steps to be completed.
          const isAccessible = step.id === 1 || allPreviousStepsDone || isDone;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                if (isAccessible) {
                  onSelectStep(step.id);
                } else {
                  toast.error(
                    `Step ${step.id - 1} must be completed before you can access Step ${step.id} (${step.name}).`
                  );
                }
              }}
              disabled={!isAccessible}
              className={`flex flex-col items-center p-2.5 rounded-xl transition-all duration-200 text-center relative select-none ${
                isCurrent
                  ? "bg-blue-50/70 border border-blue-500 text-blue-700 shadow-xs ring-1 ring-blue-500/20 cursor-default"
                  : isDone
                  ? "bg-emerald-50/70 hover:bg-emerald-100/60 text-emerald-700 border border-emerald-200 cursor-pointer"
                  : isAccessible
                  ? "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 cursor-pointer"
                  : "bg-slate-50/80 text-slate-400 border border-slate-200/50 opacity-60 cursor-not-allowed"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-all ${
                  isCurrent
                    ? "bg-gradient-to-tr from-blue-600 to-cyan-600 text-white shadow-xs"
                    : isDone
                    ? "bg-emerald-500 text-white shadow-xs"
                    : isAccessible
                    ? "bg-slate-200 text-slate-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isDone ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : !isAccessible ? (
                  <Lock className="w-4 h-4 text-slate-400" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              <span
                className={`text-xs font-semibold line-clamp-1 ${
                  isCurrent
                    ? "text-blue-900"
                    : isDone
                    ? "text-emerald-900"
                    : isAccessible
                    ? "text-slate-700"
                    : "text-slate-400"
                }`}
              >
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
  );
}

export default KycStepper;
