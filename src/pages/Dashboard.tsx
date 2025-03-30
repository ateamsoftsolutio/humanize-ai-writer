import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { contentAPI } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';

interface Content {
  _id: string;
  title: string;
  prompt: string;
  originalContent: string;
  humanizedContent?: string;
  contentType: string;
  wordCount: number;
  humanityLevel?: number;
  aiDetectionScore?: number;
  createdAt: string;
}

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('general');
  const [wordCount, setWordCount] = useState('300');
  const [humanityLevel, setHumanityLevel] = useState([50]);
  const [preserveKeyInfo, setPreserveKeyInfo] = useState(true);

  // Fetch content history
  const { data: contents, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['contents'],
    queryFn: contentAPI.getContentHistory,
  });

  // Generate content mutation
  const generateMutation = useMutation({
    mutationFn: contentAPI.generateContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      toast({
        title: "Success",
        description: "Content generated successfully!",
      });
      setPrompt('');
      setTitle('');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Humanize content mutation
  const humanizeMutation = useMutation({
    mutationFn: contentAPI.humanizeContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      toast({
        title: "Success",
        description: "Content humanized successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to humanize content. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete content mutation
  const deleteMutation = useMutation({
    mutationFn: contentAPI.deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      toast({
        title: "Success",
        description: "Content deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = async () => {
    if (!prompt.trim() || !title.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({
      prompt,
      title,
      contentType: contentType as 'general' | 'academic' | 'business' | 'creative' | 'technical',
      wordCount: parseInt(wordCount),
    });
  };

  const handleHumanize = async (contentId: string) => {
    humanizeMutation.mutate({
      contentId,
      humanityLevel: humanityLevel[0],
    });
  };

  const handleDelete = async (contentId: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      deleteMutation.mutate(contentId);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="history">Content History</TabsTrigger>
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
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <span className="text-xs text-muted-foreground">
                      Required
                    </span>
                  </div>
                  <input
                    id="title"
                    placeholder="Enter a title for your content..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <label htmlFor="prompt" className="text-sm font-medium">
                      Your Prompt
                    </label>
                    <span className="text-xs text-muted-foreground">
                      Required
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
                    <Select value={contentType} onValueChange={setContentType}>
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
                    <label className="text-sm font-medium">Word Count</label>
                    <Select value={wordCount} onValueChange={setWordCount}>
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

                <Button
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending}
                  className="w-full"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Content'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {isLoadingHistory ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : contents?.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No content generated yet. Start by generating some content!
            </div>
          ) : (
            <div className="grid gap-6">
              {contents?.map((content: Content) => (
                <Card key={content._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{content.title}</CardTitle>
                        <CardDescription>
                          {new Date(content.createdAt).toLocaleDateString()} • {content.contentType}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(content._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Original Content</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {content.originalContent}
                        </p>
                      </div>
                      {content.humanizedContent && (
                        <div>
                          <h4 className="font-medium mb-2">Humanized Content</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {content.humanizedContent}
                          </p>
                        </div>
                      )}
                      {!content.humanizedContent && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Humanity Level</label>
                            <Slider
                              value={humanityLevel}
                              onValueChange={setHumanityLevel}
                              max={100}
                              step={1}
                            />
                            <div className="text-sm text-muted-foreground">
                              {humanityLevel[0]}% human-like
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="preserve-key-info"
                              checked={preserveKeyInfo}
                              onCheckedChange={setPreserveKeyInfo}
                            />
                            <label htmlFor="preserve-key-info" className="text-sm">
                              Preserve key information
                            </label>
                          </div>
                          <Button
                            onClick={() => handleHumanize(content._id)}
                            disabled={humanizeMutation.isPending}
                            className="w-full"
                          >
                            {humanizeMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Humanizing...
                              </>
                            ) : (
                              'Humanize Content'
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 