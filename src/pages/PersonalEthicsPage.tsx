import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Sparkles, Compass, Check, Bookmark, MessageSquare } from 'lucide-react';
import { PERSONAL_VALUES } from '../data/personalEthics';
import { MEDIA_ASSETS } from '../data/assets';
import { useEthics } from '../context/EthicsContext';
import { MediaFrame } from '../components/MediaFrame';

type ValueTab = 'overview' | 'examples' | 'situation' | 'reflection';

export const PersonalEthicsPage: React.FC = () => {
  const {
    progress,
    markPersonalExplored,
    navigate,
    reducedMotion,
    toggleBookmark,
    isBookmarked,
  } = useEthics();
  const [selectedId, setSelectedId] = useState<string>(PERSONAL_VALUES[0].id);
  const [activeTab, setActiveTab] = useState<ValueTab>('overview');
  const [situationAnswers, setSituationAnswers] = useState<Record<string, number>>({});
  const [selectedReflections, setSelectedReflections] = useState<Record<string, string>>(
    progress.personalReflections
  );

  const activeValue = PERSONAL_VALUES.find((v) => v.id === selectedId) ?? PERSONAL_VALUES[0];
  const activeIndex = PERSONAL_VALUES.findIndex((v) => v.id === activeValue.id);
  const isExplored = progress.exploredPersonalIds.includes(activeValue.id);
  const chosenSituationIdx = situationAnswers[activeValue.id];
  const chosenReflection = selectedReflections[activeValue.id] ?? '';

  const handleSelectValue = (id: string) => {
    setSelectedId(id);
    setActiveTab('overview');
  };

  const handleChooseSituation = (choiceIdx: number) => {
    setSituationAnswers((prev) => ({ ...prev, [activeValue.id]: choiceIdx }));
  };

  const handleSelectReflection = (text: string) => {
    setSelectedReflections((prev) => ({ ...prev, [activeValue.id]: text }));
    markPersonalExplored(activeValue.id, text);
  };

  const handleMarkExplored = () => {
    markPersonalExplored(activeValue.id, chosenReflection || activeValue.reflectionOptions[0]);
  };

  const goToNextValue = () => {
    const next = PERSONAL_VALUES[(activeIndex + 1) % PERSONAL_VALUES.length];
    handleSelectValue(next.id);
  };

  return (
    <div className="pb-16">
      {/* Gallery Banner — Blue & Purple Personal Identity */}
      <section className="relative border-b border-indigo-200/80 dark:border-indigo-950 bg-gradient-to-b from-[#EEF2FF] via-[#F5F7FF] to-[#F8F9FC] dark:from-[#0C1634] dark:via-[#111936] dark:to-[#070D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium text-[#4F46E5] dark:text-[#A5B4FC]">
                Gallery I · Personal Ethics · Blue &amp; Purple Edition
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B162C] dark:text-white">
                The World of Personal Values
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Personal ethics begins in quiet everyday choices—how we speak, keep promises, care
                for others, and own our mistakes when no formal rulebook is watching.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <span className="font-mono tabular-nums text-xl font-semibold text-[#2563EB] dark:text-[#93C5FD]">
                    {progress.exploredPersonalIds.length} / {PERSONAL_VALUES.length}
                  </span>
                  <span className="ml-2 text-slate-600 dark:text-slate-400">values explored</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('comparison')}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#4F46E5] dark:text-[#C4B5FD] hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>Compare with Professional Ethics</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl overflow-hidden border border-indigo-200/80 dark:border-indigo-900/70 bg-white dark:bg-[#0F1A2E]">
                <MediaFrame
                  src={MEDIA_ASSETS.personalWorld.src}
                  alt={MEDIA_ASSETS.personalWorld.alt}
                  className="w-full h-full min-h-[220px]"
                  imgClassName="w-full h-full object-cover"
                  fallbackTone="blue"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 7-Value Selector Rail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label="Select a Personal Value"
        >
          {PERSONAL_VALUES.map((val) => {
            const selected = val.id === activeValue.id;
            const explored = progress.exploredPersonalIds.includes(val.id);
            return (
              <button
                key={val.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => handleSelectValue(val.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                  selected
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#6D28D9] text-white border-transparent shadow-sm'
                    : 'bg-white dark:bg-[#0F1A2E] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#6D28D9]/50 dark:hover:border-[#A78BFA]/50'
                }`}
              >
                <span className={`font-mono text-xs ${selected ? 'text-white/80' : 'text-slate-400'}`}>
                  {val.index}
                </span>
                <span>{val.name}</span>
                {explored && (
                  <CheckCircle2
                    className={`w-4 h-4 ${selected ? 'text-white' : 'text-[#2563EB] dark:text-[#93C5FD]'}`}
                    aria-label="Explored"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Value Interactive Workspace */}
        <motion.div
          key={activeValue.id}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-8 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-white dark:bg-[#0F1A2E] overflow-hidden"
        >
          {/* Value Header Strip */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-[#EFF6FF] via-[#F5F3FF] to-white dark:from-[#122044] dark:via-[#1B1942] dark:to-[#0F1A2E]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-[#4F46E5] dark:text-[#A5B4FC]">
                  Value {activeValue.index} of 07 · Personal Ethics
                </p>
                <h2 className="mt-1 font-editorial text-2xl sm:text-3xl font-bold text-[#0B162C] dark:text-white">
                  {activeValue.name}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
                  {activeValue.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    toggleBookmark({
                      id: `personal-${activeValue.id}`,
                      type: 'personal',
                      targetId: activeValue.id,
                      title: activeValue.name,
                      subtitle: `Personal Ethics · ${activeValue.tagline}`,
                    })
                  }
                  aria-pressed={isBookmarked('personal', activeValue.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isBookmarked('personal', activeValue.id)
                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8] dark:border-[#60A5FA] dark:bg-[#172852] dark:text-[#93C5FD]'
                      : 'border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-[#0B1426] text-slate-700 dark:text-slate-200 hover:border-slate-400'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked('personal', activeValue.id) ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{isBookmarked('personal', activeValue.id) ? 'Saved' : 'Bookmark'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleMarkExplored}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isExplored
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                  }`}
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{isExplored ? 'Value Explored' : 'Mark Value Explored'}</span>
                </button>
              </div>
            </div>

            {/* Sub-section Interactive Tabs */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-200/70 dark:bg-slate-900/80">
              {(
                [
                  { id: 'overview', label: 'Definition & Meaning' },
                  { id: 'examples', label: 'Examples & Daily Life' },
                  { id: 'situation', label: 'Practical Situation' },
                  { id: 'reflection', label: 'Reflection Activity' },
                ] as { id: ValueTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-[#1E2E52] text-[#0B162C] dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#0B162C] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#2563EB] dark:text-[#93C5FD]">
                    Clear Definition
                  </p>
                  <h3 className="font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                    What {activeValue.name} Means
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeValue.definition}
                  </p>
                </div>

                <div className="space-y-3 lg:border-l lg:border-slate-200 dark:lg:border-slate-800 lg:pl-8">
                  <p className="text-xs font-medium text-[#6D28D9] dark:text-[#C4B5FD]">
                    Why It Matters
                  </p>
                  <h3 className="font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                    Impact on Character &amp; Relationships
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeValue.whyItMatters}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-4">
                  <p className="text-xs font-medium text-[#2563EB] dark:text-[#93C5FD]">
                    Real-Life Examples
                  </p>
                  <div className="space-y-4">
                    {activeValue.realLifeExamples.map((ex) => (
                      <div
                        key={ex.title}
                        className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#13203A] border border-slate-200/80 dark:border-slate-800"
                      >
                        <h4 className="font-semibold text-base text-[#0B162C] dark:text-white">
                          {ex.title}
                        </h4>
                        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {ex.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <p className="text-xs font-medium text-[#6D28D9] dark:text-[#C4B5FD]">
                    Everyday Applications
                  </p>
                  <ul className="space-y-3">
                    {activeValue.everydayApplications.map((app, i) => (
                      <li
                        key={app}
                        className="flex items-start gap-3 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0B1426]"
                      >
                        <span className="font-mono text-xs font-semibold text-[#4F46E5] dark:text-[#A5B4FC] mt-0.5 shrink-0">
                          0{i + 1}
                        </span>
                        <span className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                          {app}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'situation' && (
              <div className="max-w-3xl space-y-5">
                <div>
                  <p className="text-xs font-medium text-[#4F46E5] dark:text-[#A5B4FC]">
                    Practical Ethical Situation · {activeValue.practicalSituation.context}
                  </p>
                  <h3 className="mt-1 font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                    {activeValue.practicalSituation.title}
                  </h3>
                  <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeValue.practicalSituation.prompt}
                  </p>
                </div>

                <div className="space-y-3">
                  {activeValue.practicalSituation.choices.map((choice, idx) => {
                    const selected = chosenSituationIdx === idx;
                    return (
                      <button
                        key={choice.label}
                        type="button"
                        onClick={() => handleChooseSituation(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          selected
                            ? 'border-[#4F46E5] dark:border-[#A78BFA] bg-[#EEF2FF]/70 dark:bg-[#1A244D]'
                            : 'border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1426] hover:border-indigo-300 dark:hover:border-indigo-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs font-semibold text-[#4F46E5] dark:text-[#A5B4FC] mt-0.5">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span className="text-sm font-medium text-[#0B162C] dark:text-slate-100 leading-relaxed">
                            {choice.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {chosenSituationIdx !== undefined && (
                  <div className="p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-[#F5F7FF] dark:bg-[#131F40] space-y-2">
                    <p className="text-xs font-semibold text-[#4F46E5] dark:text-[#C4B5FD]">
                      {activeValue.practicalSituation.choices[chosenSituationIdx].alignment === 'strong'
                        ? 'Strong Ethical Alignment'
                        : activeValue.practicalSituation.choices[chosenSituationIdx].alignment === 'nuanced'
                        ? 'Nuanced Trade-Off to Consider'
                        : 'Ethical Caution'}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {activeValue.practicalSituation.choices[chosenSituationIdx].reflection}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reflection' && (
              <div className="max-w-3xl space-y-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#6D28D9] dark:text-[#C4B5FD] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-[#6D28D9] dark:text-[#C4B5FD]">
                      Personal Reflection Activity
                    </p>
                    <h3 className="mt-1 font-editorial text-xl sm:text-2xl font-semibold text-[#0B162C] dark:text-white">
                      {activeValue.reflectionPrompt}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Select the commitment that resonates most with you today. Your choice is saved
                      locally to track your personal ethics reflection progress.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeValue.reflectionOptions.map((option) => {
                    const active = chosenReflection === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectReflection(option)}
                        className={`w-full text-left p-4 rounded-xl border flex items-start justify-between gap-4 transition-all cursor-pointer ${
                          active
                            ? 'border-[#2563EB] dark:border-[#93C5FD] bg-[#EFF6FF] dark:bg-[#14234A]'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1426] hover:border-indigo-300 dark:hover:border-indigo-700'
                        }`}
                      >
                        <span className="text-sm text-[#0B162C] dark:text-slate-100 leading-relaxed">
                          {option}
                        </span>
                        {active && (
                          <CheckCircle2
                            className="w-5 h-5 text-[#2563EB] dark:text-[#93C5FD] shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {chosenReflection && (
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Reflection saved locally — {activeValue.name} is marked as explored in your
                    Progress Centre.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bottom Value Footer Navigation */}
          <div className="px-6 sm:px-8 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Compass className="w-4 h-4 text-[#4F46E5] dark:text-[#A5B4FC]" aria-hidden="true" />
              <span>Tip: Explore all 4 tabs and try the reflection activity to earn your badge.</span>
            </div>
            <button
              type="button"
              onClick={goToNextValue}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#0B162C] dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>
                Next Value: {PERSONAL_VALUES[(activeIndex + 1) % PERSONAL_VALUES.length].name}
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Discussion & Reflection Questions */}
        <div className="mt-10 rounded-2xl border border-indigo-200/70 dark:border-indigo-900/60 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4F46E5] dark:text-[#A5B4FC]">
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Discussion &amp; Reflection Questions · {activeValue.name}</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('learning', undefined, 'journal')}
              className="text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline cursor-pointer"
            >
              Record Your Thoughts in Private Journal
            </button>
          </div>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              When is practicing <strong>{activeValue.name.toLowerCase()}</strong> most difficult in
              your everyday relationships or academic life, and what helps you stay grounded?
            </li>
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              Can you recall a small moment where someone else’s {activeValue.name.toLowerCase()}{' '}
              changed the outcome of a situation for the better?
            </li>
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              How does personal {activeValue.name.toLowerCase()} prepare you for higher-stakes
              responsibilities in a future workplace or civic role?
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
