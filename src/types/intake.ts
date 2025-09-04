export interface ConsentData {
  privacyAgreement?: boolean;
  dataProcessing?: boolean;
  communicationConsent?: boolean;
  withdrawalAcknowledged?: boolean;
  ageConfirmation?: boolean;
}

export interface DemographicsData {
  age?: number;
  gender?: string;
  location?: string;
  timezone?: string;
  preferredLanguage?: string;
  accessibilityNeeds?: string[];
  previousRetreatExperience?: boolean;
}

export interface PresentingConcernsData {
  primaryConcerns?: string[];
  specificSymptoms?: string;
  impactLevel?: number;
  previousSupport?: string[];
  currentMedications?: boolean;
  medicationDetails?: string;
}

export interface WellbeingScreeningData {
  phq9Score?: number;
  phq9Responses?: number[];
  gad7Score?: number;
  gad7Responses?: number[];
  pss10Score?: number;
  pss10Responses?: number[];
  who5Score?: number;
  who5Responses?: number[];
  auditCScore?: number;
  auditCResponses?: number[];
}

export interface SafetyData {
  riskLevel?: 'low' | 'moderate' | 'high';
  crisisResources?: boolean;
  professionalSupport?: boolean;
  supportNetwork?: boolean;
  safetyPlan?: boolean;
  contraindications?: string[];
}

export interface LifestyleData {
  dailySchedule?: string;
  exerciseLevel?: string;
  dietaryRestrictions?: string[];
  sleepPatterns?: string;
  stressManagement?: string[];
  techComfort?: number;
  preferredSessionLength?: string;
}

export interface GoalsData {
  primaryGoals?: string[];
  successMetrics?: string[];
  timeCommitment?: string;
  preferredPace?: string;
  accountabilityPreference?: string;
  growthAreas?: string[];
}

export interface IntakeData {
  consent: ConsentData;
  demographics: DemographicsData;
  presentingConcerns: PresentingConcernsData;
  wellbeingScreening: WellbeingScreeningData;
  safety: SafetyData;
  lifestyle: LifestyleData;
  goals: GoalsData;
}

export interface RetreatMatch {
  retreatId: string;
  name: string;
  description: string;
  matchScore: number;
  focusAreas: string[];
  duration: string;
  adaptations: string[];
  riskMitigations?: string[];
}

export interface ScreeningTool {
  name: string;
  questions: ScreeningQuestion[];
  scoringRubric: ScoringRubric;
}

export interface ScreeningQuestion {
  id: string;
  text: string;
  options: ScreeningOption[];
  required: boolean;
}

export interface ScreeningOption {
  value: number;
  label: string;
  description?: string;
}

export interface ScoringRubric {
  ranges: ScoreRange[];
  interpretation: string;
}

export interface ScoreRange {
  min: number;
  max: number;
  level: 'minimal' | 'mild' | 'moderate' | 'moderately-severe' | 'severe';
  description: string;
  recommendations: string[];
}