import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";
import SeamlessAudioPlayer from "./SeamlessAudioPlayer";

interface AudioGuidanceProps {
  guideId: string;
  guideName: string;
  activityType: string;
  instructions: string[];
  onAudioComplete?: () => void;
}

const AudioGuidance = ({ guideId, guideName, activityType, instructions, onAudioComplete }: AudioGuidanceProps) => {
  return (
    <div className="space-y-4">
      <Alert className="border-2 border-dashed border-healing/40 bg-gradient-to-r from-healing/5 to-calm/5">
        <Sparkles className="w-4 h-4 text-healing" />
        <AlertDescription className="text-healing font-medium">
          Experience seamless, uninterrupted audio guidance. 
          Pure, flowing audio from start to finish for your complete immersion.
        </AlertDescription>
      </Alert>
      
      <SeamlessAudioPlayer
        guideId={guideId}
        guideName={guideName}
        activityType={activityType}
        instructions={instructions}
        onComplete={onAudioComplete}
      />
    </div>
  );
};

export default AudioGuidance;