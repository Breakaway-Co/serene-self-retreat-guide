import React from 'react';
import Progress from '@/components/Progress';
import { useApp } from '@/contexts/AppContext';
import { usePersonalizedRetreat } from '@/hooks/usePersonalizedRetreat';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgressPage: React.FC = () => {
  const { state } = useApp();
  const { currentRetreat } = usePersonalizedRetreat();
  const navigate = useNavigate();

  if (!state.retreat.selectedRetreatId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Alert>
          <AlertDescription>
            Please select a retreat first to view progress.
          </AlertDescription>
        </Alert>
        <Button 
          onClick={() => navigate('/')} 
          className="mt-4"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Choose Retreat
        </Button>
      </div>
    );
  }

  if (!currentRetreat) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Progress retreat={currentRetreat} />
    </div>
  );
};

export default ProgressPage;