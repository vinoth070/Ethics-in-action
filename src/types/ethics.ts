export type PageId =
  | 'home'
  | 'personal'
  | 'professional'
  | 'comparison'
  | 'theatre'
  | 'quiz'
  | 'learning'
  | 'progress'
  | 'settings';

export type LearningTabId =
  | 'videos'
  | 'paths'
  | 'cases'
  | 'daily'
  | 'journal'
  | 'bookmarks';

export type ThemeMode = 'light' | 'dark';
export type TextSizeMode = 'normal' | 'large';

export interface PersonalValueItem {
  id: string;
  index: string;
  name: string;
  tagline: string;
  definition: string;
  whyItMatters: string;
  realLifeExamples: { title: string; detail: string }[];
  everydayApplications: string[];
  practicalSituation: {
    title: string;
    context: string;
    prompt: string;
    choices: {
      label: string;
      reflection: string;
      alignment: 'strong' | 'nuanced' | 'caution';
    }[];
  };
  reflectionPrompt: string;
  reflectionOptions: string[];
}

export interface ProfessionalStandardItem {
  id: string;
  index: string;
  name: string;
  domain: string;
  definition: string;
  importance: string;
  practicalApplications: string[];
  realWorldExamples: { context: string; illustration: string }[];
  professionalScenario: {
    setting: string;
    dilemma: string;
    ethicalAction: string;
    whyItWorks: string;
  };
  ethicalResponsibilities: string[];
}

export interface ComparisonCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  personal: {
    summary: string;
    details: string[];
    example: string;
  };
  professional: {
    summary: string;
    details: string[];
    example: string;
  };
  keyTakeaway: string;
}

export interface CommonValueBridge {
  id: string;
  name: string;
  coreMeaning: string;
  inPersonalLife: string;
  inProfessionalLife: string;
  synergyInsight: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  stance: string;
  shortTermConsequences: string;
  longTermConsequences: string;
  principlesInvolved: string[];
  constructiveFeedback: string;
  perspectiveNote: string;
}

export interface DecisionScenario {
  id: string;
  number: string;
  title: string;
  contextLabel: string;
  ethicsFocus: 'Personal Ethics' | 'Professional Ethics' | 'Personal & Professional Ethics';
  setting: string;
  situation: string;
  stakeholders: string[];
  options: DecisionOption[];
}

export type QuizCategoryId = 'personal' | 'professional' | 'comparison' | 'mixed';

export interface QuizQuestion {
  id: string;
  category: Exclude<QuizCategoryId, 'mixed'>;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface QuizCategoryMeta {
  id: QuizCategoryId;
  title: string;
  subtitle: string;
  questionCount: number;
  accent: 'blue' | 'gold' | 'indigo' | 'navy';
}

export interface QuizRecord {
  categoryId: QuizCategoryId;
  bestScore: number;
  totalQuestions: number;
  attempts: number;
  lastCompletedAt: string;
}

export interface OfficialResource {
  id: string;
  name: string;
  acronym: string;
  category: string;
  purpose: string;
  websiteUrl: string;
  websiteLabel: string;
  contacts: {
    type: 'phone' | 'email';
    label: string;
    value: string;
    href: string;
  }[];
  address: string;
  note?: string;
}

export type VideoCategory =
  | 'Introduction to Ethics'
  | 'Personal Ethics'
  | 'Professional Ethics'
  | 'Workplace Ethics'
  | 'Academic Integrity'
  | 'Honesty and Integrity'
  | 'Leadership Ethics'
  | 'Business Ethics'
  | 'Data Privacy and Confidentiality'
  | 'Social Responsibility'
  | 'Ethical Decision Making'
  | 'Real-Life Ethical Dilemmas'
  | 'Teamwork and Accountability'
  | 'Respect and Equality'
  | 'Corporate Social Responsibility';

export interface VideoQuizQuestion {
  id: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface EducationalVideo {
  id: string; // YouTube video ID
  title: string;
  channel: string;
  category: VideoCategory;
  duration: string;
  description: string;
  thumbnailUrl: string;
  keyTakeaways: string[];
  reflectionQuestion: string;
}

export interface VideoQuizRecord {
  videoId: string;
  bestScore: number;
  totalQuestions: number;
  attempts: number;
  lastCompletedAt: string;
}

export type BookmarkType = 'video' | 'personal' | 'professional' | 'scenario' | 'case' | 'quiz';

export interface BookmarkItem {
  id: string; // unique composite key e.g. video:FOoffXFpAlU
  type: BookmarkType;
  targetId: string;
  title: string;
  subtitle: string;
  savedAt: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  topic: string;
  learned: string;
  situation: string;
  response: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  exploredPersonalIds: string[];
  personalReflections: Record<string, string>;
  exploredProfessionalIds: string[];
  exploredComparisonIds: string[];
  completedScenarios: Record<string, string>;
  quizRecords: Partial<Record<QuizCategoryId, QuizRecord>>;
  completedVideoIds: string[];
  videoQuizRecords: Record<string, VideoQuizRecord>;
  completedPathModuleIds: string[];
  completedDailyChallengeIds: string[];
  totalLearningSeconds: number;
}
