import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, Phone } from "lucide-react";
import { SafetyData, IntakeData } from "@/types/intake";

interface SafetySuitabilityProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SafetySuitability = ({ data, updateData, onNext, onPrevious }: SafetySuitabilityProps) => {
  const [safety, setSafety] = useState<SafetyData>(data.safety || {});

  const updateSafety = (field: keyof SafetyData, value: any) => {
    const updated = { ...safety, [field]: value };
    setSafety(updated);
    updateData('safety', updated);
  };

  const toggleContraindication = (contraindication: string) => {
    const current = safety.contraindications || [];
    const updated = current.includes(contraindication)
      ? current.filter(c => c !== contraindication)
      : [...current, contraindication];
    updateSafety('contraindications', updated);
  };

  const contraindications = [
    "Active substance use disorder requiring medical detox",
    "Current psychosis or severe mania",
    "Recent suicide attempt (within 6 months)",
    "Eating disorder requiring intensive medical supervision",
    "Severe trauma that requires specialized therapy",
    "Current domestic violence situation",
    "Uncontrolled medical condition affecting cognition",
    "None of the above apply to me"
  ];

  // Calculate risk level based on PHQ-9 and GAD-7 scores
  const phq9Score = data.wellbeingScreening?.phq9Score || 0;
  const gad7Score = data.wellbeingScreening?.gad7Score || 0;
  
  let calculatedRiskLevel: 'low' | 'moderate' | 'high' = 'low';
  if (phq9Score >= 20 || gad7Score >= 15) {
    calculatedRiskLevel = 'high';
  } else if (phq9Score >= 10 || gad7Score >= 8) {
    calculatedRiskLevel = 'moderate';
  }

  // Update risk level when component loads or scores change
  if (safety.riskLevel !== calculatedRiskLevel) {
    updateSafety('riskLevel', calculatedRiskLevel);
  }

  const isHighRisk = safety.riskLevel === 'high' || 
                    (safety.contraindications || []).some(c => c !== "None of the above apply to me");

  return (
    <div className="space-y-6">
      {/* Risk Assessment */}
      <Card className={`${safety.riskLevel === 'high' ? 'border-red-200' : safety.riskLevel === 'moderate' ? 'border-yellow-200' : 'border-green-200'}`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className={`w-6 h-6 mt-1 ${safety.riskLevel === 'high' ? 'text-red-500' : safety.riskLevel === 'moderate' ? 'text-yellow-500' : 'text-green-500'}`} />
            <div>
              <h3 className="font-semibold mb-2">Safety Assessment Results</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Based on your screening responses, we've assessed your suitability for our self-guided retreat programs.
              </p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                safety.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                safety.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                Risk Level: {safety.riskLevel?.charAt(0).toUpperCase() + safety.riskLevel?.slice(1)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Risk Alert */}
      {safety.riskLevel === 'high' && (
        <Alert className="border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> Your responses suggest you may benefit from professional support 
            before beginning a self-guided retreat. We recommend speaking with a mental health professional 
            to ensure you receive the most appropriate care.
          </AlertDescription>
        </Alert>
      )}

      {/* Crisis Resources */}
      {(safety.riskLevel === 'high' || safety.riskLevel === 'moderate') && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Crisis Resources Available 24/7</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Australia:</strong> Lifeline 13 11 14 | Beyond Blue 1300 22 4636</p>
                  <p><strong>US:</strong> 988 Suicide & Crisis Lifeline</p>
                  <p><strong>UK:</strong> Samaritans 116 123</p>
                  <p><strong>Emergency:</strong> Call your local emergency number (000, 911, 999)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Support Check */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold">Current Professional Support</h3>
          
          <div>
            <p className="text-sm mb-3">Do you currently have access to professional mental health support?</p>
            <RadioGroup
              value={safety.professionalSupport?.toString() || ''}
              onValueChange={(value) => updateSafety('professionalSupport', value === 'true')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="prof-yes" />
                <label htmlFor="prof-yes" className="text-sm">
                  Yes, I have a therapist, counselor, or psychiatrist I can contact
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="prof-no" />
                <label htmlFor="prof-no" className="text-sm">
                  No, I don't currently have professional mental health support
                </label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <p className="text-sm mb-3">Do you have a strong support network (family, friends, community)?</p>
            <RadioGroup
              value={safety.supportNetwork?.toString() || ''}
              onValueChange={(value) => updateSafety('supportNetwork', value === 'true')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="support-yes" />
                <label htmlFor="support-yes" className="text-sm">
                  Yes, I have people I can turn to for support
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="support-no" />
                <label htmlFor="support-no" className="text-sm">
                  No, I feel quite isolated or lack support
                </label>
              </div>
            </RadioGroup>
          </div>

          {safety.riskLevel !== 'low' && (
            <div>
              <p className="text-sm mb-3">Do you have a safety plan for managing difficult moments?</p>
              <RadioGroup
                value={safety.safetyPlan?.toString() || ''}
                onValueChange={(value) => updateSafety('safetyPlan', value === 'true')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="plan-yes" />
                  <label htmlFor="plan-yes" className="text-sm">
                    Yes, I know what to do if I feel overwhelmed or unsafe
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="plan-no" />
                  <label htmlFor="plan-no" className="text-sm">
                    No, I would benefit from help creating a safety plan
                  </label>
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contraindications */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Safety Screening</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Please check any that currently apply to you. This helps us ensure our program is safe and appropriate.
          </p>
          
          <div className="space-y-3">
            {contraindications.map((contraindication) => (
              <div key={contraindication} className="flex items-start space-x-2">
                <Checkbox
                  id={contraindication}
                  checked={(safety.contraindications || []).includes(contraindication)}
                  onCheckedChange={() => toggleContraindication(contraindication)}
                />
                <label htmlFor={contraindication} className="text-sm leading-relaxed">
                  {contraindication}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {isHighRisk && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-6">
            <h4 className="font-medium text-orange-900 mb-3">Recommended Next Steps</h4>
            <ul className="text-sm text-orange-800 space-y-2">
              <li>• Consider connecting with a mental health professional before starting</li>
              <li>• Explore our "Stabilization Path" retreat designed for higher acuity needs</li>
              <li>• Review our crisis resources and safety planning materials</li>
              <li>• Consider starting with shorter, gentler activities</li>
            </ul>
          </CardContent>
        </Card>
      )}

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

export default SafetySuitability;