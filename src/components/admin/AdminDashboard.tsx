import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ProductionTracker } from './ProductionTracker';
import LearningModuleScheduler from './LearningModuleScheduler';
import EngagementDashboard from '../analytics/EngagementDashboard';
import ComplianceReports from '../analytics/ComplianceReports';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  Filter, 
  Download, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Users,
  Settings,
  PlayCircle,
  Zap,
  TrendingUp,
  Calendar,
  Activity,
  FileAudio,
  Repeat,
  Heart
} from 'lucide-react';
import { RealtimeChannel } from '@supabase/supabase-js';

interface AudioSession {
  id: string;
  session_id: string;
  session_name: string;
  session_type: string;
  activity_type: string;
  status: string;
  audio_url?: string;
  duration_seconds?: number;
  breath_cycle_count?: number;
  difficulty_level?: string;
  voice_id?: string;
  language: string;
  compliance_flag: boolean;
  audit_notes?: string;
  metadata: any;
  generated_at?: string;
  created_at: string;
  updated_at: string;
  generation_queue_id?: string;
  tags?: string[];
  retry_count: number;
  is_pregenerated: boolean;
  release_date?: string;
  processing_time_seconds?: number;
}

interface QueueItem {
  id: string;
  session_id: string;
  session_name: string;
  session_type: string;
  activity_type: string;
  status: string;
  priority: number;
  retry_count: number;
  max_retries: number;
  last_error?: string;
  scheduled_for?: string;
  started_at?: string;
  completed_at?: string;
  processing_time_seconds?: number;
  is_pregenerated: boolean;
  release_date?: string;
  compliance_flag: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

interface QueueStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  failed: number;
  retrying: number;
  recovered: number;
  pre_generated: number;
}

interface GenerationLog {
  id: string;
  session_id?: string;
  log_level: string;
  message: string;
  details: any;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [sessions, setSessions] = useState<AudioSession[]>([]);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [logs, setLogs] = useState<GenerationLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<{ status?: string; type?: string; search?: string }>({});
  const [queueFilter, setQueueFilter] = useState<{ status?: string; search?: string }>({});
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [realtimeChannel, setRealtimeChannel] = useState<RealtimeChannel | null>(null);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadInitialData();
    setupRealtimeSubscription();

