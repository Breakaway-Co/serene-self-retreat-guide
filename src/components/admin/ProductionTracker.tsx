import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { FileText, Video, Volume2, BookOpen, Edit, Download, Clock, User } from 'lucide-react';

interface ProductionAsset {
  id: string;
  dayModule: string;
  fileName: string;
  format: 'Video' | 'Audio' | 'Workbook' | 'Script';
  source: string;
  downloadLink: string;
  storagePath: string;
  assignedTo: string;
  editTask: string;
  estimatedHours: number;
  status: 'Not Started' | 'In Progress' | 'Review' | 'Complete' | 'On Hold';
  notes: string;
}

const initialAssets: ProductionAsset[] = [
  // Day 1 – Arrival & Grounding
  {
    id: '1',
    dayModule: 'Day 1 – Arrival & Grounding',
    fileName: 'MC_PerformSilentRetreat_V1.mp4',
    format: 'Video',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day1/Video',
    assignedTo: 'Video Editor',
    editTask: 'Replace intro slide, add Luma Soul logo, swap music',
    estimatedHours: 1.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '2',
    dayModule: 'Day 1 – Arrival & Grounding',
    fileName: 'MC_PerformSilentRetreat_A1.mp3',
    format: 'Audio',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day1/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Re‑record VO with brand narrator',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '3',
    dayModule: 'Day 1 – Arrival & Grounding',
    fileName: 'MC_SilentRetreat_Workbook.pdf',
    format: 'Workbook',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day1/Workbook',
    assignedTo: 'Designer',
    editTask: 'Apply brand template, add space setup checklist',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '4',
    dayModule: 'Day 1 – Arrival & Grounding',
    fileName: 'MC_SilentRetreat_Script.docx',
    format: 'Script',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day1/Script',
    assignedTo: 'Copywriter',
    editTask: 'Adjust tone, add welcome message',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  // Day 2 – Mindfulness Foundations
  {
    id: '5',
    dayModule: 'Day 2 – Mindfulness Foundations',
    fileName: 'MC_MindfulnessStressRelief_V1.mp4',
    format: 'Video',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day2/Video',
    assignedTo: 'Video Editor',
    editTask: 'Add branded lower‑thirds',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '6',
    dayModule: 'Day 2 – Mindfulness Foundations',
    fileName: 'MC_MindfulnessStressRelief_A1.mp3',
    format: 'Audio',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day2/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Add chime start/end',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '7',
    dayModule: 'Day 2 – Mindfulness Foundations',
    fileName: 'MC_MindfulnessStressRelief_Workbook.pdf',
    format: 'Workbook',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day2/Workbook',
    assignedTo: 'Designer',
    editTask: 'Add daily reflection prompts',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '8',
    dayModule: 'Day 2 – Mindfulness Foundations',
    fileName: 'MC_GratitudePractice_V1.mp4',
    format: 'Video',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day2/Video',
    assignedTo: 'Video Editor',
    editTask: 'Replace stock imagery with curated visuals',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  // Day 3 – Emotional Resilience
  {
    id: '9',
    dayModule: 'Day 3 – Emotional Resilience',
    fileName: 'MC_GratitudePractice_A1.mp3',
    format: 'Audio',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day3/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Slow cadence, softer delivery',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '10',
    dayModule: 'Day 3 – Emotional Resilience',
    fileName: 'PLR_MeditationReflectionJournal_Workbook.pdf',
    format: 'Workbook',
    source: 'PLR.me',
    downloadLink: 'https://www.plr.me/content/tags-wellness/new',
    storagePath: '/Retreats/AtHome/Day3/Workbook',
    assignedTo: 'Designer',
    editTask: 'Merge with Day 3 prompts',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '11',
    dayModule: 'Day 3 – Emotional Resilience',
    fileName: 'PLR_MeditationReflectionJournal_A1.mp3',
    format: 'Audio',
    source: 'PLR.me',
    downloadLink: 'https://www.plr.me/content/tags-wellness/new',
    storagePath: '/Retreats/AtHome/Day3/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Add soft background drone',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '12',
    dayModule: 'Day 3 – Emotional Resilience',
    fileName: 'MC_EmotionalResilience_Script.docx',
    format: 'Script',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day3/Script',
    assignedTo: 'Copywriter',
    editTask: 'Add "Release Letter" exercise',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  // Day 4 – Nourishment & Detox
  {
    id: '13',
    dayModule: 'Day 4 – Nourishment & Detox',
    fileName: 'MC_MindfulEating_V1.mp4',
    format: 'Video',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day4/Video',
    assignedTo: 'Video Editor',
    editTask: 'Replace food imagery with rights‑owned recipes',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '14',
    dayModule: 'Day 4 – Nourishment & Detox',
    fileName: 'MC_HolisticNutritionDetox_Workbook.pdf',
    format: 'Workbook',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day4/Workbook',
    assignedTo: 'Designer',
    editTask: 'Add branded meal planner',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '15',
    dayModule: 'Day 4 – Nourishment & Detox',
    fileName: 'MC_MindfulEating_A1.mp3',
    format: 'Audio',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day4/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Re‑record with sensory‑rich language',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '16',
    dayModule: 'Day 4 – Nourishment & Detox',
    fileName: 'PLR_SelfCareConfidenceToolkit_W.pdf',
    format: 'Workbook',
    source: 'PLR.me',
    downloadLink: 'https://www.plr.me/content/tags-wellness/new',
    storagePath: '/Retreats/AtHome/Day4/Workbook',
    assignedTo: 'Designer',
    editTask: 'Integrate as "Evening Self‑Care Ritual"',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  // Day 5 – Movement & Energy Flow
  {
    id: '17',
    dayModule: 'Day 5 – Movement & Energy Flow',
    fileName: 'MC_YogaSequenceGentle_V1.mp4',
    format: 'Video',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day5/Video',
    assignedTo: 'Video Editor',
    editTask: 'Replace mat background with brand palette',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '18',
    dayModule: 'Day 5 – Movement & Energy Flow',
    fileName: 'MC_BreathworkBasics_A1.mp3',
    format: 'Audio',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day5/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Add ocean wave background',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '19',
    dayModule: 'Day 5 – Movement & Energy Flow',
    fileName: 'MC_YogaSequenceGentle_Workbook.pdf',
    format: 'Workbook',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day5/Workbook',
    assignedTo: 'Designer',
    editTask: 'Add posture modification notes',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '20',
    dayModule: 'Day 5 – Movement & Energy Flow',
    fileName: 'PLR_Breathwork_Script.docx',
    format: 'Script',
    source: 'PLR.me',
    downloadLink: 'https://www.plr.me/content/tags-wellness/new',
    storagePath: '/Retreats/AtHome/Day5/Script',
    assignedTo: 'Copywriter',
    editTask: 'Insert Luma Soul breath cue language',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  // Day 6 – Rest & Recovery
  {
    id: '21',
    dayModule: 'Day 6 – Rest & Recovery',
    fileName: 'MC_SleepOptimization_V1.mp4',
    format: 'Video',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day6/Video',
    assignedTo: 'Video Editor',
    editTask: 'Overlay "Sleep Ritual" checklist',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '22',
    dayModule: 'Day 6 – Rest & Recovery',
    fileName: 'MC_SleepOptimization_A1.mp3',
    format: 'Audio',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day6/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Add binaural beats',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '23',
    dayModule: 'Day 6 – Rest & Recovery',
    fileName: 'MC_YogaNidra_A1.mp3',
    format: 'Audio',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day6/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Re‑record with brand narrator',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '24',
    dayModule: 'Day 6 – Rest & Recovery',
    fileName: 'MC_SleepOptimization_Workbook.pdf',
    format: 'Workbook',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day6/Workbook',
    assignedTo: 'Designer',
    editTask: 'Add "Digital Sunset" guide',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  // Day 7 – Integration & Next Steps
  {
    id: '25',
    dayModule: 'Day 7 – Integration & Next Steps',
    fileName: 'PLR_SelfCareConfidenceToolkit_V1.mp4',
    format: 'Video',
    source: 'PLR.me',
    downloadLink: 'https://www.plr.me/content/tags-wellness/new',
    storagePath: '/Retreats/AtHome/Day7/Video',
    assignedTo: 'Video Editor',
    editTask: 'Replace intro with "Your Next 30 Days"',
    estimatedHours: 1,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '26',
    dayModule: 'Day 7 – Integration & Next Steps',
    fileName: 'PLR_SelfCareConfidenceToolkit_Workbook.pdf',
    format: 'Workbook',
    source: 'PLR.me',
    downloadLink: 'https://www.plr.me/content/tags-wellness/new',
    storagePath: '/Retreats/AtHome/Day7/Workbook',
    assignedTo: 'Designer',
    editTask: 'Add "Post‑Retreat Action Plan"',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '27',
    dayModule: 'Day 7 – Integration & Next Steps',
    fileName: 'MC_IntegrationMeditation_A1.mp3',
    format: 'Audio',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day7/Audio',
    assignedTo: 'Audio Engineer',
    editTask: 'Add gentle bell at close',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  },
  {
    id: '28',
    dayModule: 'Day 7 – Integration & Next Steps',
    fileName: 'MC_Integration_Script.docx',
    format: 'Script',
    source: 'MindfulnessContent.com',
    downloadLink: 'https://www.mindfulnesscontent.com/plr',
    storagePath: '/Retreats/AtHome/Day7/Script',
    assignedTo: 'Copywriter',
    editTask: 'Include invitation to next retreat',
    estimatedHours: 0.5,
    status: 'Not Started',
    notes: ''
  }
];

const getFormatIcon = (format: string) => {
  switch (format) {
    case 'Video': return <Video className="h-4 w-4" />;
    case 'Audio': return <Volume2 className="h-4 w-4" />;
    case 'Workbook': return <BookOpen className="h-4 w-4" />;
    case 'Script': return <FileText className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Complete': return 'bg-success text-success-foreground';
    case 'In Progress': return 'bg-warning text-warning-foreground';
    case 'Review': return 'bg-info text-info-foreground';
    case 'On Hold': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export function ProductionTracker() {
  const [assets, setAssets] = useState<ProductionAsset[]>(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState<ProductionAsset | null>(null);

  const updateAsset = (id: string, updates: Partial<ProductionAsset>) => {
    setAssets(prev => prev.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    ));
  };

  const totalAssets = assets.length;
  const completedAssets = assets.filter(a => a.status === 'Complete').length;
  const inProgressAssets = assets.filter(a => a.status === 'In Progress').length;
  const totalHours = assets.reduce((sum, asset) => sum + asset.estimatedHours, 0);
  const completedHours = assets
    .filter(a => a.status === 'Complete')
    .reduce((sum, asset) => sum + asset.estimatedHours, 0);

  const progressPercentage = (completedAssets / totalAssets) * 100;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Production Tracker</h1>
          <p className="text-muted-foreground">
            Luma Soul At-Home Health Retreat Production Dashboard
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-sm font-medium">Complete</span>
            </div>
            <p className="text-2xl font-bold">{completedAssets}</p>
            <p className="text-xs text-muted-foreground">of {totalAssets} assets</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <p className="text-2xl font-bold">{inProgressAssets}</p>
            <p className="text-xs text-muted-foreground">active tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Hours</span>
            </div>
            <p className="text-2xl font-bold">{completedHours}h</p>
            <p className="text-xs text-muted-foreground">of {totalHours}h total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Production Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day & Module</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.dayModule}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getFormatIcon(asset.format)}
                      <div>
                        <p className="font-medium text-sm">{asset.fileName}</p>
                        <p className="text-xs text-muted-foreground">{asset.format}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span className="text-sm">{asset.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm truncate" title={asset.editTask}>
                      {asset.editTask}
                    </p>
                  </TableCell>
                  <TableCell>{asset.estimatedHours}h</TableCell>
                  <TableCell>
                    <Select
                      value={asset.status}
                      onValueChange={(value) => updateAsset(asset.id, { status: value as ProductionAsset['status'] })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAsset(asset)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(asset.downloadLink, '_blank')}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Asset Details</CardTitle>
            <Button variant="ghost" onClick={() => setSelectedAsset(null)}>
              ×
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">File Name</label>
                <Input 
                  value={selectedAsset.fileName}
                  onChange={(e) => setSelectedAsset({...selectedAsset, fileName: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Assigned To</label>
                <Input 
                  value={selectedAsset.assignedTo}
                  onChange={(e) => setSelectedAsset({...selectedAsset, assignedTo: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Estimated Hours</label>
                <Input 
                  type="number"
                  step="0.5"
                  value={selectedAsset.estimatedHours}
                  onChange={(e) => setSelectedAsset({...selectedAsset, estimatedHours: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Storage Path</label>
                <Input 
                  value={selectedAsset.storagePath}
                  onChange={(e) => setSelectedAsset({...selectedAsset, storagePath: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Edit Task</label>
              <Textarea 
                value={selectedAsset.editTask}
                onChange={(e) => setSelectedAsset({...selectedAsset, editTask: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea 
                value={selectedAsset.notes}
                onChange={(e) => setSelectedAsset({...selectedAsset, notes: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedAsset(null)}>
                Cancel
              </Button>
              <Button onClick={() => {
                updateAsset(selectedAsset.id, selectedAsset);
                setSelectedAsset(null);
              }}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}