import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, Image, Video, FileText, LayoutGrid, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptCard } from "@/components/prompts/PromptCard";
import { prompts } from "@/data/mockData";
import { cn } from "@/lib/utils";

type ContentType = "all" | "text" | "photo" | "video";

const contentTypes = [
  { id: "all" as const, label: "Все", icon: LayoutGrid },
  { id: "text" as const, label: "Текст", icon: FileText },
  { id: "photo" as const, label: "Фото", icon: Image },
  { id: "video" as const, label: "Видео", icon: Video },
];

const categories = ["All", "Marketing", "Code", "Content", "Data", "Support"];
const models = ["All Models", "GPT", "Claude", "Gemini"];

export default function PromptCatalog() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("catalog");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContentType, setSelectedContentType] = useState<ContentType>("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState("All Models");
  const [savedPrompts, setSavedPrompts] = useState<Set<string>>(
    new Set(prompts.filter(p => p.isLiked).map(p => p.id))
  );

  const filterPrompts = (promptsList: typeof prompts) => {
    return promptsList.filter((prompt) => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" ||
        prompt.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
      
      const matchesModel = selectedModel === "All Models" || prompt.model === selectedModel;

      return matchesSearch && matchesCategory && matchesModel;
    });
  };

  const filteredCatalogPrompts = filterPrompts(prompts);
  const filteredMyPrompts = filterPrompts(prompts.filter(p => savedPrompts.has(p.id)));

  const toggleSave = (id: string) => {
    setSavedPrompts(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderFilters = () => (
    <>
      {/* Content Type Filter */}
      <div className="mb-6 flex gap-2">
        {contentTypes.map((type) => {
          const Icon = type.icon;
          const isActive = selectedContentType === type.id;
          return (
            <Button
              key={type.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContentType(type.id)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {type.label}
            </Button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск промтов..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Фильтры</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Сортировка</span>
            </Button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Model filter */}
        <div className="flex gap-2">
          {models.map((model) => (
            <Badge
              key={model}
              variant={selectedModel === model ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedModel(model)}
            >
              {model}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );

  const renderPromptGrid = (promptsList: typeof prompts, isMy: boolean = false) => (
    <>
      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Найдено {promptsList.length} промтов
        </p>
      </div>

      {/* Prompts Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {promptsList.map((prompt, index) => (
          <div
            key={prompt.id}
            className={cn("animate-fade-in opacity-0", `stagger-${(index % 6) + 1}`)}
          >
            <PromptCard
              {...prompt}
              isLiked={savedPrompts.has(prompt.id)}
              onClick={() => navigate(`/prompt/${prompt.id}`)}
              onLike={() => toggleSave(prompt.id)}
            />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {promptsList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            {isMy ? <Bookmark className="h-8 w-8 text-muted-foreground" /> : <Search className="h-8 w-8 text-muted-foreground" />}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {isMy ? "Нет сохранённых промтов" : "Промты не найдены"}
          </h3>
          <p className="text-muted-foreground max-w-sm">
            {isMy ? "Добавьте промты в избранное, нажав на иконку сердечка." : "Попробуйте изменить параметры поиска или фильтры."}
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Каталог промтов</h1>
        <p className="text-muted-foreground">Готовые промты для текста, изображений и видео</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="catalog" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Каталог промтов
          </TabsTrigger>
          <TabsTrigger value="my" className="gap-2">
            <BookmarkCheck className="h-4 w-4" />
            Мои промты
            {savedPrompts.size > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {savedPrompts.size}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          {renderFilters()}
          {renderPromptGrid(filteredCatalogPrompts)}
        </TabsContent>

        <TabsContent value="my">
          {renderFilters()}
          {renderPromptGrid(filteredMyPrompts, true)}
        </TabsContent>
      </Tabs>

    </div>
  );
}
