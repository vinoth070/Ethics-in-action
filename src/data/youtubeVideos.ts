import { EducationalVideo, VideoCategory, VideoQuizQuestion } from '../types/ethics';
import { VIDEO_QUIZZES_PART_1 } from './videoQuizzesPart1';
import { VIDEO_QUIZZES_PART_2 } from './videoQuizzesPart2';
import { VIDEO_QUIZZES_PART_3 } from './videoQuizzesPart3';

export const VIDEO_CATEGORIES: VideoCategory[] = [
  'Introduction to Ethics',
  'Personal Ethics',
  'Professional Ethics',
  'Workplace Ethics',
  'Academic Integrity',
  'Honesty and Integrity',
  'Leadership Ethics',
  'Business Ethics',
  'Data Privacy and Confidentiality',
  'Social Responsibility',
  'Ethical Decision Making',
  'Real-Life Ethical Dilemmas',
  'Teamwork and Accountability',
  'Respect and Equality',
  'Corporate Social Responsibility',
];

export const EDUCATIONAL_VIDEOS: EducationalVideo[] = [
  {
    id: 'FOoffXFpAlU',
    title: 'Metaethics: Crash Course Philosophy #32',
    channel: 'CrashCourse',
    category: 'Introduction to Ethics',
    duration: '10:35',
    description:
      'An accessible foundation exploring what morality is, where moral values come from, and how moral realism, relativism, and absolutism shape ethical debates.',
    thumbnailUrl: 'https://i.ytimg.com/vi/FOoffXFpAlU/hqdefault.jpg',
    keyTakeaways: [
      'Metaethics examines the origin and meaning of moral claims.',
      'Moral realism argues that objective moral truths exist beyond personal taste.',
      'Understanding foundational differences makes moral dialogue more constructive.',
    ],
    reflectionQuestion:
      'Do you think core values like honesty and fairness are universal human principles, or shaped mostly by culture? Why?',
  },
  {
    id: 'PrvtOWEXDIQ',
    title: 'Aristotle & Virtue Theory: Crash Course Philosophy #38',
    channel: 'CrashCourse',
    category: 'Personal Ethics',
    duration: '9:22',
    description:
      'Discover how Aristotle linked personal character, the Golden Mean, daily habits, and practical wisdom to human flourishing (eudaimonia).',
    thumbnailUrl: 'https://i.ytimg.com/vi/PrvtOWEXDIQ/hqdefault.jpg',
    keyTakeaways: [
      'Virtue ethics focuses on cultivating strong character through everyday habits.',
      'The Golden Mean places virtue between deficiency and excess.',
      'Practical wisdom helps apply virtues thoughtfully in nuanced personal choices.',
    ],
    reflectionQuestion:
      'Which personal virtue—such as courage, honesty, or patience—is hardest to balance between too little and too much in your daily life?',
  },
  {
    id: 'auePL3pYRb0',
    title: 'Conflict of Interest | Ethics Defined',
    channel: 'McCombs School of Business (UT Austin)',
    category: 'Professional Ethics',
    duration: '1:39',
    description:
      'From the university-produced Ethics Unwrapped series: learn why personal interests can cloud professional judgment and how disclosure and recusal safeguard trust.',
    thumbnailUrl: 'https://i.ytimg.com/vi/auePL3pYRb0/hqdefault.jpg',
    keyTakeaways: [
      'Even the appearance of a conflict of interest can damage professional credibility.',
      'Prompt disclosure and recusal protect fair, impartial institutional decisions.',
      'Self-serving bias often operates subtly without conscious intent.',
    ],
    reflectionQuestion:
      'How would you explain to a close friend why you must recuse yourself from judging their competition entry?',
  },
  {
    id: 'h_sufC5nY18',
    title: 'Moral Reasoning | Ethics Defined',
    channel: 'McCombs School of Business (UT Austin)',
    category: 'Workplace Ethics',
    duration: '1:43',
    description:
      'Explores how deliberate moral reasoning helps professionals evaluate facts, resist workplace rationalization, and choose fair actions under pressure.',
    thumbnailUrl: 'https://i.ytimg.com/vi/h_sufC5nY18/hqdefault.jpg',
    keyTakeaways: [
      'Moral reasoning weighs facts, stakeholders, and principles before acting.',
      'Rationalization works backward to excuse convenient shortcuts.',
      'Consulting trusted peers exposes blind spots in workplace decisions.',
    ],
    reflectionQuestion:
      'What workplace pressures most often turn an ethical choice into a rushed "business-only" decision?',
  },
  {
    id: '8_SxY2jpRFc',
    title: 'Academic Integrity | Plagiarism: One Form of Academic Dishonesty',
    channel: 'HumberEDU',
    category: 'Academic Integrity',
    duration: '3:56',
    description:
      'A clear university guide to understanding direct plagiarism, mosaic patchwriting, self-plagiarism, and practical citation habits that protect scholarly honesty.',
    thumbnailUrl: 'https://i.ytimg.com/vi/8_SxY2jpRFc/hqdefault.jpg',
    keyTakeaways: [
      'Both verbatim quotes and paraphrased ideas require accurate attribution.',
      'Careless note-taking can cause unintentional plagiarism.',
      'Academic integrity protects the genuine value of degrees and original inquiry.',
    ],
    reflectionQuestion:
      'What note-taking or time-management habit helps you avoid rushed citation errors before assignment deadlines?',
  },
  {
    id: 'bD8Vc6Y6EIQ',
    title: 'Integrity | Ethics Defined',
    channel: 'McCombs School of Business (UT Austin)',
    category: 'Honesty and Integrity',
    duration: '1:04',
    description:
      'A crisp institutional explainer on what integrity truly means: living with unbroken alignment between core ethical values, words, and private actions.',
    thumbnailUrl: 'https://i.ytimg.com/vi/bD8Vc6Y6EIQ/hqdefault.jpg',
    keyTakeaways: [
      'Integrity means honouring ethical standards even when unobserved.',
      'Small everyday compromises gradually dull moral awareness.',
      'Owning mistakes honestly strengthens—rather than weakens—integrity.',
    ],
    reflectionQuestion:
      'Why is honesty especially important in small everyday moments when nobody is keeping score?',
  },
  {
    id: 'Nmsl1xVx7Ec',
    title: 'Ethical Leadership, Part 1: Perilous at the Top | Concepts Unwrapped',
    channel: 'McCombs School of Business (UT Austin)',
    category: 'Leadership Ethics',
    duration: '7:50',
    description:
      'Examines why power and success create unique ethical hazards for leaders, how tone at the top shapes team norms, and why welcoming dissent prevents crises.',
    thumbnailUrl: 'https://i.ytimg.com/vi/Nmsl1xVx7Ec/hqdefault.jpg',
    keyTakeaways: [
      'Power can insulate leaders from honest warnings unless dissent is actively invited.',
      'What leaders reward and tolerate defines real organizational culture.',
      'Humility and uniform accountability guard against entitlement at the top.',
    ],
    reflectionQuestion:
      'How can a student club president or team lead make it genuinely safe for newer members to voice ethical concerns?',
  },
  {
    id: 'XjiRF_6cvcA',
    title: 'Introduction to Leadership, Ethics, and Corporate Accountability',
    channel: 'Harvard Business School Online',
    category: 'Business Ethics',
    duration: '2:15',
    description:
      'Introduces how leaders navigate grey-area business dilemmas by balancing economic performance, legal duties, and ethical accountability to all stakeholders.',
    thumbnailUrl: 'https://i.ytimg.com/vi/XjiRF_6cvcA/hqdefault.jpg',
    keyTakeaways: [
      'Legal compliance is the minimum floor, not the ceiling, of business ethics.',
      'Stakeholder stewardship considers customers, employees, investors, and communities.',
      'Grey-area dilemmas demand reflective ethical judgment beyond checklists.',
    ],
    reflectionQuestion:
      'Can personal values positively influence tough corporate decisions—and where might they be tested most?',
  },
  {
    id: 'w82B8bXAd1s',
    title: 'AI, Deepfakes, and Data Privacy in the Digital Age',
    channel: 'TEDx Talks',
    category: 'Data Privacy and Confidentiality',
    duration: '12:47',
    description:
      'Explores digital privacy, synthetic media risks, informed consent, and responsible data stewardship in an era of rapidly advancing artificial intelligence.',
    thumbnailUrl: 'https://i.ytimg.com/vi/w82B8bXAd1s/hqdefault.jpg',
    keyTakeaways: [
      'Data minimization and informed consent protect human dignity online.',
      'Never paste confidential or personal records into unauthorized public AI tools.',
      'Out-of-band verification defends against deepfake impersonation.',
    ],
    reflectionQuestion:
      'What everyday habit can you adopt today to protect both your own digital privacy and the consent of peers?',
  },
  {
    id: '1EmvT9EDsTk',
    title: 'Business Ethics and Social Responsibility',
    channel: 'OpenTuition',
    category: 'Social Responsibility',
    duration: '12:32',
    description:
      'A structured educational lecture covering stakeholder theory, the Triple Bottom Line (People, Planet, Profit), supply-chain ethics, and societal accountability.',
    thumbnailUrl: 'https://i.ytimg.com/vi/1EmvT9EDsTk/hqdefault.jpg',
    keyTakeaways: [
      'Social responsibility evaluates impact across People, Planet, and Profit.',
      'Ethical responsibility extends upstream into supply chains and externalities.',
      'Measurable transparency separates genuine responsibility from empty PR.',
    ],
    reflectionQuestion:
      'What everyday choices as a student, consumer, or future professional express social responsibility?',
  },
  {
    id: 'uViluUWvotg',
    title: '4 Steps to Ethical Decision-Making',
    channel: 'Ethic Corner',
    category: 'Ethical Decision Making',
    duration: '2:52',
    description:
      'Walks through a practical 4-step ethical decision framework: clarifying facts, brainstorming creative alternatives, weighing stakeholders and principles, and reflecting after action.',
    thumbnailUrl: 'https://i.ytimg.com/vi/uViluUWvotg/hqdefault.jpg',
    keyTakeaways: [
      'Pause to verify facts and identify affected stakeholders first.',
      'Look beyond false either-or choices for constructive third alternatives.',
      'Reviewing outcomes afterward sharpens future moral judgment.',
    ],
    reflectionQuestion:
      'Think of a recent tough choice: what creative third option might have appeared if you had paused for two minutes first?',
  },
  {
    id: 'yg16u_bzjPE',
    title: 'Would you sacrifice one person to save five? — Eleanor Nelsen',
    channel: 'TED-Ed',
    category: 'Real-Life Ethical Dilemmas',
    duration: '4:56',
    description:
      'Explores the famous Trolley Problem to illustrate why utilitarian outcomes and duty-based individual rights often pull our moral intuitions in opposite directions.',
    thumbnailUrl: 'https://i.ytimg.com/vi/yg16u_bzjPE/hqdefault.jpg',
    keyTakeaways: [
      'Utilitarianism focuses on maximizing overall net well-being.',
      'Deontology insists individuals possess rights and must not be used merely as tools.',
      'Thought experiments reveal the competing principles behind real dilemmas.',
    ],
    reflectionQuestion:
      'When two thoughtful people disagree on a hard ethical trade-off, how does understanding both outcomes and duties help the conversation?',
  },
  {
    id: 'u8KpQatf3mw',
    title: 'Moral Myopia | Ethics Defined',
    channel: 'McCombs School of Business (UT Austin)',
    category: 'Teamwork and Accountability',
    duration: '1:42',
    description:
      'Reveals how narrow focus on deadlines, grades, or metrics causes teams to miss obvious ethical issues—and how open dialogue restores accountability.',
    thumbnailUrl: 'https://i.ytimg.com/vi/u8KpQatf3mw/hqdefault.jpg',
    keyTakeaways: [
      'Moral myopia happens when short-term tunnel vision hides ethical consequences.',
      'Diverse perspectives and pre-mortem reviews widen a team’s ethical vision.',
      'Shared team accountability prevents bystander silence and unfair credit.',
    ],
    reflectionQuestion:
      'How should a student or workplace team handle unfair credit distribution before presenting a joint project?',
  },
  {
    id: 'yru1oKJTQro',
    title: 'Empathy is our Superpower! | Anita Nowak, Ph.D.',
    channel: 'TEDx Talks',
    category: 'Respect and Equality',
    duration: '11:31',
    description:
      'An engaging academic talk showing how cognitive empathy, active listening, and compassionate inclusion bridge divides and uphold equal human dignity.',
    thumbnailUrl: 'https://i.ytimg.com/vi/yru1oKJTQro/hqdefault.jpg',
    keyTakeaways: [
      'Empathy honours equal dignity—standing beside others rather than looking down.',
      'Active listening without interruption is a powerful everyday act of respect.',
      'Empathy can be intentionally strengthened and extended beyond our immediate circle.',
    ],
    reflectionQuestion:
      'How can you practise deeper active listening when someone shares a viewpoint that challenges your assumptions?',
  },
  {
    id: 'ZoKihFLCY0s',
    title: 'What Is Corporate Social Responsibility (CSR)? | Business: Explained',
    channel: 'Harvard Business School Online',
    category: 'Corporate Social Responsibility',
    duration: '2:55',
    description:
      'Breaks down the four core pillars of CSR—Environmental, Ethical, Philanthropic, and Economic—and explains why authentic accountability outperforms greenwashing.',
    thumbnailUrl: 'https://i.ytimg.com/vi/ZoKihFLCY0s/hqdefault.jpg',
    keyTakeaways: [
      'CSR rests on four pillars: environmental, ethical, philanthropic, and economic.',
      'Embedded operational ethics matters more than surface-level greenwashing.',
      'Measurable audits and transparent reporting keep CSR commitments real.',
    ],
    reflectionQuestion:
      'What concrete evidence helps you tell whether an organization’s CSR initiative is authentic or merely superficial marketing?',
  },
];

const ALL_VIDEO_QUIZZES: Record<string, VideoQuizQuestion[]> = {
  ...VIDEO_QUIZZES_PART_1,
  ...VIDEO_QUIZZES_PART_2,
  ...VIDEO_QUIZZES_PART_3,
};

export function getVideoQuizQuestions(videoId: string): VideoQuizQuestion[] {
  return ALL_VIDEO_QUIZZES[videoId] ?? [];
}
