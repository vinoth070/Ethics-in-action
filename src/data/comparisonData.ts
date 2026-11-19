import { CommonValueBridge, ComparisonCategory } from '../types/ethics';

export const COMPARISON_CATEGORIES: ComparisonCategory[] = [
  {
    id: 'meaning',
    index: '01',
    title: 'Meaning',
    subtitle: 'Core identity of each ethical sphere',
    personal: {
      summary: 'Internal moral values and conscience guiding how an individual chooses to live.',
      details: [
        'Reflects personal beliefs about right, wrong, kindness, and character.',
        'Applies across private choices, friendships, family life, and everyday citizenship.',
      ],
      example: 'Returning extra change to a street vendor because your conscience values honesty.',
    },
    professional: {
      summary: 'Shared standards, codes, and obligations governing conduct within an occupation or institution.',
      details: [
        'Defines the public trust expected of students, researchers, engineers, doctors, and employees.',
        'Protects clients, colleagues, institutions, and society from negligence or abuse of authority.',
      ],
      example: 'Citing all research sources accurately and protecting confidential client files at work.',
    },
    keyTakeaway:
      'Personal ethics answers "Who do I strive to be as a human being?" while professional ethics answers "What standards must I uphold in the role entrusted to me?"',
  },
  {
    id: 'foundation',
    index: '02',
    title: 'Foundation',
    subtitle: 'Where each set of values originates',
    personal: {
      summary: 'Shaped by upbringing, culture, reflection, empathy, and lived experience.',
      details: [
        'Evolves organically through family values, mentorship, philosophy, and self-examination.',
        'Rooted primarily in internal moral conviction rather than written contracts.',
      ],
      example: 'Developing a deep habit of empathy after experiencing kindness during a hard semester.',
    },
    professional: {
      summary: 'Established by professional bodies, academic charters, laws, and organizational codes.',
      details: [
        'Formally documented through institutional policies, regulatory guidelines, and industry standards.',
        'Designed to create consistent, fair expectations across diverse teams regardless of personal background.',
      ],
      example: 'University academic integrity regulations, data protection laws, and engineering codes of conduct.',
    },
    keyTakeaway:
      'Personal ethics grows from within; professional ethics is codified collectively to guarantee dependable standards for everyone.',
  },
  {
    id: 'guiding-principles',
    index: '03',
    title: 'Guiding Principles',
    subtitle: 'Primary pillars directing behaviour',
    personal: {
      summary: 'Truthfulness, compassion, loyalty, humility, respect, and personal accountability.',
      details: [
        'Emphasizes sincerity in relationships and alignment between thought and action.',
        'Encourages generosity and care even where no formal rule demands it.',
      ],
      example: 'Checking in on an isolated neighbour or patiently mentoring a younger student.',
    },
    professional: {
      summary: 'Impartiality, competence, confidentiality, transparency, conflict-of-interest disclosure, and public safety.',
      details: [
        'Requires objective judgment even when personal friendships or conveniences pull another way.',
        'Balances stakeholder interests fairly within institutional duties.',
      ],
      example: 'Recusing yourself from scoring a competition entry submitted by a close relative.',
    },
    keyTakeaway:
      'Personal principles nurture authentic human bonds; professional principles safeguard impartiality and institutional credibility.',
  },
  {
    id: 'rules-standards',
    index: '04',
    title: 'Rules and Standards',
    subtitle: 'Formality and accountability mechanisms',
    personal: {
      summary: 'Unwritten, self-enforced, and flexible to nuanced human relationships.',
      details: [
        'Accountability comes primarily through conscience, self-respect, and interpersonal trust.',
        'Violations typically damage relationships or personal peace of mind rather than triggering formal hearings.',
      ],
      example: 'Feeling accountable to apologize sincerely when you forget a friend’s important milestone.',
    },
    professional: {
      summary: 'Explicitly written, auditable, and backed by formal governance or regulatory review.',
      details: [
        'Includes honour codes, non-disclosure agreements, grading rubrics, and compliance frameworks.',
        'Breaches can lead to academic penalties, license suspension, legal liability, or loss of employment.',
      ],
      example: 'Formal disciplinary review for submitting plagiarized code or leaking confidential records.',
    },
    keyTakeaway:
      'Personal ethics relies on inner stewardship; professional ethics pairs inner stewardship with explicit, verifiable standards.',
  },
  {
    id: 'application',
    index: '05',
    title: 'Application',
    subtitle: 'Settings where each framework operates',
    personal: {
      summary: 'Everywhere—home, friendships, social media, community spaces, and quiet solitary moments.',
      details: [
        'Never clocks out at the end of a lecture or workday.',
        'Shapes tone, patience, honesty, and civic courtesy in everyday interactions.',
      ],
      example: 'Refusing to spread unverified rumours in a private messaging group.',
    },
    professional: {
      summary: 'Classrooms, laboratories, internships, offices, client engagements, and public service roles.',
      details: [
        'Governs research output, team collaboration, digital data handling, and official communications.',
        'Extends to how professionals represent institutional credibility in public forums.',
      ],
      example: 'Protecting student survey privacy when publishing results from a campus analytics project.',
    },
    keyTakeaway:
      'Personal ethics spans all of life; professional ethics focuses sharply on environments where others depend on your role and expertise.',
  },
  {
    id: 'responsibilities',
    index: '06',
    title: 'Responsibilities',
    subtitle: 'To whom we owe our ethical care',
    personal: {
      summary: 'Primarily toward oneself, family, friends, neighbours, and the wider community.',
      details: [
        'Centred on keeping promises, avoiding harm, and treating every individual with dignity.',
        'Encourages active citizenship and everyday kindness.',
      ],
      example: 'Honouring a promise to support a family member despite personal inconvenience.',
    },
    professional: {
      summary: 'Toward colleagues, clients, students, employers, institutions, and public welfare.',
      details: [
        'Includes fiduciary care, accurate documentation, safety assurance, and equitable treatment.',
        'Requires prioritizing public safety even when organizational deadlines feel intense.',
      ],
      example: 'Flagging a critical software security flaw before release rather than staying silent.',
    },
    keyTakeaway:
      'As responsibility scales from personal circles to institutional roles, the ripple effect of each decision reaches far more people.',
  },
  {
    id: 'examples',
    index: '07',
    title: 'Examples',
    subtitle: 'Concrete scenarios side by side',
    personal: {
      summary: 'Everyday moments of character when convenience tests conscience.',
      details: [
        'Returning a lost wallet intact with all cash and ID cards.',
        'Admitting a mistake openly instead of blaming a sibling or roommate.',
      ],
      example: 'Waiting fairly in a queue and helping an elderly commuter find a seat.',
    },
    professional: {
      summary: 'Structured academic and workplace decisions involving trust and standards.',
      details: [
        'Crediting every teammate’s contribution accurately on a project report.',
        'Deleting misdirected confidential salary records and alerting HR immediately.',
      ],
      example: 'Declining a friend’s request to copy your graded assignment while offering to explain the concept.',
    },
    keyTakeaway:
      'Real-world scenarios often sit at the crossroads of both—making clear reflection essential before acting.',
  },
  {
    id: 'decision-making',
    index: '08',
    title: 'Decision-Making',
    subtitle: 'How ethical choices are reasoned through',
    personal: {
      summary: 'Guided by reflection, empathy, moral intuition, and the kind of person you want to become.',
      details: [
        'Asks: "Is this truthful, kind, fair, and aligned with my conscience?"',
        'Leaves room for personal mercy, forgiveness, and relational nuance.',
      ],
      example: 'Choosing how to deliver honest advice to a close friend with maximum gentleness.',
    },
    professional: {
      summary: 'Guided by structured frameworks, policy verification, stakeholder analysis, and documented rationale.',
      details: [
        'Asks: "Does this honour codes, consent, impartiality, transparency, and public safety?"',
        'Often involves consulting mentors, compliance guidelines, or ethics committees in complex dilemmas.',
      ],
      example: 'Reviewing institutional data-privacy guidelines and seeking advisor sign-off before sharing a dataset.',
    },
    keyTakeaway:
      'The strongest decision-makers unite personal conscience with structured professional reasoning—especially when rules alone feel ambiguous.',
  },
];

