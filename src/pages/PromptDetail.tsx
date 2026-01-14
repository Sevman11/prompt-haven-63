import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Copy, Share2, Sparkles, Check, ArrowRight, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { prompts, chatHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const modelColors = {
  GPT: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  Claude: "bg-orange-500/10 text-orange-600 border-orange-200",
  Gemini: "bg-blue-500/10 text-blue-600 border-blue-200",
};

const availableModels = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
  { id: "claude-3.5", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "gemini-2", name: "Gemini 2.0", provider: "Google" },
];

export default function PromptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState(chatHistory);
  const [chatInputValue, setChatInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(availableModels[0].id);

  const prompt = prompts.find((p) => p.id === id);

  if (!prompt) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-6">
        <h2 className="text-xl font-semibold mb-4">Промт не найден</h2>
        <Button variant="outline" onClick={() => navigate("/prompts")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к каталогу
        </Button>
      </div>
    );
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.preview);
    setCopied(true);
    toast({
      title: "Скопировано",
      description: "Промт скопирован в буфер обмена.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransferToChat = () => {
    setChatInputValue(prompt.preview);
    toast({
      title: "Промт перенесён",
      description: "Текст промта добавлен в поле ввода.",
    });
  };

  const handleSendMessage = (content: string) => {
    const newUserMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setChatInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "Понял вашу задачу. Позвольте помочь вам с этим. На основе нашего разговора могу предложить более конкретные решения или рассмотреть разные подходы. На чём хотели бы сосредоточиться?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // Mock data for Russian version of prompt and description
  const promptDescription = "Этот промт поможет вам создать профессиональный контент с использованием искусственного интеллекта. Он оптимизирован для получения качественных результатов и включает все необходимые инструкции для модели.";
  const promptRussian = `Вы — профессиональный помощник. Ваша задача — помочь пользователю с ${prompt.title.toLowerCase()}. 

Следуйте этим правилам:
1. Будьте конкретны и полезны
2. Предоставляйте структурированные ответы
3. Включайте примеры где это уместно

Начните с анализа запроса пользователя и предложите оптимальное решение.`;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      {/* Left Panel - Prompt Details */}
      <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto scrollbar-thin">
        <div className="p-6 lg:p-8">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/prompts")}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к каталогу
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
              {isLiked ? "Сохранено" : "Сохранить"}
            </Button>
            <Button variant="outline" onClick={handleCopyPrompt} className="gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Скопировано" : "Копировать"}
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Prompt Content */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Описание промта
              </h3>
              <div className="rounded-xl bg-secondary/50 p-5 border border-border">
                <p className="text-foreground leading-relaxed">
                  {promptDescription}
                </p>
              </div>
            </div>

            {/* Russian Prompt */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Промт на русском языке
              </h3>
              <div className="rounded-xl bg-secondary/50 p-5 border border-border">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {promptRussian}
                </p>
              </div>
            </div>

            {/* English Prompt with Transfer button */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Prompt (English)
                </h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleTransferToChat}
                  className="gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  Перенести в чат
                </Button>
              </div>
              <div className="rounded-xl bg-primary-soft p-5 border border-primary/10">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {prompt.preview}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Пример результата
              </h3>
              <div className="rounded-xl bg-secondary/50 p-5 border border-border">
                <p className="text-foreground leading-relaxed">
                  Это пример результата, который вы можете ожидать при использовании данного промта. 
                  ИИ сгенерирует контент на основе ваших входных данных, следуя структуре и 
                  рекомендациям, определённым в шаблоне промта.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Советы для лучших результатов
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Будьте конкретны относительно целевой аудитории и целей
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Укажите контекст о стиле и тоне вашего бренда
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Включите примеры, если у вас есть конкретный формат
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1 flex flex-col bg-background min-h-[400px] lg:min-h-0">
        {/* Chat header with model selector */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Попробовать промт</h2>
              <p className="text-sm text-muted-foreground">Общайтесь с ИИ, используя этот шаблон</p>
            </div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px]">
                <Settings2 className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex flex-col">
                      <span>{model.name}</span>
                      <span className="text-xs text-muted-foreground">{model.provider}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          placeholder="Задайте вопрос..."
          value={chatInputValue}
          onChange={setChatInputValue}
        />
      </div>
    </div>
  );
}
