import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, ShieldCheck } from 'lucide-react';
import { ScreeningAssessment } from './ScreeningAssessment';
import { ScreeningResults } from './ScreeningResults';
import { ScreeningSession } from '@/types/screening';

interface AddictionsScreeningProps {
  onComplete: (session: ScreeningSession) => void;
  onBack: () => void;
}

export function AddictionsScreening({ onComplete, onBack }: AddictionsScreeningProps) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [screeningSession, setScreeningSession] = useState<ScreeningSession | null>(null);

  const handleStartAssessment = () => {
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = (session: ScreeningSession) => {
    setScreeningSession(session);
    setCurrentStep('results');
  };

  const handleResultsComplete = () => {
    if (screeningSession) {
      onComplete(screeningSession);
    }
  };

  const handleRetakeAssessment = () => {
    setScreeningSession(null);
    setCurrentStep('assessment');
  };

  // Screening tools for addictions recovery
  const screeningTools = ['AUDIT-C', 'DAST-10', 'GAD-7', 'PHQ-9', 'WHO-5'];

  if (currentStep === 'assessment') {
    return (
      <ScreeningAssessment
        toolIds={screeningTools}
        onComplete={handleAssessmentComplete}
        onBack={() => setCurrentStep('intro')}
      />
    );
  }

  if (currentStep === 'results' && screeningSession) {
    return (
      <ScreeningResults
        session={screeningSession}
        onProceed={handleResultsComplete}
        onRetake={handleRetakeAssessment}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            Comprehensive Wellbeing Assessment
          </CardTitle>
          <p className="text-muted-foreground">
            To provide you with the most effective and safe support, we use evidence-based screening tools 
            to understand your current wellbeing and recovery needs.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">What to Expect</h4>
              <p className="text-sm text-blue-800 mb-3">
                This assessment consists of 5 validated screening tools that help us understand:
              </p>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Alcohol use patterns (AUDIT-C)</li>
                <li>• Substance use concerns (DAST-10)</li>
                <li>• Anxiety levels (GAD-7)</li>
                <li>• Depression screening (PHQ-9)</li>
                <li>• Overall wellbeing (WHO-5)</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Your Privacy & Safety</h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• All responses are confidential and encrypted</li>
                <li>• Used only to personalize your retreat experience</li>
                <li>• Crisis support resources provided if needed</li>
                <li>• No judgment - only compassionate support</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-medium text-amber-900 mb-2">Time Commitment</h4>
              <p className="text-sm text-amber-800">
                The complete assessment takes approximately 10-15 minutes. 
                Please answer honestly for the most accurate recommendations.
              </p>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> This assessment is designed to help us provide personalized support. 
              If you're experiencing a medical emergency or active withdrawal symptoms, please seek immediate medical attention.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleStartAssessment} className="bg-primary hover:bg-primary/90">
              Begin Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}