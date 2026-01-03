import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Copy, Share2, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { prompts, chatHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const modelColors = {
  GPT: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  Claude: "bg-orange-500/10 text-orange-600 border-orange-200",
  Gemini: "bg-blue-500/10 text-blue-600 border-blue-200",
};

export default function PromptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState(chatHistory);

  const prompt = prompts.find((p) => p.id === id);

  if (!prompt) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-6">
        <h2 className="text-xl font-semibold mb-4">Prompt not found</h2>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Button>
      </div>
    );
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.preview);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (content: string) => {
    const newUserMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "I understand you want to continue working on this. Let me help you refine your request. Based on our conversation, I can provide more specific suggestions or explore different angles. What would you like to focus on?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      {/* Left Panel - Prompt Details */}
      <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto scrollbar-thin">
        <div className="p-6 lg:p-8">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant="outline"
                className={cn("text-sm font-medium border", modelColors[prompt.model])}
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {prompt.model}
              </Badge>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {prompt.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={() => setIsLiked(!isLiked)}
              className="gap-2"
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              {isLiked ? "Saved" : "Save to Library"}
            </Button>
            <Button variant="outline" onClick={handleCopyPrompt} className="gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Prompt Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Prompt
              </h3>
              <div className="rounded-xl bg-secondary/50 p-5 border border-border">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {prompt.preview}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Example Output
              </h3>
              <div className="rounded-xl bg-primary-soft p-5 border border-primary/10">
                <p className="text-foreground leading-relaxed">
                  This is an example of the output you can expect when using this prompt. 
                  The AI will generate content based on your specific inputs while following 
                  the structure and guidelines defined in the prompt template.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Tips for Best Results
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Be specific about your target audience and goals
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Provide context about your brand voice and style
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Include examples if you have a particular format in mind
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1 flex flex-col bg-background min-h-[400px] lg:min-h-0">
        {/* Chat header */}
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-semibold text-foreground">Try this Prompt</h2>
          <p className="text-sm text-muted-foreground">Chat with AI using this prompt template</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </div>

        {/* Input */}
        <ChatInput
          onSend={handleSendMessage}
          placeholder="Ask a follow-up question..."
        />
      </div>
    </div>
  );
}
