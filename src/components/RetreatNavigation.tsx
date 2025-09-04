import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, ChefHat, BookOpen, BarChart3 } from "lucide-react";

import { PersonalizedRetreat } from "@/types/retreat";

interface RetreatNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  retreat?: PersonalizedRetreat;
}

const RetreatNavigation = ({ activeSection, onSectionChange, retreat }: RetreatNavigationProps) => {
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Heart, variant: 'healing' as const },
    { id: 'daily-program', label: 'Daily Program', icon: Calendar, variant: 'nature' as const },
    { id: 'meal-plan', label: 'Meal Plan', icon: ChefHat, variant: 'earth' as const },
    { id: 'resources', label: 'Resources', icon: BookOpen, variant: 'nature' as const },
    { id: 'progress', label: 'Progress', icon: BarChart3, variant: 'healing' as const },
  ];

  return (
    <Card className="p-6 shadow-nurturing">
      {retreat && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {retreat.baseRetreat.name}
          </h2>
          <p className="text-muted-foreground">
            {retreat.baseRetreat.shortDescription}
          </p>
          {retreat.personalizations.gentleMode && (
            <div className="mt-2">
              <Badge variant="secondary" className="bg-healing/10 text-healing">
                Gentle Mode Active
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-wrap gap-4 justify-center">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? item.variant : 'outline'}
              size="lg"
              onClick={() => onSectionChange(item.id)}
              className="min-w-[140px] h-12"
            >
              <Icon className="w-5 h-5 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default RetreatNavigation;