import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProgressData {
  [key: string]: any;
}

interface ProgressState {
  progressData: ProgressData;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  lastSavedAt: Date | null;
}

interface UseProgressPersistenceOptions {
  section: string;
  debounceMs?: number;
  enableOfflineCache?: boolean;
}

export const useProgressPersistence = ({
  section,
  debounceMs = 500,
  enableOfflineCache = true,
}: UseProgressPersistenceOptions) => {
  const { user } = useAuth();
  const [progressState, setProgressState] = useState<ProgressState>({
    progressData: {},
    currentStep: 0,
    totalSteps: 0,
    isCompleted: false,
    lastSavedAt: null,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const pendingChangesRef = useRef<Partial<ProgressState>>({});

  // Local storage keys
  const getLocalStorageKey = useCallback((suffix: string) => 
    `intake_progress_${section}_${suffix}`, [section]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save to local storage
  const saveToLocalStorage = useCallback((data: ProgressState) => {
    if (!enableOfflineCache) return;
    
    try {
      localStorage.setItem(
        getLocalStorageKey('data'),
        JSON.stringify(data)
      );
      localStorage.setItem(
        getLocalStorageKey('timestamp'),
        new Date().toISOString()
      );
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }, [enableOfflineCache, getLocalStorageKey]);

  // Load from local storage
  const loadFromLocalStorage = useCallback((): ProgressState | null => {
    if (!enableOfflineCache) return null;
    
    try {
      const data = localStorage.getItem(getLocalStorageKey('data'));
      const timestamp = localStorage.getItem(getLocalStorageKey('timestamp'));
      
      if (data && timestamp) {
        return {
          ...JSON.parse(data),
          lastSavedAt: new Date(timestamp),
        };
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
    }
    
    return null;
  }, [enableOfflineCache, getLocalStorageKey]);

  // Save to Supabase
  const saveToSupabase = useCallback(async (data: ProgressState) => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('intake_progress')
        .upsert({
          user_id: user.id,
          section,
          progress_data: data.progressData,
          current_step: data.currentStep,
          total_steps: data.totalSteps,
          is_completed: data.isCompleted,
        });

      if (error) throw error;
      
      // Clear local storage after successful sync
      if (enableOfflineCache) {
        localStorage.removeItem(getLocalStorageKey('data'));
        localStorage.removeItem(getLocalStorageKey('timestamp'));
      }
      
      toast.success('Progress saved', {
        duration: 1500,
        style: { fontSize: '0.875rem' },
      });
      
      return true;
    } catch (error) {
      console.error('Failed to save progress:', error);
      toast.error('Failed to save progress');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [user, section, enableOfflineCache, getLocalStorageKey]);

  // Load progress from Supabase
  const loadFromSupabase = useCallback(async (): Promise<ProgressState | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('intake_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('section', section)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        return {
          progressData: (data.progress_data as ProgressData) || {},
          currentStep: data.current_step || 0,
          totalSteps: data.total_steps || 0,
          isCompleted: data.is_completed || false,
          lastSavedAt: new Date(data.last_saved_at),
        };
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
    
    return null;
  }, [user, section]);

  // Debounced save function
  const debouncedSave = useCallback((updates: Partial<ProgressState>) => {
    // Merge pending changes
    pendingChangesRef.current = { ...pendingChangesRef.current, ...updates };
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout
    saveTimeoutRef.current = setTimeout(async () => {
      const updatedState = { ...progressState, ...pendingChangesRef.current };
      
      // Save to local storage immediately for offline support
      saveToLocalStorage(updatedState);
      
      // Try to save to Supabase if online
      if (isOnline && user) {
        const success = await saveToSupabase(updatedState);
        if (success) {
          setProgressState(prev => ({ ...prev, lastSavedAt: new Date() }));
        }
      }
      
      // Clear pending changes
      pendingChangesRef.current = {};
    }, debounceMs);
  }, [progressState, saveToLocalStorage, saveToSupabase, isOnline, user, debounceMs]);

  // Update progress
  const updateProgress = useCallback((updates: Partial<ProgressState>) => {
    setProgressState(prev => ({ ...prev, ...updates }));
    debouncedSave(updates);
  }, [debouncedSave]);

  // Sync offline changes when coming back online
  useEffect(() => {
    if (isOnline && user && enableOfflineCache) {
      const localData = loadFromLocalStorage();
      if (localData) {
        saveToSupabase(localData);
      }
    }
  }, [isOnline, user, enableOfflineCache, loadFromLocalStorage, saveToSupabase]);

  // Initial load
  useEffect(() => {
    const loadInitialProgress = async () => {
      setIsLoading(true);
      
      let loadedData: ProgressState | null = null;
      
      // Try to load from Supabase first if online and authenticated
      if (isOnline && user) {
        loadedData = await loadFromSupabase();
      }
      
      // Fallback to local storage if no online data
      if (!loadedData && enableOfflineCache) {
        loadedData = loadFromLocalStorage();
      }
      
      if (loadedData) {
        setProgressState(loadedData);
      }
      
      setIsLoading(false);
    };
    
    loadInitialProgress();
  }, [user, isOnline, loadFromSupabase, loadFromLocalStorage, enableOfflineCache]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    progressState,
    updateProgress,
    isLoading,
    isSaving,
    isOnline,
  };
};