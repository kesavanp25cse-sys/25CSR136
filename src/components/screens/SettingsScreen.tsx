import React, { useState } from 'react';
import {
  User,
  Lock,
  Moon,
  Sun,
  Bell,
  Info,
  Shield,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Sliders,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';

export const SettingsScreen: React.FC = () => {
  const {
    theme,
    toggleTheme,
    isDeviceFrameEnabled,
    toggleDeviceFrame,
    navigateTo,
    logout,
  } = useApp();

  const [passwordModal, setPasswordModal] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChanged, setPassChanged] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length >= 6) {
      setPassChanged(true);
      setTimeout(() => {
        setPassChanged(false);
        setPasswordModal(false);
        setOldPass('');
        setNewPass('');
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 overflow-y-auto">
      <MaterialTopBar
        title="Application Settings"
        subtitle="Preferences & Account Management"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 space-y-4 flex-1 pb-24">
        {/* Account Section */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Account Management
          </span>
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 divide-y divide-slate-700/60 overflow-hidden">
            <button
              onClick={() => navigateTo('profile-setup')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-700/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Edit Student Profile</h4>
                  <p className="text-[10px] text-slate-400">Update skills, CGPA, and career goals</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => setPasswordModal(true)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-700/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Change Password</h4>
                  <p className="text-[10px] text-slate-400">Update security credentials</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Display &amp; Notification Preferences
          </span>
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 divide-y divide-slate-700/60 overflow-hidden">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dark Theme (Material 3)</h4>
                  <p className="text-[10px] text-slate-400">Toggle dark / light display palette</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Android Phone Chassis</h4>
                  <p className="text-[10px] text-slate-400">Simulate Pixel 9 Pro device frame</p>
                </div>
              </div>
              <button
                onClick={toggleDeviceFrame}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  isDeviceFrameEnabled ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isDeviceFrameEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">In-App Push Alerts</h4>
                  <p className="text-[10px] text-slate-400">Roadmap reminders &amp; readiness tips</p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  notificationsEnabled ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Project Info & Privacy */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            About &amp; Compliance
          </span>
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 divide-y divide-slate-700/60 overflow-hidden">
            <button
              onClick={() => navigateTo('about')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-700/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-600/20 text-cyan-400">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">About CSE Final Year Project</h4>
                  <p className="text-[10px] text-slate-400">Problem statement, architecture &amp; methodology</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={() => navigateTo('workflow')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-700/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-pink-600/20 text-pink-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Project Pipeline Workflow</h4>
                  <p className="text-[10px] text-slate-400">9-stage interactive ML diagram</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={logout}
            className="w-full py-3 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold text-xs border border-rose-500/30 flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Device</span>
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {passwordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white">Update Password</h3>
            {passChanged ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Password updated successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400">Current Password</label>
                  <input
                    type="password"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">New Password (min 6 chars)</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPasswordModal(false)}
                    className="px-2.5 py-1 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <MaterialBottomNav />
    </div>
  );
};
