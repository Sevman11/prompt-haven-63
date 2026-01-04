import { useState } from "react";
import { 
  Image, 
  Send, 
  Settings2,
  Sparkles,
  Download,
  Heart,
  ChevronDown
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
import { cn } from "@/lib/utils";

const models = ["Midjourney", "DALL-E 3", "Stable Diffusion", "Kandinsky"];
const resolutions = ["512x512", "768x768", "1024x1024", "1024x1792", "1792x1024"];
const orientations = ["Квадрат", "Портрет", "Альбом"];

const presets = [
  { id: "1", name: "Реалистичное фото", description: "Фотореалистичные изображения" },
  { id: "2", name: "Аниме стиль", description: "В стиле японской анимации" },
  { id: "3", name: "Цифровое искусство", description: "Современный digital art" },
  { id: "4", name: "Акварель", description: "Эффект акварельной живописи" },
  { id: "5", name: "3D рендер", description: "Объемные 3D изображения" },
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
  { id: "1", title: "Моя генерация 1", url: "/placeholder.svg" },
  { id: "2", title: "Моя генерация 2", url: "/placeholder.svg" },
];

export default function Photo() {
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("text-to-image");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedResolution, setSelectedResolution] = useState(resolutions[2]);
  const [selectedOrientation, setSelectedOrientation] = useState(orientations[0]);
  const [sidebarTab, setSidebarTab] = useState<"presets" | "generations">("presets");

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    console.log("Generate:", { prompt, model: selectedModel, resolution: selectedResolution });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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

          {/* Settings */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[160px]">
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
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resolutions.map((res) => (
                  <SelectItem key={res} value={res}>{res}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedOrientation} onValueChange={setSelectedOrientation}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {orientations.map((orient) => (
                  <SelectItem key={orient} value={orient}>{orient}</SelectItem>
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

        {/* Examples Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Примеры генераций</h3>
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
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:flex w-72 border-l border-border flex-col bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex gap-2">
            <Button 
              variant={sidebarTab === "presets" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setSidebarTab("presets")}
            >
              Пресеты
            </Button>
            <Button 
              variant={sidebarTab === "generations" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setSidebarTab("generations")}
            >
              Мои генерации
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {sidebarTab === "presets" ? (
            <div className="space-y-3">
              {presets.map((preset) => (
                <div 
                  key={preset.id}
                  className="p-3 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary-soft/50 cursor-pointer transition-all"
                >
                  <h4 className="font-medium text-sm text-foreground">{preset.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{preset.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {myGenerations.map((gen) => (
                <div 
                  key={gen.id}
                  className="aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer hover:ring-2 ring-primary transition-all"
                >
                  <img src={gen.url} alt={gen.title} className="w-full h-full object-cover" />
                </div>
              ))}
              {myGenerations.length === 0 && (
                <div className="col-span-2 text-center py-8 text-muted-foreground text-sm">
                  Нет генераций
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
