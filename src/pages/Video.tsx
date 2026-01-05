import { useState } from "react";
import { 
  Video as VideoIcon, 
  Image, 
  Settings2,
  Sparkles,
  Download,
  Heart,
  Play
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

const models = ["Sora", "Runway Gen-2", "Pika Labs", "Stable Video"];
const orientations = ["Горизонтальное", "Вертикальное", "Квадрат"];
const durations = ["4 сек", "8 сек", "16 сек"];

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
  const [selectedOrientation, setSelectedOrientation] = useState(orientations[0]);
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [galleryTab, setGalleryTab] = useState("examples");

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    console.log("Generate:", { prompt, model: selectedModel, orientation: selectedOrientation, duration: selectedDuration });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
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

          <Select value={selectedOrientation} onValueChange={setSelectedOrientation}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {orientations.map((orient) => (
                <SelectItem key={orient} value={orient}>{orient}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {durations.map((dur) => (
                <SelectItem key={dur} value={dur}>{dur}</SelectItem>
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
