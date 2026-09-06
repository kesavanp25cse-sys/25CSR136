import React, { useState } from 'react';
import {
  X,
  Server,
  Code2,
  Database,
  Smartphone,
  BrainCircuit,
  GraduationCap,
  Copy,
  Check,
  Play,
  Terminal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BackendArchitectureModal: React.FC = () => {
  const { isBackendModalOpen, setIsBackendModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'fastapi' | 'ml' | 'database' | 'compose' | 'defense'>('fastapi');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [apiTesting, setApiTesting] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  if (!isBackendModalOpen) return null;

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleTestFastApiEndpoint = () => {
    setApiTesting(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiResponse(
        JSON.stringify(
          {
            status: 200,
            endpoint: '/api/skill-gap/analyze',
            method: 'POST',
            payload: {
              target_career: 'Data Analyst',
              student_id: 'STU_2026_KESAVAN',
              skill_coverage_percentage: 45.0,
              overall_gap_percentage: 55.0,
              priority_matrix: [
                { skill: 'Power BI', priority: 'High', est_duration: '3 weeks' },
                { skill: 'Statistics', priority: 'High', est_duration: '2 weeks' },
                { skill: 'Pandas', priority: 'Medium', est_duration: '2 weeks' },
                { skill: 'NumPy', priority: 'Medium', est_duration: '1 week' },
              ],
              career_readiness_score: 72,
              recommendation: 'Target advanced DAX & SQL Window Functions to reach 85+ Readiness Index.',
            },
            latency_ms: 38,
            server: 'uvicorn/0.23.2 (Python 3.11.8)',
          },
          null,
          2
        )
      );
      setApiTesting(false);
    }, 650);
  };

  const fastApiCode = `# ==========================================================
# AI-Based Personal Career & Skill Gap Analyzer - FastAPI Backend
# Tech Stack: Python 3.11, FastAPI, Uvicorn, spaCy, Scikit-learn
# ==========================================================

from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(
    title="AI Career & Skill Gap Analyzer API",
    version="1.0.0",
    description="REST backend for CSE Final Year Mobile Project"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class StudentProfile(BaseModel):
    name: str
    email: EmailStr
    degree: str
    graduation_year: int
    cgpa: float
    skills: List[dict]
    interests: List[str]

class SkillGapRequest(BaseModel):
    student_id: str
    target_career_id: str

# REST Endpoints
@app.post("/api/register")
async def register_student(profile: StudentProfile):
    return {"message": "Student profile registered successfully", "id": "STU_2026_01"}

@app.post("/api/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    # NLP spaCy Entity Extraction Simulation
    content = await file.read()
    return {
        "filename": file.filename,
        "extracted_skills": ["Python", "SQL", "Pandas", "NumPy", "Excel"],
        "extracted_projects": ["Student Management System", "Sales Prediction System"],
        "extracted_certifications": ["Python Certification", "IBM Data Analytics"]
    }

@app.get("/api/careers/recommendations")
async def get_career_recommendations(student_id: str):
    return [
        {"role": "Data Analyst", "match_percentage": 87, "status": "Top Recommended"},
        {"role": "Data Scientist", "match_percentage": 76, "status": "Recommended"},
        {"role": "Software Developer", "match_percentage": 72, "status": "Alternative"}
    ]

@app.post("/api/skill-gap/analyze")
async def analyze_skill_gap(payload: SkillGapRequest):
    return {
        "target_career": "Data Analyst",
        "already_have": ["Python", "SQL", "Excel"],
        "need_to_improve": ["Pandas", "NumPy"],
        "missing": ["Power BI", "Statistics", "Data Visualization"],
        "skill_coverage_percentage": 45,
        "overall_skill_gap_percentage": 55,
        "readiness_score": 72
    }

@app.get("/api/roadmap/{career_id}")
async def get_learning_roadmap(career_id: str):
    return {"career_id": career_id, "total_steps": 5, "current_progress": 62}`;

  const mlCode = `# Machine Learning Algorithm Core Implementation
# Vector Space Modeling using TF-IDF & Cosine Similarity

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def compute_career_matches(student_tokens: list[str], career_corpus: dict):
    """
    Computes Cosine Similarity between the student's extracted skill vector
    and the requirement vectors of industry career roles.
    """
    student_doc = " ".join(student_tokens)
    career_names = list(career_corpus.keys())
    documents = [student_doc] + [" ".join(career_corpus[c]) for c in career_names]
    
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)
    
    # Cosine Similarity of student (index 0) against all career docs (1..N)
    cosine_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    
    results = []
    for idx, score in enumerate(cosine_scores):
        match_percentage = int(round(score * 100))
        results.append({
            "career": career_names[idx],
            "score": max(20, min(95, match_percentage))
        })
    
    return sorted(results, key=lambda x: x["score"], reverse=True)`;

  const dbSchema = `-- SQLite / Relational Database Schema
-- CSE Final Year Major Project

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    degree TEXT,
    graduation_year INTEGER,
    cgpa REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE student_skills (
    student_id TEXT,
    skill_name TEXT,
    level TEXT CHECK(level IN ('Beginner', 'Intermediate', 'Advanced')),
    PRIMARY KEY (student_id, skill_name),
    FOREIGN KEY (student_id) REFERENCES users(id)
);

CREATE TABLE career_roles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    average_salary TEXT
);

CREATE TABLE career_skills (
    career_id TEXT,
    skill_name TEXT,
    importance TEXT CHECK(importance IN ('Core', 'Supporting', 'Preferred')),
    required_level TEXT,
    PRIMARY KEY (career_id, skill_name),
    FOREIGN KEY (career_id) REFERENCES career_roles(id)
);

CREATE TABLE roadmaps (
    id TEXT PRIMARY KEY,
    career_id TEXT,
    step_number INTEGER,
    skill_name TEXT,
    topics TEXT,
    difficulty TEXT,
    duration TEXT,
    FOREIGN KEY (career_id) REFERENCES career_roles(id)
);

CREATE TABLE student_progress (
    student_id TEXT,
    step_id TEXT,
    status TEXT CHECK(status IN ('Not Started', 'In Progress', 'Completed')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, step_id)
);`;

  const kotlinCode = `// Android Jetpack Compose + MVVM Architecture
// CareerViewModel.kt

package com.project.careeranalyzer.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.careeranalyzer.data.model.*
import com.project.careeranalyzer.data.repository.CareerRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class SkillGapUiState(
    val isLoading: Boolean = false,
    val targetCareer: String = "Data Analyst",
    val coveragePercentage: Int = 45,
    val gapPercentage: Int = 55,
    val readinessScore: Int = 72,
    val alreadyHave: List<SkillItem> = emptyList(),
    val needToImprove: List<SkillGapItem> = emptyList(),
    val missing: List<MissingSkillItem> = emptyList(),
    val errorMessage: String? = null
)

class CareerViewModel(
    private val repository: CareerRepository = CareerRepository()
) : ViewModel() {

    private val _uiState = MutableStateFlow(SkillGapUiState())
    val uiState: StateFlow<SkillGapUiState> = _uiState.asStateFlow()

    fun analyzeSkillGap(careerId: String) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            try {
                val result = repository.fetchSkillGapAnalysis(careerId)
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    targetCareer = result.targetCareer,
                    coveragePercentage = result.coverage,
                    gapPercentage = result.gap,
                    alreadyHave = result.alreadyHave,
                    needToImprove = result.needToImprove,
                    missing = result.missing
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    errorMessage = e.localizedMessage
                )
            }
        }
    }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                CSE Project Full-Stack &amp; AI/ML Architecture
              </h2>
              <p className="text-[11px] text-slate-400">
                Python FastAPI REST • NLP spaCy • SQLite • Jetpack Compose MVVM
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBackendModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('fastapi')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
              activeTab === 'fastapi'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Python FastAPI
          </button>
          <button
            onClick={() => setActiveTab('ml')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
              activeTab === 'ml'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            ML / NLP Engine
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
              activeTab === 'database'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            SQLite Schema
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
              activeTab === 'compose'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Android Kotlin MVVM
          </button>
          <button
            onClick={() => setActiveTab('defense')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
              activeTab === 'defense'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Viva / Project Defense
          </button>
        </div>

        {/* Tab 1: FastAPI */}
        {activeTab === 'fastapi' && (
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400">
                server.py (FastAPI RESTful Service)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTestFastApiEndpoint}
                  disabled={apiTesting}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 hover:bg-emerald-600/30 transition"
                >
                  <Play className="w-3 h-3" />
                  <span>{apiTesting ? 'Pinging API...' : 'Simulate Live API Call'}</span>
                </button>
                <button
                  onClick={() => copyCode(fastApiCode, 'fastapi')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1 hover:text-white"
                >
                  {copiedSection === 'fastapi' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'fastapi' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Simulated Live API Response Console */}
            {apiResponse && (
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1 text-xs">
                <div className="flex items-center justify-between text-emerald-400 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    <span>Response from Uvicorn ASGI Server (200 OK)</span>
                  </span>
                  <button onClick={() => setApiResponse(null)} className="text-slate-500 hover:text-white">
                    Clear
                  </button>
                </div>
                <pre className="font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-40 p-2 bg-slate-900 rounded-lg">
                  {apiResponse}
                </pre>
              </div>
            )}

            <pre className="font-mono text-[11px] p-3 rounded-2xl bg-slate-950 border border-slate-800 text-indigo-200 overflow-x-auto max-h-72 leading-relaxed">
              {fastApiCode}
            </pre>
          </div>
        )}

        {/* Tab 2: ML / NLP */}
        {activeTab === 'ml' && (
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">
                ml_engine.py (TF-IDF &amp; Cosine Similarity Classifier)
              </span>
              <button
                onClick={() => copyCode(mlCode, 'ml')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1 hover:text-white"
              >
                {copiedSection === 'ml' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'ml' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1.5">
              <p>
                <strong>Mathematical Foundation:</strong> Career recommendations are calculated using Cosine Similarity between vector embeddings of candidate credentials and industry benchmarks:
              </p>
              <code className="block bg-slate-950 p-2 rounded text-indigo-300 font-mono text-[11px]">
                similarity(A, B) = (A • B) / (||A|| * ||B||)
              </code>
            </div>

            <pre className="font-mono text-[11px] p-3 rounded-2xl bg-slate-950 border border-slate-800 text-purple-200 overflow-x-auto max-h-72 leading-relaxed">
              {mlCode}
            </pre>
          </div>
        )}

        {/* Tab 3: SQLite Database */}
        {activeTab === 'database' && (
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400">
                schema.sql (Relational SQLite3 Database Schema)
              </span>
              <button
                onClick={() => copyCode(dbSchema, 'db')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1 hover:text-white"
              >
                {copiedSection === 'db' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'db' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="font-mono text-[11px] p-3 rounded-2xl bg-slate-950 border border-slate-800 text-blue-200 overflow-x-auto max-h-72 leading-relaxed">
              {dbSchema}
            </pre>
          </div>
        )}

        {/* Tab 4: Android Jetpack Compose */}
        {activeTab === 'compose' && (
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">
                CareerViewModel.kt (Kotlin MVVM + StateFlow)
              </span>
              <button
                onClick={() => copyCode(kotlinCode, 'kt')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1 hover:text-white"
              >
                {copiedSection === 'kt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'kt' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="font-mono text-[11px] p-3 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-200 overflow-x-auto max-h-72 leading-relaxed">
              {kotlinCode}
            </pre>
          </div>
        )}

        {/* Tab 5: Viva / Project Defense */}
        {activeTab === 'defense' && (
          <div className="space-y-3 flex-1 text-xs text-slate-300">
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
              <h3 className="font-bold text-emerald-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>CSE Major Project Viva &amp; Examination Talking Points</span>
              </h3>
              <p className="text-[11px] text-slate-300">
                Key points to present before the external academic committee.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <h4 className="font-bold text-white">Q1: Why use TF-IDF &amp; Cosine Similarity over random heuristics?</h4>
                <p className="text-[11px] text-slate-300">
                  Cosine similarity measures angular orientation in high-dimensional feature space regardless of document size, normalizing candidate skill lists against role profiles without penalizing students for concise resumes.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <h4 className="font-bold text-white">Q2: How is Skill Gap computed dynamically?</h4>
                <p className="text-[11px] text-slate-300">
                  Via set theory difference operators: <code className="text-indigo-300">Missing = Required_Skills \ Acquired_Skills</code>. Acquired skills with insufficient levels are pushed into the "Need to Improve" matrix with prioritized duration estimates.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <h4 className="font-bold text-white">Q3: How does the Career Readiness Index score out of 100?</h4>
                <p className="text-[11px] text-slate-300">
                  Weighted multi-vector scoring: Technical Skill Proficiency (25%), Skill Gap Coverage (30%), Practical Capstone Projects (20%), Industry Certifications (15%), and Resume Quality (10%).
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsBackendModalOpen(false)}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition shrink-0"
        >
          Close Architecture Modal
        </button>
      </div>
    </div>
  );
};
