
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Copy, FileText, LayoutGrid, ShieldCheck, Sparkles, Trophy, Wand2 } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-12 w-12 text-ateam-black p-2 bg-gray-100 rounded-xl" />,
      title: "AI Content Generation",
      description: "Create high-quality content for any topic with our advanced AI technology."
    },
    {
      icon: <Sparkles className="h-12 w-12 text-ateam-black p-2 bg-gray-100 rounded-xl" />,
      title: "Text Humanization",
      description: "Transform AI text to sound natural and bypass detection systems."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-ateam-black p-2 bg-gray-100 rounded-xl" />,
      title: "Undetectable Content",
      description: "Our humanized content passes through all major AI detection tools."
    },
    {
      icon: <LayoutGrid className="h-12 w-12 text-ateam-black p-2 bg-gray-100 rounded-xl" />,
      title: "Multiple Content Types",
      description: "Generate essays, articles, blog posts, reports, and more."
    },
    {
      icon: <Wand2 className="h-12 w-12 text-ateam-black p-2 bg-gray-100 rounded-xl" />,
      title: "Customization Options",
      description: "Adjust humanization levels and style to match your preferences."
    },
    {
      icon: <Trophy className="h-12 w-12 text-ateam-black p-2 bg-gray-100 rounded-xl" />,
      title: "Highest Quality Output",
      description: "Industry-leading results with the most natural-sounding text."
    }
  ];

  return (
    <div className="bg-secondary/30 py-16 md:py-24">
      <div className="ateam-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">
            Our platform offers everything you need to create, humanize, and manage AI-generated content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border bg-card hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
