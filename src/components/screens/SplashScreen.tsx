import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, BrainCircuit, Compass, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo, demoLoginKesavan } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 25;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white select-none">
      {/* Top spacing / pill */}
      <div className="pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide">
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>CSE Final Year Capstone Project</span>
        </div>
      </div>

      {/* Hero Animated Logo & Branding */}
      <div className="flex flex-col items-center text-center max-w-xs space-y-6">
        <div className="relative">
          {/* Animated Glow Rings */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 opacity-30 blur-xl animate-pulse" />
          
          <div className="relative w-28 h-28 rounded-3xl bg-slate-800/90 border border-slate-700/80 shadow-2xl flex items-center justify-center p-4">
            <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-inner">
              <Sparkles className="w-12 h-12 text-white animate-bounce" />
            </div>

            {/* Orbiting Icons */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-slate-900">
              <Compass className="w-4 h-4" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-slate-900">
              <Target className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-white leading-tight">
            AI Career &amp; Skill Gap Analyzer
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Discover your career. Identify your skills. Build your future.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2 pt-4">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            {progress < 100 ? 'Initializing AI Career Intelligence Engine...' : 'Ready'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-xs space-y-2.5 pb-4">
        <button
          onClick={() => navigateTo('onboarding')}
          className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={demoLoginKesavan}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-medium text-xs border border-amber-500/20 transition flex items-center justify-center gap-1.5"
        >
          <span>Quick Demo as Student Kesavan (87% Match)</span>
        </button>
      </div>
    </div>
  );
};
