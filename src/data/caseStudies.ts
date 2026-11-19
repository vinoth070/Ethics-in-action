export type CaseStudyCategory =
  | 'Personal Life'
  | 'Academic Environment'
  | 'Workplace'
  | 'Leadership'
  | 'Business'
  | 'Technology';

export interface CaseStudyItem {
  id: string;
  number: string;
  title: string;
  category: CaseStudyCategory;
  readTime: string;
  background: string;
  ethicalIssue: string;
  stakeholders: string[];
  availableDecisions: { label: string; tradeOff: string }[];
  possibleConsequences: string[];
  ethicalPrinciples: string[];
  discussionQuestions: string[];
}

export const CASE_STUDY_CATEGORIES: CaseStudyCategory[] = [
  'Personal Life',
  'Academic Environment',
  'Workplace',
  'Leadership',
  'Business',
  'Technology',
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-personal-rumour',
    number: '01',
    title: 'The Viral Hostel Chat Rumour',
    category: 'Personal Life',
    readTime: '4 min read',
    background:
      'Late on a Sunday evening, an unverified screenshot claiming a student council candidate forged volunteer hours begins circulating rapidly across hostel group chats. Several of your friends forward it and ask you to share it to your broader student society group.',
    ethicalIssue:
      'Balancing the urge to stay socially active and warn peers against the serious harm of amplifying unverified accusations that could permanently damage an innocent person’s reputation.',
    stakeholders: [
      'The accused student candidate',
      'Voters in the student election',
      'Friends forwarding the screenshot',
      'The broader campus community',
    ],
    availableDecisions: [
      {
        label: 'Refuse to forward and politely advise checking official election committee verification first.',
        tradeOff: 'Slows down speculation and protects fairness, though some friends may feel mildly corrected.',
      },
      {
        label: 'Forward with a disclaimer saying "Not sure if true, just sharing."',
        tradeOff: 'Still multiplies reputational damage; disclaimers rarely stop rumours from spreading as fact.',
      },
      {
        label: 'Notify the election committee privately so facts can be verified transparently.',
        tradeOff: 'Uses accountable institutional channels rather than trial-by-group-chat.',
      },
    ],
    possibleConsequences: [
      'Unchecked forwarding can cause severe emotional distress and unfair election outcomes.',
      'Modelling calm verification builds a more trustworthy peer culture.',
      'Addressing allegations through formal channels protects due process for everyone.',
    ],
    ethicalPrinciples: ['Honesty', 'Respect', 'Fairness', 'Digital Responsibility'],
    discussionQuestions: [
      'Why does adding "not sure if true" fail to absolve someone from spreading a harmful rumour?',
      'How can everyday personal honesty improve digital communities?',
    ],
  },
  {
    id: 'cs-academic-authorship',
    number: '02',
    title: 'Ghost Authorship in a Research Paper',
    category: 'Academic Environment',
    readTime: '5 min read',
    background:
      'Two undergraduate students spend four months collecting lab measurements and writing a conference paper. Before submission, a well-connected senior who did not participate in the experiments asks to be added as second author because their name might help the paper get accepted.',
    ethicalIssue:
      'Gift authorship violates academic honesty, distorts scholarly accountability, and unfairly dilutes the intellectual credit of the actual researchers.',
    stakeholders: [
      'The two undergraduate researchers',
      'The senior requesting honorary authorship',
      'The faculty advisor and peer reviewers',
      'The wider academic community relying on authorship integrity',
    ],
    availableDecisions: [
      {
        label: 'Politely decline authorship while offering an honest Acknowledgement note if they provide helpful manuscript review.',
        tradeOff: 'Preserves scholarly integrity and relationships without misrepresenting contribution.',
      },
      {
        label: 'Consult the faculty advisor on institutional authorship guidelines before submitting.',
        tradeOff: 'Brings clear policy backing so students do not carry awkward hierarchy pressure alone.',
      },
      {
        label: 'Add the senior’s name to improve perceived acceptance odds.',
        tradeOff: 'Compromises academic integrity and creates lasting vulnerability if contributions are audited.',
      },
    ],
    possibleConsequences: [
      'Accurate authorship builds authentic credibility and protects future research funding.',
      'Gift authorship undermines fairness across early-career scholars and violates journal ethics rules.',
    ],
    ethicalPrinciples: ['Academic Honesty', 'Fairness', 'Professional Integrity', 'Accountability'],
    discussionQuestions: [
      'What distinguishes a genuine co-author from someone who belongs in the Acknowledgements section?',
      'How can junior researchers handle power imbalances around credit ethically?',
    ],
  },
  {
    id: 'cs-workplace-overtime',
    number: '03',
    title: 'Silent Burnout & Hidden Project Delays',
    category: 'Workplace',
    readTime: '4 min read',
    background:
      'During a high-stakes client delivery sprint, a product team realizes an integration dependency will take five extra days to test safely. Fearing disappointment, a colleague suggests marking the testing milestone "Green" on Friday’s executive tracker and fixing bugs quietly over the weekend.',
    ethicalIssue:
      'Misreporting project readiness hides operational risk from leadership, encourages unsustainable burnout, and endangers client reliability.',
    stakeholders: [
      'Engineering and QA teammates',
      'Project leadership',
      'The client relying on stable launch software',
      'End users of the system',
    ],
    availableDecisions: [
      {
        label: 'Report status accurately as "Amber" with a concrete 5-day risk-mitigation plan.',
        tradeOff: 'Triggers an uncomfortable conversation early while preventing a major launch failure.',
      },
      {
        label: 'Mark "Green" and attempt unverified weekend patches.',
        tradeOff: 'Avoids Friday discomfort but risks deploying defective software to real users.',
      },
      {
        label: 'Propose releasing verified core features on schedule while deferring the untested integration transparently.',
        tradeOff: 'Protects quality and honesty while giving stakeholders an informed trade-off choice.',
      },
    ],
    possibleConsequences: [
      'Transparent risk reporting strengthens long-term client and executive trust.',
      'Watermelon reporting ("green outside, red inside") erodes credibility when defects surface.',
    ],
    ethicalPrinciples: ['Professional Integrity', 'Accountability', 'Transparency', 'Teamwork'],
    discussionQuestions: [
      'Why do teams sometimes feel pressured to report overly optimistic status updates?',
      'How can leaders make honest bad-news reporting psychologically safe?',
    ],
  },
  {
    id: 'cs-leadership-conflict',
    number: '04',
    title: 'The Vendor Selection Conflict of Interest',
    category: 'Leadership',
    readTime: '5 min read',
    background:
      'As newly appointed operations manager for a regional non-profit, you lead the vendor selection committee for a ₹12 lakh solar installation contract. Three bids arrive—and the lowest bid is submitted by a company co-founded by your brother-in-law.',
    ethicalIssue:
      'Even if the relative’s company genuinely offers good value, participating in the evaluation creates a clear conflict of interest that threatens public and donor trust.',
    stakeholders: [
      'Donors and beneficiaries of the non-profit',
      'All three competing vendors',
      'The non-profit board and staff',
      'Your brother-in-law and your own leadership reputation',
    ],
    availableDecisions: [
      {
        label: 'Disclose the family relationship immediately in writing and recuse yourself completely from scoring and voting.',
        tradeOff: 'Protects institutional impartiality while still allowing the bid to be judged purely on merit by others.',
      },
      {
        label: 'Stay on the committee because you feel confident you can remain objective.',
        tradeOff: 'Even with honest intent, the appearance of bias can trigger audit challenges and donor distrust.',
      },
      {
        label: 'Automatically disqualify the relative’s company without telling the board.',
        tradeOff: 'Avoids favouritism but may deny the non-profit a fair, competitive bid without transparent process.',
      },
    ],
    possibleConsequences: [
      'Formal disclosure plus recusal protects both the organization’s governance and your personal integrity.',
      'Undisclosed conflicts often cause greater reputational harm than the original financial transaction.',
    ],
    ethicalPrinciples: ['Fair Treatment', 'Transparency', 'Professional Integrity', 'Accountability'],
    discussionQuestions: [
      'Why does the appearance of a conflict of interest matter almost as much as actual bias?',
      'What makes recusal a strength of ethical leadership rather than a weakness?',
    ],
  },
  {
    id: 'cs-business-greenwashing',
    number: '05',
    title: 'Misleading Sustainability Claims on Packaging',
    category: 'Business',
    readTime: '5 min read',
    background:
      'A consumer goods startup switches 15% of its bottle plastic to recycled resin. Ahead of an Earth Day campaign, the marketing agency drafts packaging bold-printed with "100% Eco-Friendly Green Bottle" in large green typography, hiding the 15% detail in tiny print on the underside.',
    ethicalIssue:
      'Exaggerated environmental marketing ("greenwashing") deceives eco-conscious consumers, distorts fair market competition, and undermines genuine corporate social responsibility.',
    stakeholders: [
      'Consumers making values-based purchasing decisions',
      'Competitors investing in genuine sustainability',
      'The company’s long-term brand trust',
      'Regulators and environmental advocates',
    ],
    availableDecisions: [
      {
        label: 'State truthfully on the front label: "Made with 15% Recycled Plastic — Journey to 60% by 2028."',
        tradeOff: 'Sounds less flashy today, yet builds durable consumer credibility and avoids regulatory penalties.',
      },
      {
        label: 'Approve the "100% Eco-Friendly" headline since recycled content did increase.',
        tradeOff: 'Short-term sales boost paired with high risk of consumer backlash and false-advertising sanctions.',
      },
    ],
    possibleConsequences: [
      'Honest incremental sustainability claims earn lasting customer loyalty.',
      'Public exposure of misleading claims often triggers boycotts and legal scrutiny.',
    ],
    ethicalPrinciples: ['Honesty', 'Corporate Social Responsibility', 'Transparency', 'Consumer Trust'],
    discussionQuestions: [
      'Can a business celebrate genuine partial progress without misleading customers?',
      'How does truthful marketing serve long-term business health?',
    ],
  },
  {
    id: 'cs-tech-ai-bias',
    number: '06',
    title: 'Biased Hiring Algorithm in Campus Recruitment',
    category: 'Technology',
    readTime: '5 min read',
    background:
      'An HR technology team trains a résumé-ranking model using ten years of historical hiring records. During pre-launch auditing, an analyst discovers the model systematically downgrades strong graduates from non-metropolitan colleges and penalizes career gaps taken for family caregiving.',
    ethicalIssue:
      'Deploying an unexamined algorithm trained on historically skewed data automates systemic unfairness at scale while cloaking bias behind perceived mathematical objectivity.',
    stakeholders: [
      'Job applicants from diverse regional and personal backgrounds',
      'Hiring managers relying on candidate shortlists',
      'The engineering and product leadership team',
      'Society’s trust in responsible AI systems',
    ],
    availableDecisions: [
      {
        label: 'Pause automated ranking, audit features for proxy bias, add human-in-the-loop review, and retest across demographic groups.',
        tradeOff: 'Delays launch timeline slightly while preventing systemic discrimination and legal liability.',
      },
      {
        label: 'Launch now because the model improves recruiter speed by 40%, and plan a fairness patch next quarter.',
        tradeOff: 'Directly harms hundreds of qualified applicants immediately in exchange for operational speed.',
      },
    ],
    possibleConsequences: [
      'Proactive bias auditing protects equal opportunity and uncovers overlooked talent.',
      'Unchecked algorithmic discrimination causes severe harm to individuals and exposes organizations to legal and reputational fallout.',
    ],
    ethicalPrinciples: ['Fair Treatment', 'Data Privacy & AI Ethics', 'Professional Responsibility', 'Accountability'],
    discussionQuestions: [
      'Why can historical data encode unfair biases even when protected attributes are removed?',
      'Who holds ethical responsibility when an automated software system makes an unfair recommendation?',
    ],
  },
];
