import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { PresentingConcernsData, IntakeData } from "@/types/intake";

interface PresentingConcernsProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const PresentingConcerns = ({ data, updateData, onNext, onPrevious }: PresentingConcernsProps) => {
  const [concerns, setConcerns] = useState<PresentingConcernsData>(data.presentingConcerns || {});

  const updateConcerns = (field: keyof PresentingConcernsData, value: any) => {
    const updated = { ...concerns, [field]: value };
    setConcerns(updated);
    updateData('presentingConcerns', updated);
  };

  const toggleConcern = (concern: string) => {
    const currentConcerns = concerns.primaryConcerns || [];
    const updated = currentConcerns.includes(concern)
      ? currentConcerns.filter(c => c !== concern)
      : [...currentConcerns, concern];
    updateConcerns('primaryConcerns', updated);
  };

  const toggleSupport = (support: string) => {
    const currentSupport = concerns.previousSupport || [];
    const updated = currentSupport.includes(support)
      ? currentSupport.filter(s => s !== support)
      : [...currentSupport, support];
    updateConcerns('previousSupport', updated);
  };

  const primaryConcernsOptions = [
    "Stress and overwhelm",
    "Anxiety and worry",
    "Depression and low mood",
    "Grief and loss",
    "Trauma and PTSD",
    "Burnout and exhaustion",
    "Relationship difficulties",
    "Work-life balance",
    "Addiction and compulsive behaviors",
    "Sleep difficulties",
    "Chronic pain or illness",
    "Life transitions",
    "Self-esteem and confidence",
    "Other"
  ];

  const previousSupportOptions = [
    "Individual therapy/counseling",
    "Group therapy",
    "Psychiatrist/medication management",
    "Support groups",
    "Wellness retreats",
    "Online mental health apps",
    "Religious/spiritual counseling",
    "Alternative therapies (acupuncture, massage, etc.)",
    "Self-help books/resources",
    "None"
  ];

  const impactLabels = ["Minimal", "Mild", "Moderate", "Significant", "Severe"];

  return (
    <div className="space-y-6">
      {/* Primary Concerns */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">What brings you to our retreat platform today?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select all areas you'd like support with. This helps us match you with the most relevant retreat program.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {primaryConcernsOptions.map((concern) => (
              <div key={concern} className="flex items-center space-x-2">
                <Checkbox
                  id={concern}
                  checked={(concerns.primaryConcerns || []).includes(concern)}
                  onCheckedChange={() => toggleConcern(concern)}
                />
                <label htmlFor={concern} className="text-sm">
                  {concern}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specific Symptoms */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Tell us more about your experience</h3>
          <Label htmlFor="symptoms">
            What specific symptoms or challenges have you been experiencing? (Optional)
          </Label>
          <Textarea
            id="symptoms"
            value={concerns.specificSymptoms || ''}
            onChange={(e) => updateConcerns('specificSymptoms', e.target.value)}
            placeholder="e.g., difficulty sleeping, racing thoughts, feeling overwhelmed at work, loss of appetite..."
            className="mt-2"
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Impact Level */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Impact on Daily Life</h3>
          <Label className="text-base">
            How much are these concerns currently affecting your daily life?
          </Label>
          
          <div className="mt-4 space-y-4">
            <Slider
              value={[concerns.impactLevel || 2]}
              onValueChange={(value) => updateConcerns('impactLevel', value[0])}
              max={4}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              {impactLabels.map((label, index) => (
                <span key={index} className="text-center">
                  {label}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Current selection: <strong>{impactLabels[concerns.impactLevel || 2]}</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Previous Support */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Previous Support & Treatment</h3>
          <p className="text-sm text-muted-foreground mb-4">
            What types of support have you tried before? This helps us understand what might work best for you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {previousSupportOptions.map((support) => (
              <div key={support} className="flex items-center space-x-2">
                <Checkbox
                  id={support}
                  checked={(concerns.previousSupport || []).includes(support)}
                  onCheckedChange={() => toggleSupport(support)}
                />
                <label htmlFor={support} className="text-sm">
                  {support}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Current Medications</h3>
          <RadioGroup
            value={concerns.currentMedications?.toString() || ''}
            onValueChange={(value) => updateConcerns('currentMedications', value === 'true')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="meds-yes" />
              <label htmlFor="meds-yes" className="text-sm">
                Yes, I am currently taking medications for mental health
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="meds-no" />
              <label htmlFor="meds-no" className="text-sm">
                No, I am not currently taking mental health medications
              </label>
            </div>
          </RadioGroup>

          {concerns.currentMedications && (
            <div className="mt-4">
              <Label htmlFor="medication-details">
                Please provide details about your current medications (Optional)
              </Label>
              <Textarea
                id="medication-details"
                value={concerns.medicationDetails || ''}
                onChange={(e) => updateConcerns('medicationDetails', e.target.value)}
                placeholder="This information helps us ensure retreat activities are safe and appropriate"
                className="mt-2"
                rows={2}
              />
            </div>
          )}
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

export default PresentingConcerns;