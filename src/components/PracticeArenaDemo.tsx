import React, { useState } from 'react';
import { SAMPLE_QUESTIONS } from '../data/mockData';
import { Award, Zap, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface PracticeArenaDemoProps {
  studentName: string;
  grade: string;
  onGoToCheckout: () => void;
}

export const PracticeArenaDemo: React.FC<PracticeArenaDemoProps> = ({
  studentName,
  grade,
  onGoToCheckout,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(4);

  const question = SAMPLE_QUESTIONS[currentIdx % SAMPLE_QUESTIONS.length];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === question.correctIndex) {
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentIdx((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(4);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner for Demo */}
      <div className="bg-gradient-to-r from-brand-900 to-brand-800 text-white rounded-2xl p-6 shadow-card mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-cyan-500/20 text-cyan-300 font-mono text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-cyan-400/30">
                Live Practice Quest
              </span>
              <span className="text-xs text-slate-300">Class {grade} Syllabus</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-1">
              Welcome to the Arena, {studentName || 'Student'}!
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Daily gamified practice designed for CBSE &amp; National Olympiads (IMO, NSO, NSTSE).
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10 shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Daily Streak</span>
              <span className="text-lg font-mono font-extrabold text-amber-400 flex items-center justify-center space-x-1">
                <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{streak} Days</span>
              </span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-300 uppercase tracking-wider block">XP Points</span>
              <span className="text-lg font-mono font-extrabold text-cyan-300">{score + 140} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quest Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-100">
              {question.subject}
            </span>
            <span className="text-xs text-slate-500 font-medium">Topic: {question.topic}</span>
          </div>
          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            {question.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <div className="py-6">
          <span className="text-xs font-bold text-slate-400 block mb-1">
            Question {currentIdx + 1} of {SAMPLE_QUESTIONS.length}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, i) => {
            const isChosen = selectedAnswer === i;
            const isCorrect = i === question.correctIndex;

            let optionStyle =
              'border-slate-200 hover:border-cyan-400 hover:bg-slate-50 text-slate-800';

            if (isAnswered) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
              } else if (isChosen && !isCorrect) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-medium';
              } else {
                optionStyle = 'border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(i)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center justify-between text-sm cursor-pointer ${optionStyle}`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                      isAnswered && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && isChosen
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {isAnswered && isChosen && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Solution Explanation if Answered */}
        {isAnswered && (
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 animate-slide-down">
            <div className="flex items-center space-x-2 text-cyan-800 font-bold mb-1">
              <Award className="w-4 h-4 text-cyan-600" />
              <span>Explanation &amp; Mastery Concept:</span>
            </div>
            <p className="leading-relaxed text-slate-600">{question.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onGoToCheckout}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center space-x-1 cursor-pointer"
          >
            <span>← Back to Subscription Pass Checkout</span>
          </button>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset questions"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!isAnswered}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                isAnswered
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Next Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
