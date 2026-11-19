import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  BookmarkItem,
  BookmarkType,
  JournalEntry,
  LearningTabId,
  PageId,
  QuizCategoryId,
  TextSizeMode,
  ThemeMode,
  UserProgress,
} from '../types/ethics';
import { PERSONAL_VALUES } from '../data/personalEthics';
import { PROFESSIONAL_STANDARDS } from '../data/professionalEthics';
import { COMPARISON_CATEGORIES } from '../data/comparisonData';
import { DECISION_SCENARIOS } from '../data/decisionScenarios';
import { QUIZ_CATEGORIES } from '../data/quizData';
import { EDUCATIONAL_VIDEOS } from '../data/youtubeVideos';
import { LEARNING_PATHS } from '../data/learningPaths';

const PROGRESS_STORAGE_KEY = 'ethics_experience_progress_v1';
const BOOKMARKS_STORAGE_KEY = 'ethics_experience_bookmarks_v2';
const JOURNAL_STORAGE_KEY = 'ethics_experience_journal_v2';
const THEME_STORAGE_KEY = 'ethics_theme';
const TEXT_SIZE_STORAGE_KEY = 'ethics_text_size';
const REDUCED_MOTION_STORAGE_KEY = 'ethics_reduced_motion';
const HIGH_CONTRAST_STORAGE_KEY = 'ethics_high_contrast';
const REMINDERS_STORAGE_KEY = 'ethics_learning_reminders';

const DEFAULT_PROGRESS: UserProgress = {
  exploredPersonalIds: [],
  personalReflections: {},
  exploredProfessionalIds: [],
  exploredComparisonIds: [],
  completedScenarios: {},
  quizRecords: {},
  completedVideoIds: [],
  videoQuizRecords: {},
  completedPathModuleIds: [],
  completedDailyChallengeIds: [],
  totalLearningSeconds: 0,
};

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progressText: string;
}

interface EthicsContextValue {
  activePage: PageId;
  learningTab: LearningTabId;
  activeVideoId: string | null;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  setLearningTab: (tab: LearningTabId) => void;
  setActiveVideoId: (videoId: string | null) => void;
  navigate: (page: PageId, scrollTargetId?: string, nextLearningTab?: LearningTabId) => void;
  openVideoInCentre: (videoId: string) => void;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  textSize: TextSizeMode;
  setTextSize: (mode: TextSizeMode) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  learningReminders: boolean;
  setLearningReminders: (enabled: boolean) => void;
  progress: UserProgress;
  bookmarks: BookmarkItem[];
  journalEntries: JournalEntry[];
  markPersonalExplored: (id: string, reflection?: string) => void;
  markProfessionalExplored: (id: string) => void;
  markComparisonExplored: (id: string) => void;
  recordScenarioChoice: (scenarioId: string, optionId: string) => void;
  recordQuizResult: (categoryId: QuizCategoryId, score: number, totalQuestions: number) => void;
  markVideoCompleted: (videoId: string) => void;
  recordVideoQuizResult: (videoId: string, score: number, totalQuestions: number) => void;
  togglePathModuleCompleted: (moduleId: string) => void;
  markDailyChallengeCompleted: (challengeId: string) => void;
  toggleBookmark: (item: Omit<BookmarkItem, 'savedAt'>) => void;
  isBookmarked: (type: BookmarkType, targetId: string) => boolean;
  removeBookmark: (bookmarkId: string) => void;
  clearAllBookmarks: () => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJournalEntry: (id: string, entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteJournalEntry: (id: string) => void;
  clearAllJournalEntries: () => void;
  resetAllProgress: () => void;
  exportLearningData: () => string;
  overallCompletionPercent: number;
  averageQuizPercent: number | null;
  completedPathsCount: number;
  achievements: AchievementBadge[];
}

const EthicsContext = createContext<EthicsContextValue | null>(null);

function loadStoredProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return {
      exploredPersonalIds: Array.isArray(parsed.exploredPersonalIds) ? parsed.exploredPersonalIds : [],
      personalReflections:
        parsed.personalReflections && typeof parsed.personalReflections === 'object'
          ? parsed.personalReflections
          : {},
      exploredProfessionalIds: Array.isArray(parsed.exploredProfessionalIds)
        ? parsed.exploredProfessionalIds
        : [],
      exploredComparisonIds: Array.isArray(parsed.exploredComparisonIds)
        ? parsed.exploredComparisonIds
        : [],
      completedScenarios:
        parsed.completedScenarios && typeof parsed.completedScenarios === 'object'
          ? parsed.completedScenarios
          : {},
      quizRecords:
        parsed.quizRecords && typeof parsed.quizRecords === 'object' ? parsed.quizRecords : {},
      completedVideoIds: Array.isArray(parsed.completedVideoIds) ? parsed.completedVideoIds : [],
      videoQuizRecords:
        parsed.videoQuizRecords && typeof parsed.videoQuizRecords === 'object'
          ? parsed.videoQuizRecords
          : {},
      completedPathModuleIds: Array.isArray(parsed.completedPathModuleIds)
        ? parsed.completedPathModuleIds
        : [],
      completedDailyChallengeIds: Array.isArray(parsed.completedDailyChallengeIds)
        ? parsed.completedDailyChallengeIds
        : [],
      totalLearningSeconds:
        typeof parsed.totalLearningSeconds === 'number' && parsed.totalLearningSeconds >= 0
          ? parsed.totalLearningSeconds
          : 0,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function loadStoredBookmarks(): BookmarkItem[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadStoredJournal(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadStoredTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // ignore
  }
  return 'light';
}

function loadStoredTextSize(): TextSizeMode {
  try {
    const saved = localStorage.getItem(TEXT_SIZE_STORAGE_KEY);
    if (saved === 'large' || saved === 'normal') return saved;
  } catch {
    // ignore
  }
  return 'normal';
}

function loadStoredBool(key: string, defaultVal: boolean): boolean {
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'true') return true;
    if (saved === 'false') return false;
  } catch {
    // ignore
  }
  return defaultVal;
}

