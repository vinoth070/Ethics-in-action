import { DecisionScenario } from '../types/ethics';

export const DECISION_SCENARIOS: DecisionScenario[] = [
  {
    id: 'lost-wallet',
    number: '01',
    title: 'The Lost Wallet',
    contextLabel: 'Everyday Civic Ethics · Personal Choice',
    ethicsFocus: 'Personal Ethics',
    setting: 'University Library Courtyard · Late Afternoon',
    situation:
      'While walking across a quiet campus courtyard after classes, you find a leather wallet beside a bench. Opening it carefully to check for ownership details, you see ₹3,200 in cash, a student ID card, a debit card, and a folded medical prescription. Nobody else is in sight.',
    stakeholders: ['The wallet’s owner', 'Campus security / lost-and-found staff', 'Yourself and community trust'],
    options: [
      {
        id: 'return-directly',
        label: 'Look up the student through official campus channels or hand the intact wallet to campus security with a signed receipt.',
        stance: 'Active Stewardship & Honesty',
        shortTermConsequences:
          'Takes 10–15 minutes of your time, ensures the wallet is logged safely, and allows the owner to recover both cash and essential medical documents promptly.',
        longTermConsequences:
          'Strengthens campus trust, protects the owner from financial and medical disruption, and reinforces habitual integrity.',
        principlesInvolved: ['Honesty', 'Integrity', 'Empathy', 'Civic Responsibility'],
        constructiveFeedback:
          'Turning the wallet in through an accountable channel—or contacting the owner transparently—combines honesty with practical care. Logging it at security also protects you from misunderstandings about missing contents.',
        perspectiveNote:
          'Both virtue ethics (acting as a trustworthy citizen) and consequentialist reasoning (preventing significant distress over a prescription and cash) align strongly here.',
      },
      {
        id: 'wait-briefly',
        label: 'Wait by the bench for 15 minutes in case the owner retraces their steps, then hand it to library reception if they do not return.',
        stance: 'Patient Care & Practical Helpfulness',
        shortTermConsequences:
          'If the owner rushes back immediately, they experience instant relief without having to visit security offices; if not, the reception desk still secures it.',
        longTermConsequences:
          'Demonstrates empathy and thoughtful initiative, provided you still log it formally if the owner does not appear.',
        principlesInvolved: ['Empathy', 'Honesty', 'Responsibility'],
        constructiveFeedback:
          'A balanced, compassionate approach! Many people retrace their path within minutes of realizing a wallet is missing. Setting a clear time limit before handing it to official staff keeps the wallet safe.',
        perspectiveNote:
          'Care ethics highlights sensitivity to the immediate anxiety of the owner, while formal handoff afterward ensures institutional accountability.',
      },
      {
        id: 'leave-it',
        label: 'Close the wallet and leave it on the bench so you do not get involved.',
        stance: 'Non-Interference',
        shortTermConsequences:
          'Saves you time and avoids any involvement, but leaves cash, cards, and a medical prescription exposed to weather or someone less honest.',
        longTermConsequences:
          'While you did not steal anything, passive inaction may result in serious avoidable harm to a fellow student.',
        principlesInvolved: ['Civic Responsibility', 'Empathy'],
        constructiveFeedback:
          'Not taking someone’s property satisfies a minimum standard of honesty, yet ethical citizenship often asks whether a small effort can prevent major harm to another person.',
        perspectiveNote:
          'Thinkers often distinguish between "doing no harm" and "preventing preventable harm." When the personal cost is minimal, stepping in thoughtfully carries clear ethical value.',
      },
      {
        id: 'keep-cash',
        label: 'Keep part of the cash as an unofficial finder’s fee and drop the wallet near reception.',
        stance: 'Self-Interest Rationalization',
        shortTermConsequences:
          'Gives you a short-term financial gain while leaving the owner puzzled or distressed about missing money needed for expenses or medicine.',
        longTermConsequences:
          'Erodes personal integrity and introduces a habit of rationalizing small dishonesties when unobserved.',
        principlesInvolved: ['Honesty', 'Integrity', 'Fairness'],
        constructiveFeedback:
          'Returning the ID does not offset taking money that belongs to someone else—especially when a medical prescription signals real personal need. True honesty holds even when no one can verify what was inside.',
        perspectiveNote:
          'Ethical integrity is tested most clearly in moments with zero surveillance: keeping an item intact affirms that principles matter for their own sake.',
      },
    ],
  },
  {
    id: 'uncredited-teammate',
    number: '02',
    title: 'The Uncredited Teammate',
    contextLabel: 'Academic & Team Ethics · Fair Recognition',
    ethicsFocus: 'Professional Ethics',
    setting: 'Final-Year Engineering & Design Project Presentation',
    situation:
      'Your four-member project team is presenting a semester research project tomorrow morning. Meera conducted the core user interviews and compiled the statistical analysis last week before leaving briefly for a family obligation. While reviewing the final slides tonight, you notice the team lead left Meera’s name off the methodology and results credits—listing only the three speakers.',
    stakeholders: ['Meera (research contributor)', 'The team lead', 'Evaluating faculty', 'The rest of the team'],
    options: [
      {
        id: 'update-slides-privately',
        label: 'Message the team lead respectfully right away, point out the omission assuming good faith, and add Meera’s clear credit across the slides.',
        stance: 'Constructive Advocacy & Fairness',
        shortTermConsequences:
          'Fixes the credit omission before the presentation without creating unnecessary public embarrassment, giving the team lead a graceful path to correct an oversight.',
        longTermConsequences:
          'Builds lasting trust with Meera, models courageous teamwork, and ensures faculty evaluate contributions accurately.',
        principlesInvolved: ['Fair Treatment', 'Teamwork', 'Academic Honesty', 'Respect'],
        constructiveFeedback:
          'Addressing the issue early and diplomatically protects both fairness and team harmony. Framing it as an oversight first keeps the conversation solution-oriented unless the lead explicitly refuses.',
        perspectiveNote:
          'Professional ethics encourages starting with direct, respectful peer resolution before escalating—while remaining firm that accurate attribution is non-negotiable.',
      },
      {
        id: 'credit-verbally-only',
        label: 'Leave the slides unchanged to avoid conflict tonight, and plan to mention Meera’s help briefly during Q&A.',
        stance: 'Conflict Avoidance',
        shortTermConsequences:
          'Avoids an uncomfortable message tonight, but the permanent slide deck submitted for grading still omits Meera’s name from her own research.',
        longTermConsequences:
          'If Q&A runs short or faculty grade from the submitted slides, Meera could lose deserved academic credit and feel let down by the team.',
        principlesInvolved: ['Fair Treatment', 'Academic Honesty', 'Accountability'],
        constructiveFeedback:
          'Good intentions during Q&A are easily crowded out by time limits. Written documentation matters deeply in academic and professional records.',
        perspectiveNote:
          'Balancing team harmony with justice is a classic dilemma: avoiding small discomfort today can unintentionally permit lasting unfairness.',
      },
      {
        id: 'escalate-immediately',
        label: 'Email the course professor tonight reporting the team lead for intentionally excluding Meera.',
        stance: 'Immediate Formal Escalation',
        shortTermConsequences:
          'Alerts faculty quickly, though it may escalate an accidental oversight into a tense disciplinary dispute hours before presenting.',
        longTermConsequences:
          'Ensures institutional oversight, yet could damage team collaboration if the omission was genuinely unintentional.',
        principlesInvolved: ['Fair Treatment', 'Accountability', 'Professional Communication'],
        constructiveFeedback:
          'Escalating to faculty is completely appropriate if a teammate refuses to correct deliberate exclusion. Checking directly with the lead first verifies whether it was an honest mistake or intentional.',
        perspectiveNote:
          'Proportional response is a hallmark of mature professional judgment—verify facts first, escalate promptly if fair resolution is blocked.',
      },
      {
        id: 'say-nothing',
        label: 'Stay out of it since your own name is listed accurately and Meera can review the slides later.',
        stance: 'Bystander Silence',
        shortTermConsequences:
          'Avoids friction for you tonight, but allows inaccurate attribution to be presented to evaluators.',
        longTermConsequences:
          'Undermines team trust and normalizes claiming or passively benefiting from another person’s uncredited labour.',
        principlesInvolved: ['Teamwork', 'Fairness', 'Professional Integrity'],
        constructiveFeedback:
          'In ethical teamwork, accuracy of credit is a shared responsibility—not only the concern of the person who was omitted.',
        perspectiveNote:
          'Standing up for a colleague who is absent from the room is one of the clearest measures of workplace and academic integrity.',
      },
    ],
  },
  {
    id: 'confidential-info',
    number: '03',
    title: 'The Misdirected Confidential File',
    contextLabel: 'Information Stewardship · Workplace Discretion',
    ethicsFocus: 'Professional Ethics',
    setting: 'Summer Internship · Operations Office',
    situation:
      'While working as a summer intern, you receive an internal email meant for a senior manager with a similar first name. The attachment is titled "Q3_Intern_Evaluations_and_Stipends.xlsx". You realize within seconds from the subject line and preview that it contains private feedback and compensation figures for all twelve interns.',
    stakeholders: ['Fellow interns whose privacy is exposed', 'The HR sender', 'The host organization', 'Your professional reputation'],
    options: [
      {
        id: 'notify-and-delete',
        label: 'Do not open or save the file; reply privately only to the sender to flag the misdirection, then permanently delete the email.',
        stance: 'Strict Confidentiality & Prompt Containment',
        shortTermConsequences:
          'Alerts HR immediately so they can audit their mailing list, and ensures private peer evaluations remain protected.',
        longTermConsequences:
          'Earns strong professional credibility with leadership and protects fellow interns’ dignity.',
        principlesInvolved: ['Confidentiality', 'Data Privacy', 'Professional Integrity'],
        constructiveFeedback:
          'This is the gold-standard professional response to misdirected confidential records. Acting swiftly without inspecting the file honours both legal/policy standards and personal respect for peers.',
        perspectiveNote:
          'Duty-based ethics (deontology) emphasizes respecting boundaries of authorization regardless of curiosity or personal benefit.',
      },
      {
        id: 'delete-silently',
        label: 'Delete the email immediately without reading it, and say nothing so the HR coordinator is not embarrassed.',
        stance: 'Quiet Discretion',
        shortTermConsequences:
          'Protects the data on your end and spares the sender an awkward reply, though the sender remains unaware the intended manager never received it—or whether another wrong recipient was copied.',
        longTermConsequences:
          'Leaves a minor operational gap because the sender cannot confirm the leak was contained.',
        principlesInvolved: ['Confidentiality', 'Empathy', 'Accountability'],
        constructiveFeedback:
          'Refusing to read the file shows admirable restraint! Adding a brief, polite private note to the sender ("Just letting you know this reached me by mistake—I have deleted it unopened") is even more helpful and courteous.',
        perspectiveNote:
          'Well-intentioned silence can sometimes leave organizations blind to data-handling errors they need to fix.',
      },
      {
        id: 'check-own-row',
        label: 'Open the sheet quickly only to read your own evaluation, then delete the file without telling anyone.',
        stance: 'Curiosity Compromise',
        shortTermConsequences:
          'Satisfies personal curiosity, yet inevitably exposes you to neighbouring rows containing private colleague records you were not authorized to see.',
        longTermConsequences:
          'Crosses an ethical confidentiality boundary and may also appear in enterprise document-access audit logs.',
        principlesInvolved: ['Confidentiality', 'Integrity', 'Respect'],
        constructiveFeedback:
          'Even viewing "just your own row" breaches unauthorized access boundaries in shared spreadsheets. Respecting privacy means resisting curiosity when access was accidental.',
        perspectiveNote:
          'Organizations judge trustworthiness heavily by how people handle accidental access to privileged information.',
      },
      {
        id: 'share-with-interns',
        label: 'Check whether stipends are equal across interns and share screenshots with the intern group if you notice unfairness.',
        stance: 'Unauthorized Disclosure',
        shortTermConsequences:
          'Exposes private performance evaluations and personal details of peers without their consent, sparking confusion and breach of NDA policies.',
        longTermConsequences:
          'Serious violation of workplace confidentiality and data privacy that could harm both colleagues and your standing.',
        principlesInvolved: ['Confidentiality', 'Data Privacy', 'Fair Treatment'],
        constructiveFeedback:
          'Pay transparency and fairness are valid workplace topics, but leaking unauthorized confidential files containing personal evaluations harms peers’ privacy and violates institutional trust. Fairness concerns should be raised through legitimate channels.',
        perspectiveNote:
          'A worthy goal (fairness) does not automatically justify breaching colleagues’ privacy without consent.',
      },
    ],
  },
  {
    id: 'friend-assignment',
    number: '04',
    title: 'A Friend Asks for Assignment Answers',
    contextLabel: 'Personal Loyalty vs. Academic Honesty',
    ethicsFocus: 'Personal & Professional Ethics',
    setting: 'Hostel Study Lounge · Two Hours Before Deadline',
    situation:
      'Your close friend Aarav had a tough week dealing with a minor illness and a family visit. Two hours before an individual graded programming assignment is due, he messages you: "I’m completely stuck on questions 3 and 4. Can you send me your code? I’ll rename the variables so nobody notices."',
    stakeholders: ['Aarav (your friend)', 'Course instructor and classmates', 'Academic integrity of the degree', 'Yourself'],
    options: [
      {
        id: 'teach-concepts',
        label: 'Decline sending your finished code, but offer to hop on a 25-minute call to explain the core algorithm and help him debug his own attempt—and suggest requesting a medical extension if needed.',
        stance: 'Compassionate Integrity',
        shortTermConsequences:
          'Requires genuine effort from both of you under a tight clock, and Aarav may not finish every bonus detail, but whatever he submits is authentically his.',
        longTermConsequences:
          'Preserves both your friendship and academic honesty while helping Aarav actually master concepts he will need in exams.',
        principlesInvolved: ['Academic Honesty', 'Empathy', 'Integrity', 'Responsibility'],
        constructiveFeedback:
          'This response resolves the apparent clash between loyalty and honesty. Real friendship supports someone’s growth and well-being without exposing both of you to plagiarism penalties.',
        perspectiveNote:
          'When personal care and institutional rules appear to collide, creative ethical reasoning looks for a third path that honours both.',
      },
      {
        id: 'decline-firmly',
        label: 'Politely explain that you cannot share individual graded solutions due to the honour code, and encourage him to email the professor honestly about his illness.',
        stance: 'Clear Principled Boundary',
        shortTermConsequences:
          'May feel momentarily awkward if Aarav is stressed, though most faculty genuinely accommodate documented illness when students communicate truthfully.',
        longTermConsequences:
          'Maintains clear ethical boundaries and models transparent communication with instructors.',
        principlesInvolved: ['Academic Honesty', 'Honesty', 'Respect'],
        constructiveFeedback:
          'Setting a calm, respectful boundary without lecturing shows maturity. Encouraging direct communication with the instructor often leads to fair extensions.',
        perspectiveNote:
          'Honest boundaries protect both parties; many academic misconduct cases begin with a rushed favour between well-meaning friends.',
      },
      {
        id: 'send-with-warning',
        label: 'Send your code file as a "reference only" and ask him to promise he will rewrite it completely.',
        stance: 'High-Risk Middle Ground',
        shortTermConsequences:
          'Under severe time pressure, viewing complete finished code makes accidental structural copying almost unavoidable.',
        longTermConsequences:
          'Automated similarity checks often flag renamed variables, risking severe penalties for both students.',
        principlesInvolved: ['Academic Honesty', 'Accountability'],
        constructiveFeedback:
          'Even with good intentions, handing over complete answers right before a deadline rarely leads to independent learning and carries high risk for both of you.',
        perspectiveNote:
          'Ethical judgment considers realistic human behaviour under stress—not just ideal promises.',
      },
      {
        id: 'share-answers',
        label: 'Send the answers immediately because helping a friend in distress matters more than a single assignment rule.',
        stance: 'Loyalty Over Institutional Rules',
        shortTermConsequences:
          'Relieves Aarav’s immediate deadline panic, though it misrepresents individual assessment work.',
        longTermConsequences:
          'Leaves Aarav unprepared for future tests, treats students who worked honestly unfairly, and risks disciplinary action for both of you.',
        principlesInvolved: ['Fairness', 'Academic Honesty', 'Integrity'],
        constructiveFeedback:
          'Caring deeply about a friend is an admirable personal value, yet ethical reasoning asks whether short-term rescue causes greater harm to fairness, learning, and long-term trust.',
        perspectiveNote:
          'This scenario illustrates a classic tension between personal loyalty and professional/academic fairness—why navigating both lenses together matters.',
      },
    ],
  },
  {
    id: 'unfair-team-treatment',
    number: '05',
    title: 'Noticing Unfair Treatment in a Team',
    contextLabel: 'Workplace Inclusion & Moral Courage',
    ethicsFocus: 'Personal & Professional Ethics',
    setting: 'Product Design Studio · Weekly Critique',
    situation:
      'Over the past three weekly sprints, you notice a pattern: whenever Rohan—a new junior associate who speaks more softly—proposes a design improvement, the project coordinator cuts him off or assigns him repetitive formatting chores. Meanwhile, more outspoken peers receive high-visibility client tasks for similar ideas.',
    stakeholders: ['Rohan (new associate)', 'Project coordinator', 'Team culture and project quality', 'Yourself'],
    options: [
      {
        id: 'amplify-and-discuss',
        label: 'Actively invite and credit Rohan’s points during meetings, check in with him privately, and share a calm, constructive observation with the coordinator about balancing task visibility.',
        stance: 'Active Allyship & Constructive Leadership',
        shortTermConsequences:
          'Immediately gives Rohan space to be heard in meetings and opens a professional, non-accusatory conversation with the coordinator about fair workload allocation.',
        longTermConsequences:
          'Elevates team morale, prevents talented quieter contributors from burning out, and strengthens fair workplace norms.',
        principlesInvolved: ['Fair Treatment', 'Respect', 'Empathy', 'Teamwork'],
        constructiveFeedback:
          'Combining visible micro-support in the room with a respectful private conversation addresses both the immediate symptom and the underlying pattern.',
        perspectiveNote:
          'Everyday leadership does not require a formal title—amplifying overlooked voices is a practical way to practise fairness and respect.',
      },
      {
        id: 'check-with-rohan-first',
        label: 'Speak privately with Rohan first to understand how he is experiencing the dynamic and ask what kind of support he would appreciate before talking to the coordinator.',
        stance: 'Empathetic & Consent-Led Support',
        shortTermConsequences:
          'Respects Rohan’s agency rather than speaking over him on his behalf, while showing him he is not alone.',
        longTermConsequences:
          'Ensures any next step aligns with Rohan’s comfort and avoids unintentionally putting him in an uncomfortable spotlight.',
        principlesInvolved: ['Empathy', 'Respect', 'Fair Treatment'],
        constructiveFeedback:
          'Checking in with the affected colleague first is thoughtful and empowering. Sometimes people want an ally to co-present an idea together; other times they prefer raising it directly with your backing.',
        perspectiveNote:
          'Care ethics reminds us that true support listens to the person affected rather than assuming we know the only right move.',
      },
      {
        id: 'confront-publicly',
        label: 'Interrupt the coordinator in front of the whole team and accuse them of favouritism during the critique.',
        stance: 'Public Confrontation',
        shortTermConsequences:
          'Signals strong opposition to unfairness, yet may put the coordinator on the defensive and make Rohan feel acutely self-conscious in front of peers.',
        longTermConsequences:
          'Can polarize the team unless the behaviour was egregious harassment requiring immediate stoppage.',
        principlesInvolved: ['Fairness', 'Professional Communication', 'Respect'],
        constructiveFeedback:
          'Speaking up takes courage! For subtle patterns of interruption or task imbalance, calm redirection in the meeting paired with private feedback usually produces better change than public accusation.',
        perspectiveNote:
          'How we challenge unfairness affects whether people reflect and improve or entrench defensively.',
      },
      {
        id: 'stay-quiet',
        label: 'Focus solely on your own deliverables since the coordinator decides task assignments.',
        stance: 'Passive Acceptance',
        shortTermConsequences:
          'Keeps your own routine smooth, while the unfair pattern continues unchecked.',
        longTermConsequences:
          'Over time, silent acceptance lets exclusionary habits harden into team culture and deprives the team of Rohan’s best ideas.',
        principlesInvolved: ['Fair Treatment', 'Responsibility', 'Teamwork'],
        constructiveFeedback:
          'Respecting hierarchy does not require ignoring ongoing unfairness. Even small, courteous steps—like saying "I’d love to hear the rest of Rohan’s thought"—shift the room constructively.',
        perspectiveNote:
          'Fair workplaces are sustained by everyday norms set by peers, not solely by HR policies.',
      },
    ],
  },
  {
    id: 'responsible-data-usage',
    number: '06',
    title: 'Responsible Data Usage in a Prototype',
    contextLabel: 'Data Privacy & Digital Stewardship',
    ethicsFocus: 'Professional Ethics',
    setting: 'EdTech Research Lab · Prototype Testing',
    situation:
      'Your research group is building a student study-planner tool. To test its recommendation engine quickly before a campus showcase, a teammate exports real student attendance and grade logs from a departmental portal—including full names and roll numbers—without asking the students for consent.',
    stakeholders: ['Students whose records were exported', 'Department administration', 'Your research team', 'Campus trust in digital systems'],
    options: [
      {
        id: 'halt-and-synthetic',
        label: 'Ask the team to stop using the real student logs immediately, delete the unauthorized export, and build a realistic synthetic dataset—or obtain formal ethics approval and informed consent.',
        stance: 'Privacy-by-Design & Consent',
        shortTermConsequences:
          'Adds a few hours of work to generate realistic synthetic test records, while keeping the prototype completely compliant and ethical.',
        longTermConsequences:
          'Protects student privacy, teaches sustainable engineering habits, and ensures the showcase project withstands scrutiny.',
        principlesInvolved: ['Data Privacy', 'Professional Responsibility', 'Confidentiality', 'Accountability'],
        constructiveFeedback:
          'Synthetic test data is standard professional practice precisely to prevent unnecessary exposure of real people’s records. Consent and minimization are non-negotiable foundations of data ethics.',
        perspectiveNote:
          'Responsible innovation treats privacy as a design requirement from day one—not an afterthought after a demo.',
      },
      {
        id: 'anonymize-without-asking',
        label: 'Strip out the names and roll numbers from the exported file and continue using the real attendance/grade patterns for the demo.',
        stance: 'Partial Technical Mitigation',
        shortTermConsequences:
          'Reduces direct identification risk, though the data was still extracted without authorization or informed consent, and unique attendance patterns can still re-identify students.',
        longTermConsequences:
          'Leaves institutional policy and consent violations unresolved.',
        principlesInvolved: ['Data Privacy', 'Professional Integrity'],
        constructiveFeedback:
          'Removing obvious names is a good technical instinct, yet anonymization alone does not replace lawful permission and consent to repurpose personal academic records.',
        perspectiveNote:
          'Data privacy involves both technical safeguards (anonymization) and ethical governance (purpose limitation and consent).',
      },
      {
        id: 'use-temporarily',
        label: 'Use the file only on your offline laptop for tomorrow’s demo and promise to delete it afterward.',
        stance: 'Convenience Exception',
        shortTermConsequences:
          'Speeds up demo preparation, but exposes real student records on an unmanaged device and during a live screen presentation.',
        longTermConsequences:
          'Normalizes bypassing privacy safeguards whenever deadlines feel urgent—the root cause of many real-world data breaches.',
        principlesInvolved: ['Data Privacy', 'Confidentiality', 'Professional Responsibility'],
        constructiveFeedback:
          'Temporary exceptions often turn into accidental leaks—especially during live demos where screens are photographed or recorded. Ethical standards matter most when shortcuts look easy.',
        perspectiveNote:
          'Ask the transparency test: how would those students feel if they saw their personal attendance logs driving a demo without ever being asked?',
      },
    ],
  },
];
