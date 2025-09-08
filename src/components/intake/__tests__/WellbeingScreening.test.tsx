import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import WellbeingScreening from '../WellbeingScreening';
import { IntakeData } from '@/types/intake';
import { useAuth } from '@/contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            maybeSingle: vi.fn(() => Promise.resolve({ data: null, error: null })),
          })),
        })),
      })),
      upsert: vi.fn(() => Promise.resolve({ error: null })),
    })),
  },
}));

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock progress persistence hook
vi.mock('@/hooks/useProgressPersistence', () => ({
  useProgressPersistence: () => ({
    progressState: {
      progressData: {},
      currentStep: 0,
      totalSteps: 0,
      isCompleted: false,
      lastSavedAt: null,
    },
    updateProgress: vi.fn(),
    isLoading: false,
    isSaving: false,
    isOnline: true,
  }),
}));

// Mock useAuth hook
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    user: { id: 'test-user-id', email: 'test@example.com' },
    loading: false,
  })),
}));

const defaultProps = {
  data: { wellbeingScreening: {} } as IntakeData,
  updateData: vi.fn(),
  onNext: vi.fn(),
  onPrevious: vi.fn(),
  isFirst: false,
  isLast: false,
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('PHQ-9 Depression Screening', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('PHQ-9 Form Rendering', () => {
    it('should render all 9 PHQ-9 questions with 4 response options each', async () => {
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      // Wait for component to load
      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Check that all 9 questions are present
      const phq9Questions = [
        'Little interest or pleasure in doing things',
        'Feeling down, depressed, or hopeless',
        'Trouble falling or staying asleep, or sleeping too much',
        'Feeling tired or having little energy',
        'Poor appetite or overeating',
        'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
        'Trouble concentrating on things, such as reading the newspaper or watching television',
        'Moving or speaking so slowly that other people could have noticed',
        'Thoughts that you would be better off dead, or of hurting yourself',
      ];

      phq9Questions.forEach((question, index) => {
        expect(screen.getByText(`${index + 1}. ${question}`)).toBeInTheDocument();
      });

      // Check that all 4 response options are present for each question
      const responseOptions = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];
      
      responseOptions.forEach(option => {
        const elements = screen.getAllByText(option);
        expect(elements).toHaveLength(9); // Should appear for each of the 9 questions
      });
    });

    it('should render radio buttons that are clickable and functional', async () => {
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Find the first question's "Not at all" radio button
      const firstQuestionRadios = screen.getAllByDisplayValue('0');
      const firstRadio = firstQuestionRadios[0];

      expect(firstRadio).toBeInTheDocument();
      expect(firstRadio).toHaveAttribute('type', 'radio');
      
      // Click the radio button
      fireEvent.click(firstRadio);
      
      // Check that it's selected
      expect(firstRadio).toBeChecked();
    });

    it('should display progress indicators', async () => {
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Assessment Progress')).toBeInTheDocument();
        expect(screen.getByText('Tool 1 of 2')).toBeInTheDocument();
        expect(screen.getByText('0 of 9 questions')).toBeInTheDocument();
      });
    });
  });

  describe('Response Selection and State Management', () => {
    it('should update state when radio buttons are selected', async () => {
      const updateDataMock = vi.fn();
      
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} updateData={updateDataMock} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Select "Several days" for first question
      const severalDaysRadios = screen.getAllByDisplayValue('1');
      fireEvent.click(severalDaysRadios[0]);

      // Check that updateData was called
      await waitFor(() => {
        expect(updateDataMock).toHaveBeenCalled();
      });
    });

    it('should calculate and display score when all questions are answered', async () => {
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Answer all 9 questions with "Not at all" (value 0)
      const notAtAllRadios = screen.getAllByDisplayValue('0');
      
      act(() => {
        notAtAllRadios.slice(0, 9).forEach(radio => {
          fireEvent.click(radio);
        });
      });

      // Wait for score to appear
      await waitFor(() => {
        expect(screen.getByText('Your Score')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('Minimal')).toBeInTheDocument();
      });
    });

    it('should enable Next button only when current tool is complete', async () => {
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Next button should be disabled initially
      const nextButton = screen.getByRole('button', { name: /next tool/i });
      expect(nextButton).toBeDisabled();

      // Answer all questions
      const notAtAllRadios = screen.getAllByDisplayValue('0');
      
      act(() => {
        notAtAllRadios.slice(0, 9).forEach(radio => {
          fireEvent.click(radio);
        });
      });

      // Next button should be enabled
      await waitFor(() => {
        expect(nextButton).toBeEnabled();
      });
    });
  });

  describe('Progress Persistence', () => {
    it('should show saving indicator when authenticated', async () => {
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Check for online status indicator
      const wifiIcon = document.querySelector('[data-lucide="wifi"]');
      expect(wifiIcon).toBeInTheDocument();
    });

    it('should show offline indicator when offline', async () => {
      // Mock offline state
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });

      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Check for offline status indicator
      const wifiOffIcon = document.querySelector('[data-lucide="wifi-off"]');
      expect(wifiOffIcon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and structure', async () => {
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Check for proper radio group labeling
      const radioGroups = document.querySelectorAll('[role="radiogroup"]');
      expect(radioGroups.length).toBe(9); // One for each question

      // Check that radio groups have aria-labelledby
      radioGroups.forEach(group => {
        expect(group).toHaveAttribute('aria-labelledby');
        expect(group).toHaveAttribute('aria-required', 'true');
      });

      // Check that labels are properly associated
      const labels = screen.getAllByText('Not at all');
      labels.forEach(label => {
        expect(label.closest('label')).toHaveAttribute('for');
      });
    });

    it('should be keyboard navigable', async () => {
      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Focus first radio button
      const firstRadio = screen.getAllByDisplayValue('0')[0];
      firstRadio.focus();
      expect(document.activeElement).toBe(firstRadio);

      // Test arrow key navigation within radio group
      fireEvent.keyDown(firstRadio, { key: 'ArrowDown' });
      
      // Should move to next radio button
      const nextRadio = screen.getAllByDisplayValue('1')[0];
      expect(document.activeElement).toBe(nextRadio);
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should render properly on mobile viewports', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <TestWrapper>
          <WellbeingScreening {...defaultProps} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Check that radio buttons are properly spaced and clickable
      const radioButtons = screen.getAllByDisplayValue('0');
      radioButtons.slice(0, 3).forEach(radio => {
        expect(radio).toBeVisible();
        // Check that parent has proper spacing
        const parent = radio.closest('.flex');
        expect(parent).toHaveClass('space-x-2');
      });
    });
  });

  describe('Data Restoration', () => {
    it('should restore previously saved responses on component mount', async () => {
      // Mock progress with saved data
      const savedData = {
        phq9Responses: [1, 2, 0, 1, 2, 0, 1, 2, 0],
        phq9Score: 9,
      };

      vi.doMock('@/hooks/useProgressPersistence', () => ({
        useProgressPersistence: () => ({
          progressState: {
            progressData: savedData,
            currentStep: 9,
            totalSteps: 16,
            isCompleted: false,
            lastSavedAt: new Date(),
          },
          updateProgress: vi.fn(),
          isLoading: false,
          isSaving: false,
          isOnline: true,
        }),
      }));

      const propsWithData = {
        ...defaultProps,
        data: { wellbeingScreening: savedData } as IntakeData,
      };

      render(
        <TestWrapper>
          <WellbeingScreening {...propsWithData} />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('PHQ-9 (Depression Screening)')).toBeInTheDocument();
      });

      // Check that score is displayed
      await waitFor(() => {
        expect(screen.getByText('Your Score')).toBeInTheDocument();
        expect(screen.getByText('9')).toBeInTheDocument();
      });
    });
  });
});