import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { WellbeingScreeningData, IntakeData } from "@/types/intake";
import { useProgressPersistence } from "@/hooks/useProgressPersistence";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, Wifi, WifiOff, Save } from "lucide-react";

interface WellbeingScreeningProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const WellbeingScreening = ({ data, updateData, onNext, onPrevious }: WellbeingScreeningProps) => {
  const { user } = useAuth();
  const [screening, setScreening] = useState<WellbeingScreeningData>(data.wellbeingScreening || {});
  const [currentTool, setCurrentTool] = useState(0);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Progress persistence hook
  const { progressState, updateProgress, isLoading, isSaving, isOnline } = useProgressPersistence({
    section: 'wellbeing_screening',
    debounceMs: 500,
    enableOfflineCache: true,
  });

  const updateScreening = (field: keyof WellbeingScreeningData, value: any) => {
    const updated = { ...screening, [field]: value };
    setScreening(updated);
    updateData('wellbeingScreening', updated);
    
    // Auto-save progress if user is authenticated
    if (user) {
      updateProgress({
        progressData: { ...progressState.progressData, [field]: value },
        currentStep: getCurrentOverallStep(),
        totalSteps: getTotalSteps(),
      });
    }
  };

  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself"
  ];

  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ];

  const responseOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const tools = [
    {
      name: "PHQ-9 (Depression Screening)",
      description: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
      questions: phq9Questions,
      responseKey: 'phq9Responses' as keyof WellbeingScreeningData,
      scoreKey: 'phq9Score' as keyof WellbeingScreeningData
    },
    {
      name: "GAD-7 (Anxiety Screening)",
      description: "Over the last 2 weeks, how often have you been bothered by the following problems?",
      questions: gad7Questions,
      responseKey: 'gad7Responses' as keyof WellbeingScreeningData,
      scoreKey: 'gad7Score' as keyof WellbeingScreeningData
    }
  ];

  // Helper functions for progress tracking
  const getCurrentOverallStep = () => {
    const currentResponses = screening[tools[currentTool].responseKey] as number[] || [];
    const answeredInCurrentTool = currentResponses.filter(r => r !== undefined).length;
    const previousToolsQuestions = tools.slice(0, currentTool).reduce((sum, tool) => sum + tool.questions.length, 0);
    return previousToolsQuestions + answeredInCurrentTool;
  };

  const getTotalSteps = () => {
    return tools.reduce((sum, tool) => sum + tool.questions.length, 0);
  };

  const getFirstIncompleteQuestion = () => {
    for (let toolIndex = 0; toolIndex < tools.length; toolIndex++) {
      const responses = screening[tools[toolIndex].responseKey] as number[] || [];
      for (let questionIndex = 0; questionIndex < tools[toolIndex].questions.length; questionIndex++) {
        if (responses[questionIndex] === undefined) {
          return { toolIndex, questionIndex };
        }
      }
    }
    return null;
  };

  const currentToolData = tools[currentTool];
  const currentResponses = screening[currentToolData.responseKey] as number[] || [];

  // Restore progress on component mount (only once)
  useEffect(() => {
    if (!isLoading && user && progressState.progressData) {
      // Restore screening data from progress
      const restoredScreening = { ...screening };
      Object.keys(progressState.progressData).forEach(key => {
        if (key in restoredScreening) {
          (restoredScreening as any)[key] = progressState.progressData[key];
        }
      });
      setScreening(restoredScreening);
      updateData('wellbeingScreening', restoredScreening);

      // Navigate to the last incomplete question, but don't scroll
      const incomplete = getFirstIncompleteQuestion();
      if (incomplete) {
        setCurrentTool(incomplete.toolIndex);
      }
    }
  }, [isLoading, user]);

  // Scroll to specific question
  const scrollToQuestion = (questionIndex: number) => {
    const questionRef = questionRefs.current[questionIndex];
    if (questionRef) {
      questionRef.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      // Focus the first radio button for accessibility
      const firstRadio = questionRef.querySelector('input[type="radio"]') as HTMLInputElement;
      if (firstRadio) {
        firstRadio.focus();
      }
    }
  };

  const updateResponse = (questionIndex: number, value: number) => {
    const updatedResponses = [...currentResponses];
    updatedResponses[questionIndex] = value;
    
    const score = updatedResponses.reduce((sum, response) => sum + (response || 0), 0);
    
    updateScreening(currentToolData.responseKey, updatedResponses);
    updateScreening(currentToolData.scoreKey, score);
    
    // Check if all questions are answered, if so enable Next Tool button
    const allAnswered = updatedResponses.length === currentToolData.questions.length && 
                        updatedResponses.every(response => response !== undefined);
    
    // If this was the last question, show completion feedback
    if (allAnswered && questionIndex === currentToolData.questions.length - 1) {
      // Optional: Could add a subtle scroll to show the score card
      setTimeout(() => {
        const scoreCard = document.querySelector('[data-score-card="true"]');
        if (scoreCard) {
          scoreCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  const isCurrentToolComplete = currentResponses.length === currentToolData.questions.length && 
                               currentResponses.every(response => response !== undefined);

  const handleNextTool = () => {
    // Auto-save current progress before moving to next tool
    if (user) {
      updateProgress({
        progressData: screening,
        currentStep: getCurrentOverallStep(),
        totalSteps: getTotalSteps(),
      });
    }
    
    if (currentTool < tools.length - 1) {
      // Move to next tool and scroll to top of the card
      setCurrentTool(currentTool + 1);
      // Smooth scroll to top of the assessment area
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Mark as completed in progress
      if (user) {
        updateProgress({
          isCompleted: true,
          currentStep: getTotalSteps(),
        });
      }
      onNext();
    }
  };

  const handlePreviousTool = () => {
    if (currentTool > 0) {
      setCurrentTool(currentTool - 1);
    } else {
      onPrevious();
    }
  };

  const getScoreInterpretation = (tool: typeof currentToolData, score: number) => {
    if (tool.scoreKey === 'phq9Score') {
      if (score <= 4) return { level: "Minimal", color: "text-green-600" };
      if (score <= 9) return { level: "Mild", color: "text-yellow-600" };
      if (score <= 14) return { level: "Moderate", color: "text-orange-600" };
      if (score <= 19) return { level: "Moderately Severe", color: "text-red-600" };
      return { level: "Severe", color: "text-red-800" };
    } else if (tool.scoreKey === 'gad7Score') {
      if (score <= 4) return { level: "Minimal", color: "text-green-600" };
      if (score <= 9) return { level: "Mild", color: "text-yellow-600" };
      if (score <= 14) return { level: "Moderate", color: "text-orange-600" };
      return { level: "Severe", color: "text-red-600" };
    }
    return { level: "Unknown", color: "text-gray-600" };
  };

  const toolProgress = ((currentTool + 1) / tools.length) * 100;
  const questionProgress = (currentResponses.filter(r => r !== undefined).length / currentToolData.questions.length) * 100;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-muted-foreground">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status and Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Assessment Progress</span>
              {user && (
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <Wifi className="h-4 w-4 text-green-600" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-orange-600" />
                  )}
                  {isSaving && <Save className="h-4 w-4 text-blue-600 animate-pulse" />}
                  {progressState.lastSavedAt && !isSaving && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Saved
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              Tool {currentTool + 1} of {tools.length}
            </span>
          </div>
          <Progress value={toolProgress} className="mb-4" />
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{currentToolData.name}</span>
            <span className="text-sm text-muted-foreground">
              {currentResponses.filter(r => r !== undefined).length} of {currentToolData.questions.length} questions
            </span>
          </div>
          <Progress value={questionProgress} />
        </CardContent>
      </Card>

      {/* Current Tool */}
      <Card>
        <CardHeader>
          <CardTitle>{currentToolData.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{currentToolData.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentToolData.questions.map((question, index) => (
            <div 
              key={index} 
              className="space-y-3 p-4 rounded-lg border border-border/50 bg-background/50"
              ref={(el) => (questionRefs.current[index] = el)}
            >
              <p className="font-medium text-sm" id={`question-${currentTool}-${index}`}>
                {index + 1}. {question}
              </p>
              {/* Both PHQ-9 and GAD-7 use radio buttons for single selection per question */}
              <RadioGroup
                value={currentResponses[index] !== undefined ? currentResponses[index].toString() : undefined}
                onValueChange={(value) => updateResponse(index, parseInt(value))}
                className="space-y-2"
                aria-labelledby={`question-${currentTool}-${index}`}
                aria-required="true"
              >
                {responseOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.value.toString()} 
                      id={`q${currentTool}-${index}-${option.value}`}
                    />
                    <Label 
                      htmlFor={`q${currentTool}-${index}-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}

          {/* Score Display */}
          {isCurrentToolComplete && (
            <Card className="bg-muted/50" data-score-card="true">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                  <p className="text-2xl font-bold">
                    {screening[currentToolData.scoreKey] as number || 0}
                  </p>
                  <p className={`text-sm font-medium ${getScoreInterpretation(currentToolData, screening[currentToolData.scoreKey] as number || 0).color}`}>
                    {getScoreInterpretation(currentToolData, screening[currentToolData.scoreKey] as number || 0).level}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    ✓ Assessment complete. Click "{currentTool === tools.length - 1 ? 'Continue' : 'Next Tool'}" below to proceed.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handlePreviousTool}>
          {currentTool === 0 ? "Previous" : "Previous Tool"}
        </Button>
        <Button 
          onClick={handleNextTool}
          variant="healing"
          disabled={!isCurrentToolComplete}
        >
          {currentTool === tools.length - 1 ? "Continue" : "Next Tool"}
        </Button>
      </div>
    </div>
  );
};

export default WellbeingScreening;