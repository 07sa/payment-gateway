import React from 'react';

interface StepProgressProps {
  currentStep: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  const steps = [
    { num: '01', title: 'Select Plan', id: 1 },
    { num: '02', title: 'Student Info', id: 2 },
    { num: '03', title: 'Scan UPI QR', id: 3 },
    { num: '04', title: 'WhatsApp Activation', id: 4 },
  ];

  return (
    <div className="bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-400">
          {steps.map((step, idx) => {
            const isCurrent = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center space-x-2 transition-colors ${
                    isCurrent
                      ? 'text-cyan-700 font-bold'
                      : isCompleted
                      ? 'text-emerald-700 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCurrent
                        ? 'bg-cyan-100 text-cyan-800 ring-2 ring-cyan-500/20'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isCompleted ? '✓' : step.num}
                  </span>
                  <span className="hidden xs:inline">{step.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-16 h-0.5 transition-colors ${
                      isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
