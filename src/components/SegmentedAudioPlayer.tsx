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
  Download,
  Clock,
  Headphones
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioSegment {
  text: string;
  pauseAfterSeconds?: number;
}

interface SegmentedAudioPlayerProps {
  audioUrl: string;
  segments: AudioSegment[];
  sessionName: string;
  onComplete?: () => void;
}

const SegmentedAudioPlayer: React.FC<SegmentedAudioPlayerProps> = ({
  audioUrl,
  segments,
  sessionName,
  onComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [pauseCountdown, setPauseCountdown] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const segmentTimesRef = useRef<number[]>([]);
  const { toast } = useToast();

  // Calculate cumulative speaking times for each segment
  useEffect(() => {
    const times: number[] = [];
    let cumulative = 0;
    
    segments.forEach(segment => {
      // Estimate speaking time: ~150 words per minute, ~2.5 words per second
      const wordCount = segment.text.split(' ').length;
      const speakingTime = wordCount / 2.5;
      cumulative += speakingTime;
      times.push(cumulative);
    });
    
    segmentTimesRef.current = times;
  }, [segments]);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPaused) {
        // Resume from pause
        setIsPaused(false);
        audioRef.current.play();
        setIsPlaying(true);
      } else if (isPlaying) {
        // Pause playback
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Start playback
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
      setIsPaused(false);
      setCurrentTime(0);
      setCurrentSegment(0);
      clearPauseTimer();
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

  const clearPauseTimer = () => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setPauseCountdown(0);
  };

  const startPause = (segmentIndex: number) => {
    const segment = segments[segmentIndex];
    const pauseDuration = segment.pauseAfterSeconds || 0;
    
    if (pauseDuration > 0) {
      setIsPaused(true);
      setIsPlaying(false);
      setPauseCountdown(pauseDuration);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Countdown interval
      countdownIntervalRef.current = setInterval(() => {
        setPauseCountdown(prev => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Resume after pause
      pauseTimerRef.current = setTimeout(() => {
        setIsPaused(false);
        setPauseCountdown(0);
        if (audioRef.current && isPlaying) {
          audioRef.current.play();
        }
        setCurrentSegment(segmentIndex + 1);
      }, pauseDuration * 1000);
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

    const updateTime = () => {
      const time = audio.currentTime;
      setCurrentTime(time);

      // Check if we've reached a segment boundary
      if (isPlaying && !isPaused && segmentTimesRef.current.length > 0) {
        for (let i = currentSegment; i < segmentTimesRef.current.length; i++) {
          const segmentEndTime = segmentTimesRef.current[i];
          // Allow 0.5 second tolerance
          if (time >= segmentEndTime - 0.5 && time <= segmentEndTime + 0.5) {
            startPause(i);
            break;
          }
        }
      }
    };

    const updateDuration = () => setDuration(audio.duration);
    
    const handleEnded = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
      setCurrentSegment(0);
      clearPauseTimer();
      onComplete?.();
      toast({
        title: 'Session Complete',
        description: 'Your guided practice is finished. Well done!',
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
      clearPauseTimer();
    };
  }, [isPlaying, isPaused, currentSegment, onComplete]);

  return (
    <Card className="bg-gradient-to-br from-healing/5 to-calm/5 border-healing/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-healing">
          <Headphones className="w-5 h-5" />
          Guided Audio with Timed Pauses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Audio Controls */}
          <div className="p-4 rounded-lg bg-white/50 border border-healing/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{sessionName}</h3>
                <p className="text-sm text-muted-foreground">
                  Duration: {formatTime(duration)}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {segments.length} Segments
              </Badge>
            </div>

            {/* Pause Countdown */}
            {isPaused && pauseCountdown > 0 && (
              <Alert className="mb-4 border-healing/40 bg-healing/5">
                <Clock className="w-4 h-4 text-healing" />
                <AlertDescription className="text-healing">
                  Pausing for reflection... Resuming in {pauseCountdown}s
                </AlertDescription>
              </Alert>
            )}

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

              <Button
                onClick={() => window.open(audioUrl, '_blank')}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Session Info */}
          <div className="p-3 rounded bg-muted/50 text-sm">
            <p className="font-medium mb-2">Session includes real-time pauses for reflection</p>
            <div className="text-xs text-muted-foreground space-y-1">
              {segments.map((seg, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>Segment {idx + 1}</span>
                  {seg.pauseAfterSeconds && seg.pauseAfterSeconds > 0 && (
                    <span className="text-healing">Pause: {seg.pauseAfterSeconds}s</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SegmentedAudioPlayer;
