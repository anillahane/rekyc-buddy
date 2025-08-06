import { useState } from "react";
import { Menu, X, LogOut, User, FileText, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  onNavigate?: (view: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: User, label: "Customer Overview", href: "#overview" },
    { icon: FileText, label: "ReKYC Process", href: "#rekyc" },
    { icon: MessageSquare, label: "Queries & Complaints", href: "#queries" },
    { icon: Phone, label: "Contact Support", href: "#support" },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">VISTAAR</div>
          <div className="text-sm uppercase tracking-wide">FINANCE</div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onNavigate?.("overview")} 
            className="hover:text-primary-foreground/80 transition-colors"
          >
            Customer Overview
          </button>
          <button 
            onClick={() => onNavigate?.("rekyc")} 
            className="hover:text-primary-foreground/80 transition-colors"
          >
            ReKYC Process
          </button>
          <button 
            onClick={() => onNavigate?.("queries")} 
            className="hover:text-primary-foreground/80 transition-colors"
          >
            Queries & Complaints
          </button>
          <Button variant="outline" size="sm" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary-foreground">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xl font-bold text-primary">Menu</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex-1 space-y-4">
                  {menuItems.slice(0, 3).map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        const view = item.href.replace('#', '');
                        onNavigate?.(view);
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors w-full text-left"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="pt-4 border-t">
                  <Button className="w-full" variant="destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;