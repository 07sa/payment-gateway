import React from 'react';
import { PlanKey, StudentInfo, PricingDetails } from '../types';
import { PLANS } from '../data/mockData';

interface SuccessScreenProps {
  studentInfo: StudentInfo;
  selectedPlan: PlanKey;
  appliedCoupon: string | null;
  pricing: PricingDetails;
  onReset: () => void;
  onOpenArena: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  studentInfo,
  selectedPlan,
  appliedCoupon,
  pricing,
  onReset,
  onOpenArena,
}) => {
  const plan = PLANS[selectedPlan];
  const name = studentInfo.fullName.trim() || 'Aarav Sharma';
  const phone = studentInfo.phoneNumber.trim() || '9876543210';
  const orderRef = `ABH-UPI-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-9 shadow-float border border-slate-200 text-center animate-discount-pop">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xs">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
        </div>

        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Details Submitted
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Almost Done! 🎉
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
          Your payment details have been sent for confirmation.
        </p>

        {/* Summary of Submission */}
        <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Order Reference:</span>
            <span className="font-mono font-bold text-slate-700">{orderRef}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Student Name:</span>
            <span className="font-bold text-slate-900">
              {name} (Class {studentInfo.grade})
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Selected Plan:</span>
            <span className="font-bold text-slate-900">{plan.title}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Coupon Used:</span>
            <span className="font-mono font-bold text-emerald-600">
              {appliedCoupon ? `${appliedCoupon} (Save ₹${pricing.discount})` : 'None'}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Amount:</span>
            <span className="font-mono font-bold text-brand-900">₹{pricing.finalPrice}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 font-medium">WhatsApp Number:</span>
            <span className="font-mono font-bold text-slate-900">+91 {phone}</span>
          </div>
        </div>

        {/* Verification explanation */}
        <div className="mt-5 p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/80 text-xs text-cyan-900 leading-relaxed text-left flex items-start space-x-3">
          <svg className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <p>
            We’ll confirm your payment and activate your Practice Pass within 15–30 minutes. You will receive an instant login PIN directly on WhatsApp.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onOpenArena}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
          >
            <span>🚀 Try Practice Quests Now (Instant Demo)</span>
          </button>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-all shadow-xs"
          >
            <span>Open WhatsApp Chat Again</span>
          </a>

          <button
            type="button"
            onClick={onReset}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Return to Checkout / Change Details
          </button>
        </div>

        {/* Need Help Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center space-x-2">
          <span>Need help?</span>
          <a
            href="https://wa.me/919876543210?text=Help%20with%20payment%20activation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cyan-700 underline"
          >
            Chat with Abhyas Support on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
