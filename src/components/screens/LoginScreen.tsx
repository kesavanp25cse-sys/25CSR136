import React, { useState } from 'react';
import { Mail, Lock, LogIn, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { navigateTo, login, demoLoginKesavan } = useApp();
  const [email, setEmail] = useState('kesavanperiyasamy571@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email address and password.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid academic or professional email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError('Invalid credentials. Please verify your login details.');
    }
  };

  const handleForgotPassword = () => {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 4000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-900 text-slate-100 overflow-y-auto">
      <div className="pt-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Student Login</h1>
          <p className="text-xs text-slate-400">
            Sign in to access your career profile, skill gap insights &amp; roadmap.
          </p>
        </div>

        {/* Quick Demo Fill Alert */}
        <div className="bg-indigo-950/60 border border-indigo-500/30 rounded-xl p-3 flex items-start justify-between gap-3 text-xs">
          <div>
            <p className="font-semibold text-indigo-200">CSE Evaluator Demo Account</p>
            <p className="text-indigo-400/90 text-[11px] mt-0.5">
              Prefilled with Kesavan's credentials (Target: Data Analyst, 87% Match).
            </p>
          </div>
          <button
            type="button"
            onClick={demoLoginKesavan}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px] whitespace-nowrap transition"
          >
            Instant Demo
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {forgotSent && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Password reset instructions have been sent to your email.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="pt-6 pb-2 text-center">
        <p className="text-xs text-slate-400">
          Don't have an account?{' '}
          <button
            onClick={() => navigateTo('signup')}
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition underline underline-offset-2"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};
