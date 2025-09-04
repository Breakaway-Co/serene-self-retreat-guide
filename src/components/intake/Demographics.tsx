import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DemographicsData, IntakeData } from "@/types/intake";

interface DemographicsProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const Demographics = ({ data, updateData, onNext, onPrevious }: DemographicsProps) => {
  const [demographics, setDemographics] = useState<DemographicsData>(data.demographics || {});

  const updateDemographics = (field: keyof DemographicsData, value: any) => {
    const updated = { ...demographics, [field]: value };
    setDemographics(updated);
    updateData('demographics', updated);
  };

  const toggleAccessibilityNeed = (need: string) => {
    const currentNeeds = demographics.accessibilityNeeds || [];
    const updated = currentNeeds.includes(need)
      ? currentNeeds.filter(n => n !== need)
      : [...currentNeeds, need];
    updateDemographics('accessibilityNeeds', updated);
  };

  const accessibilityOptions = [
    "Large text/font size adjustments",
    "High contrast mode",
    "Audio descriptions",
    "Closed captions/subtitles",
    "Keyboard navigation",
    "Screen reader compatibility",
    "Reduced motion/animations",
    "Extended time for activities",
    "Simplified language",
    "None needed"
  ];

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="120"
                value={demographics.age || ''}
                onChange={(e) => updateDemographics('age', parseInt(e.target.value) || undefined)}
                placeholder="Enter your age"
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender Identity</Label>
              <Select 
                value={demographics.gender || ''} 
                onValueChange={(value) => updateDemographics('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender identity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="woman">Woman</SelectItem>
                  <SelectItem value="man">Man</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="genderfluid">Genderfluid</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  <SelectItem value="self-describe">Self-describe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location (Country/State)</Label>
              <Input
                id="location"
                value={demographics.location || ''}
                onChange={(e) => updateDemographics('location', e.target.value)}
                placeholder="e.g., NSW, Australia"
              />
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select 
                value={demographics.timezone || ''} 
                onValueChange={(value) => updateDemographics('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AEST">AEST (Sydney/Melbourne)</SelectItem>
                  <SelectItem value="ACST">ACST (Adelaide)</SelectItem>
                  <SelectItem value="AWST">AWST (Perth)</SelectItem>
                  <SelectItem value="GMT">GMT (London)</SelectItem>
                  <SelectItem value="EST">EST (New York)</SelectItem>
                  <SelectItem value="PST">PST (Los Angeles)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="language">Preferred Language</Label>
            <Select 
              value={demographics.preferredLanguage || ''} 
              onValueChange={(value) => updateDemographics('preferredLanguage', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Needs */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Accessibility & Accommodation Needs</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Please select any accommodations that would help you access and engage with the retreat content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {accessibilityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={(demographics.accessibilityNeeds || []).includes(option)}
                  onCheckedChange={() => toggleAccessibilityNeed(option)}
                />
                <label htmlFor={option} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Previous Experience */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Previous Experience</h3>
          <div>
            <Label className="text-base">Have you participated in wellness retreats, therapy, or mental health programs before?</Label>
            <RadioGroup
              value={demographics.previousRetreatExperience?.toString() || ''}
              onValueChange={(value) => updateDemographics('previousRetreatExperience', value === 'true')}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="experience-yes" />
                <label htmlFor="experience-yes" className="text-sm">
                  Yes, I have previous experience with wellness or mental health programs
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="experience-no" />
                <label htmlFor="experience-no" className="text-sm">
                  No, this is my first time with a structured wellness program
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

export default Demographics;