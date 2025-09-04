import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Clock, Users, Sparkles } from 'lucide-react';

interface PopularRetreat {
  id: string;
  title: string;
  category: string;
  duration: string;
  participants: number;
  rating: number;
  image: string;
  tags: string[];
}

const popularRetreats: PopularRetreat[] = [
  {
    id: 'stress-relief',
    title: 'Executive Stress Relief',
    category: 'Stress Management',
    duration: '7 days',
    participants: 2847,
    rating: 4.9,
    image: '/api/placeholder/300/200',
    tags: ['Mindfulness', 'Corporate', 'Fast Results']
  },
  {
    id: 'luxury-detox',
    title: 'Luxury Digital Detox',
    category: 'Digital Wellness',
    duration: '14 days',
    participants: 1623,
    rating: 4.8,
    image: '/api/placeholder/300/200',
    tags: ['Technology', 'Luxury', 'Transformation']
  },
  {
    id: 'mindful-mornings',
    title: 'Mindful Morning Rituals',
    category: 'Daily Practice',
    duration: '21 days',
    participants: 4156,
    rating: 4.9,
    image: '/api/placeholder/300/200',
    tags: ['Morning', 'Habits', 'Energy']
  }
];

interface QuickAccessProps {
  onStartRetreat: (retreatId: string) => void;
  onSearch: (query: string) => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ onStartRetreat, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search retreats by goal, duration, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 border-luxury-platinum/30 focus:border-primary rounded-xl shadow-luxury"
            />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              variant="luxury-tan"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="outline" className="hover:bg-luxury-cream/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Now
          </Button>
          <Button variant="outline" className="hover:bg-luxury-cream/20">
            <Clock className="w-4 h-4 mr-2" />
            Quick 5-Min Sessions
          </Button>
          <Button variant="outline" className="hover:bg-luxury-cream/20">
            <Users className="w-4 h-4 mr-2" />
            Most Popular
          </Button>
          <Button variant="outline" className="hover:bg-luxury-cream/20">
            <Sparkles className="w-4 h-4 mr-2" />
            New Releases
          </Button>
        </div>

        {/* Popular Retreats */}
        <div>
          <h3 className="text-2xl font-playfair font-semibold text-center mb-8">
            Popular This Week
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {popularRetreats.map((retreat) => (
              <Card 
                key={retreat.id}
                className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-cream rounded-t-lg"></div>
                  <Badge className="absolute top-3 left-3 bg-luxury-champagne text-luxury-champagne-foreground">
                    ⭐ {retreat.rating}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-3">
                    <h4 className="font-playfair font-semibold text-lg mb-1">
                      {retreat.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {retreat.category} • {retreat.duration}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {retreat.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {retreat.participants.toLocaleString()} participants
                    </span>
                  </div>

                  <Button 
                    onClick={() => onStartRetreat(retreat.id)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    variant="outline"
                  >
                    Start Retreat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};