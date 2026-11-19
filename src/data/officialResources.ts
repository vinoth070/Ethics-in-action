import { OfficialResource } from '../types/ethics';

export const OFFICIAL_RESOURCES: OfficialResource[] = [
  {
    id: 'cvc',
    name: 'Central Vigilance Commission',
    acronym: 'CVC',
    category: 'Public Integrity & Vigilance',
    purpose:
      'India’s apex statutory integrity institution advising Central Government organisations on vigilance administration, ethical governance, transparency, and anti-corruption awareness.',
    websiteUrl: 'https://cvc.gov.in',
    websiteLabel: 'cvc.gov.in',
    contacts: [
      {
        type: 'phone',
        label: 'Control Room / EPABX (General Office)',
        value: '011-24651020',
        href: 'tel:+911124651020',
      },
      {
        type: 'phone',
        label: 'Office EPABX (General Office)',
        value: '011-24600200',
        href: 'tel:+911124600200',
      },
      {
        type: 'email',
        label: 'Official General Office Email',
        value: 'cvc@nic.in',
        href: 'mailto:cvc@nic.in',
      },
    ],
    address: 'Satarkta Bhawan, GPO Complex, Block-A, INA, New Delhi – 110023',
    note: 'Formal vigilance complaints should be lodged via the official portal instructions on cvc.gov.in.',
  },
  {
    id: 'ugc',
    name: 'University Grants Commission',
    acronym: 'UGC',
    category: 'Higher Education & Academic Integrity',
    purpose:
      'Statutory apex body responsible for coordinating, determining, and maintaining standards of higher education, research ethics, anti-plagiarism regulations, and student welfare across Indian universities.',
    websiteUrl: 'https://www.ugc.gov.in',
    websiteLabel: 'ugc.gov.in',
    contacts: [
      {
        type: 'phone',
        label: 'General Enquiry Desk',
        value: '011-23604446',
        href: 'tel:+911123604446',
      },
      {
        type: 'phone',
        label: 'General Office Switchboard',
        value: '011-23604200',
        href: 'tel:+911123604200',
      },
      {
        type: 'email',
        label: 'General Enquiry Email',
        value: 'contact.ugc@nic.in',
        href: 'mailto:contact.ugc@nic.in',
      },
    ],
    address: 'Bahadur Shah Zafar Marg, New Delhi – 110002',
    note: 'General enquiry numbers are for information; academic grievances should be routed through official institutional or UGC portal channels.',
  },
  {
    id: 'aicte',
    name: 'All India Council for Technical Education',
    acronym: 'AICTE',
    category: 'Technical Education & Institutional Standards',
    purpose:
      'National-level statutory council governing quality assurance, ethical institutional standards, universal human values curriculum initiatives, and student/faculty grievance frameworks in technical education.',
    websiteUrl: 'https://www.aicte-india.org',
    websiteLabel: 'aicte-india.org',
    contacts: [
      {
        type: 'phone',
        label: 'Headquarters General Exchange',
        value: '011-29581000',
        href: 'tel:+911129581000',
      },
      {
        type: 'phone',
        label: 'Interactive Voice Response System (IVRS)',
        value: '011-29581515',
        href: 'tel:+911129581515',
      },
    ],
    address: 'Nelson Mandela Marg, Vasant Kunj, New Delhi – 110070',
    note: 'Use the official AICTE website to access dedicated student and faculty grievance redressal portals.',
  },
  {
    id: 'cpgrams',
    name: 'Centralized Public Grievance Redress & Monitoring System',
    acronym: 'CPGRAMS · DARPG',
    category: 'Public Service Grievance Redressal',
    purpose:
      'Official Government of India online platform operated by the Department of Administrative Reforms and Public Grievances (DARPG) enabling citizens to submit and track public service grievances.',
    websiteUrl: 'https://pgportal.gov.in',
    websiteLabel: 'pgportal.gov.in',
    contacts: [
      {
        type: 'email',
        label: 'Portal Technical Support Only (Not for filing grievances)',
        value: 'cpgrams-darpg@nic.in',
        href: 'mailto:cpgrams-darpg@nic.in',
      },
    ],
    address: 'DARPG, Sardar Patel Bhavan, Sansad Marg, New Delhi – 110001',
    note: 'Public grievances are not accepted over email and must be filed directly through the official pgportal.gov.in web portal.',
  },
  {
    id: 'nhrc',
    name: 'National Human Rights Commission, India',
    acronym: 'NHRC',
    category: 'Human Rights & Dignity Protection',
    purpose:
      'Independent statutory public body dedicated to the protection and promotion of human rights, dignity, non-discrimination, and fair treatment across India.',
    websiteUrl: 'https://nhrc.nic.in',
    websiteLabel: 'nhrc.nic.in',
    contacts: [
      {
        type: 'phone',
        label: 'Human Rights Toll-Free Helpline',
        value: '14433',
        href: 'tel:14433',
      },
      {
        type: 'phone',
        label: 'General Office Telephone',
        value: '011-24651330',
        href: 'tel:+911124651330',
      },
      {
        type: 'email',
        label: 'Official Complaint Registration Email',
        value: 'cr.nhrc@nic.in',
        href: 'mailto:cr.nhrc@nic.in',
      },
    ],
    address: 'Manav Adhikar Bhavan, C-Block, GPO Complex, INA, New Delhi – 110023',
  },
];

export const RESOURCES_DISCLAIMER =
  'Verification Notice: Contact numbers, email addresses, and grievance submission procedures can change over time. Always verify the latest official details directly on each organisation’s official website (.gov.in / .nic.in / institutional domain) before reaching out or submitting a formal complaint.';
