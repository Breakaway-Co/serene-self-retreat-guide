import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, AlertCircle } from "lucide-react";
import { ConsentData, IntakeData } from "@/types/intake";

interface ConsentPrivacyProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ConsentPrivacy = ({ data, updateData, onNext, isFirst }: ConsentPrivacyProps) => {
  const [consent, setConsent] = useState<ConsentData>(data.consent || {});

  const updateConsent = (field: keyof ConsentData, value: boolean) => {
    const updated = { ...consent, [field]: value };
    setConsent(updated);
    updateData('consent', updated);
  };

  const canProceed = consent.privacyAgreement && 
                    consent.dataProcessing && 
                    consent.ageConfirmation && 
                    consent.withdrawalAcknowledged;

  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-2">
                Your Privacy & Safety Are Our Priority
              </h3>
              <p className="text-sm text-muted-foreground">
                Before we begin your personalized assessment, please review and provide consent 
                for how we'll use your information to create the safest, most effective retreat experience.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Agreement */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-muted-foreground mt-1" />
            <div className="flex-1">
              <h4 className="font-medium mb-2">Privacy Policy Agreement</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Your assessment responses will be encrypted and used solely to personalize your retreat experience. 
                We never share your personal health information with third parties without explicit consent.
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={consent.privacyAgreement || false}
                  onCheckedChange={(checked) => updateConsent('privacyAgreement', !!checked)}
                />
                <label htmlFor="privacy" className="text-sm font-medium">
                  I have read and agree to the Privacy Policy *
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Processing */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-muted-foreground mt-1" />
            <div className="flex-1">
              <h4 className="font-medium mb-2">Assessment Data Processing</h4>
              <p className="text-sm text-muted-foreground mb-4">
                I consent to the processing of my assessment responses to:
              </p>
              <ul className="text-sm text-muted-foreground mb-4 space-y-1 ml-4">
                <li>• Match me with the most appropriate retreat program</li>
                <li>• Identify any safety considerations or contraindications</li>
                <li>• Personalize content and pacing to my needs</li>
                <li>• Track progress and outcomes for quality improvement</li>
              </ul>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dataProcessing"
                  checked={consent.dataProcessing || false}
                  onCheckedChange={(checked) => updateConsent('dataProcessing', !!checked)}
                />
                <label htmlFor="dataProcessing" className="text-sm font-medium">
                  I consent to assessment data processing for personalization *
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Consent */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground mt-1" />
            <div className="flex-1">
              <h4 className="font-medium mb-2">Communication Preferences</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Receive gentle reminders, progress updates, and optional wellness resources.
                You can modify these preferences anytime in your account settings.
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="communication"
                  checked={consent.communicationConsent || false}
                  onCheckedChange={(checked) => updateConsent('communicationConsent', !!checked)}
                />
                <label htmlFor="communication" className="text-sm font-medium">
                  I consent to receive supportive communications (optional)
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal Rights */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h4 className="font-medium">Your Rights</h4>
            <div className="bg-muted/50 p-4 rounded-md">
              <p className="text-sm text-muted-foreground mb-3">
                <strong>You have the right to:</strong>
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Withdraw consent and delete your data at any time</li>
                <li>• Request a copy of your assessment data</li>
                <li>• Pause or discontinue your retreat at any point</li>
                <li>• Access crisis resources and professional referrals</li>
              </ul>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="withdrawal"
                checked={consent.withdrawalAcknowledged || false}
                onCheckedChange={(checked) => updateConsent('withdrawalAcknowledged', !!checked)}
              />
              <label htmlFor="withdrawal" className="text-sm font-medium">
                I understand my rights and how to exercise them *
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Age Confirmation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="age"
              checked={consent.ageConfirmation || false}
              onCheckedChange={(checked) => updateConsent('ageConfirmation', !!checked)}
            />
            <label htmlFor="age" className="text-sm font-medium">
              I confirm that I am 18 years or older *
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          variant="healing"
          size="lg"
        >
          {canProceed ? "Begin Assessment" : "Please complete all required fields"}
        </Button>
      </div>
    </div>
  );
};

export default ConsentPrivacy;