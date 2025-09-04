import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ArrowRight, Heart, Star } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description: string;
  guidance: string;
  encouragement: string;
}

interface GuidedStepsProps {
  steps: Step[];
  activityType: string;
  onStepComplete?: (stepId: string) => void;
  onAllComplete?: () => void;
}

const GuidedSteps = ({ steps, activityType, onStepComplete, onAllComplete }: GuidedStepsProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepComplete = (stepId: string, stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepId);
    setCompletedSteps(newCompleted);
    
    onStepComplete?.(stepId);
    
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    } else if (newCompleted.size === steps.length) {
      onAllComplete?.();
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'builder': return 'calm';
      case 'kitchen': return 'nature';
      case 'craft': return 'healing';
      case 'feelings': return 'earth';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <Badge variant={getTypeColor(activityType) as any} className="mb-2">
          Step-by-Step Guide
        </Badge>
        <p className="text-sm text-muted-foreground">
          Follow along at your own pace. There's no rush! 🌟
        </p>
      </div>

      {steps.map((step, index) => {
        const isCompleted = completedSteps.has(step.id);
        const isCurrent = currentStep === index;
        const isAvailable = index <= currentStep;

        return (
          <Card 
            key={step.id} 
            className={`transition-all duration-300 ${
              isCompleted 
                ? 'ring-2 ring-healing/30 bg-healing/5' 
                : isCurrent 
                ? 'ring-2 ring-accent/30 bg-accent/5 shadow-gentle' 
                : !isAvailable 
                ? 'opacity-50' 
                : 'hover:shadow-gentle'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-healing" />
                  ) : (
                    <Circle className={`w-6 h-6 ${isCurrent ? 'text-accent' : 'text-muted-foreground'}`} />
                  )}
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className={`font-medium ${isCurrent ? 'text-accent-foreground' : 'text-foreground'}`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>

                  {(isCurrent || isCompleted) && (
                    <div className="space-y-3">
                      <div className="p-3 bg-accent/20 rounded-lg border border-accent/30">
                        <div className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-accent-foreground mb-1">
                              Your Guide Says:
                            </p>
                            <p className="text-sm text-accent-foreground/80">
                              {step.guidance}
                            </p>
                          </div>
                        </div>
                      </div>

                      {!isCompleted && isAvailable && (
                        <Button
                          variant={getTypeColor(activityType) as any}
                          size="sm"
                          onClick={() => handleStepComplete(step.id, index)}
                          className="w-full"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          I Did This Step!
                        </Button>
                      )}

                      {isCompleted && (
                        <div className="p-3 bg-healing/20 rounded-lg border border-healing/30">
                          <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-healing mt-0.5 flex-shrink-0 fill-current" />
                            <p className="text-sm text-healing font-medium">
                              {step.encouragement}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isCurrent && !isCompleted && (
                  <ArrowRight className="w-5 h-5 text-accent animate-pulse flex-shrink-0 mt-1" />
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {completedSteps.size === steps.length && (
        <Card className="shadow-nurturing border-healing/30 bg-gradient-to-r from-healing/10 to-calm/10">
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 text-healing mx-auto mb-3 fill-current" />
            <h3 className="text-lg font-medium text-healing mb-2">
              Amazing Work! 🌟
            </h3>
            <p className="text-muted-foreground">
              You completed all the steps! Your guide is so proud of you. 
              You're learning and growing every day! 💝
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuidedSteps;