import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  Users,
  Scale,
  RotateCcw,
  Lightbulb,
  Bookmark,
} from 'lucide-react';
import { DECISION_SCENARIOS } from '../data/decisionScenarios';
import { MEDIA_ASSETS } from '../data/assets';
import { useEthics } from '../context/EthicsContext';
import { MediaFrame } from '../components/MediaFrame';

export const DecisionTheatrePage: React.FC = () => {
  const {
    progress,
    recordScenarioChoice,
    navigate,
    reducedMotion,
    toggleBookmark,
    isBookmarked,
  } = useEthics();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(DECISION_SCENARIOS[0].id);

  const activeScenario =
    DECISION_SCENARIOS.find((s) => s.id === selectedScenarioId) ?? DECISION_SCENARIOS[0];
  const activeIndex = DECISION_SCENARIOS.findIndex((s) => s.id === activeScenario.id);

  const [currentSelections, setCurrentSelections] = useState<Record<string, string | null>>(() => ({
    ...progress.completedScenarios,
  }));

  const hasLocalSelection = Object.prototype.hasOwnProperty.call(
    currentSelections,
    activeScenario.id
  );
  const chosenOptionId = hasLocalSelection
    ? currentSelections[activeScenario.id]
    : progress.completedScenarios[activeScenario.id] ?? null;
  const chosenOption = activeScenario.options.find((o) => o.id === chosenOptionId) ?? null;

  const handleSelectOption = (optionId: string) => {
    setCurrentSelections((prev) => ({ ...prev, [activeScenario.id]: optionId }));
    recordScenarioChoice(activeScenario.id, optionId);
  };

  const handleClearCurrentChoice = () => {
    setCurrentSelections((prev) => ({ ...prev, [activeScenario.id]: null }));
  };

  const completedCount = Object.keys(progress.completedScenarios).length;

  return (
    <div className="pb-16">
      {/* Amphitheatre Header Banner */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-[#0B162C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium text-[#FACC15]">
                The Decision Theatre · Ethical Decision Simulator
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Step Into Real-World Dilemmas
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Complex ethical choices rarely have effortless answers. Deliberate across six
                campus, civic, and workplace scenarios to examine short- and long-term consequences,
                guiding principles, and multiple moral perspectives.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <span className="font-mono tabular-nums text-xl font-semibold text-[#FACC15]">
                    {completedCount} / {DECISION_SCENARIOS.length}
                  </span>
                  <span className="ml-2 text-slate-300">scenarios deliberated</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('progress')}
                  className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#FACC15] transition-colors cursor-pointer"
                >
                  <span>View Progress &amp; Badges</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex">
              <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#070D1A]">
                <MediaFrame
                  src={MEDIA_ASSETS.decisionTheatre.src}
                  alt={MEDIA_ASSETS.decisionTheatre.alt}
                  className="w-full h-full min-h-[220px]"
                  imgClassName="w-full h-full object-cover"
                  fallbackTone="navy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario Selector + Interactive Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Scenario Selector Sidebar */}
          <aside className="lg:col-span-4 space-y-2" aria-label="Choose a Dilemma Scenario">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1 pb-1">
              Select a Scenario ({DECISION_SCENARIOS.length} Cases)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {DECISION_SCENARIOS.map((sc) => {
                const active = sc.id === activeScenario.id;
                const done = Boolean(progress.completedScenarios[sc.id]);
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      active
                        ? 'bg-[#0B162C] text-white border-[#0B162C] dark:bg-[#172B52] dark:border-[#EAB308] shadow-sm'
                        : 'bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-mono ${
                          active ? 'text-[#FACC15]' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        Scenario {sc.number} · {sc.ethicsFocus}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-snug">{sc.title}</p>
                    </div>
                    {done && (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          active ? 'text-[#FACC15]' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                        aria-label="Completed"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Interactive Scenario Stage */}
          <motion.div
            key={activeScenario.id}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] overflow-hidden"
          >
            {/* Case Briefing */}
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                    Case {activeScenario.number} · {activeScenario.contextLabel}
                  </p>
                  <h2 className="mt-1.5 font-editorial text-2xl sm:text-3xl font-bold text-[#0B162C] dark:text-white">
                    {activeScenario.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Setting: {activeScenario.setting}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    toggleBookmark({
                      id: `scenario-${activeScenario.id}`,
                      type: 'scenario',
                      targetId: activeScenario.id,
                      title: activeScenario.title,
                      subtitle: `Decision Theatre · ${activeScenario.contextLabel}`,
                    })
                  }
                  aria-pressed={isBookmarked('scenario', activeScenario.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isBookmarked('scenario', activeScenario.id)
                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8] dark:border-[#EAB308] dark:bg-amber-950/30 dark:text-[#FACC15]'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] text-slate-700 dark:text-slate-200 hover:border-slate-400'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked('scenario', activeScenario.id) ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{isBookmarked('scenario', activeScenario.id) ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>

              <p className="mt-5 text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeScenario.situation}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Users className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-[#0B162C] dark:text-slate-200">
                    Stakeholders affected:{' '}
                  </strong>
                  {activeScenario.stakeholders.join(' · ')}
                </span>
              </div>
            </div>

            {/* Decision Options */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3 className="text-sm font-semibold text-[#0B162C] dark:text-white font-sans">
                  Choose a course of action to analyse its consequences and ethical reasoning:
                </h3>
                {chosenOption && (
                  <button
                    type="button"
                    onClick={handleClearCurrentChoice}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-[#0B162C] dark:hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Compare another option</span>
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-3">
                {activeScenario.options.map((opt, idx) => {
                  const isSelected = chosenOption?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2563EB] dark:border-[#EAB308] bg-[#EFF6FF]/60 dark:bg-[#152440] shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1528] hover:border-slate-400 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`font-mono text-xs font-semibold mt-0.5 shrink-0 ${
                            isSelected
                              ? 'text-[#2563EB] dark:text-[#EAB308]'
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          Option {idx + 1}
                        </span>
                        <span className="text-sm sm:text-base text-[#0B162C] dark:text-slate-100 leading-relaxed">
                          {opt.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Multi-Perspective Outcome Analysis */}
              {chosenOption && (
                <motion.div
                  key={chosenOption.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-[#2563EB] dark:text-[#EAB308]">
                        Ethical Analysis · {chosenOption.stance}
                      </p>
                      <h4 className="mt-1 font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                        How This Choice Plays Out
                      </h4>
                    </div>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Principles: {chosenOption.principlesInvolved.join(' · ')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800">
                      <p className="text-xs font-semibold text-[#0B162C] dark:text-white">
                        Possible Short-Term Consequences
                      </p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {chosenOption.shortTermConsequences}
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800">
                      <p className="text-xs font-semibold text-[#0B162C] dark:text-white">
                        Possible Long-Term Consequences
                      </p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {chosenOption.longTermConsequences}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-[#F5F7FF] dark:bg-[#13203E] border border-indigo-200/80 dark:border-indigo-900/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] dark:text-[#93C5FD]">
                      <Lightbulb className="w-4 h-4" aria-hidden="true" />
                      <span>Constructive Feedback</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {chosenOption.constructiveFeedback}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-amber-50/50 dark:bg-[#192338] border border-amber-200/80 dark:border-amber-900/50 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                      <Scale className="w-4 h-4" aria-hidden="true" />
                      <span>Broader Ethical Perspective</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {chosenOption.perspectiveNote}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tip: Click any other option above to compare different ethical lenses on this
                    same situation.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="px-6 sm:px-8 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                Scenario {activeIndex + 1} of {DECISION_SCENARIOS.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelectedScenarioId(
                    DECISION_SCENARIOS[(activeIndex + 1) % DECISION_SCENARIOS.length].id
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>
                  Next Dilemma:{' '}
                  {DECISION_SCENARIOS[(activeIndex + 1) % DECISION_SCENARIOS.length].title}
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
