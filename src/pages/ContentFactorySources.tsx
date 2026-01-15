import { useState } from "react";
import { 
  Rss, 
  Plus, 
  Trash2, 
  Check, 
  Settings, 
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Source {
  id: string;
  type: string;
  name: string;
  url: string;
  isActive: boolean;
  lastSync: string;
  itemsCount: number;
}

const sourceTypes = [
  { id: "rss", label: "RSS Лента", icon: "📡", description: "Подписка на RSS/Atom фид" },
  { id: "telegram", label: "Telegram канал", icon: "📱", description: "Парсинг публичного канала" },
  { id: "youtube", label: "YouTube канал", icon: "🎬", description: "Новые видео с канала" },
  { id: "rutube", label: "RuTube канал", icon: "🎥", description: "Видео с RuTube" },
  { id: "tiktok", label: "TikTok аккаунт", icon: "🎵", description: "Контент из TikTok" },
  { id: "dzen", label: "Яндекс Дзен", icon: "📰", description: "Статьи из Дзена" },
  { id: "vk", label: "ВКонтакте", icon: "💬", description: "Посты из сообщества VK" },
];

const mockSources: Source[] = [
  { id: "1", type: "rss", name: "Habr - Новости", url: "https://habr.com/ru/rss/", isActive: true, lastSync: "10 мин назад", itemsCount: 156 },
  { id: "2", type: "telegram", name: "@technews_ru", url: "https://t.me/technews_ru", isActive: true, lastSync: "5 мин назад", itemsCount: 89 },
  { id: "3", type: "youtube", name: "TechReviews", url: "https://youtube.com/@techreviews", isActive: false, lastSync: "2 часа назад", itemsCount: 45 },
  { id: "4", type: "dzen", name: "AI News Дзен", url: "https://dzen.ru/ainews", isActive: true, lastSync: "30 мин назад", itemsCount: 234 },
];

export default function ContentFactorySources() {
  const [sources, setSources] = useState<Source[]>(mockSources);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSourceType, setNewSourceType] = useState("");
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("");

  const toggleSource = (id: string) => {
    setSources(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const deleteSource = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  const addSource = () => {
    if (!newSourceType || !newSourceName || !newSourceUrl) return;
    
    const newSource: Source = {
      id: String(Date.now()),
      type: newSourceType,
      name: newSourceName,
      url: newSourceUrl,
      isActive: true,
      lastSync: "Сейчас",
      itemsCount: 0,
    };
    
    setSources(prev => [...prev, newSource]);
    setNewSourceType("");
    setNewSourceName("");
    setNewSourceUrl("");
    setIsAddDialogOpen(false);
  };

  const getSourceIcon = (type: string) => {
    return sourceTypes.find(t => t.id === type)?.icon || "📋";
  };

  const activeCount = sources.filter(s => s.isActive).length;
  const totalItems = sources.reduce((acc, s) => acc + s.itemsCount, 0);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Rss className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Источники контента</h1>
              <p className="text-muted-foreground">Настройка каналов для сбора информации</p>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Добавить источник
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Добавить новый источник</DialogTitle>
                <DialogDescription>
                  Выберите тип источника и укажите данные для подключения
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Тип источника</Label>
                  <Select value={newSourceType} onValueChange={setNewSourceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      {sourceTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <span>{type.icon}</span>
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Название</Label>
                  <Input 
                    value={newSourceName}
                    onChange={(e) => setNewSourceName(e.target.value)}
                    placeholder="Например: Habr - Технологии"
                  />
                </div>

                <div className="space-y-2">
                  <Label>URL или идентификатор</Label>
                  <Input 
                    value={newSourceUrl}
                    onChange={(e) => setNewSourceUrl(e.target.value)}
                    placeholder="https://... или @channel_name"
                  />
                </div>

                <Button onClick={addSource} className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{sources.length}</div>
            <p className="text-sm text-muted-foreground">Всего источников</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">{activeCount}</div>
            <p className="text-sm text-muted-foreground">Активных</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{totalItems}</div>
            <p className="text-sm text-muted-foreground">Материалов собрано</p>
          </CardContent>
        </Card>
      </div>

      {/* Source Types */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Доступные типы источников</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {sourceTypes.map((type) => (
            <Card 
              key={type.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => {
                setNewSourceType(type.id);
                setIsAddDialogOpen(true);
              }}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{type.label}</p>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Connected Sources */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Подключённые источники</h2>
        <div className="space-y-3">
          {sources.map((source) => (
            <Card key={source.id} className={cn(!source.isActive && "opacity-60")}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{getSourceIcon(source.type)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{source.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {sourceTypes.find(t => t.id === source.type)?.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{source.url}</span>
                        <ExternalLink className="h-3 w-3" />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">{source.itemsCount} материалов</p>
                      <p className="text-xs text-muted-foreground">Обновлено: {source.lastSync}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Switch 
                        checked={source.isActive}
                        onCheckedChange={() => toggleSource(source.id)}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteSource(source.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {sources.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Rss className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-semibold mb-2">Нет подключённых источников</h3>
                <p className="text-muted-foreground mb-4">
                  Добавьте источники для автоматического сбора контента
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Добавить первый источник
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
