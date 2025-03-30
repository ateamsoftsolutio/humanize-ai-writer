
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Edit, FileCheck, Search, Sparkles } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <BrainCircuit className="h-10 w-10" />,
      title: "Generate Content",
      description: "Use our AI to create high-quality content on any topic.",
      color: "bg-black text-white"
    },
    {
      icon: <Edit className="h-10 w-10" />,
      title: "Edit (Optional)",
      description: "Make any desired changes to the generated content.",
      color: "bg-gray-200 text-black"
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "Humanize",
      description: "Transform AI text to sound natural and human-written.",
      color: "bg-black text-white"
    },
    {
      icon: <Search className="h-10 w-10" />,
      title: "Test",
      description: "Verify that the content passes AI detection tools.",
      color: "bg-gray-200 text-black"
    },
    {
      icon: <FileCheck className="h-10 w-10" />,
      title: "Use Anywhere",
      description: "Use your undetectable content for any purpose.",
      color: "bg-black text-white"
    }
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="ateam-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Our easy 5-step process makes creating undetectable AI content simple and efficient
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`${step.color} rounded-full p-5 shadow-lg mb-4 z-10`}>
                  {step.icon}
                </div>
                
                <Card className="w-full border-none shadow-none text-center bg-transparent">
                  <CardHeader className="pb-2">
                    <h3 className="font-bold">{step.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2" style={{ left: `${(index + 0.5) * 20}%` }}>
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
