import { ProfessionalStandardItem } from '../types/ethics';

export const PROFESSIONAL_STANDARDS: ProfessionalStandardItem[] = [
  {
    id: 'professional-integrity',
    index: '01',
    name: 'Professional Integrity',
    domain: 'Workplace & Institutional Conduct',
    definition:
      'Professional integrity is the disciplined adherence to ethical codes, truthful reporting, and transparent conduct in every academic, clinical, technical, or organizational role.',
    importance:
      'Organizations, clients, and the public rely on professionals to prioritize accuracy and public safety over short-term praise, inflated metrics, or personal gain.',
    practicalApplications: [
      'Presenting project metrics, test limitations, and risks accurately without concealing inconvenient findings.',
      'Disclosing potential conflicts of interest before participating in hiring, grading, or vendor selection.',
      'Refusing gifts, favours, or side arrangements that could compromise independent judgment.',
    ],
    realWorldExamples: [
      {
        context: 'Workplace Behaviour',
        illustration:
          'A junior engineer discovers a subtle battery overheating defect right before a product demo and escalates it honestly instead of hiding the test log.',
      },
      {
        context: 'Professional Communication',
        illustration:
          'Writing status updates that clearly distinguish completed milestones from work still in progress so teams plan realistically.',
      },
    ],
    professionalScenario: {
      setting: 'Internship Product Review',
      dilemma:
        'Your team’s prototype fails 2 out of 10 stress tests right before a quarterly review. A teammate suggests excluding those two runs from the summary slide to make the presentation look smoother.',
      ethicalAction:
        'Present all 10 test results transparently alongside root-cause notes and a clear plan for resolving the two failure cases.',
      whyItWorks:
        'Stakeholders trust teams that surface defects early; hiding flaws risks real downstream harm and destroys professional credibility.',
    },
    ethicalResponsibilities: [
      'Report data, timelines, and capabilities truthfully.',
      'Declare conflicts of interest proactively.',
      'Uphold institutional codes even under deadline pressure.',
    ],
  },
  {
    id: 'academic-honesty',
    index: '02',
    name: 'Academic Honesty',
    domain: 'Research & Higher Education',
    definition:
      'Academic honesty means producing original intellectual work, citing every borrowed idea, dataset, quotation, or code snippet faithfully, and respecting assessment rules.',
    importance:
      'Degrees, research findings, and scholarly credentials only hold social value when they genuinely represent the learner’s own understanding and verified inquiry.',
    practicalApplications: [
      'Paraphrasing sources genuinely in your own words while still including complete, accurate citations.',
      'Distinguishing collaborative brainstorming from individual graded submissions according to course guidelines.',
      'Preserving authentic experimental data rather than fabricating or selectively trimming results.',
    ],
    realWorldExamples: [
      {
        context: 'Academic Plagiarism Prevention',
        illustration:
          'Keeping a structured bibliography while researching a literature review so no author’s phrasing or framework goes uncredited.',
      },
      {
        context: 'College Projects',
        illustration:
          'Clearly documenting open-source libraries, datasets, and external diagrams used in a capstone engineering project.',
      },
    ],
    professionalScenario: {
      setting: 'Final-Year Capstone Submission',
      dilemma:
        'While writing your research report, you find a well-structured paragraph in an online journal that summarizes your methodology perfectly. The submission deadline is three hours away.',
      ethicalAction:
        'Write the methodology in your own analytical voice, quote any indispensable exact phrases in quotation marks, and include a full citation in the references.',
      whyItWorks:
        'Proper attribution respects fellow researchers, deepens your own mastery of the topic, and protects your academic standing from plagiarism penalties.',
    },
    ethicalResponsibilities: [
      'Cite every external source, figure, and code reference accurately.',
      'Submit work that honestly reflects your individual or agreed group effort.',
      'Decline sharing or copying solutions for graded individual assessments.',
    ],
  },
  {
    id: 'confidentiality',
    index: '03',
    name: 'Confidentiality',
    domain: 'Client & Organizational Trust',
    definition:
      'Confidentiality is the professional obligation to safeguard privileged, sensitive, or non-public information entrusted to you during work, research, or institutional service.',
    importance:
      'Patients, students, clients, and employers share sensitive records only because they trust professionals to protect that information from unauthorized disclosure or casual gossip.',
    practicalApplications: [
      'Locking screens when stepping away from workstations and avoiding viewing confidential files on public screens.',
      'Sharing sensitive records strictly on a need-to-know basis through approved secure channels.',
      'Notifying the sender immediately and deleting misdirected confidential attachments without circulating them.',
    ],
    realWorldExamples: [
      {
        context: 'Confidential Information Handling',
        illustration:
          'A student office assistant notices scholarship financial-aid forms left by a shared printer and immediately secures them with the registrar without reading or photographing them.',
      },
      {
        context: 'Workplace Communication',
        illustration:
          'Refraining from discussing an employer’s unreleased client contract details on social media or in crowded transit.',
      },
    ],
    professionalScenario: {
      setting: 'Misdirected Department Spreadsheet',
      dilemma:
        'You are copied by mistake on an internal HR email containing performance review scores and stipends for all department interns.',
      ethicalAction:
        'Close the file without downloading or forwarding it, reply solely to the sender to alert them of the misdirection, and permanently delete the email from your inbox and trash.',
      whyItWorks:
        'Immediate containment prevents privacy harm to colleagues and demonstrates mature professional discretion.',
    },
    ethicalResponsibilities: [
      'Access sensitive files only when authorized for a legitimate task.',
      'Never forward, photograph, or casually discuss non-public records.',
      'Report accidental leaks or misdirected disclosures promptly.',
    ],
  },
  {
    id: 'data-privacy',
    index: '04',
    name: 'Data Privacy',
    domain: 'Digital & Information Ethics',
    definition:
      'Data privacy is the responsible collection, minimization, protection, and lawful use of personal information, ensuring individuals retain dignity and informed control over their data.',
    importance:
      'In digital campuses and modern workplaces, mishandled personal data can cause identity theft, discrimination, and lasting reputational harm.',
    practicalApplications: [
      'Collecting only the minimum personal fields truly required for a survey, app, or academic study.',
      'Obtaining clear, informed consent before recording interviews, storing user records, or training analytics models.',
      'Anonymizing personal identifiers before sharing research datasets for analysis or presentation.',
    ],
    realWorldExamples: [
      {
        context: 'Responsible Data Usage',
        illustration:
          'A college project team building a health-habit tracker strips out real student names and phone numbers before testing their analytics dashboard.',
      },
      {
        context: 'Digital Security Hygiene',
        illustration:
          'Using strong multi-factor authentication and avoiding uploading real client spreadsheets into unapproved third-party web tools.',
      },
    ],
    professionalScenario: {
      setting: 'Campus Survey & Analytics Project',
      dilemma:
        'Your data-science project group collected mental-wellness survey responses from 180 students with email addresses attached. A teammate wants to publish the raw CSV on GitHub for their portfolio.',
      ethicalAction:
        'Remove all direct and indirect identifiers, aggregate sensitive fields, confirm what participants consented to, and publish only synthetic or properly anonymized summary statistics.',
      whyItWorks:
        'Respecting consent and anonymization protects vulnerable respondents while still showcasing genuine technical skill.',
    },
    ethicalResponsibilities: [
      'Collect only necessary personal data with clear informed consent.',
      'Anonymize and encrypt sensitive datasets before storage or sharing.',
      'Never repurpose personal information without explicit permission.',
    ],
  },
  {
    id: 'fair-treatment',
    index: '05',
    name: 'Fair Treatment',
    domain: 'Equity & Workplace Inclusion',
    definition:
      'Fair treatment means upholding equal opportunity, impartial evaluation, and respectful conduct for all colleagues, students, and clients—free from harassment, bias, or favouritism.',
    importance:
      'Fair environments unlock diverse talent, protect psychological safety, and ensure decisions about hiring, grading, promotion, and recognition rest on merit and dignity.',
    practicalApplications: [
      'Evaluating peers and applicants against consistent, clearly communicated rubrics.',
      'Ensuring credit, speaking opportunities, and challenging assignments are distributed equitably.',
      'Speaking up or escalating appropriately when witnessing bullying, exclusion, or discriminatory remarks.',
    ],
    realWorldExamples: [
      {
        context: 'Workplace Behaviour',
        illustration:
          'A team lead ensures remote interns get the same mentorship feedback and project visibility as in-office peers.',
      },
      {
        context: 'Team Contributions',
        illustration:
          'Rotating administrative note-taking duties across all team members rather than repeatedly assigning them to the same person.',
      },
    ],
    professionalScenario: {
      setting: 'Project Team Meeting',
      dilemma:
        'During weekly project reviews, a quieter teammate’s technical suggestions are repeatedly talked over, only to be praised minutes later when a more vocal teammate repeats the same idea.',
      ethicalAction:
        'Acknowledge the original contributor directly in the meeting ("Building on Ananya’s earlier point about caching...") and encourage structured turn-taking.',
      whyItWorks:
        'Visible attribution corrects subtle exclusion smoothly and builds a fairer, higher-performing team culture.',
    },
    ethicalResponsibilities: [
      'Base evaluations and recognition on transparent, objective criteria.',
      'Prevent exclusion, harassment, and favouritism in team settings.',
      'Ensure credit accurately reflects each contributor’s work.',
    ],
  },
  {
    id: 'teamwork',
    index: '06',
    name: 'Teamwork',
    domain: 'Collaborative Excellence',
    definition:
      'Ethical teamwork combines reliable individual contribution, respectful communication, mutual support, and honest attribution toward a shared goal.',
    importance:
      'Complex engineering, academic, and organizational challenges depend on trust across disciplines. Ethical teamwork prevents burnout, free-riding, and credit disputes.',
    practicalApplications: [
      'Defining clear roles, shared timelines, and expectations at the start of every group project.',
      'Delivering your agreed portion on time and alerting teammates early if you hit a technical blocker.',
      'Giving constructive, specific feedback focused on improving the work rather than attacking teammates.',
    ],
    realWorldExamples: [
      {
        context: 'College Projects',
        illustration:
          'Maintaining a shared contribution log so every member’s research, coding, design, and testing efforts are visibly recognized on the final submission.',
      },
      {
        context: 'Professional Communication',
        illustration:
          'Writing concise, polite handoff notes so the next teammate can pick up work smoothly without confusion.',
      },
    ],
    professionalScenario: {
      setting: 'Cross-Functional Student Competition',
      dilemma:
        'One teammate quietly compiled the entire literature review and data tables while travelling for a family commitment, but another teammate accidentally left their name off the title slide.',
      ethicalAction:
        'Correct the title and credits slides immediately before presenting and explicitly highlight their research contribution during Q&A.',
      whyItWorks:
        'Honest credit sustains team morale and models the professional integrity expected in real organizations.',
    },
    ethicalResponsibilities: [
      'Contribute your fair share reliably and transparently.',
      'Credit teammates accurately for research, code, and ideas.',
      'Address team disagreements early with calm, professional dialogue.',
    ],
  },
  {
    id: 'professional-accountability',
    index: '07',
    name: 'Accountability',
    domain: 'Operational Stewardship',
    definition:
      'Professional accountability is taking full responsibility for the quality, safety, compliance, and consequences of your work—and responding transparently when errors occur.',
    importance:
      'Clear accountability prevents small oversights from escalating into systemic failures and demonstrates leadership maturity at every career stage.',
    practicalApplications: [
      'Documenting key decisions, assumptions, and review checkpoints clearly.',
      'Conducting blameless post-mortems after errors to strengthen processes rather than scapegoat individuals.',
      'Honouring service commitments and communicating realistic recovery timelines when delays happen.',
    ],
    realWorldExamples: [
      {
        context: 'Workplace Behaviour',
        illustration:
          'A software developer who deploys a configuration bug immediately rolls back the change, notifies the team lead, and adds an automated test to prevent recurrence.',
      },
      {
        context: 'College Projects',
        illustration:
          'Acknowledging honestly during a viva which module you built and which bug remains unresolved instead of bluffing.',
      },
    ],
    professionalScenario: {
      setting: 'Client Deliverable Error',
      dilemma:
        'Ten minutes after emailing a quarterly report to a faculty mentor and external partner, you discover a spreadsheet formula error that overstated a key metric by 18%.',
      ethicalAction:
        'Send a prompt, clear correction email acknowledging the formula error, attaching the verified figures, and summarizing what changed.',
      whyItWorks:
        'Swift self-correction protects partners from making decisions on flawed data and earns respect for your diligence.',
    },
    ethicalResponsibilities: [
      'Own deliverables and verify accuracy before sign-off.',
      'Correct published errors swiftly and transparently.',
      'Build safeguards so resolved mistakes do not recur.',
    ],
  },
  {
    id: 'professional-responsibility',
    index: '08',
    name: 'Professional Responsibility',
    domain: 'Public Welfare & Long-Term Impact',
    definition:
      'Professional responsibility is the broader duty to ensure that your skills, designs, advice, and decisions serve public safety, sustainability, and societal well-being.',
    importance:
      'Technical competence without ethical foresight can harm communities. Professionals carry a civic mandate to consider who is affected by the systems and policies they help create.',
    practicalApplications: [
      'Checking products, reports, and digital interfaces for accessibility, safety, and unintended misuse.',
      'Keeping domain knowledge current so your advice and technical work remain competent and safe.',
      'Using official reporting or escalation channels responsibly if an organizational practice poses serious public harm.',
    ],
    realWorldExamples: [
      {
        context: 'Professional Communication & Safety',
        illustration:
          'A civil engineering graduate flags an unsafe drainage clearance in a site blueprint rather than signing off prematurely to save costs.',
      },
      {
        context: 'Responsible Technology Design',
        illustration:
          'Testing an educational web application for screen-reader accessibility and low-bandwidth usability so no learner is left behind.',
      },
    ],
    professionalScenario: {
      setting: 'Automated Screening Tool Review',
      dilemma:
        'During an internship, you notice a prototype scholarship-filtering script systematically penalizes applicants from regional-medium schools due to an outdated keyword list.',
      ethicalAction:
        'Document the bias with concrete test cases and escalate the findings to your supervisor before the tool is used on real applicants.',
      whyItWorks:
        'Catching systemic unfairness before deployment protects real students’ futures and upholds public trust in technology.',
    },
    ethicalResponsibilities: [
      'Prioritize human safety, accessibility, and public welfare.',
      'Maintain competence and recognize the limits of your expertise.',
      'Question harmful shortcuts through constructive, documented channels.',
    ],
  },
];
