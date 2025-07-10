import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Phone, Heart, Brain, Shield, Lightbulb } from "lucide-react";

const Resources = () => {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7, free and confidential support for people in distress",
      availability: "24/7"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text message",
      availability: "24/7"
    },
    {
      name: "NAMI Helpline",
      number: "1-800-950-NAMI",
      description: "Information, support and referrals for mental health",
      availability: "Mon-Fri 10am-10pm ET"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      availability: "24/7"
    }
  ];

  const copingStrategies = [
    {
      category: "Grounding Techniques",
      icon: Shield,
      color: "healing",
      strategies: [
        "5-4-3-2-1 Technique: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste",
        "Box Breathing: Inhale 4, hold 4, exhale 4, hold 4",
        "Progressive Muscle Relaxation: Tense and release each muscle group",
        "Cold Water on Wrists: Activates nervous system reset"
      ]
    },
    {
      category: "Emotional Regulation",
      icon: Heart,
      color: "nature",
      strategies: [
        "STOP Technique: Stop, Take a breath, Observe, Proceed mindfully",
        "Emotion Surfing: Notice the emotion without judgment, let it pass",
        "Opposite Action: Act opposite to what the emotion urges",
        "Self-Compassion: Speak to yourself as you would a good friend"
      ]
    },
    {
      category: "Cognitive Strategies",
      icon: Brain,
      color: "calm",
      strategies: [
        "Thought Records: Write down thoughts and examine evidence",
        "Cognitive Defusion: 'I'm having the thought that...'",
        "Mindful Observation: Notice thoughts without engaging",
        "Positive Self-Talk: Replace harsh criticism with encouragement"
      ]
    },
    {
      category: "Behavioral Activation",
      icon: Lightbulb,
      color: "earth",
      strategies: [
        "Pleasant Activity Scheduling: Plan one enjoyable activity daily",
        "Mastery Activities: Engage in tasks that provide accomplishment",
        "Social Connection: Reach out to one supportive person",
        "Movement Medicine: Any form of gentle physical activity"
      ]
    }
  ];

  const dailyPractices = [
    {
      time: "Morning",
      practice: "Intention Setting",
      description: "Set a gentle intention for the day",
      duration: "2 minutes"
    },
    {
      time: "Midday",
      practice: "Check-In Pause",
      description: "Brief emotional and physical check-in",
      duration: "1 minute"
    },
    {
      time: "Evening",
      practice: "Gratitude Practice",
      description: "Name three things you're grateful for",
      duration: "3 minutes"
    },
    {
      time: "Bedtime",
      practice: "Body Scan",
      description: "Release tension from the day",
      duration: "5-10 minutes"
    }
  ];

  const affirmations = [
    "I am worthy of love and healing",
    "I am resilient and can handle challenges",
    "I choose to be gentle with myself today",
    "I am not my thoughts or emotions",
    "I am exactly where I need to be right now",
    "I have survived difficult times before",
    "I am allowed to take up space",
    "I deserve care and compassion",
    "I am learning and growing every day",
    "I trust in my ability to heal"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-nurturing">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Healing Resources & Support
          </CardTitle>
          <CardDescription>
            Essential tools, techniques, and support contacts for your recovery journey
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="coping" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="coping">Coping Tools</TabsTrigger>
          <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
          <TabsTrigger value="daily">Daily Practices</TabsTrigger>
          <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
        </TabsList>

        <TabsContent value="coping" className="space-y-6">
          {copingStrategies.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.category} className="shadow-gentle">
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 text-${category.color}`}>
                    <Icon className="w-5 h-5" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {category.strategies.map((strategy, index) => (
                      <div key={index} className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm">{strategy}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="crisis" className="space-y-6">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Phone className="w-5 h-5" />
                Emergency Crisis Resources
              </CardTitle>
              <CardDescription>
                If you're in immediate danger or having thoughts of self-harm, please reach out now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {crisisResources.map((resource, index) => (
                  <Card key={index} className="border-l-4 border-l-destructive">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{resource.name}</h3>
                        <Badge variant="outline">{resource.availability}</Badge>
                      </div>
                      <p className="text-2xl font-bold text-destructive mb-2">{resource.number}</p>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-6">
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="text-nature">Daily Micro-Practices</CardTitle>
              <CardDescription>
                Small, manageable practices to incorporate throughout your day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {dailyPractices.map((practice, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-nature/5 rounded-lg border border-nature/20">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-nature/10 text-nature">
                        {practice.time}
                      </Badge>
                      <div>
                        <h3 className="font-medium">{practice.practice}</h3>
                        <p className="text-sm text-muted-foreground">{practice.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {practice.duration}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affirmations" className="space-y-6">
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="text-healing">Healing Affirmations</CardTitle>
              <CardDescription>
                Positive statements to support your self-worth and recovery journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {affirmations.map((affirmation, index) => (
                  <div key={index} className="p-4 bg-healing/5 rounded-lg border border-healing/20 text-center">
                    <p className="text-sm font-medium italic">"{affirmation}"</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>How to use:</strong> Choose one affirmation each morning. Repeat it throughout the day, 
                  especially during challenging moments. Say it with intention, even if you don't fully believe it yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Professional Help Reminder */}
      <Card className="border-calm/20 bg-calm/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Heart className="w-6 h-6 text-calm mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-calm mb-2">Remember</h3>
              <p className="text-sm text-muted-foreground">
                These resources complement but don't replace professional mental health care. 
                If you're struggling, please consider reaching out to a therapist, counselor, or your healthcare provider.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;