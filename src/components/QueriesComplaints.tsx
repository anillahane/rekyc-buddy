import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Search, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QueriesComplaints = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    pincode: "",
    complaintType: "",
    details: ""
  });
  const [trackingId, setTrackingId] = useState("");
  const { toast } = useToast();

  const complaintTypes = [
    "Loan Processing Delay",
    "Documentation Issues",
    "Interest Rate Inquiry",
    "Payment Related",
    "Customer Service",
    "Technical Issues",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a mock tracking ID
    const newTrackingId = `VF${Date.now().toString().slice(-8)}`;
    toast({
      title: "Query/Complaint Submitted",
      description: `Your request has been submitted with tracking ID: ${newTrackingId}`,
    });
    
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      pincode: "",
      complaintType: "",
      details: ""
    });
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) {
      toast({
        title: "Status Found",
        description: `Your query/complaint ${trackingId} is currently being processed by our team.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold text-primary">Queries & Complaints</h2>
      </div>

      <Tabs defaultValue="raise" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="raise" className="flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Raise Query or Complaint</span>
          </TabsTrigger>
          <TabsTrigger value="track" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Track Query or Complaint</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="raise">
          <Card>
            <CardHeader>
              <CardTitle>Raise Query or Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Registered Mobile Number *</Label>
                    <Input
                      id="mobile"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="complaintType">Complaint Type *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, complaintType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Complaint Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {complaintTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="details">Please Provide Further Details *</Label>
                  <Textarea
                    id="details"
                    placeholder="Further details (optional)"
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit" className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData({
                      fullName: "",
                      email: "",
                      mobile: "",
                      pincode: "",
                      complaintType: "",
                      details: ""
                    })}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track">
          <Card>
            <CardHeader>
              <CardTitle>Track Query or Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <Label htmlFor="trackingId">Tracking ID</Label>
                  <Input
                    id="trackingId"
                    placeholder="Enter your tracking ID"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Track Status</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fraud Disclaimer */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 border-2 border-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs font-bold">!</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Fraud Disclaimer</h3>
              <p className="text-sm opacity-90">
                Vistaar Financial Services Private Limited (hereinafter referred to as 'The Company') has been made aware that individuals purporting to act as, or on The company's behalf and using The company's name (either in full as detailed in the beginning of this disclaimer or in various forms with some or more similarities) have approached prospective loan speakers in the general public offering loans. These approaches are intended to defraud individuals and damage the reputation of the Company. Any communication that is sent from The Company is either sent from our registered email name @vistaarfinace.com or through formal correspondence. Under no circumstances should nay money be transferred to any individual or entity. Without having first conducted due diligence on that recipient of those funds.
              </p>
              <p className="text-sm opacity-90">
                If you receive what you believe is an email from any individual purporting to represent The Company or are approached by any individual who is unable to demonstrate that he is a legitimate employee of The Company, please call us at 080 49373037 or forward doubtful email communications to us at contact.us@vistaarfinance.com, forwarding the email or letter, and alternatively report this to your local police. Vistaar Financial Services Private Limited does not tolerate such frauds/criminal activity in any form and shall not be considered liable for any loss or inconvenience resulting from communication or business transactions with unauthorize individuals or entities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueriesComplaints;