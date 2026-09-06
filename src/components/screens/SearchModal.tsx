import React, { useState } from 'react';
import {
  Search,
  X,
  Compass,
  Code,
  Map,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAREER_ROLES } from '../../data/careerDataset';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setTargetCareerId,
    navigateTo,
    setActiveTab,
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // 1. Matched Career Roles
  const matchedCareers = CAREER_ROLES.filter(
    (c) =>
      c.title.toLowerCase().includes(trimmed) ||
      c.description.toLowerCase().includes(trimmed) ||
      c.category.toLowerCase().includes(trimmed)
  );

  // 2. Matched Skills across dataset
  const allUniqueSkills = Array.from(
    new Set(CAREER_ROLES.flatMap((c) => c.requiredSkills.map((s) => s.name)))
  );
  const matchedSkills = allUniqueSkills.filter((s) => s.toLowerCase().includes(trimmed));

  // 3. Matched Roadmap Topics
  const matchedTopics = CAREER_ROLES.flatMap((c) =>
    c.defaultRoadmap.flatMap((r) =>
      r.topics
        .filter((t) => t.toLowerCase().includes(trimmed))
        .map((t) => ({ topic: t, skill: r.skill, role: c.title, roleId: c.id }))
    )
  ).slice(0, 8);

  const handleSelectCareer = (careerId: string) => {
    setTargetCareerId(careerId);
    setActiveTab('skills');
    navigateTo('skill-gap');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-4 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto text-slate-100">
        {/* Search Bar Input */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-indigo-400 absolute left-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles, skills, or curriculum topics..."
            autoFocus
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white absolute right-3"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips when query is empty */}
        {!trimmed && (
          <div className="space-y-2 py-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Data Analyst', 'Python', 'SQL', 'Power BI', 'Machine Learning', 'Full Stack'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-[11px] text-slate-300 hover:text-white hover:border-indigo-500 transition"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {trimmed && (
          <div className="space-y-4 pt-1">
            {/* 1. Career Roles */}
            {matchedCareers.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Career Roles ({matchedCareers.length})</span>
                </span>
                <div className="space-y-1">
                  {matchedCareers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCareer(c.id)}
                      className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-indigo-950/60 border border-slate-700/80 hover:border-indigo-500/50 text-left flex items-center justify-between transition"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{c.title}</h4>
                        <p className="text-[10px] text-slate-400">{c.category}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Skills */}
            {matchedSkills.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" />
                  <span>Matching Skills ({matchedSkills.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setQuery(s);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-xs text-slate-200 hover:border-emerald-500"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Topics */}
            {matchedTopics.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Map className="w-3.5 h-3.5" />
                  <span>Roadmap Topics ({matchedTopics.length})</span>
                </span>
                <div className="space-y-1">
                  {matchedTopics.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectCareer(item.roleId)}
                      className="w-full p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-white">{item.topic}</span>
                        <span className="text-[10px] text-slate-400 block">
                          Module: {item.skill} ({item.role})
                        </span>
                      </div>
                      <span className="text-[10px] text-indigo-400">View Roadmap</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchedCareers.length === 0 &&
              matchedSkills.length === 0 &&
              matchedTopics.length === 0 && (
                <div className="py-6 text-center text-slate-400 text-xs">
                  No matching roles or skills found for "{query}".
                </div>
              )}
          </div>
        )}

        <button
          onClick={() => setIsSearchOpen(false)}
          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition"
        >
          Cancel Search
        </button>
      </div>
    </div>
  );
};
