import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Target, Star, Calendar, Users } from "lucide-react";
import { GoalsData, IntakeData } from "@/types/intake";

interface GoalSettingProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const GoalSetting = ({ data, updateData, onNext, onPrevious }: GoalSettingProps) => {
  const [goals, setGoals] = useState<GoalsData>(data.goals || {});

  const updateGoals = (field: keyof GoalsData, value: any) => {
    const updated = { ...goals, [field]: value };
    setGoals(updated);
    updateData('goals', updated);
  };

  const toggleGoal = (goal: string) => {
    const current = goals.primaryGoals || [];
    const updated = current.includes(goal)
      ? current.filter(g => g !== goal)
      : [...current, goal];
    updateGoals('primaryGoals', updated);
  };

  const toggleSuccessMetric = (metric: string) => {
    const current = goals.successMetrics || [];
    const updated = current.includes(metric)
      ? current.filter(m => m !== metric)
      : [...current, metric];
    updateGoals('successMetrics', updated);
  };

  const toggleGrowthArea = (area: string) => {
    const current = goals.growthAreas || [];
    const updated = current.includes(area)
      ? current.filter(a => a !== area)
      : [...current, area];
    updateGoals('growthAreas', updated);
  };

  const primaryGoalOptions = [
    "Reduce stress and anxiety",
    "Improve mood and emotional wellbeing",
    "Develop better coping strategies",
    "Build resilience and inner strength",
    "Process grief or trauma",
    "Improve sleep quality",
    "Increase energy and motivation",
    "Enhance self-awareness",
    "Strengthen relationships",
    "Find meaning and purpose",
    "Develop mindfulness practices",
    "Improve work-life balance",
    "Build healthy habits",
    "Increase self-compassion"
  ];

  const successMetricOptions = [
    "Feeling calmer and more peaceful",
    "Sleeping better",
    "Having more energy",
    "Feeling more hopeful about the future",
    "Better able to handle difficult emotions",
    "Improved relationships with others",
    "Increased confidence and self-esteem",
    "Better able to set boundaries",
    "More present and mindful",
    "Clearer sense of values and purpose",
    "Reduced physical symptoms of stress",
    "Better able to enjoy daily activities"
  ];

  const growthAreaOptions = [
    "Emotional regulation",
    "Communication skills",
    "Self-compassion",
    "Mindfulness practice",
    "Stress management",
    "Boundary setting",
    "Self-advocacy",
    "Gratitude practice",
    "Body awareness",
    "Creative expression",
    "Spiritual connection",
    "Social skills"
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-2">
                Setting Your Intentions
              </h3>
              <p className="text-sm text-muted-foreground">
                Defining clear, meaningful goals helps us personalize your retreat experience and 
                measure your progress along the way. There are no wrong answers - this is about what matters to you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Goals */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">What are your primary goals for this retreat?</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Select the goals that resonate most with you right now (choose as many as feel relevant):
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {primaryGoalOptions.map((goal) => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox
                  id={goal}
                  checked={(goals.primaryGoals || []).includes(goal)}
                  onCheckedChange={() => toggleGoal(goal)}
                />
                <label htmlFor={goal} className="text-sm">
                  {goal}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">How will you know the retreat is working for you?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the outcomes that would feel most meaningful to you:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {successMetricOptions.map((metric) => (
              <div key={metric} className="flex items-center space-x-2">
                <Checkbox
                  id={metric}
                  checked={(goals.successMetrics || []).includes(metric)}
                  onCheckedChange={() => toggleSuccessMetric(metric)}
                />
                <label htmlFor={metric} className="text-sm">
                  {metric}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Commitment */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Time Commitment</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base">How much time can you realistically commit to retreat activities?</Label>
              <RadioGroup
                value={goals.timeCommitment || ''}
                onValueChange={(value) => updateGoals('timeCommitment', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="minimal" id="time-minimal" />
                  <label htmlFor="time-minimal" className="text-sm">
                    Minimal (5-10 minutes daily) - I have very limited time but want to start somewhere
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="time-moderate" />
                  <label htmlFor="time-moderate" className="text-sm">
                    Moderate (15-30 minutes daily) - I can dedicate some focused time each day
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="substantial" id="time-substantial" />
                  <label htmlFor="time-substantial" className="text-sm">
                    Substantial (45-60 minutes daily) - I'm ready to make this a priority
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="immersive" id="time-immersive" />
                  <label htmlFor="time-immersive" className="text-sm">
                    Immersive (90+ minutes daily) - I want a deep, transformative experience
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base">What pace feels right for you?</Label>
              <RadioGroup
                value={goals.preferredPace || ''}
                onValueChange={(value) => updateGoals('preferredPace', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gentle" id="pace-gentle" />
                  <label htmlFor="pace-gentle" className="text-sm">
                    Gentle and slow - I need lots of time to process and integrate
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="steady" id="pace-steady" />
                  <label htmlFor="pace-steady" className="text-sm">
                    Steady and consistent - I like regular progress without rushing
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dynamic" id="pace-dynamic" />
                  <label htmlFor="pace-dynamic" className="text-sm">
                    Dynamic and varied - I like mixing intense and gentle activities
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Areas */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Areas for Growth</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Which skills or qualities would you most like to develop during your retreat?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {growthAreaOptions.map((area) => (
              <div key={area} className="flex items-center space-x-2">
                <Checkbox
                  id={area}
                  checked={(goals.growthAreas || []).includes(area)}
                  onCheckedChange={() => toggleGrowthArea(area)}
                />
                <label htmlFor={area} className="text-sm">
                  {area}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accountability */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Accountability & Support</h3>
          </div>
          
          <div>
            <Label className="text-base">How do you prefer to stay motivated and accountable?</Label>
            <RadioGroup
              value={goals.accountabilityPreference || ''}
              onValueChange={(value) => updateGoals('accountabilityPreference', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="self-directed" id="account-self" />
                <label htmlFor="account-self" className="text-sm">
                  Self-directed - I prefer to work independently with minimal reminders
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gentle-reminders" id="account-gentle" />
                <label htmlFor="account-gentle" className="text-sm">
                  Gentle reminders - Occasional check-ins and encouragement would be helpful
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="structured-support" id="account-structured" />
                <label htmlFor="account-structured" className="text-sm">
                  Structured support - Regular reminders and progress tracking keep me motivated
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="community" id="account-community" />
                <label htmlFor="account-community" className="text-sm">
                  Community connection - I'd like to connect with others on similar journeys
                </label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext} variant="healing">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GoalSetting;