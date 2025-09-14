import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, PlayCircle, Calendar, BookOpen, MessageSquare } from "lucide-react";
import ActivityGuides from "./ActivityGuides";
import UniversalActivityResponse from "./UniversalActivityResponse";
import { PersonalizedRetreat } from "@/types/retreat";
import { usePersonalizedRetreat } from "@/hooks/usePersonalizedRetreat";

interface DailyProgramProps {
  retreat: PersonalizedRetreat;
}

const DailyProgram = ({ retreat }: DailyProgramProps) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedActivityForResponse, setSelectedActivityForResponse] = useState<any | null>(null);
  const { progress, completeActivity } = usePersonalizedRetreat();

  // If an activity is selected, show the guide
  if (selectedActivity) {
    return (
      <ActivityGuides 
        selectedActivity={selectedActivity} 
        onBack={() => setSelectedActivity(null)} 
      />
    );
  }

  // If an activity is selected for response, show the response form
  if (selectedActivityForResponse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setSelectedActivityForResponse(null)}
          >
            ← Back to Program
          </Button>
          <h2 className="text-lg font-semibold">Activity Response</h2>
        </div>
        
        <UniversalActivityResponse
          activityId={selectedActivityForResponse.id}
          activityName={selectedActivityForResponse.activity}
          activityType={selectedActivityForResponse.type}
          userRetreatId={progress?.retreatId || ''}
          dayNumber={selectedDay}
          onSave={() => {
            completeActivity(selectedActivityForResponse.id);
            setSelectedActivityForResponse(null);
          }}
        />
      </div>
    );
  }

  // Use retreat days data
  const currentProgram = retreat.baseRetreat.days.find(day => day.day === selectedDay) || retreat.baseRetreat.days[0];

  const getTypeColor = (type: string) => {
    const colors = {
      mindfulness: "healing",
      reflection: "nature", 
      nutrition: "calm",
      movement: "earth",
      healing: "healing",
      creative: "nature",
      nature: "calm"
    };
    return colors[type as keyof typeof colors] || "secondary";
  };

  const toggleActivity = (activityId: string) => {
    completeActivity(activityId);
  };

  const totalActivities = [...currentProgram.morning, ...currentProgram.afternoon, ...currentProgram.evening].length;
  const completedCount = [...currentProgram.morning, ...currentProgram.afternoon, ...currentProgram.evening]
    .filter(activity => progress?.completedActivities.has(activity.id) || false).length;
  const progressPercentage = (completedCount / totalActivities) * 100;

  const renderTimeBlock = (title: string, activities: any[], icon: any) => {
    const Icon = icon;
    return (
      <Card className="shadow-gentle">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className="w-5 h-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const isCompleted = progress?.completedActivities.has(activity.id) || false;
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    isCompleted ? 'bg-healing/10 border-healing/20' : 'bg-card hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleActivity(activity.id)}
                      className="h-8 w-8 p-0"
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-healing" />
                      ) : (
                        <PlayCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-muted-foreground">{activity.time}</span>
                        <Badge variant="secondary" className={`text-xs bg-${getTypeColor(activity.type)}/10 text-${getTypeColor(activity.type)}`}>
                          {activity.type}
                        </Badge>
                      </div>
                      <p className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        {activity.activity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{activity.duration}</span>
                      </div>
                      <div className="flex gap-2">
                        {activity.guideId && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedActivity(activity.guideId)}
                            className="h-8"
                          >
                            <BookOpen className="w-4 h-4 mr-1" />
                            Guide
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedActivityForResponse(activity)}
                          className="h-8"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Respond
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Day Selection */}
      <Card className="shadow-nurturing">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            14-Day Healing Program
          </CardTitle>
          <CardDescription>
            Select a day to view the structured activities and exercises. Click "Guide" for detailed instructions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {retreat.baseRetreat.days.map((day) => (
              <Button
                key={day.day}
                variant={selectedDay === day.day ? "healing" : "outline"}
                className="h-12 font-medium"
                onClick={() => setSelectedDay(day.day)}
              >
                Day {day.day}
              </Button>
            ))}
          </div>
          
          {/* Current Day Info */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Day {selectedDay}: {currentProgram.theme}
            </h3>
            <p className="text-muted-foreground mb-4">{currentProgram.focus}</p>
            
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Daily Progress</span>
                  <span>{completedCount}/{totalActivities} completed</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Schedule */}
      <div className="grid gap-6">
        {renderTimeBlock("Morning Routine", currentProgram.morning, PlayCircle)}
        {renderTimeBlock("Afternoon Activities", currentProgram.afternoon, PlayCircle)}
        {renderTimeBlock("Evening Wind-Down", currentProgram.evening, PlayCircle)}
      </div>

      {/* Note */}
      <Card className="border-calm/20 bg-calm/5">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Remember:</strong> This schedule is flexible. Listen to your body and adjust timing as needed. 
            The goal is progress, not perfection. Be gentle with yourself as you heal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyProgram;