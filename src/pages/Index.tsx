import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  Image, 
  Video, 
  FileText, 
  Bot, 
  Layers,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "chat",
    title: "ИИ Чат",
    description: "Общайтесь с искусственным интеллектом для решения любых задач",
    icon: MessageSquare,
    path: "/chat",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "photo",
    title: "Генерация фото",
    description: "Создавайте уникальные изображения с помощью нейросетей",
    icon: Image,
    path: "/photo",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "video",
    title: "Генерация видео",
    description: "Превращайте идеи в динамичные видеоролики",
    icon: Video,
    path: "/video",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "prompts",
    title: "Каталог промтов",
    description: "Готовые промты для текста, изображений и видео",
    icon: FileText,
    path: "/prompts",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "assistants",
    title: "ИИ Сотрудники",
    description: "Создавайте виртуальных помощников под ваши задачи",
    icon: Bot,
    path: "/assistants",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "generations",
    title: "Мои генерации",
    description: "Все ваши созданные материалы в одном месте",
    icon: Layers,
    path: "/generations",
    gradient: "from-rose-500 to-red-600",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
          ДОБРО ПОЖАЛОВАТЬ В <span className="text-primary">Astra Promt</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ваша личная фабрика контента. Начните создавать прямо сейчас!
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isHovered = hoveredCard === section.id;
          
          return (
            <div
              key={section.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 cursor-pointer",
                "hover:shadow-card-hover hover:border-primary/20",
                "animate-fade-in opacity-0",
                `stagger-${(index % 6) + 1}`
              )}
              onMouseEnter={() => setHoveredCard(section.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(section.path)}
            >
              {/* Gradient overlay on hover */}
              <div 
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
                  section.gradient,
                  isHovered && "opacity-90"
                )}
              />
              
              {/* Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div 
                  className={cn(
                    "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300",
                    isHovered 
                      ? "bg-white/20 text-white" 
                      : "bg-primary-soft text-primary"
                  )}
                >
                  <Icon className="h-7 w-7" />
                </div>
                
                {/* Title */}
                <h3 
                  className={cn(
                    "text-xl font-semibold mb-2 transition-colors duration-300",
                    isHovered ? "text-white" : "text-foreground"
                  )}
                >
                  {section.title}
                </h3>
                
                {/* Description */}
                <p 
                  className={cn(
                    "text-sm line-clamp-2 transition-colors duration-300",
                    isHovered ? "text-white/80" : "text-muted-foreground"
                  )}
                >
                  {section.description}
                </p>
                
                {/* Button on hover */}
                <div 
                  className={cn(
                    "mt-4 flex items-center gap-2 transition-all duration-300",
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  )}
                >
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-white/20 text-white border-0 hover:bg-white/30"
                  >
                    Перейти
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
