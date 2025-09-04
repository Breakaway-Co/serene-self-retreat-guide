import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LifestyleData, IntakeData } from "@/types/intake";

interface LifestyleAccessibilityProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const LifestyleAccessibility = ({ data, updateData, onNext, onPrevious }: LifestyleAccessibilityProps) => {
  const [lifestyle, setLifestyle] = useState<LifestyleData>(data.lifestyle || {});

  const updateLifestyle = (field: keyof LifestyleData, value: any) => {
    const updated = { ...lifestyle, [field]: value };
    setLifestyle(updated);
    updateData('lifestyle', updated);
  };

  const toggleDietaryRestriction = (restriction: string) => {
    const current = lifestyle.dietaryRestrictions || [];
    const updated = current.includes(restriction)
      ? current.filter(r => r !== restriction)
      : [...current, restriction];
    updateLifestyle('dietaryRestrictions', updated);
  };

  const toggleStressManagement = (technique: string) => {
    const current = lifestyle.stressManagement || [];
    const updated = current.includes(technique)
      ? current.filter(t => t !== technique)
      : [...current, technique];
    updateLifestyle('stressManagement', updated);
  };

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-free",
    "Dairy-free",
    "Nut allergies",
    "Halal",
    "Kosher",
    "Low sodium",
    "Diabetic-friendly",
    "Other food allergies/intolerances",
    "No restrictions"
  ];

  const stressManagementOptions = [
    "Exercise/Movement",
    "Meditation",
    "Deep breathing",
    "Journaling",
    "Music/Art",
    "Nature/Outdoors",
    "Social connection",
    "Reading",
    "Yoga",
    "Prayer/Spirituality",
    "None currently"
  ];

  const techComfortLabels = ["Very uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very comfortable"];

  return (
    <div className="space-y-6">
      {/* Daily Schedule */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Daily Schedule & Availability</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base">What does your typical daily schedule look like?</Label>
              <RadioGroup
                value={lifestyle.dailySchedule || ''}
                onValueChange={(value) => updateLifestyle('dailySchedule', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-structured" id="schedule-structured" />
                  <label htmlFor="schedule-structured" className="text-sm">
                    Very structured - I have a set routine with specific times for activities
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat-structured" id="schedule-somewhat" />
                  <label htmlFor="schedule-somewhat" className="text-sm">
                    Somewhat structured - I have routines but with flexibility
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="schedule-flexible" />
                  <label htmlFor="schedule-flexible" className="text-sm">
                    Flexible - My schedule varies day to day
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unpredictable" id="schedule-unpredictable" />
                  <label htmlFor="schedule-unpredictable" className="text-sm">
                    Unpredictable - I have little control over my daily schedule
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="session-length">Preferred session length for activities</Label>
              <Select 
                value={lifestyle.preferredSessionLength || ''} 
                onValueChange={(value) => updateLifestyle('preferredSessionLength', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select preferred session length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="micro">Micro sessions (3-5 minutes)</SelectItem>
                  <SelectItem value="short">Short sessions (10-15 minutes)</SelectItem>
                  <SelectItem value="medium">Medium sessions (20-30 minutes)</SelectItem>
                  <SelectItem value="long">Longer sessions (45+ minutes)</SelectItem>
                  <SelectItem value="mixed">Mixed - depends on my mood and time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Physical Activity */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Physical Activity & Movement</h3>
          
          <div>
            <Label className="text-base">How would you describe your current activity level?</Label>
            <RadioGroup
              value={lifestyle.exerciseLevel || ''}
              onValueChange={(value) => updateLifestyle('exerciseLevel', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sedentary" id="exercise-sedentary" />
                <label htmlFor="exercise-sedentary" className="text-sm">
                  Sedentary - Little to no regular physical activity
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lightly-active" id="exercise-light" />
                <label htmlFor="exercise-light" className="text-sm">
                  Lightly active - Some movement, walking, or gentle activities
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderately-active" id="exercise-moderate" />
                <label htmlFor="exercise-moderate" className="text-sm">
                  Moderately active - Regular exercise 2-3 times per week
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-active" id="exercise-very" />
                <label htmlFor="exercise-very" className="text-sm">
                  Very active - Regular intense exercise 4+ times per week
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="limited-mobility" id="exercise-limited" />
                <label htmlFor="exercise-limited" className="text-sm">
                  Limited mobility - Physical restrictions or chronic conditions
                </label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Dietary Considerations */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Dietary Preferences & Restrictions</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select any dietary restrictions or preferences that apply to you. This helps us customize meal planning content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dietaryOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={(lifestyle.dietaryRestrictions || []).includes(option)}
                  onCheckedChange={() => toggleDietaryRestriction(option)}
                />
                <label htmlFor={option} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sleep Patterns */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Sleep & Rest</h3>
          
          <div>
            <Label className="text-base">How would you describe your current sleep patterns?</Label>
            <RadioGroup
              value={lifestyle.sleepPatterns || ''}
              onValueChange={(value) => updateLifestyle('sleepPatterns', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="sleep-excellent" />
                <label htmlFor="sleep-excellent" className="text-sm">
                  Excellent - I sleep well and feel rested
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="sleep-good" />
                <label htmlFor="sleep-good" className="text-sm">
                  Good - Generally sleep well with occasional issues
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fair" id="sleep-fair" />
                <label htmlFor="sleep-fair" className="text-sm">
                  Fair - Some sleep difficulties, sometimes feel tired
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="sleep-poor" />
                <label htmlFor="sleep-poor" className="text-sm">
                  Poor - Significant sleep problems, often feel tired
                </label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Current Stress Management */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Current Stress Management</h3>
          <p className="text-sm text-muted-foreground mb-4">
            What strategies do you currently use to manage stress? (Select all that apply)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stressManagementOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={(lifestyle.stressManagement || []).includes(option)}
                  onCheckedChange={() => toggleStressManagement(option)}
                />
                <label htmlFor={option} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Comfort */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Technology Comfort Level</h3>
          <Label className="text-base">
            How comfortable are you with using apps, videos, and online tools?
          </Label>
          
          <div className="mt-4 space-y-4">
            <Slider
              value={[lifestyle.techComfort || 2]}
              onValueChange={(value) => updateLifestyle('techComfort', value[0])}
              max={4}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              {techComfortLabels.map((label, index) => (
                <span key={index} className="text-center">
                  {label}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Current selection: <strong>{techComfortLabels[lifestyle.techComfort || 2]}</strong>
            </p>
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

export default LifestyleAccessibility;