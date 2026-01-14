import { useState } from "react";
import { 
  Rocket, 
  Calendar,
  RefreshCw,
  Check,
  ArrowLeft,
  Image,
  Send,
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SocialPost {
  id: string;
  network: string;
  icon: string;
  title: string;
  content: string;
  maxLength: number;
  imageFormat: string;
  isTextReady: boolean;
  isImageReady: boolean;
  isVerified: boolean;
}

const initialPosts: SocialPost[] = [
  {
    id: "telegram",
    network: "Telegram",
    icon: "📱",
    title: "Новые технологии в AI: что ждёт нас в 2025",
    content: "🤖 Искусственный интеллект продолжает развиваться стремительными темпами!\n\nВ 2025 году мы ожидаем:\n\n✨ Более точную генерацию изображений и видео\n📱 Интеграцию AI в повседневные приложения\n🤝 Развитие персональных AI-ассистентов\n\n#AI #Технологии #Будущее",
    maxLength: 4096,
    imageFormat: "1:1 или 16:9",
    isTextReady: true,
    isImageReady: false,
    isVerified: true,
  },
  {
    id: "vk",
    network: "ВКонтакте",
    icon: "💬",
    title: "Новые технологии в AI: что ждёт нас в 2025",
    content: "Искусственный интеллект продолжает развиваться стремительными темпами. В 2025 году мы ожидаем прорывы в области генеративных моделей, мультимодальных систем и автономных агентов.\n\nКлючевые тренды:\n• Более точная генерация изображений и видео\n• Интеграция AI в повседневные приложения\n• Развитие персональных AI-ассистентов\n\n#AI #искусственныйинтеллект #технологии",
    maxLength: 15895,
    imageFormat: "16:9",
    isTextReady: true,
    isImageReady: false,
    isVerified: true,
  },
  {
    id: "instagram",
    network: "Instagram",
    icon: "📸",
    title: "",
    content: "Искусственный интеллект в 2025 году 🚀\n\nТренды которые изменят всё:\n\n1️⃣ Генеративные модели нового поколения\n2️⃣ AI в каждом приложении\n3️⃣ Персональные ассистенты\n\nА вы готовы к будущему? 🤖\n\n#AI #ArtificialIntelligence #Tech #Future #Innovation #Technology2025",
    maxLength: 2200,
    imageFormat: "1:1 или 4:5",
    isTextReady: false,
    isImageReady: false,
    isVerified: false,
  },
  {
    id: "shorts",
    network: "Shorts / Reels",
    icon: "🎬",
    title: "AI в 2025",
    content: "🤖 Будущее уже здесь!\n\nТОП-3 тренда AI в 2025:\n✨ Генерация контента\n📱 Умные приложения\n🤝 Персональные боты\n\n#AI #Shorts #Технологии",
    maxLength: 500,
    imageFormat: "9:16",
    isTextReady: false,
    isImageReady: false,
    isVerified: false,
  },
];

export default function ContentFactoryPublications() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<SocialPost[]>(initialPosts);
  const [activeTab, setActiveTab] = useState("telegram");

  const updatePost = (id: string, updates: Partial<SocialPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
  };

  const currentPost = posts.find(p => p.id === activeTab);
  
  const allReady = posts.every(p => p.isTextReady && p.isImageReady && p.isVerified);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Публикации и утверждение</h1>
            <p className="text-muted-foreground">Адаптация контента под выбранные соцсети</p>
          </div>
        </div>
      </div>

      {/* Social Network Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          {posts.map((post) => (
            <TabsTrigger key={post.id} value={post.id} className="gap-2">
              <span>{post.icon}</span>
              <span className="hidden sm:inline">{post.network}</span>
              {post.isTextReady && post.isImageReady && post.isVerified && (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {posts.map((post) => (
          <TabsContent key={post.id} value={post.id} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Column - Editor */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Текст поста</span>
                      <Badge variant="outline">
                        {post.content.length} / {post.maxLength}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {post.network !== "Instagram" && post.network !== "Shorts / Reels" && (
                      <div className="space-y-2">
                        <Label>Заголовок</Label>
                        <Input 
                          value={post.title}
                          onChange={(e) => updatePost(post.id, { title: e.target.value })}
                          placeholder="Введите заголовок..."
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Текст</Label>
                      <Textarea 
                        value={post.content}
                        onChange={(e) => updatePost(post.id, { 
                          content: e.target.value.slice(0, post.maxLength) 
                        })}
                        placeholder="Введите текст поста..."
                        className="min-h-[250px]"
                      />
                    </div>

                    <Button variant="outline" className="w-full gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Перегенерировать текст
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="h-5 w-5" />
                      Изображение
                      <Badge variant="outline" className="ml-auto">{post.imageFormat}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div 
                      className={cn(
                        "rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/20",
                        post.imageFormat.includes("9:16") ? "aspect-[9/16] max-h-[300px]" : "aspect-video"
                      )}
                    >
                      <div className="text-center">
                        <Image className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
                        <p className="text-sm text-muted-foreground">Формат: {post.imageFormat}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Перегенерировать
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Preview & Checklist */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Предпросмотр
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border bg-card p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg">{post.icon}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Astra Promt</p>
                          <p className="text-xs text-muted-foreground">Сейчас</p>
                        </div>
                      </div>
                      
                      {post.title && (
                        <h4 className="font-semibold">{post.title}</h4>
                      )}
                      
                      <p className="text-sm whitespace-pre-line">{post.content}</p>
                      
                      <div 
                        className={cn(
                          "rounded-lg bg-muted flex items-center justify-center",
                          post.imageFormat.includes("9:16") ? "aspect-[9/16] max-h-[200px]" : "aspect-video"
                        )}
                      >
                        <Image className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Чек-лист</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => updatePost(post.id, { isTextReady: !post.isTextReady })}
                      >
                        <Checkbox checked={post.isTextReady} />
                        <Label className="cursor-pointer">Текст готов</Label>
                      </div>
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => updatePost(post.id, { isImageReady: !post.isImageReady })}
                      >
                        <Checkbox checked={post.isImageReady} />
                        <Label className="cursor-pointer">Изображение готово</Label>
                      </div>
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => updatePost(post.id, { isVerified: !post.isVerified })}
                      >
                        <Checkbox checked={post.isVerified} />
                        <Label className="cursor-pointer">Проверка пройдена</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Bottom Actions */}
      <div className="mt-8 flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate("/content-factory/verification")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуть на доработку
        </Button>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Запланировать
          </Button>
          <Button className="gap-2" disabled={!allReady}>
            <Rocket className="h-4 w-4" />
            Опубликовать
          </Button>
        </div>
      </div>
    </div>
  );
}
