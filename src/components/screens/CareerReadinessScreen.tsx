import React from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Code,
  Briefcase,
  FileText,
  Target,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import { calculateCareerReadiness } from '../../services/aiEngine';

export const CareerReadinessScreen: React.FC = () => {
  const {
    profile,
    targetCareerId,
    roadmapSteps,
    navigateTo,
    setActiveTab,
    theme,
  } = useApp();

  const readiness = calculateCareerReadiness(profile, targetCareerId, roadmapSteps);

  const breakdownItems = [
    {
      label: 'Technical Skills',
      score: readiness.technicalSkillsScore,
      icon: Code,
      color: 'from-blue-500 to-indigo-500',
      description: 'Proficiency across Python, C++, SQL, and Data structures.',
    },
    {
      label: 'Projects Portfolio',
      score: readiness.projectsScore,
      icon: Briefcase,
      color: 'from-indigo-500 to-purple-500',
      description: 'Practical capstone implementations and database integration.',
    },
    {
      label: 'Certifications',
      score: readiness.certificationsScore,
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      description: 'Verified credentials from Coursera / IBM and HackerRank.',
    },
    {
      label: 'Resume Quality',
      score: readiness.resumeScore,
      icon: FileText,
      color: 'from-emerald-500 to-teal-500',
      description: 'NLP parsed structure, keywords, and academic achievements.',
    },
    {
      label: 'Skill Gap Coverage',
      score: readiness.skillGapScore,
      icon: Target,
      color: 'from-amber-500 to-orange-500',
      description: 'Alignment with target role industry competency matrix.',
    },
  ];

  return (
    <div
      className={`flex-1 flex flex-col justify-between transition-colors overflow-y-auto ${
        theme === 'dark' ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      <MaterialTopBar
        title="Career Readiness Score"
        subtitle="Holistic Employability & Placement Index"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 sm:p-5 space-y-4 flex-1 pb-24">
        {/* Main Score Hero Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center shadow-md space-y-3 relative overflow-hidden text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>AI Multi-Vector Evaluation</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-6xl font-black text-white tracking-tight font-display">
                {readiness.overallScore}
              </span>
              <span className="text-lg font-bold text-slate-400">/ 100</span>
            </div>
            <p className="text-xs font-black text-emerald-400 mt-1 flex items-center gap-1 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Competitive Candidate Profile (Tier 1 Eligible)</span>
            </p>
          </div>

          <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed font-medium">
            Composite score derived from technical skills, project depth, certifications, resume NLP parse, and target gap closure.
          </p>
        </div>

        {/* Breakdown of 5 Categories */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <span>Score Dimension Breakdown</span>
          </h3>

          <div className="space-y-2">
            {breakdownItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="p-3.5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white">{item.label}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-base font-black text-slate-900 dark:text-white font-display">
                      {item.score}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${item.score}%` }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI-Generated Personalized Suggestions */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-500">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
              AI Action Recommendations
            </h3>
          </div>

          <div className="space-y-2">
            {readiness.suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigate to Roadmap */}
        <div className="pt-2">
          <button
            onClick={() => {
              setActiveTab('roadmap');
              navigateTo('roadmap');
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>Complete Roadmap Modules to Boost Score</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
