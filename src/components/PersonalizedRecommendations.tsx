import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Brain, Zap } from 'lucide-react';

interface PersonalizedRecommendation {
  id: string;
  title: string;
  reason: string;
  benefit: string;
  duration: string;
  matchScore: number;
  icon: React.ReactNode;
}

const sampleRecommendations: PersonalizedRecommendation[] = [
  {
    id: 'stress-focus',
    title: 'Focus & Clarity Intensive',
    reason: 'Based on your high-stress lifestyle',
    benefit: 'Reduce mental fatigue by 60%',
    duration: '10 days',
    matchScore: 95,
    icon: <Brain className="w-5 h-5" />
  },
  {
    id: 'energy-boost',
    title: 'Natural Energy Revival',
    reason: 'You mentioned low energy levels',
    benefit: 'Boost morning energy naturally',
    duration: '7 days',
    matchScore: 88,
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'heart-wellness',
    title: 'Heart-Centered Healing',
    reason: 'Perfect for emotional balance',
    benefit: 'Improve emotional resilience',
    duration: '14 days',
    matchScore: 92,
    icon: <Heart className="w-5 h-5" />
  }
];

interface PersonalizedRecommendationsProps {
  onStartRecommendation: (id: string) => void;
}

export const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ 
  onStartRecommendation 
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-luxury-platinum/10 to-luxury-emerald/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-luxury-gold" />
            <h2 className="text-3xl font-playfair font-bold text-primary">
              Curated Just for You
            </h2>
            <Sparkles className="w-6 h-6 text-luxury-gold" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered recommendations based on your wellness profile and goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sampleRecommendations.map((recommendation) => (
            <Card 
              key={recommendation.id}
              className="relative overflow-hidden group hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              {/* Match Score Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-luxury-gold text-luxury-gold-foreground font-semibold">
                  {recommendation.matchScore}% match
                </Badge>
              </div>

              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-luxury-emerald/10 opacity-50 group-hover:opacity-70 transition-opacity" />

              <CardContent className="relative p-6 space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-luxury-emerald/10 rounded-xl flex items-center justify-center text-luxury-emerald">
                  {recommendation.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-playfair font-semibold text-xl mb-2">
                    {recommendation.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {recommendation.reason}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {recommendation.duration}
                    </Badge>
                    <span className="text-luxury-emerald text-sm font-medium">
                      {recommendation.benefit}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  onClick={() => onStartRecommendation(recommendation.id)}
                  className="w-full bg-gradient-luxury hover:opacity-90 transition-opacity"
                  variant="luxury-emerald"
                >
                  Start This Journey
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Update Preferences CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want more personalized recommendations?
          </p>
          <Button variant="outline" className="hover:bg-luxury-platinum/20">
            Update My Wellness Profile
          </Button>
        </div>
      </div>
    </section>
  );
};