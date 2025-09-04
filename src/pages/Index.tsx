import { useState, useEffect } from "react";
import RetreatNavigation from "@/components/RetreatNavigation";
import RetreatOverview from "@/components/RetreatOverview";
import DailyProgram from "@/components/DailyProgram";
import MealPlan from "@/components/MealPlan";
import Resources from "@/components/Resources";
import Progress from "@/components/Progress";
import RetreatSelector from "@/components/RetreatSelector";
import { usePersonalizedRetreat } from "@/hooks/usePersonalizedRetreat";
import { IntakeData } from "@/types/intake";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [hasSelectedRetreat, setHasSelectedRetreat] = useState(false);
  const { currentRetreat, startRetreat } = usePersonalizedRetreat();

  useEffect(() => {
    // Check if user has completed intake and needs to select retreat
    const savedIntake = localStorage.getItem('intake_data');
    const savedRetreat = localStorage.getItem('selected_retreat');
    
    if (savedIntake && savedRetreat) {
      const intakeData: IntakeData = JSON.parse(savedIntake);
      startRetreat(savedRetreat, intakeData);
      setHasSelectedRetreat(true);
    }
  }, [startRetreat]);

  const handleRetreatSelection = (retreatId: string) => {
    const savedIntake = localStorage.getItem('intake_data');
    const intakeData = savedIntake ? JSON.parse(savedIntake) : undefined;
    
    startRetreat(retreatId, intakeData);
    localStorage.setItem('selected_retreat', retreatId);
    setHasSelectedRetreat(true);
  };

  const renderActiveSection = () => {
    if (!currentRetreat) return null;
    
    switch (activeSection) {
      case "overview":
        return <RetreatOverview retreat={currentRetreat} />;
      case "daily-program":
        return <DailyProgram retreat={currentRetreat} />;
      case "meal-plan":
        return <MealPlan retreat={currentRetreat} />;
      case "resources":
        return <Resources retreat={currentRetreat} />;
      case "progress":
        return <Progress retreat={currentRetreat} />;
      default:
        return <RetreatOverview retreat={currentRetreat} />;
    }
  };

  // Show retreat selector if no retreat is selected
  if (!hasSelectedRetreat || !currentRetreat) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <RetreatSelector onSelectRetreat={handleRetreatSelection} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <RetreatNavigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            retreat={currentRetreat}
          />
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Index;
