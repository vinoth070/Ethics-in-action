import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Compass,
  Scale,
  Theater,
  Award,
  CheckCircle2,
  Sliders,
  BookOpen,
  Briefcase,
  PlayCircle,
  Sparkles,
  Search,
} from 'lucide-react';
import { useEthics } from '../context/EthicsContext';
import { MEDIA_ASSETS } from '../data/assets';
import { PERSONAL_VALUES } from '../data/personalEthics';
import { PROFESSIONAL_STANDARDS } from '../data/professionalEthics';
import { DECISION_SCENARIOS } from '../data/decisionScenarios';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { EDUCATIONAL_VIDEOS } from '../data/youtubeVideos';
import { getTodaysDailyChallenge } from '../data/dailyChallenges';
import { MediaFrame } from '../components/MediaFrame';
import { OfficialResourcesSection } from '../components/OfficialResourcesSection';

export const HomePage: React.FC = () => {
  const { navigate, progress, recordScenarioChoice, reducedMotion, setSearchOpen } = useEthics();
  const todaysDaily = getTodaysDailyChallenge();
  const featuredScenario = DECISION_SCENARIOS[0];
  const [selectedFeaturedOption, setSelectedFeaturedOption] = useState<string | null>(
    progress.completedScenarios[featuredScenario.id] ?? null
  );

  const activeFeaturedChoice = featuredScenario.options.find(
    (o) => o.id === selectedFeaturedOption
  );

  const handleFeaturedSelect = (optionId: string) => {
    setSelectedFeaturedOption(optionId);
    recordScenarioChoice(featuredScenario.id, optionId);
  };

  const scrollToOverview = () => {
    const el = document.getElementById('experience-overview');
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const highlights = [
    {
      value: `${PERSONAL_VALUES.length}`,
      label: 'Personal Values',
      detail: `${progress.exploredPersonalIds.length} explored by you`,
      action: () => navigate('personal'),
    },
    {
      value: `${PROFESSIONAL_STANDARDS.length}`,
      label: 'Professional Standards',
      detail: `${progress.exploredProfessionalIds.length} studied by you`,
      action: () => navigate('professional'),
    },
    {
      value: `${DECISION_SCENARIOS.length}`,
      label: 'Theatre Dilemmas',
      detail: `${Object.keys(progress.completedScenarios).length} deliberated`,
      action: () => navigate('theatre'),
    },
    {
      value: `${QUIZ_QUESTIONS.length}`,
      label: 'Challenge Questions',
      detail: `${Object.keys(progress.quizRecords).length} of 4 quizzes completed`,
      action: () => navigate('quiz'),
    },
  ];

  const hallPreviews = [
    {
      id: 'learning' as const,
      index: '01',
      title: 'Ethics Learning Centre',
      meta: `${EDUCATIONAL_VIDEOS.length} Verified Videos · 3 Learning Paths · Case Studies`,
      description:
        'Watch curated YouTube ethics lectures with automatic 10-question Video Knowledge Challenges, structured learning paths, case studies, and a private reflection journal.',
      icon: PlayCircle,
      cta: 'Open Learning Centre',
    },
    {
      id: 'comparison' as const,
      index: '02',
      title: 'Ethics Face-Off',
      meta: '8 Dimensions · 5 Shared Values',
      description:
        'Compare Personal Ethics and Professional Ethics side by side across foundations, rules, responsibilities, and real decision-making.',
      icon: Scale,
      cta: 'Open Comparison',
    },
    {
      id: 'theatre' as const,
      index: '03',
      title: 'The Decision Theatre',
      meta: '6 Real-World Dilemmas · Multi-Perspective Analysis',
      description:
        'Step into realistic campus and workplace scenarios, weigh consequences, and examine how different ethical principles illuminate each choice.',
      icon: Theater,
      cta: 'Enter Theatre',
    },
    {
      id: 'quiz' as const,
      index: '04',
      title: 'Ethics Challenge',
      meta: '4 Categories · Instant Explanations',
      description:
        'Test your understanding across Personal, Professional, Comparison, and Mixed Challenges with clear feedback on every question.',
      icon: CheckCircle2,
      cta: 'Start Challenge',
    },
    {
      id: 'progress' as const,
      index: '05',
      title: 'Dashboard, Badges & Certificate',
      meta: '8 Badges · PDF Certificate · Saved Locally',
      description:
        'Track active study time, video & quiz averages, learning paths, earned badges, and download a PDF Certificate of Completion.',
      icon: Award,
      cta: 'View Dashboard',
    },
    {
      id: 'settings' as const,
      index: '06',
      title: 'Settings, Music Studio & Guide',
      meta: '14 Instrumental Tracks · Themes · Privacy Controls',
      description:
        'Customize themes and accessibility, play 14 royalty-free tracks across 7 categories, export your data, and read the How to Use guide.',
      icon: Sliders,
      cta: 'Open Settings',
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Hero Text Column */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <p className="text-xs sm:text-sm font-medium text-[#2563EB] dark:text-[#EAB308]">
                The Ethics Experience Centre
              </p>

              <h1 className="mt-3 font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-[#0B162C] dark:text-white">
                ETHICS IN ACTION
              </h1>

              <p className="mt-4 font-editorial italic text-xl sm:text-2xl text-[#1E3A8A] dark:text-[#FDE047]">
                “Every Choice Defines Who We Are.”
              </p>

              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Discover how values, principles and responsible decisions shape our personal lives,
                academic journeys and professional environments.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={scrollToOverview}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('learning', undefined, 'videos')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-[#2563EB] dark:text-[#EAB308]" aria-hidden="true" />
                  <span>Ethics Learning Centre</span>
                </button>
              </div>
            </motion.div>

            {/* Hero Architectural Visual Column */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex"
            >
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0F1A2E] flex flex-col">
                <MediaFrame
                  src={MEDIA_ASSETS.heroPavilion.src}
                  alt={MEDIA_ASSETS.heroPavilion.alt}
                  className="w-full h-full min-h-[280px] sm:min-h-[360px]"
                  imgClassName="w-full h-full object-cover"
                  fallbackTone="navy"
                />
              </div>
            </motion.div>
          </div>

          {/* Full-width 4-Column Highlights Strip below Hero */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="text-left group rounded-xl p-4 -m-2 hover:bg-slate-50 dark:hover:bg-slate-900/70 transition-colors cursor-pointer"
              >
                <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B162C] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#EAB308] transition-colors">
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0B162C] dark:text-slate-100">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {item.detail}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* INTRODUCTION & DUAL ETHICS PAVILIONS */}
      <section
        id="experience-overview"
        className="py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#2563EB] dark:text-[#60A5FA]">
              Two Interconnected Worlds · One Ethical Compass
            </p>
            <h2 className="mt-2 font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B162C] dark:text-white">
              Inside The Ethics Experience Centre
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Ethical living is not a static textbook list—it is practised daily at the intersection
              of personal character and professional duty. Explore both dedicated galleries below to
              see how inner values and institutional responsibilities reinforce one another.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Ethics Wing — Royal Blue & Purple */}
            <article className="rounded-2xl overflow-hidden border border-indigo-200/80 dark:border-indigo-900/70 bg-white dark:bg-[#0F1A2E] flex flex-col">
              <div className="aspect-[16/10] w-full overflow-hidden bg-indigo-950/10">
                <MediaFrame
                  src={MEDIA_ASSETS.personalWorld.src}
                  alt={MEDIA_ASSETS.personalWorld.alt}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                  fallbackTone="blue"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#2563EB] dark:text-[#93C5FD]">
                    <BookOpen className="w-4 h-4" aria-hidden="true" />
                    <span>Gallery I · Blue &amp; Purple Visual Identity</span>
                  </div>
                  <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                    Personal Ethics — The World of Values
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Explore Honesty, Integrity, Empathy, Respect, Responsibility, Accountability,
                    and Fairness through everyday scenarios, practical applications, and personal
                    reflections.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    {progress.exploredPersonalIds.length} / {PERSONAL_VALUES.length} values explored
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('personal')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#6D28D9] hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore Personal Ethics</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>

            {/* Professional Ethics Wing — Deep Navy & Gold */}
            <article className="rounded-2xl overflow-hidden border border-amber-200/80 dark:border-amber-900/50 bg-white dark:bg-[#0F1A2E] flex flex-col">
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950/10">
                <MediaFrame
                  src={MEDIA_ASSETS.professionalWorld.src}
                  alt={MEDIA_ASSETS.professionalWorld.alt}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                  fallbackTone="gold"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#9A670F] dark:text-[#EAB308]">
                    <Briefcase className="w-4 h-4" aria-hidden="true" />
                    <span>Gallery II · Gold &amp; Deep Navy Visual Identity</span>
                  </div>
                  <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                    Professional Ethics — The World of Responsibility
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Master Professional Integrity, Academic Honesty, Confidentiality, Data Privacy,
                    Fair Treatment, Teamwork, Accountability, and Public Responsibility in campuses
                    and workplaces.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    {progress.exploredProfessionalIds.length} / {PROFESSIONAL_STANDARDS.length} standards studied
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('professional')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#172B52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore Professional Ethics</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FEATURED ETHICAL DECISION SCENARIO */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#0A1324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-medium text-[#9A670F] dark:text-[#EAB308]">
                Featured Ethical Decision Scenario · Interactive Preview
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0B162C] dark:text-white">
                {featuredScenario.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {featuredScenario.setting} · {featuredScenario.ethicsFocus}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {featuredScenario.situation}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('theatre')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] dark:text-[#EAB308] hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>Explore all {DECISION_SCENARIOS.length} scenarios in the Decision Theatre</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FC] dark:bg-[#0F1A2E] p-6 sm:p-8">
              <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                What would you do? Select a decision to examine its ethical reasoning:
              </p>

              <div className="mt-4 space-y-2.5">
                {featuredScenario.options.map((opt, idx) => {
                  const isChosen = selectedFeaturedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleFeaturedSelect(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isChosen
                          ? 'border-[#2563EB] dark:border-[#EAB308] bg-white dark:bg-[#152440] shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0B1528] hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`font-mono text-xs font-semibold mt-0.5 shrink-0 ${
                            isChosen
                              ? 'text-[#2563EB] dark:text-[#EAB308]'
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="text-sm text-[#0B162C] dark:text-slate-100 leading-relaxed">
                          {opt.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {activeFeaturedChoice && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                      Ethical Lens: {activeFeaturedChoice.stance}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeFeaturedChoice.principlesInvolved.join(' · ')}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeFeaturedChoice.constructiveFeedback}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Perspective note: {activeFeaturedChoice.perspectiveNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW CARDS FOR ALL MAJOR SECTIONS */}
      <section className="py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#2563EB] dark:text-[#EAB308]">
                Complete Digital Curriculum
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#0B162C] dark:text-white">
                Explore Every Interactive Experience
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('learning', undefined, 'daily')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-indigo-200 dark:border-indigo-900/70 bg-[#EFF6FF]/70 dark:bg-[#132245] text-[#1E3A8A] dark:text-[#93C5FD] hover:border-[#2563EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Daily Challenge: {todaysDaily.category}</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>Search All Topics</span>
              </button>
              <Compass className="w-7 h-7 text-slate-400 dark:text-slate-500 hidden lg:block" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hallPreviews.map((hall) => {
              const Icon = hall.icon;
              return (
                <div
                  key={hall.id}
                  onClick={() => navigate(hall.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(hall.id);
                    }
                  }}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 flex flex-col justify-between gap-6 hover:border-[#2563EB]/60 dark:hover:border-[#EAB308]/60 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        {hall.index} · {hall.meta}
                      </span>
                      <Icon
                        className="w-5 h-5 text-[#2563EB] dark:text-[#EAB308] shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-3 font-editorial text-xl font-semibold text-[#0B162C] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#EAB308] transition-colors">
                      {hall.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {hall.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-[#0B162C] dark:text-slate-100">
                    <span>{hall.cta}</span>
                    <ArrowRight
                      className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#2563EB] dark:group-hover:text-[#EAB308] transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFICIAL ETHICS RESOURCES & SUPPORT */}
      <OfficialResourcesSection />
    </div>
  );
};
