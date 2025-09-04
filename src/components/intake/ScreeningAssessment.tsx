import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { screeningTools } from '@/data/screeningTools';
import { ScreeningResult, ScreeningSession } from '@/types/screening';

interface ScreeningAssessmentProps {
  toolIds: string[];
  onComplete: (session: ScreeningSession) => void;
  onBack?: () => void;
}

export function ScreeningAssessment({ toolIds, onComplete, onBack }: ScreeningAssessmentProps) {
  const [currentToolIndex, setCurrentToolIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, Record<string, number>>>({});
  const [results, setResults] = useState<ScreeningResult[]>([]);

  const currentTool = screeningTools[toolIds[currentToolIndex]];
  const currentQuestion = currentTool?.questions[currentQuestionIndex];
  const progress = ((currentToolIndex * 100 + (currentQuestionIndex / currentTool?.questions.length) * 100) / toolIds.length);

  const handleResponse = (value: number) => {
    const toolId = currentTool.id;
    const questionId = currentQuestion.id;
    
    setResponses(prev => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        [questionId]: value
      }
    }));
  };

  const calculateScore = (toolId: string): ScreeningResult => {
    const tool = screeningTools[toolId];
    const toolResponses = responses[toolId] || {};
    
    let score = 0;
    switch (tool.scoring.method) {
      case 'sum':
        score = Object.values(toolResponses).reduce((sum, value) => sum + value, 0);
        break;
      // Add other scoring methods as needed
    }

    // Find interpretation
    const interpretation = tool.interpretation.find(
      interp => score >= interp.range[0] && score <= interp.range[1]
    ) || tool.interpretation[0];

    // Check for crisis flags (PHQ-9 item 9 for suicidal ideation)
    const riskFlags: string[] = [];
    if (toolId === 'PHQ-9' && toolResponses['phq_9'] && toolResponses['phq_9'] > 0) {
      riskFlags.push('suicidal_ideation');
    }

    return {
      toolId,
      score,
      level: interpretation.level,
      interpretation: interpretation.description,
      recommendations: interpretation.recommendations,
      riskFlags,
      completedAt: new Date()
    };
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentTool.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentToolIndex < toolIds.length - 1) {
      // Complete current tool
      const result = calculateScore(currentTool.id);
      setResults(prev => [...prev, result]);
      
      // Move to next tool
      setCurrentToolIndex(currentToolIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Complete final tool and finish assessment
      const finalResult = calculateScore(currentTool.id);
      const allResults = [...results, finalResult];
      
      // Calculate overall risk level
      const highRiskCount = allResults.filter(r => r.level === 'high' || r.level === 'severe').length;
      const moderateRiskCount = allResults.filter(r => r.level === 'moderate').length;
      const crisisFlags = allResults.some(r => r.riskFlags.length > 0);
      
      const overallRiskLevel = highRiskCount > 0 ? 'high' : moderateRiskCount > 0 ? 'moderate' : 'low';
      
      const session: ScreeningSession = {
        id: `session_${Date.now()}`,
        tools: allResults,
        overallRiskLevel,
        crisisFlags,
        recommendations: allResults.flatMap(r => r.recommendations),
        referrals: [], // Would be populated based on results
        completedAt: new Date()
      };
      
      onComplete(session);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentToolIndex > 0) {
      setCurrentToolIndex(currentToolIndex - 1);
      setCurrentQuestionIndex(screeningTools[toolIds[currentToolIndex - 1]].questions.length - 1);
    }
  };

  const getCurrentResponse = () => {
    return responses[currentTool?.id]?.[currentQuestion?.id];
  };

  const canProceed = getCurrentResponse() !== undefined;

  if (!currentTool || !currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{currentTool.name}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Tool Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              {currentTool.acronym}
            </CardTitle>
            <Badge variant="outline">
              Question {currentQuestionIndex + 1} of {currentTool.questions.length}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{currentTool.description}</p>
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
            
            <RadioGroup
              value={getCurrentResponse()?.toString()}
              onValueChange={(value) => handleResponse(parseInt(value))}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={currentToolIndex === 0 && currentQuestionIndex === 0 ? onBack : handlePrevious}
              disabled={currentToolIndex === 0 && currentQuestionIndex === 0 && !onBack}
            >
              {currentToolIndex === 0 && currentQuestionIndex === 0 ? 'Back' : 'Previous'}
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed}
            >
              {currentToolIndex === toolIds.length - 1 && currentQuestionIndex === currentTool.questions.length - 1
                ? 'Complete Assessment'
                : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Please answer honestly. This assessment helps us provide you with the most appropriate support and recommendations.
          All information is confidential and used solely for your care.
        </AlertDescription>
      </Alert>
    </div>
  );
}