import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Scale,
  Layers,
  Columns2,
  MessageSquare,
} from 'lucide-react';
import { COMPARISON_CATEGORIES, COMMON_VALUES_BRIDGE } from '../data/comparisonData';
import { MEDIA_ASSETS } from '../data/assets';
import { useEthics } from '../context/EthicsContext';
import { MediaFrame } from '../components/MediaFrame';

export const ComparisonPage: React.FC = () => {
  const { progress, markComparisonExplored, navigate, reducedMotion } = useEthics();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'matrix'>('interactive');
  const [activeCommonId, setActiveCommonId] = useState<string>(COMMON_VALUES_BRIDGE[0].id);

  const activeCategory = COMPARISON_CATEGORIES[selectedIndex];
  const activeCommon =
    COMMON_VALUES_BRIDGE.find((c) => c.id === activeCommonId) ?? COMMON_VALUES_BRIDGE[0];

  useEffect(() => {
    markComparisonExplored(activeCategory.id);
  }, [activeCategory.id, markComparisonExplored]);

  const handleSelectCategory = (idx: number) => {
    setSelectedIndex(idx);
    setViewMode('interactive');
  };

  const handleViewMatrix = () => {
    setViewMode('matrix');
    COMPARISON_CATEGORIES.forEach((c) => markComparisonExplored(c.id));
  };

  return (
    <div className="pb-16">
      {/* Header Banner */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium text-[#2563EB] dark:text-[#EAB308]">
                Ethics Face-Off · Side-by-Side Comparison
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B162C] dark:text-white">
                Personal Ethics vs. Professional Ethics
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Understand where personal conscience and professional standards differ, where they
                intersect, and why mastering both creates dependable ethical leadership.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setViewMode('interactive')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      viewMode === 'interactive'
                        ? 'bg-white dark:bg-[#1B2B4B] text-[#0B162C] dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-[#0B162C] dark:hover:text-white'
                    }`}
                  >
                    <Columns2 className="w-4 h-4" aria-hidden="true" />
                    <span>Interactive Face-Off</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleViewMatrix}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      viewMode === 'matrix'
                        ? 'bg-white dark:bg-[#1B2B4B] text-[#0B162C] dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-[#0B162C] dark:hover:text-white'
                    }`}
                  >
                    <Layers className="w-4 h-4" aria-hidden="true" />
                    <span>All 8 Dimensions Matrix</span>
                  </button>
                </div>

                <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  {progress.exploredComparisonIds.length} / {COMPARISON_CATEGORIES.length} dimensions explored
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0F1A2E]">
                <MediaFrame
                  src={MEDIA_ASSETS.ethicsHarmony.src}
                  alt={MEDIA_ASSETS.ethicsHarmony.alt}
                  className="w-full h-full min-h-[220px]"
                  imgClassName="w-full h-full object-cover"
                  fallbackTone="navy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Selector & Comparison Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {viewMode === 'interactive' ? (
          <div>
            {/* 8 Category Tabs */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2"
              role="tablist"
              aria-label="Comparison Categories"
            >
              {COMPARISON_CATEGORIES.map((cat, idx) => {
                const active = idx === selectedIndex;
                const explored = progress.exploredComparisonIds.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleSelectCategory(idx)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0B162C] text-white border-[#0B162C] dark:bg-[#EAB308] dark:text-[#070D1A] dark:border-[#EAB308]'
                        : 'bg-white dark:bg-[#0F1A2E] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                    }`}
                  >
                    <span className={`font-mono text-xs ${active ? 'opacity-80' : 'text-slate-400'}`}>
                      {cat.index}
                    </span>
                    <span>{cat.title}</span>
                    {explored && !active && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Animated Side-by-Side Comparison Stage */}
            <motion.div
              key={activeCategory.id}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Dimension {activeCategory.index} of 08 · {activeCategory.subtitle}
                  </p>
                  <h2 className="mt-1 font-editorial text-2xl sm:text-3xl font-bold text-[#0B162C] dark:text-white">
                    {activeCategory.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex - 1 + COMPARISON_CATEGORIES.length) %
                          COMPARISON_CATEGORIES.length
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((selectedIndex + 1) % COMPARISON_CATEGORIES.length)
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Personal Ethics Card (Blue / Purple) */}
                <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/70 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#2563EB] dark:text-[#93C5FD]">
                      Personal Ethics · Inner Character
                    </p>
                    <h3 className="mt-2 font-editorial text-xl sm:text-2xl font-semibold text-[#0B162C] dark:text-white">
                      {activeCategory.personal.summary}
                    </h3>

                    <ul className="mt-5 space-y-3">
                      {activeCategory.personal.details.map((d) => (
                        <li
                          key={d}
                          className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="text-[#4F46E5] dark:text-[#A5B4FC] font-bold">·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-indigo-100 dark:border-slate-800">
                    <p className="text-xs font-semibold text-[#4F46E5] dark:text-[#A5B4FC]">
                      Real-Life Personal Example
                    </p>
                    <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {activeCategory.personal.example}
                    </p>
                  </div>
                </div>

                {/* Professional Ethics Card (Gold / Deep Navy) */}
                <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                      Professional Ethics · Institutional Standards
                    </p>
                    <h3 className="mt-2 font-editorial text-xl sm:text-2xl font-semibold text-[#0B162C] dark:text-white">
                      {activeCategory.professional.summary}
                    </h3>

                    <ul className="mt-5 space-y-3">
                      {activeCategory.professional.details.map((d) => (
                        <li
                          key={d}
                          className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="text-[#B47B1B] dark:text-[#EAB308] font-bold">·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-amber-100 dark:border-slate-800">
                    <p className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                      Real-World Professional Example
                    </p>
                    <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {activeCategory.professional.example}
                    </p>
                  </div>
                </div>
              </div>

              {/* Synthesis Takeaway */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1426] p-5 sm:p-6 flex items-start gap-3">
                <Scale className="w-5 h-5 text-[#2563EB] dark:text-[#EAB308] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#0B162C] dark:text-white">
                    Key Distinction &amp; Synthesis
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeCategory.keyTakeaway}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Complete 8-Dimension Matrix View */
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                Complete 8-Dimension Comparison Matrix
              </h2>
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className="text-sm font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline cursor-pointer"
              >
                Return to Interactive Card View
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E]">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1426]">
                    <th className="py-4 px-5 text-xs font-semibold text-slate-500 dark:text-slate-400 w-44">
                      Category
                    </th>
                    <th className="py-4 px-5 text-xs font-semibold text-[#2563EB] dark:text-[#93C5FD]">
                      Personal Ethics
                    </th>
                    <th className="py-4 px-5 text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                      Professional Ethics
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {COMPARISON_CATEGORIES.map((cat, idx) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors"
                    >
                      <td className="py-4 px-5 align-top">
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(idx)}
                          className="text-left cursor-pointer group"
                        >
                          <span className="block font-mono text-xs text-slate-400">{cat.index}</span>
                          <span className="font-semibold text-sm text-[#0B162C] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#EAB308]">
                            {cat.title}
                          </span>
                        </button>
                      </td>
                      <td className="py-4 px-5 align-top text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <p className="font-medium text-[#0B162C] dark:text-slate-100">
                          {cat.personal.summary}
                        </p>
                        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                          Example: {cat.personal.example}
                        </p>
                      </td>
                      <td className="py-4 px-5 align-top text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <p className="font-medium text-[#0B162C] dark:text-slate-100">
                          {cat.professional.summary}
                        </p>
                        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                          Example: {cat.professional.example}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* SHARED COMMON VALUES & COMPLEMENTARY HARMONY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#4F46E5] dark:text-[#EAB308]">
            Shared Foundation · Where Both Worlds Meet
          </p>
          <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#0B162C] dark:text-white">
            Five Common Values That Unite Personal &amp; Professional Ethics
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Personal ethics and professional ethics are not rivals—they are complementary halves of
            ethical living. Select any shared value below to see how it translates seamlessly from
            everyday character into institutional excellence.
          </p>
        </div>

        {/* Common Value Interactive Selector */}
        <div className="mt-8 flex flex-wrap gap-2">
          {COMMON_VALUES_BRIDGE.map((val) => {
            const active = val.id === activeCommon.id;
            return (
              <button
                key={val.id}
                type="button"
                onClick={() => setActiveCommonId(val.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#B47B1B] text-white border-transparent shadow-sm'
                    : 'bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                {val.name}
              </button>
            );
          })}
        </div>

        {/* Active Common Value Bridge Display */}
        <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8">
          <div className="max-w-2xl">
            <h3 className="font-editorial text-2xl font-bold text-[#0B162C] dark:text-white">
              {activeCommon.name}
            </h3>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {activeCommon.coreMeaning}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#EFF6FF]/70 dark:bg-[#132245] border border-indigo-200/70 dark:border-indigo-900/60">
              <p className="text-xs font-semibold text-[#2563EB] dark:text-[#93C5FD]">
                In Personal Life
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeCommon.inPersonalLife}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/70 dark:bg-[#1F2436] border border-amber-200/80 dark:border-amber-900/50">
              <p className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                In Professional Settings
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeCommon.inProfessionalLife}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-semibold text-[#0B162C] dark:text-white">
                How They Complement Each Other
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeCommon.synergyInsight}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ready to test your grasp of how personal and professional ethics work together?
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('quiz')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Take Comparison Quiz</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => navigate('theatre')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Enter Decision Theatre</span>
              </button>
            </div>
          </div>
        </div>

        {/* Discussion & Reflection Questions */}
        <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] dark:text-[#EAB308]">
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Discussion &amp; Reflection Questions · Bridging Both Worlds</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('learning', undefined, 'journal')}
              className="text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline cursor-pointer"
            >
              Open Private Reflection Journal
            </button>
          </div>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              Have you ever faced a moment where personal loyalty to a friend conflicted with a
              fairness or institutional standard? How did you weigh the two?
            </li>
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              Why are written professional codes alone rarely enough without personal integrity
              behind them?
            </li>
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              Which of the five shared values—Honesty, Integrity, Fairness, Accountability, or
              Respect—do you think is most tested in modern workplaces today?
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
