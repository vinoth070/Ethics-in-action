import { PersonalValueItem } from '../types/ethics';

export const PERSONAL_VALUES: PersonalValueItem[] = [
  {
    id: 'honesty',
    index: '01',
    name: 'Honesty',
    tagline: 'Speaking and living truthfully, even when convenience tempts distortion.',
    definition:
      'Honesty is the commitment to truthfulness in words, actions, and intentions. It means refusing to deceive others through falsehoods, selective omissions, or exaggeration.',
    whyItMatters:
      'Trust in families, friendships, and communities depends on reliable communication. When honesty becomes habitual, people feel secure relying on your word and sharing openly with you.',
    realLifeExamples: [
      {
        title: 'Finding a Lost Wallet',
        detail:
          'Discovering a wallet containing cash and an ID card near a campus café and returning it intact to the owner or lost-and-found desk without taking anything.',
      },
      {
        title: 'Correcting a Billing Error',
        detail:
          'Noticing a shopkeeper returned extra change by mistake and immediately handing back the difference.',
      },
    ],
    everydayApplications: [
      'Representing your actual effort and timeline instead of inventing excuses when running late.',
      'Giving kind, truthful feedback rather than insincere flattery that misleads a friend.',
      'Returning borrowed items promptly and reporting any accidental damage upfront.',
    ],
    practicalSituation: {
      title: 'The Unattended Wallet on the Bench',
      context: 'Everyday Civic Choice',
      prompt:
        'After evening classes, you spot a leather wallet left on a quiet courtyard bench. Inside are ₹2,500 in cash, a college ID card, and a metro smart card. Nobody else is nearby.',
      choices: [
        {
          label: 'Use the ID details or campus security desk to return it intact.',
          reflection:
            'Upholding honesty when no one is watching protects another person from financial stress and strengthens community trust.',
          alignment: 'strong',
        },
        {
          label: 'Leave it untouched on the bench assuming the owner will come back.',
          reflection:
            'While not dishonest, leaving valuables unprotected risks someone else taking them. Active stewardship paired with honesty is usually safer for the owner.',
          alignment: 'nuanced',
        },
        {
          label: 'Keep the cash as a finder’s reward and drop the ID card nearby.',
          reflection:
            'Keeping money that belongs to someone else violates honesty and personal integrity, even if the ID is returned.',
          alignment: 'caution',
        },
      ],
    },
    reflectionPrompt: 'Which daily habit helps you practise honesty most consistently?',
    reflectionOptions: [
      'Admitting promptly when I do not know an answer instead of guessing.',
      'Checking my facts before repeating stories or forwarding messages.',
      'Following through transparently when plans or commitments change.',
    ],
  },
  {
    id: 'integrity',
    index: '02',
    name: 'Integrity',
    tagline: 'Alignment between your deepest principles and your quietest actions.',
    definition:
      'Integrity means maintaining consistent moral principles across every setting—acting with the same fairness and honesty in private moments as you do in public view.',
    whyItMatters:
      'While honesty governs what you say, integrity governs who you are. It prevents double standards, builds inner self-respect, and creates a dependable moral compass under social pressure.',
    realLifeExamples: [
      {
        title: 'Keeping a Quiet Promise',
        detail:
          'Honouring a commitment to help a classmate prepare for a presentation even after a more exciting weekend invitation appears.',
      },
      {
        title: 'Declining Unfair Shortcuts',
        detail:
          'Refusing leaked exam hints shared in a private chat group because you value earning your progress genuinely.',
      },
    ],
    everydayApplications: [
      'Speaking about friends and peers in their absence with the same respect you show in person.',
      'Honouring personal boundaries and promises without waiting to be reminded.',
      'Evaluating choices by asking whether you would be comfortable explaining them openly.',
    ],
    practicalSituation: {
      title: 'Keeping a Promise Under Temptation',
      context: 'Personal Commitment',
      prompt:
        'You promised your younger sibling you would help them review for a difficult science test on Saturday evening. An hour beforehand, close friends invite you to a last-minute concert with a free ticket.',
      choices: [
        {
          label: 'Keep your promise to your sibling and kindly decline the concert.',
          reflection:
            'Keeping commitments even when they carry a real personal cost is the clearest expression of integrity and dependability.',
          alignment: 'strong',
        },
        {
          label: 'Talk honestly with your sibling to see if rescheduling earlier works without hurting their prep.',
          reflection:
            'Transparent communication respects your sibling’s needs, though you must be ready to stay if rescheduling would genuinely disadvantage them.',
          alignment: 'nuanced',
        },
        {
          label: 'Invent an urgent college task so you can slip away to the concert.',
          reflection:
            'Breaking a promise with an excuse erodes both integrity and family trust.',
          alignment: 'caution',
        },
      ],
    },
    reflectionPrompt: 'How do you recognize integrity in someone you admire?',
    reflectionOptions: [
      'They treat everyone politely, regardless of status or authority.',
      'Their actions match their stated values even when inconvenient.',
      'They stand up calmly for what is right without seeking applause.',
    ],
  },
  {
    id: 'empathy',
    index: '03',
    name: 'Empathy',
    tagline: 'Understanding another person’s lived perspective with genuine care.',
    definition:
      'Empathy is the capacity to listen attentively, recognize another person’s emotional reality, and respond with compassion rather than hasty judgment.',
    whyItMatters:
      'Rules alone cannot guide every human interaction. Empathy turns abstract principles into humane action, reduces conflict, and helps build inclusive spaces where people feel seen.',
    realLifeExamples: [
      {
        title: 'Supporting an Overwhelmed Friend',
        detail:
          'Noticing a normally cheerful friend has grown unusually quiet during exam week, checking in privately, and listening without rushing to lecture them.',
      },
      {
        title: 'Welcoming a Newcomer',
        detail:
          'Inviting a transfer student who is dining alone to join your study table and helping them navigate campus routines.',
      },
    ],
    everydayApplications: [
      'Pausing to consider hidden pressures someone may be carrying before reacting to a sharp remark.',
      'Listening to understand rather than waiting for your turn to debate.',
      'Offering practical, respectful support instead of unsolicited criticism.',
    ],
    practicalSituation: {
      title: 'Supporting a Friend Who Is Struggling',
      context: 'Interpersonal Care',
      prompt:
        'A close friend cancels group plans twice in a row and snaps slightly when someone jokes about them being unreliable. You sense something deeper is troubling them.',
      choices: [
        {
          label: 'Reach out privately with warmth and ask if they want to talk or just have quiet company.',
          reflection:
            'Private, pressure-free outreach honours dignity while creating safety for an honest conversation.',
          alignment: 'strong',
        },
        {
          label: 'Give them space for a few days while discouraging others in the group from gossiping.',
          reflection:
            'Protecting a friend from group speculation is respectful, and pairing it with a brief supportive message ensures they do not feel isolated.',
          alignment: 'nuanced',
        },
        {
          label: 'Call them out in the group chat for ruining everyone’s plans.',
          reflection:
            'Publicly confronting someone who may already be distressed deepens hurt and misses an opportunity for empathy.',
          alignment: 'caution',
        },
      ],
    },
    reflectionPrompt: 'What strengthens empathy during a disagreement?',
    reflectionOptions: [
      'Restating the other person’s point fairly before sharing my own view.',
      'Asking curious questions instead of assuming negative intent.',
      'Noticing non-verbal cues and giving others room to express concerns.',
    ],
  },
  {
    id: 'respect',
    index: '04',
    name: 'Respect',
    tagline: 'Honouring the dignity, boundaries, and voice of every individual.',
    definition:
      'Respect is recognizing the inherent worth of every person—shown through courtesy, attentive listening, cultural sensitivity, and care for shared spaces and personal boundaries.',
    whyItMatters:
      'Disagreements are inevitable in diverse classrooms and societies, but respect keeps disagreement constructive. It ensures that differences in opinion never turn into personal humiliation.',
    realLifeExamples: [
      {
        title: 'Constructive Debate',
        detail:
          'Challenging a classmate’s argument with clear evidence while addressing the idea rather than mocking the speaker.',
      },
      {
        title: 'Respecting Service Staff & Shared Spaces',
        detail:
          'Greeting campus custodial and cafeteria staff warmly and leaving common study tables clean for the next person.',
      },
    ],
    everydayApplications: [
      'Asking permission before sharing someone’s photograph or personal story online.',
      'Arriving on time so others’ schedules are treated as equally valuable as your own.',
      'Listening without interrupting, even when someone communicates slowly or in a second language.',
    ],
    practicalSituation: {
      title: 'When a Discussion Turns Personal',
      context: 'Community Dialogue',
      prompt:
        'During a student club meeting, a newer member proposes an unconventional idea for an annual event. Two senior members chuckle and dismiss it before they finish speaking.',
      choices: [
        {
          label: 'Politely invite the newer member to finish explaining their idea so everyone can weigh it fairly.',
          reflection:
            'Actively protecting a speaker’s floor affirms equal dignity and models respectful group norms.',
          alignment: 'strong',
        },
        {
          label: 'Speak to the newer member afterward to encourage them and suggest refining the proposal.',
          reflection:
            'Private encouragement helps, though addressing the interruption gently in the room also corrects disrespectful group dynamics.',
          alignment: 'nuanced',
        },
        {
          label: 'Stay silent and laugh along so the meeting stays light.',
          reflection:
            'Joining mockery discourages future participation and undermines psychological safety.',
          alignment: 'caution',
        },
      ],
    },
    reflectionPrompt: 'Where does practising respect make the biggest difference in your daily routine?',
    reflectionOptions: [
      'Putting away my phone to give full attention when someone is speaking.',
      'Respecting digital privacy and consent before posting or forwarding content.',
      'Treating every person with equal courtesy regardless of role or background.',
    ],
  },
  {
    id: 'responsibility',
    index: '05',
    name: 'Responsibility',
    tagline: 'Stepping up reliably for the duties, people, and spaces entrusted to you.',
    definition:
      'Responsibility is the proactive commitment to fulfil your obligations, anticipate the impact of your actions, and care for shared resources without needing constant supervision.',
    whyItMatters:
      'Dependable individuals keep communities, families, and teams functioning smoothly. Responsibility turns good intentions into tangible follow-through.',
    realLifeExamples: [
      {
        title: 'Preparing Ahead for Shared Duties',
        detail:
          'Completing your section of a community workshop well before the deadline so peers have time to review and coordinate smoothly.',
      },
      {
        title: 'Caring for Shared Equipment',
        detail:
          'Reporting a frayed power cable in the computer lab to staff immediately so no one gets hurt.',
      },
    ],
    everydayApplications: [
      'Managing time realistically so commitments do not collapse at the last minute.',
      'Considering environmental and social effects of daily choices, from waste disposal to digital behaviour.',
      'Communicating early if an unexpected obstacle threatens a promise.',
    ],
    practicalSituation: {
      title: 'Spotting a Shared Safety Issue',
      context: 'Everyday Stewardship',
      prompt:
        'You are the last student leaving an evening seminar room and notice water leaking near a floor extension strip, along with lights and projector still running.',
      choices: [
        {
          label: 'Switch off the projector/lights safely from the wall panel and alert facility security right away.',
          reflection:
            'Taking five minutes to prevent equipment damage or electrical hazards exemplifies proactive civic responsibility.',
          alignment: 'strong',
        },
        {
          label: 'Turn off the lights and leave a quick note on the door for the morning staff.',
          reflection:
            'Helpful intent, but a water leak near electricity requires immediate alert rather than waiting overnight.',
          alignment: 'nuanced',
        },
        {
          label: 'Walk out because maintenance is not your assigned job.',
          reflection:
            'Passing the risk onto whoever enters next neglects shared community responsibility.',
          alignment: 'caution',
        },
      ],
    },
    reflectionPrompt: 'What helps you follow through on responsibilities consistently?',
    reflectionOptions: [
      'Breaking larger commitments into clear, realistic milestones.',
      'Noticing small shared tasks rather than assuming someone else will handle them.',
      'Communicating early whenever circumstances shift.',
    ],
  },
  {
    id: 'accountability',
    index: '06',
    name: 'Accountability',
    tagline: 'Owning your choices and mistakes openly, then making things right.',
    definition:
      'Accountability is accepting ownership for the outcomes of your decisions—especially when things go wrong—without shifting blame, hiding errors, or offering defensive excuses.',
    whyItMatters:
      'Everyone makes mistakes. What distinguishes trustworthy character is the courage to acknowledge an error quickly, learn from it, and repair any harm caused.',
    realLifeExamples: [
      {
        title: 'Admitting a Mistake Early',
        detail:
          'Realizing you accidentally deleted a shared slide deck version, immediately informing your study partner, and helping rebuild it from notes rather than blaming a software glitch.',
      },
      {
        title: 'Accepting Fair Feedback',
        detail:
          'Listening calmly when a mentor points out an oversight and revising your work thoroughly.',
      },
    ],
    everydayApplications: [
      'Using clear ownership language ("I missed that detail—here is how I will fix it") instead of deflecting.',
      'Offering sincere apologies focused on the impact rather than justifying yourself.',
      'Turning setbacks into concrete process improvements so the same mistake does not repeat.',
    ],
    practicalSituation: {
      title: 'Admitting a Costly Oversight',
      context: 'Personal Ownership',
      prompt:
        'While volunteering as treasurer for a college cultural event, you misread an invoice and accidentally under-ordered refreshments for 40 guests two hours before opening.',
      choices: [
        {
          label: 'Inform the coordinator immediately, take ownership, and propose two fast backup catering options.',
          reflection:
            'Pairing prompt ownership with solution-focused action preserves trust and maximizes time to solve the problem.',
          alignment: 'strong',
        },
        {
          label: 'Try to quietly buy snacks yourself without telling anyone unless they notice.',
          reflection:
            'Taking initiative is positive, but hiding a budget or quantity discrepancy prevents coordinators from adjusting smoothly.',
          alignment: 'nuanced',
        },
        {
          label: 'Blame the vendor for sending a confusing quotation.',
          reflection:
            'Shifting blame onto an innocent third party damages your integrity and unfairness compounds the original error.',
          alignment: 'caution',
        },
      ],
    },
    reflectionPrompt: 'How do you prefer to handle a mistake once you discover it?',
    reflectionOptions: [
      'Acknowledge it directly to the people affected before they discover it themselves.',
      'Focus immediately on repairing the impact rather than defending my ego.',
      'Write down what caused the slip so I prevent it next time.',
    ],
  },
  {
    id: 'fairness',
    index: '07',
    name: 'Fairness',
    tagline: 'Treating people equitably without favouritism, bias, or double standards.',
    definition:
      'Fairness is making impartial decisions guided by transparent standards rather than personal preference, social popularity, or prejudice—ensuring every person receives a just opportunity.',
    whyItMatters:
      'Fairness sustains cooperation and morale. When people know rules and recognition apply evenly to everyone, communities thrive with less resentment and stronger mutual respect.',
    realLifeExamples: [
      {
        title: 'Treating Everyone Fairly in Selection',
        detail:
          'Evaluating debate club auditions using clear speaking criteria rather than automatically picking close friends.',
      },
      {
        title: 'Sharing Resources Equitably',
        detail:
          'Rotating sought-after practice equipment slots fairly so newer members receive equal practice time.',
      },
    ],
    everydayApplications: [
      'Hearing both sides of a disagreement before forming an opinion.',
      'Applying the same standards to friends that you expect from acquaintances.',
      'Recognizing hidden biases and intentionally creating room for quieter voices.',
    ],
    practicalSituation: {
      title: 'Selecting Lead Speakers Fairly',
      context: 'Impartial Judgement',
      prompt:
        'You are coordinating an inter-college panel and must select two student moderators from five applicants. Your best friend applied, but another applicant delivered a noticeably clearer, better-researched audition.',
      choices: [
        {
          label: 'Select based on clear audition criteria and explain the decision kindly and transparently to your friend.',
          reflection:
            'Honouring merit and transparent criteria upholds fairness for all applicants while treating your friend with honest respect.',
          alignment: 'strong',
        },
        {
          label: 'Ask two fellow committee members to score all auditions independently while you recuse yourself from scoring your friend.',
          reflection:
            'Recusal is an excellent ethical practice that removes personal conflict of interest and keeps the process demonstrably fair.',
          alignment: 'strong',
        },
        {
          label: 'Pick your friend anyway so the friendship does not feel awkward.',
          reflection:
            'Favouritism undermines trust in the organization and treats deserving candidates unjustly.',
          alignment: 'caution',
        },
      ],
    },
    reflectionPrompt: 'Which practice best protects fairness in group settings?',
    reflectionOptions: [
      'Agreeing on clear criteria before making selections or judging outcomes.',
      'Stepping back from decisions where I have a personal conflict of interest.',
      'Checking whether quieter or newer voices were given an equal chance.',
    ],
  },
];
