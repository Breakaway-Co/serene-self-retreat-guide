import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RetreatPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface AddOnPlan {
  id: string;
  name: string;
  price: number;
  period: 'month';
  description: string;
  features: string[];
  isPopular?: boolean;
}

const retreatPlans: RetreatPlan[] = [
  {
    id: 'stress_retreat',
    name: 'Stress Relief',
    price: 49,
    duration: '7-10 days',
    description: 'Perfect for managing daily stress and finding calm',
    features: [
      'Complete 7-10 day program',
      'Guided daily activities',
      'Audio guidance included',
      'Lifetime access to retreat',
      'Progress tracking',
      'DIY at-home setup guide'
    ]
  },
  {
    id: 'anxiety_depression',
    name: 'Anxiety & Depression',
    price: 79,
    duration: '12-14 days',
    description: 'Evidence-based support for anxiety and depression',
    features: [
      'Complete 12-14 day program',
      'Trauma-informed practices',
      'Professional referrals',
      'Lifetime access',
      'Daily check-ins',
      'Crisis resources',
      'Audio & written guidance'
    ],
    isPopular: true
  },
  {
    id: 'transformation',
    name: 'Life Transformation',
    price: 99,
    duration: '14-21 days',
    description: 'Deep personal growth and life upgrade journey',
    features: [
      'Complete 14-21 day program',
      'Advanced techniques',
      'Personalized recommendations',
      'Lifetime access',
      'Comprehensive toolkit',
      'Professional referrals',
      'Audio & video guidance'
    ]
  },
  {
    id: 'intensive_healing',
    name: 'Intensive Healing',
    price: 129,
    duration: '21+ days',
    description: 'Comprehensive healing for PTSD, addiction, and grief',
    features: [
      'Complete 21+ day program',
      'Specialized trauma protocols',
      'Professional supervision',
      'Lifetime access',
      'Crisis intervention',
      'Therapist referrals',
      'Full multimedia guidance',
      'Family support resources'
    ]
  }
];

const addOnPlans: AddOnPlan[] = [
  {
    id: 'audio_library',
    name: 'Premium Audio Library',
    price: 14.99,
    period: 'month',
    description: 'Complete audio meditation and guidance library',
    features: [
      '100+ guided meditations',
      'Sleep soundscapes',
      'Breathwork sessions',
      'New content monthly',
      'Download for offline'
    ]
  },
  {
    id: 'coaching',
    name: 'Wellness Coaching',
    price: 79,
    period: 'month',
    description: 'Monthly 1-on-1 sessions with certified coaches',
    features: [
      '2 live sessions/month',
      'Personalized action plans',
      'Email support',
      'Priority recommendations',
      'Progress accountability'
    ]
  },
  {
    id: 'unlimited',
    name: 'Unlimited Access',
    price: 49,
    period: 'month',
    description: 'Access to all retreat programs',
    features: [
      'All 10+ retreat programs',
      'Start multiple retreats',
      'Premium audio library',
      'Monthly new content',
      'Community forum',
      'Cancel anytime'
    ],
    isPopular: true
  },
  {
    id: 'vip',
    name: 'VIP Experience',
    price: 99,
    period: 'month',
    description: 'Everything included - ultimate membership',
    features: [
      'Unlimited retreat access',
      'Premium audio library',
      '2 coaching sessions/month',
      'Priority support',
      'Exclusive workshops',
      'Custom retreat creation',
      'All future content'
    ]
  }
];

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string) => void;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onSelectPlan }) => {
  const [selectedTab, setSelectedTab] = useState<'retreats' | 'addons'>('retreats');

  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Choose Your Wellness Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            One-time retreat purchase or monthly add-ons for continuous support
          </p>
          <div className="mt-4">
            <Badge className="bg-luxury-champagne text-luxury-champagne-foreground px-4 py-2 text-base">
              ✨ 48-Hour Free Trial • No Credit Card Required
            </Badge>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as 'retreats' | 'addons')} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="retreats">One-Time Retreats</TabsTrigger>
            <TabsTrigger value="addons">Monthly Add-Ons</TabsTrigger>
          </TabsList>

          {/* Retreat Plans */}
          <TabsContent value="retreats">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {retreatPlans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative transition-all duration-300 hover:shadow-elevated ${
                    plan.isPopular 
                      ? 'border-primary shadow-luxury ring-2 ring-primary/20 scale-105' 
                      : 'hover:border-primary/50'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-champagne text-luxury-champagne-foreground px-3 py-1 font-semibold text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-playfair font-semibold">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold text-primary">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          one-time
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{plan.duration}</p>
                    </div>
                    <CardDescription className="mt-3 text-sm">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-luxury-tan mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      onClick={() => onSelectPlan(plan.id)}
                      className="w-full text-sm font-semibold"
                      variant={plan.isPopular ? 'luxury-tan' : 'outline'}
                    >
                      {plan.isPopular ? 'Get Started' : 'Choose Retreat'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add-On Plans */}
          <TabsContent value="addons">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {addOnPlans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative transition-all duration-300 hover:shadow-elevated ${
                    plan.isPopular 
                      ? 'border-primary shadow-luxury ring-2 ring-primary/20 scale-105' 
                      : 'hover:border-primary/50'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-champagne text-luxury-champagne-foreground px-3 py-1 font-semibold text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-playfair font-semibold">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold text-primary">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{plan.period}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-3 text-sm">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-luxury-tan mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      onClick={() => onSelectPlan(plan.id)}
                      className="w-full text-sm font-semibold"
                      variant={plan.isPopular ? 'luxury-tan' : 'outline'}
                    >
                      {plan.isPopular ? 'Subscribe Now' : 'Add to Plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All retreats include a 48-hour free trial. Monthly add-ons can be canceled anytime.
          </p>
          <p className="text-sm text-muted-foreground">
            Questions? <button onClick={() => {}} className="text-primary hover:underline font-medium">Contact our wellness concierge</button>
          </p>
        </div>
      </div>
    </section>
  );
};