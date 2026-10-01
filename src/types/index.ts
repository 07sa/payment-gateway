export type PlanKey = '1month' | '3months' | '6months';

export interface Plan {
  id: PlanKey;
  title: string;
  regularPrice: number;
  months: number;
  days: number;
  tag: string;
  perks: string[];
}

export interface Coupon {
  code: string;
  name: string;
  type: 'fixed' | 'percent';
  discounts?: Record<PlanKey, number>;
  percent?: number;
}

export interface PricingDetails {
  regular: number;
  discount: number;
  finalPrice: number;
  monthlyEquiv: string;
  dailyEquiv: string;
}

export interface StudentInfo {
  fullName: string;
  phoneNumber: string;
  grade: '4' | '5' | '6' | '7';
  schoolName?: string;
}

export interface QuestQuestion {
  id: number;
  subject: 'Mathematics' | 'Science' | 'Reasoning';
  grade: '4' | '5' | '6' | '7';
  topic: string;
  difficulty: 'Olympiad Easy' | 'Olympiad Pro' | 'CBSE Core';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
