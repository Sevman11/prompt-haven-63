import { useState } from "react";
import { 
  FileEdit, 
  Wand2,
  Image,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const toneOptions = [
  { value: "neutral", label: "Нейтральный" },
  { value: "formal", label: "Формальный" },
  { value: "friendly", label: "Дружелюбный" },
  { value: "professional", label: "Профессиональный" },
];

const lengthOptions = [
  { value: "short", label: "Короткий" },
  { value: "medium", label: "Средний" },
  { value: "long", label: "Длинный" },
];

const styleOptions = [
  { value: "informative", label: "Информативный" },
  { value: "engaging", label: "Вовлекающий" },
  { value: "educational", label: "Образовательный" },
  { value: "promotional", label: "Промо" },
];

const socialNetworks = [
  { id: "telegram", label: "Telegram", icon: "📱" },
  { id: "vk", label: "ВКонтакте", icon: "💬" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "shorts", label: "Shorts / Reels", icon: "🎬" },
];

export default function ContentFactoryVerification() {
  const navigate = useNavigate();
  
  const [postTitle, setPostTitle] = useState("Новые технологии в AI: что ждёт нас в 2025");
  const [postContent, setPostContent] = useState(
    "Искусственный интеллект продолжает развиваться стремительными темпами. В 2025 году мы ожидаем прорывы в области генеративных моделей, мультимодальных систем и автономных агентов.\n\nКлючевые тренды:\n• Более точная генерация изображений и видео\n• Интеграция AI в повседневные приложения\n• Развитие персональных AI-ассистентов"
  );
  
  const [selectedTone, setSelectedTone] = useState("neutral");
  const [selectedLength, setSelectedLength] = useState("medium");
  const [selectedStyle, setSelectedStyle] = useState("informative");
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(["telegram", "vk"]);

  const toggleNetwork = (networkId: string) => {
    setSelectedNetworks(prev => 
      prev.includes(networkId) 
        ? prev.filter(id => id !== networkId)
        : [...prev, networkId]
    );
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FileEdit className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Редактирование базового поста</h1>
            <p className="text-muted-foreground">Редакционный контроль и формирование ядра контента</p>
          </div>
        </div>
      </div>

      {/* Single Column Layout - Base Post Only */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Base Post */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Базовый пост</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label>Заголовок</Label>
                <Input 
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Введите заголовок..."
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label>Текст поста</Label>
                <Textarea 
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Введите текст поста..."
                  className="min-h-[200px]"
                />
              </div>

              {/* Settings Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">Тон</Label>
                  <Select value={selectedTone} onValueChange={setSelectedTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Длина</Label>
                  <Select value={selectedLength} onValueChange={setSelectedLength}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Стиль</Label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Базовое изображение
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center">
                  <Image className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">Изображение не выбрано</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Wand2 className="h-4 w-4" />
                  Сгенерировать
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Image className="h-4 w-4" />
                  Заменить
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Social Networks Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Выбор соцсетей</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {socialNetworks.map((network) => (
                  <div
                    key={network.id}
                    onClick={() => toggleNetwork(network.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                      selectedNetworks.includes(network.id)
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/30"
                    )}
                  >
                    <Checkbox 
                      checked={selectedNetworks.includes(network.id)}
                      onCheckedChange={() => toggleNetwork(network.id)}
                    />
                    <span className="text-lg">{network.icon}</span>
                    <span className="text-sm font-medium">{network.label}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full gap-2"
                onClick={() => navigate("/content-factory/publications")}
                disabled={selectedNetworks.length === 0}
              >
                Перейти к публикациям
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
