import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SubscriptionPlans } from '@/components/SubscriptionPlans';
import { QuickAccess } from '@/components/QuickAccess';
import { PersonalizedRecommendations } from '@/components/PersonalizedRecommendations';
import { useApp } from "@/contexts/AppContext";
import { ArrowRight, Play, Users, Award, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-retreat-dashboard.jpg';

const Index = () => {
  const { state } = useApp();

  const handleStartRetreat = () => {
    // Navigate to retreat selection or onboarding
    window.location.href = '/intake';
  };

  const handleSelectPlan = (planId: string) => {
    // Handle subscription selection
    console.log('Selected plan:', planId);
    // This would integrate with Stripe for payment processing
  };

  const handleStartRecommendation = (id: string) => {
    console.log('Starting recommendation:', id);
    // Navigate to specific retreat
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury wellness retreat sanctuary with serene meditation space" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-tan/80 via-luxury-tan/60 to-luxury-champagne/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-playfair font-bold leading-tight">
                Luxury Wellness
                <span className="block text-luxury-champagne">At Your Fingertips</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-inter">
                Transform your life with world-class retreat experiences, personalized for your journey and delivered to your home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleStartRetreat}
                size="lg" 
                className="bg-luxury-champagne text-luxury-champagne-foreground hover:bg-luxury-champagne/90 text-lg px-8 py-6 font-semibold shadow-champagne"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Your Retreat
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-6"
              >
                Explore Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
              Why Choose Breakaway Co.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the pinnacle of wellness with our luxury approach to at-home retreats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-luxury transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-luxury-tan/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-tan/20 transition-colors">
                  <Users className="w-8 h-8 text-luxury-tan" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-4">Expert-Led Programs</h3>
                <p className="text-muted-foreground">
                  Learn from world-renowned wellness experts and certified retreat leaders with decades of experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-luxury transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-luxury-champagne/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-luxury-champagne/20 transition-colors">
                  <Sparkles className="w-8 h-8 text-luxury-champagne" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-4">Personalized Experience</h3>
                <p className="text-muted-foreground">
                  AI-powered customization ensures every retreat is tailored to your unique wellness goals and lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-luxury transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-4">Luxury Quality</h3>
                <p className="text-muted-foreground">
                  Premium materials, exclusive content, and concierge-level support that rivals the world's finest resorts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <QuickAccess onStartRetreat={handleStartRecommendation} onSearch={handleSearch} />

      {/* Personalized Recommendations */}
      {state.user.hasCompletedIntake && (
        <PersonalizedRecommendations onStartRecommendation={handleStartRecommendation} />
      )}

      {/* Subscription Plans */}
      <SubscriptionPlans onSelectPlan={handleSelectPlan} />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-luxury-emerald text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands who have discovered the power of luxury wellness at home. 
            Start your journey today with a 14-day free trial.
          </p>
          <Button 
            onClick={handleStartRetreat}
            size="lg"
            className="bg-luxury-champagne text-luxury-champagne-foreground hover:bg-luxury-champagne/90 text-xl px-12 py-6 font-bold shadow-champagne"
          >
            Begin Your Transformation
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
