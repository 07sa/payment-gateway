import { Plan, PlanKey, Coupon, QuestQuestion } from '../types';

export const PLANS: Record<PlanKey, Plan> = {
  '1month': {
    id: '1month',
    title: '1 Month Practice Pass',
    regularPrice: 99,
    months: 1,
    days: 30,
    tag: 'Starter Plan',
    perks: ['CBSE & Olympiad Level 1', '500+ Practice Questions', 'Standard WhatsApp Report'],
  },
  '3months': {
    id: '3months',
    title: '3 Month Practice Pass',
    regularPrice: 249,
    months: 3,
    days: 90,
    tag: 'Term Pass',
    perks: ['CBSE + Olympiad Level 1 & 2', 'Unlimited Chapter Quests', 'Bi-weekly Performance Diagnostics'],
  },
  '6months': {
    id: '6months',
    title: '6 Month Practice Pass',
    regularPrice: 399,
    months: 6,
    days: 180,
    tag: 'Best Value',
    perks: ['Full IMO/NSO/IMO Syllabus', 'Daily Streak Badges & Leaderboard', 'Weekly Parent WhatsApp Analysis'],
  },
};

export const AVAILABLE_COUPONS: Record<string, Coupon> = {
  FIRST100: {
    code: 'FIRST100',
    name: 'Launch Special - First 100 Students',
    type: 'fixed',
    discounts: {
      '1month': 20,
      '3months': 50,
      '6months': 80,
    },
  },
  OLYMPIAD20: {
    code: 'OLYMPIAD20',
    name: 'Olympiad Aspirant 20% Off',
    type: 'percent',
    percent: 0.2,
  },
  ABHYAS10: {
    code: 'ABHYAS10',
    name: 'Abhyas Arena 10% Welcome',
    type: 'percent',
    percent: 0.1,
  },
};

export const SAMPLE_QUESTIONS: QuestQuestion[] = [
  {
    id: 1,
    subject: 'Mathematics',
    grade: '5',
    topic: 'Fractions & Number Operations',
    difficulty: 'Olympiad Pro',
    question: 'A recipe calls for 3/4 cup of honey. Ananya wants to make 2.5 times the recipe. How many cups of honey will she need in total?',
    options: ['1 7/8 cups', '1 5/8 cups', '2 1/4 cups', '1 3/4 cups'],
    correctIndex: 0,
    explanation: '3/4 × 2.5 = 3/4 × 5/2 = 15/8 = 1 7/8 cups of honey.',
  },
  {
    id: 2,
    subject: 'Reasoning',
    grade: '5',
    topic: 'Logical Sequences & Patterns',
    difficulty: 'Olympiad Pro',
    question: 'Look at the sequence: 4, 9, 25, 49, 121, ?. Which number comes next?',
    options: ['144', '169', '196', '225'],
    correctIndex: 1,
    explanation: 'The sequence consists of squares of consecutive prime numbers: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121, so 13² = 169.',
  },
  {
    id: 3,
    subject: 'Science',
    grade: '5',
    topic: 'States of Matter & Evaporation',
    difficulty: 'CBSE Core',
    question: 'Why do wet clothes dry faster on a windy day compared to a calm day at the same temperature?',
    options: [
      'Wind decreases air pressure around the cloth',
      'Wind removes water vapour from the surface rapidly, increasing evaporation rate',
      'Wind heats the fabric fibers through friction',
      'Water droplets absorb nitrogen gas during breeze',
    ],
    correctIndex: 1,
    explanation: 'With wind, the water vapour layer directly above the cloth is carried away, reducing local humidity and increasing the net rate of evaporation.',
  },
  {
    id: 4,
    subject: 'Mathematics',
    grade: '6',
    topic: 'Integers & Real-World Scales',
    difficulty: 'CBSE Core',
    question: 'At 6:00 AM, the temperature of Leh was -8°C. By noon it had risen by 13°C, and by midnight it dropped by 9°C. What was the temperature at midnight?',
    options: ['-4°C', '+4°C', '-12°C', '+5°C'],
    correctIndex: 0,
    explanation: '-8°C + 13°C = +5°C. Then +5°C - 9°C = -4°C.',
  },
];
