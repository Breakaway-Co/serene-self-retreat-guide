import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { activityLibrary, ActivityGuide, getActivitiesByCategory, getActivitiesByDifficulty, getActivitiesByFramework } from '@/data/activityLibrary';
import { Search, Filter, BookOpen, Clock, Target, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export const ActivityLibraryBrowser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityGuide | null>(null);

  // Get unique values for filters
  const categories = ['all', 'mindfulness', 'reflection', 'nutrition', 'movement', 'healing', 'creative', 'nature', 'therapy', 'somatic', 'eft'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const frameworks = ['all', 'EFT Tapping', 'The Method', 'Wisdom Development', '6-Step Upgrade', 'Belief System Upgrade', 'Somatic Experiencing'];

  // Filter activities
  const filteredActivities = activityLibrary.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.facilitationGuide.setup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || activity.difficulty === selectedDifficulty;
    const matchesFramework = selectedFramework === 'all' || activity.framework.includes(selectedFramework);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesFramework;
  });

  const getCategoryColor = (category: ActivityGuide['category']) => {
    const colors: Record<ActivityGuide['category'], string> = {
      mindfulness: 'bg-blue-500',
      reflection: 'bg-purple-500',
      nutrition: 'bg-green-500',
      movement: 'bg-orange-500',
      healing: 'bg-pink-500',
      creative: 'bg-yellow-500',
      nature: 'bg-emerald-500',
      therapy: 'bg-indigo-500',
      somatic: 'bg-rose-500',
      eft: 'bg-cyan-500'
    };
    return colors[category];
  };

  const getDifficultyIcon = (difficulty: ActivityGuide['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return '●';
      case 'intermediate': return '●●';
      case 'advanced': return '●●●';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-8 w-8" />
          Activity Library
        </h1>
        <p className="text-muted-foreground">
          Browse and explore 50+ modular activities based on trauma-informed, evidence-based therapeutic frameworks
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Framework</label>
              <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map(fw => (
                    <SelectItem key={fw} value={fw}>
                      {fw}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredActivities.length} activities found</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedFramework('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activities Grid/List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity List */}
        <div className="lg:col-span-1">
          <ScrollArea className="h-[600px]">
            <div className="space-y-3 pr-4">
              {filteredActivities.map(activity => (
                <Card
                  key={activity.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedActivity?.id === activity.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedActivity(activity)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{activity.title}</CardTitle>
                      <Badge className={`${getCategoryColor(activity.category)} text-white`}>
                        {activity.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{activity.duration}</span>
                      <span>•</span>
                      <span>{getDifficultyIcon(activity.difficulty)} {activity.difficulty}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {activity.framework.slice(0, 2).map(fw => (
                        <Badge key={fw} variant="outline" className="text-xs">
                          {fw}
                        </Badge>
                      ))}
                      {activity.framework.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{activity.framework.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Activity Details */}
        <div className="lg:col-span-2">
          {selectedActivity ? (
            <Card className="h-[600px]">
              <ScrollArea className="h-full">
                <CardHeader>
                  <div className="space-y-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{selectedActivity.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getCategoryColor(selectedActivity.category)} text-white`}>
                          {selectedActivity.category}
                        </Badge>
                        <Badge variant="outline">{selectedActivity.duration}</Badge>
                        <Badge variant="outline">
                          {getDifficultyIcon(selectedActivity.difficulty)} {selectedActivity.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedActivity.framework.map(fw => (
                        <Badge key={fw} variant="secondary">
                          {fw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Tabs defaultValue="guide" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="guide">Guide</TabsTrigger>
                      <TabsTrigger value="safety">Safety</TabsTrigger>
                      <TabsTrigger value="integration">Integration</TabsTrigger>
                    </TabsList>

                    <TabsContent value="guide" className="space-y-4 mt-4">
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Setup
                        </h3>
                        <p className="text-sm text-muted-foreground">{selectedActivity.facilitationGuide.setup}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Materials Needed</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {selectedActivity.materials.map((material, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              {material}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Facilitation Steps</h3>
                        <Accordion type="single" collapsible className="w-full">
                          {selectedActivity.facilitationGuide.steps.map((step) => (
                            <AccordionItem key={step.step} value={`step-${step.step}`}>
                              <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline">Step {step.step}</Badge>
                                  <span className="text-sm">{step.duration}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="space-y-2">
                                <p className="text-sm">{step.instruction}</p>
                                {step.tips && step.tips.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1">Tips:</p>
                                    <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                                      {step.tips.map((tip, idx) => (
                                        <li key={idx} className="list-disc">{tip}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Closing
                        </h3>
                        <p className="text-sm text-muted-foreground italic">{selectedActivity.facilitationGuide.closing}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="safety" className="space-y-4 mt-4">
                      <div>
                        <h3 className="font-semibold mb-2">Evidence Base</h3>
                        <p className="text-sm text-muted-foreground">{selectedActivity.evidenceBase}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-amber-600">
                          <AlertCircle className="h-4 w-4" />
                          Trauma Considerations
                        </h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {selectedActivity.traumaConsiderations.map((consideration, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1">•</span>
                              {consideration}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          Contraindications
                        </h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {selectedActivity.contraindications.map((contraindication, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1">•</span>
                              {contraindication}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Modifications</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {selectedActivity.modifications.map((modification, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-500 mt-1" />
                              {modification}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="integration" className="space-y-4 mt-4">
                      <div>
                        <h3 className="font-semibold mb-2">Reflection Questions</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          {selectedActivity.integrationPrompts.questions.map((question, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="font-medium text-primary">{idx + 1}.</span>
                              {question}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Reflection Areas</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedActivity.integrationPrompts.reflectionAreas.map((area, idx) => (
                            <Badge key={idx} variant="outline">{area}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Suitable For</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedActivity.rotationTags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </ScrollArea>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <CardContent className="text-center text-muted-foreground">
                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Select an activity to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
