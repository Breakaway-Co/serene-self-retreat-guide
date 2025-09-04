import React from 'react';
import RetreatSelector from "@/components/RetreatSelector";
import RetreatOverview from "@/components/RetreatOverview";
import { usePersonalizedRetreat } from "@/hooks/usePersonalizedRetreat";
import { useApp } from "@/contexts/AppContext";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const Index = () => {
  const { state, actions } = useApp();
  const { currentRetreat, startRetreat } = usePersonalizedRetreat();

  const handleRetreatSelection = (retreatId: string) => {
    const intakeData = state.user.intakeData;
    startRetreat(retreatId, intakeData || undefined);
    actions.setSelectedRetreat(retreatId);
  };

  // Show retreat selector if no retreat is selected
  if (!state.retreat.selectedRetreatId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <RetreatSelector onSelectRetreat={handleRetreatSelection} />
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
      <RetreatOverview retreat={currentRetreat} />
    </div>
  );
};

export default Index;
