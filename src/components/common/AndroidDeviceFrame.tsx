import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Maximize2,
  Code2,
  Sparkles,
  Sun,
  Moon,
  RotateCcw,
  Wifi,
  Signal,
  BatteryCharging,
  Layers,
  Award,
  CheckCircle2,
  FileCheck,
  Cpu,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateCareerMatches, calculateCareerReadiness } from '../../services/aiEngine';

interface AndroidDeviceFrameProps {
  children: React.ReactNode;
}

export const AndroidDeviceFrame: React.FC<AndroidDeviceFrameProps> = ({ children }) => {
  const {
    theme,
    toggleTheme,
    isDeviceFrameEnabled,
    toggleDeviceFrame,
    setIsArchitectureModalOpen,
    setIsAiAnalysisModalOpen,
    demoLoginKesavan,
    profile,
    targetCareerId,
    roadmapSteps,
    navigateTo,
    setActiveTab,
  } = useApp();

  const [currentTime, setCurrentTime] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Calculate live telemetry for desktop inspector panel
  const matches = calculateCareerMatches(profile);
  const readiness = calculateCareerReadiness(profile, targetCareerId, roadmapSteps);
  const topMatch = matches[0] || { matchPercentage: 87 };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0F172A] text-slate-100' : 'bg-slate-100 text-slate-900'
      } flex flex-col items-center justify-start select-none font-sans`}
    >
      {/* Top Utility Bar for Presentation & Controls */}
      <header className="w-full bg-[#1E293B]/95 backdrop-blur border-b border-slate-700 text-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-50 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm">
            AI
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-1">
              CareerAI <span className="text-indigo-400 font-light">Analyzer</span>
            </h1>
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Material 3 • Jetpack Compose & FastAPI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={demoLoginKesavan}
            title="Reset to Kesavan Demo Flow (87% Match)"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/30 transition font-bold text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={() => setIsArchitectureModalOpen(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl shadow-sm font-bold text-xs transition"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>FastAPI & Code</span>
          </button>

          <button
            onClick={() => setIsAiAnalysisModalOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-bold text-xs transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">AI Profiler</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleDeviceFrame}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 font-bold"
            title={isDeviceFrameEnabled ? 'Switch to Full View' : 'Switch to Phone View'}
          >
            {isDeviceFrameEnabled ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline text-xs">{isDeviceFrameEnabled ? 'Full View' : 'Phone View'}</span>
          </button>
        </div>
      </header>

      {/* Main Presentation Layout: 3-Panel on wide screens matching Bold Typography Design */}
      <div className="flex-1 w-full flex overflow-hidden">
        {/* Left Sidebar (Desktop Only) */}
        {isDeviceFrameEnabled && (
          <aside className="hidden xl:flex w-[280px] bg-[#1E293B] border-r border-slate-700 p-6 flex-col justify-between shrink-0 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-700/60">
                <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-md">
                  AI
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight text-white">
                    CareerAI <span className="text-indigo-400 font-light">Analyzer</span>
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    CSE Capstone Project
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700 rounded-lg text-[11px] font-bold text-indigo-300">
                    Kotlin / Compose
                  </span>
                  <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700 rounded-lg text-[11px] font-bold text-emerald-400">
                    FastAPI
                  </span>
                  <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700 rounded-lg text-[11px] font-bold text-amber-400">
                    spaCy NLP
                  </span>
                  <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700 rounded-lg text-[11px] font-bold text-sky-400">
                    SQLite3
                  </span>
                  <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700 rounded-lg text-[11px] font-bold text-purple-400">
                    TF-IDF ML
                  </span>
                </div>
              </div>

              {/* Project Workflow Steps */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">
                  Project Workflow
                </p>
                <div className="space-y-2 text-xs font-semibold text-slate-300">
                  <button
                    onClick={() => navigateTo('resume-analyzer')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800 transition text-left group"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform" />
                    <span>1. Resume Extraction</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('career');
                      navigateTo('career-recommendations');
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800 transition text-left group"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform" />
                    <span>2. AI Profile Matching</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('skills');
                      navigateTo('skill-gap');
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800 transition text-left group"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform" />
                    <span>3. Skill Gap Detection</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('roadmap');
                      navigateTo('roadmap');
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800 transition text-left group"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform" />
                    <span>4. Learning Roadmap</span>
                  </button>
                  <button
                    onClick={() => navigateTo('readiness')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800 transition text-left group"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform" />
                    <span>5. Career Readiness</span>
                  </button>
                  <button
                    onClick={() => navigateTo('workflow')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800 transition text-left group text-indigo-400"
                  >
                    <div className="w-2 h-2 bg-indigo-400 rounded-full group-hover:scale-125 transition-transform" />
                    <span>9-Stage Full Flow</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Quote Card */}
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mt-6">
              <p className="text-[11px] text-indigo-200 leading-relaxed italic font-medium">
                "Discover your career. Identify your skills. Build your future."
              </p>
            </div>
          </aside>
        )}

        {/* Center Stage: Mobile Phone or Responsive Container */}
        <main className="flex-1 flex flex-col items-center justify-center relative bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-4 sm:p-6 overflow-y-auto">
          {/* Bold Header Banner on Desktop */}
          {isDeviceFrameEnabled && (
            <div className="text-center mb-6 mt-2 hidden sm:block">
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-none tracking-tighter uppercase font-display">
                Mobile Dashboard
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 font-bold tracking-wide uppercase">
                Material 3 • Kotlin Jetpack Compose
              </p>
            </div>
          )}

          {isDeviceFrameEnabled ? (
            <div className="relative my-2 transition-all duration-300">
              {/* Android Device Outer Chassis */}
              <div className="relative w-[360px] sm:w-[390px] h-[820px] sm:h-[840px] bg-slate-900 rounded-[48px] border-[8px] border-slate-800 shadow-2xl flex flex-col overflow-hidden ring-1 ring-slate-700/50">
                {/* Dynamic Camera Punch-hole */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40 flex items-center justify-center shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-indigo-900/80" />
                  </div>
                </div>

                {/* Inner Screen Canvas */}
                <div
                  className={`relative w-full h-full rounded-[40px] overflow-hidden flex flex-col ${
                    theme === 'dark' ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
                  }`}
                >
                  {/* Status Bar */}
                  <div
                    className={`h-7 w-full flex items-center justify-between px-6 pt-1 select-none z-30 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
                    }`}
                  >
                    <span className="text-[11px] font-black tracking-tight">{currentTime}</span>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Signal className="w-3 h-3" />
                      <span className="text-[9px] font-black">5G</span>
                      <Wifi className="w-3 h-3" />
                      <BatteryCharging className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Mobile Screen Active Content */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
                    {children}
                  </div>

                  {/* Bottom Navigation Gesture Bar */}
                  <div className="w-full h-3 flex items-center justify-center select-none z-30 pointer-events-none pb-0.5">
                    <div
                      className={`w-28 h-1 rounded-full ${
                        theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`w-full max-w-2xl min-h-[840px] my-2 rounded-3xl shadow-2xl border overflow-hidden flex flex-col ${
                theme === 'dark' ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              {/* Responsive Container Status Bar */}
              <div className="w-full h-8 px-5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold tracking-tight text-white">
                  Android Jetpack Compose Full View • {currentTime}
                </span>
                <div className="flex items-center gap-2 font-bold text-[10px]">
                  <span>5G VoLTE</span>
                  <Wifi className="w-3.5 h-3.5" />
                  <BatteryCharging className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex-1 flex flex-col">{children}</div>
            </div>
          )}
        </main>

        {/* Right Sidebar: AI Profiler Result & Score Breakdown (Desktop Only) */}
        {isDeviceFrameEnabled && (
          <aside className="hidden 2xl:flex w-[320px] bg-slate-900 border-l border-slate-800 p-6 flex-col space-y-6 shrink-0 overflow-y-auto">
            {/* AI Profiler Result */}
            <div>
              <h3 className="text-xs font-black text-indigo-400 mb-3 uppercase tracking-widest">
                AI Profiler Result
              </h3>
              <div className="bg-slate-800/60 p-4 rounded-3xl border border-slate-700/60 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Profile for <span className="text-white font-black">{profile.name}</span> shows strong foundational skills in{' '}
                  <span className="text-emerald-400 font-bold">Python</span> and{' '}
                  <span className="text-emerald-400 font-bold">SQL</span>.
                </p>

                <div>
                  <p className="text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-wider">
                    Extracted Projects
                  </p>
                  <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200">
                    {profile.projects[0]?.title || 'Student Management System'}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-wider">
                    Missing Core Modules
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-[10px] font-black uppercase">
                      Pandas
                    </span>
                    <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-[10px] font-black uppercase">
                      Statistics
                    </span>
                    <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-[10px] font-black uppercase">
                      NumPy
                    </span>
                    <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-[10px] font-black uppercase">
                      Power BI
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div>
              <h3 className="text-xs font-black text-indigo-400 mb-3 uppercase tracking-widest">
                Score Breakdown
              </h3>
              <div className="space-y-3 bg-slate-800/40 p-4 rounded-3xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 w-[75%] h-full rounded-full" />
                  </div>
                  <span className="text-xs font-black text-white w-8">75%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black w-14 text-right">
                    Tech
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 w-[65%] h-full rounded-full" />
                  </div>
                  <span className="text-xs font-black text-white w-8">65%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black w-14 text-right">
                    Proj
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 w-[80%] h-full rounded-full" />
                  </div>
                  <span className="text-xs font-black text-white w-8">80%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black w-14 text-right">
                    Cert
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-sky-500 w-[70%] h-full rounded-full" />
                  </div>
                  <span className="text-xs font-black text-white w-8">70%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black w-14 text-right">
                    Resume
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setIsAiAnalysisModalOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-bold text-xs transition"
              >
                <span>Full AI Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsArchitectureModalOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs transition"
              >
                <span>FastAPI Architecture</span>
                <Code2 className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

