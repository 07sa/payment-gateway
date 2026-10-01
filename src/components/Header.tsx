import React from 'react';
import { ShieldCheck, MessageCircle, BookOpen, Sparkles, Award } from 'lucide-react';

interface HeaderProps {
  currentTab: 'checkout' | 'practice' | 'parent-report';
  setCurrentTab: (tab: 'checkout' | 'practice' | 'parent-report') => void;
  selectedGrade: string;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, selectedGrade }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Grade Target */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('checkout')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-900 via-brand-850 to-brand-700 flex items-center justify-center shadow-md shadow-brand-900/20 text-white font-bold text-xl tracking-wider">
            <svg
              className="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-brand-900">
                Abhyas<span className="text-cyan-600">Arena</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Classes 4–7
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Daily Math, Science &amp; Reasoning Mastery
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Quick Switcher) */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
          <button
            onClick={() => setCurrentTab('checkout')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              currentTab === 'checkout'
                ? 'bg-white text-brand-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <span>Pass Checkout</span>
          </button>
          <button
            onClick={() => setCurrentTab('practice')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              currentTab === 'practice'
                ? 'bg-white text-brand-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Practice Arena Demo</span>
          </button>
          <button
            onClick={() => setCurrentTab('parent-report')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              currentTab === 'parent-report'
                ? 'bg-white text-brand-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Parent WhatsApp Report</span>
          </button>
        </div>

        {/* Trust Badges & Safety Reassurance */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/70">
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
              />
            </svg>
            <span>Verified Direct UPI Checkout</span>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20Abhyas%20Arena%20Support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium hover:text-emerald-700 transition-colors bg-slate-50 hover:bg-slate-100 sm:bg-transparent px-2.5 py-1.5 rounded-lg sm:p-0"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span className="hidden md:inline">Instant parent support on WhatsApp</span>
            <span className="md:hidden text-[11px] font-semibold text-emerald-700">Support</span>
          </a>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="lg:hidden flex items-center justify-around bg-slate-50 border-t border-slate-200/80 px-2 py-1.5 text-[11px] font-semibold">
        <button
          onClick={() => setCurrentTab('checkout')}
          className={`px-2.5 py-1 rounded-md transition-all ${
            currentTab === 'checkout' ? 'bg-white text-brand-900 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          Checkout Pass
        </button>
        <button
          onClick={() => setCurrentTab('practice')}
          className={`px-2.5 py-1 rounded-md transition-all ${
            currentTab === 'practice' ? 'bg-white text-brand-900 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          Student Quests
        </button>
        <button
          onClick={() => setCurrentTab('parent-report')}
          className={`px-2.5 py-1 rounded-md transition-all ${
            currentTab === 'parent-report' ? 'bg-white text-brand-900 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          WhatsApp Report
        </button>
      </div>
    </header>
  );
};
