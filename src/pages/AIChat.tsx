import { useState } from "react";
import { Trash2, RotateCcw, Sparkles, Wand2, Languages, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const textModels = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "claude-3", name: "Claude 3", provider: "Anthropic" },
  { id: "claude-3.5", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "gemini-2", name: "Gemini 2.0", provider: "Google" },
  { id: "llama-3", name: "Llama 3", provider: "Meta" },
  { id: "mistral", name: "Mistral Large", provider: "Mistral" },
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(textModels[0].id);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (content: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Я рад помочь вам с этим! Позвольте обдумать лучший подход...\n\nНа основе того, что вы описали, вот несколько предложений:\n\n1. **Начните с основ** — Убедитесь, что вы хорошо понимаете фундаментальные концепции.\n2. **Разбейте задачу** — Сложные проблемы становятся управляемыми, когда их делят на части.\n3. **Итерируйте и улучшайте** — Не стремитесь к совершенству с первой попытки.\n\nХотите, чтобы я подробнее остановился на каком-либо пункте?",
        "Интересный вопрос! Вот мой анализ:\n\nКлючевые факторы для рассмотрения:\n• Контекст и цели\n• Доступные ресурсы\n• Временные ограничения\n• Потенциальные риски и преимущества\n\nДайте знать, если хотите углубиться в какой-то конкретный аспект.",
        "Отличный вопрос! Я могу помочь вам изучить это подробнее.\n\nНа мой взгляд, лучший подход:\n\n**Шаг 1:** Чётко определите цели\n**Шаг 2:** Изучите существующие решения\n**Шаг 3:** Создайте прототип или MVP\n**Шаг 4:** Тестируйте и собирайте обратную связь\n**Шаг 5:** Итерируйте на основе полученных знаний\n\nПомочь вам начать с какого-то из этих шагов?",
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

  const handleImprovePrompt = () => {
    if (!inputValue.trim()) return;
    // Simulate improving the prompt
    const improved = `[Улучшенный промт]\n\n${inputValue}\n\nДополнительный контекст: Пожалуйста, предоставьте детальный и структурированный ответ с примерами.`;
    setInputValue(improved);
  };

  const handleTranslatePrompt = () => {
    if (!inputValue.trim()) return;
    // Simulate translation (in real app would use translation API)
    setInputValue(`[Translated to English]\n\n${inputValue}`);
  };

  const currentModel = textModels.find(m => m.id === selectedModel);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">ИИ Чат</h1>
            <p className="text-sm text-muted-foreground">Общайтесь с нейросетью</p>
          </div>
          
          {/* Model selector */}
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[200px]">
              <Settings2 className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {textModels.map((model) => (
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
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearHistory}
            disabled={messages.length === 0}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Очистить
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={messages.length === 0}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Повторить
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
              Чем могу помочь?
            </h2>
            <p className="text-muted-foreground max-w-md mb-4">
              Модель: <span className="font-medium text-foreground">{currentModel?.name}</span> ({currentModel?.provider})
            </p>
            <p className="text-muted-foreground max-w-md mb-8">
              Я ваш ИИ-ассистент. Задайте мне любой вопрос о написании текстов, программировании, анализе или любой другой теме.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 max-w-lg w-full">
              {[
                "Помоги написать профессиональное письмо",
                "Объясни сложную концепцию простыми словами",
                "Проанализируй и улучши мой код",
                "Сгенерируй креативные идеи для...",
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

      {/* Prompt enhancement buttons */}
      <div className="flex items-center gap-2 px-6 py-2 border-t border-border bg-secondary/30">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleImprovePrompt}
                disabled={!inputValue.trim()}
                className="gap-2"
              >
                <Wand2 className="h-4 w-4" />
                Улучшить промт
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Улучшить и дополнить ваш запрос</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTranslatePrompt}
                disabled={!inputValue.trim()}
                className="gap-2"
              >
                <Languages className="h-4 w-4" />
                Перевести на EN
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Перевести промт на английский язык</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSendMessage}
        isLoading={isLoading}
        placeholder="Введите сообщение..."
        value={inputValue}
        onChange={setInputValue}
      />
    </div>
  );
}
