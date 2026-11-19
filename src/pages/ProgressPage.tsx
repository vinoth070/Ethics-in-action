import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  RotateCcw,
  HardDrive,
  Clock,
  PlayCircle,
  Bookmark,
  GraduationCap,
} from 'lucide-react';
import { useEthics } from '../context/EthicsContext';
import { PERSONAL_VALUES } from '../data/personalEthics';
import { PROFESSIONAL_STANDARDS } from '../data/professionalEthics';
import { COMPARISON_CATEGORIES } from '../data/comparisonData';
import { DECISION_SCENARIOS } from '../data/decisionScenarios';
import { QUIZ_CATEGORIES } from '../data/quizData';
import { EDUCATIONAL_VIDEOS } from '../data/youtubeVideos';
import { LEARNING_PATHS } from '../data/learningPaths';
import { DAILY_CHALLENGES } from '../data/dailyChallenges';
import { ConfirmModal } from '../components/ConfirmModal';
import { CertificateCard } from '../components/CertificateCard';
import { LearningTabId, PageId } from '../types/ethics';

function formatLearningTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return `${hrs}h ${String(rem).padStart(2, '0')}m`;
}

export const ProgressPage: React.FC = () => {
  const {
    progress,
    bookmarks,
    overallCompletionPercent,
    averageQuizPercent,
    completedPathsCount,
    achievements,
    resetAllProgress,
    navigate,
    openVideoInCentre,
  } = useEthics();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const unlockedBadges = achievements.filter((a) => a.unlocked).length;
  const completedScenarioCount = Object.keys(progress.completedScenarios).length;
  const completedMainQuizCount = Object.keys(progress.quizRecords).length;
  const completedVideoQuizCount = Object.keys(progress.videoQuizRecords).length;
  const totalQuizzesCompleted = completedMainQuizCount + completedVideoQuizCount;
  const totalPathModules = LEARNING_PATHS.reduce((sum, p) => sum + p.modules.length, 0);

  const learningTracks: {
    title: string;
    completed: number;
    total: number;
    page: PageId;
    learningTab?: LearningTabId;
    accent: string;
  }[] = [
    {
      title: 'Personal Ethics Values',
      completed: progress.exploredPersonalIds.length,
      total: PERSONAL_VALUES.length,
      page: 'personal',
      accent: 'from-[#2563EB] to-[#6D28D9]',
    },
    {
      title: 'Professional Ethics Standards',
      completed: progress.exploredProfessionalIds.length,
      total: PROFESSIONAL_STANDARDS.length,
      page: 'professional',
      accent: 'from-[#0F2557] to-[#B47B1B]',
    },
    {
      title: 'Ethics Face-Off Dimensions',
      completed: progress.exploredComparisonIds.length,
      total: COMPARISON_CATEGORIES.length,
      page: 'comparison',
      accent: 'from-[#2563EB] to-[#B47B1B]',
    },
    {
      title: 'Educational Video Library',
      completed: progress.completedVideoIds.length,
      total: EDUCATIONAL_VIDEOS.length,
      page: 'learning',
      learningTab: 'videos',
      accent: 'from-[#1D4ED8] to-[#0EA5E9]',
    },
    {
      title: 'Learning Path Modules',
      completed: progress.completedPathModuleIds.length,
      total: totalPathModules,
      page: 'learning',
      learningTab: 'paths',
      accent: 'from-[#4F46E5] to-[#7C3AED]',
    },
    {
      title: 'Decision Theatre Scenarios',
      completed: completedScenarioCount,
      total: DECISION_SCENARIOS.length,
      page: 'theatre',
      accent: 'from-[#1E3A8A] to-[#4F46E5]',
    },
    {
      title: 'Ethics Challenge Quizzes',
      completed: completedMainQuizCount,
      total: QUIZ_CATEGORIES.length,
      page: 'quiz',
      accent: 'from-[#B47B1B] to-[#EAB308]',
    },
    {
      title: 'Daily Ethics Challenges',
      completed: progress.completedDailyChallengeIds.length,
      total: DAILY_CHALLENGES.length,
      page: 'learning',
      learningTab: 'daily',
      accent: 'from-[#0F766E] to-[#10B981]',
    },
  ];

  const handleConfirmReset = () => {
    resetAllProgress();
    setConfirmOpen(false);
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-medium text-[#2563EB] dark:text-[#EAB308]">
                Personalized Learning Dashboard · Achievements &amp; Certificate
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B162C] dark:text-white">
                Your Ethical Learning Journey
              </h1>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Track active study time, completed video lessons, quiz averages, learning paths,
                saved bookmarks, and unlocked badges—and download your completion certificate.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('learning', undefined, 'videos')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" aria-hidden="true" />
                <span>Open Learning Centre</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Reset Progress</span>
              </button>
            </div>
          </div>

          {/* Personalized KPI Metrics Strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FC] dark:bg-[#0F1A2E]">
              <p className="text-xs text-slate-500 dark:text-slate-400">Overall Progress</p>
              <p className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#0B162C] dark:text-white">
                {overallCompletionPercent}%
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FC] dark:bg-[#0F1A2E]">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Active Study Time</span>
              </div>
              <p className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#0B162C] dark:text-white">
                {formatLearningTime(progress.totalLearningSeconds)}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FC] dark:bg-[#0F1A2E]">
              <p className="text-xs text-slate-500 dark:text-slate-400">Videos Completed</p>
              <p className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#2563EB] dark:text-[#60A5FA]">
                {progress.completedVideoIds.length}/{EDUCATIONAL_VIDEOS.length}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FC] dark:bg-[#0F1A2E]">
              <p className="text-xs text-slate-500 dark:text-slate-400">Quizzes · Avg Score</p>
              <p className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#9A670F] dark:text-[#EAB308]">
                {totalQuizzesCompleted}
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1.5">
                  {averageQuizPercent !== null ? `(${averageQuizPercent}%)` : ''}
                </span>
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FC] dark:bg-[#0F1A2E]">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Paths Completed</span>
              </div>
              <p className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#0B162C] dark:text-white">
                {completedPathsCount}/{LEARNING_PATHS.length}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FC] dark:bg-[#0F1A2E]">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Saved Bookmarks</span>
              </div>
              <p className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#0B162C] dark:text-white">
                {bookmarks.length}
              </p>
            </div>
          </div>

          {/* Honest Local Storage Transparency Note */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <HardDrive className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              Privacy-first local storage: Your study time (tracked only while this tab is visible),
              progress, bookmarks, and quiz scores are stored strictly in your browser’s
              localStorage.
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Module Completion Progress Bars */}
        <section aria-labelledby="tracks-heading">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2
              id="tracks-heading"
              className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white"
            >
              Learning Progress by Section
            </h2>
            <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
              {unlockedBadges} / {achievements.length} badges unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {learningTracks.map((track) => {
              const pct = track.total > 0 ? Math.round((track.completed / track.total) * 100) : 0;
              return (
                <div
                  key={track.title}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-5 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#0B162C] dark:text-white font-sans">
                        {track.title}
                      </h3>
                      <span className="font-mono tabular-nums text-xs font-semibold text-[#0B162C] dark:text-slate-100">
                        {track.completed}/{track.total}
                      </span>
                    </div>

                    <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${track.accent} transition-all duration-300`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                      {pct}% complete
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate(track.page, undefined, track.learningTab)}
                      className="inline-flex items-center gap-1 font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline cursor-pointer"
                    >
                      <span>{pct === 100 ? 'Revisit' : 'Continue'}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ethics Challenge & Video Knowledge Challenge Scoreboard */}
        <section aria-labelledby="quiz-scores-heading" className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="quiz-scores-heading"
              className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white"
            >
              Quiz &amp; Video Knowledge Scores
            </h2>
            <button
              type="button"
              onClick={() => navigate('quiz')}
              className="text-sm font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline cursor-pointer"
            >
              Open Ethics Challenge
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUIZ_CATEGORIES.map((cat) => {
              const rec = progress.quizRecords[cat.id];
              const pct = rec ? Math.round((rec.bestScore / rec.totalQuestions) * 100) : null;
              return (
                <div
                  key={cat.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-5"
                >
                  <p className="text-sm font-semibold text-[#0B162C] dark:text-white">{cat.title}</p>
                  {rec && pct !== null ? (
                    <div className="mt-3">
                      <p className="font-mono tabular-nums text-2xl font-bold text-[#2563EB] dark:text-[#EAB308]">
                        {rec.bestScore}/{rec.totalQuestions}{' '}
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          ({pct}%)
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Attempts: <span className="font-mono tabular-nums">{rec.attempts}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Not completed yet</p>
                      <button
                        type="button"
                        onClick={() => navigate('quiz')}
                        className="mt-2 text-xs font-semibold text-[#2563EB] dark:text-[#93C5FD] hover:underline cursor-pointer"
                      >
                        Take this quiz
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Completed Video 10-Question Challenges */}
          {completedVideoQuizCount > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-editorial text-lg font-semibold text-[#0B162C] dark:text-white">
                  Completed Video Knowledge Challenges ({completedVideoQuizCount})
                </h3>
                <button
                  type="button"
                  onClick={() => navigate('learning', undefined, 'videos')}
                  className="text-xs font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline cursor-pointer"
                >
                  Browse All 15 Videos
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.values(progress.videoQuizRecords).map((rec) => {
                  const vid = EDUCATIONAL_VIDEOS.find((v) => v.id === rec.videoId);
                  if (!vid) return null;
                  const pct = Math.round((rec.bestScore / rec.totalQuestions) * 100);
                  return (
                    <button
                      key={rec.videoId}
                      type="button"
                      onClick={() => openVideoInCentre(vid.id)}
                      className="text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] hover:border-[#2563EB] dark:hover:border-[#EAB308] transition-colors cursor-pointer"
                    >
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {vid.category}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#0B162C] dark:text-white line-clamp-1">
                        {vid.title}
                      </p>
                      <p className="mt-2 text-xs font-mono tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">
                        Best Score: {rec.bestScore}/{rec.totalQuestions} ({pct}%) · {rec.attempts}{' '}
                        {rec.attempts === 1 ? 'attempt' : 'attempts'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Achievement Badges */}
        <section aria-labelledby="badges-heading">
          <div className="mb-6">
            <h2
              id="badges-heading"
              className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white"
            >
              Achievement Badges
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Earn recognition as you complete videos, explore values, deliberate through dilemmas,
              and finish learning paths.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-colors ${
                  badge.unlocked
                    ? 'border-[#B47B1B]/60 dark:border-[#EAB308]/60 bg-white dark:bg-[#13203B]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0B1324]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        badge.unlocked
                          ? 'bg-amber-100 dark:bg-amber-900/40 text-[#9A670F] dark:text-[#FACC15]'
                          : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {badge.unlocked ? (
                        <Award className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <Lock className="w-4 h-4" aria-hidden="true" />
                      )}
                    </div>

                    <span
                      className={`text-xs font-semibold flex items-center gap-1 ${
                        badge.unlocked
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {badge.unlocked && <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />}
                      <span>{badge.unlocked ? 'Unlocked' : 'In Progress'}</span>
                    </span>
                  </div>

                  <h3 className="mt-4 font-editorial text-lg font-semibold text-[#0B162C] dark:text-white">
                    {badge.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <p className="pt-3 border-t border-slate-200/70 dark:border-slate-800 text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  {badge.progressText}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PDF Certificate of Completion Generator */}
        <section aria-labelledby="certificate-heading">
          <CertificateCard />
        </section>

        {/* Saved Bookmarks Quick Preview */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#2563EB] dark:text-[#EAB308]">
              <Bookmark className="w-4 h-4" aria-hidden="true" />
              <span>Saved Bookmarks · {bookmarks.length} Items</span>
            </div>
            <h2 className="mt-1.5 font-editorial text-xl sm:text-2xl font-semibold text-[#0B162C] dark:text-white">
              Quick Access to Your Bookmarked Study Material
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {bookmarks.length > 0
                ? 'Revisit saved videos, personal values, professional standards, case studies, and scenarios anytime.'
                : 'Bookmark any video, personal value, professional standard, or case study to build your personal ethics study list.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('learning', undefined, 'bookmarks')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open Saved Bookmarks</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </section>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Reset All Learning Progress?"
        description="This will clear your explored personal values, professional standards, completed videos, video quizzes, learning path modules, completed Decision Theatre scenarios, quiz scores, study time, and badges on this device. Your bookmarks, journal, theme, and audio settings will remain unchanged."
        confirmLabel="Yes, Reset Progress"
        cancelLabel="Keep My Progress"
        onConfirm={handleConfirmReset}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};
