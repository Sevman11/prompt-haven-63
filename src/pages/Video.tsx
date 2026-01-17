import { useState } from "react";
import { 
  Video as VideoIcon, 
  Image, 
  Settings2,
  Sparkles,
  Download,
  Heart,
  Play,
  Wand2,
  Languages,
  Bell,
  Eye,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const models = ["Sora", "Runway Gen-3", "Pika Labs", "Stable Video", "Kling AI", "Luma Dream Machine"];

const orientations = [
  { value: "horizontal", label: "Горизонтальное 16:9", ratio: "16:9" },
  { value: "vertical", label: "Вертикальное 9:16", ratio: "9:16" },
  { value: "square", label: "Квадрат 1:1", ratio: "1:1" },
  { value: "cinema", label: "Кино 21:9", ratio: "21:9" },
  { value: "tiktok", label: "TikTok/Reels 9:16", ratio: "9:16" },
  { value: "youtube", label: "YouTube 16:9", ratio: "16:9" },
  { value: "shorts", label: "YouTube Shorts 9:16", ratio: "9:16" },
];

const durations = [
  { value: "5", label: "5 секунд" },
  { value: "10", label: "10 секунд" },
  { value: "15", label: "15 секунд" },
];

const exampleVideos = [
  { id: "1", title: "Полет над горами", description: "Аэросъемка горного пейзажа", thumbnail: "/placeholder.svg" },
  { id: "2", title: "Морские волны", description: "Спокойное море на закате", thumbnail: "/placeholder.svg" },
  { id: "3", title: "Городская жизнь", description: "Таймлапс ночного города", thumbnail: "/placeholder.svg" },
  { id: "4", title: "Природа", description: "Цветение вишни весной", thumbnail: "/placeholder.svg" },
  { id: "5", title: "Космос", description: "Путешествие сквозь галактику", thumbnail: "/placeholder.svg" },
  { id: "6", title: "Подводный мир", description: "Жизнь океана", thumbnail: "/placeholder.svg" },
];

const myGenerations = [
  { id: "1", title: "Моё видео 1", description: "Создано 3 часа назад", thumbnail: "/placeholder.svg" },
];

export default function Video() {
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("text-to-video");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedOrientation, setSelectedOrientation] = useState(orientations[0].value);
  const [selectedDuration, setSelectedDuration] = useState(durations[0].value);
  const [galleryTab, setGalleryTab] = useState("examples");
  const [notifyWhenReady, setNotifyWhenReady] = useState(false);
  const userPlan = "Free"; // Mock user plan

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    console.log("Generate:", { prompt, model: selectedModel, orientation: selectedOrientation, duration: selectedDuration, notifyWhenReady });
  };

  const handleGeneratePreview = () => {
    if (!prompt.trim()) return;
    console.log("Generate Preview (1 frame):", { prompt, model: selectedModel });
  };

  const handleImprovePrompt = () => {
    if (!prompt.trim()) return;
    const improved = `${prompt}, cinematic quality, smooth motion, professional videography, 4K resolution, dynamic camera movement`;
    setPrompt(improved);
  };

  const handleTranslatePrompt = () => {
    if (!prompt.trim()) return;
    setPrompt(`[Translated to English] ${prompt}`);
  };

  const handleTranslateBack = () => {
    if (!prompt.trim()) return;
    setPrompt(`[Переведено на русский] ${prompt.replace('[Translated to English] ', '')}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">Генерация видео</h1>
        <p className="text-muted-foreground">
          Создавайте уникальные видеоролики с помощью искусственного интеллекта
        </p>
      </div>

      {/* Tabs and Input */}
      <div className="p-6 border-b border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="text-to-video">Из текста в видео</TabsTrigger>
            <TabsTrigger value="image-to-video">Из фото в видео</TabsTrigger>
          </TabsList>

          <TabsContent value="text-to-video" className="mt-0">
            <div className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Опишите видео, которое хотите создать..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="image-to-video" className="mt-0">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Image className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-2">Перетащите изображение сюда</p>
                <Button variant="outline" size="sm">Выбрать файл</Button>
              </div>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Опишите желаемое движение и эффекты..."
                className="min-h-[60px] resize-none"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Prompt enhancement buttons */}
        <div className="flex items-center gap-2 mt-4 mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImprovePrompt}
                  disabled={!prompt.trim()}
                  className="gap-2"
                >
                  <Wand2 className="h-4 w-4" />
                  Улучшить промт
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Добавить детали для лучшего результата</p>
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
                  disabled={!prompt.trim()}
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTranslateBack}
                  disabled={!prompt.trim()}
                  className="gap-2"
                >
                  <Languages className="h-4 w-4" />
                  Вернуть на RU
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Перевести промт обратно на русский</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Notify checkbox and watermark warning */}
        <div className="flex flex-wrap items-center gap-4 mt-4 mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notify" 
              checked={notifyWhenReady} 
              onCheckedChange={(checked) => setNotifyWhenReady(checked as boolean)}
            />
            <label
              htmlFor="notify"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              Уведомить, когда готово
            </label>
          </div>
        </div>

        {/* Watermark warning for Free users */}
        {userPlan === "Free" && (
          <Alert className="mb-4 border-yellow-500/50 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              ⚠️ Видео будет содержать водяной знак. <a href="/subscription" className="underline font-medium hover:text-yellow-800">Обновите тариф</a>, чтобы удалить.
            </AlertDescription>
          </Alert>
        )}

        {/* Settings */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[180px]">
              <Settings2 className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedOrientation} onValueChange={setSelectedOrientation}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {orientations.map((orient) => (
                <SelectItem key={orient.value} value={orient.value}>
                  {orient.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {durations.map((dur) => (
                <SelectItem key={dur.value} value={dur.value}>{dur.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-2">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleGeneratePreview}
              disabled={!prompt.trim()}
            >
              <Eye className="h-4 w-4" />
              Превью (1 кадр)
            </Button>
            <Button 
              variant="gradient" 
              className="gap-2"
              onClick={handleSubmit}
              disabled={!prompt.trim()}
            >
              <Sparkles className="h-4 w-4" />
              Сгенерировать
            </Button>
          </div>
        </div>
      </div>

      {/* Gallery with Tabs */}
      <div className="flex-1 p-6">
        <Tabs value={galleryTab} onValueChange={setGalleryTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="examples">Примеры генераций</TabsTrigger>
            <TabsTrigger value="my">Мои генерации</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="mt-0">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              {exampleVideos.map((video, index) => (
                <div
                  key={video.id}
                  className={cn(
                    "group relative aspect-video rounded-xl overflow-hidden bg-secondary cursor-pointer",
                    "animate-fade-in opacity-0",
                    `stagger-${(index % 6) + 1}`
                  )}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 text-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-medium text-sm">{video.title}</h4>
                      <p className="text-white/70 text-xs">{video.description}</p>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button size="icon-sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon-sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my" className="mt-0">
            {myGenerations.length > 0 ? (
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                {myGenerations.map((video, index) => (
                  <div
                    key={video.id}
                    className={cn(
                      "group relative aspect-video rounded-xl overflow-hidden bg-secondary cursor-pointer",
                      "animate-fade-in opacity-0",
                      `stagger-${(index % 6) + 1}`
                    )}
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-5 w-5 text-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-medium text-sm">{video.title}</h4>
                        <p className="text-white/70 text-xs">{video.description}</p>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button size="icon-sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon-sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <VideoIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Нет генераций</h3>
                <p className="text-muted-foreground max-w-sm">
                  Создайте своё первое видео с помощью ИИ
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
