import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Download,
  Clock,
  Headphones,
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SeamlessAudioPlayerProps {
  guideId: string;
  guideName: string;
  activityType: string;
  instructions?: string[];
  onComplete?: () => void;
  customizations?: {
    intensity?: 'gentle' | 'moderate' | 'intensive';
    duration?: 'short' | 'medium' | 'long';
    focus?: string;
  };
}

interface AudioSession {
  id: string;
  session_id: string;
  session_name: string;
  audio_url?: string;
  duration_seconds?: number;
  status: string;
  metadata: any;
}

const SeamlessAudioPlayer: React.FC<SeamlessAudioPlayerProps> = ({
  guideId,
  guideName,
  activityType,
  instructions,
  onComplete,
  customizations
}) => {
  const [audioSession, setAudioSession] = useState<AudioSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const generateSeamlessAudio = async () => {
    try {
      setIsLoading(true);
      
      toast({
        title: 'Generating Your Audio',
        description: 'Creating a seamless, uninterrupted meditation experience...'
      });

      const { data, error } = await supabase.functions.invoke('process-activity-guide', {
        body: {
          guideId,
          guideName,
          activityType,
          instructions,
          customizations
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success) {
        // If audio is ready immediately
        if (data.audioUrl && data.sessionId) {
          setAudioSession({
            id: data.sessionId,
            session_id: data.sessionId,
            session_name: guideName,
            audio_url: data.audioUrl,
            duration_seconds: data.duration ?? undefined,
            status: 'completed',
            metadata: data.metadata ?? {},
          });
          toast({
            title: 'Audio Ready!',
            description: 'Your seamless meditation session is ready to play.'
          });
        } else if (data.sessionId) {
          // Otherwise poll the DB until it completes
          pollForCompletion(data.sessionId);
        } else {
          throw new Error('Unexpected response from audio generator');
        }
      } else {
        throw new Error(data?.error || 'Failed to generate audio');
      }
    } catch (error: any) {
      console.error('Error generating audio:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate audio. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const pollForCompletion = async (sessionId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const { data, error } = await supabase
          .from('audio_sessions')
          .select('*')
          .eq('id', sessionId)
          .single();

        if (error) {
          clearInterval(pollInterval);
          throw error;
        }

        if (data.status === 'completed') {
          clearInterval(pollInterval);
          setAudioSession(data);
          setIsLoading(false);
          toast({
            title: 'Audio Ready!',
            description: 'Your seamless meditation session is ready to play.'
          });
        } else if (data.status === 'failed') {
          clearInterval(pollInterval);
          setIsLoading(false);
          throw new Error('Audio generation failed');
        }
      } catch (error: any) {
        clearInterval(pollInterval);
        setIsLoading(false);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      }
    }, 2000);

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      setIsLoading(false);
    }, 300000);
  };

  const handlePlay = () => {
    if (audioRef.current && audioSession?.audio_url) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleVolumeToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onComplete?.();
      toast({
        title: 'Session Complete',
        description: 'Your meditation practice is finished. Well done!',
        duration: 5000
      });
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioSession, onComplete]);

  return (
    <Card className="bg-gradient-to-br from-healing/5 to-calm/5 border-healing/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-healing">
          <Headphones className="w-5 h-5" />
          Seamless Audio Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!audioSession ? (
          <div className="text-center space-y-4">
            <div className="p-6 rounded-lg bg-white/50 border border-healing/20">
              <Heart className="w-8 h-8 text-healing mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">{guideName}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Transform your practice into a single, uninterrupted journey. No breaks, no manual steps - 
                just pure, flowing guidance from start to finish.
              </p>
              
              {customizations && (
                <div className="flex justify-center gap-2 mb-4">
                  <Badge variant="outline">{customizations.intensity || 'moderate'}</Badge>
                  <Badge variant="outline">{customizations.duration || 'medium'}</Badge>
                </div>
              )}
            </div>

            <Button 
              onClick={generateSeamlessAudio} 
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Seamless Audio...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Create Seamless Experience
                </>
              )}
            </Button>

            {isLoading && (
              <Alert>
                <Clock className="w-4 h-4" />
                <AlertDescription>
                  Creating your personalized audio session. This may take 1-2 minutes to ensure the highest quality.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Audio Controls */}
            <div className="p-4 rounded-lg bg-white/50 border border-healing/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{audioSession.session_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Duration: {audioSession.duration_seconds ? formatTime(audioSession.duration_seconds) : 'Unknown'}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Ready to Play
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-4">
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  onClick={handlePlay}
                  size="lg"
                  className="rounded-full w-16 h-16"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
                
                <Button
                  onClick={handleStop}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  <Square className="w-4 h-4" />
                </Button>

                <Button
                  onClick={handleVolumeToggle}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>

                {audioSession.audio_url && (
                  <Button
                    onClick={() => window.open(audioSession.audio_url, '_blank')}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Session Info */}
            {audioSession.metadata && Object.keys(audioSession.metadata).length > 0 && (
              <div className="p-3 rounded bg-muted/50 text-sm">
                <p className="font-medium mb-1">Session Details:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  {audioSession.metadata.stepCount && (
                    <span>Steps: {audioSession.metadata.stepCount}</span>
                  )}
                  {audioSession.metadata.breathCycles && (
                    <span>Breath Cycles: {audioSession.metadata.breathCycles}</span>
                  )}
                  {audioSession.metadata.wordCount && (
                    <span>Word Count: {audioSession.metadata.wordCount}</span>
                  )}
                  {audioSession.metadata.fileSize && (
                    <span>File Size: {Math.round(audioSession.metadata.fileSize / 1024 / 1024 * 100) / 100} MB</span>
                  )}
                </div>
              </div>
            )}

            {/* Hidden Audio Element */}
            {audioSession.audio_url && (
              <audio
                ref={audioRef}
                src={audioSession.audio_url}
                preload="metadata"
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeamlessAudioPlayer;