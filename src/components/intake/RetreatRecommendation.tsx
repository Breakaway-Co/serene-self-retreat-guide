import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Star, Clock, Shield, ArrowRight } from "lucide-react";
import { IntakeData, RetreatMatch } from "@/types/intake";
import { useNavigate } from "react-router-dom";

interface RetreatRecommendationProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const RetreatRecommendation = ({ data, onPrevious }: RetreatRecommendationProps) => {
  const [recommendedRetreat, setRecommendedRetreat] = useState<RetreatMatch | null>(null);
  const [alternativeRetreats, setAlternativeRetreats] = useState<RetreatMatch[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate retreat match based on intake data
    const matchedRetreat = calculateRetreatMatch(data);
    setRecommendedRetreat(matchedRetreat.primary);
    setAlternativeRetreats(matchedRetreat.alternatives);
  }, [data]);

  const calculateRetreatMatch = (intakeData: IntakeData) => {
    const concerns = intakeData.presentingConcerns?.primaryConcerns || [];
    const riskLevel = intakeData.safety?.riskLevel || 'low';
    const timeCommitment = intakeData.goals?.timeCommitment || 'moderate';
    
    // Define retreat options
    const retreats = [
      {
        retreatId: "inner_compass",
        name: "Inner Compass: Stress Recovery Retreat",
        description: "A gentle 7-day journey to reclaim your sense of calm and direction through mindfulness, somatic practices, and stress reduction techniques.",
        focusAreas: ["Stress", "Overwhelm", "Work-life balance"],
        duration: "7 days",
        adaptations: [],
        matchScore: 0
      },
      {
        retreatId: "still_waters",
        name: "Still Waters: Anxiety & Depression Support",
        description: "A 10-day comprehensive program combining evidence-based therapy techniques with gentle movement and nourishing practices.",
        focusAreas: ["Anxiety", "Depression", "Emotional regulation"],
        duration: "10 days",
        adaptations: [],
        matchScore: 0
      },
      {
        retreatId: "together_through_grief",
        name: "Together Through Grief: Healing Journey",
        description: "A specialized 14-day retreat designed to support you through loss with gentle guidance, memory work, and community connection.",
        focusAreas: ["Grief", "Loss", "Trauma", "Meaning-making"],
        duration: "14 days",
        adaptations: [],
        matchScore: 0
      },
      {
        retreatId: "ember_to_flame",
        name: "Ember to Flame: Burnout Recovery",
        description: "A transformative 12-day program to rebuild your energy, rediscover your purpose, and create sustainable work-life integration.",
        focusAreas: ["Burnout", "Energy", "Purpose", "Boundaries"],
        duration: "12 days",
        adaptations: [],
        matchScore: 0
      },
      {
        retreatId: "reset_path",
        name: "Reset Path: Addiction Recovery Support",
        description: "A 21-day structured program providing tools for breaking unhealthy patterns and building new, positive habits.",
        focusAreas: ["Addiction", "Habits", "Coping strategies", "Recovery"],
        duration: "21 days",
        adaptations: [],
        matchScore: 0
      },
      {
        retreatId: "stabilisation_path",
        name: "Stabilisation Path: Trauma-Informed Care",
        description: "A gentle 14-day program focused on safety, grounding, and stabilization for those with trauma histories.",
        focusAreas: ["PTSD", "Trauma", "Stabilization", "Safety"],
        duration: "14 days",
        adaptations: [],
        matchScore: 0
      }
    ];

    // Calculate match scores
    retreats.forEach(retreat => {
      let score = 0;
      
      // Primary concern matching
      concerns.forEach(concern => {
        if (concern.includes("stress") || concern.includes("overwhelm")) {
          if (retreat.retreatId === "inner_compass") score += 30;
          if (retreat.retreatId === "ember_to_flame") score += 25;
        }
        if (concern.includes("anxiety") || concern.includes("worry")) {
          if (retreat.retreatId === "still_waters") score += 30;
        }
        if (concern.includes("depression") || concern.includes("mood")) {
          if (retreat.retreatId === "still_waters") score += 30;
        }
        if (concern.includes("grief") || concern.includes("loss")) {
          if (retreat.retreatId === "together_through_grief") score += 35;
        }
        if (concern.includes("burnout") || concern.includes("exhaustion")) {
          if (retreat.retreatId === "ember_to_flame") score += 35;
        }
        if (concern.includes("addiction") || concern.includes("compulsive")) {
          if (retreat.retreatId === "reset_path") score += 35;
        }
        if (concern.includes("trauma") || concern.includes("PTSD")) {
          if (retreat.retreatId === "stabilisation_path") score += 35;
        }
      });

      // Risk level adjustments
      if (riskLevel === 'high') {
        if (retreat.retreatId === "stabilisation_path") score += 20;
        else score -= 10;
      }

      // Time commitment matching
      if (timeCommitment === 'minimal' && retreat.duration === "7 days") score += 10;
      if (timeCommitment === 'immersive' && parseInt(retreat.duration) >= 14) score += 10;

      retreat.matchScore = Math.max(score, 0);
    });

    // Add risk-specific adaptations
    if (riskLevel === 'high') {
      retreats.forEach(retreat => {
        retreat.riskMitigations = [
          "Extra grounding exercises included",
          "Shorter session durations available",
          "Crisis resource links provided",
          "Optional professional support referrals"
        ];
      });
    }

    // Sort and return
    const sorted = retreats.sort((a, b) => b.matchScore - a.matchScore);
    return {
      primary: sorted[0],
      alternatives: sorted.slice(1, 3)
    };
  };

  const handleStartRetreat = () => {
    // Navigate to the main retreat interface
    navigate('/');
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'moderate': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Assessment Complete */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900 text-lg">Assessment Complete!</h3>
              <p className="text-green-700 text-sm">
                Thank you for taking the time to complete this comprehensive assessment. 
                We've analyzed your responses to find the perfect retreat match for your needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Recommendation */}
      {recommendedRetreat && (
        <Card className="border-primary/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-primary">Your Recommended Retreat</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{recommendedRetreat.matchScore}% Match</span>
                  <Progress value={recommendedRetreat.matchScore} className="w-20" />
                </div>
              </div>
              <Badge variant="secondary" className="text-sm">
                Best Match
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{recommendedRetreat.name}</h3>
              <p className="text-muted-foreground mb-4">{recommendedRetreat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{recommendedRetreat.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className={`text-sm ${getRiskLevelColor(data.safety?.riskLevel || 'low')}`}>
                  {data.safety?.riskLevel || 'low'} risk level
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Trauma-informed approach
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Focus Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {recommendedRetreat.focusAreas.map((area) => (
                  <Badge key={area} variant="outline" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            {recommendedRetreat.riskMitigations && (
              <div>
                <h4 className="font-medium mb-2">Personalized Adaptations:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {recommendedRetreat.riskMitigations.map((mitigation, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      {mitigation}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button 
              onClick={handleStartRetreat} 
              className="w-full" 
              size="lg"
              variant="healing"
            >
              Start Your Retreat Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Alternative Options */}
      {alternativeRetreats.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-4">Alternative Options</h3>
          <div className="grid gap-4">
            {alternativeRetreats.map((retreat) => (
              <Card key={retreat.retreatId} className="border-muted">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{retreat.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {retreat.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{retreat.matchScore}% Match</span>
                      <Progress value={retreat.matchScore} className="w-16 mt-1" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {retreat.focusAreas.slice(0, 3).map((area) => (
                        <Badge key={area} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">What Happens Next?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Begin Your Retreat</p>
                <p className="text-muted-foreground">Start with Day 1 of your personalized program</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Daily Check-ins</p>
                <p className="text-muted-foreground">Track your progress and adjust activities as needed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Ongoing Support</p>
                <p className="text-muted-foreground">Access resources, community, and professional referrals</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleStartRetreat} variant="healing" size="lg">
          Begin My Retreat
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default RetreatRecommendation;