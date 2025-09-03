import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, ArrowLeft, Star, Clock } from "lucide-react";
import ChildActivityModule from "./ChildActivityModule";

interface RetreatModule {
  id: string;
  type: string;
  title: string;
  narration: string;
  caregiverTip: string;
  options?: string[];
  assets: string[];
}

interface RetreatDay {
  day: number;
  title: string;
  introText: string;
  modules: RetreatModule[];
}

interface ChildRetreatData {
  id: string;
  name: string;
  tileTitle: string;
  subtitle: string;
  durationDays: number;
  ageRange: string;
  tags: string[];
  days: RetreatDay[];
}

const ChildRetreat = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedModule, setSelectedModule] = useState<RetreatModule | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const retreatData: ChildRetreatData = {
    id: "retreat_me_n_u_kiddo",
    name: "Together Through Grief – A 3-Day Healing Journey for Children and Their Parent/Guardian",
    tileTitle: "Me n U Kiddo",
    subtitle: "A gentle 3-day journey for little hearts and caring hands",
    durationDays: 3,
    ageRange: "4-10",
    tags: ["child", "grief", "parent", "trauma-informed"],
    days: [
      {
        day: 1,
        title: "Naming Feelings & Building Safety",
        introText: "Today we'll make a special feelings toolbox, try a gentle activity, and have quiet cuddle time together.",
        modules: [
          {
            id: "m1_toolbox",
            type: "builder",
            title: "Emotions First Aid Toolbox",
            narration: "We're going to make a special box that helps when feelings get big...",
            caregiverTip: "Let your child choose what goes in. It can be real items in a box or pictures in the app.",
            assets: ["pdf_toolbox", "audio_toolbox_intro"]
          },
          {
            id: "m2_spinner",
            type: "spinner",
            title: "Spin the Activity Wheel",
            narration: "Let's spin the wheel and see what gentle activity we get today!",
            options: ["colouring", "breathing_bubbles", "music_time"],
            caregiverTip: "Join in with your child. If they want to re-spin, that's okay.",
            assets: ["audio_spinner"]
          },
          {
            id: "m3_cuddle",
            type: "audio_rest",
            title: "Cuddle Time",
            narration: "Find your teddy or something soft. Sit or lie down together and listen to the music.",
            caregiverTip: "Your calm presence helps your child feel safe.",
            assets: ["audio_calm_music", "visual_teddy"]
          }
        ]
      },
      {
        day: 2,
        title: "Sharing Memories & Making Meaning",
        introText: "Today we'll share a memory, make something special, and spend time together in the kitchen.",
        modules: [
          {
            id: "m4_memory_story",
            type: "record_or_text",
            title: "Story/Memory Time",
            narration: "Let's tell a story about the person we miss. It can be happy, funny, or kind.",
            caregiverTip: "Share your story first to model openness.",
            assets: ["audio_memory_prompt"]
          },
          {
            id: "m5_memory_star",
            type: "craft",
            title: "Memory Star or Heart",
            narration: "Choose your favourite colours. Draw or write something special about the person we're remembering.",
            caregiverTip: "Let your child lead the design. There's no right or wrong.",
            assets: ["pdf_star_heart", "stickers_pack", "audio_craft_prompt"]
          },
          {
            id: "m6_kitchen",
            type: "guided_steps",
            title: "Kitchen Connection",
            narration: "Let's make something yummy together. We'll go slow and have fun.",
            caregiverTip: "Focus on teamwork, not perfection.",
            assets: ["pdf_recipe_fruit", "pdf_recipe_pancake", "audio_kitchen_prompt"]
          }
        ]
      },
      {
        day: 3,
        title: "Feeling Connected & Moving Forward",
        introText: "Today we'll map our feelings, choose a healing activity, and finish with a special closing ritual.",
        modules: [
          {
            id: "m7_feelings_map",
            type: "draw_template",
            title: "Feelings Map",
            narration: "Here's a body outline. Where do you feel your feelings today? Use colours or stickers.",
            caregiverTip: "Ask open questions like 'Where do you feel sadness today?'",
            assets: ["pdf_body_outline", "emoji_stickers", "audio_feelings_map"]
          },
          {
            id: "m8_spinner2",
            type: "spinner",
            title: "Spin the Activity Wheel",
            narration: "Let's spin again and see what we get today!",
            options: ["nature_walk", "sensory_play", "stretch_sway"],
            caregiverTip: "Adapt activities to your space and your child's energy.",
            assets: ["audio_spinner"]
          },
          {
            id: "m9_closing",
            type: "ritual_select",
            title: "Closing Ritual",
            narration: "Let's choose a gentle goodbye for today: light a candle, plant a seed, or send a wish balloon.",
            caregiverTip: "Let this be child-led. There's no pressure to say the 'right' thing.",
            assets: ["audio_closing_prompt", "visual_candle", "visual_seed", "visual_balloon"]
          }
        ]
      }
    ]
  };

  // If a module is selected, show the activity
  if (selectedModule) {
    return (
      <ChildActivityModule 
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
        onComplete={(moduleId) => {
          setCompletedModules(prev => new Set([...prev, moduleId]));
          setSelectedModule(null);
        }}
      />
    );
  }

  const currentDay = retreatData.days.find(day => day.day === selectedDay);
  const totalModules = currentDay?.modules.length || 0;
  const completedCount = currentDay?.modules.filter(module => completedModules.has(module.id)).length || 0;
  const progressPercentage = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'builder': return 'calm';
      case 'spinner': return 'nature';
      case 'audio_rest': return 'healing';
      case 'record_or_text': return 'earth';
      case 'craft': return 'calm';
      case 'guided_steps': return 'nature';
      case 'draw_template': return 'healing';
      case 'ritual_select': return 'earth';
      default: return 'secondary';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-nurturing border-0 bg-gradient-to-r from-calm/10 to-healing/10">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-6 h-6 text-healing" />
            <Badge variant="outline" className="px-3 py-1 border-healing/30 text-healing-foreground bg-healing/20">
              Ages {retreatData.ageRange}
            </Badge>
          </div>
          <CardTitle className="text-2xl mb-2 text-healing">{retreatData.tileTitle}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {retreatData.subtitle}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Day Navigation */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="text-center text-healing">Choose Your Day</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 justify-center flex-wrap">
            {retreatData.days.map((day) => (
              <Button
                key={day.day}
                variant={selectedDay === day.day ? "healing" : "outline"}
                size="lg"
                onClick={() => setSelectedDay(day.day)}
                className="min-w-[120px]"
              >
                Day {day.day}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Day Content */}
      {currentDay && (
        <Card className="shadow-nurturing">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-healing" />
              <Badge variant="outline" className="border-healing/30 text-healing bg-healing/10">
                Day {currentDay.day}
              </Badge>
            </div>
            <CardTitle className="text-xl text-healing">{currentDay.title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {currentDay.introText}
            </CardDescription>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{completedCount} of {totalModules} activities</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {currentDay.modules.map((module, index) => {
              const isCompleted = completedModules.has(module.id);
              return (
                <Card 
                  key={module.id} 
                  className={`transition-all duration-300 cursor-pointer hover:shadow-gentle ${
                    isCompleted ? 'ring-2 ring-healing/30 bg-healing/5' : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedModule(module)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={getTypeColor(module.type) as any}
                            className="capitalize"
                          >
                            {module.type.replace('_', ' ')}
                          </Badge>
                          {isCompleted && (
                            <div className="flex items-center text-healing">
                              <Star className="w-4 h-4 fill-current" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{module.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {module.narration}
                          </p>
                          <div className="mt-2 p-2 bg-accent/30 rounded-md">
                            <p className="text-xs text-accent-foreground">
                              <strong>For caregivers:</strong> {module.caregiverTip}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-4">
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Closing Message */}
      <Card className="shadow-gentle border-healing/20">
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 text-healing mx-auto mb-3" />
          <p className="text-muted-foreground">
            Remember: There's no rush. Take breaks when you need them. Your healing journey is unique and precious. 💝
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildRetreat;