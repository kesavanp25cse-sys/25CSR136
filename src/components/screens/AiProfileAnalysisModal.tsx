import React from 'react';
import {
  Sparkles,
  X,
  CheckCircle,
  AlertTriangle,
  Compass,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateAiProfileAnalysis } from '../../services/aiEngine';

export const AiProfileAnalysisModal: React.FC = () => {
  const {
    isAiAnalysisModalOpen,
    setIsAiAnalysisModalOpen,
    profile,
    targetCareerId,
  } = useApp();

  if (!isAiAnalysisModalOpen) return null;

  const analysis = generateAiProfileAnalysis(profile, targetCareerId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <h2 className="text-base font-bold text-white">AI Profile Intelligence</h2>
          </div>
          <button
            onClick={() => setIsAiAnalysisModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Personalized AI Summary */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-950/80 to-slate-800 border border-indigo-500/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Personalized Profile Assessment</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {analysis.personalizedSummary}
          </p>
        </div>

        {/* Top Career Recommendation */}
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400">Primary AI Alignment:</span>
            <span className="font-bold text-white">{analysis.topCareerRecommendation}</span>
          </div>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
            Recommended
          </span>
        </div>

        {/* Strengths */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Identified Profile Strengths</span>
          </h3>
          <div className="space-y-1.5">
            {analysis.strengths.map((str, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{str}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas to Improve */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Target Competencies to Upgrade</span>
          </h3>
          <div className="space-y-1.5">
            {analysis.areasToImprove.map((area, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Model Insights */}
        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300 block">CSE Capstone Model Verification:</span>
          {analysis.keyInsights.map((insight, idx) => (
            <p key={idx}>• {insight}</p>
          ))}
        </div>

        <button
          onClick={() => setIsAiAnalysisModalOpen(false)}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
        >
          Close Insights
        </button>
      </div>
    </div>
  );
};
