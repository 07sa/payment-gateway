import React, { useState } from 'react';

interface CouponSectionProps {
  appliedCoupon: string | null;
  currentDiscount: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  validationMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  shakeTrigger: boolean;
}

export const CouponSection: React.FC<CouponSectionProps> = ({
  appliedCoupon,
  currentDiscount,
  onApplyCoupon,
  onRemoveCoupon,
  validationMessage,
  shakeTrigger,
}) => {
  const [inputCode, setInputCode] = useState('');

  const handleApply = () => {
    if (!inputCode.trim()) return;
    onApplyCoupon(inputCode.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApply();
    }
  };

  return (
    <section
      id="couponSectionContainer"
      className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-card p-5 sm:p-7 relative transition-all"
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold shrink-0">
            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Have a Coupon Code?</h3>
            <p className="text-xs text-slate-500">Apply discounts to your subscription pass instantly.</p>
          </div>
        </div>

        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all ${
            appliedCoupon
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
              : 'text-slate-500 bg-slate-100 border-slate-200'
          }`}
        >
          {appliedCoupon ? '1 Active Offer' : 'No Coupon Active'}
        </span>
      </div>

      <div className="space-y-3.5">
        {/* Active Coupon Card (Shown when applied) */}
        {appliedCoupon && (
          <div className="bg-gradient-to-r from-emerald-50/95 via-teal-50/50 to-white border border-emerald-300 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-slide-down">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-extrabold text-emerald-950 text-sm tracking-wider uppercase">
                    {appliedCoupon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                    Applied
                  </span>
                </div>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                  {appliedCoupon} Applied!{' '}
                  <span className="font-bold font-mono">₹{currentDiscount}</span> Instant Discount unlocked!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onRemoveCoupon}
              className="self-end sm:self-auto px-3.5 py-1.5 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-bold text-xs rounded-lg border border-slate-200 hover:border-rose-300 transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                />
              </svg>
              <span>Remove Coupon</span>
            </button>
          </div>
        )}

        {/* Input Form Box */}
        <div className="relative">
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ${
              shakeTrigger ? 'shake-animation' : ''
            }`}
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <input
                id="couponInputField"
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                placeholder="Enter coupon code (e.g. FIRST100)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono uppercase tracking-wider font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-400 placeholder:normal-case placeholder:font-sans"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleApply}
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-600/20 hover:shadow-cyan-600/30 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Apply</span>
              </button>
              {appliedCoupon && (
                <button
                  type="button"
                  onClick={onRemoveCoupon}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Validation Feedback Message */}
          {validationMessage && (
            <p
              className={`text-xs mt-1.5 font-medium transition-all ${
                validationMessage.type === 'success'
                  ? 'text-emerald-600'
                  : validationMessage.type === 'error'
                  ? 'text-rose-600'
                  : 'text-slate-600'
              }`}
            >
              {validationMessage.text}
            </p>
          )}
        </div>

        {/* Quick Offers Chips */}
        <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Quick Offers:</span>
          <button
            type="button"
            onClick={() => onApplyCoupon('FIRST100')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-cyan-300 bg-cyan-50/70 hover:bg-cyan-100 text-cyan-900 font-mono font-bold transition-all text-xs group cursor-pointer"
          >
            <span>FIRST100</span>
            <span className="text-[11px] text-cyan-700 font-sans font-medium group-hover:underline">
              • Tap to apply (Save up to ₹80)
            </span>
          </button>
          <button
            type="button"
            onClick={() => onApplyCoupon('OLYMPIAD20')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-mono font-semibold transition-all text-xs group cursor-pointer"
          >
            <span>OLYMPIAD20</span>
            <span className="text-[11px] text-slate-500 font-sans font-medium group-hover:underline">
              • Tap to apply (Save 20%)
            </span>
          </button>
          <button
            type="button"
            onClick={() => onApplyCoupon('ABHYAS10')}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-mono font-semibold transition-all text-xs group cursor-pointer"
          >
            <span>ABHYAS10</span>
            <span className="text-[11px] text-slate-500 font-sans font-medium group-hover:underline">
              • Tap to apply (Save 10%)
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
