
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, BrainCircuit, CheckCircle, Copy, RefreshCcw, RotateCcw, Send, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type TextType = 'original' | 'humanized';

interface TextComponentProps {
  text: string;
  type: TextType;
}

const TextComponent: React.FC<TextComponentProps> = ({ text, type }) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type === 'original' ? 'Original' : 'Humanized'} text copied!`,
      duration: 3000,
    });
  };

  return (
    <div className="rounded-md border p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm">
          {type === 'original' ? 'Original AI Text' : 'Humanized Text'}
        </h3>
        <div className="flex gap-2">
          {text && (
            <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex-grow bg-secondary/50 rounded-md p-3 text-sm">
        {text || <span className="text-muted-foreground italic">Text will appear here...</span>}
      </div>
    </div>
  );
};

const TextGenerator: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [topicType, setTopicType] = useState('general');
  const [humanityLevel, setHumanityLevel] = useState([50]);
  const [preserveKeyInfo, setPreserveKeyInfo] = useState(true);
  const [currentTab, setCurrentTab] = useState('generate');

  const generateText = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to generate text.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const sampleText = `Artificial Intelligence (AI) is revolutionizing various industries by automating tasks, providing insights, and enhancing decision-making processes. Machine learning algorithms, a subset of AI, analyze data patterns to make predictions and improve performance over time without explicit programming. Deep learning, a more specialized form of machine learning, uses neural networks with multiple layers to process complex information and recognize patterns similar to the human brain. Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language, facilitating interactions between humans and machines through applications like chatbots, translation services, and sentiment analysis tools. Computer vision allows machines to interpret and make decisions based on visual data, supporting technologies such as facial recognition, object detection, and autonomous vehicles. Reinforcement learning involves training algorithms to make sequences of decisions by rewarding desired behaviors and punishing undesired ones, similar to how humans learn from experience. These AI capabilities are transforming healthcare, finance, transportation, manufacturing, and many other sectors, offering opportunities for innovation, efficiency, and addressing complex challenges.`;
      
      setGeneratedText(sampleText);
      
      // Simulate humanizing the text
      const humanizedSample = sampleText
        .replace(/Artificial Intelligence \(AI\)/g, "AI")
        .replace(/Machine learning algorithms/g, "ML systems")
        .replace(/revolutionizing/g, "changing")
        .replace(/providing insights/g, "giving useful information")
        .replace(/enhancing decision-making processes/g, "helping make better decisions")
        .split('. ')
        .map(sentence => {
          // Add some filler words and slight variations
          if (Math.random() > 0.7) {
            return sentence + ", you know?";
          } else if (Math.random() > 0.5) {
            return "I think " + sentence.charAt(0).toLowerCase() + sentence.slice(1);
          } else if (Math.random() > 0.3) {
            return "Well, " + sentence.charAt(0).toLowerCase() + sentence.slice(1);
          }
          return sentence;
        })
        .join('. ');
      
      setHumanizedText(humanizedSample);
      setLoading(false);
      
      toast({
        title: "Text generated",
        description: "AI content has been generated and humanized!",
        duration: 3000,
      });
    }, 2000);
  };

  const handleHumanize = async () => {
    if (!generatedText.trim()) {
      toast({
        title: "No text to humanize",
        description: "Please generate or enter text first.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a humanized version with different style based on slider value
      let humanized = generatedText;
      
      if (humanityLevel[0] < 30) {
        // Low humanization - minor changes
        humanized = humanized
          .replace(/Artificial Intelligence \(AI\)/g, "AI")
          .replace(/Machine learning algorithms/g, "ML systems");
      } else if (humanityLevel[0] < 70) {
        // Medium humanization - more conversational
        humanized = humanized
          .replace(/Artificial Intelligence \(AI\)/g, "AI")
          .replace(/Machine learning algorithms/g, "ML systems")
          .replace(/revolutionizing/g, "changing")
          .replace(/providing insights/g, "giving useful information")
          .replace(/enhancing decision-making processes/g, "helping make better decisions");
      } else {
        // High humanization - completely rewritten style
        humanized = "AI is really changing everything these days! It's basically taking over all kinds of industries by doing tasks automatically, giving us useful info, and helping people make better decisions. The ML part of AI looks at data patterns to guess what might happen next and gets better over time without someone having to program everything. Deep learning (which is like ML but fancier) uses these neural networks with lots of layers to handle complex stuff, kind of like how our brains work. NLP is super cool because it lets computers understand and create human language, which is why we have things like chatbots and translation apps. Then there's computer vision that helps machines see and understand images - that's how we get facial recognition and self-driving cars. Reinforcement learning is another neat thing where algorithms learn by getting rewards for doing things right, similar to how we learn. All this AI stuff is making huge changes in healthcare, finance, transportation, and lots of other areas!";
      }
      
      setHumanizedText(humanized);
      setLoading(false);
      
      toast({
        title: "Text humanized",
        description: `Content humanized at ${humanityLevel[0]}% humanity level!`,
        duration: 3000,
      });
    }, 1500);
  };

  const resetForm = () => {
    setPrompt('');
    setGeneratedText('');
    setHumanizedText('');
    setHumanityLevel([50]);
    setPreserveKeyInfo(true);
    
    toast({
      title: "Reset complete",
      description: "All content has been cleared.",
      duration: 2000,
    });
  };

  return (
    <div className="mt-8 mb-16">
      <Tabs defaultValue="generate" value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="generate" className="text-sm">
            <BrainCircuit className="h-4 w-4 mr-2" />
            Generate Content
          </TabsTrigger>
          <TabsTrigger value="humanize" className="text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Humanize Text
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Generator</CardTitle>
              <CardDescription>
                Generate high-quality content using AI technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <label htmlFor="prompt" className="text-sm font-medium">
                      Your Prompt
                    </label>
                    <span className="text-xs text-muted-foreground">
                      Be descriptive for better results
                    </span>
                  </div>
                  <Textarea
                    id="prompt"
                    placeholder="Write about artificial intelligence and its applications..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-32 resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content Type</label>
                    <Select value={topicType} onValueChange={setTopicType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Word Count (approximately)</label>
                    <Select defaultValue="300">
                      <SelectTrigger>
                        <SelectValue placeholder="Select word count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">Short (~100 words)</SelectItem>
                        <SelectItem value="300">Medium (~300 words)</SelectItem>
                        <SelectItem value="500">Long (~500 words)</SelectItem>
                        <SelectItem value="1000">Detailed (~1000 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm} disabled={loading}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={generateText} disabled={loading} className="bg-ateam-black hover:bg-black/90">
                {loading ? (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {(generatedText || humanizedText) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <TextComponent text={generatedText} type="original" />
              <TextComponent text={humanizedText} type="humanized" />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="humanize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Text Humanizer</CardTitle>
              <CardDescription>
                Transform AI-generated content to bypass detection systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <label htmlFor="content" className="text-sm font-medium">
                      AI Content to Humanize
                    </label>
                    <span className="text-xs text-muted-foreground">
                      Paste your AI-generated text here
                    </span>
                  </div>
                  <Textarea
                    id="content"
                    placeholder="Paste your AI-generated content here..."
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    className="h-32 resize-none"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Humanity Level</label>
                      <span className="text-xs text-muted-foreground">
                        {humanityLevel[0]}% human-like
                      </span>
                    </div>
                    <Slider
                      value={humanityLevel}
                      onValueChange={setHumanityLevel}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>More detectable</span>
                      <span>More human-like</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <label htmlFor="preserve-key-info" className="text-sm font-medium cursor-pointer">
                      Preserve Key Information
                    </label>
                    <Switch
                      id="preserve-key-info"
                      checked={preserveKeyInfo}
                      onCheckedChange={setPreserveKeyInfo}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm} disabled={loading}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleHumanize} disabled={loading} className="bg-ateam-black hover:bg-black/90">
                {loading ? (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Humanize Text
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {humanizedText && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <TextComponent text={generatedText} type="original" />
              <TextComponent text={humanizedText} type="humanized" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextGenerator;
