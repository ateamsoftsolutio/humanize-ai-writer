
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <div className="bg-ateam-black text-white py-16 md:py-20">
      <div className="ateam-container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to create undetectable AI content?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Join thousands of professionals who trust our platform for creating and humanizing content that bypasses AI detection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-base py-6">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white hover:bg-white/10 text-base py-6">
              View Pricing
            </Button>
          </div>
          <p className="text-sm mt-6 text-gray-400">
            No credit card required. Start with our free plan today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
