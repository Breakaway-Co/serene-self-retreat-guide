import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import ConsentPrivacy from "@/components/intake/ConsentPrivacy";
import Demographics from "@/components/intake/Demographics";
import PresentingConcerns from "@/components/intake/PresentingConcerns";
import WellbeingScreening from "@/components/intake/WellbeingScreening";
import SafetySuitability from "@/components/intake/SafetySuitability";
import LifestyleAccessibility from "@/components/intake/LifestyleAccessibility";
import GoalSetting from "@/components/intake/GoalSetting";
import RetreatRecommendation from "@/components/intake/RetreatRecommendation";
import { IntakeData } from "@/types/intake";

const IntakeAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [intakeData, setIntakeData] = useState<IntakeData>({
    consent: {},
    demographics: {},
    presentingConcerns: {},
    wellbeingScreening: {},
    safety: {},
    lifestyle: {},
    goals: {},
  });

  const steps = [
    { 
      id: "consent", 
      title: "Consent & Privacy", 
      component: ConsentPrivacy,
      description: "Review terms and provide consent for assessment"
    },
    { 
      id: "demographics", 
      title: "Demographics & Preferences", 
      component: Demographics,
      description: "Basic information and accessibility needs"
    },
    { 
      id: "concerns", 
      title: "Presenting Concerns", 
      component: PresentingConcerns,
      description: "What brings you to our retreat platform"
    },
    { 
      id: "wellbeing", 
      title: "Wellbeing Screening", 
      component: WellbeingScreening,
      description: "Validated screening tools for personalized care"
    },
    { 
      id: "safety", 
      title: "Safety & Suitability", 
      component: SafetySuitability,
      description: "Ensuring the right level of care for you"
    },
    { 
      id: "lifestyle", 
      title: "Lifestyle & Accessibility", 
      component: LifestyleAccessibility,
      description: "Tailoring the experience to your needs"
    },
    { 
      id: "goals", 
      title: "Goal Setting", 
      component: GoalSetting,
      description: "Define what success looks like for you"
    },
    { 
      id: "recommendation", 
      title: "Your Personalized Retreat", 
      component: RetreatRecommendation,
      description: "Matched retreat program based on your assessment"
    },
  ];

  const updateIntakeData = (section: keyof IntakeData, data: any) => {
    setIntakeData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Personalized Retreat Assessment
          </h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive, trauma-informed assessment to match you with the perfect healing journey
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="mb-4" />
            
            {/* Step indicator */}
            <div className="flex flex-wrap gap-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    index <= currentStep 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStep && <CheckCircle className="w-3 h-3" />}
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </CardHeader>
          <CardContent>
            <CurrentComponent
              data={intakeData}
              updateData={updateIntakeData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={currentStep === 0}
              isLast={currentStep === steps.length - 1}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} variant="healing">
              Continue
            </Button>
          ) : (
            <Button variant="healing">
              Complete Assessment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntakeAssessment;