import { useNavigate } from 'react-router-dom';
import { usePersonalizedRetreat } from '@/hooks/usePersonalizedRetreat';
import RetreatSelector from '@/components/RetreatSelector';
import { useApp } from '@/contexts/AppContext';

const RetreatsPage = () => {
  const navigate = useNavigate();
  const { startRetreat } = usePersonalizedRetreat();
  const { actions } = useApp();

  const handleSelectRetreat = (retreatId: string) => {
    try {
      // Get intake data from localStorage if available
      const savedIntake = localStorage.getItem('intake_data');
      const intakeData = savedIntake ? JSON.parse(savedIntake) : undefined;

      // Start the retreat
      startRetreat(retreatId, intakeData);
      
      // Update app state
      actions.setSelectedRetreat(retreatId);

      // Navigate to daily program
      navigate('/daily');
    } catch (error) {
      console.error('Error starting retreat:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <RetreatSelector onSelectRetreat={handleSelectRetreat} />
    </div>
  );
};

export default RetreatsPage;