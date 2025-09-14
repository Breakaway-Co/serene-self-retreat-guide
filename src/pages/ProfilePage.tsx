import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Shield, Heart, Calendar, Settings, Save, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  demographics_data: any;
  accessibility_needs: string[];
}

interface UserPreferences {
  id: string;
  user_id: string;
  time_commitment_preference: string;
  intensity_preference: string;
  preferred_modalities: string[];
  accessibility_needs: string[];
  trigger_warnings: string[];
  notification_settings: any;
  privacy_settings: any;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    age_range: '',
    location: '',
    emergency_contact: '',
    emergency_phone: '',
    time_commitment: '',
    intensity: '',
    modalities: [] as string[],
    accessibility: [] as string[],
    triggers: [] as string[],
    notifications: {
      daily_reminders: true,
      progress_updates: true,
      crisis_alerts: true,
      retreat_updates: false
    },
    privacy: {
      share_progress: false,
      anonymous_feedback: true,
      research_participation: false
    }
  });

  const modalityOptions = [
    'Mindfulness Meditation',
    'Cognitive Behavioral Therapy (CBT)',
    'Dialectical Behavior Therapy (DBT)',
    'EMDR',
    'Somatic Therapy',
    'Art Therapy',
    'Music Therapy',
    'Movement Therapy',
    'Journaling',
    'Nature Therapy'
  ];

  const accessibilityOptions = [
    'Closed Captions',
    'Audio Descriptions',
    'Large Text',
    'High Contrast',
    'Screen Reader Compatible',
    'Keyboard Navigation',
    'Reduced Motion',
    'Extended Time Limits'
  ];

  const triggerWarnings = [
    'Graphic Content',
    'Loud Sounds',
    'Flashing Lights',
    'Mentions of Self-Harm',
    'Substance Use Content',
    'Relationship Violence',
    'Medical Procedures',
    'Loss and Grief'
  ];

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      setIsLoading(true);

      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Load preferences
      const { data: preferencesData, error: preferencesError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (preferencesError && preferencesError.code !== 'PGRST116') {
        throw preferencesError;
      }

      setProfile(profileData);
      setPreferences(preferencesData);

      // Populate form
      if (profileData || preferencesData) {
        setFormData({
          full_name: profileData?.full_name || '',
          age_range: (profileData?.demographics_data as any)?.age_range || '',
          location: (profileData?.demographics_data as any)?.location || '',
          emergency_contact: (profileData?.demographics_data as any)?.emergency_contact || '',
          emergency_phone: (profileData?.demographics_data as any)?.emergency_phone || '',
          time_commitment: preferencesData?.time_commitment_preference || '',
          intensity: preferencesData?.intensity_preference || '',
          modalities: preferencesData?.preferred_modalities || [],
          accessibility: preferencesData?.accessibility_needs || [],
          triggers: preferencesData?.trigger_warnings || [],
          notifications: (preferencesData?.notification_settings as any) || {
            daily_reminders: true,
            progress_updates: true,
            crisis_alerts: true,
            retreat_updates: false
          },
          privacy: (preferencesData?.privacy_settings as any) || {
            share_progress: false,
            anonymous_feedback: true,
            research_participation: false
          }
        });
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast({
        title: 'Loading Error',
        description: 'Failed to load profile data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      // Update or create profile
      const profileData = {
        id: user?.id,
        email: user?.email,
        full_name: formData.full_name,
        demographics_data: {
          age_range: formData.age_range,
          location: formData.location,
          emergency_contact: formData.emergency_contact,
          emergency_phone: formData.emergency_phone
        },
        accessibility_needs: formData.accessibility
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(profileData);

      if (profileError) throw profileError;

      // Update or create preferences
      const preferencesData = {
        user_id: user?.id,
        time_commitment_preference: formData.time_commitment,
        intensity_preference: formData.intensity,
        preferred_modalities: formData.modalities,
        accessibility_needs: formData.accessibility,
        trigger_warnings: formData.triggers,
        notification_settings: formData.notifications,
        privacy_settings: formData.privacy
      };

      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert(preferencesData);

      if (preferencesError) throw preferencesError;

      toast({
        title: 'Profile Updated',
        description: 'Your profile and preferences have been saved successfully.'
      });

      await loadProfileData();
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Save Error',
        description: 'Failed to save profile changes',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleArrayToggle = (field: 'modalities' | 'accessibility' | 'triggers', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 animate-pulse" />
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
          <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="preferences">Treatment Preferences</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age-range">Age Range</Label>
                    <Select
                      value={formData.age_range}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, age_range: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35-44">35-44</SelectItem>
                        <SelectItem value="45-54">45-54</SelectItem>
                        <SelectItem value="55-64">55-64</SelectItem>
                        <SelectItem value="65+">65+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, State/Country"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Emergency Contact Information</h4>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      This information is kept strictly confidential and will only be used in case of emergency.
                    </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-contact">Emergency Contact Name</Label>
                      <Input
                        id="emergency-contact"
                        value={formData.emergency_contact}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                        placeholder="Contact person's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
                      <Input
                        id="emergency-phone"
                        value={formData.emergency_phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergency_phone: e.target.value }))}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Treatment Preferences */}
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Treatment Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time Commitment</Label>
                    <Select
                      value={formData.time_commitment}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, time_commitment: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time commitment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal (15-30 min/day)</SelectItem>
                        <SelectItem value="moderate">Moderate (30-60 min/day)</SelectItem>
                        <SelectItem value="intensive">Intensive (60+ min/day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Intensity Preference</Label>
                    <Select
                      value={formData.intensity}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, intensity: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gentle">Gentle</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="intensive">Intensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Preferred Therapeutic Modalities</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {modalityOptions.map((modality) => (
                      <div
                        key={modality}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.modalities.includes(modality)
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-primary/50'
                        }`}
                        onClick={() => handleArrayToggle('modalities', modality)}
                      >
                        <p className="text-sm font-medium">{modality}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility */}
          <TabsContent value="accessibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Accessibility Needs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Accessibility Features</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {accessibilityOptions.map((option) => (
                      <div
                        key={option}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.accessibility.includes(option)
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-primary/50'
                        }`}
                        onClick={() => handleArrayToggle('accessibility', option)}
                      >
                        <p className="text-sm font-medium">{option}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Content Trigger Warnings</Label>
                  <p className="text-sm text-muted-foreground">
                    Select content types you'd like to be warned about before viewing
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {triggerWarnings.map((trigger) => (
                      <div
                        key={trigger}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.triggers.includes(trigger)
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-muted hover:border-orange-300'
                        }`}
                        onClick={() => handleArrayToggle('triggers', trigger)}
                      >
                        <p className="text-sm font-medium">{trigger}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(formData.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>
                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {key === 'daily_reminders' && 'Receive daily reminders for activities'}
                        {key === 'progress_updates' && 'Get updates on your progress'}
                        {key === 'crisis_alerts' && 'Important crisis intervention notifications'}
                        {key === 'retreat_updates' && 'News about new retreats and features'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [key]: checked }
                        }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(formData.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>
                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {key === 'share_progress' && 'Allow progress to be shared with care team'}
                        {key === 'anonymous_feedback' && 'Provide anonymous feedback for research'}
                        {key === 'research_participation' && 'Participate in research studies (optional)'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, [key]: checked }
                        }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;