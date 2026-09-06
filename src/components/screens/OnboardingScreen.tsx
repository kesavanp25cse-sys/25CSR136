import React, { useState } from 'react';
import { Compass, Target, Map, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Discover Your Career',
      description: 'AI analyzes your profile and recommends suitable career roles based on your skills, projects, and interests.',
      icon: Compass,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Step 1 of 3 • Career Role Matching',
    },
    {
      title: 'Find Your Skill Gap',
      description: 'Compare your current skills with the skills required for your target career and prioritize missing proficiencies.',
      icon: Target,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Step 2 of 3 • Gap Analysis Engine',
    },
    {
      title: 'Build Your Roadmap',
      description: 'Follow a personalized learning roadmap, complete milestone modules, and track your overall career readiness score.',
      icon: Map,
      color: 'from-purple-600 to-pink-600',
      badge: 'Step 3 of 3 • Learning Path & Progress',
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      navigateTo('login');
    }
  };

  const handleSkip = () => {
    navigateTo('login');
  };

  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-900 text-slate-100 select-none">
      {/* Top bar with Skip button */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          {current.badge}
        </span>
        <button
          onClick={handleSkip}
          className="text-xs font-medium text-slate-400 hover:text-slate-200 transition py-1 px-2"
        >
          Skip
        </button>
      </div>

      {/* Central Illustration Card */}
      <div className="flex flex-col items-center text-center my-auto py-6 space-y-6">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-xl animate-pulse" />
          <div
            className={`relative w-32 h-32 rounded-3xl bg-gradient-to-tr ${current.color} flex items-center justify-center text-white shadow-2xl`}
          >
            <Icon className="w-16 h-16 animate-bounce" />
          </div>
        </div>

        <div className="space-y-3 max-w-xs">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {current.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {current.description}
          </p>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeStep ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="w-full space-y-3 pb-4">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
        >
          {activeStep === steps.length - 1 ? (
            <>
              <span>Get Started</span>
              <Check className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
