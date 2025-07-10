import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Heart, Calendar, Trophy, BookOpen, TrendingUp } from "lucide-react";

const Progress = () => {
  const [moodRating, setMoodRating] = useState(5);
  const [journalEntry, setJournalEntry] = useState("");
  const [dailyReflections, setDailyReflections] = useState({
    wins: "",
    challenges: "",
    gratitude: "",
    tomorrow: ""
  });

  const weeklyStats = {
    weeklyProgress: 65,
    activitiesCompleted: 28,
    totalActivities: 42,
    averageMood: 6.2,
    streakDays: 5
  };

  const moodData = [
    { day: "Mon", mood: 6 },
    { day: "Tue", mood: 5 },
    { day: "Wed", mood: 7 },
    { day: "Thu", mood: 6 },
    { day: "Fri", mood: 8 },
    { day: "Sat", mood: 7 },
    { day: "Sun", mood: 6 }
  ];

  const milestones = [
    { title: "First Day Complete", description: "Started your healing journey", completed: true, day: 1 },
    { title: "Week One Milestone", description: "Completed 7 days of self-care", completed: true, day: 7 },
    { title: "Halfway Point", description: "Reached the middle of your retreat", completed: false, day: 7 },
    { title: "Final Week", description: "Entering the final stretch", completed: false, day: 8 },
    { title: "Retreat Complete", description: "Finished your 14-day journey", completed: false, day: 14 }
  ];

  const handleMoodSubmit = () => {
    // In a real app, this would save to storage/database
    alert(`Mood rating of ${moodRating} recorded for today!`);
  };

  const handleJournalSave = () => {
    // In a real app, this would save to storage/database
    alert("Journal entry saved!");
    setJournalEntry("");
  };

  const handleReflectionSave = () => {
    // In a real app, this would save to storage/database
    alert("Daily reflection saved!");
    setDailyReflections({ wins: "", challenges: "", gratitude: "", tomorrow: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-nurturing">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Your Healing Progress
          </CardTitle>
          <CardDescription>
            Track your journey, celebrate wins, and reflect on your growth
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-healing/5 border-healing/20">
          <CardContent className="pt-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-healing" />
            <div className="text-2xl font-bold text-healing">{weeklyStats.weeklyProgress}%</div>
            <div className="text-sm text-muted-foreground">Weekly Progress</div>
          </CardContent>
        </Card>
        <Card className="bg-nature/5 border-nature/20">
          <CardContent className="pt-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-nature" />
            <div className="text-2xl font-bold text-nature">{weeklyStats.activitiesCompleted}</div>
            <div className="text-sm text-muted-foreground">Activities Done</div>
          </CardContent>
        </Card>
        <Card className="bg-calm/5 border-calm/20">
          <CardContent className="pt-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-calm" />
            <div className="text-2xl font-bold text-calm">{weeklyStats.averageMood}</div>
            <div className="text-sm text-muted-foreground">Avg Mood</div>
          </CardContent>
        </Card>
        <Card className="bg-earth/5 border-earth/20">
          <CardContent className="pt-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-earth" />
            <div className="text-2xl font-bold text-earth">{weeklyStats.streakDays}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Mood Tracker */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-healing" />
            Daily Mood Check-In
          </CardTitle>
          <CardDescription>
            Rate your overall mood today on a scale of 1-10
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Mood Rating</span>
                <span className="text-sm font-medium">{moodRating}/10</span>
              </div>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <Button
                    key={rating}
                    variant={moodRating === rating ? "healing" : "outline"}
                    size="sm"
                    className="w-10 h-10 p-0"
                    onClick={() => setMoodRating(rating)}
                  >
                    {rating}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>Very Low</span>
                <span>Neutral</span>
                <span>Very High</span>
              </div>
            </div>
            <Button onClick={handleMoodSubmit} variant="healing" className="w-full">
              Record Today's Mood
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Mood Chart */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-nature" />
            Weekly Mood Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodData.map((data, index) => (
              <div key={data.day} className="flex items-center gap-4">
                <div className="w-10 text-sm font-medium">{data.day}</div>
                <div className="flex-1">
                  <ProgressBar value={data.mood * 10} className="h-3" />
                </div>
                <div className="w-10 text-sm text-right">{data.mood}/10</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-earth" />
            Recovery Milestones
          </CardTitle>
          <CardDescription>
            Celebrate your achievements on this healing journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center gap-4 p-4 rounded-lg ${
                milestone.completed ? 'bg-healing/5 border border-healing/20' : 'bg-muted/30'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.completed ? 'bg-healing text-healing-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {milestone.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
                <Badge variant={milestone.completed ? "default" : "secondary"}>
                  Day {milestone.day}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Reflection */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-calm" />
            Daily Reflection
          </CardTitle>
          <CardDescription>
            Take a moment to reflect on your day and set intentions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Today's Wins</label>
              <Textarea
                placeholder="What went well today? What are you proud of?"
                value={dailyReflections.wins}
                onChange={(e) => setDailyReflections({...dailyReflections, wins: e.target.value})}
                className="min-h-[80px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Challenges</label>
              <Textarea
                placeholder="What was difficult? How did you handle it?"
                value={dailyReflections.challenges}
                onChange={(e) => setDailyReflections({...dailyReflections, challenges: e.target.value})}
                className="min-h-[80px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Gratitude</label>
              <Textarea
                placeholder="What are you grateful for today?"
                value={dailyReflections.gratitude}
                onChange={(e) => setDailyReflections({...dailyReflections, gratitude: e.target.value})}
                className="min-h-[80px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tomorrow's Focus</label>
              <Textarea
                placeholder="What would you like to focus on tomorrow?"
                value={dailyReflections.tomorrow}
                onChange={(e) => setDailyReflections({...dailyReflections, tomorrow: e.target.value})}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <Button onClick={handleReflectionSave} variant="calm" className="w-full">
            Save Daily Reflection
          </Button>
        </CardContent>
      </Card>

      {/* Journal */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-nature" />
            Free-Form Journal
          </CardTitle>
          <CardDescription>
            Express your thoughts and feelings freely in your private space
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write whatever is on your mind... your thoughts, feelings, experiences, or anything else you'd like to express."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="min-h-[120px]"
          />
          <Button onClick={handleJournalSave} variant="nature" className="w-full">
            Save Journal Entry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;