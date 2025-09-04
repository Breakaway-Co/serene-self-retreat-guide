import { useState, useEffect } from 'react';
import { PersonalizedRetreat, RetreatProgress } from '@/types/retreat';
import { retreatConfigurations } from '@/data/retreatConfigurations';
import { IntakeData } from '@/types/intake';

export const usePersonalizedRetreat = (intakeData?: IntakeData) => {
  const [currentRetreat, setCurrentRetreat] = useState<PersonalizedRetreat | null>(null);
  const [progress, setProgress] = useState<RetreatProgress | null>(null);

  const createPersonalizedRetreat = (retreatId: string, intake?: IntakeData): PersonalizedRetreat | null => {
    const baseRetreat = retreatConfigurations[retreatId];
    if (!baseRetreat) return null;

    // Determine personalizations based on intake data
    const personalizations = {
      riskMitigations: [] as string[],
      adaptations: [] as string[],
      gentleMode: false,
      skipActivities: [] as string[],
      additionalSupport: [] as string[]
    };

    const userProfile = {
      conditions: intake?.presentingConcerns?.primaryConcerns || [],
      riskLevel: 'low' as 'low' | 'moderate' | 'high',
      preferences: {
        timeCommitment: intake?.goals?.timeCommitment || 'moderate',
        intensity: 'moderate', // Default since this field doesn't exist yet
        modalities: [] // Default since this field doesn't exist yet
      }
    };

    if (intake) {
      // Risk assessment
      const phq9Score = intake.wellbeingScreening?.phq9Score || 0;
      const gad7Score = intake.wellbeingScreening?.gad7Score || 0;
      
      if (phq9Score >= 15 || gad7Score >= 12) {
        userProfile.riskLevel = 'moderate';
        personalizations.gentleMode = true;
        personalizations.riskMitigations.push(
          'Extra grounding activities',
          'Gentle pacing with rest options',
          'Crisis resource reminders'
        );
      }
      
      if (phq9Score >= 20 || gad7Score >= 15) {
        userProfile.riskLevel = 'high';
        personalizations.additionalSupport.push(
          'Professional support recommended',
          'Enhanced safety protocols',
          'Crisis intervention resources'
        );
      }

      // Accessibility adaptations - skip for now since fields don't exist yet
      // This will be implemented when accessibility fields are added to intake

      // Time constraints
      if (intake.goals?.timeCommitment === 'minimal') {
        personalizations.adaptations.push(
          'Shortened sessions available',
          'Essential activities only',
          'Flexible scheduling'
        );
      }

      // Trauma considerations
      if (intake.presentingConcerns?.primaryConcerns?.includes('PTSD') || 
          intake.presentingConcerns?.primaryConcerns?.includes('Trauma')) {
        personalizations.riskMitigations.push(
          'Trauma-informed modifications',
          'Grounding techniques emphasized',
          'Choice and control prioritized'
        );
      }
    }

    return {
      baseRetreat,
      personalizations,
      userProfile
    };
  };

  const initializeProgress = (retreatId: string): RetreatProgress => {
    return {
      retreatId,
      currentDay: 1,
      completedActivities: new Set(),
      completedDays: new Set(),
      startDate: new Date(),
      dailyCheckins: {},
      overallProgress: 0
    };
  };

  const updateProgress = (updates: Partial<RetreatProgress>) => {
    if (progress) {
      const newProgress = { ...progress, ...updates };
      
      // Calculate overall progress
      const totalActivities = currentRetreat?.baseRetreat.days.reduce((total, day) => 
        total + day.morning.length + day.afternoon.length + day.evening.length, 0) || 1;
      newProgress.overallProgress = (newProgress.completedActivities.size / totalActivities) * 100;
      
      setProgress(newProgress);
      
      // Save to localStorage
      localStorage.setItem(`retreat_progress_${newProgress.retreatId}`, JSON.stringify({
        ...newProgress,
        completedActivities: Array.from(newProgress.completedActivities),
        completedDays: Array.from(newProgress.completedDays)
      }));
    }
  };

  const loadProgress = (retreatId: string) => {
    const saved = localStorage.getItem(`retreat_progress_${retreatId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setProgress({
        ...parsed,
        completedActivities: new Set(parsed.completedActivities),
        completedDays: new Set(parsed.completedDays),
        startDate: new Date(parsed.startDate)
      });
    } else {
      setProgress(initializeProgress(retreatId));
    }
  };

  const startRetreat = (retreatId: string, intake?: IntakeData) => {
    const personalizedRetreat = createPersonalizedRetreat(retreatId, intake);
    if (personalizedRetreat) {
      setCurrentRetreat(personalizedRetreat);
      loadProgress(retreatId);
    }
  };

  const completeActivity = (activityId: string) => {
    if (progress) {
      const newCompleted = new Set(progress.completedActivities);
      newCompleted.add(activityId);
      updateProgress({ completedActivities: newCompleted });
    }
  };

  const completeDay = (day: number) => {
    if (progress) {
      const newCompletedDays = new Set(progress.completedDays);
      newCompletedDays.add(day);
      const nextDay = Math.min(day + 1, currentRetreat?.baseRetreat.duration || day);
      updateProgress({ 
        completedDays: newCompletedDays,
        currentDay: nextDay
      });
    }
  };

  return {
    currentRetreat,
    progress,
    startRetreat,
    completeActivity,
    completeDay,
    updateProgress,
    createPersonalizedRetreat
  };
};