    return () => {
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
      }
    };
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      
      // Load audio sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('audio_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (sessionsError) throw sessionsError;
      setSessions(sessionsData || []);

      // Load queue items
      const { data: queueData, error: queueError } = await supabase
        .from('audio_generation_queue')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(100);

      if (queueError) throw queueError;
      setQueueItems(queueData || []);

      // Load recent logs
      const { data: logsData, error: logsError } = await supabase
        .from('generation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (logsError) throw logsError;
      setLogs(logsData || []);

    } catch (error: any) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error Loading Data',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('admin-dashboard')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audio_sessions'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setSessions(prev => [payload.new as AudioSession, ...prev.slice(0, 99)]);
          } else if (payload.eventType === 'UPDATE') {
            setSessions(prev => 
              prev.map(session => 
                session.id === payload.new.id ? payload.new as AudioSession : session
              )
            );
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audio_generation_queue'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setQueueItems(prev => [payload.new as QueueItem, ...prev.slice(0, 99)]);
          } else if (payload.eventType === 'UPDATE') {
            setQueueItems(prev => 
              prev.map(item => 
                item.id === payload.new.id ? payload.new as QueueItem : item
              )
            );
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'generation_logs'
        },
        (payload) => {
          setLogs(prev => [payload.new as GenerationLog, ...prev.slice(0, 199)]);
        }
      )
      .subscribe();

    setRealtimeChannel(channel);
  };

  const filteredSessions = sessions.filter(session => {
    if (filter.status && session.status !== filter.status) return false;
    if (filter.type && session.session_type !== filter.type) return false;
    if (filter.search && !session.session_name.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  const filteredQueueItems = queueItems.filter(item => {
    if (queueFilter.status && item.status !== queueFilter.status) return false;
    if (queueFilter.search && !item.session_name.toLowerCase().includes(queueFilter.search.toLowerCase())) return false;
    return true;
  });

  const handlePlayAudio = async (audioUrl: string, sessionId: string) => {
    if (currentAudio === sessionId && isPlaying) {
      setIsPlaying(false);
      setCurrentAudio(null);
      return;
    }

    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        audio.play();
        setCurrentAudio(sessionId);
        setIsPlaying(true);
        
        audio.onended = () => {
          setIsPlaying(false);
          setCurrentAudio(null);
        };
      } catch (error) {
        toast({
          title: 'Playback Error',
          description: 'Failed to play audio file',
          variant: 'destructive'
        });
      }
    }
  };

  const handleRegenerateAudio = async (sessionId: string) => {
    try {
      const session = sessions.find(s => s.id === sessionId);
      if (!session) return;

      const { error } = await supabase.functions.invoke('generate-audio-session', {
        body: {
          sessionId: `${session.session_id}-regen-${Date.now()}`,
          sessionName: session.session_name,
          sessionType: session.session_type,
          activityType: session.activity_type,
          masterScript: 'Regenerated session', // This would normally come from the original guide
          voiceId: session.voice_id,
          metadata: { ...session.metadata, regenerated: true }
        }
      });

      if (error) throw error;

      toast({
        title: 'Regeneration Started',
        description: 'Audio regeneration has been queued'
      });
    } catch (error: any) {
      toast({
        title: 'Regeneration Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'generating': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'generating': return <Clock className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const processQueue = async () => {
    try {
      setIsProcessingQueue(true);
      const { error } = await supabase.functions.invoke('seamless-audio-processor', {
        body: { action: 'process_queue' }
      });

      if (error) throw error;

      toast({
        title: 'Queue Processing Started',
        description: 'Audio generation queue is being processed'
      });
    } catch (error: any) {
      toast({
        title: 'Queue Processing Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsProcessingQueue(false);
    }
  };

  const generateSeamlessSession = async (retreatId: string, activityId: string) => {
    try {
      const { error } = await supabase.functions.invoke('seamless-content-pipeline', {
        body: {
          action: 'merge_retreat_session',
          retreatId,
          activityId,
          customizations: {
            intensity: 'moderate',
            duration: 'medium'
          }
        }
      });

      if (error) throw error;

      toast({
        title: 'Seamless Session Queued',
        description: 'Session has been added to the generation queue'
      });
    } catch (error: any) {
      toast({
        title: 'Session Generation Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const stats = {
    total: sessions.length,
    completed: sessions.filter(s => s.status === 'completed').length,
    failed: sessions.filter(s => s.status === 'failed').length,
    generating: sessions.filter(s => s.status === 'generating').length,
    pending: sessions.filter(s => s.status === 'pending').length
  };

  const queueStats: QueueStats = {
    total: queueItems.length,
    pending: queueItems.filter(q => q.status === 'pending').length,
    in_progress: queueItems.filter(q => q.status === 'in_progress').length,
    completed: queueItems.filter(q => q.status === 'completed').length,
    failed: queueItems.filter(q => q.status === 'failed').length,
    retrying: queueItems.filter(q => q.status === 'retrying').length,
    recovered: queueItems.filter(q => q.status === 'recovered').length,
    pre_generated: queueItems.filter(q => q.status === 'pre_generated').length
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Audio Generation Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage guided meditation audio sessions</p>
          </div>
          <Button onClick={loadInitialData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total Sessions</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Generating</p>
                  <p className="text-2xl font-bold">{stats.generating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Failed</p>
                  <p className="text-2xl font-bold">{stats.failed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sessions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sessions">Audio Sessions</TabsTrigger>
            <TabsTrigger value="logs">Generation Logs</TabsTrigger>
            <TabsTrigger value="production">Production Tracker</TabsTrigger>
            <TabsTrigger value="scheduler">Learning Module Scheduler</TabsTrigger>
            <TabsTrigger value="analytics">Engagement Analytics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      placeholder="Search by session name..."
                      value={filter.search || ''}
                      onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                    />
                  </div>
                  <Select value={filter.status || ''} onValueChange={(value) => setFilter(prev => ({ ...prev, status: value || undefined }))}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="generating">Generating</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filter.type || ''} onValueChange={(value) => setFilter(prev => ({ ...prev, type: value || undefined }))}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="breathwork">Breathwork</SelectItem>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="body-scan">Body Scan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Sessions List */}
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`} />
                          {session.session_name}
                        </CardTitle>
                        <CardDescription>
                          {session.session_type} • {session.activity_type} • Created {new Date(session.created_at).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge variant={session.status === 'completed' ? 'default' : session.status === 'failed' ? 'destructive' : 'secondary'}>
                        {getStatusIcon(session.status)}
                        <span className="ml-1">{session.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {session.duration_seconds && (
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">{Math.floor(session.duration_seconds / 60)}m {session.duration_seconds % 60}s</p>
                        </div>
                      )}
                      {session.breath_cycle_count && (
                        <div>
                          <p className="text-sm font-medium">Breath Cycles</p>
                          <p className="text-sm text-muted-foreground">{session.breath_cycle_count}</p>
                        </div>
                      )}
                      {session.voice_id && (
                        <div>
                          <p className="text-sm font-medium">Voice</p>
                          <p className="text-sm text-muted-foreground">{session.voice_id.slice(0, 8)}...</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">Language</p>
                        <p className="text-sm text-muted-foreground">{session.language.toUpperCase()}</p>
                      </div>
                    </div>

                    {session.compliance_flag && (
                      <Alert className="mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          This session has been flagged for compliance review.
                          {session.audit_notes && ` Notes: ${session.audit_notes}`}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-2">
                      {session.audio_url && session.status === 'completed' && (
                        <Button
                          onClick={() => handlePlayAudio(session.audio_url!, session.id)}
                          variant="outline"
                          size="sm"
                        >
                          {currentAudio === session.id && isPlaying ? (
                            <Pause className="h-4 w-4 mr-2" />
                          ) : (
                            <Play className="h-4 w-4 mr-2" />
                          )}
                          {currentAudio === session.id && isPlaying ? 'Pause' : 'Preview'}
                        </Button>
                      )}
                      {session.audio_url && (
                        <Button
                          onClick={() => window.open(session.audio_url, '_blank')}
                          variant="outline"
                          size="sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      <Button
                        onClick={() => handleRegenerateAudio(session.id)}
                        variant="outline"
                        size="sm"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generation Logs</CardTitle>
                <CardDescription>Real-time logs from the audio generation process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 text-sm p-2 rounded border">
                      <Badge variant={log.log_level === 'error' ? 'destructive' : log.log_level === 'warning' ? 'secondary' : 'default'}>
                        {log.log_level}
                      </Badge>
                      <div className="flex-1">
                        <p>{log.message}</p>
                        <p className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</p>
                        {Object.keys(log.details).length > 0 && (
                          <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-x-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            <ProductionTracker />
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-4">
            <LearningModuleScheduler />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <EngagementDashboard />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <ComplianceReports />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Settings</CardTitle>
                <CardDescription>Configure dashboard preferences and system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    Settings panel coming soon. This will include voice configuration, quality settings, and automation rules.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;