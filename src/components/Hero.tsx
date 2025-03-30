
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 z-0" />
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gray-100 dark:bg-gray-800 rounded-tl-[100px] opacity-50 z-0" />
      
      <div className="ateam-container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Create & Humanize
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400"> 
              AI Content
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-slide-up">
            Generate high-quality content with AI, then make it undetectable with our humanization technology. Bypass AI detection systems with natural-sounding text.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button className="text-white bg-ateam-black hover:bg-black/90 text-base py-6 px-8">
              Try It Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-base py-6 px-8">
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center animate-fade-in">
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl mb-1">99%</div>
              <div className="text-sm text-muted-foreground">Undetectable Rate</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl mb-1">10k+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl mb-1">50M+</div>
              <div className="text-sm text-muted-foreground">Words Humanized</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl mb-1">5⭐</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
