import { useState } from "react";
import Header from "@/components/Header";
import CustomerOverview from "@/components/CustomerOverview";
import RekycProcess from "@/components/RekycProcess";
import QueriesComplaints from "@/components/QueriesComplaints";

type View = "overview" | "rekyc" | "queries";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("overview");

  const handleStartRekyc = () => {
    setCurrentView("rekyc");
  };

  const handleCompleteRekyc = () => {
    setCurrentView("overview");
  };

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <CustomerOverview onStartRekyc={handleStartRekyc} />;
      case "rekyc":
        return <RekycProcess onComplete={handleCompleteRekyc} />;
      case "queries":
        return <QueriesComplaints />;
      default:
        return <CustomerOverview onStartRekyc={handleStartRekyc} />;
    }
  };

  const handleNavigation = (view: string) => {
    setCurrentView(view as View);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigation} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
