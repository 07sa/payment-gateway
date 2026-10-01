import React from 'react';
import { PlanKey, PricingDetails } from '../types';
import { PLANS } from '../data/mockData';

interface PlanSelectionProps {
  selectedPlan: PlanKey;
  onSelectPlan: (plan: PlanKey) => void;
  getPlanPricing: (plan: PlanKey) => PricingDetails;
  appliedCoupon: string | null;
}

export const PlanSelection: React.FC<PlanSelectionProps> = ({
  selectedPlan,
  onSelectPlan,
  getPlanPricing,
  appliedCoupon,
}) => {
  const planKeys: PlanKey[] = ['1month', '3months', '6months'];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-7">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Step 1 of 4</span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Select Subscription Plan</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Includes unlimited chapter quests, leaderboards &amp; daily streak rewards.
          </p>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          Cancel anytime
        </span>
      </div>

      {/* 3 Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
        {planKeys.map((key) => {
          const plan = PLANS[key];
          const pricing = getPlanPricing(key);
          const isSelected = selectedPlan === key;
          const isBestValue = key === '6months';

          let potentialOfferLabel = '';
          if (pricing.discount > 0) {
            potentialOfferLabel = `Save ₹${pricing.discount}`;
          } else {
            const savings = key === '1month' ? '₹20' : key === '3months' ? '₹50' : '₹80';
            potentialOfferLabel = `Use FIRST100 for ${savings} off`;
          }

          return (
            <div
              key={key}
              onClick={() => onSelectPlan(key)}
              className={`plan-card relative rounded-xl border-2 p-4 cursor-pointer transition-all bg-white group ${
                isSelected
                  ? 'active border-cyan-600 ring-2 ring-cyan-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Best value ribbon */}
              {isBestValue && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-brand-700 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md shadow-cyan-600/20 whitespace-nowrap z-10">
                  ⭐ Best Value
                </div>
              )}

              <div className="flex justify-between items-start mt-0.5">
                <span
                  className={`text-xs font-bold uppercase tracking-wide ${
                    isSelected ? 'text-cyan-900 font-extrabold' : 'text-slate-700'
                  }`}
                >
                  {plan.months === 1 ? '1 Month' : `${plan.months} Months`}
                </span>
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-cyan-600'
                      : 'border-slate-300 group-hover:border-cyan-500'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-600" />}
                </span>
              </div>

              <div className="mt-2.5">
                <div className="flex items-baseline space-x-2">
                  <span
                    className={`text-2xl font-extrabold font-mono transition-all ${
                      isSelected ? 'text-brand-900' : 'text-slate-900'
                    }`}
                  >
                    ₹{pricing.finalPrice}
                  </span>
                  {pricing.discount > 0 && (
                    <span className="text-sm text-slate-400 font-semibold line-through">
                      ₹{pricing.regular}
                    </span>
                  )}
                </div>

                <div className="mt-1 space-y-0.5 text-[11px] text-slate-500">
                  <p className={isSelected ? 'font-bold text-cyan-700' : 'font-medium text-slate-600'}>
                    {pricing.monthlyEquiv}
                  </p>
                  <p className="text-slate-400 font-medium">{pricing.dailyEquiv}</p>
                </div>
              </div>

              <div
                className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] ${
                  isSelected ? 'border-cyan-100' : 'border-slate-100'
                }`}
              >
                <span
                  className={`px-2 py-0.5 rounded transition-all ${
                    pricing.discount > 0
                      ? 'font-bold text-emerald-700 bg-emerald-100/90'
                      : isSelected
                      ? 'font-bold text-cyan-800 bg-cyan-50 border border-cyan-200'
                      : 'font-medium text-slate-500 bg-slate-100'
                  }`}
                >
                  {potentialOfferLabel}
                </span>
                <span
                  className={`font-medium ${
                    isSelected ? 'text-cyan-700 font-bold' : 'text-slate-400'
                  }`}
                >
                  {key === '1month' ? 'Starter' : key === '3months' ? 'Term Pass' : 'Recommended'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature perks for Abhyas Arena students */}
      <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <span className="text-emerald-500 font-bold">✓</span>
          <span>Class 4–7 Olympiad &amp; CBSE</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-emerald-500 font-bold">✓</span>
          <span>Unlimited Gamified Quizzes</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-emerald-500 font-bold">✓</span>
          <span>Parent WhatsApp Weekly Report</span>
        </div>
      </div>
    </section>
  );
};
