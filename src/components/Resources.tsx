import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Phone, Heart, Brain, Shield, Lightbulb, ExternalLink } from "lucide-react";
import { PersonalizedRetreat } from "@/types/retreat";

interface ResourcesProps {
  retreat: PersonalizedRetreat;
}

const Resources = ({ retreat }: ResourcesProps) => {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7, free and confidential support for people in distress",
      availability: "24/7",
      website: "https://988lifeline.org/",
      websiteText: "988lifeline.org"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text message",
      availability: "24/7",
      website: "https://www.crisistextline.org/",
      websiteText: "crisistextline.org"
    },
    {
      name: "NAMI Helpline",
      number: "1-800-950-NAMI",
      description: "Information, support and referrals for mental health",
      availability: "Mon-Fri 10am-10pm ET",
      website: "https://www.nami.org/help",
      websiteText: "nami.org/help"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      availability: "24/7",
      website: "https://www.samhsa.gov/find-help/national-helpline",
      websiteText: "samhsa.gov"
    },
    {
      name: "International Association for Suicide Prevention",
      number: "Multiple international numbers",
      description: "Crisis centers and helplines worldwide",
      availability: "Varies by location",
      website: "https://www.iasp.info/resources/Crisis_Centres/",
      websiteText: "iasp.info"
    },
    {
      name: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "Support for domestic violence survivors",
      availability: "24/7",
      website: "https://www.thehotline.org/",
      websiteText: "thehotline.org"
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

  const educationalResources = [
    {
      category: "Trauma & PTSD Education",
      resources: [
        {
          name: "National Center for PTSD",
          description: "Comprehensive PTSD information and self-assessment tools",
          website: "https://www.ptsd.va.gov/",
          websiteText: "ptsd.va.gov"
        },
        {
          name: "Trauma Informed Oregon",
          description: "Understanding trauma-informed care and healing approaches",
          website: "https://traumainformedoregon.org/",
          websiteText: "traumainformedoregon.org"
        }
      ]
    },
    {
      category: "Anxiety & Depression",
      resources: [
        {
          name: "Anxiety and Depression Association of America",
          description: "Evidence-based resources for anxiety and depression",
          website: "https://adaa.org/",
          websiteText: "adaa.org"
        },
        {
          name: "Centre for Clinical Interventions",
          description: "Free self-help modules for depression and anxiety",
          website: "https://www.cci.health.wa.gov.au/",
          websiteText: "cci.health.wa.gov.au"
        }
      ]
    },
    {
      category: "Substance Use & Addiction",
      resources: [
        {
          name: "National Institute on Drug Abuse",
          description: "Science-based information on addiction and recovery",
          website: "https://www.drugabuse.gov/",
          websiteText: "drugabuse.gov"
        },
        {
          name: "Faces & Voices of Recovery",
          description: "Stories and resources for addiction recovery",
          website: "https://facesandvoicesofrecovery.org/",
          websiteText: "facesandvoicesofrecovery.org"
        }
      ]
    },
    {
      category: "Mindfulness & Meditation",
      resources: [
        {
          name: "Mindfulness-Based Stress Reduction",
          description: "Original MBSR program resources and research",
          website: "https://www.umassmed.edu/cfm/",
          websiteText: "umassmed.edu/cfm"
        },
        {
          name: "UCLA Mindful Awareness Research Center",
          description: "Free guided meditations and mindfulness resources",
          website: "https://www.uclahealth.org/programs/marc",
          websiteText: "uclahealth.org/programs/marc"
        }
      ]
    }
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="coping">Coping Tools</TabsTrigger>
          <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
          <TabsTrigger value="daily">Daily Practices</TabsTrigger>
          <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
          <TabsTrigger value="educational">Learn More</TabsTrigger>
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
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(resource.website, '_blank')}
                        className="text-xs"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {resource.websiteText}
                      </Button>
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

        <TabsContent value="educational" className="space-y-6">
          {educationalResources.map((category) => (
            <Card key={category.category} className="shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BookOpen className="w-5 h-5" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {category.resources.map((resource, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{resource.name}</h4>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.open(resource.website, '_blank')}
                          className="text-xs ml-2"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <p className="text-xs text-primary">{resource.websiteText}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
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