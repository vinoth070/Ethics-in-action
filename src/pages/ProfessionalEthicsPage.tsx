import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  Shield,
  Briefcase,
  Bookmark,
  MessageSquare,
} from 'lucide-react';
import { PROFESSIONAL_STANDARDS } from '../data/professionalEthics';
import { MEDIA_ASSETS } from '../data/assets';
import { useEthics } from '../context/EthicsContext';
import { MediaFrame } from '../components/MediaFrame';

export const ProfessionalEthicsPage: React.FC = () => {
  const {
    progress,
    markProfessionalExplored,
    navigate,
    reducedMotion,
    toggleBookmark,
    isBookmarked,
  } = useEthics();
  const [selectedId, setSelectedId] = useState<string>(PROFESSIONAL_STANDARDS[0].id);
  const [revealedScenarios, setRevealedScenarios] = useState<Record<string, boolean>>({});
  const [checkedCommitments, setCheckedCommitments] = useState<Record<string, boolean>>({});

  const activeStandard =
    PROFESSIONAL_STANDARDS.find((s) => s.id === selectedId) ?? PROFESSIONAL_STANDARDS[0];
  const activeIndex = PROFESSIONAL_STANDARDS.findIndex((s) => s.id === activeStandard.id);
  const isStudied = progress.exploredProfessionalIds.includes(activeStandard.id);
  const isRevealed = Boolean(revealedScenarios[activeStandard.id]);

  const toggleReveal = () => {
    setRevealedScenarios((prev) => ({
      ...prev,
      [activeStandard.id]: !prev[activeStandard.id],
    }));
  };

  const toggleCommitment = (key: string) => {
    setCheckedCommitments((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const goToNext = () => {
    const next = PROFESSIONAL_STANDARDS[(activeIndex + 1) % PROFESSIONAL_STANDARDS.length];
    setSelectedId(next.id);
  };

  return (
    <div className="pb-16">
      {/* Banner — Deep Navy & Burnished Gold Institutional Identity */}
      <section className="relative border-b border-amber-200/70 dark:border-amber-900/40 bg-gradient-to-b from-[#0B162C] via-[#10203F] to-[#132549] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium text-[#FACC15]">
                Gallery II · Professional Ethics · Gold &amp; Deep Navy Edition
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                The World of Professional Responsibility
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                In universities, laboratories, and workplaces, expertise carries public trust.
                Examine eight core professional standards covering academic honesty, confidentiality,
                data privacy, fair treatment, and responsible teamwork.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <span className="font-mono tabular-nums text-xl font-semibold text-[#FACC15]">
                    {progress.exploredProfessionalIds.length} / {PROFESSIONAL_STANDARDS.length}
                  </span>
                  <span className="ml-2 text-slate-300">standards studied</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('theatre')}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#FDE047] hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>Practise in Decision Theatre</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl overflow-hidden border border-amber-400/30 bg-[#0A1324]">
                <MediaFrame
                  src={MEDIA_ASSETS.professionalWorld.src}
                  alt={MEDIA_ASSETS.professionalWorld.alt}
                  className="w-full h-full min-h-[220px]"
                  imgClassName="w-full h-full object-cover"
                  fallbackTone="gold"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master-Detail Two-Zone Professional Dossier Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Rail (8 Standards) */}
          <aside className="lg:col-span-4 space-y-2" aria-label="Professional Ethics Standards">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1 pb-1">
              Select a Standard ({PROFESSIONAL_STANDARDS.length} Topics)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {PROFESSIONAL_STANDARDS.map((std) => {
                const selected = std.id === activeStandard.id;
                const studied = progress.exploredProfessionalIds.includes(std.id);
                return (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => setSelectedId(std.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      selected
                        ? 'bg-[#0B162C] text-white border-[#B47B1B] dark:bg-[#172B52] dark:border-[#EAB308] shadow-sm'
                        : 'bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#B47B1B]/60 dark:hover:border-[#EAB308]/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-mono ${
                          selected ? 'text-[#FACC15]' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {std.index} · {std.domain}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold truncate">{std.name}</p>
                    </div>
                    {studied && (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          selected ? 'text-[#FACC15]' : 'text-[#B47B1B] dark:text-[#EAB308]'
                        }`}
                        aria-label="Studied"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Detailed Interactive Dossier */}
          <motion.div
            key={activeStandard.id}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] overflow-hidden"
          >
            {/* Dossier Header */}
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-50/70 via-white to-white dark:from-[#16233E] dark:via-[#0F1A2E] dark:to-[#0F1A2E] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-[#9A670F] dark:text-[#EAB308]">
                  Standard {activeStandard.index} · {activeStandard.domain}
                </p>
                <h2 className="mt-1 font-editorial text-2xl sm:text-3xl font-bold text-[#0B162C] dark:text-white">
                  {activeStandard.name}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    toggleBookmark({
                      id: `professional-${activeStandard.id}`,
                      type: 'professional',
                      targetId: activeStandard.id,
                      title: activeStandard.name,
                      subtitle: `Professional Ethics · ${activeStandard.domain}`,
                    })
                  }
                  aria-pressed={isBookmarked('professional', activeStandard.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isBookmarked('professional', activeStandard.id)
                      ? 'border-[#B47B1B] bg-amber-50 text-[#9A670F] dark:border-[#EAB308] dark:bg-amber-950/30 dark:text-[#FACC15]'
                      : 'border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-[#0B1426] text-slate-700 dark:text-slate-200 hover:border-slate-400'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked('professional', activeStandard.id) ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{isBookmarked('professional', activeStandard.id) ? 'Saved' : 'Bookmark'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => markProfessionalExplored(activeStandard.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isStudied
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-[#0B162C] hover:bg-[#192C52] text-white dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15]'
                  }`}
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{isStudied ? 'Standard Studied' : 'Mark as Studied'}</span>
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Definition & Importance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308] font-sans">
                    Definition
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                    {activeStandard.definition}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308] font-sans">
                    Why It Matters Professionally
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                    {activeStandard.importance}
                  </p>
                </div>
              </div>

              {/* Practical Applications */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                  Practical Applications
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {activeStandard.practicalApplications.map((item, idx) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      <span className="font-mono text-xs font-semibold text-[#9A670F] dark:text-[#EAB308] mt-0.5 shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real-World Examples */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                  Real-World Campus &amp; Workplace Examples
                </h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeStandard.realWorldExamples.map((ex) => (
                    <div
                      key={ex.context}
                      className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800"
                    >
                      <p className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                        {ex.context}
                      </p>
                      <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {ex.illustration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Professional Situation Reveal */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="rounded-xl border border-amber-200/90 dark:border-amber-900/50 bg-amber-50/40 dark:bg-[#142038] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                    <Briefcase className="w-4 h-4" aria-hidden="true" />
                    <span>Professional Situation · {activeStandard.professionalScenario.setting}</span>
                  </div>
                  <p className="mt-2.5 text-sm sm:text-base text-[#0B162C] dark:text-slate-100 leading-relaxed">
                    {activeStandard.professionalScenario.dilemma}
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={toggleReveal}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-4 h-4" aria-hidden="true" />
                          <span>Hide Ethical Response</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" aria-hidden="true" />
                          <span>Examine Recommended Professional Action</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="mt-4 pt-4 border-t border-amber-200/80 dark:border-slate-700 space-y-2">
                      <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                        Recommended Action: {activeStandard.professionalScenario.ethicalAction}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeStandard.professionalScenario.whyItWorks}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Ethical Responsibilities Checklist */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#9A670F] dark:text-[#EAB308]" aria-hidden="true" />
                  <h3 className="font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                    Your Ethical Responsibilities Checklist
                  </h3>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Check each responsibility as you review how you apply it in projects or internships.
                </p>

                <div className="mt-4 space-y-2.5">
                  {activeStandard.ethicalResponsibilities.map((resp, idx) => {
                    const key = `${activeStandard.id}-${idx}`;
                    const checked = Boolean(checkedCommitments[key]);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          toggleCommitment(key);
                          markProfessionalExplored(activeStandard.id);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-colors cursor-pointer ${
                          checked
                            ? 'border-[#B47B1B] dark:border-[#EAB308] bg-amber-50/50 dark:bg-[#192846]'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                            checked
                              ? 'bg-[#B47B1B] border-[#B47B1B] dark:bg-[#EAB308] dark:border-[#EAB308] text-white dark:text-[#070D1A]'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                        </span>
                        <span className="text-sm text-[#0B162C] dark:text-slate-100">{resp}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Next Control */}
            <div className="px-6 sm:px-8 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate('quiz')}
                className="text-sm font-medium text-[#9A670F] dark:text-[#EAB308] hover:underline underline-offset-4 cursor-pointer"
              >
                Test your knowledge in the Professional Ethics Quiz
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#0B162C] dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>
                  Next: {PROFESSIONAL_STANDARDS[(activeIndex + 1) % PROFESSIONAL_STANDARDS.length].name}
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Discussion & Reflection Questions */}
        <div className="mt-10 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Discussion &amp; Reflection Questions · {activeStandard.name}</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('learning', undefined, 'journal')}
              className="text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline cursor-pointer"
            >
              Write Reflection in Private Journal
            </button>
          </div>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              What organisational pressures—such as tight deadlines or hierarchy—most often threaten{' '}
              <strong>{activeStandard.name.toLowerCase()}</strong>?
            </li>
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              If a colleague asks you to bend a standard “just this once,” what clear language can
              you use to uphold {activeStandard.name.toLowerCase()} constructively?
            </li>
            <li className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              Who bears the hidden cost when {activeStandard.name.toLowerCase()} fails inside a
              university, hospital, company, or public office?
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
