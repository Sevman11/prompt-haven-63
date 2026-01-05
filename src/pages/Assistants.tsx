import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Bot, MessageSquare, MoreVertical, Pencil, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { assistants as initialAssistants } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const emojiOptions = ["🤖", "✍️", "💻", "📊", "🎨", "🔍", "⚖️", "🎯", "💡", "🚀"];
const colorOptions = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#6366F1", "#EC4899", "#14B8A6"];

const availableAssistants = [
  { id: "avail-1", name: "SEO Специалист", description: "Оптимизация контента для поисковых систем", icon: "🔍", color: "#10B981" },
  { id: "avail-2", name: "Переводчик", description: "Перевод текстов на любые языки", icon: "🌐", color: "#6366F1" },
  { id: "avail-3", name: "Редактор", description: "Проверка и улучшение текстов", icon: "✏️", color: "#F59E0B" },
  { id: "avail-4", name: "Юрист", description: "Консультации по правовым вопросам", icon: "⚖️", color: "#EF4444" },
  { id: "avail-5", name: "HR Менеджер", description: "Подбор персонала и HR вопросы", icon: "👥", color: "#EC4899" },
  { id: "avail-6", name: "Финансист", description: "Финансовое планирование и анализ", icon: "💰", color: "#14B8A6" },
];

export default function Assistants() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [assistants, setAssistants] = useState(initialAssistants);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAssistant, setNewAssistant] = useState({
    name: "",
    description: "",
    icon: "🤖",
    color: "#3B82F6",
  });

  const filteredAssistants = assistants.filter((assistant) =>
    assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailable = availableAssistants.filter(
    (avail) => !assistants.some((a) => a.name === avail.name)
  );

  const handleCreateAssistant = () => {
    if (!newAssistant.name.trim()) {
      toast({
        title: "Введите имя",
        description: "Пожалуйста, укажите имя для ИИ-сотрудника",
        variant: "destructive",
      });
      return;
    }

    const assistant = {
      id: Date.now().toString(),
      ...newAssistant,
    };

    setAssistants((prev) => [...prev, assistant]);
    setNewAssistant({ name: "", description: "", icon: "🤖", color: "#3B82F6" });
    setIsDialogOpen(false);
    
    toast({
      title: "ИИ-сотрудник создан",
      description: `${assistant.name} добавлен в вашу команду`,
    });
  };

  const handleDeleteAssistant = (id: string) => {
    setAssistants((prev) => prev.filter((a) => a.id !== id));
    toast({
      title: "ИИ-сотрудник удалён",
      description: "Сотрудник был удалён из команды",
    });
  };

  const handleAddAssistant = (avail: typeof availableAssistants[0]) => {
    const newAssist = {
      id: Date.now().toString(),
      name: avail.name,
      description: avail.description,
      icon: avail.icon,
      color: avail.color,
    };
    setAssistants((prev) => [...prev, newAssist]);
    toast({
      title: "ИИ-сотрудник добавлен",
      description: `${avail.name} добавлен в вашу команду`,
    });
  };

  const handleChat = (assistant: typeof assistants[0]) => {
    navigate("/chat");
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">ИИ Сотрудники</h1>
        <p className="text-muted-foreground">Управляйте ролями и создавайте ИИ-сотрудников</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск сотрудников..."
          className="pl-10"
        />
      </div>

      {/* My Assistants Section */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-foreground mb-4">Мои сотрудники</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Create Card */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-border cursor-pointer transition-all",
                  "hover:border-primary/50 hover:bg-primary-soft/30",
                  "animate-fade-in opacity-0 stagger-1"
                )}
              >
                <div className="h-12 w-12 rounded-xl bg-primary-soft flex items-center justify-center shrink-0">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <span className="font-semibold text-foreground">СОЗДАТЬ ИИ-СОТРУДНИКА</span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Создать ИИ-сотрудника</DialogTitle>
                <DialogDescription>
                  Настройте персонажа с уникальной ролью и специализацией
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-4">
                {/* Icon selector */}
                <div className="space-y-2">
                  <Label>Иконка</Label>
                  <div className="flex flex-wrap gap-2">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setNewAssistant((prev) => ({ ...prev, icon: emoji }))}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg border-2 text-xl transition-all",
                          newAssistant.icon === emoji
                            ? "border-primary bg-primary-soft"
                            : "border-border bg-background hover:border-primary/50"
                        )}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color selector */}
                <div className="space-y-2">
                  <Label>Цвет</Label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewAssistant((prev) => ({ ...prev, color }))}
                        className={cn(
                          "h-8 w-8 rounded-full transition-all ring-offset-2 ring-offset-background",
                          newAssistant.color === color && "ring-2 ring-primary"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Название</Label>
                  <Input
                    id="name"
                    value={newAssistant.name}
                    onChange={(e) => setNewAssistant((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Например: Копирайтер"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={newAssistant.description}
                    onChange={(e) => setNewAssistant((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Опишите специализацию сотрудника..."
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button variant="gradient" onClick={handleCreateAssistant}>
                  Создать
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Assistant Cards - Compact */}
          {filteredAssistants.map((assistant, index) => (
            <div
              key={assistant.id}
              className={cn(
                "group relative rounded-2xl bg-card border border-border p-4 transition-all cursor-pointer",
                "hover:shadow-card-hover hover:border-primary/20",
                "animate-fade-in opacity-0",
                `stagger-${((index + 1) % 6) + 1}`
              )}
            >
              {/* Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon-sm" 
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="h-4 w-4 mr-2" />
                    Редактировать
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => handleDeleteAssistant(assistant.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Content - Icon and Name on same row */}
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: `${assistant.color}20` }}
                >
                  {assistant.icon}
                </div>
                <h3 className="font-semibold text-foreground">{assistant.name}</h3>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{assistant.description}</p>

              {/* Chat button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2"
                onClick={() => handleChat(assistant)}
              >
                <MessageSquare className="h-4 w-4" />
                Чат
              </Button>
            </div>
          ))}

          {/* Empty slots */}
          {filteredAssistants.length < 5 && Array.from({ length: Math.max(0, 2 - filteredAssistants.length) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border border-dashed border-border",
                "animate-fade-in opacity-0",
                `stagger-${((filteredAssistants.length + index + 2) % 6) + 1}`
              )}
            >
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <Bot className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Пустой слот</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Assistants Section */}
      {filteredAvailable.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Доступные сотрудники</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAvailable.map((assistant, index) => (
              <div
                key={assistant.id}
                className={cn(
                  "group relative rounded-2xl bg-card border border-border p-4 transition-all",
                  "hover:shadow-card-hover hover:border-primary/20",
                  "animate-fade-in opacity-0",
                  `stagger-${((index) % 6) + 1}`
                )}
              >
                {/* Content - Icon and Name on same row */}
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: `${assistant.color}20` }}
                  >
                    {assistant.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{assistant.name}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{assistant.description}</p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => navigate("/chat")}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Чат
                  </Button>
                  <Button 
                    variant="gradient" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => handleAddAssistant(assistant)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Добавить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state when searching */}
      {searchQuery && filteredAssistants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-3xl">
            🤖
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Сотрудники не найдены</h3>
          <p className="text-muted-foreground max-w-sm">
            Попробуйте другой поисковый запрос
          </p>
        </div>
      )}
    </div>
  );
}
