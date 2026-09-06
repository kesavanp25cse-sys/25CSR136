import React from 'react';
import { Home, Compass, BarChart3, Map, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MaterialBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, navigateTo, theme } = useApp();

  const navItems = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Home,
      action: () => {
        setActiveTab('home');
        navigateTo('dashboard');
      },
    },
    {
      id: 'career' as const,
      label: 'Career',
      icon: Compass,
      action: () => {
        setActiveTab('career');
        navigateTo('career-recommendations');
      },
    },
    {
      id: 'skills' as const,
      label: 'Skills',
      icon: BarChart3,
      action: () => {
        setActiveTab('skills');
        navigateTo('skill-gap');
      },
    },
    {
      id: 'roadmap' as const,
      label: 'Roadmap',
      icon: Map,
      action: () => {
        setActiveTab('roadmap');
        navigateTo('roadmap');
      },
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: User,
      action: () => {
        setActiveTab('profile');
        navigateTo('profile-setup');
      },
    },
  ];

  return (
    <nav
      className={`sticky bottom-0 z-20 w-full px-2 py-2 border-t transition-colors select-none ${
        theme === 'dark'
          ? 'bg-slate-900/95 border-slate-800 backdrop-blur text-slate-400'
          : 'bg-white/95 border-slate-200 backdrop-blur text-slate-500'
      }`}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-black'
                  : 'hover:text-slate-300 active:scale-95'
              }`}
            >
              <div
                className={`relative px-4 py-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-600 dark:text-indigo-400'
                    : 'bg-transparent text-slate-400'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[10px] mt-1 uppercase tracking-wider font-black ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
