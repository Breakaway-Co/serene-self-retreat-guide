import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  description: string;
  features: string[];
  retreatAccess: string[];
  isPopular?: boolean;
  originalPrice?: number;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'essential',
    name: 'Essential Wellness',
    price: 29,
    period: 'month',
    description: 'Perfect for beginners starting their wellness journey',
    features: [
      'Access to 2 retreats per month',
      'Basic meditation library',
      'Email support',
      'Mobile app access'
    ],
    retreatAccess: ['Mindfulness Basics', 'Stress Relief', 'Better Sleep']
  },
  {
    id: 'premium',
    name: 'Premium Experience',
    price: 79,
    period: 'month',
    originalPrice: 99,
    description: 'Our most popular plan for dedicated wellness enthusiasts',
    features: [
      'Unlimited retreat access',
      'Premium content library',
      'Live coaching sessions',
      'Personalized meal plans',
      'Progress tracking',
      'Priority support'
    ],
    retreatAccess: ['All retreat programs', 'Exclusive premium content'],
    isPopular: true
  },
  {
    id: 'luxury',
    name: 'Luxury Immersion',
    price: 149,
    period: 'month',
    description: 'The ultimate luxury wellness experience with VIP treatment',
    features: [
      'Everything in Premium',
      '1-on-1 wellness coaching',
      'Custom retreat creation',
      'Luxury spa partnerships',
      'Concierge service',
      'Exclusive member events'
    ],
    retreatAccess: ['All programs + VIP exclusives', 'Custom retreat design']
  }
];

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string) => void;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Choose Your Wellness Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select the perfect subscription plan to unlock your path to transformative wellness experiences at home.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionPlans.map((plan) => (
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
                  <Badge className="bg-gradient-champagne text-luxury-champagne-foreground px-4 py-1 font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-playfair font-semibold">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-primary">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <Badge variant="secondary" className="mt-2">
                      Save ${plan.originalPrice - plan.price}/month
                    </Badge>
                  )}
                </div>
                <CardDescription className="mt-3 text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    What's included:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-luxury-tan mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Retreat Access */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Retreat Access:
                  </h4>
                  <div className="space-y-1">
                    {plan.retreatAccess.map((access, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs mr-1 mb-1"
                      >
                        {access}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-6 text-base font-semibold ${
                    plan.isPopular 
                      ? 'bg-gradient-luxury hover:opacity-90' 
                      : ''
                  }`}
                  variant={plan.isPopular ? 'luxury-tan' : 'outline'}
                >
                  {plan.isPopular ? 'Start Premium Journey' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
          <p className="text-sm text-muted-foreground">
            Questions? <button className="text-primary hover:underline">Contact our wellness concierge</button>
          </p>
        </div>
      </div>
    </section>
  );
};