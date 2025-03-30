
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "This tool completely transformed my workflow. The content is indistinguishable from human-written text, and it's saved me countless hours of writing and editing.",
      author: "Sarah Johnson",
      role: "Content Manager",
      rating: 5
    },
    {
      quote: "As a student, I use this to help me brainstorm ideas and create drafts. The humanization feature ensures my final submissions are original and pass all plagiarism checks.",
      author: "Michael Chen",
      role: "Graduate Student",
      rating: 5
    },
    {
      quote: "I've tried several AI writing tools, but none come close to the quality and undetectability of this one. It's become an essential part of our content strategy.",
      author: "Jennifer Martinez",
      role: "Marketing Director",
      rating: 5
    },
    {
      quote: "The ability to adjust the humanization level is a game-changer. It gives me complete control over how the content sounds while ensuring it remains undetectable.",
      author: "David Wilson",
      role: "Freelance Writer",
      rating: 4
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
      <div className="ateam-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground">
            Thousands of professionals trust our platform to create undetectable AI content
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-border bg-background/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="italic text-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4 border-t border-border">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
