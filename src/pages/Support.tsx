import { useState } from "react";
import { 
  Send, 
  Clock,
  MessageCircle,
  ChevronRight,
  User,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const categories = [
  "Техническая проблема",
  "Вопрос по оплате",
  "Предложение",
  "Партнёрство",
  "Другое",
];

const faqItems = [
  {
    question: "Как начать пользоваться сервисом?",
    answer: "После регистрации вы получаете бесплатные кристаллы для тестирования. Перейдите в раздел ИИ Чат или Генерация фото и начните создавать контент.",
  },
  {
    question: "Какие модели доступны для генерации?",
    answer: "Мы поддерживаем популярные модели: Midjourney, DALL-E 3, Stable Diffusion для изображений и Sora, Runway для видео. Доступность моделей зависит от вашего тарифа.",
  },
  {
    question: "Как работает система кристаллов?",
    answer: "Кристаллы — это внутренняя валюта сервиса. Каждая генерация списывает определённое количество кристаллов в зависимости от модели и разрешения.",
  },
  {
    question: "Можно ли вернуть деньги за подписку?",
    answer: "Да, мы предоставляем возврат в течение 7 дней с момента оплаты, если вы не использовали более 20% от лимита генераций.",
  },
  {
    question: "Как создать ИИ Сотрудника?",
    answer: "Перейдите в раздел 'ИИ Сотрудники', нажмите 'Создать' и настройте персонажа: выберите роль, стиль общения и специализацию.",
  },
  {
    question: "Сохраняются ли мои генерации?",
    answer: "Да, все генерации сохраняются в разделе 'Мои генерации'. На бесплатном тарифе хранение ограничено 7 днями, на платных — бессрочное.",
  },
];

const previousTickets = [
  { 
    id: "1", 
    subject: "Проблема с генерацией", 
    status: "resolved",
    date: "15 дек 2024",
    messages: [
      { role: "user", text: "Не могу сгенерировать изображение, выдает ошибку", time: "10:30" },
      { role: "support", text: "Здравствуйте! Уточните, пожалуйста, какую именно ошибку вы видите?", time: "11:45" },
      { role: "user", text: "Ошибка 500 при нажатии на кнопку генерации", time: "12:00" },
      { role: "support", text: "Проблема была связана с перегрузкой сервера. Сейчас всё должно работать корректно. Попробуйте снова.", time: "14:30" },
    ]
  },
  { 
    id: "2", 
    subject: "Вопрос по тарифу Pro", 
    status: "resolved",
    date: "10 дек 2024",
    messages: [
      { role: "user", text: "Подскажите, в чём отличие тарифа Pro от базового?", time: "09:15" },
      { role: "support", text: "Тариф Pro включает: неограниченные генерации, приоритетную очередь, доступ ко всем моделям ИИ и бессрочное хранение результатов.", time: "10:00" },
    ]
  },
  { 
    id: "3", 
    subject: "Запрос на возврат", 
    status: "open",
    date: "20 дек 2024",
    messages: [
      { role: "user", text: "Хотел бы оформить возврат за подписку", time: "16:00" },
      { role: "support", text: "Добрый день! Для оформления возврата уточните причину и номер заказа.", time: "17:30" },
    ]
  },
];

export default function Support() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    message: "",
  });
  const [mainTab, setMainTab] = useState("form");
  const [selectedTicket, setSelectedTicket] = useState<typeof previousTickets[0] | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.category || !formData.message) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, заполните тему, категорию и сообщение",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Обращение отправлено",
      description: "Мы ответим вам в течение 24 часов",
    });
    setFormData({ subject: "", category: "", message: "" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast({
      title: "Сообщение отправлено",
      description: "Ожидайте ответа от поддержки",
    });
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground mb-2">ПОДДЕРЖКА</h1>
          <p className="text-muted-foreground">
            Мы всегда рады помочь с любыми вопросами
          </p>
        </div>

        {/* Tabs: Form / My Tickets */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="form">Форма обращения</TabsTrigger>
                <TabsTrigger value="tickets">Мои обращения</TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="mt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h2 className="text-lg font-semibold text-foreground mb-6">Новое обращение</h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Тема</Label>
                        <Input 
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Кратко опишите проблему"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Категория</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Сообщение</Label>
                        <Textarea 
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Подробно опишите вашу проблему или вопрос..."
                          className="min-h-[150px] resize-none"
                        />
                      </div>

                      <Button type="submit" variant="gradient" className="w-full gap-2">
                        <Send className="h-4 w-4" />
                        Отправить обращение
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="tickets" className="mt-0">
                {!selectedTicket ? (
                  <div className="space-y-3">
                    {previousTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className={cn(
                          "p-4 rounded-xl bg-card border border-border cursor-pointer transition-all",
                          "hover:shadow-card-hover hover:border-primary/20"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-foreground">{ticket.subject}</h3>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                ticket.status === "resolved" 
                                  ? "bg-green-500/10 text-green-600" 
                                  : "bg-yellow-500/10 text-yellow-600"
                              )}>
                                {ticket.status === "resolved" ? "Решено" : "Открыто"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{ticket.date}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}

                    {previousTickets.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                          <MessageCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-foreground">Нет обращений</h3>
                        <p className="text-muted-foreground max-w-sm">
                          У вас пока нет обращений в поддержку
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Back button */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedTicket(null)}
                      className="mb-2"
                    >
                      ← Назад к списку
                    </Button>

                    {/* Ticket header */}
                    <div className="p-4 rounded-xl bg-card border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{selectedTicket.subject}</h3>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          selectedTicket.status === "resolved" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-yellow-500/10 text-yellow-600"
                        )}>
                          {selectedTicket.status === "resolved" ? "Решено" : "Открыто"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedTicket.date}</p>
                    </div>

                    {/* Messages */}
                    <div className="space-y-3">
                      {selectedTicket.messages.map((msg, index) => (
                        <div
                          key={index}
                          className={cn(
                            "p-4 rounded-xl max-w-[85%]",
                            msg.role === "user" 
                              ? "bg-primary text-primary-foreground ml-auto" 
                              : "bg-secondary"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {msg.role === "user" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Headphones className="h-4 w-4" />
                            )}
                            <span className="text-xs opacity-70">
                              {msg.role === "user" ? "Вы" : "Поддержка"} • {msg.time}
                            </span>
                          </div>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Reply input */}
                    {selectedTicket.status === "open" && (
                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Напишите ответ..."
                          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <Button variant="gradient" onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* FAQ - Mobile */}
            <div className="mt-8 lg:hidden">
              <h2 className="text-lg font-semibold text-foreground mb-4">Частые вопросы</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-4"
                  >
                    <AccordionTrigger className="text-left text-sm hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:flex w-80 border-l border-border flex-col bg-card">
        {/* Work hours */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary-soft flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Время работы</h3>
              <p className="text-sm text-muted-foreground">9:00 – 21:00 МСК</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Ответ на обращение в течение 24 часов
          </p>
        </div>

        {/* Telegram */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-[#229ED9]/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-[#229ED9]" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Telegram</h3>
              <p className="text-sm text-muted-foreground">Быстрая связь</p>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2">
            <MessageCircle className="h-4 w-4" />
            Написать в Telegram
          </Button>
        </div>

        {/* FAQ */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="font-medium text-foreground mb-4">Частые вопросы</h3>
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b-0"
              >
                <AccordionTrigger className="text-left text-sm hover:no-underline py-3">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