export const EthicsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [learningTab, setLearningTab] = useState<LearningTabId>('videos');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const [theme, setThemeState] = useState<ThemeMode>(loadStoredTheme);
  const [highContrast, setHighContrastState] = useState<boolean>(() =>
    loadStoredBool(HIGH_CONTRAST_STORAGE_KEY, false)
  );
  const [textSize, setTextSizeState] = useState<TextSizeMode>(loadStoredTextSize);
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(REDUCED_MOTION_STORAGE_KEY);
      if (saved === 'true') return true;
      if (saved === 'false') return false;
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [learningReminders, setLearningRemindersState] = useState<boolean>(() =>
    loadStoredBool(REMINDERS_STORAGE_KEY, true)
  );

  const [progress, setProgress] = useState<UserProgress>(loadStoredProgress);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(loadStoredBookmarks);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(loadStoredJournal);

  // Sync theme, text size, reduced motion, high contrast to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('high-contrast', highContrast);
    try {
      localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(highContrast));
    } catch {
      // ignore
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('text-size-large', textSize === 'large');
    try {
      localStorage.setItem(TEXT_SIZE_STORAGE_KEY, textSize);
    } catch {
      // ignore
    }
  }, [textSize]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('reduce-motion', reducedMotion);
    try {
      localStorage.setItem(REDUCED_MOTION_STORAGE_KEY, String(reducedMotion));
    } catch {
      // ignore
    }
  }, [reducedMotion]);

  useEffect(() => {
    try {
      localStorage.setItem(REMINDERS_STORAGE_KEY, String(learningReminders));
    } catch {
      // ignore
    }
  }, [learningReminders]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journalEntries));
    } catch {
      // ignore
    }
  }, [journalEntries]);

  // Reliable active learning time tracker (ticks every 15s only while tab is visible)
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setProgress((prev) => ({
          ...prev,
          totalLearningSeconds: (prev.totalLearningSeconds || 0) + 15,
        }));
      }
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for Global Search Centre
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigate = useCallback(
    (page: PageId, scrollTargetId?: string, nextLearningTab?: LearningTabId) => {
      setActivePage(page);
      if (page === 'learning' && nextLearningTab) {
        setLearningTab(nextLearningTab);
      }
      if (scrollTargetId) {
        setTimeout(() => {
          const el = document.getElementById(scrollTargetId);
          if (el) {
            el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    },
    [reducedMotion]
  );

  const openVideoInCentre = useCallback(
    (videoId: string) => {
      setActiveVideoId(videoId);
      setLearningTab('videos');
      setActivePage('learning');
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    },
    [reducedMotion]
  );

  const setTheme = useCallback((mode: ThemeMode) => setThemeState(mode), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );
  const setHighContrast = useCallback((enabled: boolean) => setHighContrastState(enabled), []);
  const setTextSize = useCallback((mode: TextSizeMode) => setTextSizeState(mode), []);
  const setReducedMotion = useCallback((enabled: boolean) => setReducedMotionState(enabled), []);
  const setLearningReminders = useCallback(
    (enabled: boolean) => setLearningRemindersState(enabled),
    []
  );

  const markPersonalExplored = useCallback((id: string, reflection?: string) => {
    setProgress((prev) => {
      const exploredPersonalIds = prev.exploredPersonalIds.includes(id)
        ? prev.exploredPersonalIds
        : [...prev.exploredPersonalIds, id];
      const personalReflections =
        reflection !== undefined
          ? { ...prev.personalReflections, [id]: reflection }
          : prev.personalReflections;
      return { ...prev, exploredPersonalIds, personalReflections };
    });
  }, []);

  const markProfessionalExplored = useCallback((id: string) => {
    setProgress((prev) => {
      if (prev.exploredProfessionalIds.includes(id)) return prev;
      return {
        ...prev,
        exploredProfessionalIds: [...prev.exploredProfessionalIds, id],
      };
    });
  }, []);

  const markComparisonExplored = useCallback((id: string) => {
    setProgress((prev) => {
      if (prev.exploredComparisonIds.includes(id)) return prev;
      return {
        ...prev,
        exploredComparisonIds: [...prev.exploredComparisonIds, id],
      };
    });
  }, []);

  const recordScenarioChoice = useCallback((scenarioId: string, optionId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedScenarios: {
        ...prev.completedScenarios,
        [scenarioId]: optionId,
      },
    }));
  }, []);

  const recordQuizResult = useCallback(
    (categoryId: QuizCategoryId, score: number, totalQuestions: number) => {
      setProgress((prev) => {
        const existing = prev.quizRecords[categoryId];
        return {
          ...prev,
          quizRecords: {
            ...prev.quizRecords,
            [categoryId]: {
              categoryId,
              bestScore: existing ? Math.max(existing.bestScore, score) : score,
              totalQuestions,
              attempts: (existing?.attempts ?? 0) + 1,
              lastCompletedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    []
  );

  const markVideoCompleted = useCallback((videoId: string) => {
    setProgress((prev) => {
      if (prev.completedVideoIds.includes(videoId)) return prev;
      return {
        ...prev,
        completedVideoIds: [...prev.completedVideoIds, videoId],
      };
    });
  }, []);

  const recordVideoQuizResult = useCallback(
    (videoId: string, score: number, totalQuestions: number) => {
      setProgress((prev) => {
        const existing = prev.videoQuizRecords[videoId];
        const completedVideoIds = prev.completedVideoIds.includes(videoId)
          ? prev.completedVideoIds
          : [...prev.completedVideoIds, videoId];
        return {
          ...prev,
          completedVideoIds,
          videoQuizRecords: {
            ...prev.videoQuizRecords,
            [videoId]: {
              videoId,
              bestScore: existing ? Math.max(existing.bestScore, score) : score,
              totalQuestions,
              attempts: (existing?.attempts ?? 0) + 1,
              lastCompletedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    []
  );

  const togglePathModuleCompleted = useCallback((moduleId: string) => {
    setProgress((prev) => {
      const exists = prev.completedPathModuleIds.includes(moduleId);
      return {
        ...prev,
        completedPathModuleIds: exists
          ? prev.completedPathModuleIds.filter((id) => id !== moduleId)
          : [...prev.completedPathModuleIds, moduleId],
      };
    });
  }, []);

  const markDailyChallengeCompleted = useCallback((challengeId: string) => {
    setProgress((prev) => {
      if (prev.completedDailyChallengeIds.includes(challengeId)) return prev;
      return {
        ...prev,
        completedDailyChallengeIds: [...prev.completedDailyChallengeIds, challengeId],
      };
    });
  }, []);

  // Bookmarks
  const toggleBookmark = useCallback((item: Omit<BookmarkItem, 'savedAt'>) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) {
        return prev.filter((b) => b.id !== item.id);
      }
      return [{ ...item, savedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const isBookmarked = useCallback(
    (type: BookmarkType, targetId: string) =>
      bookmarks.some((b) => b.type === type && b.targetId === targetId),
    [bookmarks]
  );

  const removeBookmark = useCallback((bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
  }, []);

  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
    try {
      localStorage.removeItem(BOOKMARKS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Private Reflection Journal
  const addJournalEntry = useCallback(
    (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      const newEntry: JournalEntry = {
        ...entry,
        id: `journal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: now,
        updatedAt: now,
      };
      setJournalEntries((prev) => [newEntry, ...prev]);
    },
    []
  );

  const updateJournalEntry = useCallback(
    (id: string, entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      setJournalEntries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...entry, updatedAt: now } : item))
      );
    },
    []
  );

  const deleteJournalEntry = useCallback((id: string) => {
    setJournalEntries((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearAllJournalEntries = useCallback(() => {
    setJournalEntries([]);
    try {
      localStorage.removeItem(JOURNAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const resetAllProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const exportLearningData = useCallback(() => {
    const payload = {
      exportedAt: new Date().toISOString(),
      platform: 'Ethics in Action — The Ethics Experience Centre',
      storageNote: 'Exported from local browser storage (localStorage).',
      preferences: {
        theme,
        highContrast,
        textSize,
        reducedMotion,
        learningReminders,
      },
      progress,
      bookmarks,
      journalEntries,
    };
    return JSON.stringify(payload, null, 2);
  }, [theme, highContrast, textSize, reducedMotion, learningReminders, progress, bookmarks, journalEntries]);

  const totalPathModules = useMemo(
    () => LEARNING_PATHS.reduce((sum, p) => sum + p.modules.length, 0),
    []
  );

  const completedPathsCount = useMemo(
    () =>
      LEARNING_PATHS.filter((path) =>
        path.modules.every((m) => progress.completedPathModuleIds.includes(m.id))
      ).length,
    [progress.completedPathModuleIds]
  );

  const averageQuizPercent = useMemo(() => {
    const scores: number[] = [];
    Object.values(progress.quizRecords).forEach((rec) => {
      if (rec && rec.totalQuestions > 0) {
        scores.push((rec.bestScore / rec.totalQuestions) * 100);
      }
    });
    Object.values(progress.videoQuizRecords).forEach((rec) => {
      if (rec && rec.totalQuestions > 0) {
        scores.push((rec.bestScore / rec.totalQuestions) * 100);
      }
    });
    if (scores.length === 0) return null;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [progress.quizRecords, progress.videoQuizRecords]);

  const overallCompletionPercent = useMemo(() => {
    const totalUnits =
      PERSONAL_VALUES.length +
      PROFESSIONAL_STANDARDS.length +
      COMPARISON_CATEGORIES.length +
      DECISION_SCENARIOS.length +
      QUIZ_CATEGORIES.length +
      EDUCATIONAL_VIDEOS.length +
      totalPathModules;

    const completedUnits =
      progress.exploredPersonalIds.length +
      progress.exploredProfessionalIds.length +
      progress.exploredComparisonIds.length +
      Object.keys(progress.completedScenarios).length +
      Object.keys(progress.quizRecords).length +
      progress.completedVideoIds.length +
      progress.completedPathModuleIds.length;

    return Math.min(100, Math.round((completedUnits / totalUnits) * 100));
  }, [progress, totalPathModules]);

  const achievements = useMemo<AchievementBadge[]>(() => {
    const personalCount = progress.exploredPersonalIds.length;
    const professionalCount = progress.exploredProfessionalIds.length;
    const comparisonCount = progress.exploredComparisonIds.length;
    const scenarioCount = Object.keys(progress.completedScenarios).length;
    const videoCount = progress.completedVideoIds.length;
    const totalQuizzesCompleted =
      Object.keys(progress.quizRecords).length + Object.keys(progress.videoQuizRecords).length;
    const pathModulesCount = progress.completedPathModuleIds.length;

    const completedModulesTotal =
      personalCount +
      professionalCount +
      comparisonCount +
      scenarioCount +
      videoCount +
      pathModulesCount;

    return [
      {
        id: 'first-video',
        title: 'First Video Completed',
        description: 'Finish watching your first educational video in the Ethics Learning Centre.',
        unlocked: videoCount >= 1,
        progressText: videoCount >= 1 ? `${videoCount} video completed` : '0 / 1 video',
      },
      {
        id: 'first-quiz',
        title: 'First Quiz Completed',
        description: 'Complete any Ethics Challenge quiz or 10-question Video Knowledge Challenge.',
        unlocked: totalQuizzesCompleted >= 1,
        progressText:
          totalQuizzesCompleted >= 1
            ? `${totalQuizzesCompleted} quiz completed`
            : '0 / 1 quiz',
      },
      {
        id: 'personal-explorer',
        title: 'Personal Ethics Explorer',
        description: 'Explore all 7 core pillars in the Personal Ethics gallery.',
        unlocked: personalCount >= PERSONAL_VALUES.length,
        progressText: `${personalCount} / ${PERSONAL_VALUES.length} values`,
      },
      {
        id: 'professional-explorer',
        title: 'Professional Ethics Explorer',
        description: 'Study all 8 standards in the Professional Ethics gallery.',
        unlocked: professionalCount >= PROFESSIONAL_STANDARDS.length,
        progressText: `${professionalCount} / ${PROFESSIONAL_STANDARDS.length} standards`,
      },
      {
        id: 'comparison-master',
        title: 'Comparison Master',
        description: 'Examine all 8 dimensions in the Ethics Face-Off Comparison.',
        unlocked: comparisonCount >= COMPARISON_CATEGORIES.length,
        progressText: `${comparisonCount} / ${COMPARISON_CATEGORIES.length} dimensions`,
      },
      {
        id: 'five-modules',
        title: 'Five Learning Modules Completed',
        description: 'Complete at least 5 combined values, videos, scenarios, or learning path modules.',
        unlocked: completedModulesTotal >= 5,
        progressText: `${Math.min(completedModulesTotal, 5)} / 5 modules`,
      },
      {
        id: 'theatre-thinker',
        title: 'Decision Theatre Thinker',
        description: 'Deliberate through at least 3 dilemmas in the Decision Theatre.',
        unlocked: scenarioCount >= 3,
        progressText: `${Math.min(scenarioCount, 3)} / 3 scenarios`,
      },
      {
        id: 'learning-champion',
        title: 'Learning Champion',
        description: 'Reach 50% overall progress or complete at least one full Learning Path.',
        unlocked: overallCompletionPercent >= 50 || completedPathsCount >= 1,
        progressText: `${overallCompletionPercent}% overall · ${completedPathsCount} paths`,
      },
    ];
  }, [progress, overallCompletionPercent, completedPathsCount]);

  const value = useMemo<EthicsContextValue>(
    () => ({
      activePage,
      learningTab,
      activeVideoId,
      searchOpen,
      setSearchOpen,
      setLearningTab,
      setActiveVideoId,
      navigate,
      openVideoInCentre,
      theme,
      setTheme,
      toggleTheme,
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
      markPersonalExplored,
      markProfessionalExplored,
      markComparisonExplored,
      recordScenarioChoice,
      recordQuizResult,
      markVideoCompleted,
      recordVideoQuizResult,
      togglePathModuleCompleted,
      markDailyChallengeCompleted,
      toggleBookmark,
      isBookmarked,
      removeBookmark,
      clearAllBookmarks,
      addJournalEntry,
      updateJournalEntry,
      deleteJournalEntry,
      clearAllJournalEntries,
      resetAllProgress,
      exportLearningData,
      overallCompletionPercent,
      averageQuizPercent,
      completedPathsCount,
      achievements,
    }),
    [
      activePage,
      learningTab,
      activeVideoId,
      searchOpen,
      navigate,
      openVideoInCentre,
      theme,
      setTheme,
      toggleTheme,
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
      markPersonalExplored,
      markProfessionalExplored,
      markComparisonExplored,
      recordScenarioChoice,
      recordQuizResult,
      markVideoCompleted,
      recordVideoQuizResult,
      togglePathModuleCompleted,
      markDailyChallengeCompleted,
      toggleBookmark,
      isBookmarked,
      removeBookmark,
      clearAllBookmarks,
      addJournalEntry,
      updateJournalEntry,
      deleteJournalEntry,
      clearAllJournalEntries,
      resetAllProgress,
      exportLearningData,
      overallCompletionPercent,
      averageQuizPercent,
      completedPathsCount,
      achievements,
    ]
  );

  return <EthicsContext.Provider value={value}>{children}</EthicsContext.Provider>;
};

export function useEthics(): EthicsContextValue {
  const ctx = useContext(EthicsContext);
  if (!ctx) {
    throw new Error('useEthics must be used within EthicsProvider');
  }
  return ctx;
}
