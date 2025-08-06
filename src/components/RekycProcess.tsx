import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle, ArrowRight, Home, MapPin, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = "authentication" | "risk-assessment" | "address-selection" | "maker" | "checker" | "complete";
type RiskLevel = "low" | "medium" | "high";

interface CustomerData {
  mobile: string;
  riskLevel: RiskLevel;
  hasChangeRequest: boolean;
  addresses: {
    permanent: string;
    correspondence: string;
  };
}

const RekycProcess = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState<Step>("authentication");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [customerData] = useState<CustomerData>({
    mobile: "+91 9876543210",
    riskLevel: "low",
    hasChangeRequest: false,
    addresses: {
      permanent: "123, MG Road, Bangalore, Karnataka - 560001",
      correspondence: "456, HSR Layout, Bangalore, Karnataka - 560102"
    }
  });
  const { toast } = useToast();

  const isLowRiskNoChange = customerData.riskLevel === "low" && !customerData.hasChangeRequest;
  const showBothAddresses = isLowRiskNoChange;

  const handleAuthentication = () => {
    setCurrentStep("risk-assessment");
  };

  const handleRiskAssessment = () => {
    setCurrentStep("address-selection");
  };

  const handleMakerStep = () => {
    if (selectedAction === "confirm") {
      setCurrentStep("checker");
    } else if (selectedAction === "change") {
      setCurrentStep("complete");
      toast({
        title: "Branch Visit Required",
        description: "Please visit your nearest branch to change your address or other details.",
        variant: "default",
      });
    }
  };

  const handleCheckerStep = () => {
    setCurrentStep("complete");
    toast({
      title: "ReKYC Completed Successfully",
      description: "Your details have been updated and passed to LMS.",
      variant: "default",
    });
    setTimeout(() => onComplete(), 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case "authentication":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <span>Customer Authentication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Registered Mobile Number</p>
                <p className="font-mono text-lg">{customerData.mobile}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Please verify your identity using your registered mobile number.
              </p>
              <Button onClick={handleAuthentication} className="w-full">
                Authenticate
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case "risk-assessment":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment & ReKYC Check</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm font-medium">Risk Level</p>
                  <Badge variant={customerData.riskLevel === "low" ? "success" : customerData.riskLevel === "medium" ? "warning" : "destructive"}>
                    {customerData.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm font-medium">Change Request</p>
                  <Badge variant={customerData.hasChangeRequest ? "warning" : "success"}>
                    {customerData.hasChangeRequest ? "YES" : "NO"}
                  </Badge>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Assessment Result:</strong> {isLowRiskNoChange 
                    ? "Low risk with no change request - Both addresses will be shown"
                    : "Medium/High risk or change request detected - Only correspondence address will be shown"
                  }
                </p>
              </div>
              <Button onClick={handleRiskAssessment} className="w-full">
                Proceed to Address Selection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case "address-selection":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-primary" />
                <span>Address Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please review and verify your address information:
              </p>
              
              {showBothAddresses ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Home className="w-5 h-5 text-primary" />
                      <span className="font-medium">Permanent Address</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{customerData.addresses.permanent}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-medium">Correspondence Address</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{customerData.addresses.correspondence}</p>
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">Correspondence Address</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{customerData.addresses.correspondence}</p>
                </div>
              )}
              
              <Button onClick={() => setCurrentStep("maker")} className="w-full">
                Continue to Verification
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case "maker":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Maker Step - Customer Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please select one of the following options:
              </p>
              <RadioGroup value={selectedAction} onValueChange={setSelectedAction}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50">
                  <RadioGroupItem value="confirm" id="confirm" />
                  <Label htmlFor="confirm" className="flex-1 cursor-pointer">
                    I confirm the details are correct
                  </Label>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50">
                  <RadioGroupItem value="change" id="change" />
                  <Label htmlFor="change" className="flex-1 cursor-pointer">
                    I want to change the details
                  </Label>
                  <AlertCircle className="w-5 h-5 text-warning" />
                </div>
              </RadioGroup>
              <Button 
                onClick={handleMakerStep} 
                disabled={!selectedAction}
                className="w-full"
              >
                Submit Choice
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case "checker":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Checker Step - System Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="font-medium text-success">Confirmation Received</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Processing your confirmation...
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Updating REKYC flag with today's date</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Passing details to LMS</span>
                </div>
              </div>
              <Button onClick={handleCheckerStep} className="w-full">
                Complete ReKYC Process
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case "complete":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">ReKYC Process Complete</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-success mx-auto" />
              <p className="text-lg font-medium">Thank you for completing your ReKYC</p>
              {selectedAction === "change" ? (
                <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> Please visit your nearest branch to change your address or other details.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Your details have been successfully updated in our system.
                </p>
              )}
              <Button onClick={onComplete} className="w-full">
                Return to Customer Overview
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const getStepNumber = () => {
    const steps = ["authentication", "risk-assessment", "address-selection", "maker", "checker", "complete"];
    return steps.indexOf(currentStep) + 1;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary">ReKYC Process</h2>
        <Badge variant="outline">
          Step {getStepNumber()} of 6
        </Badge>
      </div>
      
      {renderStep()}
    </div>
  );
};

export default RekycProcess;