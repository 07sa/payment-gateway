import React from 'react';
import { MessageSquare, CheckCircle, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';

interface ParentReportDemoProps {
  studentName: string;
  phone: string;
  grade: string;
  onGoToCheckout: () => void;
}

export const ParentReportDemo: React.FC<ParentReportDemoProps> = ({
  studentName,
  phone,
  grade,
  onGoToCheckout,
}) => {
  const name = studentName || 'Aarav Sharma';
  const displayPhone = phone ? `+91 ${phone}` : '+91 9876543210';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" />
          <span>Parent Transparency Ecosystem</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">
          WhatsApp Weekly Performance Report Preview
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Sent directly to your registered phone number ({displayPhone}) every Sunday at 8:00 PM.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* WhatsApp Mobile Chat Simulated Frame */}
        <div className="lg:col-span-7 bg-[#ece5dd] rounded-3xl p-4 shadow-float border-4 border-slate-800">
          <div className="bg-[#075e54] text-white px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                AA
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Abhyas Arena Parent Desk</h4>
                <p className="text-[10px] text-emerald-200">Verified WhatsApp Business Account</p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-100 font-mono">Today, 8:00 PM</span>
          </div>

          {/* WhatsApp Message Bubble */}
          <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-xs text-xs text-slate-800 space-y-3 border border-slate-200/80">
            <div className="border-b border-slate-100 pb-2">
              <span className="font-bold text-brand-900 block text-sm">
                📊 Weekly Abhyas Mastery Scorecard
              </span>
              <span className="text-[11px] text-slate-500">
                Student: <strong>{name}</strong> · Class {grade} CBSE &amp; Olympiad
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-cyan-50 p-2.5 rounded-xl border border-cyan-100">
                <span className="text-[10px] uppercase font-bold text-cyan-800 block">Weekly Accuracy</span>
                <span className="text-lg font-mono font-extrabold text-cyan-950">88.5%</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">▲ +4% from last week</span>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">Quests Solved</span>
                <span className="text-lg font-mono font-extrabold text-emerald-950">54 / 60</span>
                <span className="text-[10px] text-slate-500 font-medium block">6-day streak maintained 🔥</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Strong Mastery: Fractions, Light &amp; Shadows, Number Series</span>
              </div>
              <div className="flex items-center space-x-1.5 text-amber-700 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Recommended Focus: Word Problems on Speed &amp; Distance</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Abhyas Arena AI Diagnostic</span>
              <span>8:01 PM · Read ✓✓</span>
            </div>
          </div>
        </div>

        {/* Value Callouts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Why Parents Trust Abhyas Arena</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <p>
                  <strong>No Screentime Wastage:</strong> Structured 15-minute daily quests prevent endless scrolling and build consistent problem-solving habits.
                </p>
              </div>
              <div className="flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <p>
                  <strong>Instant WhatsApp Updates:</strong> You never need to ask &quot;Did you study today?&quot;—the system sends real-time completion signals.
                </p>
              </div>
              <div className="flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <p>
                  <strong>Olympiad Competitive Edge:</strong> Prepared with previous 10-year IMO, NSO, and NSTSE questions.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onGoToCheckout}
                className="w-full py-3 px-4 bg-brand-900 hover:bg-brand-850 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Subscribe with Launch Discount</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
