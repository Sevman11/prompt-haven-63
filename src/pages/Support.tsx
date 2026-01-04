import { useState } from "react";
import { 
  Send, 
  Clock,
  MessageCircle,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export default function Support() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    message: "",
  });

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

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">Форма обращения</h2>
                
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
