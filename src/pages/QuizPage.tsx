import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  BookOpen,
  Bookmark,
} from 'lucide-react';
import { QUIZ_CATEGORIES, getQuestionsForCategory } from '../data/quizData';
import { QuizCategoryId } from '../types/ethics';
import { useEthics } from '../context/EthicsContext';

export const QuizPage: React.FC = () => {
  const { progress, recordQuizResult, navigate, toggleBookmark, isBookmarked } = useEthics();
  const [activeCategory, setActiveCategory] = useState<QuizCategoryId | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const questions = useMemo(
    () => (activeCategory ? getQuestionsForCategory(activeCategory) : []),
    [activeCategory]
  );

  const activeMeta = QUIZ_CATEGORIES.find((c) => c.id === activeCategory) ?? null;
  const currentQuestion = questions[currentIndex];
  const answeredCount = questions.filter((q) => selectedAnswers[q.id] !== undefined).length;

  const startQuiz = (categoryId: QuizCategoryId) => {
    setActiveCategory(categoryId);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    // Allow choosing once per question so feedback and scoring stay honest
    if (selectedAnswers[currentQuestion.id] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const calculateScore = () => {
    return questions.reduce((sum, q) => {
      return sum + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  };

  const handleFinishQuiz = () => {
    if (!activeCategory) return;
    const finalScore = calculateScore();
    recordQuizResult(activeCategory, finalScore, questions.length);
    setShowResults(true);
  };

  const handleRetake = () => {
    if (!activeCategory) return;
    startQuiz(activeCategory);
  };

  // CATEGORY SELECTION HUB
  if (!activeCategory || !activeMeta) {
    return (
      <div className="pb-16">
        <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A1324]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-medium text-[#2563EB] dark:text-[#EAB308]">
                Ethics Challenge · Interactive Knowledge Assessment
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B162C] dark:text-white">
                Test Your Ethical Reasoning
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Select a quiz category below. Every question includes four choices, instant
                explanations, progress tracking, and a full review screen at completion.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {QUIZ_CATEGORIES.map((cat, idx) => {
              const record = progress.quizRecords[cat.id];
              const accentClass =
                cat.accent === 'blue'
                  ? 'text-[#2563EB] dark:text-[#93C5FD]'
                  : cat.accent === 'gold'
                  ? 'text-[#9A670F] dark:text-[#EAB308]'
                  : cat.accent === 'indigo'
                  ? 'text-[#4F46E5] dark:text-[#C4B5FD]'
                  : 'text-[#0B162C] dark:text-white';

              return (
                <article
                  key={cat.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 flex flex-col justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-xs font-mono font-semibold ${accentClass}`}>
                        0{idx + 1} · {cat.questionCount} Questions
                      </span>
                      <div className="flex items-center gap-3">
                        {record && (
                          <span className="text-xs font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                            Best: {record.bestScore}/{record.totalQuestions} (
                            {Math.round((record.bestScore / record.totalQuestions) * 100)}%)
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            toggleBookmark({
                              id: `quiz-${cat.id}`,
                              type: 'quiz',
                              targetId: cat.id,
                              title: cat.title,
                              subtitle: `Ethics Challenge · ${cat.questionCount} Questions`,
                            })
                          }
                          aria-label={isBookmarked('quiz', cat.id) ? `Remove ${cat.title} bookmark` : `Bookmark ${cat.title}`}
                          aria-pressed={isBookmarked('quiz', cat.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isBookmarked('quiz', cat.id)
                              ? 'border-[#2563EB] text-[#2563EB] dark:border-[#EAB308] dark:text-[#EAB308]'
                              : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                          }`}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${isBookmarked('quiz', cat.id) ? 'fill-current' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    <h2 className="mt-2 font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
                      {cat.title}
                    </h2>
                    <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {record
                        ? `${record.attempts} ${record.attempts === 1 ? 'attempt' : 'attempts'} saved locally`
                        : 'Not attempted yet'}
                    </span>
                    <button
                      type="button"
                      onClick={() => startQuiz(cat.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{record ? 'Retake Quiz' : 'Start Quiz'}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // FINAL RESULTS SCREEN
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const tierMessage =
      percentage >= 85
        ? 'Outstanding ethical clarity across values, standards, and nuanced reasoning.'
        : percentage >= 65
        ? 'Solid foundation! Review any missed explanations below to sharpen your perspective.'
        : 'A great starting point—revisit the Personal, Professional, and Comparison halls and try again.';

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                Challenge Complete · {activeMeta.title}
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-bold text-[#0B162C] dark:text-white">
                You scored {score} out of {questions.length}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                {tierMessage}
              </p>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <div className="inline-flex items-center gap-2 text-[#B47B1B] dark:text-[#EAB308]">
                <Award className="w-6 h-6" aria-hidden="true" />
                <span className="font-mono tabular-nums text-4xl font-bold text-[#0B162C] dark:text-white">
                  {percentage}%
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Saved to Progress Centre</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Retake Quiz</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>All Quiz Categories</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('progress')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#2563EB] dark:text-[#93C5FD] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View Achievement Centre</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Detailed Question Review */}
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-5">
            <h2 className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white">
              Answer Explanations
            </h2>
            {questions.map((q, idx) => {
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1426] space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-[#0B162C] dark:text-white leading-snug">
                      <span className="font-mono text-slate-400 mr-2">0{idx + 1}.</span>
                      {q.prompt}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold shrink-0 ${
                        isCorrect
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-red-700 dark:text-red-400'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  </div>
                  {!isCorrect && userChoice !== undefined && (
                    <p className="text-xs text-red-700 dark:text-red-300">
                      Your answer: {q.options[userChoice]}
                    </p>
                  )}
                  <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                    Correct answer: {q.options[q.correctIndex]}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE QUESTION RUNNER
  const selectedForCurrent = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const isCurrentAnswered = selectedForCurrent !== undefined;
  const isCurrentCorrect =
    currentQuestion && selectedForCurrent === currentQuestion.correctIndex;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#0B162C] dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Quiz Categories</span>
        </button>

        <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
          {activeMeta.title} · Answered {answeredCount} of {questions.length}
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] overflow-hidden">
        {/* Progress Indicator & Quick Question Navigator */}
        <div className="p-6 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426]">
          <div className="flex items-center justify-between text-xs font-mono tabular-nums text-slate-600 dark:text-slate-300">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="mt-2.5 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563EB] to-[#B47B1B] dark:from-[#60A5FA] dark:to-[#EAB308] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5" aria-label="Jump to question">
            {questions.map((q, idx) => {
              const answered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to question ${idx + 1}${answered ? ' (answered)' : ''}`}
                  className={`w-7 h-7 rounded-md font-mono text-xs font-semibold transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#0B162C] text-white dark:bg-[#EAB308] dark:text-[#070D1A]'
                      : answered
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-[#0F1A2E] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Prompt & Options */}
        {currentQuestion && (
          <div className="p-6 sm:p-8">
            <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[#0B162C] dark:text-white leading-snug">
              {currentQuestion.prompt}
            </h2>

            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedForCurrent === idx;
                const isCorrectOption = idx === currentQuestion.correctIndex;

                let stateClasses =
                  'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1528] hover:border-slate-400 dark:hover:border-slate-600';

                if (isCurrentAnswered) {
                  if (isCorrectOption) {
                    stateClasses =
                      'border-emerald-500 dark:border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40';
                  } else if (isSelected && !isCorrectOption) {
                    stateClasses =
                      'border-red-500 dark:border-red-400 bg-red-50/70 dark:bg-red-950/40';
                  } else {
                    stateClasses =
                      'border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-[#0B1528]/60 opacity-75';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isCurrentAnswered}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${stateClasses} ${
                      isCurrentAnswered ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 shrink-0">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="text-sm sm:text-base text-[#0B162C] dark:text-slate-100 leading-relaxed">
                        {opt}
                      </span>
                    </div>

                    {isCurrentAnswered && isCorrectOption && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        <span>Correct</span>
                      </span>
                    )}
                    {isCurrentAnswered && isSelected && !isCorrectOption && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 shrink-0">
                        <XCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Selected</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Explanation Feedback */}
            {isCurrentAnswered && (
              <div
                className={`mt-6 p-5 rounded-xl border ${
                  isCurrentCorrect
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30'
                    : 'border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30'
                }`}
              >
                <p
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    isCurrentCorrect
                      ? 'text-emerald-800 dark:text-emerald-300'
                      : 'text-amber-900 dark:text-amber-300'
                  }`}
                >
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Correct Answer</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Not Quite — Here Is Why</span>
                    </>
                  )}
                </p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Previous / Next Footer Controls */}
        <div className="px-6 sm:px-8 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Previous</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishQuiz}
              disabled={answeredCount < questions.length}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>
                {answeredCount < questions.length
                  ? `Answer All (${answeredCount}/${questions.length})`
                  : 'View Results'}
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
