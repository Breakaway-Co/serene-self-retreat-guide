import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { IntakeData } from '@/types/intake';
import { RetreatConfiguration } from '@/types/retreat';

interface AppState {
  user: {
    isAuthenticated: boolean;
    hasCompletedIntake: boolean;
    intakeData: IntakeData | null;
  };
  retreat: {
    selectedRetreatId: string | null;
    currentDay: number;
    startDate: Date | null;
    completedActivities: string[];
  };
  ui: {
    isLoading: boolean;
    theme: 'light' | 'dark';
    sidebarCollapsed: boolean;
  };
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_SIDEBAR_COLLAPSED'; payload: boolean }
  | { type: 'SET_INTAKE_DATA'; payload: IntakeData }
  | { type: 'SET_SELECTED_RETREAT'; payload: string }
  | { type: 'SET_CURRENT_DAY'; payload: number }
  | { type: 'ADD_COMPLETED_ACTIVITY'; payload: string }
  | { type: 'RESET_USER_DATA' };

const initialState: AppState = {
  user: {
    isAuthenticated: false,
    hasCompletedIntake: false,
    intakeData: null,
  },
  retreat: {
    selectedRetreatId: null,
    currentDay: 1,
    startDate: null,
    completedActivities: [],
  },
  ui: {
    isLoading: false,
    theme: 'light',
    sidebarCollapsed: false,
  },
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, ui: { ...state.ui, isLoading: action.payload } };
    case 'SET_THEME':
      return { ...state, ui: { ...state.ui, theme: action.payload } };
    case 'SET_SIDEBAR_COLLAPSED':
      return { ...state, ui: { ...state.ui, sidebarCollapsed: action.payload } };
    case 'SET_INTAKE_DATA':
      return {
        ...state,
        user: {
          ...state.user,
          hasCompletedIntake: true,
          intakeData: action.payload,
        },
      };
    case 'SET_SELECTED_RETREAT':
      return {
        ...state,
        retreat: {
          ...state.retreat,
          selectedRetreatId: action.payload,
          startDate: new Date(),
          currentDay: 1,
        },
      };
    case 'SET_CURRENT_DAY':
      return {
        ...state,
        retreat: { ...state.retreat, currentDay: action.payload },
      };
    case 'ADD_COMPLETED_ACTIVITY':
      return {
        ...state,
        retreat: {
          ...state.retreat,
          completedActivities: [...state.retreat.completedActivities, action.payload],
        },
      };
    case 'RESET_USER_DATA':
      return {
        ...state,
        user: initialState.user,
        retreat: initialState.retreat,
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    setLoading: (loading: boolean) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setIntakeData: (data: IntakeData) => void;
    setSelectedRetreat: (retreatId: string) => void;
    setCurrentDay: (day: number) => void;
    addCompletedActivity: (activityId: string) => void;
    resetUserData: () => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        // Load intake data
        const savedIntake = localStorage.getItem('intake_data');
        if (savedIntake) {
          const intakeData = JSON.parse(savedIntake);
          dispatch({ type: 'SET_INTAKE_DATA', payload: intakeData });
        }

        // Load retreat selection
        const savedRetreat = localStorage.getItem('selected_retreat');
        if (savedRetreat) {
          dispatch({ type: 'SET_SELECTED_RETREAT', payload: savedRetreat });
        }

        // Load current day
        const savedDay = localStorage.getItem('current_day');
        if (savedDay) {
          dispatch({ type: 'SET_CURRENT_DAY', payload: parseInt(savedDay, 10) });
        }

        // Load completed activities
        const savedActivities = localStorage.getItem('completed_activities');
        if (savedActivities) {
          const activities = JSON.parse(savedActivities);
          activities.forEach((activityId: string) => {
            dispatch({ type: 'ADD_COMPLETED_ACTIVITY', payload: activityId });
          });
        }

        // Load theme
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (savedTheme) {
          dispatch({ type: 'SET_THEME', payload: savedTheme });
          document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading persisted data:', error);
      }
    };

    loadPersistedData();
  }, []);

  // Persist data changes
  useEffect(() => {
    localStorage.setItem('theme', state.ui.theme);
    document.documentElement.classList.toggle('dark', state.ui.theme === 'dark');
  }, [state.ui.theme]);

  useEffect(() => {
    if (state.user.intakeData) {
      localStorage.setItem('intake_data', JSON.stringify(state.user.intakeData));
    }
  }, [state.user.intakeData]);

  useEffect(() => {
    if (state.retreat.selectedRetreatId) {
      localStorage.setItem('selected_retreat', state.retreat.selectedRetreatId);
    }
  }, [state.retreat.selectedRetreatId]);

  useEffect(() => {
    localStorage.setItem('current_day', state.retreat.currentDay.toString());
  }, [state.retreat.currentDay]);

  useEffect(() => {
    localStorage.setItem('completed_activities', JSON.stringify(state.retreat.completedActivities));
  }, [state.retreat.completedActivities]);

  const actions = {
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setTheme: (theme: 'light' | 'dark') => dispatch({ type: 'SET_THEME', payload: theme }),
    setSidebarCollapsed: (collapsed: boolean) => dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: collapsed }),
    setIntakeData: (data: IntakeData) => dispatch({ type: 'SET_INTAKE_DATA', payload: data }),
    setSelectedRetreat: (retreatId: string) => dispatch({ type: 'SET_SELECTED_RETREAT', payload: retreatId }),
    setCurrentDay: (day: number) => dispatch({ type: 'SET_CURRENT_DAY', payload: day }),
    addCompletedActivity: (activityId: string) => dispatch({ type: 'ADD_COMPLETED_ACTIVITY', payload: activityId }),
    resetUserData: () => dispatch({ type: 'RESET_USER_DATA' }),
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};