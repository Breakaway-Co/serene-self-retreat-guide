import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Calendar, Video, Target, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningModule {
  id: string;
  title: string;
  duration: number; // in minutes
  description: string;
  type: 'core' | 'reinforcement';
  themes: string[];
  traumaInformed: boolean;
}

interface ScheduledModule {
  day: number;
  theme: string;
  videoTitle: string;
  duration: number;
  linkedActivity: string;
  keyLearningOutcome: string;
  type: 'core' | 'reinforcement';
}

const LearningModuleScheduler = () => {
  const { toast } = useToast();
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [schedule, setSchedule] = useState<ScheduledModule[]>([]);
  const [newModule, setNewModule] = useState<Partial<LearningModule>>({
    title: '',
    duration: 0,
    description: '',
    type: 'core',
    themes: [],
    traumaInformed: true
  });

  const retreatThemes = {
    '1-3': 'Orientation, safety, and foundational concepts',
    '4-7': 'Emotional regulation, triggers, and coping strategies',
    '8-11': 'Relationship repair, self-identity, and resilience building',
    '12-14': 'Integration, relapse prevention, and post-retreat planning'
  };

  const availableThemes = [
    'Safety & Stabilization',
    'Trauma Awareness',
    'Emotional Regulation',
    'Trigger Management',
    'Coping Strategies',
    'Self-Identity',
    'Relationship Repair',
    'Resilience Building',
    'Relapse Prevention',
    'Integration & Planning'
  ];

  const addModule = () => {
    if (!newModule.title || !newModule.duration) {
      toast({
        title: "Missing Information",
        description: "Please provide title and duration for the module.",
        variant: "destructive"
      });
      return;
    }

    const module: LearningModule = {
      id: `module_${Date.now()}`,
      title: newModule.title!,
      duration: newModule.duration!,
      description: newModule.description || '',
      type: newModule.type as 'core' | 'reinforcement',
      themes: newModule.themes || [],
      traumaInformed: newModule.traumaInformed || true
    };

    setModules([...modules, module]);
    setNewModule({
      title: '',
      duration: 0,
      description: '',
      type: 'core',
      themes: [],
      traumaInformed: true
    });

    toast({
      title: "Module Added",
      description: `${module.title} has been added to the module library.`
    });
  };

  const generateSchedule = () => {
    if (modules.length === 0) {
      toast({
        title: "No Modules Available",
        description: "Please add learning modules before generating a schedule.",
        variant: "destructive"
      });
      return;
    }

    // AI Scheduling Prompt Logic Implementation
    const scheduledModules: ScheduledModule[] = [];
    const coreModules = modules.filter(m => m.type === 'core');
    const reinforcementModules = modules.filter(m => m.type === 'reinforcement');

    // Sort core modules by theme alignment with retreat phases
    const sortedCoreModules = [...coreModules].sort((a, b) => {
      const themeWeights: { [key: string]: number } = {
        'Safety & Stabilization': 1,
        'Trauma Awareness': 2,
        'Emotional Regulation': 4,
        'Trigger Management': 5,
        'Coping Strategies': 6,
        'Self-Identity': 8,
        'Relationship Repair': 9,
        'Resilience Building': 10,
        'Relapse Prevention': 12,
        'Integration & Planning': 13
      };
      
      const weightA = Math.min(...a.themes.map(t => themeWeights[t] || 14));
      const weightB = Math.min(...b.themes.map(t => themeWeights[t] || 14));
      return weightA - weightB;
    });

    // Schedule core modules (max 1 per day)
    for (let day = 1; day <= 14 && scheduledModules.length < sortedCoreModules.length; day++) {
      const module = sortedCoreModules[scheduledModules.length];
      if (module) {
        let dayTheme = '';
        if (day <= 3) dayTheme = retreatThemes['1-3'];
        else if (day <= 7) dayTheme = retreatThemes['4-7'];
        else if (day <= 11) dayTheme = retreatThemes['8-11'];
        else dayTheme = retreatThemes['12-14'];

        scheduledModules.push({
          day,
          theme: dayTheme,
          videoTitle: module.title,
          duration: module.duration,
          linkedActivity: `Group discussion and reflection on ${module.themes.join(', ')}`,
          keyLearningOutcome: `Participants will understand and apply concepts related to ${module.themes.join(', ')} in their recovery journey`,
          type: 'core'
        });
      }
    }

    // Add reinforcement modules on selected days
    const reinforcementDays = [3, 6, 9, 12]; // Strategic reinforcement days
    reinforcementModules.slice(0, 4).forEach((module, index) => {
      const day = reinforcementDays[index];
      if (day) {
        let dayTheme = '';
        if (day <= 3) dayTheme = retreatThemes['1-3'];
        else if (day <= 7) dayTheme = retreatThemes['4-7'];
        else if (day <= 11) dayTheme = retreatThemes['8-11'];
        else dayTheme = retreatThemes['12-14'];

        scheduledModules.push({
          day,
          theme: dayTheme,
          videoTitle: `${module.title} (Reinforcement)`,
          duration: module.duration,
          linkedActivity: `Brief check-in and skills practice for ${module.themes.join(', ')}`,
          keyLearningOutcome: `Reinforcement of ${module.themes.join(', ')} concepts and skills`,
          type: 'reinforcement'
        });
      }
    });

    setSchedule(scheduledModules.sort((a, b) => a.day - b.day));

    toast({
      title: "Schedule Generated",
      description: "Learning module schedule has been created using trauma-informed, evidence-based sequencing."
    });
  };

  const addTheme = (theme: string) => {
    if (newModule.themes && !newModule.themes.includes(theme)) {
      setNewModule({
        ...newModule,
        themes: [...(newModule.themes || []), theme]
      });
    }
  };

  const removeTheme = (theme: string) => {
    setNewModule({
      ...newModule,
      themes: (newModule.themes || []).filter(t => t !== theme)
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Learning Module Video Scheduler
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Schedule learning module videos for the 14-day Addictions Recovery Retreat using trauma-informed, evidence-based sequencing.
          </p>
        </CardHeader>
      </Card>

      {/* Add New Module */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Learning Module
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Module Title</Label>
              <Input
                id="title"
                value={newModule.title || ''}
                onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                placeholder="e.g., Understanding Addiction Neurobiology"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={newModule.duration || ''}
                onChange={(e) => setNewModule({...newModule, duration: parseInt(e.target.value) || 0})}
                placeholder="e.g., 25"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newModule.description || ''}
              onChange={(e) => setNewModule({...newModule, description: e.target.value})}
              placeholder="Brief description of the module content and objectives..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Module Type</Label>
              <Select value={newModule.type} onValueChange={(value) => setNewModule({...newModule, type: value as 'core' | 'reinforcement'})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core Learning Module</SelectItem>
                  <SelectItem value="reinforcement">Reinforcement Clip</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="traumaInformed"
                checked={newModule.traumaInformed || false}
                onChange={(e) => setNewModule({...newModule, traumaInformed: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="traumaInformed">Trauma-Informed Content</Label>
            </div>
          </div>

          <div>
            <Label>Themes</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(newModule.themes || []).map(theme => (
                <Badge key={theme} variant="secondary" className="cursor-pointer" onClick={() => removeTheme(theme)}>
                  {theme} ×
                </Badge>
              ))}
            </div>
            <Select onValueChange={addTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Add theme..." />
              </SelectTrigger>
              <SelectContent>
                {availableThemes.filter(t => !(newModule.themes || []).includes(t)).map(theme => (
                  <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={addModule} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Module to Library
          </Button>
        </CardContent>
      </Card>

      {/* Module Library */}
      {modules.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Module Library ({modules.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {modules.map(module => (
                <div key={module.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{module.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={module.type === 'core' ? 'default' : 'secondary'}>
                        {module.type}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {module.duration}min
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {module.themes.map(theme => (
                      <Badge key={theme} variant="outline" className="text-xs">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Generate Schedule
          </CardTitle>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Scheduling Logic:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Days 1-3: Orientation, safety, and foundational concepts</li>
              <li>Days 4-7: Emotional regulation, triggers, and coping strategies</li>
              <li>Days 8-11: Relationship repair, self-identity, and resilience building</li>
              <li>Days 12-14: Integration, relapse prevention, and post-retreat planning</li>
            </ul>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={generateSchedule} className="w-full" disabled={modules.length === 0}>
            <Target className="h-4 w-4 mr-2" />
            Generate Trauma-Informed Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Generated Schedule */}
      {schedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              14-Day Learning Module Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Theme</TableHead>
                  <TableHead>Video Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Linked Activity/Discussion</TableHead>
                  <TableHead>Key Learning Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.day}</TableCell>
                    <TableCell className="text-sm">{item.theme}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.videoTitle}
                        <Badge variant={item.type === 'core' ? 'default' : 'secondary'} className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.duration}min
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.linkedActivity}</TableCell>
                    <TableCell className="text-sm">{item.keyLearningOutcome}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LearningModuleScheduler;