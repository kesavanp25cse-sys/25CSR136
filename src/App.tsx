import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AndroidDeviceFrame } from './components/common/AndroidDeviceFrame';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { ProfileSetupScreen } from './components/screens/ProfileSetupScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { ResumeAnalyzerScreen } from './components/screens/ResumeAnalyzerScreen';
import { CareerRecommendationScreen } from './components/screens/CareerRecommendationScreen';
import { SkillGapScreen } from './components/screens/SkillGapScreen';
import { LearningRoadmapScreen } from './components/screens/LearningRoadmapScreen';
import { ProgressTrackerScreen } from './components/screens/ProgressTrackerScreen';
import { CareerReadinessScreen } from './components/screens/CareerReadinessScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AboutProjectScreen } from './components/screens/AboutProjectScreen';
import { WorkflowScreen } from './components/screens/WorkflowScreen';

// Modals & Overlays
import { AiProfileAnalysisModal } from './components/screens/AiProfileAnalysisModal';
import { NotificationsDrawer } from './components/screens/NotificationsDrawer';
import { SearchModal } from './components/screens/SearchModal';
import { BackendArchitectureModal } from './components/screens/BackendArchitectureModal';

const MainScreenRouter: React.FC = () => {
  const { currentScreen } = useApp();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'login':
        return <LoginScreen />;
      case 'signup':
        return <SignUpScreen />;
      case 'profile-setup':
        return <ProfileSetupScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'resume-analyzer':
        return <ResumeAnalyzerScreen />;
      case 'career-recommendations':
        return <CareerRecommendationScreen />;
      case 'skill-gap':
        return <SkillGapScreen />;
      case 'roadmap':
        return <LearningRoadmapScreen />;
      case 'progress':
        return <ProgressTrackerScreen />;
      case 'readiness':
        return <CareerReadinessScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'about':
        return <AboutProjectScreen />;
      case 'workflow':
        return <WorkflowScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <AndroidDeviceFrame>
      {renderActiveScreen()}
      <AiProfileAnalysisModal />
      <NotificationsDrawer />
      <SearchModal />
      <BackendArchitectureModal />
    </AndroidDeviceFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainScreenRouter />
    </AppProvider>
  );
}
