import React, { useState } from 'react';
import { Award, Download, CheckCircle2, Lock } from 'lucide-react';
import { useEthics } from '../context/EthicsContext';
import { downloadCertificatePdf } from '../utils/certificatePdf';

export const CertificateCard: React.FC = () => {
  const { progress, overallCompletionPercent, completedPathsCount } = useEthics();
  const [displayName, setDisplayName] = useState('');
  const [downloadedNotice, setDownloadedNotice] = useState(false);

  const videosCompleted = progress.completedVideoIds.length;
  const totalQuizzes =
    Object.keys(progress.quizRecords).length + Object.keys(progress.videoQuizRecords).length;

  const isEligible =
    overallCompletionPercent >= 15 ||
    videosCompleted >= 1 ||
    totalQuizzes >= 1 ||
    progress.exploredPersonalIds.length >= 2 ||
    progress.exploredProfessionalIds.length >= 2;

  const achievementTitle =
    overallCompletionPercent >= 75 || completedPathsCount >= 2
      ? 'Ethics in Action Learning Champion'
      : overallCompletionPercent >= 40 || completedPathsCount >= 1
      ? 'Personal & Professional Ethics Fellow'
      : 'Foundations of Ethical Reasoning';

  const formattedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownload = () => {
    downloadCertificatePdf({
      recipientName: displayName.trim() || 'Dedicated Learner',
      achievementTitle,
      completionDate: formattedDate,
      overallPercent: overallCompletionPercent,
      videosCompleted,
      quizzesCompleted: totalQuizzes,
    });
    setDownloadedNotice(true);
    setTimeout(() => setDownloadedNotice(false), 4000);
  };

  return (
    <section
      aria-labelledby="certificate-heading"
      className="rounded-2xl border border-amber-200/90 dark:border-amber-900/50 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-[#9A670F] dark:text-[#EAB308]">
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>Certificate of Completion · PDF Download</span>
          </div>
          <h2
            id="certificate-heading"
            className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0B162C] dark:text-white"
          >
            Download Your Learning Certificate
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Once you complete at least one video, quiz, or two ethics modules, enter your name
            below to generate a printable PDF record of your self-paced learning achievement.
          </p>

          <div className="space-y-3 pt-1">
            <div>
              <label
                htmlFor="certificate-name-input"
                className="block text-xs font-semibold text-[#0B162C] dark:text-slate-200 mb-1.5"
              >
                Display Name on Certificate
              </label>
              <input
                id="certificate-name-input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1426] text-sm text-[#0B162C] dark:text-white"
              />
            </div>

            {isEligible ? (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Certificate as PDF</span>
                </button>
                {downloadedNotice && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span>PDF certificate downloaded</span>
                  </span>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Complete at least 1 video, 1 quiz, or 2 ethics value modules to unlock PDF
                  certificate download.
                </span>
              </div>
            )}

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Note: This certificate is a self-paced educational completion record generated locally
              and does not represent external university accreditation or official certification.
            </p>
          </div>
        </div>

        {/* Live Visual Preview */}
        <div className="lg:col-span-6">
          <div className="rounded-xl border-2 border-[#0B162C] dark:border-[#EAB308]/60 bg-[#F8F9FC] dark:bg-[#0A1324] p-6 text-center space-y-3 shadow-sm">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#9A670F] dark:text-[#EAB308]">
              The Ethics Experience Centre
            </p>
            <p className="font-editorial text-xl font-bold text-[#0B162C] dark:text-white">
              ETHICS IN ACTION
            </p>
            <div className="h-px bg-slate-200 dark:bg-slate-800 w-32 mx-auto" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Presented to</p>
            <p className="font-editorial text-2xl font-semibold text-[#0B162C] dark:text-white truncate">
              {displayName.trim() || 'Your Name Here'}
            </p>
            <p className="text-xs font-semibold text-[#2563EB] dark:text-[#93C5FD]">
              {achievementTitle}
            </p>
            <p className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
              {formattedDate} · {overallCompletionPercent}% Progress · {videosCompleted} Videos ·{' '}
              {totalQuizzes} Quizzes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
