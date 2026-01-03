import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompts/PromptCard";
import { prompts } from "@/data/mockData";
import { cn } from "@/lib/utils";

const categories = ["All", "Marketing", "Code", "Content", "Data", "Support"];
const models = ["All Models", "GPT", "Claude", "Gemini"];

export default function PromptCatalog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState("All Models");
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(
    new Set(prompts.filter(p => p.isLiked).map(p => p.id))
  );

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" ||
      prompt.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    const matchesModel = selectedModel === "All Models" || prompt.model === selectedModel;

    return matchesSearch && matchesCategory && matchesModel;
  });

  const toggleLike = (id: string) => {
    setLikedPrompts(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Prompt Catalog</h1>
        <p className="text-muted-foreground">Discover and use powerful prompts for your AI workflows</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Sort</span>
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

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPrompts.length} prompts
        </p>
      </div>

      {/* Prompts Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPrompts.map((prompt, index) => (
          <div
            key={prompt.id}
            className={cn("animate-fade-in opacity-0", `stagger-${(index % 6) + 1}`)}
          >
            <PromptCard
              {...prompt}
              isLiked={likedPrompts.has(prompt.id)}
              onClick={() => navigate(`/prompt/${prompt.id}`)}
              onLike={() => toggleLike(prompt.id)}
            />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPrompts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">No prompts found</h3>
          <p className="text-muted-foreground max-w-sm">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
