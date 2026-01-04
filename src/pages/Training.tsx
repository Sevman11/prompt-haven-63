import { useState } from "react";
import { 
  Play, 
  Clock,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const lessons = [
  { 
    id: "1", 
    title: "Введение в PromtHub", 
    description: "Обзор возможностей платформы и первые шаги",
    duration: "5:30",
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "2", 
    title: "Как писать эффективные промты", 
    description: "Техники создания качественных запросов для ИИ",
    duration: "12:45",
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "3", 
    title: "Генерация изображений", 
    description: "Полное руководство по созданию фото с помощью ИИ",
    duration: "18:20",
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "4", 
    title: "Создание видео контента", 
    description: "Превращаем идеи в динамичные видеоролики",
    duration: "15:10",
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "5", 
    title: "ИИ Сотрудники", 
    description: "Настройка виртуальных помощников под ваши задачи",
    duration: "10:00",
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "6", 
    title: "Продвинутые техники", 
    description: "Секреты профессиональной работы с нейросетями",
    duration: "22:15",
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "7", 
    title: "Автоматизация процессов", 
    description: "Как сэкономить время с помощью шаблонов",
    duration: "8:45",
    thumbnail: "/placeholder.svg"
  },
  { 
    id: "8", 
    title: "Кейсы и примеры", 
    description: "Реальные примеры использования PromtHub",
    duration: "14:30",
    thumbnail: "/placeholder.svg"
  },
];

export default function Training() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Обучение</h1>
        <p className="text-muted-foreground">
          Видео-уроки и гайды по использованию сервиса
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lessons.map((lesson, index) => {
          const isHovered = hoveredCard === lesson.id;
          
          return (
            <div
              key={lesson.id}
              className={cn(
                "group relative rounded-2xl overflow-hidden bg-card border border-border cursor-pointer transition-all",
                "hover:shadow-card-hover hover:border-primary/20",
                "animate-fade-in opacity-0",
                `stagger-${(index % 6) + 1}`
              )}
              onMouseEnter={() => setHoveredCard(lesson.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-secondary">
                <img 
                  src={lesson.thumbnail} 
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className={cn(
                      "h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all",
                      isHovered && "scale-110 bg-primary"
                    )}
                  >
                    <Play 
                      className={cn(
                        "h-6 w-6 ml-1 transition-colors",
                        isHovered ? "text-white" : "text-foreground"
                      )} 
                      fill="currentColor" 
                    />
                  </div>
                </div>
                
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 rounded text-white text-xs">
                  <Clock className="h-3 w-3" />
                  {lesson.duration}
                </div>

                {/* Hover overlay with button */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Просмотр
                  </Button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                  {lesson.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {lesson.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
