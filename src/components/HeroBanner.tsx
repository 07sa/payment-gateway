import React from 'react';

interface HeroBannerProps {
  appliedCoupon: string | null;
  discount: number;
  onApplyCoupon: (code: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  appliedCoupon,
  discount,
  onApplyCoupon,
}) => {
  const isApplied = Boolean(appliedCoupon);

  return (
    <div
      className="mb-8 bg-gradient-to-r from-brand-900 via-brand-850 to-brand-800 rounded-2xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden transition-all duration-300"
      id="heroCouponBanner"
    >
      {/* Decorative background wave / particle glow */}
      <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-cyan-500/15 to-transparent pointer-events-none" />
      <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold shrink-0 transition-all ${
              isApplied
                ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 coupon-pulse'
                : 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-300'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
              />
            </svg>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`font-mono text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                  isApplied
                    ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
                    : 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30'
                }`}
              >
                {isApplied ? 'Coupon Applied' : 'Launch Promo Available'}
              </span>
              {isApplied && (
                <span className="text-xs font-semibold text-emerald-300 tracking-wide font-mono">
                  {appliedCoupon}
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              {isApplied
                ? 'Special launch discount activated!'
                : 'Have a launch coupon? Enter FIRST100 below to get up to ₹80 instant discount!'}
            </h2>
            <p className="text-xs text-slate-300">
              {isApplied
                ? `Coupon ${appliedCoupon} unlocked extra savings across your selected practice pass.`
                : 'Special launch offer for early students: Apply promo code to unlock exclusive savings on all passes.'}
            </p>
          </div>
        </div>

        {/* Banner Action Pill */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/15 self-start sm:self-auto flex items-center space-x-3 shrink-0">
          <div className="text-right">
            <span className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider">
              {isApplied ? 'Your Savings' : 'Available Offer'}
            </span>
            <span
              className={`text-xs font-semibold ${
                isApplied ? 'text-emerald-300' : 'text-cyan-300 cursor-pointer hover:underline'
              }`}
              onClick={() => {
                if (!isApplied) onApplyCoupon('FIRST100');
              }}
            >
              {isApplied ? 'Instant Discount Applied' : 'Tap to Apply FIRST100'}
            </span>
          </div>

          {isApplied ? (
            <span className="px-3 py-1 bg-emerald-500 text-white font-mono text-xs font-extrabold rounded-lg shadow-xs">
              SAVE ₹{discount}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onApplyCoupon('FIRST100')}
              className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-brand-900 font-bold text-xs rounded-lg transition-all shadow-xs font-mono cursor-pointer"
            >
              Apply FIRST100
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
