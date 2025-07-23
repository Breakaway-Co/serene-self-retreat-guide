import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Save, Heart, Star, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActivityResponseProps {
  activityId: string;
  activityName: string;
  responseType: "journal" | "scale" | "emotion" | "reflection" | "gratitude";
  prompts?: string[];
  onSave: (responses: Record<string, any>) => void;
}

const ActivityResponse = ({ activityId, activityName, responseType, prompts = [], onSave }: ActivityResponseProps) => {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  // Load saved responses
  useEffect(() => {
    const savedData = localStorage.getItem(`activity_${activityId}_${new Date().toDateString()}`);
    if (savedData) {
      setResponses(JSON.parse(savedData));
      setIsSaved(true);
    }
  }, [activityId]);

  const handleSave = () => {
    const timestamp = new Date().toISOString();
    const dataToSave = {
      ...responses,
      activityName,
      timestamp,
      date: new Date().toDateString()
    };
    
    // Save to localStorage
    localStorage.setItem(`activity_${activityId}_${new Date().toDateString()}`, JSON.stringify(dataToSave));
    
    // Also save to progress tracking
    const progressKey = `progress_${activityId}`;
    const existingProgress = JSON.parse(localStorage.getItem(progressKey) || '[]');
    existingProgress.push(dataToSave);
    localStorage.setItem(progressKey, JSON.stringify(existingProgress));
    
    setIsSaved(true);
    onSave(dataToSave);
    
    toast({
      title: "Responses Saved",
      description: "Your reflections have been recorded for progress tracking."
    });
  };

  const updateResponse = (key: string, value: any) => {
    setResponses(prev => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const renderJournalInterface = () => (
    <div className="space-y-4">
      {prompts.map((prompt, index) => (
        <div key={index} className="space-y-2">
          <Label className="text-sm font-medium">{prompt}</Label>
          <Textarea
            placeholder="Share your thoughts and feelings..."
            value={responses[`prompt_${index}`] || ""}
            onChange={(e) => updateResponse(`prompt_${index}`, e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      ))}
      
      <div className="space-y-2">
        <Label className="text-sm font-medium">Additional Reflections</Label>
        <Textarea
          placeholder="Any other thoughts, insights, or observations from this practice..."
          value={responses.additional_reflections || ""}
          onChange={(e) => updateResponse("additional_reflections", e.target.value)}
          className="min-h-[80px]"
        />
      </div>
    </div>
  );

  const renderScaleInterface = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">How are you feeling before this practice? (1-10)</Label>
          <div className="px-3">
            <Slider
              value={[responses.feeling_before || 5]}
              onValueChange={(value) => updateResponse("feeling_before", value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Very Low</span>
              <span className="font-medium">Current: {responses.feeling_before || 5}</span>
              <span>Very High</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">How motivated do you feel? (1-10)</Label>
          <div className="px-3">
            <Slider
              value={[responses.motivation || 5]}
              onValueChange={(value) => updateResponse("motivation", value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Not Motivated</span>
              <span className="font-medium">Current: {responses.motivation || 5}</span>
              <span>Very Motivated</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Energy Level (1-10)</Label>
          <div className="px-3">
            <Slider
              value={[responses.energy_level || 5]}
              onValueChange={(value) => updateResponse("energy_level", value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Very Low</span>
              <span className="font-medium">Current: {responses.energy_level || 5}</span>
              <span>Very High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmotionInterface = () => {
    const emotions = [
      "Joy", "Gratitude", "Peace", "Hope", "Calm", "Content",
      "Sad", "Angry", "Anxious", "Frustrated", "Overwhelmed", "Lonely",
      "Excited", "Proud", "Confident", "Curious", "Relaxed", "Focused"
    ];

    return (
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">What emotions are you experiencing? (Select all that apply)</Label>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <Badge
                key={emotion}
                variant={responses.emotions?.includes(emotion) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  const currentEmotions = responses.emotions || [];
                  const newEmotions = currentEmotions.includes(emotion)
                    ? currentEmotions.filter((e: string) => e !== emotion)
                    : [...currentEmotions, emotion];
                  updateResponse("emotions", newEmotions);
                }}
              >
                {emotion}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Describe your emotional experience</Label>
          <Textarea
            placeholder="How are these emotions showing up in your body and mind?"
            value={responses.emotion_description || ""}
            onChange={(e) => updateResponse("emotion_description", e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    );
  };

  const renderGratitudeInterface = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Three things I'm grateful for today:</Label>
        {[1, 2, 3].map((num) => (
          <div key={num} className="space-y-1">
            <Input
              placeholder={`Gratitude ${num}...`}
              value={responses[`gratitude_${num}`] || ""}
              onChange={(e) => updateResponse(`gratitude_${num}`, e.target.value)}
            />
            <Input
              placeholder="Why does this matter to you?"
              value={responses[`gratitude_why_${num}`] || ""}
              onChange={(e) => updateResponse(`gratitude_why_${num}`, e.target.value)}
              className="text-sm"
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Something I appreciate about myself today:</Label>
        <Textarea
          placeholder="Acknowledge your efforts, growth, or positive qualities..."
          value={responses.self_appreciation || ""}
          onChange={(e) => updateResponse("self_appreciation", e.target.value)}
          className="min-h-[80px]"
        />
      </div>
    </div>
  );

  const renderReflectionInterface = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">What did you notice during this practice?</Label>
        <Textarea
          placeholder="Physical sensations, thoughts, emotions, insights..."
          value={responses.practice_observations || ""}
          onChange={(e) => updateResponse("practice_observations", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">What felt challenging?</Label>
        <Textarea
          placeholder="Any difficulties or resistance you experienced..."
          value={responses.challenges || ""}
          onChange={(e) => updateResponse("challenges", e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">What felt supportive or helpful?</Label>
        <Textarea
          placeholder="Aspects that felt good or beneficial..."
          value={responses.supportive_aspects || ""}
          onChange={(e) => updateResponse("supportive_aspects", e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">How do you feel now compared to when you started?</Label>
        <Textarea
          placeholder="Changes in mood, energy, perspective, or physical sensations..."
          value={responses.before_after || ""}
          onChange={(e) => updateResponse("before_after", e.target.value)}
          className="min-h-[80px]"
        />
      </div>
    </div>
  );

  const renderInterface = () => {
    switch (responseType) {
      case "journal":
        return renderJournalInterface();
      case "scale":
        return renderScaleInterface();
      case "emotion":
        return renderEmotionInterface();
      case "gratitude":
        return renderGratitudeInterface();
      case "reflection":
        return renderReflectionInterface();
      default:
        return renderReflectionInterface();
    }
  };

  const getIcon = () => {
    switch (responseType) {
      case "gratitude":
        return <Heart className="w-5 h-5" />;
      case "scale":
        return <TrendingUp className="w-5 h-5" />;
      case "emotion":
        return <Star className="w-5 h-5" />;
      default:
        return <Save className="w-5 h-5" />;
    }
  };

  return (
    <Card className="shadow-gentle">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-nature">
          {getIcon()}
          Capture Your Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderInterface()}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-muted-foreground">
            {isSaved ? "✓ Saved" : "Unsaved changes"}
          </span>
          <Button 
            onClick={handleSave}
            disabled={isSaved}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaved ? "Saved" : "Save Responses"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityResponse;