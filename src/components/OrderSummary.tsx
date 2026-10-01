import React from 'react';
import { PlanKey, PricingDetails } from '../types';
import { PLANS } from '../data/mockData';

interface OrderSummaryProps {
  selectedPlan: PlanKey;
  pricing: PricingDetails;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onFocusCouponInput: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedPlan,
  pricing,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onFocusCouponInput,
}) => {
  const plan = PLANS[selectedPlan];

  return (
    <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-6 overflow-hidden">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-base">Subscription Summary</h3>
        <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-100">
          Class 4–7 Pass
        </span>
      </div>

      {/* Selected Plan Title & Badge */}
      <div className="py-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Selected Duration:</span>
            <h4 className="text-base font-bold text-slate-900">{plan.title}</h4>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              selectedPlan === '6months'
                ? 'text-emerald-700 bg-emerald-100/70'
                : 'text-slate-700 bg-slate-100'
            }`}
          >
            {plan.tag}
          </span>
        </div>
        <div className="mt-2 flex items-center space-x-3 text-xs text-slate-500 font-medium">
          <span className="text-slate-700 font-semibold">{pricing.monthlyEquiv}</span>
          <span>•</span>
          <span className="text-slate-500 font-medium">{pricing.dailyEquiv}</span>
        </div>
      </div>

      {/* Price Calculation Lines */}
      <div className="py-4 space-y-3 text-sm border-b border-slate-100">
        <div className="flex justify-between items-center text-slate-600">
          <span>Regular Price</span>
          <span className="font-mono font-medium text-slate-500">₹{pricing.regular}</span>
        </div>

        {/* Dynamic Coupon Row */}
        {appliedCoupon && pricing.discount > 0 ? (
          <div className="flex justify-between items-center text-emerald-600 transition-all animate-slide-down">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium">Coupon ({appliedCoupon})</span>
              <button
                type="button"
                onClick={onRemoveCoupon}
                className="text-[11px] text-slate-400 hover:text-rose-500 ml-1 underline decoration-dotted font-normal cursor-pointer"
                title="Remove coupon"
              >
                Remove
              </button>
            </div>
            <span className="font-mono font-bold text-emerald-600">−₹{pricing.discount}</span>
          </div>
        ) : (
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span>Coupon Discount</span>
            </div>
            <span className="font-mono text-slate-400 font-medium">No discount applied yet</span>
          </div>
        )}

        <div className="flex justify-between items-center text-slate-500 text-xs">
          <span>Platform &amp; Content Access</span>
          <span className="text-emerald-600 font-semibold">Included FREE</span>
        </div>
      </div>

      {/* Sidebar Quick Coupon Row */}
      <div className="py-3 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Coupon Code:</span>
          {appliedCoupon ? (
            <div className="flex items-center space-x-1.5">
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                {appliedCoupon}
              </span>
              <button
                type="button"
                onClick={onRemoveCoupon}
                className="text-[11px] font-semibold text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
                title="Remove coupon"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onApplyCoupon('FIRST100')}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-800 transition-colors cursor-pointer"
            >
              + Add Coupon (FIRST100)
            </button>
          )}
        </div>
      </div>

      {/* FINAL PAYABLE AMOUNT */}
      <div className="py-4 bg-gradient-to-br from-slate-50 to-cyan-50/40 -mx-5 sm:-mx-6 px-5 sm:px-6 border-b border-slate-200/70">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Payable
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              {/* Strikethrough Regular Price */}
              {pricing.discount > 0 && (
                <span className="text-base sm:text-lg text-slate-400 font-mono strikethrough-anim struck">
                  ₹{pricing.regular}
                </span>
              )}
              {/* Final Amount */}
              <span
                key={pricing.finalPrice}
                className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-mono tracking-tight transition-all animate-discount-pop"
              >
                ₹{pricing.finalPrice}
              </span>
            </div>
          </div>

          <div className="text-right">
            {pricing.discount > 0 && (
              <span className="inline-block bg-emerald-500 text-white font-mono text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs transition-all">
                SAVE ₹{pricing.discount}
              </span>
            )}
            <span className="block text-[10px] text-slate-400 mt-1">One-time payment</span>
          </div>
        </div>
      </div>

      {/* Trust & Value Bullet Points */}
      <div className="pt-4 space-y-2.5 text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Instant WhatsApp verification &amp; activation</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Covers entire syllabus for selected grade</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Parent performance tracking dashboard</span>
        </div>
      </div>

      {/* Help Hotline */}
      <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
            ?
          </div>
          <div className="text-[11px]">
            <p className="font-bold text-slate-800">Need help with payment?</p>
            <p className="text-slate-500">Contact Abhyas Parent Desk</p>
          </div>
        </div>
        <a
          href="https://wa.me/919876543210?text=Hello%20Abhyas%20Arena%2C%20I%20need%20help%20with%20checkout"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-xs cursor-pointer"
        >
          WhatsApp Us
        </a>
      </div>
    </div>
  );
};
