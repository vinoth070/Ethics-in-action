import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { useEthics } from '../context/EthicsContext';
import { PageId } from '../types/ethics';

const NAV_ITEMS: { id: PageId; label: string; mobileLabel: string }[] = [
  { id: 'home', label: 'Home', mobileLabel: 'Home' },
  { id: 'personal', label: 'Personal', mobileLabel: 'Personal Ethics' },
  { id: 'professional', label: 'Professional', mobileLabel: 'Professional Ethics' },
  { id: 'comparison', label: 'Comparison', mobileLabel: 'Ethics Face-Off Comparison' },
  { id: 'learning', label: 'Learning Centre', mobileLabel: 'Ethics Learning Centre (Videos & Paths)' },
  { id: 'theatre', label: 'Theatre', mobileLabel: 'Decision Theatre' },
  { id: 'quiz', label: 'Challenge', mobileLabel: 'Ethics Challenge Quizzes' },
  { id: 'progress', label: 'Progress', mobileLabel: 'Progress & Certificate' },
];

export const Header: React.FC = () => {
  const { activePage, navigate, setSearchOpen } = useEthics();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: PageId) => {
    navigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 dark:border-slate-800/90 bg-[#F8F9FC]/92 dark:bg-[#070D1A]/92 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-editorial text-lg sm:text-xl font-semibold tracking-tight text-[#0B162C] dark:text-white whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity cursor-pointer"
          aria-label="Ethics in Action Home"
        >
          Ethics in Action
        </button>

        {/* Zone 2: Clean single-line typography navigation */}
        <nav
          className="hidden xl:flex items-center gap-5"
          aria-label="Primary Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#0B162C] dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#0B162C] dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className={`absolute left-0 right-0 -bottom-[21px] h-[2px] ${
                      item.id === 'professional'
                        ? 'bg-[#B47B1B] dark:bg-[#EAB308]'
                        : 'bg-[#2563EB] dark:bg-[#60A5FA]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search Action + Settings Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0F1A2E] hover:border-slate-400 dark:hover:border-slate-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Open Global Search Centre (Ctrl+K)"
            title="Search Ethics in Action (Ctrl+K)"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            type="button"
            onClick={() => handleNav('settings')}
            aria-current={activePage === 'settings' ? 'page' : undefined}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activePage === 'settings'
                ? 'bg-[#2563EB] text-white dark:bg-[#EAB308] dark:text-[#070D1A]'
                : 'bg-[#0B162C] text-white hover:bg-[#1A2B4C] dark:bg-white dark:text-[#070D1A] dark:hover:bg-slate-200'
            }`}
          >
            Settings
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Tablet & Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] px-4 py-4 shadow-lg"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {[...NAV_ITEMS, { id: 'settings' as PageId, label: 'Settings', mobileLabel: 'Settings, Music & Guide' }].map(
              (item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0B162C] text-white dark:bg-[#EAB308] dark:text-[#070D1A]'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    {item.mobileLabel}
                  </button>
                );
              }
            )}
          </div>
        </nav>
      )}
    </header>
  );
};
