import React from 'react';
import { useEthics } from '../context/EthicsContext';
import { LearningTabId, PageId } from '../types/ethics';

export const Footer: React.FC = () => {
  const { navigate, overallCompletionPercent, setSearchOpen } = useEthics();

  const exploreLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'personal', label: 'Personal Ethics' },
    { id: 'professional', label: 'Professional Ethics' },
    { id: 'comparison', label: 'Ethics Face-Off' },
  ];

  const learningLinks: { tab: LearningTabId; label: string }[] = [
    { tab: 'videos', label: 'Video Library (15 Lessons)' },
    { tab: 'paths', label: 'Structured Learning Paths' },
    { tab: 'cases', label: 'Case Study Library' },
    { tab: 'daily', label: 'Daily Ethics Challenge' },
    { tab: 'journal', label: 'Private Reflection Journal' },
    { tab: 'bookmarks', label: 'Saved Bookmarks' },
  ];

  const interactiveLinks: { id: PageId; label: string }[] = [
    { id: 'theatre', label: 'Decision Theatre' },
    { id: 'quiz', label: 'Ethics Challenge Quizzes' },
    { id: 'progress', label: 'Dashboard & Certificate' },
    { id: 'settings', label: 'Settings, Music Studio & Guide' },
  ];

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1324]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-4">
            <p className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
              Ethics in Action
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              The Ethics Experience Centre — an interactive educational space exploring how personal
              values and professional responsibilities shape character, learning, and public trust.
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Every Choice Defines Who We Are · Learning progress:{' '}
              <span className="font-mono tabular-nums">{overallCompletionPercent}%</span>
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-[#0B162C] dark:text-white font-sans">
              Exhibition Halls
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => navigate(link.id)}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-[#EAB308] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#0B162C] dark:text-white font-sans">
              Learning Centre
            </h3>
            <ul className="space-y-2">
              {learningLinks.map((link) => (
                <li key={link.tab}>
                  <button
                    type="button"
                    onClick={() => navigate('learning', undefined, link.tab)}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-[#EAB308] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#0B162C] dark:text-white font-sans">
              Interactive Labs &amp; Tools
            </h3>
            <ul className="space-y-2">
              {interactiveLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => navigate(link.id)}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-[#EAB308] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-[#EAB308] transition-colors cursor-pointer"
                >
                  Global Search Centre
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('home', 'official-resources')}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-[#EAB308] transition-colors cursor-pointer"
                >
                  Official Ethics Resources &amp; Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Ethics in Action — The Ethics Experience Centre. Educational Resource.</p>
          <p>Progress, bookmarks, and private journal entries are stored locally in your browser.</p>
        </div>
      </div>
    </footer>
  );
};
