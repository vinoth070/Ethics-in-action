import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useEthics } from '../context/EthicsContext';
import { PERSONAL_VALUES } from '../data/personalEthics';
import { PROFESSIONAL_STANDARDS } from '../data/professionalEthics';
import { COMPARISON_CATEGORIES } from '../data/comparisonData';
import { DECISION_SCENARIOS } from '../data/decisionScenarios';
import { QUIZ_CATEGORIES } from '../data/quizData';
import { EDUCATIONAL_VIDEOS } from '../data/youtubeVideos';
import { LEARNING_PATHS } from '../data/learningPaths';
import { CASE_STUDIES } from '../data/caseStudies';

interface SearchResultItem {
  id: string;
  section: string;
  title: string;
  snippet: string;
  onSelect: () => void;
}

export const GlobalSearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, navigate, openVideoInCentre } = useEthics();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!searchOpen) return;
    setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, setSearchOpen]);

  const allEntries = useMemo<SearchResultItem[]>(() => {
    const closeAnd = (fn: () => void) => () => {
      setSearchOpen(false);
      setQuery('');
      fn();
    };

    return [
      ...PERSONAL_VALUES.map((v) => ({
        id: `p-${v.id}`,
        section: 'Personal Ethics',
        title: v.name,
        snippet: `${v.tagline} ${v.definition}`,
        onSelect: closeAnd(() => navigate('personal')),
      })),
      ...PROFESSIONAL_STANDARDS.map((s) => ({
        id: `pr-${s.id}`,
        section: 'Professional Ethics',
        title: s.name,
        snippet: `${s.domain} — ${s.definition}`,
        onSelect: closeAnd(() => navigate('professional')),
      })),
      ...COMPARISON_CATEGORIES.map((c) => ({
        id: `cmp-${c.id}`,
        section: 'Ethics Face-Off Comparison',
        title: c.title,
        snippet: `${c.subtitle} — ${c.keyTakeaway}`,
        onSelect: closeAnd(() => navigate('comparison')),
      })),
      ...EDUCATIONAL_VIDEOS.map((v) => ({
        id: `vid-${v.id}`,
        section: 'Video Library',
        title: v.title,
        snippet: `${v.category} · ${v.channel} — ${v.description}`,
        onSelect: closeAnd(() => openVideoInCentre(v.id)),
      })),
      ...LEARNING_PATHS.flatMap((path) =>
        path.modules.map((m) => ({
          id: `lp-${m.id}`,
          section: path.title,
          title: `${m.index}. ${m.title}`,
          snippet: `${m.objective} ${m.summary}`,
          onSelect: closeAnd(() => navigate('learning', undefined, 'paths')),
        }))
      ),
      ...CASE_STUDIES.map((cs) => ({
        id: `cs-${cs.id}`,
        section: `Case Study · ${cs.category}`,
        title: cs.title,
        snippet: cs.ethicalIssue,
        onSelect: closeAnd(() => navigate('learning', undefined, 'cases')),
      })),
      ...DECISION_SCENARIOS.map((sc) => ({
        id: `sc-${sc.id}`,
        section: 'Decision Theatre',
        title: sc.title,
        snippet: sc.situation,
        onSelect: closeAnd(() => navigate('theatre')),
      })),
      ...QUIZ_CATEGORIES.map((q) => ({
        id: `q-${q.id}`,
        section: 'Ethics Challenge Quiz',
        title: q.title,
        snippet: q.subtitle,
        onSelect: closeAnd(() => navigate('quiz')),
      })),
    ];
  }, [navigate, openVideoInCentre, setSearchOpen]);

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return allEntries.slice(0, 10);
    return allEntries
      .filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.section.toLowerCase().includes(trimmed) ||
          item.snippet.toLowerCase().includes(trimmed)
      )
      .slice(0, 24);
  }, [allEntries, query]);

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 bg-[#070D1A]/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Global Search Centre"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search personal values, professional standards, videos, learning paths, case studies..."
            className="w-full bg-transparent text-sm sm:text-base text-[#0B162C] dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[62vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching topics found for “{query}”. Try searching for Honesty, Plagiarism,
              Leadership, Privacy, Trolley, or CSR.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onSelect}
                className="w-full text-left px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-[#152440] transition-colors flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-mono text-[#2563EB] dark:text-[#EAB308]">
                    {item.section}
                  </p>
                  <p className="text-sm font-semibold text-[#0B162C] dark:text-white truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {item.snippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
              </button>
            ))
          )}
        </div>

        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <span className="font-mono tabular-nums">{filtered.length}</span> results across
            all halls
          </span>
          <span className="font-mono">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};
