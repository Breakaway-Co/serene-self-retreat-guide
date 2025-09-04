export interface RetreatActivity {
  id: string;
  time: string;
  activity: string;
  duration: string;
  type: 'mindfulness' | 'reflection' | 'nutrition' | 'movement' | 'healing' | 'creative' | 'nature' | 'therapy' | 'somatic';
  guideId?: string;
  description?: string;
  contraindications?: string[];
  modifications?: string[];
}

export interface RetreatDay {
  day: number;
  theme: string;
  focus: string;
  morning: RetreatActivity[];
  afternoon: RetreatActivity[];
  evening: RetreatActivity[];
}

export interface RetreatConfiguration {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  duration: number; // days
  focusAreas: string[];
  principles: string[];
  targetConditions: string[];
  contraindications?: string[];
  riskLevel: 'low' | 'moderate' | 'high';
  requiresSupervision: boolean;
  days: RetreatDay[];
}

export interface PersonalizedRetreat {
  baseRetreat: RetreatConfiguration;
  personalizations: {
    riskMitigations: string[];
    adaptations: string[];
    gentleMode: boolean;
    skipActivities: string[];
    additionalSupport: string[];
  };
  userProfile: {
    conditions: string[];
    riskLevel: 'low' | 'moderate' | 'high';
    preferences: {
      timeCommitment: string;
      intensity: string;
      modalities: string[];
    };
  };
}

export interface RetreatProgress {
  retreatId: string;
  currentDay: number;
  completedActivities: Set<string>;
  completedDays: Set<number>;
  startDate: Date;
  dailyCheckins: Record<string, any>;
  overallProgress: number;
}