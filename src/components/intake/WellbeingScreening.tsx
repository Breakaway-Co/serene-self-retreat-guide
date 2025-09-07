import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { WellbeingScreeningData, IntakeData } from "@/types/intake";

interface WellbeingScreeningProps {
  data: IntakeData;
  updateData: (section: keyof IntakeData, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const WellbeingScreening = ({ data, updateData, onNext, onPrevious }: WellbeingScreeningProps) => {
  const [screening, setScreening] = useState<WellbeingScreeningData>(data.wellbeingScreening || {});
  const [currentTool, setCurrentTool] = useState(0);

  const updateScreening = (field: keyof WellbeingScreeningData, value: any) => {
    const updated = { ...screening, [field]: value };
    setScreening(updated);
    updateData('wellbeingScreening', updated);
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

  const currentToolData = tools[currentTool];
  const currentResponses = screening[currentToolData.responseKey] as number[] || [];

  const updateResponse = (questionIndex: number, value: number) => {
    const updatedResponses = [...currentResponses];
    updatedResponses[questionIndex] = value;
    
    const score = updatedResponses.reduce((sum, response) => sum + (response || 0), 0);
    
    updateScreening(currentToolData.responseKey, updatedResponses);
    updateScreening(currentToolData.scoreKey, score);
  };

  const isCurrentToolComplete = currentResponses.length === currentToolData.questions.length && 
                               currentResponses.every(response => response !== undefined);

  const handleNextTool = () => {
    if (currentTool < tools.length - 1) {
      setCurrentTool(currentTool + 1);
    } else {
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

  return (
    <div className="space-y-6">
      {/* Tool Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Assessment Progress</span>
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
            <div key={index} className="space-y-3">
              <p className="font-medium text-sm">
                {index + 1}. {question}
              </p>
{currentTool === 0 ? (
                // PHQ-9 uses checkboxes for single selection per question
                <div className="space-y-2">
                  {responseOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`q${index}-${option.value}`}
                        checked={currentResponses[index] === option.value}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateResponse(index, option.value);
                          } else if (currentResponses[index] === option.value) {
                            // Allow unchecking by setting to undefined
                            const updatedResponses = [...currentResponses];
                            updatedResponses[index] = undefined;
                            updateScreening(currentToolData.responseKey, updatedResponses);
                            updateScreening(currentToolData.scoreKey, updatedResponses.reduce((sum, response) => sum + (response || 0), 0));
                          }
                        }}
                      />
                      <Label 
                        htmlFor={`q${index}-${option.value}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                // GAD-7 uses radio buttons for single selection
                <RadioGroup
                  value={currentResponses[index]?.toString() || ''}
                  onValueChange={(value) => updateResponse(index, parseInt(value))}
                >
                  {responseOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option.value.toString()} 
                        id={`q${index}-${option.value}`} 
                      />
                      <Label 
                        htmlFor={`q${index}-${option.value}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          ))}

          {/* Score Display */}
          {isCurrentToolComplete && (
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                  <p className="text-2xl font-bold">
                    {screening[currentToolData.scoreKey] as number || 0}
                  </p>
                  <p className={`text-sm font-medium ${getScoreInterpretation(currentToolData, screening[currentToolData.scoreKey] as number || 0).color}`}>
                    {getScoreInterpretation(currentToolData, screening[currentToolData.scoreKey] as number || 0).level}
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
          disabled={!isCurrentToolComplete}
          variant="healing"
        >
          {currentTool === tools.length - 1 ? "Continue" : "Next Tool"}
        </Button>
      </div>
    </div>
  );
};

export default WellbeingScreening;