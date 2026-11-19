import { jsPDF } from 'jspdf';

export interface CertificateOptions {
  recipientName: string;
  achievementTitle: string;
  completionDate: string;
  overallPercent: number;
  videosCompleted: number;
  quizzesCompleted: number;
}

export function downloadCertificatePdf(opts: CertificateOptions): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Deep navy frame + alabaster interior
  doc.setFillColor(248, 249, 252);
  doc.rect(0, 0, width, height, 'F');

  doc.setDrawColor(11, 22, 44);
  doc.setLineWidth(10);
  doc.rect(24, 24, width - 48, height - 48, 'S');

  doc.setDrawColor(180, 123, 27);
  doc.setLineWidth(1.5);
  doc.rect(38, 38, width - 76, height - 76, 'S');

  // Top Header Band
  doc.setFillColor(11, 22, 44);
  doc.rect(38, 38, width - 76, 86, 'F');

  doc.setTextColor(250, 204, 21);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('THE ETHICS EXPERIENCE CENTRE', width / 2, 70, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.text('ETHICS IN ACTION', width / 2, 103, { align: 'center' });

  // Certificate Title
  doc.setTextColor(180, 123, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('CERTIFICATE OF LEARNING ACHIEVEMENT', width / 2, 168, { align: 'center' });

  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('This certificate acknowledges that', width / 2, 204, { align: 'center' });

  // Recipient Name
  doc.setTextColor(11, 22, 44);
  doc.setFont('times', 'bold');
  doc.setFontSize(34);
  doc.text(opts.recipientName.trim() || 'Dedicated Learner', width / 2, 254, { align: 'center' });

  // Divider line under name
  doc.setDrawColor(180, 123, 27);
  doc.setLineWidth(1.2);
  doc.line(width / 2 - 170, 268, width / 2 + 170, 268);

  // Achievement Description
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('has demonstrated commitment to personal values, professional responsibility,', width / 2, 302, {
    align: 'center',
  });
  doc.text('and ethical reasoning by earning the distinction:', width / 2, 320, { align: 'center' });

  doc.setTextColor(37, 99, 235);
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.text(opts.achievementTitle, width / 2, 356, { align: 'center' });

  // Summary Metrics Strip
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(120, 382, width - 240, 48, 6, 6, 'F');
  doc.setTextColor(11, 22, 44);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(
    `Overall Progress: ${opts.overallPercent}%   •   Videos Completed: ${opts.videosCompleted}   •   Quizzes Completed: ${opts.quizzesCompleted}`,
    width / 2,
    410,
    { align: 'center' }
  );

  // Footer details & tagline
  doc.setTextColor(11, 22, 44);
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.text('“Every Choice Defines Who We Are.”', width / 2, 466, { align: 'center' });

  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Issued on ${opts.completionDate}`, 84, 514);
  doc.text('Ethics in Action — Digital Learning Record', width - 84, 514, { align: 'right' });

  // Honest non-accreditation disclaimer
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8.5);
  doc.text(
    'Self-paced educational completion record generated locally by Ethics in Action. Not an externally accredited degree or official university credential.',
    width / 2,
    542,
    { align: 'center' }
  );

  const safeFileName = (opts.recipientName.trim() || 'learner')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
  doc.save(`ethics-in-action-certificate-${safeFileName}.pdf`);
}
