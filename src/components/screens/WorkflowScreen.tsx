import React from 'react';
import {
  FileText,
  ScanText,
  BrainCircuit,
  Compass,
  CheckSquare,
  AlertTriangle,
  Map,
  BarChart3,
  Award,
  ArrowDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import { ScreenType } from '../../types';

interface WorkflowStep {
  step: number;
  title: string;
  subtitle: string;
  targetScreen: ScreenType;
  icon: any;
  color: string;
  badge: string;
  description: string;
}

export const WorkflowScreen: React.FC = () => {
  const { navigateTo, setActiveTab } = useApp();

  const workflowSteps: WorkflowStep[] = [
    {
      step: 1,
      title: 'Student Profile / Resume Input',
      subtitle: 'Ingest raw academic credentials, GitHub, CGPA, and resume documents',
      targetScreen: 'profile-setup',
      icon: FileText,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Input Phase',
      description: 'Structured form input and binary PDF/DOCX file stream capture.',
    },
    {
      step: 2,
      title: 'Resume & Skill Extraction',
      subtitle: 'spaCy NLP Tokenization & Entity Recognition pipeline',
      targetScreen: 'resume-analyzer',
      icon: ScanText,
      color: 'from-indigo-500 to-purple-600',
      badge: 'NLP Parsing',
      description: 'Isolates candidate entities: Technical Skills, Frameworks, Projects, and Certifications.',
    },
    {
      step: 3,
      title: 'AI Profile Analysis',
      subtitle: 'Multi-vector academic & competency evaluation',
      targetScreen: 'dashboard',
      icon: BrainCircuit,
      color: 'from-purple-500 to-pink-600',
      badge: 'AI Diagnostics',
      description: 'Calculates cognitive strengths, focus domains, and areas needing reinforcement.',
    },
    {
      step: 4,
      title: 'Career Role Matching',
      subtitle: 'Cosine Similarity & TF-IDF vector score matching',
      targetScreen: 'career-recommendations',
      icon: Compass,
      color: 'from-pink-500 to-rose-600',
      badge: 'ML Classification',
      description: 'Ranks top 6 tech careers (Data Analyst, Full Stack, Data Scientist, ML Engineer, etc.).',
    },
    {
      step: 5,
      title: 'Required Skills Analysis',
      subtitle: 'Deconstructs selected target role benchmarks',
      targetScreen: 'skill-gap',
      icon: CheckSquare,
      color: 'from-rose-500 to-amber-600',
      badge: 'Requirement Matrix',
      description: 'Maps industry expectations into Core, Supporting, and Preferred skill tiers.',
    },
    {
      step: 6,
      title: 'Skill Gap Detection',
      subtitle: 'Set-difference mathematical computation & Priority Ranking',
      targetScreen: 'skill-gap',
      icon: AlertTriangle,
      color: 'from-amber-500 to-emerald-600',
      badge: 'Gap Engine',
      description: 'Segments proficiencies into Already Have, Need to Improve, and Missing with duration estimates.',
    },
    {
      step: 7,
      title: 'Personalized Learning Roadmap',
      subtitle: 'Topological sequencing & curriculum synthesis',
      targetScreen: 'roadmap',
      icon: Map,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Curriculum Gen',
      description: 'Creates a step-by-step timeline covering exact prerequisite order, topics, and difficulties.',
    },
    {
      step: 8,
      title: 'Progress Tracking',
      subtitle: 'Stateful milestone completion & analytics updates',
      targetScreen: 'progress',
      icon: BarChart3,
      color: 'from-teal-500 to-cyan-600',
      badge: 'Telemetry',
      description: 'Monitors cleared milestones with circular completion charts and status toggles.',
    },
    {
      step: 9,
      title: 'Career Readiness Score',
      subtitle: '100-Point placement readiness evaluation index',
      targetScreen: 'readiness',
      icon: Award,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Composite Index',
      description: 'Evaluates candidate competitiveness across 5 key dimensions with actionable tips.',
    },
  ];

  const handleStepClick = (step: WorkflowStep) => {
    if (step.targetScreen === 'career-recommendations') {
      setActiveTab('career');
    } else if (step.targetScreen === 'skill-gap') {
      setActiveTab('skills');
    } else if (step.targetScreen === 'roadmap') {
      setActiveTab('roadmap');
    }
    navigateTo(step.targetScreen);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 overflow-y-auto">
      <MaterialTopBar
        title="Project Pipeline Workflow"
        subtitle="9-Stage End-to-End System Flowchart"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 space-y-4 flex-1 pb-24">
        {/* Intro */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/30 space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Core Software Architecture</span>
          </div>
          <p className="text-xs text-slate-300">
            Interactive pipeline representation. Tap on any stage to execute or view that live module within the app.
          </p>
        </div>

        {/* 9 Stages List with Flow Connectors */}
        <div className="space-y-2">
          {workflowSteps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === workflowSteps.length - 1;

            return (
              <React.Fragment key={item.step}>
                <div
                  onClick={() => handleStepClick(item)}
                  className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/60 cursor-pointer transition-all shadow-md group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-600/20`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">
                            Stage 0{item.step}
                          </span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 font-semibold">
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed pl-1">
                    {item.description}
                  </p>
                </div>

                {!isLast && (
                  <div className="flex justify-center py-0.5">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
