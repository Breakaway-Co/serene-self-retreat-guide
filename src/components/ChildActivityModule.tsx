import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, Palette, RotateCcw, Play, Pause, Square, Heart, Mic, MicOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AudioGuidance from "./AudioGuidance";

interface RetreatModule {
  id: string;
  type: string;
  title: string;
  narration: string;
  caregiverTip: string;
  options?: string[];
  assets: string[];
}

interface ChildActivityModuleProps {
  module: RetreatModule;
  onBack: () => void;
  onComplete: (moduleId: string) => void;
}

const ChildActivityModule = ({ module, onBack, onComplete }: ChildActivityModuleProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(module.id);
    toast({
      title: "Great job! ⭐",
      description: "You completed this activity. You're doing amazing!",
    });
  };

  const renderActivityContent = () => {
    switch (module.type) {
      case 'builder':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-calm/10 rounded-lg border border-calm/20">
              <Palette className="w-12 h-12 text-calm mx-auto mb-4" />
              <h3 className="text-lg font-medium text-calm mb-2">Let's Build Together!</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['🧸 Soft Toy', '🎨 Art Supplies', '📸 Photos', '🎵 Music Box', '💎 Special Stone', '📝 Journal'].map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-calm/30 hover:bg-calm/10"
                  onClick={() => setSelectedOption(item)}
                >
                  <span className="text-2xl">{item.split(' ')[0]}</span>
                  <span className="text-xs">{item.split(' ').slice(1).join(' ')}</span>
                </Button>
              ))}
            </div>

            {selectedOption && (
              <div className="p-4 bg-accent/20 rounded-lg">
                <p className="text-sm text-accent-foreground">
                  You chose: <strong>{selectedOption}</strong>
                </p>
                <Textarea
                  placeholder="Tell us why this is special for your toolbox..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
          </div>
        );

      case 'spinner':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-nature/10 rounded-lg border border-nature/20">
              <RotateCcw className="w-12 h-12 text-nature mx-auto mb-4" />
              <h3 className="text-lg font-medium text-nature mb-2">Activity Wheel</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>

            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-nature/20 to-calm/20 rounded-full border-4 border-nature/30 flex items-center justify-center">
                {selectedOption ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <p className="text-sm font-medium text-nature">
                      {selectedOption.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎪</div>
                    <p className="text-sm text-muted-foreground">Click spin!</p>
                  </div>
                )}
              </div>
              
              <Button
                variant="nature"
                size="lg"
                className="mt-4 mx-auto block"
                onClick={() => {
                  const options = module.options || ['fun activity', 'gentle movement', 'quiet time'];
                  const randomOption = options[Math.floor(Math.random() * options.length)];
                  setSelectedOption(randomOption);
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Spin the Wheel!
              </Button>
            </div>

            {selectedOption && (
              <div className="p-4 bg-nature/10 rounded-lg text-center">
                <h4 className="font-medium text-nature mb-2">Today's Activity</h4>
                <p className="text-muted-foreground capitalize">
                  {selectedOption.replace('_', ' ')}
                </p>
                <Textarea
                  placeholder="How did this activity feel? Draw or write about it..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="mt-3"
                />
              </div>
            )}
          </div>
        );

      case 'audio_rest':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-healing/10 rounded-lg border border-healing/20">
              <Heart className="w-12 h-12 text-healing mx-auto mb-4" />
              <h3 className="text-lg font-medium text-healing mb-2">Rest & Listen</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>

            <AudioGuidance
              activityType="rest"
              instructions={[module.narration, "Take slow, gentle breaths.", "Feel safe and loved."]}
            />

            <div className="p-4 bg-healing/10 rounded-lg">
              <h4 className="font-medium text-healing mb-2">After your rest time</h4>
              <Textarea
                placeholder="How do you feel? You can draw, write, or ask a grown-up to help..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'record_or_text':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-earth/10 rounded-lg border border-earth/20">
              <Mic className="w-12 h-12 text-earth mx-auto mb-4" />
              <h3 className="text-lg font-medium text-earth mb-2">Share Your Story</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                variant={isRecording ? "destructive" : "earth"}
                size="lg"
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-earth mb-2 block">
                  Or write/draw your story here:
                </label>
                <Textarea
                  placeholder="Tell us about a happy memory, a funny story, or anything special..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-32"
                />
              </div>
            </div>
          </div>
        );

      case 'craft':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-calm/10 rounded-lg border border-calm/20">
              <Star className="w-12 h-12 text-calm mx-auto mb-4" />
              <h3 className="text-lg font-medium text-calm mb-2">Creative Time</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['⭐ Star Shape', '💝 Heart Shape', '🌈 Rainbow Colors', '🦋 Butterfly Design'].map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === option ? "calm" : "outline"}
                  className="h-16 flex flex-col items-center justify-center"
                  onClick={() => setSelectedOption(option)}
                >
                  <span className="text-xl mb-1">{option.split(' ')[0]}</span>
                  <span className="text-xs">{option.split(' ').slice(1).join(' ')}</span>
                </Button>
              ))}
            </div>

            <div className="p-4 bg-calm/10 rounded-lg">
              <h4 className="font-medium text-calm mb-2">Tell us about your creation</h4>
              <Textarea
                placeholder="What colors did you use? What makes it special? You can also draw here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>
        );

      case 'guided_steps':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-nature/10 rounded-lg border border-nature/20">
              <Heart className="w-12 h-12 text-nature mx-auto mb-4" />
              <h3 className="text-lg font-medium text-nature mb-2">Let's Do This Together</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>

            <div className="space-y-3">
              {['Step 1: Gather supplies together', 'Step 2: Take turns helping', 'Step 3: Share and enjoy', 'Step 4: Clean up as a team'].map((step, index) => (
                <div key={index} className="flex items-center p-3 bg-nature/5 rounded-lg border border-nature/20">
                  <div className="w-6 h-6 rounded-full bg-nature text-nature-foreground flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-nature/10 rounded-lg">
              <h4 className="font-medium text-nature mb-2">How did it go?</h4>
              <Textarea
                placeholder="What was your favorite part? How did it feel to work together?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'draw_template':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-healing/10 rounded-lg border border-healing/20">
              <Palette className="w-12 h-12 text-healing mx-auto mb-4" />
              <h3 className="text-lg font-medium text-healing mb-2">Feelings Map</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-healing/20">
              <div className="w-full h-64 bg-gradient-to-b from-healing/5 to-calm/5 rounded-lg border-2 border-dashed border-healing/30 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Palette className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Draw or describe where you feel different emotions</p>
                  <p className="text-xs mt-1">Head, heart, tummy, hands, feet...</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-healing/10 rounded-lg">
              <h4 className="font-medium text-healing mb-2">Tell us about your feelings</h4>
              <Textarea
                placeholder="Where did you put your feelings? What colors did you use? How do they feel?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'ritual_select':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-earth/10 rounded-lg border border-earth/20">
              <Star className="w-12 h-12 text-earth mx-auto mb-4" />
              <h3 className="text-lg font-medium text-earth mb-2">Special Closing</h3>
              <p className="text-muted-foreground">{module.narration}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'candle', icon: '🕯️', title: 'Light a Candle', desc: 'Make a gentle wish' },
                { id: 'seed', icon: '🌱', title: 'Plant a Seed', desc: 'Watch something grow' },
                { id: 'balloon', icon: '🎈', title: 'Wish Balloon', desc: 'Send love to the sky' }
              ].map((ritual) => (
                <Button
                  key={ritual.id}
                  variant={selectedOption === ritual.id ? "earth" : "outline"}
                  className="h-24 flex flex-col items-center justify-center space-y-2 border-earth/30"
                  onClick={() => setSelectedOption(ritual.id)}
                >
                  <span className="text-2xl">{ritual.icon}</span>
                  <div className="text-center">
                    <div className="text-sm font-medium">{ritual.title}</div>
                    <div className="text-xs text-muted-foreground">{ritual.desc}</div>
                  </div>
                </Button>
              ))}
            </div>

            {selectedOption && (
              <div className="p-4 bg-earth/10 rounded-lg">
                <h4 className="font-medium text-earth mb-2">Your special moment</h4>
                <Textarea
                  placeholder="What did you wish for? How did it feel? What would you like to remember?"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center p-6 bg-muted/10 rounded-lg">
            <p className="text-muted-foreground">Activity content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-nurturing">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-accent/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-healing">{module.title}</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mr-2 capitalize border-healing/30 text-healing bg-healing/10">
                  {module.type.replace('_', ' ')}
                </Badge>
                Activity for children and caregivers
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Caregiver Tip */}
      <Card className="shadow-gentle border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-accent-foreground mb-1">For Caregivers</h4>
              <p className="text-sm text-accent-foreground/80">{module.caregiverTip}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Content */}
      <Card className="shadow-nurturing">
        <CardContent className="p-6">
          {renderActivityContent()}
        </CardContent>
      </Card>

      {/* Complete Button */}
      <Card className="shadow-gentle">
        <CardContent className="p-4 text-center">
          <Button
            variant="healing"
            size="lg"
            onClick={handleComplete}
            disabled={isCompleted}
            className="min-w-[200px]"
          >
            {isCompleted ? (
              <>
                <Star className="w-4 h-4 mr-2 fill-current" />
                Completed! ⭐
              </>
            ) : (
              <>
                <Star className="w-4 h-4 mr-2" />
                Mark as Complete
              </>
            )}
          </Button>
          
          {isCompleted && (
            <p className="text-sm text-muted-foreground mt-2">
              Great job! You can always come back to this activity later.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildActivityModule;