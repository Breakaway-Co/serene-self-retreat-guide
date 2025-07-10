import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, PlayCircle, Calendar, BookOpen } from "lucide-react";
import ActivityGuides from "./ActivityGuides";

const DailyProgram = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  // If an activity is selected, show the guide
  if (selectedActivity) {
    return (
      <ActivityGuides 
        selectedActivity={selectedActivity} 
        onBack={() => setSelectedActivity(null)} 
      />
    );
  }

  const dailyPrograms = {
    1: {
      theme: "Foundation & Safety",
      focus: "Creating a safe space and establishing routines",
      morning: [
        { time: "7:00 AM", activity: "Gentle Wake-Up Breathing", duration: "10 min", type: "mindfulness", guideId: "gentle-wake-up-breathing" },
        { time: "7:15 AM", activity: "Gratitude Journaling", duration: "15 min", type: "reflection", guideId: "gratitude-journaling" },
        { time: "7:30 AM", activity: "Nutritious Breakfast Preparation", duration: "30 min", type: "nutrition" },
        { time: "8:00 AM", activity: "Morning Walk or Gentle Movement", duration: "20 min", type: "movement" }
      ],
      afternoon: [
        { time: "12:00 PM", activity: "Mindful Lunch Preparation", duration: "30 min", type: "nutrition" },
        { time: "1:00 PM", activity: "Trauma-Informed Body Scan", duration: "20 min", type: "healing", guideId: "trauma-informed-body-scan" },
        { time: "2:00 PM", activity: "Creative Expression (Art/Music)", duration: "30 min", type: "creative", guideId: "creative-expression" },
        { time: "3:00 PM", activity: "Nature Connection Activity", duration: "30 min", type: "nature", guideId: "grounding-exercises-outdoors" }
      ],
      evening: [
        { time: "6:00 PM", activity: "Wholesome Dinner Preparation", duration: "40 min", type: "nutrition" },
        { time: "7:30 PM", activity: "Emotional Check-In Journal", duration: "15 min", type: "reflection" },
        { time: "8:00 PM", activity: "Gentle Yoga or Stretching", duration: "20 min", type: "movement" },
        { time: "9:00 PM", activity: "Evening Meditation", duration: "15 min", type: "mindfulness" }
      ]
    },
    2: {
      theme: "Emotional Awareness",
      focus: "Identifying and understanding emotions safely",
      morning: [
        { time: "7:00 AM", activity: "Emotion Identification Breathing", duration: "10 min", type: "mindfulness" },
        { time: "7:15 AM", activity: "Feelings Check-In Journal", duration: "15 min", type: "reflection" },
        { time: "7:30 AM", activity: "Mood-Boosting Breakfast", duration: "30 min", type: "nutrition" },
        { time: "8:00 AM", activity: "Energizing Movement", duration: "25 min", type: "movement" }
      ],
      afternoon: [
        { time: "12:00 PM", activity: "Comfort Food Lunch", duration: "30 min", type: "nutrition" },
        { time: "1:00 PM", activity: "Progressive Muscle Relaxation", duration: "25 min", type: "healing", guideId: "progressive-muscle-relaxation" },
        { time: "2:00 PM", activity: "Emotion Regulation Techniques", duration: "30 min", type: "healing", guideId: "emotion-regulation-techniques" },
        { time: "3:00 PM", activity: "Grounding Exercises Outdoors", duration: "30 min", type: "nature", guideId: "grounding-exercises-outdoors" }
      ],
      evening: [
        { time: "6:00 PM", activity: "Nourishing Dinner Ritual", duration: "40 min", type: "nutrition" },
        { time: "7:30 PM", activity: "Daily Wins Celebration", duration: "15 min", type: "reflection" },
        { time: "8:00 PM", activity: "Tension Release Yoga", duration: "25 min", type: "movement" },
        { time: "9:00 PM", activity: "Loving-Kindness Meditation", duration: "20 min", type: "mindfulness" }
      ]
    }
    // Additional days would continue with themes like:
    // Day 3: Stress Management, Day 4: Anxiety Relief, Day 5: Depression Support
    // Day 6: Trauma Processing, Day 7: Addiction Understanding, etc.
  };

  const currentProgram = dailyPrograms[selectedDay as keyof typeof dailyPrograms] || dailyPrograms[1];

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
    const newCompleted = new Set(completedActivities);
    if (newCompleted.has(activityId)) {
      newCompleted.delete(activityId);
    } else {
      newCompleted.add(activityId);
    }
    setCompletedActivities(newCompleted);
  };

  const totalActivities = [...currentProgram.morning, ...currentProgram.afternoon, ...currentProgram.evening].length;
  const completedCount = [...currentProgram.morning, ...currentProgram.afternoon, ...currentProgram.evening]
    .filter(activity => completedActivities.has(`${selectedDay}-${activity.activity}`)).length;
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
              const activityId = `${selectedDay}-${activity.activity}`;
              const isCompleted = completedActivities.has(activityId);
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
                      onClick={() => toggleActivity(activityId)}
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
            {[...Array(14)].map((_, i) => {
              const day = i + 1;
              return (
                <Button
                  key={day}
                  variant={selectedDay === day ? "healing" : "outline"}
                  className="h-12 font-medium"
                  onClick={() => setSelectedDay(day)}
                >
                  Day {day}
                </Button>
              );
            })}
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