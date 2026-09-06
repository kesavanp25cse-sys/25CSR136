import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  AppNotification,
  ResumeExtractedData,
  RoadmapStep,
  ScreenName,
  StudentProfile,
} from '../types';
import { SAMPLE_STUDENT_PROFILE } from '../data/sampleProfile';
import { generatePersonalizedRoadmap } from '../services/aiEngine';

interface AppContextType {
  currentScreen: ScreenName;
  navigateTo: (screen: ScreenName) => void;
  activeTab: 'home' | 'career' | 'skills' | 'roadmap' | 'profile';
  setActiveTab: (tab: 'home' | 'career' | 'skills' | 'roadmap' | 'profile') => void;
  profile: StudentProfile;
  updateProfile: (data: Partial<StudentProfile>) => void;
  targetCareerId: string;
  setTargetCareerId: (careerId: string) => void;
  roadmapSteps: RoadmapStep[];
  toggleStepStatus: (stepId: string) => void;
  extractedResume: ResumeExtractedData | null;
  setExtractedResume: (data: ResumeExtractedData | null) => void;
  notifications: AppNotification[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isDeviceFrameEnabled: boolean;
  toggleDeviceFrame: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isArchitectureModalOpen: boolean;
  setIsArchitectureModalOpen: (open: boolean) => void;
  isAiAnalysisModalOpen: boolean;
  setIsAiAnalysisModalOpen: (open: boolean) => void;
  isNotificationsDrawerOpen: boolean;
  setIsNotificationsDrawerOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  login: (email?: string, password?: string) => boolean;
  logout: () => void;
  demoLoginKesavan: () => void;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'SQL Module Pending',
    message: 'Complete your pending SQL Subqueries & Window Functions module in your roadmap.',
    timestamp: '15m ago',
    read: false,
    type: 'alert',
  },
  {
    id: 'n2',
    title: 'Skill Gap Analysis Ready',
    message: 'AI analyzed your profile against Data Analyst roles: 3 core skill gaps identified.',
    timestamp: '2h ago',
    read: false,
    type: 'info',
  },
  {
    id: 'n3',
    title: 'Career Readiness Improved',
    message: 'Your career readiness index is currently 72/100 (+8 pts this week).',
    timestamp: '1d ago',
    read: true,
    type: 'success',
  },
  {
    id: 'n4',
    title: 'Profile Updated',
    message: 'Python and SQL competencies successfully verified against project evidence.',
    timestamp: '2d ago',
    read: true,
    type: 'info',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [activeTab, setActiveTab] = useState<'home' | 'career' | 'skills' | 'roadmap' | 'profile'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('career_analyzer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return SAMPLE_STUDENT_PROFILE;
  });

  const [targetCareerId, setTargetCareerIdState] = useState<string>(profile.targetCareerId || 'data-analyst');
  const [extractedResume, setExtractedResume] = useState<ResumeExtractedData | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isDeviceFrameEnabled, setIsDeviceFrameEnabled] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isAiAnalysisModalOpen, setIsAiAnalysisModalOpen] = useState<boolean>(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState<boolean>(false);

  // Initialize roadmap steps
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(() => {
    return generatePersonalizedRoadmap(profile, targetCareerId);
  });

  // Sync profile targetCareerId
  const setTargetCareerId = (careerId: string) => {
    setTargetCareerIdState(careerId);
    setProfile((prev) => ({ ...prev, targetCareerId: careerId }));
    const newRoadmap = generatePersonalizedRoadmap(profile, careerId);
    setRoadmapSteps(newRoadmap);
  };

  // Sync profile updates to local storage
  const updateProfile = (data: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem('career_analyzer_profile', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle roadmap step status
  const toggleStepStatus = (stepId: string) => {
    setRoadmapSteps((prev) =>
      prev.map((step) => {
        if (step.id === stepId) {
          const nextStatus = step.status === 'Completed' ? 'In Progress' : 'Completed';
          const nextPercent = nextStatus === 'Completed' ? 100 : 50;

          if (nextStatus === 'Completed') {
            try {
              confetti({
                particleCount: 55,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b'],
              });
            } catch (e) {
              // Ignore confetti errors
            }

            // Push in-app notification
            const newNotif: AppNotification = {
              id: `notif-${Date.now()}`,
              title: 'Roadmap Milestone Completed',
              message: `You marked "${step.skill}" as completed! Your career readiness score recalculated.`,
              timestamp: 'Just now',
              read: false,
              type: 'progress',
            };
            setNotifications((n) => [newNotif, ...n]);
          }

          return {
            ...step,
            status: nextStatus,
            progressPercentage: nextPercent,
          };
        }
        return step;
      })
    );
  };

  const navigateTo = (screen: ScreenName) => {
    setCurrentScreen(screen);
    // Sync bottom navigation tabs if navigating to main screens
    if (screen === 'dashboard') setActiveTab('home');
    else if (screen === 'career-recommendations') setActiveTab('career');
    else if (screen === 'skill-gap') setActiveTab('skills');
    else if (screen === 'roadmap') setActiveTab('roadmap');
    else if (screen === 'profile-setup') setActiveTab('profile');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleDeviceFrame = () => {
    setIsDeviceFrameEnabled((prev) => !prev);
  };

  const login = (email?: string, password?: string): boolean => {
    if (!email || !password) return false;
    setIsLoggedIn(true);
    navigateTo('dashboard');
    return true;
  };

  const demoLoginKesavan = () => {
    setProfile(SAMPLE_STUDENT_PROFILE);
    setTargetCareerId('data-analyst');
    setIsLoggedIn(true);
    navigateTo('dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigateTo('login');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        activeTab,
        setActiveTab,
        profile,
        updateProfile,
        targetCareerId,
        setTargetCareerId,
        roadmapSteps,
        toggleStepStatus,
        extractedResume,
        setExtractedResume,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        theme,
        toggleTheme,
        isDeviceFrameEnabled,
        toggleDeviceFrame,
        isSearchOpen,
        setIsSearchOpen,
        isArchitectureModalOpen,
        setIsArchitectureModalOpen,
        isAiAnalysisModalOpen,
        setIsAiAnalysisModalOpen,
        isNotificationsDrawerOpen,
        setIsNotificationsDrawerOpen,
        isLoggedIn,
        login,
        logout,
        demoLoginKesavan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
