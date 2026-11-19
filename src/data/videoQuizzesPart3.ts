import { VideoQuizQuestion } from '../types/ethics';

export const VIDEO_QUIZZES_PART_3: Record<string, VideoQuizQuestion[]> = {
  // 11. Ethical Decision Making — 4 Steps to Ethical Decision-Making (uViluUWvotg)
  uViluUWvotg: [
    {
      id: 'v11-q1',
      difficulty: 'Easy',
      prompt: 'What is the essential first step in a structured ethical decision-making process?',
      options: [
        'Recognize the ethical issue clearly and gather accurate facts before reacting.',
        'Defend your initial hunch immediately.',
        'Ask who can be blamed if things go wrong.',
        'Choose the option that finishes fastest.',
      ],
      correctIndex: 0,
      explanation:
        'Spotting the ethical dimension and separating verified facts from assumptions lays the foundation for every subsequent step.',
    },
    {
      id: 'v11-q2',
      difficulty: 'Easy',
      prompt: 'Why should you list multiple possible courses of action rather than stopping at "Option A vs. Option B"?',
      options: [
        'Creative third options often satisfy competing ethical duties better than false either-or choices.',
        'Listing options delays decisions indefinitely.',
        'Every dilemma strictly has only two possible actions.',
        'Extra options are only useful for legal teams.',
      ],
      correctIndex: 0,
      explanation:
        'Expanding options often uncovers constructive solutions—like teaching a friend a concept instead of choosing between abandoning them or sharing graded answers.',
    },
    {
      id: 'v11-q3',
      difficulty: 'Easy',
      prompt: 'Who should be mapped when evaluating alternatives in ethical decision-making?',
      options: [
        'Only the person making the decision.',
        'All direct and indirect stakeholders who could be helped or harmed by each option.',
        'Only senior managers.',
        'Only people physically in the room.',
      ],
      correctIndex: 1,
      explanation:
        'Mapping every affected group prevents overlooking quieter, vulnerable, or absent stakeholders.',
    },
    {
      id: 'v11-q4',
      difficulty: 'Medium',
      prompt: 'How do consequences and principles work together when evaluating choices?',
      options: [
        'Examining both predicted outcomes (who is harmed/helped) and core duties (honesty, fairness, rights) reveals blind spots either lens alone might miss.',
        'Principles should always ignore real-world consequences.',
        'Consequences replace all rights and promises.',
        'Only one ethical framework is allowed per organization.',
      ],
      correctIndex: 0,
      explanation:
        'Combining consequentialist, duty-based, and character lenses produces balanced, resilient decisions.',
    },
    {
      id: 'v11-q5',
      difficulty: 'Medium',
      prompt: 'What makes the final step—acting and reflecting on the outcome—essential to ethical growth?',
      options: [
        'Good reasoning means little without courageous follow-through, and reviewing real outcomes sharpens future judgment.',
        'Once a choice is made, you should never look back.',
        'Reflection is only needed when a decision fails publicly.',
        'Planning alone fulfils ethical duty.',
      ],
      correctIndex: 0,
      explanation:
        'Closing the loop through responsible execution and honest post-decision reflection builds lifelong moral wisdom.',
    },
    {
      id: 'v11-q6',
      difficulty: 'Medium',
      prompt: 'Why is pausing even briefly valuable when facing a high-pressure ethical choice?',
      options: [
        'A brief pause interrupts emotional impulse and social conformity, activating deliberate moral reasoning.',
        'Pausing signals weakness to teammates.',
        'Ethical choices must always take weeks to decide.',
        'Impulse is usually more accurate than reflection.',
      ],
      correctIndex: 0,
      explanation:
        'Even a 60-second deliberate pause prevents rushed choices we later regret.',
    },
    {
      id: 'v11-q7',
      difficulty: 'Medium',
      prompt: 'Which question helps check for bias during step two of evaluating options?',
      options: [
        '"Would this choice still feel fair if I were on the receiving end of it?"',
        '"Which option gives me the largest personal benefit?"',
        '"Can I justify this privately without telling anyone?"',
        '"Does this require the least effort?"',
      ],
      correctIndex: 0,
      explanation:
        'Reversibility—stepping into the shoes of the person affected—quickly exposes hidden self-interest.',
    },
    {
      id: 'v11-q8',
      difficulty: 'Challenging',
      prompt: 'When institutional rules and personal empathy seem to pull in different directions, what should a structured decision-maker do?',
      options: [
        'Clarify the purpose behind the rule, check legitimate exception/support pathways, and communicate transparently rather than secretly breaking standards.',
        'Secretly bend the rule whenever you feel sympathetic.',
        'Apply rules mechanically with zero human compassion.',
        'Avoid making any decision at all.',
      ],
      correctIndex: 0,
      explanation:
        'Understanding the principle behind a rule often reveals humane, transparent pathways (like official medical extensions) that honour both compassion and fairness.',
    },
    {
      id: 'v11-q9',
      difficulty: 'Challenging',
      prompt: 'Why is documenting your rationale helpful in complex professional decisions?',
      options: [
        'Clear documentation clarifies your own reasoning, supports institutional accountability, and helps teams learn consistently.',
        'Documentation is meant to shift blame onto colleagues.',
        'Only lawyers should record decision rationales.',
        'Writing down reasons slows down ethical clarity.',
      ],
      correctIndex: 0,
      explanation:
        'Articulating the "why" behind a decision tests its soundness and builds transparent governance.',
    },
    {
      id: 'v11-q10',
      difficulty: 'Challenging',
      prompt: 'What is the primary goal of a 4-step ethical decision-making framework?',
      options: [
        'To provide a repeatable, principled habit for navigating uncertainty with clarity, fairness, and courage.',
        'To eliminate every difficult trade-off from human life.',
        'To prove that complex dilemmas have effortless answers.',
        'To replace personal conscience with a rigid checklist.',
      ],
      correctIndex: 0,
      explanation:
        'Frameworks do not erase complexity—they equip us to face complexity thoughtfully and responsibly.',
    },
  ],

  // 12. Real-Life Ethical Dilemmas — Would you sacrifice one person to save five? (yg16u_bzjPE)
  yg16u_bzjPE: [
    {
      id: 'v12-q1',
      difficulty: 'Easy',
      prompt: 'What classic philosophical thought experiment is explored in "Would you sacrifice one person to save five?"',
      options: [
        'The Ship of Theseus',
        'The Trolley Problem',
        'Pascal’s Wager',
        'Zeno’s Paradox',
      ],
      correctIndex: 1,
      explanation:
        'Introduced by Philippa Foot and expanded by Judith Jarvis Thomson, the Trolley Problem probes why our moral intuitions shift across seemingly similar trade-offs.',
    },
    {
      id: 'v12-q2',
      difficulty: 'Easy',
      prompt: 'How would a strict utilitarian typically evaluate pulling the lever to divert the trolley from five people onto one?',
      options: [
        'Pull the lever, because saving five lives at the cost of one produces the greater net good.',
        'Never intervene under any circumstance.',
        'Refuse to consider how many lives are saved.',
        'Base the choice purely on who you know personally.',
      ],
      correctIndex: 0,
      explanation:
        'Utilitarianism judges actions primarily by their net consequences—seeking the greatest good and least harm overall.',
    },
    {
      id: 'v12-q3',
      difficulty: 'Medium',
      prompt: 'Why do many people who would pull the lever hesitate to push a bystander off a footbridge to stop the trolley—even though the numerical trade-off (1 vs. 5) is identical?',
      options: [
        'Because using a person directly and intentionally as a mere physical means to an end violates deep duty-based intuitions about human rights.',
        'Because the math changes between the two scenarios.',
        'Because footbridges are taller than switches.',
        'Because nobody cares about the five people in the second version.',
      ],
      correctIndex: 0,
      explanation:
        'Deontological (duty-based) ethics distinguishes between foreseeable side effects and intentionally using an innocent person as an instrument.',
    },
    {
      id: 'v12-q4',
      difficulty: 'Medium',
      prompt: 'Which ethical framework emphasizes universal duties and insists humans must never be treated merely as means to an end?',
      options: [
        'Kantian deontology (duty-based ethics)',
        'Pure egoism',
        'Cultural relativism',
        'Simple majority rule',
      ],
      correctIndex: 0,
      explanation:
        'Immanuel Kant’s ethics centres on moral duties and the inherent dignity of every individual.',
    },
    {
      id: 'v12-q5',
      difficulty: 'Easy',
      prompt: 'Why do philosophers and ethicists study extreme thought experiments like the Trolley Problem?',
      options: [
        'Because train switch failures happen daily to everyone.',
        'To isolate and reveal the hidden moral principles—consequences, intent, rights, and action vs. inaction—that guide our everyday judgments.',
        'To prove that ethics has no real-world relevance.',
        'To force everyone into choosing one single answer.',
      ],
      correctIndex: 1,
      explanation:
        'Thought experiments strip away clutter so we can examine *why* our ethical intuitions pull in competing directions.',
    },
    {
      id: 'v12-q6',
      difficulty: 'Medium',
      prompt: 'In modern technology, where do trolley-style trade-offs appear in real engineering ethics?',
      options: [
        'Programming safety prioritization and risk allocation in autonomous vehicles and emergency medical triage systems.',
        'Choosing website font sizes.',
        'Formatting email signatures.',
        'Selecting office coffee machines.',
      ],
      correctIndex: 0,
      explanation:
        'Autonomous systems, public-health triage, and safety-critical algorithms force engineers to confront real risk-distribution ethics.',
    },
    {
      id: 'v12-q7',
      difficulty: 'Medium',
      prompt: 'What is the "Doctrine of Double Effect" often discussed alongside trolley dilemmas?',
      options: [
        'The idea that an unintended harmful side effect of a good action may be morally different from directly intending harm as a means to achieve good.',
        'Always double-checking arithmetic before voting.',
        'Making two backup plans for every project.',
        'Applying penalties twice for repeated offences.',
      ],
      correctIndex: 0,
      explanation:
        'Double Effect highlights how moral intention—harm as a foreseeable side effect vs. harm as an intended tool—shapes ethical judgment.',
    },
    {
      id: 'v12-q8',
      difficulty: 'Challenging',
      prompt: 'How do real-life ethical dilemmas usually differ from textbook trolley thought experiments?',
      options: [
        'Real-life dilemmas involve uncertainty, imperfect information, time to prevent crises early, and creative alternatives beyond two tragic choices.',
        'Real-life dilemmas never involve competing values.',
        'Real-life dilemmas always have exact numerical certainty.',
        'Real-life dilemmas never affect other people.',
      ],
      correctIndex: 0,
      explanation:
        'In real life, proactive prevention, communication, and creative problem-solving are often our strongest ethical tools.',
    },
    {
      id: 'v12-q9',
      difficulty: 'Challenging',
      prompt: 'Why can thoughtful, honest people reach different conclusions on complex dilemmas?',
      options: [
        'Because they weigh legitimate moral values—such as overall welfare versus inviolable individual rights—differently.',
        'Because one group completely lacks empathy.',
        'Because ethical reasoning is purely random.',
        'Because facts never matter in dilemmas.',
      ],
      correctIndex: 0,
      explanation:
        'Recognizing that ethical disagreements often stem from competing genuine principles fosters respectful, deeper dialogue.',
    },
    {
      id: 'v12-q10',
      difficulty: 'Challenging',
      prompt: 'What is the healthiest takeaway from studying moral dilemmas like the Trolley Problem?',
      options: [
        'Examining multiple frameworks—consequences, duties, rights, and character—helps us reason clearly and humbly before acting.',
        'Never make decisions whenever trade-offs exist.',
        'Only numbers matter in human ethics.',
        'Ignore rules whenever outcomes look convenient.',
      ],
      correctIndex: 0,
      explanation:
        'Multi-perspective reasoning prepares us to act thoughtfully and explain our principles responsibly.',
    },
  ],

  // 13. Teamwork and Accountability — Moral Myopia | Ethics Defined (u8KpQatf3mw)
  u8KpQatf3mw: [
    {
      id: 'v13-q1',
      difficulty: 'Easy',
      prompt: 'What does "moral myopia" mean in behavioral and team ethics?',
      options: [
        'A shortsighted inability to clearly see the ethical dimensions of a decision until after harm occurs.',
        'Working closely with teammates on a design blueprint.',
        'Refusing to take breaks during long projects.',
        'Having perfect foresight about future outcomes.',
      ],
      correctIndex: 0,
      explanation:
        'Like physical nearsightedness, moral myopia blurs ethical implications right in front of us when we fixate too narrowly on immediate targets.',
    },
    {
      id: 'v13-q2',
      difficulty: 'Easy',
      prompt: 'What commonly causes moral myopia inside high-pressure teams?',
      options: [
        'Tunnel vision on deadlines, grades, or metrics—paired with group conformity and "everyone else is doing it" thinking.',
        'Holding structured ethics discussions.',
        'Listening carefully to diverse team perspectives.',
        'Documenting contributions transparently.',
      ],
      correctIndex: 0,
      explanation:
        'Hyper-focus on short-term wins often crowds out awareness of fairness, credit, or downstream impact.',
    },
    {
      id: 'v13-q3',
      difficulty: 'Medium',
      prompt: 'How does "diffusion of responsibility" weaken team accountability?',
      options: [
        'When everyone assumes "someone else on the team will check or fix it," critical ethical oversights slip through untouched.',
        'Sharing clear task ownership prevents mistakes.',
        'Rotating team roles fairly increases accountability.',
        'It makes teams finish work twice as fast.',
      ],
      correctIndex: 0,
      explanation:
        'Clear individual ownership paired with mutual accountability prevents bystander passivity.',
    },
    {
      id: 'v13-q4',
      difficulty: 'Easy',
      prompt: 'Why is diverse feedback within a team an antidote to moral myopia?',
      options: [
        'Colleagues with different backgrounds and viewpoints notice ethical blind spots and unfair impacts that a uniform group might overlook.',
        'Diverse groups never disagree.',
        'Feedback removes the need for clear deadlines.',
        'Only team leads should spot risks.',
      ],
      correctIndex: 0,
      explanation:
        'Multiple viewpoints widen the team’s ethical peripheral vision before mistakes become entrenched.',
    },
    {
      id: 'v13-q5',
      difficulty: 'Medium',
      prompt: 'In a group project, what does "team accountability" look like in practice?',
      options: [
        'Meeting agreed commitments, flagging blockers early, crediting contributors accurately, and owning team errors together without scapegoating.',
        'Hiding mistakes until after the grading rubric is finalized.',
        'Letting the most vocal speaker claim all credit.',
        'Blaming the quietest member whenever a bug appears.',
      ],
      correctIndex: 0,
      explanation:
        'True accountability combines personal reliability with fair recognition and constructive problem-solving.',
    },
    {
      id: 'v13-q6',
      difficulty: 'Medium',
      prompt: 'What is "groupthink," and how does it reinforce moral myopia?',
      options: [
        'Strong pressure for harmony discourages teammates from voicing legitimate ethical doubts, locking the group into flawed choices.',
        'Brainstorming creatively together before choosing a plan.',
        'Listening to quiet teammates during critiques.',
        'Reviewing project risks with an external mentor.',
      ],
      correctIndex: 0,
      explanation:
        'When conformity outweighs candour, teams silence the very voices that could prevent ethical failures.',
    },
    {
      id: 'v13-q7',
      difficulty: 'Medium',
      prompt: 'How can a team build a practical safeguard against moral myopia before launching a project?',
      options: [
        'Run a brief "pre-mortem" asking: "Who could this project unintentionally exclude, mislead, or harm?"',
        'Skip testing to preserve momentum.',
        'Keep project decisions hidden from users.',
        'Assume good intentions automatically guarantee fair outcomes.',
      ],
      correctIndex: 0,
      explanation:
        'Asking structured pre-mortem questions widens perspective while changes are still easy and inexpensive to make.',
    },
    {
      id: 'v13-q8',
      difficulty: 'Challenging',
      prompt: 'Why do otherwise ethical people sometimes stay silent when a team cuts an ethical corner?',
      options: [
        'Fear of appearing disloyal, awkwardness in challenging peers, or rationalizing that the decision belongs solely to the team lead.',
        'Because they want the project to fail.',
        'Because they do not understand basic honesty.',
        'Because silence always resolves unfairness.',
      ],
      correctIndex: 0,
      explanation:
        'Understanding these social pressures prepares us to practise calm, respectful moral courage early.',
    },
    {
      id: 'v13-q9',
      difficulty: 'Challenging',
      prompt: 'When you notice a teammate’s contribution was accidentally omitted from project credits, how does overcoming moral myopia help?',
      options: [
        'You spot the fairness issue immediately instead of treating slide editing as purely clerical, and ensure accurate attribution before submission.',
        'You ignore it because the presentation looks polished.',
        'You assume the teammate should have checked it themselves.',
        'You wait until grades are posted to mention it.',
      ],
      correctIndex: 0,
      explanation:
        'Seeing routine project tasks through an ethical lens protects fairness and strengthens team trust.',
    },
    {
      id: 'v13-q10',
      difficulty: 'Challenging',
      prompt: 'What distinguishes a blameless post-mortem from avoiding accountability?',
      options: [
        'Individuals still own mistakes honestly, while the team focuses on fixing systemic gaps so errors cannot recur rather than shaming people into hiding flaws.',
        'Nobody admits anything went wrong.',
        'All quality standards are lowered.',
        'Only external partners are criticized.',
      ],
      correctIndex: 0,
      explanation:
        'Constructive accountability encourages early truth-telling and lasting systemic improvement.',
    },
  ],

  // 14. Respect and Equality — Empathy is our Superpower! | Anita Nowak (yru1oKJTQro)
  yru1oKJTQro: [
    {
      id: 'v14-q1',
      difficulty: 'Easy',
      prompt: 'Why is empathy described as a transformative human capability in personal and social ethics?',
      options: [
        'It enables us to understand others’ lived realities, bridge divides, and treat people with authentic dignity and equality.',
        'It means agreeing uncritically with every opinion.',
        'It removes the need for clear personal boundaries.',
        'It is an innate gift that can never be developed.',
      ],
      correctIndex: 0,
      explanation:
        'Empathy connects ethical principles to real human lives—turning abstract ideals of respect into compassionate action.',
    },
    {
      id: 'v14-q2',
      difficulty: 'Easy',
      prompt: 'How does empathy differ from sympathy or pity?',
      options: [
        'Empathy stands beside someone to understand their perspective as an equal; pity looks down from a distance.',
        'Sympathy requires deeper listening than empathy.',
        'Pity is always more empowering than empathy.',
        'They are exact synonyms.',
      ],
      correctIndex: 0,
      explanation:
        'Empathy honours the other person’s equal dignity rather than creating a hierarchy of helper and helpless.',
    },
    {
      id: 'v14-q3',
      difficulty: 'Medium',
      prompt: 'What are the key dimensions of empathy often discussed by researchers?',
      options: [
        'Cognitive empathy (understanding perspective), emotional empathy (resonating with feelings), and compassionate action (responding helpfully).',
        'Debating, winning, and persuading.',
        'Silence, detachment, and speed.',
        'Memorization, grading, and competition.',
      ],
      correctIndex: 0,
      explanation:
        'Mature empathy pairs perspective-taking and emotional attunement with thoughtful, respectful action.',
    },
    {
      id: 'v14-q4',
      difficulty: 'Easy',
      prompt: 'Can empathy be practised and strengthened like a muscle?',
      options: [
        'Yes—through active listening, curiosity about unfamiliar experiences, and deliberate perspective-taking.',
        'No—empathy is permanently fixed in early childhood.',
        'Only by professional therapists.',
        'Only during formal workshops.',
      ],
      correctIndex: 0,
      explanation:
        'Research shows intentional listening, reading diverse stories, and pausing judgment measurably expand empathy.',
    },
    {
      id: 'v14-q5',
      difficulty: 'Medium',
      prompt: 'How does empathy strengthen equality and inclusion in classrooms and workplaces?',
      options: [
        'It helps us notice subtle barriers, interruptions, or exclusions that peers from different backgrounds face and take fair steps to include every voice.',
        'It encourages treating only close friends warmly.',
        'It eliminates the need for fair evaluation rubrics.',
        'It means lowering expectations for quieter colleagues.',
      ],
      correctIndex: 0,
      explanation:
        'Empathy reveals invisible friction points so teams can design genuinely equitable spaces.',
    },
    {
      id: 'v14-q6',
      difficulty: 'Medium',
      prompt: 'What is "active listening" as an everyday expression of respect?',
      options: [
        'Giving undivided attention, suspending interruption, and reflecting back what you heard to confirm understanding.',
        'Waiting silently while planning your counter-argument.',
        'Checking messages while nodding occasionally.',
        'Finishing someone else’s sentences to save time.',
      ],
      correctIndex: 0,
      explanation:
        'Full, attentive listening signals unmistakable respect for another person’s voice and time.',
    },
    {
      id: 'v14-q7',
      difficulty: 'Medium',
      prompt: 'Why is empathy especially valuable during polarized disagreements?',
      options: [
        'It humanizes the person behind a differing viewpoint, allowing tough ideas to be debated without personal hostility.',
        'It forces you to abandon your core ethical convictions.',
        'It avoids discussing important issues altogether.',
        'It ensures nobody ever feels challenged.',
      ],
      correctIndex: 0,
      explanation:
        'You can hold firm ethical convictions while still extending basic dignity and genuine curiosity to people who see things differently.',
    },
    {
      id: 'v14-q8',
      difficulty: 'Challenging',
      prompt: 'What is "empathy bias" (in-group empathy), and how do ethical thinkers guard against it?',
      options: [
        'We naturally empathize more easily with people similar to ourselves; fairness requires intentionally extending perspective-taking to unfamiliar or distant groups too.',
        'Empathy bias means caring too much about fairness.',
        'It only affects people who dislike teamwork.',
        'It disappears automatically without reflection.',
      ],
      correctIndex: 0,
      explanation:
        'Pairing empathy with impartial fairness prevents our care from stopping at our own circle of friends.',
    },
    {
      id: 'v14-q9',
      difficulty: 'Challenging',
      prompt: 'How does empathetic leadership coexist with clear accountability?',
      options: [
        'By holding high, transparent standards while communicating feedback with dignity, listening to obstacles, and supporting growth.',
        'By excusing repeated unethical behaviour to avoid awkwardness.',
        'By avoiding performance conversations completely.',
        'By letting standards vary randomly by mood.',
      ],
      correctIndex: 0,
      explanation:
        'Respectful accountability is neither harsh nor permissive—it pairs clarity with genuine human care.',
    },
    {
      id: 'v14-q10',
      difficulty: 'Challenging',
      prompt: 'Which everyday practice best turns empathy into ethical action?',
      options: [
        'Noticing who is left out of a conversation or credit list and using your voice respectfully to open space for them.',
        'Feeling concerned privately without ever acting.',
        'Assuming others will always ask loudly when they need support.',
        'Speaking on someone’s behalf without asking their preference.',
      ],
      correctIndex: 0,
      explanation:
        'Empathetic action notices quiet exclusion and responds with respectful, empowering inclusion.',
    },
  ],

  // 15. Corporate Social Responsibility — What Is CSR? | HBS Online (ZoKihFLCY0s)
  ZoKihFLCY0s: [
    {
      id: 'v15-q1',
      difficulty: 'Easy',
      prompt: 'What is Corporate Social Responsibility (CSR)?',
      options: [
        'A business model in which companies hold themselves socially accountable to stakeholders, communities, and the environment alongside financial goals.',
        'A marketing strategy used strictly during holiday sales.',
        'A requirement that applies solely to government agencies.',
        'Paying the lowest possible wages to cut costs.',
      ],
      correctIndex: 0,
      explanation:
        'CSR integrates social, environmental, and ethical stewardship into how a business operates and creates value.',
    },
    {
      id: 'v15-q2',
      difficulty: 'Easy',
      prompt: 'Which four broad areas are commonly recognized as pillars of Corporate Social Responsibility?',
      options: [
        'Environmental, Ethical, Philanthropic, and Economic responsibility.',
        'Advertising, Pricing, Packaging, and Logistics.',
        'Speed, Secrecy, Competition, and Expansion.',
        'Hiring, Firing, Bonuses, and Office Design.',
      ],
      correctIndex: 0,
      explanation:
        'Comprehensive CSR spans environmental stewardship, ethical operations, philanthropic giving, and responsible economic value creation.',
    },
    {
      id: 'v15-q3',
      difficulty: 'Easy',
      prompt: 'What is an example of the *environmental* pillar of CSR?',
      options: [
        'Reducing carbon emissions, conserving water, minimizing packaging waste, and transitioning to renewable energy.',
        'Increasing billboard advertising in urban centres.',
        'Shortening customer warranty windows.',
        'Delaying supplier invoices.',
      ],
      correctIndex: 0,
      explanation:
        'Environmental CSR actively lowers ecological footprints across production, energy use, and product lifecycles.',
    },
    {
      id: 'v15-q4',
      difficulty: 'Medium',
      prompt: 'What does the *ethical* pillar of CSR focus on?',
      options: [
        'Ensuring fair treatment of workers, safe conditions, honest marketing, equitable pay, and ethical sourcing across the value chain.',
        'Donating surplus merchandise once a year.',
        'Printing slogans on shopping bags.',
        'Lowering product quality to maximize margins.',
      ],
      correctIndex: 0,
      explanation:
        'Ethical CSR ensures daily business operations treat employees, suppliers, and customers justly.',
    },
    {
      id: 'v15-q5',
      difficulty: 'Medium',
      prompt: 'How does *economic responsibility* fit into CSR?',
      options: [
        'Making sound financial decisions that sustain the business while backing positive social and environmental commitments rather than purely short-term extraction.',
        'Ignoring profitability completely.',
        'Avoiding paying local taxes.',
        'Cutting safety investments to boost quarterly profit.',
      ],
      correctIndex: 0,
      explanation:
        'Economic CSR ties financial decision-making to sustainable long-term value creation for both the enterprise and society.',
    },
    {
      id: 'v15-q6',
      difficulty: 'Medium',
      prompt: 'What is "greenwashing," and why does it harm CSR credibility?',
      options: [
        'Exaggerating or fabricating environmental commitments for publicity without meaningful operational action—which breaks consumer and public trust.',
        'Cleaning factory equipment using eco-friendly soap.',
        'Publishing verified annual emissions reductions.',
        'Partnering transparently with independent environmental auditors.',
      ],
      correctIndex: 0,
      explanation:
        'Misleading sustainability claims deceive conscious consumers and undermine legitimate climate and community work.',
    },
    {
      id: 'v15-q7',
      difficulty: 'Medium',
      prompt: 'Why do employees and graduates increasingly evaluate a company’s CSR commitments?',
      options: [
        'People want meaningful work aligned with their personal values, increasing engagement, pride, and long-term retention.',
        'CSR replaces fair compensation completely.',
        'CSR eliminates professional performance expectations.',
        'Only non-technical teams care about company values.',
      ],
      correctIndex: 0,
      explanation:
        'Values-aligned organizations attract motivated talent and foster stronger workplace loyalty.',
    },
    {
      id: 'v15-q8',
      difficulty: 'Challenging',
      prompt: 'In India, why is CSR also a well-known formal governance topic?',
      options: [
        'Under the Companies Act, 2013 (Section 135), qualifying profitable companies have structured CSR governance, board committees, and transparent reporting duties.',
        'CSR is prohibited for private companies in India.',
        'Only startups under one year old follow CSR frameworks.',
        'CSR only covers sports sponsorships.',
      ],
      correctIndex: 0,
      explanation:
        'India’s Companies Act pioneered statutory CSR governance for qualifying large enterprises—making transparent social impact a core boardroom priority.',
    },
    {
      id: 'v15-q9',
      difficulty: 'Challenging',
      prompt: 'What separates *philanthropic* CSR from *embedded operational* CSR?',
      options: [
        'Philanthropy donates money or grants to causes, while embedded CSR redesigns core products, sourcing, and workplace practices to create positive impact every day.',
        'Philanthropy is always more effective than ethical operations.',
        'Embedded CSR forbids charitable donations.',
        'There is no meaningful distinction between them.',
      ],
      correctIndex: 0,
      explanation:
        'Both matter—charitable giving supports communities, while embedded CSR ensures the business itself operates responsibly.',
    },
    {
      id: 'v15-q10',
      difficulty: 'Challenging',
      prompt: 'How can a company demonstrate that its CSR commitments are authentic and accountable?',
      options: [
        'Set concrete measurable targets, publish transparent annual impact audits (including setbacks), and tie leadership accountability to progress.',
        'Publish inspirational mission posters without metrics.',
        'Keep supply-chain practices strictly confidential from reviewers.',
        'Focus solely on one-time photo opportunities.',
      ],
      correctIndex: 0,
      explanation:
        'Measurable goals, third-party verification, and honest transparency turn CSR from rhetoric into real societal impact.',
    },
  ],
};
