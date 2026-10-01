import React from 'react';
import { StudentInfo } from '../types';

interface StudentInfoFormProps {
  studentInfo: StudentInfo;
  onChange: (info: Partial<StudentInfo>) => void;
}

export const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
  studentInfo,
  onChange,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Step 2 of 4</span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Information</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter details to associate the subscription and receive WhatsApp activation.
          </p>
        </div>

        {/* Grade Selection Badge Segment */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Grade:</span>
          {(['4', '5', '6', '7'] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onChange({ grade: g })}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                studentInfo.grade === g
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Class {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="studentNameInput"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Student Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="studentNameInput"
              type="text"
              value={studentInfo.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* WhatsApp Mobile Number */}
        <div>
          <label
            htmlFor="studentPhoneInput"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            WhatsApp Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex">
            <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold font-mono">
              +91
            </span>
            <input
              id="studentPhoneInput"
              type="tel"
              maxLength={10}
              value={studentInfo.phoneNumber}
              onChange={(e) => {
                const numericOnly = e.target.value.replace(/\D/g, '');
                onChange({ phoneNumber: numericOnly });
              }}
              placeholder="10-digit mobile number"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-sm font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Privacy Reassurance Callout */}
      <div className="mt-4 flex items-start space-x-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
        <svg
          className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <p>
          <strong className="font-semibold text-slate-800">Privacy Reassurance:</strong> This number will
          be used only for payment confirmation and sending your subscription details on WhatsApp. No spam or
          promotional calls.
        </p>
      </div>
    </section>
  );
};
