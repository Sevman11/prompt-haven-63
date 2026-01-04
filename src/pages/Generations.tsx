import { useState } from "react";
import { 
  Image, 
  Video, 
  FileText, 
  Download,
  Heart,
  Play,
  Trash2,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GenerationType = "all" | "photo" | "video" | "text";

const filters = [
  { id: "all" as const, label: "Все", icon: LayoutGrid },
  { id: "photo" as const, label: "Фото", icon: Image },
  { id: "video" as const, label: "Видео", icon: Video },
  { id: "text" as const, label: "Текст", icon: FileText },
];

const generations = [
  { id: "1", type: "photo", title: "Закат в горах", date: "2 часа назад", thumbnail: "/placeholder.svg" },
  { id: "2", type: "video", title: "Морские волны", date: "5 часов назад", thumbnail: "/placeholder.svg" },
  { id: "3", type: "photo", title: "Портрет", date: "1 день назад", thumbnail: "/placeholder.svg" },
  { id: "4", type: "text", title: "Статья о маркетинге", date: "1 день назад", preview: "Маркетинг — это процесс создания ценности для клиентов..." },
  { id: "5", type: "photo", title: "Абстракция", date: "2 дня назад", thumbnail: "/placeholder.svg" },
  { id: "6", type: "video", title: "Таймлапс города", date: "3 дня назад", thumbnail: "/placeholder.svg" },
  { id: "7", type: "photo", title: "Космос", date: "4 дня назад", thumbnail: "/placeholder.svg" },
  { id: "8", type: "text", title: "Пост для соцсетей", date: "5 дней назад", preview: "Как привлечь внимание аудитории с первых секунд..." },
];

export default function Generations() {
  const [activeFilter, setActiveFilter] = useState<GenerationType>("all");

  const filteredGenerations = generations.filter(
    (gen) => activeFilter === "all" || gen.type === activeFilter
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 border-r border-border flex-col bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Фильтры</h2>
        </div>
        <nav className="p-3 space-y-1">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            const count = filter.id === "all" 
              ? generations.length 
              : generations.filter(g => g.type === filter.id).length;
            
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{filter.label}</span>
                </div>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  isActive ? "bg-primary/10" : "bg-secondary"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground mb-2">Мои генерации</h1>
          <p className="text-muted-foreground">
            Все ваши созданные материалы в одном месте
          </p>
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden p-4 border-b border-border">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <Button
                  key={filter.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGenerations.map((gen, index) => (
              <div
                key={gen.id}
                className={cn(
                  "group relative rounded-xl overflow-hidden bg-card border border-border cursor-pointer hover:shadow-card-hover hover:border-primary/20 transition-all",
                  "animate-fade-in opacity-0",
                  `stagger-${(index % 6) + 1}`,
                  gen.type === "text" ? "aspect-[4/3]" : "aspect-square"
                )}
              >
                {gen.type === "text" ? (
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{gen.date}</span>
                    </div>
                    <h4 className="font-medium text-sm text-foreground mb-2">{gen.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-3 flex-1">{gen.preview}</p>
                  </div>
                ) : (
                  <>
                    <img 
                      src={gen.thumbnail} 
                      alt={gen.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {gen.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="h-4 w-4 text-foreground ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-medium text-sm">{gen.title}</h4>
                        <p className="text-white/70 text-xs">{gen.date}</p>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button size="icon-sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="icon-sm" variant="secondary" className="bg-white/20 hover:bg-red-500/80 text-white border-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredGenerations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <LayoutGrid className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Нет генераций</h3>
              <p className="text-muted-foreground max-w-sm">
                Создайте первый контент с помощью ИИ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
