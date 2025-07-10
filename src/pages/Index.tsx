import { useState } from "react";
import RetreatNavigation from "@/components/RetreatNavigation";
import RetreatOverview from "@/components/RetreatOverview";
import DailyProgram from "@/components/DailyProgram";
import MealPlan from "@/components/MealPlan";
import Resources from "@/components/Resources";
import Progress from "@/components/Progress";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <RetreatOverview />;
      case "daily-program":
        return <DailyProgram />;
      case "meal-plan":
        return <MealPlan />;
      case "resources":
        return <Resources />;
      case "progress":
        return <Progress />;
      default:
        return <RetreatOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <RetreatNavigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Index;
