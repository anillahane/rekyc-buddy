import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle, AlertCircle, ArrowRight, Home, MapPin, Shield, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type RiskLevel = "low" | "medium" | "high";
type ProcessingStep = "form" | "processing" | "complete";

interface CustomerData {
  mobile: string;
  riskLevel: RiskLevel;
  hasChangeRequest: boolean;
  addresses: {
    permanent: string;
    correspondence: string;
  };
}

interface FormData {
  mobileNumber: string;
  selectedAction: string;
}

const RekycProcess = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState<ProcessingStep>("form");
  const [formData, setFormData] = useState<FormData>({
    mobileNumber: "",
    selectedAction: ""
  });
  const [showCheckerScreen, setShowCheckerScreen] = useState(false);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate mobile number matches registered number
    if (formData.mobileNumber !== customerData.mobile) {
      toast({
        title: "Authentication Failed",
        description: "Mobile number does not match our records.",
        variant: "destructive",
      });
      return;
    }

    // Process the form submission
    if (formData.selectedAction === "confirm") {
      setShowCheckerScreen(true);
      setCurrentStep("processing");
      
      // Simulate processing time
      setTimeout(() => {
        setCurrentStep("complete");
        toast({
          title: "ReKYC Completed Successfully",
          description: "Your details have been updated and passed to LMS.",
          variant: "default",
        });
      }, 3000);
    } else if (formData.selectedAction === "change") {
      setCurrentStep("complete");
      toast({
        title: "Branch Visit Required",
        description: "Please visit your nearest branch to change your address or other details.",
        variant: "default",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      mobileNumber: "",
      selectedAction: ""
    });
    setCurrentStep("form");
    setShowCheckerScreen(false);
  };

  const handleCompleteFlow = () => {
    handleReset();
    onComplete();
  };

  if (currentStep === "processing" && showCheckerScreen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary">ReKYC Process</h2>
          <Badge variant="warning">Processing</Badge>
        </div>
        
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
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Updating REKYC flag with today's date</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Passing details to LMS</span>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Please wait while we process your ReKYC confirmation. This typically takes a few moments.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === "complete") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary">ReKYC Process</h2>
          <Badge variant="success">Complete</Badge>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">ReKYC Process Complete</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <p className="text-lg font-medium">Thank you for completing your ReKYC</p>
            {formData.selectedAction === "change" ? (
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
            <div className="flex space-x-3 justify-center">
              <Button onClick={handleCompleteFlow}>
                Return to Customer Overview
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Start New ReKYC
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary">ReKYC Process</h2>
        <Badge variant="outline">Complete Form</Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary" />
              <span>Step 1: Customer Authentication</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mobileNumber">Enter your registered mobile number *</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                This should match the mobile number registered with your account
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Risk Assessment (Auto-displayed) */}
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Risk Assessment & ReKYC Status</CardTitle>
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
          </CardContent>
        </Card>

        {/* Step 3: Address Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-primary" />
              <span>Step 3: Address Verification</span>
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
          </CardContent>
        </Card>

        {/* Step 4: Maker Step - Customer Confirmation */}
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Maker Step - Customer Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please select one of the following options:
            </p>
            <RadioGroup value={formData.selectedAction} onValueChange={(value) => setFormData({...formData, selectedAction: value})}>
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
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex space-x-3">
          <Button 
            type="submit" 
            disabled={!formData.mobileNumber || !formData.selectedAction}
            className="flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Submit ReKYC</span>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
          >
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RekycProcess;