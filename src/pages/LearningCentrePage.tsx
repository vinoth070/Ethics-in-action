import React, { useMemo, useState } from 'react';
import {
  Play,
  Bookmark,
  CheckCircle2,
  Search,
  Video,
  Route,
  FileText,
  Calendar,
  BookMarked,
  PenLine,
  Trash2,
  Edit3,
  ArrowRight,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { useEthics } from '../context/EthicsContext';
import {
  EDUCATIONAL_VIDEOS,
  VIDEO_CATEGORIES,
} from '../data/youtubeVideos';
import { LEARNING_PATHS } from '../data/learningPaths';
import { CASE_STUDIES, CASE_STUDY_CATEGORIES, CaseStudyCategory } from '../data/caseStudies';
import { DAILY_CHALLENGES, getTodaysDailyChallenge } from '../data/dailyChallenges';
import { LearningTabId, VideoCategory } from '../types/ethics';
import { YouTubeLessonPlayer } from '../components/YouTubeLessonPlayer';

function parseDurationToSeconds(d: string): number {
  const parts = d.split(':').map(Number);
  if (parts.length === 2 && !parts.some(Number.isNaN)) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

export const LearningCentrePage: React.FC = () => {
  const {
    learningTab,
    setLearningTab,
    activeVideoId,
    setActiveVideoId,
    progress,
    bookmarks,
    journalEntries,
    toggleBookmark,
    isBookmarked,
    removeBookmark,
    togglePathModuleCompleted,
    markDailyChallengeCompleted,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    navigate,
    openVideoInCentre,
  } = useEthics();

  // Video filters
  const [videoSearch, setVideoSearch] = useState('');
  const [videoCategory, setVideoCategory] = useState<'All' | VideoCategory>('All');
  const [videoSort, setVideoSort] = useState<'curated' | 'shortest' | 'longest' | 'unwatched'>('curated');

  // Learning paths selector
  const [selectedPathId, setSelectedPathId] = useState<string>(LEARNING_PATHS[0].id);

  // Case studies filter & expanded case
  const [caseCategory, setCaseCategory] = useState<'All' | CaseStudyCategory>('All');
  const [expandedCaseId, setExpandedCaseId] = useState<string>(CASE_STUDIES[0].id);

  // Daily challenge state
  const todaysChallenge = useMemo(() => getTodaysDailyChallenge(), []);
  const [selectedDailyId, setSelectedDailyId] = useState<string>(todaysChallenge.id);
  const [chosenDailyOpt, setChosenDailyOpt] = useState<Record<string, string>>({});

  // Journal editor state
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalTopic, setJournalTopic] = useState('Personal Ethics');
  const [journalLearned, setJournalLearned] = useState('');
  const [journalSituation, setJournalSituation] = useState('');
  const [journalResponse, setJournalResponse] = useState('');

  const activeVideo = useMemo(
    () => (activeVideoId ? EDUCATIONAL_VIDEOS.find((v) => v.id === activeVideoId) ?? null : null),
    [activeVideoId]
  );

  const filteredVideos = useMemo(() => {
    const q = videoSearch.trim().toLowerCase();
    let list = EDUCATIONAL_VIDEOS.filter((v) => {
      const catOk = videoCategory === 'All' || v.category === videoCategory;
      const qOk =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q);
      return catOk && qOk;
    });

    if (videoSort === 'shortest') {
      list = [...list].sort(
        (a, b) => parseDurationToSeconds(a.duration) - parseDurationToSeconds(b.duration)
      );
    } else if (videoSort === 'longest') {
      list = [...list].sort(
        (a, b) => parseDurationToSeconds(b.duration) - parseDurationToSeconds(a.duration)
      );
    } else if (videoSort === 'unwatched') {
      list = [...list].sort((a, b) => {
        const aDone = progress.completedVideoIds.includes(a.id) ? 1 : 0;
        const bDone = progress.completedVideoIds.includes(b.id) ? 1 : 0;
        return aDone - bDone;
      });
    }
    return list;
  }, [videoSearch, videoCategory, videoSort, progress.completedVideoIds]);

  const activePath =
    LEARNING_PATHS.find((p) => p.id === selectedPathId) ?? LEARNING_PATHS[0];

  const filteredCases = useMemo(() => {
    if (caseCategory === 'All') return CASE_STUDIES;
    return CASE_STUDIES.filter((c) => c.category === caseCategory);
  }, [caseCategory]);

  const activeDaily =
    DAILY_CHALLENGES.find((d) => d.id === selectedDailyId) ?? todaysChallenge;
  const activeDailyOption = activeDaily.options.find(
    (o) => o.id === chosenDailyOpt[activeDaily.id]
  );

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalTitle.trim() || !journalLearned.trim()) return;
    const payload = {
      title: journalTitle.trim(),
      topic: journalTopic,
      learned: journalLearned.trim(),
      situation: journalSituation.trim(),
      response: journalResponse.trim(),
    };
    if (editingEntryId) {
      updateJournalEntry(editingEntryId, payload);
      setEditingEntryId(null);
    } else {
      addJournalEntry(payload);
    }
    setJournalTitle('');
    setJournalLearned('');
    setJournalSituation('');
    setJournalResponse('');
  };

  const handleStartEditJournal = (entryId: string) => {
    const found = journalEntries.find((j) => j.id === entryId);
    if (!found) return;
    setEditingEntryId(found.id);
    setJournalTitle(found.title);
    setJournalTopic(found.topic);
    setJournalLearned(found.learned);
    setJournalSituation(found.situation);
    setJournalResponse(found.response);
  };

  const tabs: { id: LearningTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'videos', label: 'Video Library', icon: Video },
    { id: 'paths', label: 'Learning Paths', icon: Route },
    { id: 'cases', label: 'Case Studies', icon: FileText },
    { id: 'daily', label: 'Daily Challenge', icon: Calendar },
    { id: 'journal', label: 'Reflection Journal', icon: PenLine },
    { id: 'bookmarks', label: `Saved (${bookmarks.length})`, icon: BookMarked },
  ];

  return (
    <div className="pb-16">
      {/* Streaming-Style Learning Centre Hero */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-[#0B162C] via-[#10203F] to-[#132549] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-medium text-[#FACC15]">
                Ethics Learning Centre · Verified Videos, Paths &amp; Case Studies
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Watch, Reason &amp; Master Ethics
              </h1>
              <p className="mt-3 text-base text-slate-300 leading-relaxed">
                Explore curated university &amp; educational YouTube lessons with automatic
                10-question Video Knowledge Challenges, structured learning paths, real-world case
                studies, daily challenges, and your private reflection journal.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm shrink-0">
              <div>
                <p className="font-mono tabular-nums text-2xl font-bold text-[#FACC15]">
                  {progress.completedVideoIds.length}/{EDUCATIONAL_VIDEOS.length}
                </p>
                <p className="text-xs text-slate-300">Videos completed</p>
              </div>
              <div>
                <p className="font-mono tabular-nums text-2xl font-bold text-white">
                  {Object.keys(progress.videoQuizRecords).length}
                </p>
                <p className="text-xs text-slate-300">Video quizzes passed</p>
              </div>
            </div>
          </div>

          {/* Learning Centre Sub-Navigation Tabs */}
          <div
            className="mt-8 flex items-center gap-1.5 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Learning Centre Sections"
          >
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = learningTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setLearningTab(t.id);
                    if (t.id !== 'videos') setActiveVideoId(null);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#EAB308] text-[#070D1A]'
                      : 'bg-white/10 text-slate-200 hover:bg-white/15'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* TAB 1: YOUTUBE VIDEO LIBRARY + AUTOMATIC 10-QUESTION QUIZ */}
        {learningTab === 'videos' && (
          <div>
            {activeVideo ? (
              <YouTubeLessonPlayer
                video={activeVideo}
                onClose={() => setActiveVideoId(null)}
                onSelectNextVideo={() => {
                  const idx = EDUCATIONAL_VIDEOS.findIndex((v) => v.id === activeVideo.id);
                  const next = EDUCATIONAL_VIDEOS[(idx + 1) % EDUCATIONAL_VIDEOS.length];
                  setActiveVideoId(next.id);
                }}
              />
            ) : (
              <div className="space-y-8">
                {/* Search, Sort & Category Filters */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-6 relative">
                      <Search
                        className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                        aria-hidden="true"
                      />
                      <input
                        type="search"
                        value={videoSearch}
                        onChange={(e) => setVideoSearch(e.target.value)}
                        placeholder="Search videos by title, topic, or channel..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B1426] text-sm text-[#0B162C] dark:text-white"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="video-category-select" className="sr-only">
                        Filter by Category
                      </label>
                      <select
                        id="video-category-select"
                        value={videoCategory}
                        onChange={(e) =>
                          setVideoCategory(e.target.value as 'All' | VideoCategory)
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B1426] text-sm text-[#0B162C] dark:text-white"
                      >
                        <option value="All">All 15 Categories</option>
                        {VIDEO_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="video-sort-select" className="sr-only">
                        Sort Videos
                      </label>
                      <select
                        id="video-sort-select"
                        value={videoSort}
                        onChange={(e) =>
                          setVideoSort(
                            e.target.value as 'curated' | 'shortest' | 'longest' | 'unwatched'
                          )
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B1426] text-sm text-[#0B162C] dark:text-white"
                      >
                        <option value="curated">Sort: Curated Order</option>
                        <option value="unwatched">Sort: Unwatched First</option>
                        <option value="shortest">Sort: Shortest First</option>
                        <option value="longest">Sort: Longest First</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Category Strip */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {(['All', ...VIDEO_CATEGORIES] as ('All' | VideoCategory)[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setVideoCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                          videoCategory === cat
                            ? 'bg-[#0B162C] text-white border-[#0B162C] dark:bg-[#EAB308] dark:text-[#070D1A] dark:border-[#EAB308]'
                            : 'bg-white dark:bg-[#0B1426] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Streaming-Style Video Cards Grid */}
                {filteredVideos.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-12 text-center text-sm text-slate-500 dark:text-slate-400">
                    No videos match your filter. Try clearing the search box or choosing All 15
                    Categories.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((vid) => {
                      const watched = progress.completedVideoIds.includes(vid.id);
                      const quizRec = progress.videoQuizRecords[vid.id];
                      const bookmarked = isBookmarked('video', vid.id);
                      return (
                        <article
                          key={vid.id}
                          className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] overflow-hidden flex flex-col justify-between hover:border-[#2563EB]/60 dark:hover:border-[#EAB308]/60 transition-colors"
                        >
                          <div>
                            <div
                              onClick={() => setActiveVideoId(vid.id)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setActiveVideoId(vid.id);
                                }
                              }}
                              className="relative aspect-video bg-[#0B162C] overflow-hidden cursor-pointer"
                            >
                              <img
                                src={vid.thumbnailUrl}
                                alt={vid.title}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex items-end justify-between p-3.5">
                                <span className="text-[11px] font-mono text-white/95 bg-black/65 px-2 py-0.5 rounded">
                                  {vid.duration}
                                </span>
                                {watched && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-black/65 px-2 py-0.5 rounded">
                                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span>Watched</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="p-5 space-y-2">
                              <p className="text-xs font-medium text-[#2563EB] dark:text-[#EAB308]">
                                {vid.category} · {vid.channel}
                              </p>
                              <h3 className="font-editorial text-lg font-semibold text-[#0B162C] dark:text-white leading-snug line-clamp-2">
                                {vid.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                {vid.description}
                              </p>
                              {quizRec && (
                                <p className="text-xs font-mono tabular-nums text-emerald-700 dark:text-emerald-400 pt-1">
                                  10-Q Challenge Best: {quizRec.bestScore}/{quizRec.totalQuestions}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveVideoId(vid.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Watch Now</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                toggleBookmark({
                                  id: `video:${vid.id}`,
                                  type: 'video',
                                  targetId: vid.id,
                                  title: vid.title,
                                  subtitle: `${vid.category} · ${vid.channel}`,
                                })
                              }
                              aria-label={bookmarked ? 'Remove video bookmark' : 'Bookmark video'}
                              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                                bookmarked
                                  ? 'border-[#2563EB] dark:border-[#EAB308] text-[#2563EB] dark:text-[#EAB308] bg-[#EFF6FF] dark:bg-[#152440]'
                                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#0B162C] dark:hover:text-white'
                              }`}
                            >
                              <Bookmark
                                className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: STRUCTURED LEARNING PATHS */}
        {learningTab === 'paths' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {LEARNING_PATHS.map((path) => {
                const doneCount = path.modules.filter((m) =>
                  progress.completedPathModuleIds.includes(m.id)
                ).length;
                const pct = Math.round((doneCount / path.modules.length) * 100);
                const selected = path.id === activePath.id;
                return (
                  <button
                    key={path.id}
                    type="button"
                    onClick={() => setSelectedPathId(path.id)}
                    className={`text-left p-6 rounded-2xl border transition-all space-y-3 cursor-pointer ${
                      selected
                        ? 'border-[#2563EB] dark:border-[#EAB308] bg-white dark:bg-[#142340] shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] hover:border-slate-400'
                    }`}
                  >
                    <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                      {path.level}
                    </p>
                    <h2 className="font-editorial text-xl font-bold text-[#0B162C] dark:text-white">
                      {path.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {path.subtitle}
                    </p>
                    <div className="pt-2 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                        <span>
                          {doneCount} / {path.modules.length} completed
                        </span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2563EB] to-[#B47B1B] dark:from-[#60A5FA] dark:to-[#EAB308]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Path Modules List */}
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                {activePath.title} — Curriculum Modules
              </h3>
              {activePath.modules.map((mod) => {
                const done = progress.completedPathModuleIds.includes(mod.id);
                const linkedVid = EDUCATIONAL_VIDEOS.find((v) => v.id === mod.linkedVideoId);
                return (
                  <article
                    key={mod.id}
                    className={`rounded-2xl border p-6 transition-colors ${
                      done
                        ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-[#0E1E32]'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E]'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="space-y-2 max-w-3xl">
                        <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                          Module {mod.index} · {done ? 'Completed' : 'Remaining'}
                        </p>
                        <h4 className="font-editorial text-xl font-bold text-[#0B162C] dark:text-white">
                          {mod.title}
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                          <strong>Learning Objective:</strong> {mod.objective}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {mod.summary}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-1">
                          <strong className="text-[#0B162C] dark:text-white">
                            Practical Activity:{' '}
                          </strong>
                          {mod.practicalActivity}
                        </p>
                      </div>

                      <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => togglePathModuleCompleted(mod.id)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                            done
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{done ? 'Completed' : 'Mark Complete'}</span>
                        </button>

                        {linkedVid && (
                          <button
                            type="button"
                            onClick={() => openVideoInCentre(linkedVid.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Watch Lesson &amp; 10-Q Quiz</span>
                          </button>
                        )}

                        {mod.linkedPage && (
                          <button
                            type="button"
                            onClick={() => navigate(mod.linkedPage!)}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-[#0B162C] dark:hover:text-white cursor-pointer"
                          >
                            <span>Open Linked Activity</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: CASE STUDY LIBRARY */}
        {learningTab === 'cases' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {(['All', ...CASE_STUDY_CATEGORIES] as ('All' | CaseStudyCategory)[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCaseCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                    caseCategory === cat
                      ? 'bg-[#0B162C] text-white border-[#0B162C] dark:bg-[#EAB308] dark:text-[#070D1A] dark:border-[#EAB308]'
                      : 'bg-white dark:bg-[#0F1A2E] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {filteredCases.map((cs) => {
                const expanded = expandedCaseId === cs.id;
                const saved = isBookmarked('case', cs.id);
                return (
                  <article
                    key={cs.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] overflow-hidden"
                  >
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                          Case {cs.number} · {cs.category} · {cs.readTime}
                        </p>
                        <h3 className="mt-1 font-editorial text-xl sm:text-2xl font-bold text-[#0B162C] dark:text-white">
                          {cs.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                          {cs.background}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            toggleBookmark({
                              id: `case:${cs.id}`,
                              type: 'case',
                              targetId: cs.id,
                              title: cs.title,
                              subtitle: `Case Study · ${cs.category}`,
                            })
                          }
                          aria-label={saved ? 'Remove bookmark' : 'Bookmark case study'}
                          className={`p-2.5 rounded-lg border cursor-pointer ${
                            saved
                              ? 'border-[#2563EB] dark:border-[#EAB308] text-[#2563EB] dark:text-[#EAB308]'
                              : 'border-slate-200 dark:border-slate-700 text-slate-500'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpandedCaseId(expanded ? '' : cs.id)}
                          className="px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {expanded ? 'Collapse Analysis' : 'Read Full Case Study'}
                        </button>
                      </div>
                    </div>

                    {expanded && (
                      <div className="p-6 pt-0 space-y-6 border-t border-slate-100 dark:border-slate-800 mt-2">
                        <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800 space-y-2">
                            <p className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                              Core Ethical Issue
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                              {cs.ethicalIssue}
                            </p>
                          </div>

                          <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800 space-y-2">
                            <p className="text-xs font-semibold text-[#2563EB] dark:text-[#93C5FD]">
                              Stakeholders &amp; Ethical Principles
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              <strong>Stakeholders:</strong> {cs.stakeholders.join(' · ')}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              <strong>Principles:</strong> {cs.ethicalPrinciples.join(' · ')}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-[#0B162C] dark:text-white font-sans">
                            Available Decisions &amp; Trade-Offs
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cs.availableDecisions.map((d) => (
                              <div
                                key={d.label}
                                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E36]"
                              >
                                <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                                  {d.label}
                                </p>
                                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {d.tradeOff}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div>
                            <h4 className="text-xs font-semibold text-[#0B162C] dark:text-white font-sans">
                              Possible Consequences
                            </h4>
                            <ul className="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                              {cs.possibleConsequences.map((c) => (
                                <li key={c}>· {c}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308] font-sans">
                              Discussion &amp; Reflection Questions
                            </h4>
                            <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
                              {cs.discussionQuestions.map((q) => (
                                <li key={q}>· {q}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: DAILY ETHICS CHALLENGE */}
        {learningTab === 'daily' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                    {activeDaily.id === todaysChallenge.id
                      ? 'Today’s Daily Ethics Challenge'
                      : 'Practice Daily Challenge'}{' '}
                    · {activeDaily.principle}
                  </p>
                  <h2 className="mt-1 font-editorial text-2xl sm:text-3xl font-bold text-[#0B162C] dark:text-white">
                    {activeDaily.title}
                  </h2>
                </div>
                {progress.completedDailyChallengeIds.includes(activeDaily.id) && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span>Completed</span>
                  </span>
                )}
              </div>

              <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeDaily.situation}
              </p>

              <div className="space-y-3">
                {activeDaily.options.map((opt) => {
                  const chosen = chosenDailyOpt[activeDaily.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setChosenDailyOpt((prev) => ({ ...prev, [activeDaily.id]: opt.id }));
                        markDailyChallengeCompleted(activeDaily.id);
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        chosen
                          ? 'border-[#2563EB] dark:border-[#EAB308] bg-[#EFF6FF]/60 dark:bg-[#152440]'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <span className="text-sm font-medium text-[#0B162C] dark:text-slate-100">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {activeDailyOption && (
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800 space-y-2">
                  <p className="text-xs font-semibold text-[#2563EB] dark:text-[#EAB308]">
                    Ethical Reasoning
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {activeDailyOption.reasoning}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Takeaway: {activeDailyOption.takeaway}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                  Today’s Practical Micro-Action
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  {activeDaily.microAction}
                </p>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-2.5">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1">
                All Daily Practice Prompts ({progress.completedDailyChallengeIds.length}/
                {DAILY_CHALLENGES.length} done)
              </p>
              {DAILY_CHALLENGES.map((dc) => {
                const done = progress.completedDailyChallengeIds.includes(dc.id);
                const selected = dc.id === activeDaily.id;
                return (
                  <button
                    key={dc.id}
                    type="button"
                    onClick={() => setSelectedDailyId(dc.id)}
                    className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-3 cursor-pointer ${
                      selected
                        ? 'bg-[#0B162C] text-white border-[#0B162C] dark:bg-[#172B52] dark:border-[#EAB308]'
                        : 'bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-200 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-[11px] font-mono ${
                          selected ? 'text-[#FACC15]' : 'text-slate-400'
                        }`}
                      >
                        {dc.id === todaysChallenge.id ? 'Today · ' : ''}
                        {dc.principle}
                      </p>
                      <p className="text-sm font-semibold mt-0.5">{dc.title}</p>
                    </div>
                    {done && (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          selected ? 'text-[#FACC15]' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </aside>
          </div>
        )}

        {/* TAB 5: PRIVATE REFLECTION JOURNAL */}
        {learningTab === 'journal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSaveJournal}
              className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 space-y-4"
            >
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                  {editingEntryId ? 'Edit Reflection Entry' : 'New Private Reflection'}
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Stored privately in this browser’s localStorage only—never uploaded or shared
                    publicly.
                  </span>
                </p>
              </div>

              <div>
                <label htmlFor="j-title" className="block text-xs font-semibold mb-1">
                  Reflection Title
                </label>
                <input
                  id="j-title"
                  type="text"
                  required
                  value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                  placeholder="e.g., Navigating team credit fairly"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B1426] text-sm"
                />
              </div>

              <div>
                <label htmlFor="j-topic" className="block text-xs font-semibold mb-1">
                  Topic Area
                </label>
                <select
                  id="j-topic"
                  value={journalTopic}
                  onChange={(e) => setJournalTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B1426] text-sm"
                >
                  <option value="Personal Ethics">Personal Ethics</option>
                  <option value="Professional Ethics">Professional Ethics</option>
                  <option value="Decision Theatre">Decision Theatre</option>
                  <option value="Video Lesson">Video Lesson</option>
                  <option value="Everyday Dilemma">Everyday Dilemma</option>
                </select>
              </div>

              <div>
                <label htmlFor="j-learned" className="block text-xs font-semibold mb-1">
                  What I Learned Today
                </label>
                <textarea
                  id="j-learned"
                  required
                  rows={3}
                  value={journalLearned}
                  onChange={(e) => setJournalLearned(e.target.value)}
                  placeholder="Key ethical principle or insight that stood out..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B1426] text-sm"
                />
              </div>

              <div>
                <label htmlFor="j-situation" className="block text-xs font-semibold mb-1">
                  Ethical Situation Observed (Optional)
                </label>
                <textarea
                  id="j-situation"
                  rows={2}
                  value={journalSituation}
                  onChange={(e) => setJournalSituation(e.target.value)}
                  placeholder="Describe a real or hypothetical situation..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B1426] text-sm"
                />
              </div>

              <div>
                <label htmlFor="j-response" className="block text-xs font-semibold mb-1">
                  How I Would Respond (Optional)
                </label>
                <textarea
                  id="j-response"
                  rows={2}
                  value={journalResponse}
                  onChange={(e) => setJournalResponse(e.target.value)}
                  placeholder="Steps you would take to uphold integrity and fairness..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B1426] text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] cursor-pointer"
                >
                  {editingEntryId ? 'Update Reflection' : 'Save Reflection'}
                </button>
                {editingEntryId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingEntryId(null);
                      setJournalTitle('');
                      setJournalLearned('');
                      setJournalSituation('');
                      setJournalResponse('');
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                Saved Entries ({journalEntries.length})
              </h3>
              {journalEntries.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-10 text-center text-sm text-slate-500 dark:text-slate-400">
                  Your private journal is empty. Record your first ethical reflection using the form
                  on the left.
                </div>
              ) : (
                journalEntries.map((entry) => (
                  <article
                    key={entry.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                          {entry.topic} · {new Date(entry.updatedAt).toLocaleDateString()}
                        </p>
                        <h4 className="mt-1 font-editorial text-xl font-bold text-[#0B162C] dark:text-white">
                          {entry.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStartEditJournal(entry.id)}
                          aria-label="Edit reflection"
                          className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteJournalEntry(entry.id)}
                          aria-label="Delete reflection"
                          className="p-2 rounded-lg border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      <strong>What I learned:</strong> {entry.learned}
                    </p>
                    {entry.situation && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong>Situation:</strong> {entry.situation}
                      </p>
                    )}
                    {entry.response && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong>Ethical response:</strong> {entry.response}
                      </p>
                    )}
                  </article>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 6: SAVED BOOKMARKS */}
        {learningTab === 'bookmarks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                Your Bookmarks &amp; Saved Content ({bookmarks.length})
              </h2>
            </div>

            {bookmarks.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-12 text-center space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  No bookmarks saved yet. Click the bookmark button on any video, personal value,
                  professional standard, scenario, or case study to save it here.
                </p>
                <button
                  type="button"
                  onClick={() => setLearningTab('videos')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#0B162C] dark:bg-[#EAB308] dark:text-[#070D1A] cursor-pointer"
                >
                  Browse Video Library
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {bookmarks.map((bm) => (
                  <article
                    key={bm.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-5 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308] capitalize">
                        {bm.type} · Saved {new Date(bm.savedAt).toLocaleDateString()}
                      </p>
                      <h3 className="mt-1 font-editorial text-lg font-bold text-[#0B162C] dark:text-white">
                        {bm.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {bm.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (bm.type === 'video') openVideoInCentre(bm.targetId);
                          else if (bm.type === 'personal') navigate('personal');
                          else if (bm.type === 'professional') navigate('professional');
                          else if (bm.type === 'scenario') navigate('theatre');
                          else if (bm.type === 'quiz') navigate('quiz');
                          else if (bm.type === 'case') {
                            setExpandedCaseId(bm.targetId);
                            setLearningTab('cases');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline cursor-pointer"
                      >
                        <span>Open Saved Item</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeBookmark(bm.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
