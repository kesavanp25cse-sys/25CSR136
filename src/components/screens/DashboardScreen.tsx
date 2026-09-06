import React from 'react';
import {
  FileText,
  Compass,
  Target,
  Map,
  BarChart3,
  Award,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import {
  calculateCareerMatches,
  calculateSkillGap,
  calculateCareerReadiness,
} from '../../services/aiEngine';
import { CAREER_ROLES } from '../../data/careerDataset';

export const DashboardScreen: React.FC = () => {
  const {
    profile,
    targetCareerId,
    roadmapSteps,
    navigateTo,
    setActiveTab,
    setIsAiAnalysisModalOpen,
    theme,
  } = useApp();

  // Dynamically calculate metrics
  const matches = calculateCareerMatches(profile);
  const targetCareerMatch =
    matches.find((m) => m.career.id === targetCareerId) || matches[0];
  const targetCareer =
    CAREER_ROLES.find((c) => c.id === targetCareerId) || CAREER_ROLES[0];
  const skillGap = calculateSkillGap(profile, targetCareerId);
  const readiness = calculateCareerReadiness(profile, targetCareerId, roadmapSteps);

  // Dynamic roadmap progress calculation
  const completedSteps = roadmapSteps.filter((s) => s.status === 'Completed').length;
  const roadmapProgress =
    roadmapSteps.length > 0
      ? Math.round((completedSteps / roadmapSteps.length) * 100)
      : 62;

  // Skills to improve: top missing core skills
  const topSkillsToImprove = skillGap.priorities
    .filter((p) => p.priority === 'High Priority' || p.priority === 'Medium Priority')
    .slice(0, 4);

  // Active or next roadmap step
  const activeStep =
    roadmapSteps.find((s) => s.status === 'In Progress') ||
    roadmapSteps.find((s) => s.status === 'Not Started') ||
    roadmapSteps[0];

  return (
    <div
      className={`flex-1 flex flex-col justify-between transition-colors overflow-y-auto ${
        theme === 'dark' ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      <MaterialTopBar
        title="AI Career Analyzer"
        subtitle="Department of Computer Science & Engineering"
      />

      <div className="p-4 sm:p-5 space-y-4 flex-1 pb-20">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Welcome back,</p>
            <h3 className="text-2xl font-black tracking-tight font-display">
              {profile.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              {profile.degree} • Batch {profile.graduationYear}
            </p>
          </div>
          <button
            onClick={() => setIsAiAnalysisModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md shadow-indigo-600/30 uppercase tracking-wider active:scale-95 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Insights</span>
          </button>
        </div>

        {/* 4 Summary Cards Grid: Bold Typography Stat Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* 1. READINESS */}
          <div
            onClick={() => navigateTo('readiness')}
            className="bg-white dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-indigo-500/60 transition group relative overflow-hidden"
          >
            <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">
              READINESS
            </p>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-display">
              {readiness.overallScore}/100
            </p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-500 font-black uppercase tracking-wider">
              <TrendingUp className="w-3 h-3" />
              <span>Placement Ready</span>
            </div>
          </div>

          {/* 2. MATCH */}
          <div
            onClick={() => {
              setActiveTab('career');
              navigateTo('career-recommendations');
            }}
            className="bg-white dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-emerald-500/60 transition group relative overflow-hidden"
          >
            <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">
              MATCH
            </p>
            <p className="text-2xl font-black text-emerald-500 font-display">
              {targetCareerMatch.matchPercentage}%
            </p>
            <p className="mt-1 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              {targetCareer.title}
            </p>
          </div>

          {/* 3. SKILL GAP */}
          <div
            onClick={() => {
              setActiveTab('skills');
              navigateTo('skill-gap');
            }}
            className="bg-white dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-rose-500/60 transition group relative overflow-hidden"
          >
            <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">
              SKILL GAP
            </p>
            <p className="text-2xl font-black text-rose-500 font-display">
              {skillGap.overallSkillGapPercentage}%
            </p>
            <p className="mt-1 text-[10px] font-bold text-slate-400">
              Coverage: {skillGap.skillCoveragePercentage}%
            </p>
          </div>

          {/* 4. ROADMAP */}
          <div
            onClick={() => {
              setActiveTab('roadmap');
              navigateTo('roadmap');
            }}
            className="bg-white dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-amber-500/60 transition group relative overflow-hidden"
          >
            <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">
              ROADMAP
            </p>
            <p className="text-2xl font-black text-amber-500 font-display">
              {roadmapProgress}%
            </p>
            <p className="mt-1 text-[10px] font-bold text-slate-400">
              {completedSteps}/{roadmapSteps.length} Milestones
            </p>
          </div>
        </div>

        {/* Target Role Banner with Bold Contrast */}
        <div className="bg-slate-900 p-4 rounded-3xl text-white border border-slate-800 shadow-md space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
              Target Role
            </p>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              {targetCareerMatch.matchPercentage}% Match
            </span>
          </div>

          <h4 className="text-lg font-black tracking-tight">{targetCareer.title}</h4>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${targetCareerMatch.matchPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <p className="text-[10px] text-indigo-300 font-bold">
              Next Step: Complete {activeStep.skill}
            </p>
            <button
              onClick={() => {
                setActiveTab('career');
                navigateTo('career-recommendations');
              }}
              className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-white transition"
            >
              Change Role →
            </button>
          </div>
        </div>

        {/* Priority Skills Card */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-black tracking-tight uppercase text-slate-900 dark:text-white">
              Priority Skills
            </h5>
            <button
              onClick={() => {
                setActiveTab('skills');
                navigateTo('skill-gap');
              }}
              className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              <span>Full Matrix</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {topSkillsToImprove.map((item) => (
              <div
                key={item.skill}
                className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-700/50"
              >
                <div>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                    {item.skill}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Est. {item.estimatedDuration}
                  </span>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider ${
                    item.priority === 'High Priority'
                      ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'
                      : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                  }`}
                >
                  {item.priority === 'High Priority' ? 'High' : 'Med'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Step */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">
              Recommended Next Step
            </span>
            <span className="text-[10px] font-bold text-slate-400">Step {activeStep.stepNumber}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {activeStep.skill}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 font-medium">
                Topics: {activeStep.topics.slice(0, 3).join(', ')}
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('roadmap');
                navigateTo('roadmap');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md shadow-emerald-600/20 uppercase tracking-wider whitespace-nowrap transition active:scale-95"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Quick Action Hub with Bold Typography */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Quick Actions
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={() => navigateTo('resume-analyzer')}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-left flex flex-col gap-2 transition group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 dark:text-white block">
                  Analyze Resume
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Upload PDF / DOCX</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('career');
                navigateTo('career-recommendations');
              }}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-left flex flex-col gap-2 transition group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 dark:text-white block">
                  Career Match
                </span>
                <span className="text-[10px] text-slate-400 font-medium">AI Predictions</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('skills');
                navigateTo('skill-gap');
              }}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-left flex flex-col gap-2 transition group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 dark:text-white block">
                  Skill Gap
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Priority Matrix</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('roadmap');
                navigateTo('roadmap');
              }}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-left flex flex-col gap-2 transition group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                <Map className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 dark:text-white block">
                  Learning Path
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Roadmap Timeline</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo('progress')}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-left flex flex-col gap-2 transition group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 dark:text-white block">
                  Progress
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Skill Completion</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo('readiness')}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-left flex flex-col gap-2 transition group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 dark:text-white block">
                  Readiness
                </span>
                <span className="text-[10px] text-slate-400 font-medium">72/100 Index</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
