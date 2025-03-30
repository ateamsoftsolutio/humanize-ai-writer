
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="ateam-container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          {toggleSidebar && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/adb75d85-25cb-4e7e-b8df-6017ef3c21cb.png" 
              alt="ATeam Soft Solutions Logo" 
              className="h-8 w-8"
            />
            <span className="font-display font-semibold text-lg hidden md:block">
              <span>aTeam</span>
              <span className="font-normal text-sm block -mt-1">SOFT SOLUTIONS</span>
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">Home</a>
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">Features</a>
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-ateam-black text-white hover:bg-black/90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
