import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  MessageSquare, 
  Bot, 
  Bookmark, 
  Clock,
  ChevronLeft,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { icon: LayoutGrid, label: "Prompt Catalog", path: "/" },
  { icon: MessageSquare, label: "AI Chat", path: "/chat" },
  { icon: Bot, label: "My Assistants", path: "/assistants" },
];

const libraryNavItems = [
  { icon: Bookmark, label: "My Library", path: "/library" },
  { icon: Clock, label: "History", path: "/history" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const NavItem = ({ 
    icon: Icon, 
    label, 
    path 
  }: { 
    icon: typeof LayoutGrid; 
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
          <nav className="flex-1 space-y-1 px-3 py-4">
            {/* Main section */}
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-sidebar-border" />

            {/* Library section */}
            <div className="space-y-1">
              <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Library
              </p>
              {libraryNavItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <NavLink to="/settings">
              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </div>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}
