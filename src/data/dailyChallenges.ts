export interface DailyChallengeItem {
  id: string;
  title: string;
  principle: string;
  category: 'Personal Ethics' | 'Professional Ethics' | 'Personal & Professional';
  situation: string;
  options: {
    id: string;
    label: string;
    reasoning: string;
    takeaway: string;
  }[];
  microAction: string;
}

export const DAILY_CHALLENGES: DailyChallengeItem[] = [
  {
    id: 'dc-credit',
    title: 'Recognise Someone’s Quiet Contribution',
    principle: 'Fairness & Teamwork',
    category: 'Professional Ethics',
    situation:
      'A peer spent two hours fixing formatting errors and checking references for your team’s shared document late last night, and nobody mentioned it during today’s check-in.',
    options: [
      {
        id: 'public-thanks',
        label: 'Thank them specifically in the group thread or next check-in so everyone sees their effort.',
        reasoning:
          'Visible recognition counters silent invisible labour and builds an equitable, motivated team.',
        takeaway: 'Specific gratitude costs thirty seconds and reinforces fairness across the whole team.',
      },
      {
        id: 'private-note',
        label: 'Send a quick private thank-you message while also adding their name to the document credits.',
        reasoning:
          'Combines warm personal appreciation with accurate written attribution.',
        takeaway: 'Private warmth plus accurate credit honours both empathy and professional integrity.',
      },
    ],
    microAction: 'Today, acknowledge one person whose behind-the-scenes work made your day smoother.',
  },
  {
    id: 'dc-honesty',
    title: 'Practise Truthfulness in Small Commitments',
    principle: 'Honesty & Integrity',
    category: 'Personal Ethics',
    situation:
      'You realize you won’t finish reading a friend’s draft essay by tonight as promised. It would be easy to skim the first paragraph and say "Looks great!"',
    options: [
      {
        id: 'honest-update',
        label: 'Message them honestly now, apologize for misjudging time, and ask if tomorrow morning works for thorough feedback.',
        reasoning:
          'Respectful honesty gives your friend genuine help instead of misleading reassurance.',
        takeaway: 'Honest timing updates preserve trust far better than rushed pretend feedback.',
      },
      {
        id: 'focused-partial',
        label: 'Be transparent that you only have 20 minutes tonight, give deep feedback on the first section, and schedule the rest.',
        reasoning:
          'Sets clear expectations while still showing practical reliability and care.',
        takeaway: 'Transparency turns limited time into dependable support.',
      },
    ],
    microAction: 'Today, honour one commitment cleanly—or communicate an honest timeline before a deadline slips.',
  },
  {
    id: 'dc-perspective',
    title: 'Respect an Unfamiliar Perspective',
    principle: 'Empathy & Respect',
    category: 'Personal & Professional',
    situation:
      'During a class or team discussion, someone proposes an approach you initially disagree with. Others start shaking their heads before they finish.',
    options: [
      {
        id: 'curious-question',
        label: 'Ask one genuine clarifying question to understand the problem they are trying to solve before evaluating.',
        reasoning:
          'Curiosity lowers defensiveness and often reveals constraints the majority overlooked.',
        takeaway: 'Listening to understand before judging elevates both respect and decision quality.',
      },
      {
        id: 'summarize-fairly',
        label: 'Summarize their core point fairly and invite the room to weigh its strengths alongside alternatives.',
        reasoning:
          'Ensures minority viewpoints receive fair intellectual consideration.',
        takeaway: 'Steel-manning another view is one of the highest forms of everyday respect.',
      },
    ],
    microAction: 'Today, pause for three seconds before replying in a disagreement and ask one sincere question first.',
  },
  {
    id: 'dc-mistake',
    title: 'Take Ownership for a Small Slip',
    principle: 'Accountability',
    category: 'Personal & Professional',
    situation:
      'You forgot to attach an important file or shared an outdated link in a group message, causing ten minutes of confusion.',
    options: [
      {
        id: 'clean-ownership',
        label: 'Reply immediately: "My mistake—I shared the earlier link. Here is the verified link now," with zero excuses.',
        reasoning:
          'Direct, calm ownership resolves confusion fastest and signals mature reliability.',
        takeaway: 'Prompt, defensiveness-free ownership actually increases people’s trust in you.',
      },
      {
        id: 'fix-and-check',
        label: 'Own the error clearly and double-check the updated file opens cleanly before sending.',
        reasoning:
          'Pairs accountability with careful follow-through so the error does not repeat.',
        takeaway: 'Accountability shines brightest when coupled with immediate care.',
      },
    ],
    microAction: 'If a small oversight happens today, own it calmly in one clear sentence without blaming tools or timing.',
  },
  {
    id: 'dc-privacy',
    title: 'Protect Digital Dignity & Consent',
    principle: 'Data Privacy & Respect',
    category: 'Professional Ethics',
    situation:
      'You took a candid group photo after an event and want to post it publicly online, though one classmate mentioned earlier they prefer keeping their photos private.',
    options: [
      {
        id: 'ask-consent',
        label: 'Share the photo privately in the group chat first and ask everyone’s consent before posting publicly.',
        reasoning:
          'Respecting personal digital boundaries protects dignity and models consent-first habits.',
        takeaway: 'Consent before sharing is the simplest everyday practice of data privacy.',
      },
      {
        id: 'crop-or-keep-private',
        label: 'Choose a photo that respects everyone’s stated privacy preference, or keep the album private to participants.',
        reasoning:
          'Honours prior boundaries automatically without putting your peer on the spot again.',
        takeaway: 'Remembering someone’s stated boundary shows quiet, dependable respect.',
      },
    ],
    microAction: 'Today, pause before sharing any screenshot, photo, or personal detail and verify consent.',
  },
];

export function getTodaysDailyChallenge(): DailyChallengeItem {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
}
