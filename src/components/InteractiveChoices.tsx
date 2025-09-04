import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Star, Sparkles } from "lucide-react";

interface Choice {
  id: string;
  emoji: string;
  title: string;
  description: string;
  guidance: string;
  followUp: string;
}

interface InteractiveChoicesProps {
  title: string;
  description: string;
  choices: Choice[];
  activityType: string;
  onChoiceSelect?: (choiceId: string) => void;
  onResponseComplete?: (choiceId: string, response: string) => void;
}

const InteractiveChoices = ({ 
  title, 
  description, 
  choices, 
  activityType,
  onChoiceSelect,
  onResponseComplete 
}: InteractiveChoicesProps) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [userResponse, setUserResponse] = useState("");
  const [isResponseComplete, setIsResponseComplete] = useState(false);

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setUserResponse("");
    setIsResponseComplete(false);
    onChoiceSelect?.(choice.id);
  };

  const handleResponseSubmit = () => {
    if (selectedChoice && userResponse.trim()) {
      setIsResponseComplete(true);
      onResponseComplete?.(selectedChoice.id, userResponse);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emotion': return 'healing';
      case 'memory': return 'earth';
      case 'activity': return 'nature';
      case 'creative': return 'calm';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant={getTypeColor(activityType) as any} className="mb-3">
          <Sparkles className="w-3 h-3 mr-1" />
          Interactive Choice
        </Badge>
        <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {choices.map((choice) => (
          <Button
            key={choice.id}
            variant={selectedChoice?.id === choice.id ? getTypeColor(activityType) as any : "outline"}
            className="h-auto p-4 flex flex-col items-center justify-center space-y-3 hover:shadow-gentle transition-all duration-300"
            onClick={() => handleChoiceSelect(choice)}
          >
            <span className="text-3xl">{choice.emoji}</span>
            <div className="text-center">
              <div className="font-medium text-sm">{choice.title}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {choice.description}
              </div>
            </div>
          </Button>
        ))}
      </div>

      {selectedChoice && (
        <Card className="shadow-gentle border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-accent-foreground mb-1">
                  Great Choice! Your Guide Says:
                </h4>
                <p className="text-sm text-accent-foreground/80">
                  {selectedChoice.guidance}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-accent-foreground mb-2 block">
                  {selectedChoice.followUp}
                </label>
                <Textarea
                  placeholder="Take your time... you can write, draw, or ask a grown-up to help you..."
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  className="min-h-24 border-accent/30 focus:border-accent/50"
                />
              </div>

              {userResponse.trim() && !isResponseComplete && (
                <Button
                  variant={getTypeColor(activityType) as any}
                  size="sm"
                  onClick={handleResponseSubmit}
                  className="w-full"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Share My Response
                </Button>
              )}

              {isResponseComplete && (
                <div className="p-3 bg-healing/20 rounded-lg border border-healing/30">
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-healing mt-0.5 flex-shrink-0 fill-current" />
                    <div>
                      <p className="text-sm text-healing font-medium mb-1">
                        Beautiful sharing! 🌟
                      </p>
                      <p className="text-sm text-healing/80">
                        Your thoughts and feelings are important. Thank you for sharing them with us. 
                        You're doing such a good job expressing yourself! 💝
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveChoices;