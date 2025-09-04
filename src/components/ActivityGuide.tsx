import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Lightbulb, ArrowRight, Star, Volume2 } from "lucide-react";
import AudioGuidance from "./AudioGuidance";

interface GuideMessage {
  type: 'instruction' | 'encouragement' | 'tip' | 'check-in';
  content: string;
  icon?: string;
}

interface ActivityGuideProps {
  title: string;
  activityType: string;
  introduction: string;
  guideMessages: GuideMessage[];
  audioInstructions?: string[];
  children?: React.ReactNode;
  onGuideComplete?: () => void;
}

const ActivityGuide = ({ 
  title, 
  activityType, 
  introduction, 
  guideMessages, 
  audioInstructions,
  children,
  onGuideComplete 
}: ActivityGuideProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isGuideComplete, setIsGuideComplete] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  const handleNextMessage = () => {
    if (currentMessageIndex < guideMessages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      setIsGuideComplete(true);
      onGuideComplete?.();
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'builder': return 'calm';
      case 'spinner': return 'nature';
      case 'audio_rest': return 'healing';
      case 'memory': return 'earth';
      case 'craft': return 'calm';
      case 'kitchen': return 'nature';
      case 'feelings': return 'healing';
      case 'ritual': return 'earth';
      default: return 'secondary';
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'instruction':
        return <MessageCircle className="w-4 h-4" />;
      case 'encouragement':
        return <Heart className="w-4 h-4" />;
      case 'tip':
        return <Lightbulb className="w-4 h-4" />;
      case 'check-in':
        return <Star className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'instruction':
        return 'text-accent-foreground bg-accent/20 border-accent/30';
      case 'encouragement':
        return 'text-healing bg-healing/20 border-healing/30';
      case 'tip':
        return 'text-nature bg-nature/20 border-nature/30';
      case 'check-in':
        return 'text-earth bg-earth/20 border-earth/30';
      default:
        return 'text-muted-foreground bg-muted/20 border-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-nurturing">
        <CardHeader className="text-center">
          <Badge variant={getTypeColor(activityType) as any} className="mx-auto mb-3">
            Your Personal Guide
          </Badge>
          <CardTitle className="text-xl text-healing">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {introduction}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Guide Messages */}
      <Card className="shadow-gentle">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-healing text-healing-foreground flex items-center justify-center text-sm font-medium">
                🌟
              </div>
              <span className="text-sm font-medium text-healing">Your Guide</span>
            </div>
            
            {audioInstructions && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAudio(!showAudio)}
                className="border-healing/30 text-healing hover:bg-healing/10"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                {showAudio ? 'Hide' : 'Play'} Audio
              </Button>
            )}
          </div>

          {showAudio && audioInstructions && (
            <div className="mb-4">
              <AudioGuidance
                activityType={activityType}
                instructions={audioInstructions}
              />
            </div>
          )}

          {guideMessages.slice(0, currentMessageIndex + 1).map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getMessageColor(message.type)} transition-all duration-500 ${
                index === currentMessageIndex ? 'animate-in slide-in-from-left-5' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {getMessageIcon(message.type)}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">
                    {message.icon && <span className="mr-2">{message.icon}</span>}
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {!isGuideComplete && (
            <div className="text-center pt-4">
              <Button
                variant={getTypeColor(activityType) as any}
                onClick={handleNextMessage}
                className="min-w-[120px]"
              >
                {currentMessageIndex < guideMessages.length - 1 ? (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Start Activity
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Content */}
      {isGuideComplete && children && (
        <div className="animate-in slide-in-from-bottom-5 duration-500">
          {children}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="flex justify-center space-x-2">
        {guideMessages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index <= currentMessageIndex 
                ? 'bg-healing' 
                : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityGuide;