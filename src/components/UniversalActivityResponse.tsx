import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, CheckCircle, FileText, Scale, List, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResponseQuestion {
  id: string;
  question: string;
  type: 'text' | 'scale' | 'multiple_choice' | 'checklist' | 'reflection';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabel?: string;
  placeholder?: string;
  required?: boolean;
}

interface UniversalActivityResponseProps {
  activityId: string;
  activityName: string;
  activityType: string;
  userRetreatId: string;
  dayNumber: number;
  onSave?: (responses: Record<string, any>) => void;
}

const UniversalActivityResponse: React.FC<UniversalActivityResponseProps> = ({
  activityId,
  activityName,
  activityType,
  userRetreatId,
  dayNumber,
  onSave
}) => {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Define questions based on activity type
  const getQuestionsForActivityType = (type: string): ResponseQuestion[] => {
    const baseReflection = {
      id: 'completion_reflection',
      question: 'How was this activity for you? What did you notice or learn?',
      type: 'text' as const,
      placeholder: 'Share your thoughts and observations...',
      required: true
    };

    const difficultyRating = {
      id: 'difficulty_rating',
      question: 'How challenging was this activity?',
      type: 'scale' as const,
      scaleMin: 1,
      scaleMax: 10,
      scaleLabel: '1 = Very Easy, 10 = Very Challenging',
      required: true
    };

    const benefitRating = {
      id: 'benefit_rating',
      question: 'How beneficial did you find this activity?',
      type: 'scale' as const,
      scaleMin: 1,
      scaleMax: 10,
      scaleLabel: '1 = Not helpful, 10 = Very helpful',
      required: true
    };

    switch (type) {
      case 'mindfulness':
        return [
          {
            id: 'mindfulness_focus',
            question: 'How was your ability to stay focused during this practice?',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Very distracted, 10 = Very focused',
            required: true
          },
          {
            id: 'body_sensations',
            question: 'What physical sensations did you notice?',
            type: 'checklist',
            options: ['Relaxation', 'Tension release', 'Warmth', 'Tingling', 'Lightness', 'Heaviness', 'Energy', 'Calmness'],
            required: false
          },
          baseReflection,
          benefitRating
        ];

      case 'reflection':
        return [
          {
            id: 'key_insights',
            question: 'What key insights or realizations emerged during this reflection?',
            type: 'text',
            placeholder: 'Describe any new awareness or understanding...',
            required: true
          },
          {
            id: 'emotional_response',
            question: 'What emotions came up during this reflection?',
            type: 'checklist',
            options: ['Peace', 'Gratitude', 'Clarity', 'Sadness', 'Joy', 'Anxiety', 'Hope', 'Relief', 'Anger', 'Acceptance'],
            required: false
          },
          baseReflection,
          benefitRating
        ];

      case 'movement':
        return [
          {
            id: 'energy_level_before',
            question: 'Energy level before movement',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Very low energy, 10 = Very high energy',
            required: true
          },
          {
            id: 'energy_level_after',
            question: 'Energy level after movement',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Very low energy, 10 = Very high energy',
            required: true
          },
          {
            id: 'body_feedback',
            question: 'How did your body respond to the movement?',
            type: 'checklist',
            options: ['Felt energized', 'Felt relaxed', 'Noticed tension release', 'Felt stronger', 'Felt more flexible', 'Felt pain/discomfort', 'Felt joy', 'Felt accomplished'],
            required: false
          },
          baseReflection,
          benefitRating
        ];

      case 'nutrition':
        return [
          {
            id: 'meal_enjoyment',
            question: 'How much did you enjoy preparing/eating this meal?',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Not enjoyable, 10 = Very enjoyable',
            required: true
          },
          {
            id: 'mindful_eating',
            question: 'How mindfully were you able to eat?',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Very distracted, 10 = Very mindful',
            required: true
          },
          {
            id: 'nutritional_awareness',
            question: 'What did you notice about the food and its effects on your body?',
            type: 'text',
            placeholder: 'Describe flavors, textures, how it made you feel...',
            required: false
          },
          baseReflection,
          benefitRating
        ];

      case 'healing':
      case 'therapy':
        return [
          {
            id: 'emotional_state_before',
            question: 'Emotional state before this practice',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Very difficult, 10 = Very peaceful',
            required: true
          },
          {
            id: 'emotional_state_after',
            question: 'Emotional state after this practice',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Very difficult, 10 = Very peaceful',
            required: true
          },
          {
            id: 'coping_strategies',
            question: 'Which coping strategies felt most helpful?',
            type: 'checklist',
            options: ['Breathing techniques', 'Positive self-talk', 'Grounding exercises', 'Progressive relaxation', 'Visualization', 'Boundary setting', 'Self-compassion'],
            required: false
          },
          baseReflection,
          benefitRating
        ];

      case 'nature':
        return [
          {
            id: 'nature_connection',
            question: 'How connected did you feel to nature during this activity?',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Not connected, 10 = Very connected',
            required: true
          },
          {
            id: 'nature_observations',
            question: 'What did you notice in nature during this time?',
            type: 'text',
            placeholder: 'Describe what you saw, heard, felt, or smelled...',
            required: false
          },
          baseReflection,
          benefitRating
        ];

      case 'creative':
        return [
          {
            id: 'creative_flow',
            question: 'How easily did creative expression flow for you?',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Very blocked, 10 = Very free-flowing',
            required: true
          },
          {
            id: 'creative_emotions',
            question: 'What emotions emerged through your creative expression?',
            type: 'checklist',
            options: ['Joy', 'Freedom', 'Sadness', 'Anger', 'Peace', 'Excitement', 'Frustration', 'Surprise', 'Pride', 'Release'],
            required: false
          },
          baseReflection,
          benefitRating
        ];

      case 'somatic':
        return [
          {
            id: 'body_awareness',
            question: 'How aware of your body did you feel during this practice?',
            type: 'scale',
            scaleMin: 1,
            scaleMax: 10,
            scaleLabel: '1 = Very disconnected, 10 = Very aware',
            required: true
          },
          {
            id: 'somatic_sensations',
            question: 'What sensations did you notice in your body?',
            type: 'checklist',
            options: ['Tingling', 'Warmth', 'Coolness', 'Vibration', 'Expansion', 'Contraction', 'Flow', 'Stillness', 'Tension release', 'Energy movement'],
            required: false
          },
          baseReflection,
          benefitRating
        ];

      default:
        return [
          difficultyRating,
          baseReflection,
          benefitRating
        ];
    }
  };

  const questions = getQuestionsForActivityType(activityType);

  // Load existing responses
  useEffect(() => {
    const loadResponses = async () => {
      try {
        const { data, error } = await supabase
          .from('activity_responses')
          .select('response_data')
          .eq('user_retreat_id', userRetreatId)
          .eq('activity_id', activityId)
          .eq('day_number', dayNumber)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading responses:', error);
          return;
        }

        if (data) {
          setResponses(data.response_data as Record<string, any> || {});
          setIsSaved(true);
        }
      } catch (error) {
        console.error('Error loading responses:', error);
      }
    };

    loadResponses();
  }, [userRetreatId, activityId, dayNumber]);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('activity_responses')
        .upsert({
          user_retreat_id: userRetreatId,
          activity_id: activityId,
          day_number: dayNumber,
          response_type: activityType,
          response_data: responses
        });

      if (error) throw error;

      setIsSaved(true);
      onSave?.(responses);
      
      toast({
        title: "Responses saved!",
        description: "Your activity responses have been recorded.",
      });
    } catch (error) {
      console.error('Error saving responses:', error);
      toast({
        title: "Error saving responses",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    setIsSaved(false);
  };

  const renderQuestion = (question: ResponseQuestion) => {
    const value = responses[question.id];

    switch (question.type) {
      case 'text':
        return (
          <div key={question.id} className="space-y-2">
            <Label className="text-sm font-medium">{question.question}</Label>
            <Textarea
              placeholder={question.placeholder}
              value={value || ''}
              onChange={(e) => updateResponse(question.id, e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        );

      case 'scale':
        return (
          <div key={question.id} className="space-y-3">
            <Label className="text-sm font-medium">{question.question}</Label>
            <div className="space-y-2">
              <Slider
                value={[value || question.scaleMin || 1]}
                onValueChange={(newValue) => updateResponse(question.id, newValue[0])}
                min={question.scaleMin || 1}
                max={question.scaleMax || 10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{question.scaleMin || 1}</span>
                <span className="font-medium">Current: {value || question.scaleMin || 1}</span>
                <span>{question.scaleMax || 10}</span>
              </div>
              {question.scaleLabel && (
                <p className="text-xs text-muted-foreground">{question.scaleLabel}</p>
              )}
            </div>
          </div>
        );

      case 'multiple_choice':
        return (
          <div key={question.id} className="space-y-3">
            <Label className="text-sm font-medium">{question.question}</Label>
            <RadioGroup
              value={value || ''}
              onValueChange={(newValue) => updateResponse(question.id, newValue)}
            >
              {question.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                  <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'checklist':
        return (
          <div key={question.id} className="space-y-3">
            <Label className="text-sm font-medium">{question.question}</Label>
            <div className="grid grid-cols-2 gap-2">
              {question.options?.map((option) => {
                const isChecked = (value || []).includes(option);
                return (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option}`}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const currentValues = value || [];
                        if (checked) {
                          updateResponse(question.id, [...currentValues, option]);
                        } else {
                          updateResponse(question.id, currentValues.filter((v: string) => v !== option));
                        }
                      }}
                    />
                    <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                      {option}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getIcon = () => {
    switch (activityType) {
      case 'mindfulness': return <MessageSquare className="w-5 h-5" />;
      case 'reflection': return <FileText className="w-5 h-5" />;
      case 'movement': return <Scale className="w-5 h-5" />;
      default: return <List className="w-5 h-5" />;
    }
  };

  const isComplete = questions.filter(q => q.required).every(q => {
    const value = responses[q.id];
    return value !== undefined && value !== '' && value !== null;
  });

  return (
    <Card className="shadow-gentle">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          Activity Response: {activityName}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{activityType}</Badge>
          {isSaved && (
            <Badge variant="default" className="bg-healing/10 text-healing border-healing/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Saved
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map(renderQuestion)}
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {questions.filter(q => q.required && responses[q.id]).length} / {questions.filter(q => q.required).length} required responses completed
          </div>
          <Button 
            onClick={handleSave}
            disabled={!isComplete || isLoading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save Responses'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalActivityResponse;