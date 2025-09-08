import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { usePersonalizedRetreat } from '@/hooks/usePersonalizedRetreat';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActivitiesPage: React.FC = () => {
  const { state, actions } = useApp();
  const { currentRetreat } = usePersonalizedRetreat();
  const navigate = useNavigate();

  if (!state.retreat.selectedRetreatId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Alert>
          <AlertDescription>
            Please select a retreat first to view activities.
          </AlertDescription>
        </Alert>
        <Button 
          onClick={() => navigate('/')} 
          className="mt-4"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Choose Retreat
        </Button>
      </div>
    );
  }

  if (!currentRetreat) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const currentDay = currentRetreat.baseRetreat.days.find(d => d.day === state.retreat.currentDay);
  const allActivities = currentDay ? [
    ...currentDay.morning,
    ...currentDay.afternoon,
    ...currentDay.evening
  ] : [];

  const handleStartActivity = (activityId: string) => {
    if (!state.retreat.completedActivities.includes(activityId)) {
      actions.addCompletedActivity(activityId);
    }
  };

  const getActivityIcon = (activityId: string) => {
    if (state.retreat.completedActivities.includes(activityId)) {
      return <CheckCircle className="h-5 w-5 text-healing" />;
    }
    return <Play className="h-5 w-5 text-muted-foreground" />;
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'mindfulness': return 'bg-healing/10 text-healing';
      case 'movement': return 'bg-nature/10 text-nature';
      case 'nutrition': return 'bg-earth/10 text-earth';
      case 'therapy': return 'bg-calm/10 text-calm';
      default: return 'bg-secondary/10 text-secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Today's Activities</h1>
          <p className="text-muted-foreground mt-2">
            Day {state.retreat.currentDay} • {currentDay?.theme}
          </p>
          {currentDay?.focus && (
            <p className="text-sm text-muted-foreground mt-1">
              Focus: {currentDay.focus}
            </p>
          )}
        </div>

        <div className="grid gap-4">
          {allActivities.map((activity) => {
            const isCompleted = state.retreat.completedActivities.includes(activity.id);
            
            return (
              <Card 
                key={activity.id} 
                className={`transition-all hover:shadow-gentle ${
                  isCompleted ? 'bg-healing/5 border-healing/20' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getActivityIcon(activity.id)}
                      <div>
                        <CardTitle className="text-lg">{activity.activity}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {activity.time} • {activity.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getActivityTypeColor(activity.type)}>
                        {activity.type}
                      </Badge>
                      {isCompleted && (
                        <Badge variant="secondary">Completed</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                {activity.description && (
                  <CardContent className="pt-0">
                    <CardDescription>{activity.description}</CardDescription>
                    
                    {activity.modifications && activity.modifications.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          MODIFICATIONS AVAILABLE
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {activity.modifications.map((mod, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {mod}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleStartActivity(activity.id)}
                      variant={isCompleted ? "secondary" : "healing"}
                      size="sm"
                      className="mt-4"
                      disabled={isCompleted}
                    >
                      {isCompleted ? 'Completed' : 'Start Activity'}
                    </Button>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;