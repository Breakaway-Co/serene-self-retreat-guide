import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Leaf, Brain } from "lucide-react";
import heroImage from "@/assets/hero-healing.jpg";

const RetreatOverview = () => {
  const principles = [
    {
      icon: Shield,
      title: "Trauma-Informed",
      description: "All activities are designed with trauma sensitivity and safety in mind",
      color: "healing"
    },
    {
      icon: Heart,
      title: "Holistic Healing",
      description: "Addressing mind, body, and spirit through integrated approaches",
      color: "nature"
    },
    {
      icon: Leaf,
      title: "Natural Recovery",
      description: "Harnessing the healing power of nature, nutrition, and mindfulness",
      color: "calm"
    },
    {
      icon: Brain,
      title: "Evidence-Based",
      description: "Incorporating proven therapeutic techniques and practices",
      color: "earth"
    }
  ];

  const focusAreas = [
    "Stress Management",
    "Depression Support",
    "Anxiety Relief",
    "Trauma Healing",
    "Addiction Recovery"
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="relative overflow-hidden shadow-nurturing">
        <div className="relative h-64 md:h-80">
          <img 
            src={heroImage} 
            alt="Peaceful healing nature scene" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-healing/80 to-nature/60" />
          <div className="absolute inset-0 flex items-center justify-center text-center p-6">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Serene Self Retreat
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Your 14-Day Journey to Healing & Recovery
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Introduction */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Welcome to Your Healing Journey</CardTitle>
          <CardDescription className="text-lg">
            This comprehensive 14-day trauma-informed retreat is designed to support you through stress, 
            depression, anxiety, trauma, and addiction recovery from the comfort and safety of your own home.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-healing">What You'll Experience</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Daily structured healing activities</li>
                <li>• Nutritious, affordable meal plans with recipes</li>
                <li>• Mindfulness and meditation practices</li>
                <li>• Trauma-informed therapeutic exercises</li>
                <li>• Progressive recovery milestones</li>
                <li>• 24/7 access to coping resources</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-nature">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <Badge key={area} variant="secondary" className="text-sm">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Principles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {principles.map((principle) => {
          const Icon = principle.icon;
          return (
            <Card key={principle.title} className="text-center shadow-gentle hover:shadow-nurturing transition-shadow">
              <CardContent className="pt-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${principle.color} mb-4`}>
                  <Icon className={`w-6 h-6 text-${principle.color}-foreground`} />
                </div>
                <h3 className="font-semibold mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Important Notice */}
      <Card className="border-healing/20 bg-healing/5 shadow-gentle">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-healing mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-healing mb-2">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                This retreat is designed as a supportive wellness program and should not replace professional 
                medical or therapeutic treatment. If you're experiencing severe symptoms or crisis situations, 
                please contact a healthcare provider or crisis helpline immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetreatOverview;