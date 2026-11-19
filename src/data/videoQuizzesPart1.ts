import { VideoQuizQuestion } from '../types/ethics';

export const VIDEO_QUIZZES_PART_1: Record<string, VideoQuizQuestion[]> = {
  // 1. Introduction to Ethics — Metaethics: Crash Course Philosophy #32 (FOoffXFpAlU)
  FOoffXFpAlU: [
    {
      id: 'v1-q1',
      difficulty: 'Easy',
      prompt: 'What core question does metaethics focus on compared to everyday applied ethics?',
      options: [
        'Which specific company policy applies to a workplace disagreement.',
        'What morality itself is, where moral truths come from, and what moral statements mean.',
        'How to calculate financial penalties for breaking a law.',
        'Which historical laws existed in ancient Greece.',
      ],
      correctIndex: 1,
      explanation:
        'Metaethics steps back from specific dilemmas to examine the nature, origin, and meaning of moral claims themselves.',
    },
    {
      id: 'v1-q2',
      difficulty: 'Easy',
      prompt: 'According to moral realism, moral statements such as "cruelty is wrong" are:',
      options: [
        'Purely personal tastes with no truth value.',
        'Objective facts that can be true or false independently of individual opinion.',
        'Temporary workplace rules created by managers.',
        'Expressions of emotion that cannot be reasoned about.',
      ],
      correctIndex: 1,
      explanation:
        'Moral realism holds that objective moral facts exist and moral claims can genuinely be true or false.',
    },
    {
      id: 'v1-q3',
      difficulty: 'Medium',
      prompt: 'How does moral absolutism differ from moral relativism?',
      options: [
        'Absolutism claims certain moral truths apply universally, while relativism holds that moral truths depend on cultural or personal perspectives.',
        'Absolutism rejects all moral rules, while relativism enforces strict universal laws.',
        'Absolutism applies only to businesses, while relativism applies only to families.',
        'There is no practical difference between the two views.',
      ],
      correctIndex: 0,
      explanation:
        'Moral absolutism posits universal standards across time and cultures, whereas moral relativism ties right and wrong to cultural or individual frameworks.',
    },
    {
      id: 'v1-q4',
      difficulty: 'Easy',
      prompt: 'What does moral anti-realism claim about objective moral facts?',
      options: [
        'Objective moral facts are discovered through laboratory experiments.',
        'Objective, mind-independent moral facts do not exist.',
        'Every person must follow the same universal code.',
        'Moral rules are written into physical laws of nature.',
      ],
      correctIndex: 1,
      explanation:
        'Moral anti-realists argue that morality is not an objective feature of the universe independent of human minds or societies.',
    },
    {
      id: 'v1-q5',
      difficulty: 'Medium',
      prompt: 'In metaethics, what is "subjectivism"?',
      options: [
        'The view that moral statements express facts about an individual’s own attitudes or beliefs.',
        'The view that all moral disagreements are solved by majority vote.',
        'The requirement to study ethics as a university subject.',
        'The claim that only scientists can define ethical duties.',
      ],
      correctIndex: 0,
      explanation:
        'Moral subjectivism treats moral claims as reports of individual approval or disapproval rather than universal facts.',
    },
    {
      id: 'v1-q6',
      difficulty: 'Medium',
      prompt: 'What is a well-known challenge facing cultural relativism?',
      options: [
        'It makes it hard to criticize genuinely harmful practices endorsed by a dominant culture or to explain moral progress.',
        'It forces every society to adopt identical traditions.',
        'It eliminates all differences between legal systems.',
        'It requires memorizing philosophical Latin terms.',
      ],
      correctIndex: 0,
      explanation:
        'If whatever a culture approves is automatically right, calling past injustices wrong—or recognizing moral reform as progress—becomes difficult to justify.',
    },
    {
      id: 'v1-q7',
      difficulty: 'Challenging',
      prompt: 'How does "grounding" relate to ethical principles in metaethics?',
      options: [
        'It refers to the deeper foundation or reason that gives moral claims their authority.',
        'It means punishing someone for an unethical mistake.',
        'It describes avoiding difficult moral conversations.',
        'It means limiting ethical reflection to financial costs.',
      ],
      correctIndex: 0,
      explanation:
        'Grounding asks what ultimately justifies a moral claim—such as human flourishing, rational duty, or shared social agreements.',
    },
    {
      id: 'v1-q8',
      difficulty: 'Medium',
      prompt: 'Which view suggests moral statements like "stealing is wrong" act more like emotional expressions ("Boo to stealing!") than factual claims?',
      options: [
        'Moral absolutism',
        'Emotivism (a non-cognitivist view)',
        'Virtue ethics',
        'Utilitarianism',
      ],
      correctIndex: 1,
      explanation:
        'Emotivism interprets moral utterances primarily as expressions of approval or disapproval meant to influence attitudes rather than statements of objective fact.',
    },
    {
      id: 'v1-q9',
      difficulty: 'Challenging',
      prompt: 'Why is understanding metaethics helpful even when solving practical campus or workplace dilemmas?',
      options: [
        'It clarifies why people disagree at a foundational level and encourages reasoned dialogue instead of assuming everyone shares identical premises.',
        'It replaces the need for workplace codes of conduct.',
        'It proves that ethical choices never involve trade-offs.',
        'It lets individuals ignore institutional rules whenever they disagree.',
      ],
      correctIndex: 0,
      explanation:
        'Recognizing whether a disagreement stems from different values, cultural assumptions, or factual beliefs helps people reason together respectfully.',
    },
    {
      id: 'v1-q10',
      difficulty: 'Challenging',
      prompt: 'If two people disagree fiercely about whether a practice is fair, what does a moral realist believe about their disagreement?',
      options: [
        'Both statements are automatically equally true for each speaker.',
        'At least one view can be mistaken because fairness involves real standards beyond personal preference.',
        'Moral arguments are pointless and should never occur.',
        'Whoever speaks loudest defines the ethical truth.',
      ],
      correctIndex: 1,
      explanation:
        'Moral realism explains genuine moral disagreement by holding that moral claims aim at truth, meaning arguments and evidence can show one view is better grounded.',
    },
  ],

  // 2. Personal Ethics — Aristotle & Virtue Theory: Crash Course Philosophy #38 (PrvtOWEXDIQ)
  PrvtOWEXDIQ: [
    {
      id: 'v2-q1',
      difficulty: 'Easy',
      prompt: 'What is the primary focus of Aristotle’s Virtue Theory?',
      options: [
        'Memorizing an exhaustive list of rigid prohibitions.',
        'Cultivating good moral character so right actions flow naturally from who you become.',
        'Maximizing short-term material wealth.',
        'Avoiding all emotional connections with others.',
      ],
      correctIndex: 1,
      explanation:
        'Virtue ethics focuses on character ("What kind of person should I become?") rather than solely on isolated rules or calculations.',
    },
    {
      id: 'v2-q2',
      difficulty: 'Easy',
      prompt: 'What did Aristotle mean by the "Golden Mean"?',
      options: [
        'A financial average of community income.',
        'Virtue sits at the balanced midpoint between two destructive extremes: deficiency and excess.',
        'Always choosing the easiest compromise in every debate.',
        'Treating only wealthy citizens with respect.',
      ],
      correctIndex: 1,
      explanation:
        'Aristotle taught that each virtue—like courage—lies between a deficiency (cowardice) and an excess (recklessness).',
    },
    {
      id: 'v2-q3',
      difficulty: 'Easy',
      prompt: 'According to Aristotle, how does a person develop virtues like honesty and courage?',
      options: [
        'By reading one philosophy book without practising.',
        'Through repeated habit, reflection, and consistent practice in daily life.',
        'Purely through inherited genetics at birth.',
        'Only by fear of external legal punishment.',
      ],
      correctIndex: 1,
      explanation:
        'Aristotle emphasized that virtue is a practical skill developed through habitual action—we become honest and fair by practising honesty and fairness.',
    },
    {
      id: 'v2-q4',
      difficulty: 'Medium',
      prompt: 'What does the Greek concept of "eudaimonia" represent in Aristotle’s ethics?',
      options: [
        'Fleeting excitement or brief entertainment.',
        'Deep human flourishing—a life lived well through reason, virtue, and meaningful purpose.',
        'Strict obedience to authority regardless of justice.',
        'Complete isolation from society.',
      ],
      correctIndex: 1,
      explanation:
        'Eudaimonia is best translated as flourishing or living a deeply fulfilled, purposeful life guided by character and wisdom.',
    },
    {
      id: 'v2-q5',
      difficulty: 'Medium',
      prompt: 'Using Aristotle’s Golden Mean, courage is the virtuous balance between:',
      options: [
        'Honesty and secrecy',
        'Cowardice (deficiency) and recklessness (excess)',
        'Ambition and laziness',
        'Generosity and gratitude',
      ],
      correctIndex: 1,
      explanation:
        'True courage faces real risk thoughtfully—avoiding both shrinking away in cowardice and plunging blindly into recklessness.',
    },
    {
      id: 'v2-q6',
      difficulty: 'Medium',
      prompt: 'Why did Aristotle emphasize "moral exemplars" (role models)?',
      options: [
        'Watching wise, principled people navigate real situations helps us learn practical judgment.',
        'Role models are expected to make every decision on our behalf.',
        'Copying someone’s appearance creates moral virtue.',
        'Only famous leaders can act virtuously.',
      ],
      correctIndex: 0,
      explanation:
        'Learning virtue is like learning a craft: observing mentors who demonstrate integrity and fairness helps calibrate our own moral judgment.',
    },
    {
      id: 'v2-q7',
      difficulty: 'Medium',
      prompt: 'What is "practical wisdom" (phronesis) in virtue ethics?',
      options: [
        'The discernment to recognize what the right, balanced action is in a specific real-life context.',
        'Knowing how to win every argument quickly.',
        'Applying the exact same rigid formula to every situation regardless of context.',
        'Avoiding responsibility when choices feel complex.',
      ],
      correctIndex: 0,
      explanation:
        'Practical wisdom helps a virtuous person judge the right action, at the right time, in the right manner, for the right reasons.',
    },
    {
      id: 'v2-q8',
      difficulty: 'Challenging',
      prompt: 'A friend asks for honest feedback on a presentation right before going on stage. How would Aristotle’s virtue of honesty guide you?',
      options: [
        'Point out every tiny flaw harshly because bluntness is always best.',
        'Tell a complete lie so they never feel nervous.',
        'Offer truthful, constructive, well-timed encouragement focused on one helpful adjustment rather than cruel criticism.',
        'Refuse to watch the presentation.',
      ],
      correctIndex: 2,
      explanation:
        'Virtuous honesty paired with practical wisdom avoids both deceitful flattery and cruel bluntness—delivering truth with care and good timing.',
    },
    {
      id: 'v2-q9',
      difficulty: 'Challenging',
      prompt: 'How does Aristotle’s view of character connect personal ethics to long-term habits?',
      options: [
        'Small daily choices gradually shape our character until acting ethically becomes second nature.',
        'Only rare dramatic crises matter for moral development.',
        'Character cannot change after adolescence.',
        'External rules matter more than internal motivation.',
      ],
      correctIndex: 0,
      explanation:
        'Every everyday decision—keeping a small promise, admitting a slip—reinforces the moral habits that define who we become.',
    },
    {
      id: 'v2-q10',
      difficulty: 'Challenging',
      prompt: 'Which limitation do critics sometimes raise about virtue theory?',
      options: [
        'It does not always provide an instant step-by-step rulebook when two virtues—such as loyalty and honesty—appear to conflict.',
        'It forbids people from being generous or compassionate.',
        'It ignores the importance of human character.',
        'It only applies to ancient Greek politics.',
      ],
      correctIndex: 0,
      explanation:
        'Because virtue ethics emphasizes judgment over rigid rules, balancing competing virtues in tricky dilemmas requires deep reflection and practical wisdom.',
    },
  ],

  // 3. Professional Ethics — Conflict of Interest | Ethics Defined (auePL3pYRb0)
  auePL3pYRb0: [
    {
      id: 'v3-q1',
      difficulty: 'Easy',
      prompt: 'What defines a "conflict of interest" in professional ethics?',
      options: [
        'Having a healthy disagreement with a teammate over project design.',
        'A situation where personal, financial, or relational interests could compromise—or appear to compromise—professional judgment.',
        'Working overtime to finish a challenging deadline.',
        'Switching from one career field to another.',
      ],
      correctIndex: 1,
      explanation:
        'A conflict of interest arises when a secondary personal interest risks pulling a professional away from their primary duty of objective judgment.',
    },
    {
      id: 'v3-q2',
      difficulty: 'Easy',
      prompt: 'Why does even the *appearance* of a conflict of interest matter professionally?',
      options: [
        'Because public and institutional trust can be damaged even if the decision-maker genuinely believes they stayed objective.',
        'Because appearances are more important than actual work quality.',
        'Because conflicts only matter if reported in the news.',
        'Appearances never matter as long as intentions are honest.',
      ],
      correctIndex: 0,
      explanation:
        'Stakeholders cannot see inside our intentions; undisclosed conflicts erode institutional credibility regardless of personal sincerity.',
    },
    {
      id: 'v3-q3',
      difficulty: 'Easy',
      prompt: 'What is the most ethical first step when you recognize a potential conflict of interest?',
      options: [
        'Keep it quiet and try harder to be fair.',
        'Disclose the conflict transparently to the relevant authority or committee right away.',
        'Resign immediately from the entire organization.',
        'Ask a friend to hide the connection.',
      ],
      correctIndex: 1,
      explanation:
        'Prompt, transparent disclosure allows an organization to put fair safeguards—such as recusal or independent review—in place.',
    },
    {
      id: 'v3-q4',
      difficulty: 'Medium',
      prompt: 'What does "recusal" mean when managing a conflict of interest?',
      options: [
        'Stepping back from voting, scoring, or deciding on the specific matter where your personal interest overlaps.',
        'Refusing to attend any workplace meetings.',
        'Secretly voting against your own relative.',
        'Deleting records of the relationship.',
      ],
      correctIndex: 0,
      explanation:
        'Recusal removes the conflicted individual from decision-making on that specific issue so impartial peers can decide fairly.',
    },
    {
      id: 'v3-q5',
      difficulty: 'Medium',
      prompt: 'Which example illustrates a clear conflict of interest in an academic or campus setting?',
      options: [
        'A club treasurer voting to award a paid catering contract to their own family’s restaurant without disclosing the relationship.',
        'A student asking a professor for extra office-hours guidance.',
        'Two classmates collaborating on a group assignment permitted by the syllabus.',
        'Reviewing anonymized peer essays using a shared rubric.',
      ],
      correctIndex: 0,
      explanation:
        'Directing organizational funds to a family business without disclosure and recusal mixes personal financial gain with institutional duty.',
    },
    {
      id: 'v3-q6',
      difficulty: 'Medium',
      prompt: 'Why is simply having a conflict of interest NOT automatically unethical by itself?',
      options: [
        'Conflicts happen naturally in interconnected communities; unethical behaviour occurs when they are concealed or allowed to bias decisions.',
        'Conflicts are always encouraged to speed up business.',
        'Professional codes never regulate conflicts of interest.',
        'Personal relationships never affect professional settings.',
      ],
      correctIndex: 0,
      explanation:
        'Real-world overlaps are sometimes unavoidable; professional integrity is measured by whether you disclose and manage them responsibly.',
    },
    {
      id: 'v3-q7',
      difficulty: 'Medium',
      prompt: 'How can receiving expensive gifts or hospitality from a vendor create an ethical risk?',
      options: [
        'It can create subtle feelings of obligation that bias procurement or evaluation decisions.',
        'It guarantees the vendor delivers superior products.',
        'It eliminates the need for competitive bidding.',
        'It is purely a personal social gesture with no professional impact.',
      ],
      correctIndex: 0,
      explanation:
        'Behavioral ethics shows that even modest gifts trigger subconscious reciprocity bias, which is why organizations set strict gift-disclosure limits.',
    },
    {
      id: 'v3-q8',
      difficulty: 'Challenging',
      prompt: 'A researcher studying a new health supplement also holds significant stock in the company making it. What must professional integrity require?',
      options: [
        'Full disclosure of financial ties in every publication and independent oversight of data analysis—or divestment/recusal.',
        'Publishing only if the supplement performs well.',
        'Omitting the stock ownership because the lab measurements were careful.',
        'Letting the company rewrite the discussion section.',
      ],
      correctIndex: 0,
      explanation:
        'Scientific and professional credibility demands transparent conflict disclosure and structural safeguards against unconscious bias.',
    },
    {
      id: 'v3-q9',
      difficulty: 'Challenging',
      prompt: 'Why do humans often underestimate how much a conflict of interest affects their own judgment?',
      options: [
        'Psychological blind spots lead us to view ourselves as uniquely objective even when personal incentives subtly skew our interpretation.',
        'Because written policies are always too short.',
        'Because only dishonest people ever experience bias.',
        'Because conflicts only influence financial numbers, never opinions.',
      ],
      correctIndex: 0,
      explanation:
        'Self-serving bias operates largely outside conscious awareness—which is why structural safeguards like disclosure and recusal are essential.',
    },
    {
      id: 'v3-q10',
      difficulty: 'Challenging',
      prompt: 'Which combination best safeguards an organization against conflicts of interest?',
      options: [
        'Clear disclosure policies, routine recusal procedures, transparent evaluation rubrics, and independent oversight.',
        'Relying strictly on informal verbal promises.',
        'Banning employees from having any personal friendships.',
        'Keeping all vendor decisions confidential from auditors.',
      ],
      correctIndex: 0,
      explanation:
        'Well-designed governance combines personal honesty with transparent, verifiable institutional safeguards.',
    },
  ],

  // 4. Workplace Ethics — Moral Reasoning | Ethics Defined (h_sufC5nY18)
  h_sufC5nY18: [
    {
      id: 'v4-q1',
      difficulty: 'Easy',
      prompt: 'What is "moral reasoning" in everyday and workplace decision-making?',
      options: [
        'Using careful reflection, evidence, and ethical principles to evaluate right and wrong courses of action.',
        'Following the fastest option without consulting anyone.',
        'Defending your first instinct regardless of new facts.',
        'Memorizing company slogans without questioning practices.',
      ],
      correctIndex: 0,
      explanation:
        'Moral reasoning applies structured critical thinking to ethical dilemmas rather than reacting purely on impulse or convenience.',
    },
    {
      id: 'v4-q2',
      difficulty: 'Easy',
      prompt: 'Which element is essential before reaching an ethical conclusion at work?',
      options: [
        'Gathering accurate facts and identifying all stakeholders affected by the choice.',
        'Guessing what the most popular team member prefers.',
        'Ignoring long-term risks to meet a short-term target.',
        'Making the decision in total secrecy.',
      ],
      correctIndex: 0,
      explanation:
        'Sound moral reasoning always begins with clear facts and an honest view of who stands to benefit or suffer harm.',
    },
    {
      id: 'v4-q3',
      difficulty: 'Medium',
      prompt: 'How does moral reasoning differ from rationalization?',
      options: [
        'Moral reasoning tests choices objectively against principles before acting; rationalization invents excuses to justify a self-serving choice already made.',
        'Rationalization uses stricter logic than moral reasoning.',
        'They are identical terms in workplace ethics.',
        'Moral reasoning ignores emotions completely while rationalization relies on empathy.',
      ],
      correctIndex: 0,
      explanation:
        'Rationalization works backward from a desired shortcut to excuse it, whereas moral reasoning genuinely weighs ethical duties and impacts.',
    },
    {
      id: 'v4-q4',
      difficulty: 'Easy',
      prompt: 'Why can workplace ethical dilemmas feel harder to spot than obvious legal violations?',
      options: [
        'Time pressure, performance targets, and social conformity can frame ethical choices purely as "business decisions."',
        'Because workplaces never publish codes of conduct.',
        'Because employees do not care about fairness.',
        'Because ethical reasoning only applies outside working hours.',
      ],
      correctIndex: 0,
      explanation:
        'In busy work environments, moral dimensions often get obscured by narrow metrics unless professionals deliberately pause to reason ethically.',
    },
    {
      id: 'v4-q5',
      difficulty: 'Medium',
      prompt: 'What role does empathy play alongside logic in moral reasoning?',
      options: [
        'Empathy helps identify how policies and decisions affect real people’s dignity, safety, and lived experience.',
        'Empathy replaces the need for fairness or rules.',
        'Empathy should be excluded from workplace decisions.',
        'Empathy applies only to friends and family.',
      ],
      correctIndex: 0,
      explanation:
        'Effective moral reasoning integrates analytical clarity with empathetic awareness of human impact.',
    },
    {
      id: 'v4-q6',
      difficulty: 'Medium',
      prompt: 'When applying moral reasoning to a tough workplace dilemma, why is consulting a trusted mentor or ethics advisor valuable?',
      options: [
        'Fresh perspective exposes personal blind spots and tests whether your reasoning holds up transparently.',
        'It shifts all personal accountability onto someone else.',
        'It guarantees you will never face criticism.',
        'It allows you to bypass institutional rules.',
      ],
      correctIndex: 0,
      explanation:
        'Structured dialogue helps challenge blind spots and strengthens the integrity of the final decision.',
    },
    {
      id: 'v4-q7',
      difficulty: 'Medium',
      prompt: 'Which question acts as a classic "transparency test" in moral reasoning?',
      options: [
        '"Can I finish this before 5 PM?"',
        '"Would I feel comfortable explaining this decision openly to colleagues, clients, and the people affected?"',
        '"Will anyone notice if I skip this step?"',
        '"Does this benefit my department exclusively?"',
      ],
      correctIndex: 1,
      explanation:
        'Testing whether a choice withstands open daylight quickly reveals hidden rationalizations.',
    },
    {
      id: 'v4-q8',
      difficulty: 'Challenging',
      prompt: 'When two genuine workplace values—such as speed to help a client and thorough safety verification—pull in opposite directions, moral reasoning advises:',
      options: [
        'Examining the severity of potential harm, relevant duties, and transparent options rather than automatically picking the faster route.',
        'Always prioritizing speed to impress leadership.',
        'Refusing to communicate delays until after launch.',
        'Flipping a coin to remain impartial.',
      ],
      correctIndex: 0,
      explanation:
        'Weighing severity of harm, stakeholder rights, and transparent communication prevents preventable disasters.',
    },
    {
      id: 'v4-q9',
      difficulty: 'Challenging',
      prompt: 'Why is moral reasoning considered a developmental skill rather than a fixed trait?',
      options: [
        'Practising reflection on dilemmas, reviewing outcomes honestly, and learning ethical frameworks strengthens decision quality over time.',
        'Only senior executives are allowed to practise it.',
        'It depends purely on memorizing legal statutes.',
        'Once learned in school, it never needs updating.',
      ],
      correctIndex: 0,
      explanation:
        'Like analytical or technical skills, moral reasoning grows sharper with deliberate practice, feedback, and honest reflection.',
    },
    {
      id: 'v4-q10',
      difficulty: 'Challenging',
      prompt: 'Which habit most reliably improves workplace moral reasoning across a team?',
      options: [
        'Inviting open ethical check-ins during project reviews so potential harms are raised early without fear of ridicule.',
        'Rewarding only speed while ignoring process integrity.',
        'Discouraging junior staff from questioning assumptions.',
        'Treating compliance checkboxes as the entire scope of ethics.',
      ],
      correctIndex: 0,
      explanation:
        'Psychological safety and structured review rituals turn individual moral reasoning into collective ethical resilience.',
    },
  ],

  // 5. Academic Integrity — Plagiarism: One Form of Academic Dishonesty (8_SxY2jpRFc)
  '8_SxY2jpRFc': [
    {
      id: 'v5-q1',
      difficulty: 'Easy',
      prompt: 'What is plagiarism in an academic context?',
      options: [
        'Citing multiple scholars to support an original argument.',
        'Presenting someone else’s words, ideas, images, data, or code as your own without proper credit.',
        'Studying together with classmates before an open discussion.',
        'Quoting a journal article with quotation marks and a full reference.',
      ],
      correctIndex: 1,
      explanation:
        'Plagiarism occurs whenever borrowed phrasing, ideas, visuals, or code are presented without clear, accurate attribution.',
    },
    {
      id: 'v5-q2',
      difficulty: 'Easy',
      prompt: 'If you rewrite a paragraph from an online article completely in your own words, do you still need to cite the source?',
      options: [
        'No, because none of the original sentences remain verbatim.',
        'Yes—paraphrased ideas and research findings still belong to the original author and require citation.',
        'Only if the article was published in a printed book.',
        'Only if your instructor explicitly asks for a link later.',
      ],
      correctIndex: 1,
      explanation:
        'Academic honesty protects both wording AND intellectual ideas; paraphrasing cleanly still requires an in-text citation and reference entry.',
    },
    {
      id: 'v5-q3',
      difficulty: 'Easy',
      prompt: 'Can plagiarism happen unintentionally?',
      options: [
        'No—plagiarism only counts if someone deliberately intends to cheat.',
        'Yes—sloppy note-taking, missing quotation marks, or forgotten citations still constitute plagiarism.',
        'Only in graduate-level theses.',
        'Never, if you found the information on a free public website.',
      ],
      correctIndex: 1,
      explanation:
        'Unintentional plagiarism from disorganized notes or rushed editing is still a serious breach of academic integrity—good citation habits prevent it.',
    },
    {
      id: 'v5-q4',
      difficulty: 'Medium',
      prompt: 'What is "patchwriting" (mosaic plagiarism)?',
      options: [
        'Building a bibliography using standard citation software.',
        'Copying sentences from sources while swapping a few synonyms or rearranging phrases without genuine paraphrasing or quotation marks.',
        'Writing an essay across multiple drafts over several weeks.',
        'Collaborating with a writing centre tutor on grammar.',
      ],
      correctIndex: 1,
      explanation:
        'Swapping a few words while keeping the original sentence structure closely intact still counts as plagiarism.',
    },
    {
      id: 'v5-q5',
      difficulty: 'Medium',
      prompt: 'What is "self-plagiarism" in higher education?',
      options: [
        'Quoting your own personal diary in a creative essay.',
        'Submitting the same previously graded paper or substantial sections of it for a new course without instructor permission.',
        'Revising a rough draft before final submission.',
        'Writing notes in your own words while reading.',
      ],
      correctIndex: 1,
      explanation:
        'Recycling prior graded work as if it were fresh original scholarship for a new class violates academic integrity unless explicitly authorized.',
    },
    {
      id: 'v5-q6',
      difficulty: 'Medium',
      prompt: 'Why is academic integrity essential beyond simply avoiding failing grades?',
      options: [
        'It ensures qualifications reflect genuine competence, respects fellow creators, and builds the honesty required in future professions.',
        'It only matters for students applying for scholarships.',
        'It exists mainly to make formatting bibliographies harder.',
        'It replaces the need to conduct real research.',
      ],
      correctIndex: 0,
      explanation:
        'Society relies on engineers, doctors, educators, and analysts whose credentials represent genuine mastery earned honestly.',
    },
    {
      id: 'v5-q7',
      difficulty: 'Medium',
      prompt: 'Which practical habit is the most reliable defence against accidental plagiarism?',
      options: [
        'Copying full paragraphs into your draft and promising to rewrite them at midnight.',
        'Recording exact source details and marking verbatim quotes immediately while taking research notes.',
        'Avoiding outside research completely.',
        'Using an online word spinner to change adjectives.',
      ],
      correctIndex: 1,
      explanation:
        'Clean note-taking—separating direct quotes, your own summary, and full citation info from the start—prevents rushed citation errors.',
    },
    {
      id: 'v5-q8',
      difficulty: 'Challenging',
      prompt: 'When using an open-source code snippet or public dataset in a college capstone project, academic honesty requires:',
      options: [
        'Renaming variables so the code blends seamlessly with your own files.',
        'Following the license terms, documenting the external source clearly, and distinguishing your original work from borrowed components.',
        'Removing author comments so the repository looks cleaner.',
        'Only citing code if it exceeds 500 lines.',
      ],
      correctIndex: 1,
      explanation:
        'Transparency about borrowed libraries, snippets, and datasets is the cornerstone of academic and software engineering integrity.',
    },
    {
      id: 'v5-q9',
      difficulty: 'Challenging',
      prompt: 'When is information considered "common knowledge" that typically does not require a citation?',
      options: [
        'Any statistic found on the first page of a search engine.',
        'Widely established, undisputed facts found across many standard reference sources (e.g., water freezes at 0°C at standard pressure).',
        'A professor’s original research hypothesis.',
        'A well-written paragraph from an encyclopedia.',
      ],
      correctIndex: 1,
      explanation:
        'Undisputed general facts need no citation, whereas specific studies, interpretations, statistics, and phrasing always require attribution.',
    },
    {
      id: 'v5-q10',
      difficulty: 'Challenging',
      prompt: 'If you are unsure whether a specific study group collaboration or citation format is allowed on an assignment, what is the most responsible action?',
      options: [
        'Assume it is allowed if several classmates are doing it.',
        'Check the course syllabus and ask the instructor or campus writing centre before submitting.',
        'Wait until grades come back to clarify.',
        'Hide the collaboration in your submission notes.',
      ],
      correctIndex: 1,
      explanation:
        'Clarifying expectations proactively with faculty or academic integrity resources protects both your learning and your standing.',
    },
  ],
};
