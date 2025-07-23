import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Volume2, VolumeX, Play, Pause, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AudioGuidanceProps {
  activityType: string;
  instructions: string[];
  onAudioComplete?: () => void;
}

const AudioGuidance = ({ activityType, instructions, onAudioComplete }: AudioGuidanceProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Voice selection for different activity types
  const getVoiceForActivity = (type: string) => {
    const voiceMap: Record<string, string> = {
      "somatic-intervention": "SAz9YHcvj6GT2YYXdXww", // River - calming
      "cognitive-behavioral": "FGY2WhTYpPnrIDTdsKH5", // Laura - warm
      "dialectical-behavioral-therapy": "EXAVITQu4vr4xnSDxMaL", // Sarah - professional
      "mindfulness": "pFZP5JQG7iQjIQuC4Bku", // Lily - gentle
      "healing": "SAz9YHcvj6GT2YYXdXww", // River - soothing
      "nature": "XB0fDUnXU5powFXDhCwa", // Charlotte - natural
      "creative": "cgSgspJ2msm6clMCkdW9", // Jessica - encouraging
      default: "SAz9YHcvj6GT2YYXdXww" // River as default
    };
    return voiceMap[type] || voiceMap.default;
  };

  const generateAudio = async () => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key to use audio guidance.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Combine instructions into a guided meditation script
      const guidedScript = `
        Welcome to your guided ${activityType.replace('-', ' ')} session. 
        Find a comfortable position and allow yourself to be present for this healing practice.
        
        ${instructions.map((instruction, index) => 
          `Step ${index + 1}: ${instruction}. Take your time with this step.`
        ).join(' ')}
        
        You've completed this practice beautifully. Take a moment to notice how you feel now compared to when you started. 
        Carry this sense of peace with you as you continue your healing journey.
      `;

      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + getVoiceForActivity(activityType), {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: guidedScript,
          model_id: "eleven_multilingual_v2", // High quality, emotionally rich
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      
      toast({
        title: "Audio Generated",
        description: "Your guided meditation is ready to play."
      });

    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        title: "Audio Generation Failed",
        description: "Please check your API key and try again.",
        variant: "destructive"
      });
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
        onAudioComplete?.();
        toast({
          title: "Session Complete",
          description: "Your guided practice is finished. Well done!"
        });
      };
    }
  };

  const pauseAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  if (showApiKeyInput && !apiKey) {
    return (
      <Card className="bg-healing/5 border-healing/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-healing">
            <Volume2 className="w-5 h-5" />
            Audio Guidance Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              To enable guided audio for your meditations and breathwork, please enter your ElevenLabs API key. 
              You can get one free at <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-healing underline">elevenlabs.io</a>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey">ElevenLabs API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={generateAudio} disabled={!apiKey}>
              Generate Audio Guidance
            </Button>
            <Button variant="outline" onClick={() => setShowApiKeyInput(false)}>
              Skip Audio
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-healing/5 border-healing/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-healing">
          <Volume2 className="w-5 h-5" />
          Audio Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!audioUrl ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Get personalized audio guidance for this {activityType.replace('-', ' ')} practice.
            </p>
            <Button onClick={generateAudio} className="w-full">
              <Volume2 className="w-4 h-4 mr-2" />
              Generate Guided Audio
            </Button>
            {!apiKey && (
              <Button variant="outline" onClick={() => setShowApiKeyInput(true)}>
                Enter API Key
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your guided meditation is ready. Press play when you're comfortable and ready to begin.
            </p>
            <div className="flex gap-2">
              {!isPlaying ? (
                <Button onClick={playAudio}>
                  <Play className="w-4 h-4 mr-2" />
                  Play Guidance
                </Button>
              ) : (
                <Button onClick={pauseAudio} variant="outline">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button variant="outline" onClick={generateAudio}>
                <Volume2 className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioGuidance;