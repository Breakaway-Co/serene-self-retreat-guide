import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Volume2, Info, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SeamlessAudioPlayer from "./SeamlessAudioPlayer";

interface AudioGuidanceProps {
  guideId: string;
  guideName: string;
  activityType: string;
  instructions: string[];
  onAudioComplete?: () => void;
}

const AudioGuidance = ({ guideId, guideName, activityType, instructions, onAudioComplete }: AudioGuidanceProps) => {
  const [showLegacyMode, setShowLegacyMode] = useState(false);
  const { toast } = useToast();

  if (!showLegacyMode) {
    return (
      <div className="space-y-4">
        <Alert className="border-2 border-dashed border-healing/40 bg-gradient-to-r from-healing/5 to-calm/5">
          <Sparkles className="w-4 h-4 text-healing" />
          <AlertDescription className="text-healing font-medium">
            <strong>New!</strong> Experience seamless, uninterrupted audio sessions. 
            No more clicking through steps - just pure, flowing guidance from start to finish.
          </AlertDescription>
        </Alert>
        
        <SeamlessAudioPlayer
          guideId={guideId}
          guideName={guideName}
          activityType={activityType}
          onComplete={onAudioComplete}
        />
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowLegacyMode(true)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Use step-by-step mode instead
        </Button>
      </div>
    );
  }

  // Legacy step-by-step mode
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="w-4 h-4" />
        <AlertDescription>
          You're using the step-by-step audio mode. For a better experience, try the new seamless audio feature.
        </AlertDescription>
      </Alert>
      
      <Card className="bg-healing/5 border-healing/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-healing">
            <Volume2 className="w-5 h-5" />
            Step-by-Step Audio Guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This mode provides individual audio clips for each step of your {activityType.replace('-', ' ')} practice.
          </p>
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              Step-by-step audio generation requires an ElevenLabs API key. 
              <Button 
                variant="link" 
                className="p-0 h-auto text-healing underline"
                onClick={() => setShowLegacyMode(false)}
              >
                Try seamless audio instead
              </Button> for the best experience.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioGuidance;