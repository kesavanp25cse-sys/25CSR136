import React from 'react';
import {
  Bell,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  TrendingUp,
  Trash2,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsDrawer: React.FC = () => {
  const {
    isNotificationsDrawerOpen,
    setIsNotificationsDrawerOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo,
    setActiveTab,
  } = useApp();

  if (!isNotificationsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm h-full bg-slate-900 border-l border-slate-800 p-4 flex flex-col justify-between shadow-2xl text-slate-100">
        <div className="space-y-4">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400">
                <Bell className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-white">In-App Notifications</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Mark all read
              </button>
              <button
                onClick={() => setIsNotificationsDrawerOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
            {notifications.map((notif) => {
              const isAlert = notif.type === 'alert';
              const isSuccess = notif.type === 'success' || notif.type === 'progress';

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    markNotificationRead(notif.id);
                    if (notif.title.includes('SQL') || notif.title.includes('Roadmap')) {
                      setActiveTab('roadmap');
                      navigateTo('roadmap');
                    } else if (notif.title.includes('Skill Gap')) {
                      setActiveTab('skills');
                      navigateTo('skill-gap');
                    } else if (notif.title.includes('Readiness')) {
                      navigateTo('readiness');
                    }
                    setIsNotificationsDrawerOpen(false);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    notif.read
                      ? 'bg-slate-800/40 border-slate-800/80 text-slate-400'
                      : 'bg-slate-800/90 border-indigo-500/40 text-slate-200 ring-1 ring-indigo-500/20 shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">
                      {isAlert ? (
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                      ) : isSuccess ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Info className="w-4 h-4 text-indigo-400" />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {notifications.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                No new notifications.
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsNotificationsDrawerOpen(false)}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
};
