import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, RefreshCw, Compass, Waves, Shield } from "lucide-react";
import { retreatConfigurations } from "@/data/retreatConfigurations";
import { IntakeData } from "@/types/intake";
import { useEffect, useState } from "react";

interface RetreatSelectorProps {
  onSelectRetreat: (retreatId: string) => void;
}

const RetreatSelector = ({ onSelectRetreat }: RetreatSelectorProps) => {
  const [recommendedRetreat, setRecommendedRetreat] = useState<string | null>(null);
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);

  useEffect(() => {
    // Check if user has completed intake for recommendations
    const savedIntake = localStorage.getItem('intake_data');
    if (savedIntake) {
      const intake: IntakeData = JSON.parse(savedIntake);
      setIntakeData(intake);
      
      // Simple recommendation logic based on primary concerns
      const primaryConcerns = intake.presentingConcerns?.primaryConcerns || [];
      if (primaryConcerns.includes('Stress') || primaryConcerns.includes('Burnout')) {
        setRecommendedRetreat('inner_compass');
      } else if (primaryConcerns.includes('Depression') || primaryConcerns.includes('Anxiety')) {
        setRecommendedRetreat('still_waters');
      } else if (primaryConcerns.includes('Addiction') || primaryConcerns.includes('Substance Use')) {
        setRecommendedRetreat('reset_path');
      }
    }
  }, []);

  const retreatIcons = {
    inner_compass: Compass,
    still_waters: Waves,
    reset_path: RefreshCw,
    together_through_grief: Heart,
    ember_to_flame: Brain,
    stabilisation_path: Shield
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-healing/10 text-healing';
      case 'moderate': return 'bg-calm/10 text-calm';
      case 'high': return 'bg-earth/10 text-earth';
      default: return 'bg-secondary/10 text-secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Choose Your Healing Journey</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select a retreat program that resonates with your current needs and healing goals.
        </p>
        {intakeData && (
          <div className="bg-healing/5 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-healing font-medium">
              ✨ Based on your intake assessment, we've highlighted recommended programs for you.
            </p>
          </div>
        )}
      </div>

      {/* Retreat Options */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(retreatConfigurations).map((retreat) => {
          const Icon = retreatIcons[retreat.id as keyof typeof retreatIcons] || Heart;
          const isRecommended = recommendedRetreat === retreat.id;
          
          return (
            <Card 
              key={retreat.id} 
              className={`relative transition-all hover:shadow-nurturing ${
                isRecommended ? 'ring-2 ring-healing shadow-nurturing' : ''
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-healing text-healing-foreground">
                    Recommended
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-healing/10 rounded-lg">
                      <Icon className="w-6 h-6 text-healing" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{retreat.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{retreat.duration} days</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {retreat.shortDescription}
                </CardDescription>
                
                {/* Focus Areas */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">FOCUS AREAS</p>
                  <div className="flex flex-wrap gap-1">
                    {retreat.focusAreas.slice(0, 3).map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {retreat.focusAreas.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{retreat.focusAreas.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Risk Level */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-muted-foreground">SUPPORT LEVEL</p>
                    <Badge className={`text-xs ${getRiskBadgeColor(retreat.riskLevel)}`}>
                      {retreat.riskLevel.charAt(0).toUpperCase() + retreat.riskLevel.slice(1)}
                    </Badge>
                  </div>
                  {retreat.requiresSupervision && (
                    <Badge variant="outline" className="text-xs">
                      Guided
                    </Badge>
                  )}
                </div>

                <Button 
                  onClick={() => onSelectRetreat(retreat.id)}
                  className="w-full"
                  variant={isRecommended ? "healing" : "outline"}
                >
                  Start This Journey
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Assessment CTA */}
      {!intakeData && (
        <Card className="bg-nature/5 border-nature/20">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Want personalized retreat recommendations based on your specific needs?
            </p>
            <Button 
              variant="nature" 
              onClick={() => window.location.href = '/intake'}
            >
              Take Assessment First
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RetreatSelector;