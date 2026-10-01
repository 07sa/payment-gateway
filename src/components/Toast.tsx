import React, { useEffect } from 'react';

interface ToastProps {
  show: boolean;
  heading: string;
  subheading: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ show, heading, subheading, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 transform transition-all duration-500">
      <div className="flex items-center space-x-3 bg-brand-900 border border-emerald-500/40 text-white px-4 py-3 rounded-2xl shadow-float toast-enter">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-400 font-mono tracking-wide">{heading}</p>
          <p className="text-xs text-slate-200">{subheading}</p>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="text-slate-400 hover:text-white ml-2 text-xs p-1 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
