import { useState } from "react";
import { 
  Image, 
  Settings2,
  Sparkles,
  Download,
  Heart,
  Wand2,
  Languages
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
import { cn } from "@/lib/utils";

const models = ["Midjourney", "DALL-E 3", "Stable Diffusion XL", "Kandinsky 3", "Flux", "Leonardo AI"];

const resolutions = [
  // Квадратные
  { value: "512x512", label: "512×512", category: "Квадрат" },
  { value: "768x768", label: "768×768", category: "Квадрат" },
  { value: "1024x1024", label: "1024×1024", category: "Квадрат" },
  // Соц сети - Instagram
  { value: "1080x1080", label: "1080×1080 (Instagram пост)", category: "Соц сети" },
  { value: "1080x1350", label: "1080×1350 (Instagram портрет)", category: "Соц сети" },
  { value: "1080x1920", label: "1080×1920 (Stories/Reels)", category: "Соц сети" },
  // Соц сети - другие
  { value: "1200x630", label: "1200×630 (Facebook/LinkedIn)", category: "Соц сети" },
  { value: "1500x500", label: "1500×500 (Twitter шапка)", category: "Соц сети" },
  { value: "1280x720", label: "1280×720 (YouTube превью)", category: "Соц сети" },
  // Широкоформатные
  { value: "1920x1080", label: "1920×1080 (Full HD)", category: "Широкий" },
  { value: "2560x1440", label: "2560×1440 (2K)", category: "Широкий" },
  { value: "1792x1024", label: "1792×1024 (Альбом)", category: "Широкий" },
  // Портретные
  { value: "1024x1792", label: "1024×1792 (Портрет)", category: "Портрет" },
  { value: "768x1024", label: "768×1024 (Портрет)", category: "Портрет" },
  // Печать
  { value: "2480x3508", label: "A4 (300dpi)", category: "Печать" },
  { value: "3508x4961", label: "A3 (300dpi)", category: "Печать" },
];

const orientations = [
  { value: "square", label: "Квадрат", icon: "□" },
  { value: "portrait", label: "Портрет", icon: "▯" },
  { value: "landscape", label: "Альбом", icon: "▭" },
];

const exampleImages = [
  { id: "1", title: "Закат в горах", description: "Пейзаж с горами на закате", url: "/placeholder.svg" },
  { id: "2", title: "Киберпанк город", description: "Футуристический городской пейзаж", url: "/placeholder.svg" },
  { id: "3", title: "Портрет девушки", description: "Стилизованный портрет", url: "/placeholder.svg" },
  { id: "4", title: "Космос", description: "Галактика и звезды", url: "/placeholder.svg" },
  { id: "5", title: "Лесное озеро", description: "Тихое озеро в лесу", url: "/placeholder.svg" },
  { id: "6", title: "Абстракция", description: "Абстрактные формы и цвета", url: "/placeholder.svg" },
];

const myGenerations = [
  { id: "1", title: "Моя генерация 1", description: "Создано 2 часа назад", url: "/placeholder.svg" },
  { id: "2", title: "Моя генерация 2", description: "Создано вчера", url: "/placeholder.svg" },
];

export default function Photo() {
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("text-to-image");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedResolution, setSelectedResolution] = useState(resolutions[2].value);
  const [selectedOrientation, setSelectedOrientation] = useState(orientations[0].value);
  const [galleryTab, setGalleryTab] = useState("examples");

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    console.log("Generate:", { prompt, model: selectedModel, resolution: selectedResolution });
  };

  const handleImprovePrompt = () => {
    if (!prompt.trim()) return;
    const improved = `${prompt}, highly detailed, professional photography, 8k resolution, cinematic lighting, masterpiece`;
    setPrompt(improved);
  };

  const handleTranslatePrompt = () => {
    if (!prompt.trim()) return;
    // Simulate translation
    setPrompt(`[Translated to English] ${prompt}`);
  };

  const groupedResolutions = resolutions.reduce((acc, res) => {
    if (!acc[res.category]) acc[res.category] = [];
    acc[res.category].push(res);
    return acc;
  }, {} as Record<string, typeof resolutions>);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">Генерация фото</h1>
        <p className="text-muted-foreground">
          Создавайте уникальные изображения с помощью искусственного интеллекта
        </p>
      </div>

      {/* Tabs and Input */}
      <div className="p-6 border-b border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="text-to-image">Из текста в фото</TabsTrigger>
            <TabsTrigger value="image-to-image">Из фото в фото</TabsTrigger>
          </TabsList>

          <TabsContent value="text-to-image" className="mt-0">
            <div className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Опишите изображение, которое хотите создать..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="image-to-image" className="mt-0">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Image className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-2">Перетащите изображение сюда</p>
                <Button variant="outline" size="sm">Выбрать файл</Button>
              </div>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Опишите изменения..."
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
        </div>

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

          <Select value={selectedResolution} onValueChange={setSelectedResolution}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(groupedResolutions).map(([category, items]) => (
                <div key={category}>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{category}</div>
                  {items.map((res) => (
                    <SelectItem key={res.value} value={res.value}>{res.label}</SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedOrientation} onValueChange={setSelectedOrientation}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {orientations.map((orient) => (
                <SelectItem key={orient.value} value={orient.value}>
                  <span className="mr-2">{orient.icon}</span>
                  {orient.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="gradient" 
            className="ml-auto gap-2"
            onClick={handleSubmit}
            disabled={!prompt.trim()}
          >
            <Sparkles className="h-4 w-4" />
            Сгенерировать
          </Button>
        </div>
      </div>

      {/* Gallery with Tabs */}
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs value={galleryTab} onValueChange={setGalleryTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="examples">Примеры генераций</TabsTrigger>
            <TabsTrigger value="my">Мои генерации</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="mt-0">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              {exampleImages.map((image, index) => (
                <div
                  key={image.id}
                  className={cn(
                    "group relative aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer",
                    "animate-fade-in opacity-0",
                    `stagger-${(index % 6) + 1}`
                  )}
                >
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-medium text-sm">{image.title}</h4>
                      <p className="text-white/70 text-xs">{image.description}</p>
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
                {myGenerations.map((image, index) => (
                  <div
                    key={image.id}
                    className={cn(
                      "group relative aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer",
                      "animate-fade-in opacity-0",
                      `stagger-${(index % 6) + 1}`
                    )}
                  >
                    <img 
                      src={image.url} 
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-medium text-sm">{image.title}</h4>
                        <p className="text-white/70 text-xs">{image.description}</p>
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
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Нет генераций</h3>
                <p className="text-muted-foreground max-w-sm">
                  Создайте своё первое изображение с помощью ИИ
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
