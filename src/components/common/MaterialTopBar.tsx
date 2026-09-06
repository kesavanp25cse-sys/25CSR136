import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Search,
  MoreVertical,
  SlidersHorizontal,
  Info,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScreenName } from '../../types';

interface MaterialTopBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const MaterialTopBar: React.FC<MaterialTopBarProps> = ({
  title,
  subtitle,
  showBack,
  onBack,
  rightAction,
}) => {
  const {
    currentScreen,
    navigateTo,
    unreadCount,
    setIsSearchOpen,
    setIsNotificationsDrawerOpen,
    setIsAiAnalysisModalOpen,
    theme,
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigateTo('dashboard');
    }
  };

  const isMainScreen = currentScreen === 'dashboard';

  return (
    <div
      className={`sticky top-0 z-20 px-4 py-2.5 flex items-center justify-between border-b transition-colors ${
        theme === 'dark'
          ? 'bg-slate-900/95 border-slate-800 text-slate-100 backdrop-blur'
          : 'bg-white/95 border-slate-200 text-slate-900 backdrop-blur'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack || !isMainScreen ? (
          <button
            onClick={handleBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-slate-800/40 text-slate-300 active:scale-95 transition"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
        )}

        <div className="min-w-0">
          <h1 className="text-base font-bold tracking-tight truncate leading-tight flex items-center gap-1.5">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-400 font-medium truncate leading-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {rightAction ? (
          rightAction
        ) : (
          <>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-slate-800/50 text-slate-300 transition"
              title="Search Roles, Skills & Roadmaps"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsNotificationsDrawerOpen(true)}
              className="relative p-2 rounded-full hover:bg-slate-800/50 text-slate-300 transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-slate-900">
                  {unreadCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-slate-800/50 text-slate-300 transition"
                title="More Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {isMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border py-1 z-50 text-xs font-medium ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800 shadow-slate-200'
                  }`}
                >
                  <button
                    onClick={() => {
                      setIsAiAnalysisModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-600/10 hover:text-indigo-400 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Profile Insights</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('readiness');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-600/10 hover:text-indigo-400 flex items-center gap-2"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Career Readiness</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('workflow');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-600/10 hover:text-indigo-400 flex items-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>Project Workflow</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('about');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-600/10 hover:text-indigo-400 flex items-center gap-2"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>About CSE Project</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('settings');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-indigo-600/10 hover:text-indigo-400 flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <span>Settings</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
