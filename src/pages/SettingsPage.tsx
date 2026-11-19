import React, { useState } from 'react';
import {
  Sun,
  Moon,
  HelpCircle,
  Accessibility,
  RotateCcw,
  Info,
  Compass,
  BookOpen,
  Briefcase,
  Scale,
  Theater,
  CheckCircle2,
  Award,
  Sliders,
  Shield,
  Download,
  Trash2,
  Eye,
  EyeOff,
  PlayCircle,
  Search,
  Bookmark,
  BookMarked,
  Bell,
  Contrast,
} from 'lucide-react';
import { useEthics } from '../context/EthicsContext';
import { ConfirmModal } from '../components/ConfirmModal';
import { OfficialResourcesSection } from '../components/OfficialResourcesSection';
import { MusicStudioPanel } from '../components/MusicStudioPanel';
import { EDUCATIONAL_VIDEOS } from '../data/youtubeVideos';
import { LEARNING_PATHS } from '../data/learningPaths';

type SettingsTab = 'preferences' | 'privacy' | 'guide' | 'resources' | 'about';
type DestructiveAction = 'reset-progress' | 'clear-bookmarks' | 'clear-journal' | null;

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return `${hrs}h ${rem}m`;
}

export const SettingsPage: React.FC = () => {
  const {
    theme,
    setTheme,
    highContrast,
    setHighContrast,
    textSize,
    setTextSize,
    reducedMotion,
    setReducedMotion,
    learningReminders,
    setLearningReminders,
    progress,
    bookmarks,
    journalEntries,
    resetAllProgress,
    clearAllBookmarks,
    clearAllJournalEntries,
    exportLearningData,
    overallCompletionPercent,
    completedPathsCount,
    navigate,
  } = useEthics();

  const [activeTab, setActiveTab] = useState<SettingsTab>('preferences');
  const [pendingAction, setPendingAction] = useState<DestructiveAction>(null);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [showRawProgress, setShowRawProgress] = useState(false);

  const showNotice = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(null), 4500);
  };

  const handleConfirmDestructive = () => {
    if (pendingAction === 'reset-progress') {
      resetAllProgress();
      showNotice('Your learning progress, quiz scores, and video records have been reset cleanly on this device.');
    } else if (pendingAction === 'clear-bookmarks') {
      clearAllBookmarks();
      showNotice('All saved bookmarks have been removed from this browser.');
    } else if (pendingAction === 'clear-journal') {
      clearAllJournalEntries();
      showNotice('All private reflection journal entries have been permanently deleted from this browser.');
    }
    setPendingAction(null);
  };

  const handleExportData = () => {
    try {
      const json = exportLearningData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `ethics-in-action-learning-data-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotice('Your learning data backup has been downloaded as a JSON file.');
    } catch {
      showNotice('Unable to export data in this browser context. You can view and copy the JSON below.');
    }
  };

  const totalPathModules = LEARNING_PATHS.reduce((sum, p) => sum + p.modules.length, 0);

  const howToUseSteps = [
    {
      icon: Compass,
      title: 'Navigating the Experience Centre',
      body: 'Use the top navigation bar on desktop—or the menu button on tablets and phones—to move smoothly between Home, Personal Ethics, Professional Ethics, Comparison, Ethics Learning Centre, Decision Theatre, Ethics Challenge, Progress, and Settings.',
    },
    {
      icon: BookOpen,
      title: 'Exploring Personal & Professional Ethics',
      body: 'Study 7 Personal Values (Blue & Purple identity) and 8 Professional Standards (Gold & Deep Navy identity). Check off responsibilities, save reflections, and bookmark key items for quick review.',
    },
    {
      icon: Scale,
      title: 'Using the Ethics Face-Off Comparison',
      body: 'Toggle between Interactive Face-Off cards and the Complete 8-Dimension Matrix, then inspect the 5 Shared Values that unite personal character and professional duty.',
    },
    {
      icon: PlayCircle,
      title: 'Learning Centre Videos & Automatic 10-Question Quizzes',
      body: 'Browse 15 verified educational YouTube videos across 15 ethics categories. When a video finishes playing, a tailored 10-question Video Knowledge Challenge opens automatically (or click "I have finished watching" if your browser restricts completion events).',
    },
    {
      icon: BookMarked,
      title: 'Structured Learning Paths & Case Studies',
      body: 'Follow the Personal, Professional, and Advanced Learning Paths module by module, analyse 6 structured real-world Case Studies, and complete the rotating Daily Ethics Challenge.',
    },
    {
      icon: Theater,
      title: 'Deliberating in the Decision Theatre & Quizzes',
      body: 'Weigh realistic dilemmas across short-term and long-term consequences in the Decision Theatre, and challenge yourself across 4 Ethics Challenge quiz tracks with instant answer explanations.',
    },
    {
      icon: Search,
      title: 'Global Search, Bookmarks & Private Journal',
      body: 'Press Ctrl+K (or Cmd+K) or click Search in the header to find any topic instantly. Save bookmarks across lessons and write private notes in your Reflection Journal—stored strictly on your own device.',
    },
    {
      icon: Award,
      title: 'Dashboard, Badges & PDF Certificate',
      body: 'Visit Progress to track active learning time, average quiz scores, completed videos, and 8 achievement badges, and generate a downloadable PDF Certificate of Completion.',
    },
    {
      icon: Sliders,
      title: 'Background Music Studio & Accessibility',
      body: 'In Settings, switch Light/Dark themes, toggle High Contrast or Large Text, and explore 14 royalty-free instrumental tracks across 7 categories with playlists, volume, shuffle, and continuous playback across pages.',
    },
    {
      icon: Shield,
      title: 'Privacy & Data Management',
      body: 'Everything is stored privately in browser localStorage. Under Settings → Privacy & Data, inspect your saved progress, export a JSON backup, or clear bookmarks, journal entries, or learning progress anytime.',
    },
  ];

  const modalCopy =
    pendingAction === 'reset-progress'
      ? {
          title: 'Reset All Learning Progress?',
          description:
            'This clears explored values, studied professional standards, Decision Theatre choices, quiz scores, completed videos, video quiz records, path modules, and active learning time on this device. Bookmarks, journal entries, theme, and audio settings stay intact.',
          confirmLabel: 'Confirm Reset',
        }
      : pendingAction === 'clear-bookmarks'
      ? {
          title: 'Delete All Saved Bookmarks?',
          description:
            'This permanently removes all bookmarked videos, values, standards, case studies, and scenarios saved in this browser.',
          confirmLabel: 'Delete Bookmarks',
        }
      : {
          title: 'Delete All Reflection Journal Entries?',
          description:
            'This permanently erases all private reflection journal entries stored in this browser. Consider exporting your data first if you want a backup.',
          confirmLabel: 'Delete Journal',
        };

  return (
    <div className="pb-16">
      {/* Header */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <p className="text-xs sm:text-sm font-medium text-[#2563EB] dark:text-[#EAB308]">
            Settings, Music Studio, Privacy &amp; Visitor Guide
          </p>
          <h1 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B162C] dark:text-white">
            Preferences &amp; Visitor Centre
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Personalize your theme, reading accessibility, and multi-category Background Music
            Studio—or manage your local privacy data, view the How to Use guide, and inspect
            verified official ethics resources.
          </p>

          {/* Settings Sub-Navigation Tabs */}
          <div
            className="mt-8 inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            role="tablist"
            aria-label="Settings Sections"
          >
            {(
              [
                { id: 'preferences', label: 'Theme, Music & Accessibility' },
                { id: 'privacy', label: 'Privacy & Data' },
                { id: 'guide', label: 'How to Use' },
                { id: 'resources', label: 'Official Resources' },
                { id: 'about', label: 'About & Credits' },
              ] as { id: SettingsTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-[#1B2B4B] text-[#0B162C] dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#0B162C] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {statusBanner && (
          <div className="mb-6 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-sm font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{statusBanner}</span>
          </div>
        )}

        {/* TAB 1: THEME, ACCESSIBILITY & BACKGROUND MUSIC STUDIO */}
        {activeTab === 'preferences' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Theme Settings */}
              <section className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5">
                    {theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-[#EAB308]" aria-hidden="true" />
                    ) : (
                      <Sun className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />
                    )}
                    <h2 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                      Theme Settings
                    </h2>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Choose between a crisp bright gallery theme and a calm deep-navy dark theme.
                    Your selection is saved locally and applied immediately on every visit.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setTheme('light')}
                      aria-pressed={theme === 'light'}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        theme === 'light'
                          ? 'border-[#2563EB] bg-[#EFF6FF]/70 ring-1 ring-[#2563EB]'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Sun className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />
                        {theme === 'light' && (
                          <span className="text-xs font-semibold text-[#2563EB]">Active</span>
                        )}
                      </div>
                      <p className="mt-3 font-semibold text-sm text-[#0B162C] dark:text-white">
                        Light / Bright Theme
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Soft alabaster canvas with crisp navy typography.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTheme('dark')}
                      aria-pressed={theme === 'dark'}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        theme === 'dark'
                          ? 'border-[#EAB308] bg-[#16233E] ring-1 ring-[#EAB308]'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Moon className="w-5 h-5 text-[#EAB308]" aria-hidden="true" />
                        {theme === 'dark' && (
                          <span className="text-xs font-semibold text-[#EAB308]">Active</span>
                        )}
                      </div>
                      <p className="mt-3 font-semibold text-sm text-[#0B162C] dark:text-white">
                        Dark Theme
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Deep nocturnal navy canvas with warm gold highlights.
                      </p>
                    </button>
                  </div>
                </div>
              </section>

              {/* Accessibility & Learning Reminders */}
              <section className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5">
                  <Accessibility className="w-5 h-5 text-[#2563EB] dark:text-[#EAB308]" aria-hidden="true" />
                  <h2 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                    Accessibility &amp; Study Preferences
                  </h2>
                </div>

                {/* Text Size Control */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                      Reading Text Size
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Enlarge base typography across all pages for easier reading.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
                    <button
                      type="button"
                      onClick={() => setTextSize('normal')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer ${
                        textSize === 'normal'
                          ? 'bg-white dark:bg-[#1B2B4B] text-[#0B162C] dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setTextSize('large')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer ${
                        textSize === 'large'
                          ? 'bg-white dark:bg-[#1B2B4B] text-[#0B162C] dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Large
                    </button>
                  </div>
                </div>

                {/* High Contrast Toggle */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-2.5">
                    <Contrast className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                        High Contrast Mode
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Strengthens text ink and container borders for clearer visual legibility.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={highContrast}
                    onClick={() => setHighContrast(!highContrast)}
                    className={`relative w-12 h-7 rounded-full transition-colors shrink-0 cursor-pointer ${
                      highContrast
                        ? 'bg-[#2563EB] dark:bg-[#EAB308]'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                    aria-label="Toggle high contrast mode"
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white dark:bg-[#070D1A] shadow transition-transform ${
                        highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Reduced Motion Toggle */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                      Reduce Motion &amp; Animations
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Minimizes page transitions and smooth-scroll movement.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={reducedMotion}
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className={`relative w-12 h-7 rounded-full transition-colors shrink-0 cursor-pointer ${
                      reducedMotion
                        ? 'bg-[#2563EB] dark:bg-[#EAB308]'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                    aria-label="Toggle reduced motion"
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white dark:bg-[#070D1A] shadow transition-transform ${
                        reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* In-App Learning Reminders Toggle */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                        In-App Daily Learning Reminders
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Displays a gentle in-app banner for today’s Daily Ethics Challenge (never
                        requests intrusive browser notifications).
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={learningReminders}
                    onClick={() => setLearningReminders(!learningReminders)}
                    className={`relative w-12 h-7 rounded-full transition-colors shrink-0 cursor-pointer ${
                      learningReminders
                        ? 'bg-[#2563EB] dark:bg-[#EAB308]'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                    aria-label="Toggle in-app daily learning reminders"
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white dark:bg-[#070D1A] shadow transition-transform ${
                        learningReminders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </section>
            </div>

            {/* Full-Width Dedicated Background Music Settings & Music Studio */}
            <MusicStudioPanel />
          </div>
        )}

        {/* TAB 2: PRIVACY & DATA MANAGEMENT */}
        {activeTab === 'privacy' && (
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#2563EB] dark:text-[#EAB308]" aria-hidden="true" />
                <h2 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                  Privacy &amp; Local Data Management
                </h2>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                Ethics in Action respects your privacy. All learning progress, quiz records,
                bookmarks, and private Reflection Journal entries are stored exclusively in this
                browser’s <span className="font-mono text-xs">localStorage</span>. Nothing is
                uploaded to an external account or shared publicly.
              </p>

              {/* Saved Data Summary Grid */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Overall Progress</p>
                  <p className="mt-1 font-mono tabular-nums text-xl font-bold text-[#0B162C] dark:text-white">
                    {overallCompletionPercent}%
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Videos Completed</p>
                  <p className="mt-1 font-mono tabular-nums text-xl font-bold text-[#0B162C] dark:text-white">
                    {progress.completedVideoIds.length}/{EDUCATIONAL_VIDEOS.length}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Path Modules</p>
                  <p className="mt-1 font-mono tabular-nums text-xl font-bold text-[#0B162C] dark:text-white">
                    {progress.completedPathModuleIds.length}/{totalPathModules}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Saved Bookmarks</p>
                  <p className="mt-1 font-mono tabular-nums text-xl font-bold text-[#0B162C] dark:text-white">
                    {bookmarks.length}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Journal Entries</p>
                  <p className="mt-1 font-mono tabular-nums text-xl font-bold text-[#0B162C] dark:text-white">
                    {journalEntries.length}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportData}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Export Learning Data (.json)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowRawProgress((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showRawProgress ? (
                    <>
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                      <span>Hide Saved Progress JSON</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      <span>View Saved Progress</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('progress')}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Open Learning Dashboard
                </button>
              </div>

              {showRawProgress && (
                <div className="mt-6">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Active study time tracked: {formatDuration(progress.totalLearningSeconds)} ·{' '}
                    {completedPathsCount} full learning paths completed
                  </p>
                  <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-72 border border-slate-800">
                    {exportLearningData()}
                  </pre>
                </div>
              )}
            </section>

            {/* Confirmation-Gated Clear / Reset Actions */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8">
              <h3 className="font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                Manage or Delete Stored Data
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                Every destructive action below requires confirmation so you never lose work
                accidentally.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0B162C] dark:text-white">
                      <Bookmark className="w-4 h-4 text-[#2563EB] dark:text-[#EAB308]" aria-hidden="true" />
                      <span>Delete Saved Bookmarks</span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Remove all {bookmarks.length} bookmarked lessons, values, standards, and case
                      studies.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={bookmarks.length === 0}
                    onClick={() => setPendingAction('clear-bookmarks')}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Clear Bookmarks</span>
                  </button>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0B162C] dark:text-white">
                      <BookOpen className="w-4 h-4 text-[#2563EB] dark:text-[#EAB308]" aria-hidden="true" />
                      <span>Delete Journal Entries</span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Permanently delete all {journalEntries.length} private reflection notes saved
                      on this browser.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={journalEntries.length === 0}
                    onClick={() => setPendingAction('clear-journal')}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Clear Journal</span>
                  </button>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0B162C] dark:text-white">
                      <RotateCcw className="w-4 h-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                      <span>Reset Learning Progress</span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Reset explored topics, completed videos, quiz scores, path progress, and
                      badges to 0%.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPendingAction('reset-progress')}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reset Progress</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 3: HOW TO USE GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-medium text-[#2563EB] dark:text-[#EAB308]">
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                <span>Visitor Walkthrough · Complete Guide</span>
              </div>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#0B162C] dark:text-white">
                How to Use Ethics in Action
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Follow these clear steps to get the most out of every gallery, verified video
                lesson, 10-question knowledge challenge, learning path, and personalization tool.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {howToUseSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#172645] text-[#2563EB] dark:text-[#EAB308] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        Step {String(idx + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-0.5 font-editorial text-lg font-semibold text-[#0B162C] dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: OFFICIAL ETHICS RESOURCES */}
        {activeTab === 'resources' && <OfficialResourcesSection compact />}

        {/* TAB 5: ABOUT THIS WEBSITE, INFORMATION & CREDITS */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5">
                <Info className="w-5 h-5 text-[#2563EB] dark:text-[#EAB308]" aria-hidden="true" />
                <h2 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                  About This Website
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-[#0B162C] dark:text-white">
                  Ethics in Action — The Ethics Experience Centre
                </strong>{' '}
                is an interactive educational platform designed for students, educators, and
                professionals to examine personal values, academic honesty, workplace standards,
                real-world case studies, and structured ethical reasoning.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Alongside interactive exhibition galleries, the platform integrates verified
                educational YouTube lectures paired with 10-question Video Knowledge Challenges,
                three guided Learning Paths, a private local Reflection Journal, and downloadable
                PDF learning certificates.
              </p>

              <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                  Credits &amp; Acknowledgements
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <li>
                    · Educational curriculum grounded in universal personal ethics, academic
                    integrity standards, and professional codes of conduct.
                  </li>
                  <li>
                    · Background Music Studio features 14 original, locally bundled royalty-free
                    stereo MP3 instrumental compositions across 7 mood categories.
                  </li>
                  <li>
                    · Embedded educational videos credit their original public YouTube creators
                    (including CrashCourse, McCombs School of Business Ethics Unwrapped, Harvard
                    Business School Online, TED-Ed, TEDx, HumberEDU, OpenTuition, and Ethic Corner).
                  </li>
                  <li>
                    · Official Indian statutory and grievance portals reference verified public
                    domains (CVC, UGC, AICTE, CPGRAMS, NHRC).
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 space-y-4">
              <h3 className="font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                Platform Information
              </h3>
              <dl className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-slate-500 dark:text-slate-400">Title</dt>
                  <dd className="font-medium text-[#0B162C] dark:text-white text-right">
                    Ethics in Action
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-slate-500 dark:text-slate-400">Subtitle</dt>
                  <dd className="font-medium text-[#0B162C] dark:text-white text-right">
                    The Ethics Experience Centre
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-slate-500 dark:text-slate-400">Tagline</dt>
                  <dd className="font-medium text-[#0B162C] dark:text-white text-right">
                    Every Choice Defines Who We Are.
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-slate-500 dark:text-slate-400">Data Storage</dt>
                  <dd className="font-medium text-[#0B162C] dark:text-white text-right">
                    Browser localStorage (Private)
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-slate-500 dark:text-slate-400">Music Library</dt>
                  <dd className="font-medium text-[#0B162C] dark:text-white text-right">
                    14 Local MP3 Tracks · 7 Categories
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-slate-500 dark:text-slate-400">Video Curriculum</dt>
                  <dd className="font-medium text-[#0B162C] dark:text-white text-right">
                    15 Verified Lessons · 150 Quiz Questions
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={pendingAction !== null}
        title={modalCopy.title}
        description={modalCopy.description}
        confirmLabel={modalCopy.confirmLabel}
        cancelLabel="Cancel"
        onConfirm={handleConfirmDestructive}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
};
