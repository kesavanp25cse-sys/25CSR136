import React from 'react';
import {
  Map,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  BarChart,
  CircleDot,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import { CAREER_ROLES } from '../../data/careerDataset';

export const LearningRoadmapScreen: React.FC = () => {
  const {
    roadmapSteps,
    toggleStepStatus,
    targetCareerId,
    navigateTo,
  } = useApp();

  const career = CAREER_ROLES.find((c) => c.id === targetCareerId) || CAREER_ROLES[0];
  const completedCount = roadmapSteps.filter((s) => s.status === 'Completed').length;
  const overallRoadmapProgress =
    roadmapSteps.length > 0
      ? Math.round((completedCount / roadmapSteps.length) * 100)
      : 0;

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 overflow-y-auto">
      <MaterialTopBar
        title="Learning Roadmap"
        subtitle={`${career.title} Tailored Curriculum`}
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 space-y-4 flex-1 pb-24">
        {/* Roadmap Header Summary Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-950/90 via-slate-800 to-emerald-950/60 border border-indigo-500/30 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Personalized Learning Path
              </span>
              <h2 className="text-base font-bold text-white tracking-tight">
                {career.title} Career Roadmap
              </h2>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-emerald-400">
                {overallRoadmapProgress}%
              </span>
              <p className="text-[10px] text-slate-400">Completed</p>
            </div>
          </div>

          <div className="w-full bg-slate-700/80 rounded-full h-2 overflow-hidden">
            <div
              style={{ width: `${overallRoadmapProgress}%` }}
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span>
              {completedCount} of {roadmapSteps.length} Milestones Cleared
            </span>
            <button
              onClick={() => navigateTo('progress')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View Progress Charts</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Vertical Timeline Roadmap */}
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-700/80">
          {roadmapSteps.map((step, idx) => {
            const isCompleted = step.status === 'Completed';
            const isInProgress = step.status === 'In Progress';

            return (
              <div key={step.id} className="relative group">
                {/* Timeline Bullet Node */}
                <div
                  className={`absolute -left-6 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/30'
                      : isInProgress
                      ? 'bg-indigo-600 border-indigo-400 text-white animate-pulse'
                      : 'bg-slate-800 border-slate-600 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : (
                    <span className="text-[10px] font-bold">{step.stepNumber}</span>
                  )}
                </div>

                {/* Step Content Card */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-slate-800/60 border-emerald-500/40'
                      : isInProgress
                      ? 'bg-slate-800/90 border-indigo-500/60 ring-1 ring-indigo-500/30 shadow-lg'
                      : 'bg-slate-800/40 border-slate-700/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                        Step {step.stepNumber}
                      </span>
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {step.skill}
                      </h3>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isInProgress
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>

                  {/* Topics List */}
                  <div className="my-2.5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      Curriculum Topics:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-[10px] font-medium text-slate-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta: Difficulty & Duration */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/60 pt-2.5">
                    <div className="flex items-center gap-3">
                      <span>Difficulty: <strong className="text-white font-semibold">{step.difficulty}</strong></span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        <span>{step.duration}</span>
                      </span>
                    </div>

                    {/* Toggle Completion Button */}
                    <button
                      onClick={() => toggleStepStatus(step.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 ${
                        isCompleted
                          ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <CircleDot className="w-3.5 h-3.5" />
                          <span>Mark Done</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
