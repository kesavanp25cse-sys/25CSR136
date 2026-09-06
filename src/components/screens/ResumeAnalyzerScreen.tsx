import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  Award,
  Briefcase,
  Layers,
  Wrench,
  ArrowRight,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import { parseResumeFile, getSampleKesavanResumeData } from '../../services/resumeParser';

export const ResumeAnalyzerScreen: React.FC = () => {
  const { extractedResume, setExtractedResume, navigateTo, setActiveTab } = useApp();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleAnalyzeResume = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await parseResumeFile(selectedFile);
      setExtractedResume(data);
    } catch (err: any) {
      setError(err.message || 'Failed to process resume file.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSampleResume = () => {
    setIsAnalyzing(true);
    setError(null);
    setTimeout(() => {
      const sample = getSampleKesavanResumeData();
      setExtractedResume(sample);
      setSelectedFile(new File([''], sample.fileName));
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 overflow-y-auto">
      <MaterialTopBar
        title="Resume Analyzer"
        subtitle="NLP Entity Extraction & Skill Discovery"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 space-y-4 flex-1 pb-24">
        {/* Upload Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 bg-slate-800/60 hover:bg-slate-800/90 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2.5"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-lg">
            <Upload className="w-6 h-6 animate-bounce" />
          </div>

          <div>
            <p className="text-xs font-semibold text-white">
              {selectedFile ? selectedFile.name : 'Tap to upload or drop resume here'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Supports PDF, DOC, DOCX files (Up to 10MB)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
              PDF
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
              DOC
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
              DOCX
            </span>
          </div>
        </div>

        {/* Quick Sample Button */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-slate-400">Need a sample file to test?</span>
          <button
            type="button"
            onClick={handleLoadSampleResume}
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Kesavan's Sample Resume</span>
          </button>
        </div>

        {/* Selected File Status & Analyze Button */}
        {selectedFile && !isAnalyzing && (
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white truncate max-w-[180px]">
                  Resume Selected: {selectedFile.name}
                </p>
                <p className="text-[10px] text-slate-400">Ready for NLP entity extraction</p>
              </div>
            </div>

            <button
              onClick={handleAnalyzeResume}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition active:scale-95"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Analyze Resume</span>
            </button>
          </div>
        )}

        {/* Loading / NLP Scanning Animation */}
        {isAnalyzing && (
          <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-center space-y-3">
            <div className="relative mx-auto w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
              <div className="w-full h-full flex items-center justify-center text-indigo-400">
                <BrainCircuit className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">
                Running NLP Tokenization &amp; Entity Extraction...
              </h4>
              <p className="text-[11px] text-slate-400">
                spaCy / Transformers pipeline extracting Technical Skills, Projects &amp; Certifications
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Extracted Information Display Cards */}
        {extractedResume && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Extracted Resume Insights</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {extractedResume.fileSize}
              </span>
            </div>

            {/* 1. Candidate Overview Card */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  {extractedResume.candidateName}
                </h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  Parsed Successfully
                </span>
              </div>
              <p className="text-xs text-slate-300">{extractedResume.education}</p>
              <p className="text-[11px] text-indigo-300 font-mono">
                {extractedResume.candidateEmail}
              </p>
            </div>

            {/* 2. Extracted Technical Skills Card */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Extracted Skills ({extractedResume.technicalSkills.length})</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {extractedResume.technicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-xs font-medium text-indigo-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Extracted Projects Card */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>Extracted Projects</span>
              </span>
              <div className="space-y-1.5">
                {extractedResume.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs text-slate-200"
                  >
                    • {proj}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Extracted Certifications Card */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Extracted Certifications</span>
              </span>
              <div className="space-y-1.5">
                {extractedResume.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs text-slate-200"
                  >
                    • {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Tools & Technologies */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tools &amp; Technologies</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {extractedResume.toolsAndTech.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded-md bg-slate-900 text-[11px] text-slate-300 border border-slate-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Analyze Career Profile Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('career');
                  navigateTo('career-recommendations');
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-98 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
              >
                <span>Analyze Career Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <MaterialBottomNav />
    </div>
  );
};
