import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Accessibility, 
  Type, 
  Volume2, 
  Eye, 
  Phone, 
  MessageSquare,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  audioDescriptions: boolean;
  screenReaderMode: boolean;
}

export const AccessibilityEnhancements: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 16,
    highContrast: false,
    reducedMotion: false,
    audioDescriptions: false,
    screenReaderMode: false
  });

  const [showCrisisResources, setShowCrisisResources] = useState(false);

  useEffect(() => {
    // Load accessibility settings from localStorage
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Apply settings to document
    applyAccessibilitySettings(settings);
  }, []);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
    applyAccessibilitySettings(newSettings);
  };

  const applyAccessibilitySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${settings.fontSize}px`;
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Screen reader mode
    if (settings.screenReaderMode) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }
  };

  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 crisis support',
      website: 'https://suicidepreventionlifeline.org'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: '24/7 text-based crisis support',
      website: 'https://crisistextline.org'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Mental health and substance abuse support',
      website: 'https://www.samhsa.gov/find-help/national-helpline'
    },
    {
      name: 'International Association for Suicide Prevention',
      phone: 'Various by country',
      description: 'Global crisis resources',
      website: 'https://www.iasp.info/resources/Crisis_Centres'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Crisis Resources Alert */}
      <Alert className="border-destructive/50 bg-destructive/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>If you're experiencing a mental health crisis, get immediate help.</span>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowCrisisResources(!showCrisisResources)}
          >
            Crisis Resources
          </Button>
        </AlertDescription>
      </Alert>

      {/* Crisis Resources */}
      {showCrisisResources && (
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Phone className="h-5 w-5" />
              Crisis Support Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crisisResources.map((resource, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{resource.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span className="font-mono text-sm">{resource.phone}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(resource.website, '_blank')}
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Visit Website
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accessibility Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <label className="text-sm font-medium">Font Size: {settings.fontSize}px</label>
            </div>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSetting('fontSize', value)}
              min={12}
              max={24}
              step={1}
              className="w-full"
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <div>
                <label className="text-sm font-medium">High Contrast Mode</label>
                <p className="text-xs text-muted-foreground">
                  Increases contrast for better visibility
                </p>
              </div>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSetting('highContrast', checked)}
            />
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <div>
                <label className="text-sm font-medium">Reduce Motion</label>
                <p className="text-xs text-muted-foreground">
                  Minimizes animations and transitions
                </p>
              </div>
            </div>
            <Switch
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
            />
          </div>

          {/* Audio Descriptions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <div>
                <label className="text-sm font-medium">Audio Descriptions</label>
                <p className="text-xs text-muted-foreground">
                  Enable audio descriptions for activities
                </p>
              </div>
            </div>
            <Switch
              checked={settings.audioDescriptions}
              onCheckedChange={(checked) => updateSetting('audioDescriptions', checked)}
            />
          </div>

          {/* Screen Reader Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <div>
                <label className="text-sm font-medium">Screen Reader Optimized</label>
                <p className="text-xs text-muted-foreground">
                  Optimizes interface for screen readers
                </p>
              </div>
            </div>
            <Switch
              checked={settings.screenReaderMode}
              onCheckedChange={(checked) => updateSetting('screenReaderMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Navigation Help */}
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Navigate elements:</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Tab</kbd>
            </div>
            <div className="flex justify-between">
              <span>Activate element:</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Space / Enter</kbd>
            </div>
            <div className="flex justify-between">
              <span>Close dialogs:</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Escape</kbd>
            </div>
            <div className="flex justify-between">
              <span>Skip to main content:</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + S</kbd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};