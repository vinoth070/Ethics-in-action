import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { EthicsProvider, useEthics } from './context/EthicsContext';
import { AmbientAudioProvider } from './context/AudioContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HomePage } from './pages/HomePage';
import { PersonalEthicsPage } from './pages/PersonalEthicsPage';
import { ProfessionalEthicsPage } from './pages/ProfessionalEthicsPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { LearningCentrePage } from './pages/LearningCentrePage';
import { DecisionTheatrePage } from './pages/DecisionTheatrePage';
import { QuizPage } from './pages/QuizPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { getTodaysDailyChallenge } from './data/dailyChallenges';

const ExperienceShell: React.FC = () => {
  const { activePage, learningReminders, progress, navigate } = useEthics();
  const [reminderDismissed, setReminderDismissed] = useState(false);

  const todaysChallenge = getTodaysDailyChallenge();
  const dailyDone = progress.completedDailyChallengeIds.includes(todaysChallenge.id);
  const showReminderBar =
    learningReminders && !reminderDismissed && !dailyDone && activePage !== 'learning';

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'personal':
        return <PersonalEthicsPage />;
      case 'professional':
        return <ProfessionalEthicsPage />;
      case 'comparison':
        return <ComparisonPage />;
      case 'learning':
        return <LearningCentrePage />;
      case 'theatre':
        return <DecisionTheatrePage />;
      case 'quiz':
        return <QuizPage />;
      case 'progress':
        return <ProgressPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#0B162C] dark:bg-[#070D1A] dark:text-[#F1F5F9]">
      <Header />
      {showReminderBar && (
        <div className="border-b border-indigo-200/80 dark:border-slate-800 bg-[#EFF6FF] dark:bg-[#0D1A33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-[#EAB308] shrink-0" aria-hidden="true" />
              <p className="text-[#0B162C] dark:text-slate-200 truncate">
                <span className="font-semibold">Daily Ethics Challenge:</span> {todaysChallenge.title}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigate('learning', undefined, 'daily')}
                className="inline-flex items-center gap-1 font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline whitespace-nowrap cursor-pointer"
              >
                <span>Try Today’s Prompt</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setReminderDismissed(true)}
                className="p-1 rounded text-slate-500 hover:text-[#0B162C] dark:text-slate-400 dark:hover:text-white cursor-pointer"
                aria-label="Dismiss daily learning reminder"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <BackToTop />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <EthicsProvider>
      <AmbientAudioProvider>
        <ExperienceShell />
      </AmbientAudioProvider>
    </EthicsProvider>
  );
}
