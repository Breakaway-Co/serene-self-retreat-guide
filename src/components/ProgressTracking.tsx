import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Calendar, Target, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { PersonalizedRetreat, RetreatProgress } from '@/types/retreat';

interface ProgressTrackingProps {
  retreat: PersonalizedRetreat;
  progress: RetreatProgress;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  requiredDays: number;
  completed: boolean;
  unlockedAt?: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export const ProgressTracking: React.FC<ProgressTrackingProps> = ({ retreat, progress }) => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [canGenerateCertificate, setCanGenerateCertificate] = useState(false);

  const completionPercentage = (progress.completedDays.size / retreat.baseRetreat.duration) * 100;
  const daysCompleted = progress.completedDays.size;
  const totalDays = retreat.baseRetreat.duration;

  useEffect(() => {
    // Initialize milestones based on retreat type
    const retreatMilestones: Milestone[] = [
      {
        id: 'first-day',
        title: 'Journey Begins',
        description: 'Completed your first day of healing',
        requiredDays: 1,
        completed: daysCompleted >= 1
      },
      {
        id: 'week-one',
        title: 'One Week Strong',
        description: 'Maintained consistency for 7 days',
        requiredDays: 7,
        completed: daysCompleted >= 7
      },
      {
        id: 'halfway',
        title: 'Halfway Hero',
        description: `Reached the halfway point (${Math.ceil(totalDays / 2)} days)`,
        requiredDays: Math.ceil(totalDays / 2),
        completed: daysCompleted >= Math.ceil(totalDays / 2)
      },
      {
        id: 'completion',
        title: 'Retreat Complete',
        description: 'Completed the full healing retreat',
        requiredDays: totalDays,
        completed: daysCompleted >= totalDays
      }
    ];

    setMilestones(retreatMilestones);

    // Check if user can generate certificate (90% completion)
    setCanGenerateCertificate(completionPercentage >= 90);

    // Generate achievements based on progress
    const newAchievements: Achievement[] = [];
    if (daysCompleted >= 1) {
      newAchievements.push({
        id: 'first-step',
        title: 'First Step',
        description: 'Started your healing journey',
        icon: '🌱',
        unlockedAt: new Date()
      });
    }
    if (daysCompleted >= 7) {
      newAchievements.push({
        id: 'consistency',
        title: 'Consistency Champion',
        description: 'Maintained daily practice for a week',
        icon: '🔥',
        unlockedAt: new Date()
      });
    }
    setAchievements(newAchievements);
  }, [daysCompleted, totalDays, completionPercentage]);

  const generateCertificate = () => {
    // Create a simple certificate content
    const certificateContent = `
      CERTIFICATE OF COMPLETION
      
      This certifies that ${user?.email || 'Participant'}
      has successfully completed the
      ${retreat.baseRetreat.name}
      
      Completion Date: ${new Date().toLocaleDateString()}
      Duration: ${totalDays} days
      Progress: ${Math.round(completionPercentage)}%
      
      Congratulations on your dedication to healing and growth!
    `;

    // Create downloadable certificate
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${retreat.baseRetreat.name}-certificate.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Overall Progress
          </CardTitle>
          <Badge variant="secondary">
            {daysCompleted} / {totalDays} days
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={completionPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{Math.round(completionPercentage)}% Complete</span>
              <span>{totalDays - daysCompleted} days remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`flex items-center gap-4 p-3 rounded-lg border ${
                  milestone.completed 
                    ? 'bg-primary/10 border-primary/20' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  milestone.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {milestone.completed ? <Trophy className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
                {milestone.completed && (
                  <Badge variant="default">Completed</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length > 0 ? (
            <div className="grid gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Complete activities to unlock achievements!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Certificate Generation */}
      {canGenerateCertificate && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Award className="h-5 w-5" />
              Certificate Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Congratulations! You've completed at least 90% of your retreat. 
              Generate your completion certificate to celebrate your achievement.
            </p>
            <Button onClick={generateCertificate} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Generate Certificate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};