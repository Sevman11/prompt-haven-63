import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home,
  MessageSquare, 
  Image,
  Video,
  FileText,
  Bot, 
  Layers,
  GraduationCap,
  CreditCard,
  User,
  HelpCircle,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Factory,
  Filter,
  ShieldCheck,
  Rocket,
  Rss,
  FileCheck,
  FileEdit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { icon: Home, label: "Главная", path: "/" },
  { icon: MessageSquare, label: "ИИ Чат", path: "/chat" },
  { icon: Image, label: "Фото", path: "/photo" },
  { icon: Video, label: "Видео", path: "/video" },
  { icon: FileText, label: "Промты", path: "/prompts" },
  { icon: Bot, label: "ИИ Сотрудник", path: "/assistants" },
  { icon: Layers, label: "Мои генерации", path: "/generations" },
];

const contentFactoryItems = [
  { icon: Rss, label: "Источники", path: "/content-factory/sources" },
  { icon: Filter, label: "Сбор и фильтрация", path: "/content-factory/collection" },
  { icon: ShieldCheck, label: "Проверка", path: "/content-factory/check" },
  { icon: FileEdit, label: "Базовый пост", path: "/content-factory/base-post" },
  { icon: Rocket, label: "Публикации", path: "/content-factory/publications" },
];

const bottomNavItems = [
  { icon: GraduationCap, label: "Обучение", path: "/training" },
  { icon: CreditCard, label: "Подписка", path: "/subscription" },
  { icon: User, label: "Профиль", path: "/profile" },
  { icon: HelpCircle, label: "Поддержка", path: "/support" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [isContentFactoryOpen, setIsContentFactoryOpen] = useState(
    location.pathname.startsWith("/content-factory")
  );

  const NavItem = ({ 
    icon: Icon, 
    label, 
    path 
  }: { 
    icon: typeof Home; 
    label: string; 
    path: string;
  }) => {
    const isActive = location.pathname === path;
    
    return (
      <NavLink to={path} onClick={() => window.innerWidth < 1024 && onClose()}>
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            isActive
              ? "bg-primary-soft text-primary shadow-sm"
              : "text-sidebar-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
          <span>{label}</span>
        </div>
      </NavLink>
    );
  };

  const isContentFactoryActive = location.pathname.startsWith("/content-factory");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-end p-4 lg:hidden">
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {/* Main section */}
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>

            {/* Content Factory Section */}
            <div className="my-4 h-px bg-sidebar-border" />
            
            <Collapsible open={isContentFactoryOpen} onOpenChange={setIsContentFactoryOpen}>
              <CollapsibleTrigger asChild>
                <button
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isContentFactoryActive
                      ? "bg-primary-soft text-primary shadow-sm"
                      : "text-sidebar-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Factory className={cn("h-5 w-5", isContentFactoryActive && "text-primary")} />
                    <span>Контент-завод</span>
                  </div>
                  {isContentFactoryOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pl-4 pt-1">
                {contentFactoryItems.map((item) => (
                  <NavItem key={item.path} {...item} />
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Divider */}
            <div className="my-4 h-px bg-sidebar-border" />

            {/* Bottom section */}
            <div className="space-y-1">
              {bottomNavItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
