import React from 'react';
import {
  Target,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import { calculateSkillGap } from '../../services/aiEngine';
import { CAREER_ROLES } from '../../data/careerDataset';

export const SkillGapScreen: React.FC = () => {
  const {
    profile,
    targetCareerId,
    setTargetCareerId,
    navigateTo,
    setActiveTab,
    theme,
  } = useApp();

  // Dynamic Skill Gap computation based on active profile and target career
  const gapAnalysis = calculateSkillGap(profile, targetCareerId);
  const targetCareer = gapAnalysis.targetCareer;

  const coverage = gapAnalysis.skillCoveragePercentage;
  const gap = gapAnalysis.overallSkillGapPercentage;

  // SVG Circular Gauge calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (coverage / 100) * circumference;

  return (
    <div
      className={`flex-1 flex flex-col justify-between transition-colors overflow-y-auto ${
        theme === 'dark' ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      <MaterialTopBar
        title="Skill Gap Analyzer"
        subtitle="Dynamic Competency vs Requirement Audit"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 sm:p-5 space-y-4 flex-1 pb-24">
        {/* Career Selector Dropdown */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
            <span>Target Career Role</span>
          </label>
          <div className="relative">
            <select
              value={targetCareerId}
              onChange={(e) => setTargetCareerId(e.target.value)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer pr-10"
            >
              {CAREER_ROLES.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title} ({role.category})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Dynamic Metric Gauges: Circular & Linear */}
        <div className="p-4 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                Audited Readiness Ratio
              </span>
              <h3 className="text-base font-black text-white">
                {targetCareer.title} Skill Coverage
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {gapAnalysis.alreadyHave.length} of {targetCareer.requiredSkills.length} core requirements fully matched.
              </p>
            </div>

            {/* Circular Gauge */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-800"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="url(#gapGradient)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="gapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-white leading-none font-display">
                  {coverage}%
                </span>
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Coverage</span>
              </div>
            </div>
          </div>

          {/* Dual Linear Progress Comparison */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
              <span className="text-indigo-400">Coverage: {coverage}%</span>
              <span className="text-rose-400">Skill Gap: {gap}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${coverage}%` }}
                className="bg-indigo-500 h-full rounded-l-full transition-all duration-500"
              />
              <div
                style={{ width: `${gap}%` }}
                className="bg-rose-500 h-full rounded-r-full transition-all duration-500"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
              <span>Acquired Competencies</span>
              <span>Needs Upskilling / Missing</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: Already Have */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-500">
              <CheckCircle className="w-4 h-4" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                Already Have ({gapAnalysis.alreadyHave.length})
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
              Met
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {gapAnalysis.alreadyHave.map((item) => (
              <div
                key={item.name}
                className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-black text-slate-800 dark:text-slate-100">{item.name}</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                  {item.level}
                </span>
              </div>
            ))}
            {gapAnalysis.alreadyHave.length === 0 && (
              <p className="text-xs text-slate-400 italic py-1">No core skills matched yet.</p>
            )}
          </div>
        </div>

        {/* SECTION 2: Need to Improve */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-500">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                Need to Improve ({gapAnalysis.needToImprove.length})
              </h3>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
              Upgrade
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {gapAnalysis.needToImprove.map((item) => (
              <div
                key={item.name}
                className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-black text-slate-800 dark:text-slate-100">{item.name}</span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 rounded-full font-black uppercase">
                  {item.gap}
                </span>
              </div>
            ))}
            {gapAnalysis.needToImprove.length === 0 && (
              <p className="text-xs text-slate-400 italic py-1">No level upgrades required.</p>
            )}
          </div>
        </div>

        {/* SECTION 3: Missing Skills */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-500">
              <XCircle className="w-4 h-4" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                Missing Skills ({gapAnalysis.missing.length})
              </h3>
            </div>
            <span className="text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
              Acquire
            </span>
          </div>

          <div className="space-y-2">
            {gapAnalysis.missing.map((item) => (
              <div
                key={item.name}
                className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="font-black text-slate-800 dark:text-slate-100">{item.name}</span>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                      item.importance === 'Core'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.importance}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 pl-4 truncate font-medium">
                  Topics: {item.topics.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SKILL PRIORITY RANKING */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-500">
              <Layers className="w-4 h-4" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                Skill Priority Ranking
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ranked by Impact</span>
          </div>

          <div className="space-y-2">
            {gapAnalysis.priorities.map((p) => (
              <div
                key={p.skill}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{p.skill}</h4>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                        p.priority === 'High Priority'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                          : p.priority === 'Medium Priority'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {p.priority}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Current: {p.currentLevel} → Required: {p.requiredLevel}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-300 shrink-0 font-bold">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{p.estimatedDuration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button to Generate Roadmap */}
        <div className="pt-2">
          <button
            onClick={() => {
              setActiveTab('roadmap');
              navigateTo('roadmap');
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>Generate Learning Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
