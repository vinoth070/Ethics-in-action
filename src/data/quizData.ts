import { QuizCategoryId, QuizCategoryMeta, QuizQuestion } from '../types/ethics';

export const QUIZ_CATEGORIES: QuizCategoryMeta[] = [
  {
    id: 'personal',
    title: 'Personal Ethics Quiz',
    subtitle: 'Honesty, integrity, empathy, respect, fairness, and everyday accountability.',
    questionCount: 6,
    accent: 'blue',
  },
  {
    id: 'professional',
    title: 'Professional Ethics Quiz',
    subtitle: 'Academic honesty, confidentiality, data privacy, fair treatment, and workplace standards.',
    questionCount: 6,
    accent: 'gold',
  },
  {
    id: 'comparison',
    title: 'Ethics Comparison Quiz',
    subtitle: 'Distinguishing personal vs. professional ethics and recognizing how they reinforce each other.',
    questionCount: 6,
    accent: 'indigo',
  },
  {
    id: 'mixed',
    title: 'Mixed Challenge',
    subtitle: 'A comprehensive 10-question assessment combining personal values, professional standards, and real dilemmas.',
    questionCount: 10,
    accent: 'navy',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // PERSONAL ETHICS (6)
  {
    id: 'p1',
    category: 'personal',
    prompt: 'Which description best distinguishes integrity from simple rule-following?',
    options: [
      'Following rules strictly whenever a supervisor or peer group is observing.',
      'Acting consistently with honest moral principles even when no one is watching.',
      'Agreeing with group opinions to preserve harmony during disagreements.',
      'Prioritizing personal goals as long as no formal policy is broken.',
    ],
    correctIndex: 1,
    explanation:
      'Integrity means internal alignment between your principles and actions across both public and private moments—not merely complying under supervision.',
  },
  {
    id: 'p2',
    category: 'personal',
    prompt: 'You accidentally break a borrowed notebook cover belonging to a classmate. Which response best reflects personal accountability?',
    options: [
      'Return it quietly hoping they do not notice the tear right away.',
      'Explain that the notebook binding was already fragile before you borrowed it.',
      'Inform your classmate honestly, apologize without excuses, and offer to repair or replace it.',
      'Wait until they ask about the notebook before mentioning what happened.',
    ],
    correctIndex: 2,
    explanation:
      'Personal accountability means taking direct ownership of mistakes promptly and making constructive amends without deflecting blame.',
  },
  {
    id: 'p3',
    category: 'personal',
    prompt: 'During a heated group conversation, a quieter peer shares an unpopular opinion. How does empathy guide your response?',
    options: [
      'Listen attentively to understand their reasoning before offering respectful feedback.',
      'Change the subject quickly so the group does not feel uncomfortable.',
      'Assume they did not prepare carefully and move straight to the majority view.',
      'Stay silent during the meeting and critique their view later in a side chat.',
    ],
    correctIndex: 0,
    explanation:
      'Empathy begins with genuine listening and seeking to understand another person’s perspective with dignity, even when you hold a different view.',
  },
  {
    id: 'p4',
    category: 'personal',
    prompt: 'You are helping select two volunteers for a college cultural panel, and your close friend applies alongside stronger candidates. Which step most clearly protects fairness?',
    options: [
      'Choose your friend because you know they are reliable in social settings.',
      'Use clear, shared selection criteria and recuse yourself from scoring your friend.',
      'Add an extra spot secretly so you do not have to turn your friend down.',
      'Avoid telling applicants what criteria were used so nobody compares results.',
    ],
    correctIndex: 1,
    explanation:
      'Transparent criteria and recusal when a personal conflict of interest exists are core practices of fairness.',
  },
  {
    id: 'p5',
    category: 'personal',
    prompt: 'Why is keeping small everyday promises important to personal ethics?',
    options: [
      'It guarantees others will always return favours of equal value.',
      'It builds dependable character and mutual trust that anchor stronger relationships.',
      'It is required mainly for written legal contracts rather than friendships.',
      'It helps you avoid having to communicate when plans change.',
    ],
    correctIndex: 1,
    explanation:
      'Consistent follow-through on everyday promises builds reliability, self-respect, and interpersonal trust.',
  },
  {
    id: 'p6',
    category: 'personal',
    prompt: 'What is the most ethical way to practise respect in online and campus communication?',
    options: [
      'Share funny candid photos of classmates without asking if the intent is lighthearted.',
      'Critique ideas constructively while protecting others’ privacy, consent, and personal dignity.',
      'Avoid ever disagreeing with peers so conversations remain polite.',
      'Forward unverified messages quickly if they seem urgent to your friends.',
    ],
    correctIndex: 1,
    explanation:
      'Respect welcomes honest discussion of ideas while safeguarding human dignity, consent, and digital privacy.',
  },

  // PROFESSIONAL ETHICS (6)
  {
    id: 'pr1',
    category: 'professional',
    prompt: 'While writing an academic paper, you paraphrase a researcher’s key framework in your own words. What does academic honesty require?',
    options: [
      'No citation is required because you changed all the original wording.',
      'Cite the original source clearly, because ideas and frameworks require attribution even when paraphrased.',
      'List the author only if you use an exact word-for-word quotation.',
      'Include the link only in private notes rather than the submitted bibliography.',
    ],
    correctIndex: 1,
    explanation:
      'Academic honesty requires citing both direct quotations and paraphrased ideas, datasets, or frameworks so original scholarship is properly credited.',
  },
  {
    id: 'pr2',
    category: 'professional',
    prompt: 'You receive an internal spreadsheet of colleague salaries sent to your inbox by mistake. What is the most appropriate professional action?',
    options: [
      'Read only the summary tab to check industry benchmarks, then delete it.',
      'Forward it to your team lead to ask whether they meant to include you.',
      'Do not open or save the file; notify the sender privately of the error and permanently delete it.',
      'Archive it quietly in a private folder in case HR asks about it later.',
    ],
    correctIndex: 2,
    explanation:
      'Confidentiality requires containing accidental disclosures immediately without inspecting, saving, or forwarding unauthorized records.',
  },
  {
    id: 'pr3',
    category: 'professional',
    prompt: 'Which practice best reflects responsible data privacy in a student analytics project?',
    options: [
      'Collecting extra personal fields just in case they become useful later.',
      'Collecting only essential data with informed consent and anonymizing identifiers before sharing findings.',
      'Uploading raw survey spreadsheets with student emails to a public portfolio repository.',
      'Reusing health survey data from another class without informing participants.',
    ],
    correctIndex: 1,
    explanation:
      'Data privacy centres on data minimization, informed consent, purpose limitation, and proper anonymization.',
  },
  {
    id: 'pr4',
    category: 'professional',
    prompt: 'In a four-person capstone project, one teammate did vital data analysis but could not attend the final rehearsal. What does ethical teamwork require?',
    options: [
      'List only the presenters on the title slide to keep the presentation uncluttered.',
      'Credit every member accurately for their contributions on the slides and during the presentation.',
      'Wait to see if the instructor asks who did the statistical work.',
      'Reduce their listed role because they missed the rehearsal.',
    ],
    correctIndex: 1,
    explanation:
      'Ethical teamwork and professional integrity require accurate, transparent attribution of each contributor’s actual work.',
  },
  {
    id: 'pr5',
    category: 'professional',
    prompt: 'Right after submitting a client report, you spot a formula mistake that overstated a result. How does professional accountability guide your next step?',
    options: [
      'Hope nobody recalculates the table and fix it quietly in next month’s report.',
      'Promptly send a transparent correction with the verified numbers and a brief explanation.',
      'Blame the spreadsheet software for misformatting the formula.',
      'Wait for the client to point out the discrepancy before acknowledging it.',
    ],
    correctIndex: 1,
    explanation:
      'Prompt, transparent self-correction prevents stakeholders from acting on flawed information and reinforces professional trustworthiness.',
  },
  {
    id: 'pr6',
    category: 'professional',
    prompt: 'What does "professional responsibility" mean beyond meeting basic job tasks?',
    options: [
      'Always saying yes to every shortcut that speeds up delivery.',
      'Considering public safety, accessibility, fairness, and long-term societal impact in your work.',
      'Focusing solely on technical elegance regardless of how users are affected.',
      'Delegating ethical questions exclusively to legal departments.',
    ],
    correctIndex: 1,
    explanation:
      'Professional responsibility carries a broader civic duty to protect human safety, equity, and public welfare.',
  },

  // COMPARISON (6)
  {
    id: 'c1',
    category: 'comparison',
    prompt: 'How do the foundations of personal ethics and professional ethics primarily differ?',
    options: [
      'Personal ethics is always written in laws, while professional ethics is purely informal.',
      'Personal ethics grows from conscience, upbringing, and reflection; professional ethics is codified by institutions and occupational standards.',
      'Personal ethics applies only at work, while professional ethics applies only at home.',
      'Personal ethics ignores fairness, while professional ethics ignores honesty.',
    ],
    correctIndex: 1,
    explanation:
      'Personal ethics develops internally through values and reflection, whereas professional ethics is formally articulated through institutional codes, charters, and standards.',
  },
  {
    id: 'c2',
    category: 'comparison',
    prompt: 'Which set of core values bridges BOTH personal ethics and professional ethics?',
    options: [
      'Honesty, respect, fairness, responsibility, and integrity.',
      'Profitability, competition, secrecy, and personal popularity.',
      'Strict uniformity, silence, and unconditional obedience.',
      'Speed, convenience, and informal favouritism.',
    ],
    correctIndex: 0,
    explanation:
      'Honesty, respect, fairness, responsibility, and integrity form the shared foundation linking personal character and professional excellence.',
  },
  {
    id: 'c3',
    category: 'comparison',
    prompt: 'A close friend asks you to share your individual graded code right before a deadline. Why is this a classic intersection of personal and professional ethics?',
    options: [
      'Because neither personal nor professional ethics addresses coursework.',
      'Because it tests how personal empathy and loyalty can be balanced with academic honesty and fairness.',
      'Because professional ethics prohibits ever helping friends learn difficult topics.',
      'Because personal ethics requires ignoring all institutional rules.',
    ],
    correctIndex: 1,
    explanation:
      'This dilemma sits at the crossroads of personal compassion and academic/professional integrity—resolved best by teaching concepts rather than sharing graded answers.',
  },
  {
    id: 'c4',
    category: 'comparison',
    prompt: 'How do consequences for ethical breaches typically differ between personal and professional contexts?',
    options: [
      'Personal breaches have no real impact on anyone.',
      'Personal breaches primarily affect conscience and trust; professional breaches can also trigger formal institutional, regulatory, or legal accountability.',
      'Professional breaches only affect private friendships.',
      'There is never any overlap between personal trust and professional reputation.',
    ],
    correctIndex: 1,
    explanation:
      'While both damage trust, professional ethics is backed by formal codes and governance mechanisms that carry institutional or legal accountability.',
  },
  {
    id: 'c5',
    category: 'comparison',
    prompt: 'How does strong personal ethics strengthen professional ethical conduct?',
    options: [
      'It replaces the need to read organizational confidentiality or safety policies.',
      'It builds internal habits of truthfulness, empathy, and courage that sustain ethical standards when formal rules feel ambiguous.',
      'It encourages professionals to prioritize personal friends over objective criteria.',
      'It guarantees that ethical dilemmas never arise in the workplace.',
    ],
    correctIndex: 1,
    explanation:
      'Written codes cannot anticipate every grey area; strong personal character equips professionals to act with honesty and care even when policies do not spell out every detail.',
  },
  {
    id: 'c6',
    category: 'comparison',
    prompt: 'In complex ethical dilemmas, what is the primary goal of ethical decision-making frameworks?',
    options: [
      'To prove that every dilemma has only one trivial answer with zero trade-offs.',
      'To examine stakeholders, duties, principles, and consequences thoughtfully before acting.',
      'To choose whichever option requires the least effort in the moment.',
      'To avoid listening to differing perspectives.',
    ],
    correctIndex: 1,
    explanation:
      'Sound ethical reasoning weighs multiple perspectives, affected stakeholders, core principles, and short- and long-term consequences.',
  },
];

export function getQuestionsForCategory(categoryId: QuizCategoryId): QuizQuestion[] {
  if (categoryId === 'mixed') {
    const personal = QUIZ_QUESTIONS.filter((q) => q.category === 'personal').slice(0, 3);
    const professional = QUIZ_QUESTIONS.filter((q) => q.category === 'professional').slice(0, 4);
    const comparison = QUIZ_QUESTIONS.filter((q) => q.category === 'comparison').slice(0, 3);
    return [...personal, ...professional, ...comparison];
  }
  return QUIZ_QUESTIONS.filter((q) => q.category === categoryId);
}