export const COMMON_VALUES_BRIDGE: CommonValueBridge[] = [
  {
    id: 'honesty',
    name: 'Honesty',
    coreMeaning: 'Commitment to truth without deception or distortion.',
    inPersonalLife: 'Speaking truthfully with family and friends, and returning lost property intact.',
    inProfessionalLife: 'Reporting accurate metrics, citing academic sources, and avoiding misleading claims.',
    synergyInsight: 'Habitual honesty in everyday life makes truthful professional reporting natural under pressure.',
  },
  {
    id: 'respect',
    name: 'Respect',
    coreMeaning: 'Honouring every person’s dignity, voice, and boundaries.',
    inPersonalLife: 'Listening patiently, respecting personal privacy, and showing courtesy in daily life.',
    inProfessionalLife: 'Fostering inclusive meetings, welcoming diverse perspectives, and maintaining dignified communication.',
    synergyInsight: 'Personal courtesy builds the empathy needed for truly respectful leadership and teamwork.',
  },
  {
    id: 'fairness',
    name: 'Fairness',
    coreMeaning: 'Impartial, just treatment free from bias or favouritism.',
    inPersonalLife: 'Hearing both sides in a dispute and sharing resources equitably.',
    inProfessionalLife: 'Grading, hiring, and crediting teammates strictly on clear, transparent criteria.',
    synergyInsight: 'Fairness in friendships trains us to resist favouritism when holding professional authority.',
  },
  {
    id: 'responsibility',
    name: 'Responsibility',
    coreMeaning: 'Reliable stewardship of commitments and shared outcomes.',
    inPersonalLife: 'Keeping personal promises and caring for shared community spaces.',
    inProfessionalLife: 'Meeting deadlines dependably, safeguarding confidential data, and prioritizing public safety.',
    synergyInsight: 'Dependability in small personal duties is the foundation of institutional trust.',
  },
  {
    id: 'integrity',
    name: 'Integrity',
    coreMeaning: 'Consistent alignment between values and actions—even unobserved.',
    inPersonalLife: 'Standing by your values privately when no reward or audience is present.',
    inProfessionalLife: 'Upholding ethical standards despite commercial shortcuts, peer pressure, or tight deadlines.',
    synergyInsight: 'Integrity is the keystone that prevents a split between who you are at home and who you are at work.',
  },
];
