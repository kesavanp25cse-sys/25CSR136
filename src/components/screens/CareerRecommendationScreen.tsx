import React, { useState } from 'react';
import {
  Compass,
  CheckCircle,
  XCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  BarChart2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import { calculateCareerMatches } from '../../services/aiEngine';

export const CareerRecommendationScreen: React.FC = () => {
  const {
    profile,
    targetCareerId,
    setTargetCareerId,
    navigateTo,
    setActiveTab,
  } = useApp();

  const [expandedCareerId, setExpandedCareerId] = useState<string | null>(targetCareerId);

  // Dynamic ML Career Matches
  const matches = calculateCareerMatches(profile);

  const handleSelectCareer = (careerId: string) => {
    setTargetCareerId(careerId);
    setActiveTab('skills');
    navigateTo('skill-gap');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 overflow-y-auto">
      <MaterialTopBar
        title="AI Career Recommendations"
        subtitle="Cosine Similarity & Multi-Factor Scoring"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 space-y-4 flex-1 pb-24">
        {/* Top Header Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-950/90 via-slate-900 to-blue-950/80 border border-indigo-500/30 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              AI Multi-Factor Assessment
            </span>
          </div>
          <h2 className="text-sm font-semibold text-white">
            Personalized role alignment for {profile.name}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Evaluated across {profile.skills.length} technical proficiencies, {profile.projects.length} projects, academic CGPA ({profile.cgpa}), and specialized domain interests.
          </p>
        </div>

        {/* Career Recommendations List */}
        <div className="space-y-3">
          {matches.map((item, index) => {
            const isTarget = targetCareerId === item.career.id;
            const isExpanded = expandedCareerId === item.career.id;
            const isTopMatch = index === 0;

            return (
              <div
                key={item.career.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isTarget
                    ? 'bg-slate-800/90 border-indigo-500 ring-1 ring-indigo-500/30 shadow-lg'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedCareerId(isExpanded ? null : item.career.id)}
                  className="p-4 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white tracking-tight truncate">
                        {item.career.title}
                      </h3>
                      {isTopMatch && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                          Top Match
                        </span>
                      )}
                      {isTarget && (
                        <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">
                          Current Target
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {item.career.category} • Avg: {item.career.averageSalary}
                    </p>
                  </div>

                  {/* Match Percentage Badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-black text-white leading-none">
                        {item.matchPercentage}%
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium">Match</span>
                    </div>
                    <div className="text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3.5 border-t border-slate-700/60 pt-3 text-xs">
                    {/* Role Description */}
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {item.career.description}
                    </p>

                    {/* AI Reasons for Match */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Why You Match This Role:</span>
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {item.reasons.map((reason, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Matching Skills */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Matching Skills ({item.matchingSkills.length})</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.matchingSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]"
                          >
                            {s}
                          </span>
                        ))}
                        {item.matchingSkills.length === 0 && (
                          <span className="text-[11px] text-slate-500 italic">None yet</span>
                        )}
                      </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-rose-400 flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          <span>Missing Skills to Learn ({item.missingSkills.length})</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.missingSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Short Explanation */}
                    <div className="text-[11px] text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                      {item.explanation}
                    </div>

                    {/* Actions */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => handleSelectCareer(item.career.id)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition"
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>
                          {isTarget ? 'View Skill Gap' : 'Select Target & Analyze Gap'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
