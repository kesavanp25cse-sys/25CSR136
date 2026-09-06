import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  CircleDot,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import { calculateCareerReadiness } from '../../services/aiEngine';

export const ProgressTrackerScreen: React.FC = () => {
  const {
    roadmapSteps,
    toggleStepStatus,
    profile,
    targetCareerId,
    navigateTo,
  } = useApp();

  const completedSteps = roadmapSteps.filter((s) => s.status === 'Completed');
  const inProgressSteps = roadmapSteps.filter((s) => s.status === 'In Progress');
  const notStartedSteps = roadmapSteps.filter((s) => s.status === 'Not Started');

  const totalSteps = Math.max(1, roadmapSteps.length);
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  const readiness = calculateCareerReadiness(profile, targetCareerId, roadmapSteps);

  // Donut chart calculations
  const size = 110;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const completedOffset = circumference - (completedSteps.length / totalSteps) * circumference;

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 overflow-y-auto">
      <MaterialTopBar
        title="Preparation Progress"
        subtitle="Live Milestone Analytics & Trajectory"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 space-y-4 flex-1 pb-24">
        {/* Main Analytics Donut & Stats Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-950/80 via-slate-800 to-slate-900 border border-indigo-500/30 shadow-lg flex items-center justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
              Roadmap Progress
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-white">{progressPercent}%</span>
              <span className="text-xs text-slate-400">Total Completion</span>
            </div>
            <p className="text-xs text-slate-300">
              Skills Completed: <strong className="text-emerald-400 font-bold">{completedSteps.length}</strong> / {totalSteps}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-indigo-300 pt-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Career Readiness: {readiness.overallScore}/100</span>
            </div>
          </div>

          {/* Donut Chart SVG */}
          <div className="relative shrink-0 flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                className="text-slate-700/60"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#10b981"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={completedOffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-black text-white leading-tight">
                {completedSteps.length}/{totalSteps}
              </span>
              <span className="text-[9px] text-slate-400 font-medium">Done</span>
            </div>
          </div>
        </div>

        {/* 3 Statistics Cards */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-lg font-black text-white block">
              {completedSteps.length}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Completed</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <Clock className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
            <span className="text-lg font-black text-white block">
              {inProgressSteps.length}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">In Progress</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <CircleDot className="w-4 h-4 text-slate-400 mx-auto mb-1" />
            <span className="text-lg font-black text-white block">
              {notStartedSteps.length}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Remaining</span>
          </div>
        </div>

        {/* Skill Completion Interactive List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Milestone Status Toggles</span>
            </h3>
            <span className="text-[10px] text-slate-400">Tap to toggle</span>
          </div>

          <div className="space-y-2">
            {roadmapSteps.map((step) => {
              const isCompleted = step.status === 'Completed';

              return (
                <div
                  key={step.id}
                  onClick={() => toggleStepStatus(step.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isCompleted
                      ? 'bg-slate-800/90 border-emerald-500/40'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCompleted ? 'bg-emerald-400' : 'bg-indigo-400'
                        }`}
                      />
                      <h4 className="text-xs font-bold text-white truncate">
                        {step.skill}
                      </h4>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate pl-4">
                      {step.topics.slice(0, 3).join(', ')} • {step.duration}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-indigo-500/20 text-indigo-300'
                      }`}
                    >
                      {step.status}
                    </span>
                    <button
                      type="button"
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'border-slate-600 hover:border-indigo-400 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View Career Readiness Score Button */}
        <div className="pt-2">
          <button
            onClick={() => navigateTo('readiness')}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>View Detailed Career Readiness Score (72/100)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
