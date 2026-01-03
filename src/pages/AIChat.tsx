import { useState } from "react";
import { Trash2, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (content: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me think about the best approach...\n\nBased on what you've described, here are some suggestions:\n\n1. **Start with the basics** - Make sure you have a clear understanding of the fundamentals.\n2. **Break it down** - Complex problems become manageable when divided into smaller parts.\n3. **Iterate and improve** - Don't aim for perfection on the first try.\n\nWould you like me to elaborate on any of these points?",
        "That's an interesting question! Here's my analysis:\n\nThe key factors to consider are:\n• Context and goals\n• Available resources\n• Time constraints\n• Potential risks and benefits\n\nLet me know if you'd like me to dive deeper into any specific aspect.",
        "Great question! I can help you explore this further.\n\nFrom my understanding, the best approach would be to:\n\n**Step 1:** Define your objectives clearly\n**Step 2:** Research existing solutions\n**Step 3:** Create a prototype or MVP\n**Step 4:** Test and gather feedback\n**Step 5:** Iterate based on learnings\n\nShall I help you get started with any of these steps?",
      ];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Chat</h1>
          <p className="text-sm text-muted-foreground">Ask anything, get instant answers</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearHistory}
            disabled={messages.length === 0}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={messages.length === 0}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Regenerate
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-lg">
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              How can I help you today?
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              I'm your AI assistant. Ask me anything about writing, coding, analysis, or any other topic.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 max-w-lg w-full">
              {[
                "Help me write a professional email",
                "Explain a complex concept simply",
                "Review and improve my code",
                "Generate creative ideas for...",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="rounded-xl border border-border bg-card p-4 text-left text-sm text-foreground hover:bg-secondary transition-colors shadow-card hover:shadow-card-hover"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}
            {isLoading && (
              <div className="flex gap-3 px-4 py-4 bg-secondary/30">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4 animate-pulse-soft" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSendMessage}
        isLoading={isLoading}
        placeholder="Type your message..."
      />
    </div>
  );
}
