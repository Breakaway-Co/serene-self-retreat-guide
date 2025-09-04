export interface ScreeningTool {
  id: string;
  name: string;
  acronym: string;
  description: string;
  questions: ScreeningQuestion[];
  scoring: ScoringRubric;
  interpretation: ScoreInterpretation[];
}

export interface ScreeningQuestion {
  id: string;
  text: string;
  type: 'single-choice' | 'multiple-choice' | 'scale' | 'boolean';
  options: ScreeningOption[];
  required: boolean;
}

export interface ScreeningOption {
  id: string;
  text: string;
  value: number;
}

export interface ScoringRubric {
  method: 'sum' | 'weighted' | 'categorical';
  weights?: Record<string, number>;
  maxScore: number;
}

export interface ScoreInterpretation {
  range: [number, number];
  level: 'low' | 'moderate' | 'high' | 'severe';
  description: string;
  recommendations: string[];
}

export interface ScreeningResult {
  toolId: string;
  score: number;
  level: 'low' | 'moderate' | 'high' | 'severe';
  interpretation: string;
  recommendations: string[];
  riskFlags: string[];
  completedAt: Date;
}

export interface ScreeningSession {
  id: string;
  userId?: string;
  tools: ScreeningResult[];
  overallRiskLevel: 'low' | 'moderate' | 'high';
  crisisFlags: boolean;
  recommendations: string[];
  referrals: string[];
  completedAt: Date;
}