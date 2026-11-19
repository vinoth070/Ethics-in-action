import React, { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ExternalLink,
  PlayCircle,
  BookOpen,
} from 'lucide-react';
import { EducationalVideo } from '../types/ethics';
import { getVideoQuizQuestions } from '../data/youtubeVideos';
import { useEthics } from '../context/EthicsContext';

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: () => void;
          };
        }
      ) => { destroy: () => void };
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise<void>((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      resolve();
    };
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
    // Safety fallback if API takes too long
    window.setTimeout(() => resolve(), 5000);
  });

  return ytApiPromise;
}

interface YouTubeLessonPlayerProps {
  video: EducationalVideo;
  onClose: () => void;
  onSelectNextVideo?: () => void;
}

export const YouTubeLessonPlayer: React.FC<YouTubeLessonPlayerProps> = ({
  video,
  onClose,
  onSelectNextVideo,
}) => {
  const {
    progress,
    markVideoCompleted,
    recordVideoQuizResult,
    toggleBookmark,
    isBookmarked,
  } = useEthics();

  const questions = getVideoQuizQuestions(video.id);
  const existingRecord = progress.videoQuizRecords[video.id];
  const alreadyCompleted = progress.completedVideoIds.includes(video.id);
  const savedBookmark = isBookmarked('video', video.id);

  const playerMountRef = useRef<HTMLDivElement | null>(null);
  const playerInstanceRef = useRef<{ destroy: () => void } | null>(null);
  const mountId = useId().replace(/:/g, '');

  const [apiReady, setApiReady] = useState(false);
  const [embedFallback, setEmbedFallback] = useState(false);
  const [playerStateLabel, setPlayerStateLabel] = useState<string>('Ready to play');
  const [videoJustFinished, setVideoJustFinished] = useState(false);

  // Quiz state
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizSectionRef = useRef<HTMLDivElement | null>(null);

  const launchQuiz = (autoTriggered: boolean) => {
    markVideoCompleted(video.id);
    setVideoJustFinished(autoTriggered);
    setQuizOpen(true);
    setQuizIndex(0);
    setAnswers({});
    setQuizSubmitted(false);
    setTimeout(() => {
      quizSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  useEffect(() => {
    let cancelled = false;
    setVideoJustFinished(false);
    setQuizOpen(false);
    setQuizIndex(0);
    setAnswers({});
    setQuizSubmitted(false);
    setEmbedFallback(false);
    setPlayerStateLabel('Loading YouTube player...');

    void loadYouTubeIframeApi().then(() => {
      if (cancelled) return;
      if (!window.YT || !window.YT.Player || !playerMountRef.current) {
        setEmbedFallback(true);
        setPlayerStateLabel('Standard YouTube embed active');
        return;
      }

      setApiReady(true);
      try {
        if (playerInstanceRef.current) {
          playerInstanceRef.current.destroy();
          playerInstanceRef.current = null;
        }
        playerInstanceRef.current = new window.YT.Player(playerMountRef.current, {
          videoId: video.id,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (!cancelled) setPlayerStateLabel('Ready — play video to start lesson');
            },
            onStateChange: (event) => {
              if (cancelled) return;
              if (event.data === 1) {
                setPlayerStateLabel('Playing video lesson');
              } else if (event.data === 2) {
                setPlayerStateLabel('Paused');
              } else if (event.data === 0) {
                setPlayerStateLabel('Video completed — opening 10-question quiz');
                launchQuiz(true);
              }
            },
            onError: () => {
              if (!cancelled) {
                setEmbedFallback(true);
                setPlayerStateLabel('Switched to standard embed view');
              }
            },
          },
        });
      } catch {
        setEmbedFallback(true);
        setPlayerStateLabel('Standard YouTube embed active');
      }
    });

    return () => {
      cancelled = true;
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch {
          // ignore
        }
        playerInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video.id]);

  const currentQuestion = questions[quizIndex];
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length;

  const handleChooseAnswer = (optionIdx: number) => {
    if (!currentQuestion || answers[currentQuestion.id] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIdx }));
  };

  const computeScore = () =>
    questions.reduce((sum, q) => sum + (answers[q.id] === q.correctIndex ? 1 : 0), 0);

  const handleSubmitQuiz = () => {
    const score = computeScore();
    recordVideoQuizResult(video.id, score, questions.length);
    setQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setQuizIndex(0);
    setAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0B162C] dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Video Library</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() =>
              toggleBookmark({
                id: `video:${video.id}`,
                type: 'video',
                targetId: video.id,
                title: video.title,
                subtitle: `${video.category} · ${video.channel}`,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              savedBookmark
                ? 'border-[#2563EB] dark:border-[#EAB308] bg-[#EFF6FF] dark:bg-[#192846] text-[#2563EB] dark:text-[#EAB308]'
                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${savedBookmark ? 'fill-current' : ''}`} aria-hidden="true" />
            <span>{savedBookmark ? 'Bookmarked' : 'Bookmark Video'}</span>
          </button>

          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#0B162C] dark:hover:text-white whitespace-nowrap shrink-0"
          >
            <span>Open on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Main Theater Player Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] overflow-hidden">
        <div className="aspect-video w-full bg-[#070D1A] relative">
          {!embedFallback ? (
            <div ref={playerMountRef} id={`yt-player-${mountId}`} className="w-full h-full" />
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <p className="text-xs font-medium text-[#2563EB] dark:text-[#EAB308]">
                {video.category} · {video.channel} · {video.duration}
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B162C] dark:text-white">
                {video.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {video.description}
              </p>
            </div>

            <div className="shrink-0 text-left lg:text-right space-y-1">
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Player: {playerStateLabel}
              </p>
              {existingRecord && (
                <p className="text-xs font-mono tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">
                  Best Quiz Score: {existingRecord.bestScore}/{existingRecord.totalQuestions} (
                  {Math.round((existingRecord.bestScore / existingRecord.totalQuestions) * 100)}%)
                </p>
              )}
            </div>
          </div>

          {/* Takeaways & Reflection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="lg:col-span-7 space-y-2.5">
              <h3 className="text-xs font-semibold text-[#0B162C] dark:text-white font-sans">
                Key Concepts Covered in This Lesson
              </h3>
              <ul className="space-y-2">
                {video.keyTakeaways.map((point, idx) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                  >
                    <span className="font-mono text-xs font-semibold text-[#2563EB] dark:text-[#EAB308] mt-0.5 shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 p-5 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-xs font-semibold text-[#9A670F] dark:text-[#EAB308]">
                Reflection Question
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {video.reflectionQuestion}
              </p>
            </div>
          </div>

          {/* Honest Completion Trigger Strip */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {apiReady && !embedFallback ? (
                <span>
                  When the video ends, the <strong>10-Question Video Knowledge Challenge</strong>{' '}
                  opens automatically. Finished early or watching directly on YouTube? Confirm
                  below.
                </span>
              ) : (
                <span>
                  Automatic end-of-video detection is limited in this embed mode. Click below once
                  you have finished watching to start the 10-question challenge.
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => launchQuiz(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" aria-hidden="true" />
              <span>
                {existingRecord
                  ? 'Revisit 10-Question Challenge'
                  : alreadyCompleted
                  ? 'Open 10-Question Challenge'
                  : 'I have finished watching'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* AUTOMATIC 10-QUESTION VIDEO KNOWLEDGE CHALLENGE */}
      {quizOpen && questions.length > 0 && (
        <div
          ref={quizSectionRef}
          className="rounded-2xl border border-[#2563EB]/40 dark:border-[#EAB308]/40 bg-white dark:bg-[#0F1A2E] overflow-hidden shadow-sm"
        >
          {/* Celebration Header */}
          <div className="p-6 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-[#EFF6FF] via-white to-amber-50/50 dark:from-[#122044] dark:via-[#0F1A2E] dark:to-[#1B2235]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {videoJustFinished
                      ? 'Video Completed — Automatic Knowledge Challenge Unlocked'
                      : 'Video Knowledge Challenge · 10 Topic-Specific Questions'}
                  </span>
                </p>
                <h3 className="mt-1 font-editorial text-2xl font-bold text-[#0B162C] dark:text-white">
                  {video.title}
                </h3>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                {answeredCount} / {questions.length} answered
              </span>
            </div>
          </div>

          {!quizSubmitted && currentQuestion ? (
            <div>
              {/* Question Progress & Jump Numbers */}
              <div className="px-6 sm:px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono tabular-nums text-slate-600 dark:text-slate-300">
                  <span>
                    Question {quizIndex + 1} of {questions.length} · {currentQuestion.difficulty}
                  </span>
                  <span>{Math.round(((quizIndex + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {questions.map((q, idx) => {
                    const ans = answers[q.id] !== undefined;
                    const curr = idx === quizIndex;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setQuizIndex(idx)}
                        className={`w-7 h-7 rounded-md font-mono text-xs font-semibold transition-colors cursor-pointer ${
                          curr
                            ? 'bg-[#0B162C] text-white dark:bg-[#EAB308] dark:text-[#070D1A]'
                            : ans
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-white dark:bg-[#0F1A2E] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Question */}
              <div className="p-6 sm:p-8">
                <h4 className="font-editorial text-xl sm:text-2xl font-semibold text-[#0B162C] dark:text-white leading-snug">
                  {currentQuestion.prompt}
                </h4>

                <div className="mt-6 space-y-3">
                  {currentQuestion.options.map((opt, idx) => {
                    const chosen = answers[currentQuestion.id];
                    const isAnswered = chosen !== undefined;
                    const isSelected = chosen === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;

                    let cls =
                      'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1528] hover:border-slate-400 dark:hover:border-slate-600';
                    if (isAnswered) {
                      if (isCorrect) {
                        cls =
                          'border-emerald-500 dark:border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40';
                      } else if (isSelected) {
                        cls = 'border-red-500 dark:border-red-400 bg-red-50/70 dark:bg-red-950/40';
                      } else {
                        cls = 'border-slate-200/70 dark:border-slate-800/70 opacity-75';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleChooseAnswer(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${cls} ${
                          isAnswered ? 'cursor-default' : 'cursor-pointer'
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
                        {isAnswered && isCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0">
                            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                            <span>Correct</span>
                          </span>
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 shrink-0">
                            <XCircle className="w-4 h-4" aria-hidden="true" />
                            <span>Selected</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {answers[currentQuestion.id] !== undefined && (
                  <div className="mt-6 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1426] space-y-1.5">
                    <p className="text-xs font-semibold text-[#0B162C] dark:text-white">
                      Explanation
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="px-6 sm:px-8 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={quizIndex === 0}
                  onClick={() => setQuizIndex((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Previous</span>
                </button>

                {quizIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setQuizIndex((i) => i + 1)}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={answeredCount < questions.length}
                    onClick={handleSubmitQuiz}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#EAB308] dark:text-[#070D1A] disabled:opacity-45 cursor-pointer"
                  >
                    <span>
                      {answeredCount < questions.length
                        ? `Answer All (${answeredCount}/${questions.length})`
                        : 'Finish & See Score'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Final 10-Question Results View */
            <div className="p-6 sm:p-8 space-y-6">
              {(() => {
                const score = computeScore();
                const pct = Math.round((score / questions.length) * 100);
                const wrong = questions.length - score;
                return (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                          Video Knowledge Challenge Results
                        </p>
                        <h4 className="mt-1 font-editorial text-3xl font-bold text-[#0B162C] dark:text-white">
                          Score: {score} / {questions.length} ({pct}%)
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {score} correct · {wrong} incorrect · Saved automatically to your Learning
                          Dashboard
                        </p>
                      </div>
                      <Award className="w-10 h-10 text-[#B47B1B] dark:text-[#EAB308] shrink-0" aria-hidden="true" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleRetakeQuiz}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        <span>Retake Quiz</span>
                      </button>

                      {onSelectNextVideo && (
                        <button
                          type="button"
                          onClick={onSelectNextVideo}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-700 text-[#0B162C] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" aria-hidden="true" />
                          <span>Continue Learning</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-4 pt-4">
                      {questions.map((q, idx) => {
                        const chosen = answers[q.id];
                        const ok = chosen === q.correctIndex;
                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1426] space-y-1.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-semibold text-[#0B162C] dark:text-white">
                                <span className="font-mono text-slate-400 mr-2">
                                  {String(idx + 1).padStart(2, '0')}.
                                </span>
                                {q.prompt}
                              </p>
                              <span
                                className={`text-xs font-semibold shrink-0 ${
                                  ok
                                    ? 'text-emerald-700 dark:text-emerald-400'
                                    : 'text-red-700 dark:text-red-400'
                                }`}
                              >
                                {ok ? 'Correct' : 'Incorrect'}
                              </span>
                            </div>
                            {!ok && chosen !== undefined && (
                              <p className="text-xs text-red-700 dark:text-red-300">
                                Your answer: {q.options[chosen]}
                              </p>
                            )}
                            <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                              Correct answer: {q.options[q.correctIndex]}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {q.explanation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
