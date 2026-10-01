import React, { useState } from 'react';
import { PlanKey, StudentInfo, PricingDetails } from '../types';
import { PLANS } from '../data/mockData';

interface PaymentReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  selectedPlan: PlanKey;
  appliedCoupon: string | null;
  pricing: PricingDetails;
  onSubmit: (screenshotUrl?: string) => void;
}

export const PaymentReadyModal: React.FC<PaymentReadyModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  selectedPlan,
  appliedCoupon,
  pricing,
  onSubmit,
}) => {
  const [screenshotName, setScreenshotName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const plan = PLANS[selectedPlan];
  const name = studentInfo.fullName.trim() || 'Aarav Sharma';
  const phone = studentInfo.phoneNumber.trim() || '9876543210';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleWhatsAppSend = () => {
    const couponDetail = appliedCoupon
      ? `Coupon: ${appliedCoupon} (Saved ₹${pricing.discount})`
      : 'Coupon: None (Regular Pricing)';

    const messageText = `Hello Abhyas Arena,
I have completed the UPI payment for my child's Practice Pass.
• Student Name: ${name}
• Class/Grade: Class ${studentInfo.grade}
• WhatsApp Number: +91 ${phone}
• Selected Plan: ${plan.title}
• Amount Paid: ₹${pricing.finalPrice}
• ${couponDetail}
• Reference: UPI-ABHYAS-${Date.now().toString().slice(-6)}

Please confirm payment and send our login PIN & WhatsApp dashboard link!`;

    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919876543210?text=${encoded}`;

    // Note: AI Studio iframe security recommends standard window navigation or opening in new tab
    try {
      window.open(whatsappUrl, '_blank');
    } catch {
      // Fallback
    }

    onSubmit(previewUrl || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/60 backdrop-blur-xs px-4 py-6">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-float border border-slate-100 relative animate-discount-pop">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 cursor-pointer transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">
            Final Confirmation Step
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">Payment details ready to submit</h3>
          <p className="text-xs text-slate-500 mt-1">
            Please confirm your subscription details before sending on WhatsApp.
          </p>
        </div>

        {/* Detail Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs text-slate-700">
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Student:</span>
            <span className="font-bold text-slate-900 text-sm">
              {name} (Class {studentInfo.grade})
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">WhatsApp:</span>
            <span className="font-mono font-bold text-slate-900">+91 {phone}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Selected Plan:</span>
            <span className="font-bold text-slate-900">{plan.title}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Coupon:</span>
            <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {appliedCoupon || 'None'}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-700 font-bold">Amount Paid:</span>
            <span className="font-mono font-extrabold text-brand-900 text-base">
              ₹{pricing.finalPrice}
            </span>
          </div>
        </div>

        {/* Optional Screenshot Attachment Box */}
        <label className="mt-4 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between text-xs cursor-pointer block">
          <div className="flex items-center space-x-2.5 text-slate-600">
            {previewUrl ? (
              <img src={previewUrl} alt="Screenshot" className="w-8 h-8 rounded object-cover border" />
            ) : (
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            )}
            <div>
              <span className="font-semibold text-slate-800 block">
                {screenshotName ? `Attached: ${screenshotName}` : 'Attach Payment Screenshot (Optional)'}
              </span>
              <span className="text-[11px] text-slate-400">JPG, PNG or PDF under 5MB</span>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-xs font-bold text-cyan-600 hover:text-cyan-700">
            {screenshotName ? 'Change' : 'Browse'}
          </span>
        </label>

        {/* WHATSAPP CTA BUTTON */}
        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="w-full py-4 px-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.51-4.58-1.385l-.328-.219-2.956.775.789-2.879-.214-.341A8.136 8.136 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167s8.167 3.664 8.167 8.167-3.664 8.167-8.167 8.167z" />
            </svg>
            <span>Send Details on WhatsApp →</span>
          </button>
          <p className="text-[11px] text-center text-slate-400">
            Opens WhatsApp app with your message pre-composed
          </p>
        </div>
      </div>
    </div>
  );
};
