import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MapPin, Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface CustomerData {
  name: string;
  dateOfBirth: string;
  mobile: string;
  email: string;
  customerId: string;
  address: {
    permanent: string;
    correspondence: string;
  };
  lastKycDate: string;
  kycStatus: "completed" | "pending" | "due";
  riskLevel: "low" | "medium" | "high";
}

const CustomerOverview = ({ onStartRekyc }: { onStartRekyc: () => void }) => {
  // Mock customer data
  const customer: CustomerData = {
    name: "Rajesh Kumar",
    dateOfBirth: "15/08/1985",
    mobile: "+91 9876543210",
    email: "rajesh.kumar@email.com",
    customerId: "VFIN12345678",
    address: {
      permanent: "123, MG Road, Bangalore, Karnataka - 560001",
      correspondence: "456, HSR Layout, Bangalore, Karnataka - 560102"
    },
    lastKycDate: "2023-08-15",
    kycStatus: "due",
    riskLevel: "low"
  };

  const isRekycDue = () => {
    const lastKyc = new Date(customer.lastKycDate);
    const today = new Date();
    const diffInDays = Math.floor((today.getTime() - lastKyc.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays > 365; // ReKYC due after 1 year
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "pending": return "warning";
      case "due": return "destructive";
      default: return "secondary";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "success";
      case "medium": return "warning";
      case "high": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary">Customer Overview</h2>
        <Badge variant={getStatusColor(customer.kycStatus)} className="px-3 py-1">
          {customer.kycStatus === "due" && <AlertCircle className="w-4 h-4 mr-1" />}
          {customer.kycStatus === "completed" && <CheckCircle className="w-4 h-4 mr-1" />}
          KYC {customer.kycStatus.toUpperCase()}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-lg">{customer.name}</p>
              <p className="text-sm text-muted-foreground">Customer ID: {customer.customerId}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>DOB: {customer.dateOfBirth}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{customer.mobile}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Last KYC: {new Date(customer.lastKycDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Risk Level: </span>
              <Badge variant={getRiskColor(customer.riskLevel)}>
                {customer.riskLevel.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Address Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-sm text-muted-foreground mb-1">Permanent Address</p>
              <p className="text-sm">{customer.address.permanent}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-muted-foreground mb-1">Correspondence Address</p>
              <p className="text-sm">{customer.address.correspondence}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ReKYC Action */}
      {isRekycDue() && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-8 h-8 text-destructive" />
                <div>
                  <h3 className="font-semibold text-destructive">ReKYC Required</h3>
                  <p className="text-sm text-muted-foreground">
                    Your KYC verification has expired. Please complete ReKYC to continue services.
                  </p>
                </div>
              </div>
              <Button onClick={onStartRekyc} className="bg-primary hover:bg-primary/90">
                Start ReKYC Process
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerOverview;