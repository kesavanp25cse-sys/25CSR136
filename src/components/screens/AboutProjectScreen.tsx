import React from 'react';
import {
  GraduationCap,
  Code2,
  Brain,
  Database,
  Smartphone,
  Server,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';

export const AboutProjectScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 overflow-y-auto">
      <MaterialTopBar
        title="About Project"
        subtitle="B.E. CSE Final Year Major Project"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 space-y-4 flex-1 pb-24">
        {/* Project Header Banner */}
        <div className="p-5 rounded-3xl bg-gradient-to-tr from-indigo-950/90 via-slate-800 to-blue-950/80 border border-indigo-500/40 shadow-xl space-y-2 text-center">
          <div className="inline-flex p-2 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-1 border border-indigo-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
            Academic Project Specification
          </span>
          <h1 className="text-base font-extrabold text-white tracking-tight leading-snug">
            AI-Based Personal Career &amp; Skill Gap Analyzer
          </h1>
          <p className="text-xs text-slate-300 max-w-xs mx-auto">
            Software-only AI/ML mobile application for college students &amp; tech job seekers.
          </p>
        </div>

        {/* 1. Problem Statement */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
            Problem Statement
          </span>
          <h3 className="text-xs font-bold text-white">
            Industry Skill Mismatch &amp; Career Ambiguity in Higher Education
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Engineering students frequently struggle to identify how their academic curriculum aligns with fast-evolving industry requirements. Due to lack of objective skill assessment, students apply for unsuitable roles or discover critical competency gaps only after failing campus interviews.
          </p>
        </div>

        {/* 2. Proposed Solution */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            Proposed AI Solution
          </span>
          <h3 className="text-xs font-bold text-white">
            Autonomous Skill Extraction &amp; Real-Time Gap Assessment
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            An intelligent mobile architecture that ingests student resumes and profile credentials, parses entities using spaCy NLP pipelines, predicts optimal career alignments via Cosine Similarity vector models, calculates priority-ranked skill gaps, and synthesizes time-bounded learning roadmaps.
          </p>
        </div>

        {/* 3. System Objectives */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
            Key System Objectives
          </span>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Automate tokenized entity extraction from unstructured resume files (PDF/DOCX).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Calculate weighted career matching scores with transparent explainable AI reasons.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Perform comparative gap analysis categorizing competencies into Acquired, Level-Up, and Missing.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Generate milestone-oriented learning paths with topic breakdowns and time estimates.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Compute real-time 100-point Career Readiness Index to monitor placement preparedness.</span>
            </li>
          </ul>
        </div>

        {/* 4. Complete Technology Stack */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
            Technology Stack &amp; Architecture
          </span>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <Smartphone className="w-4 h-4" />
                <span>Mobile Client</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Android Native, Kotlin, Jetpack Compose, Material 3, MVVM Architecture, StateFlow.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Server className="w-4 h-4" />
                <span>REST Backend</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Python 3.11, FastAPI, Uvicorn, Pydantic, Async Request Pipeline, CORS.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                <Brain className="w-4 h-4" />
                <span>AI &amp; NLP Engine</span>
              </div>
              <p className="text-[11px] text-slate-300">
                spaCy en_core_web_sm, Scikit-learn TF-IDF Vectorizer, Cosine Similarity scoring.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Database className="w-4 h-4" />
                <span>Persistence</span>
              </div>
              <p className="text-[11px] text-slate-300">
                SQLite3 relational schema, Room DB (Android Local Cache), Cloud Firestore ready.
              </p>
            </div>
          </div>
        </div>

        {/* View Pipeline Flowchart Button */}
        <div className="pt-1">
          <button
            onClick={() => navigateTo('workflow')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-98 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>Explore 9-Stage ML System Workflow</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
