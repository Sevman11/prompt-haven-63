import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookmarkX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompts/PromptCard";
import { prompts } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Library() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(
    new Set(prompts.filter(p => p.isLiked).map(p => p.id))
  );

  const savedPrompts = prompts.filter((p) => likedPrompts.has(p.id));
  
  const filteredPrompts = savedPrompts.filter((prompt) =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        <h1 className="text-2xl font-bold text-foreground mb-2">My Library</h1>
        <p className="text-muted-foreground">Your saved prompts and favorites</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your library..."
          className="pl-10"
        />
      </div>

      {/* Results count */}
      {filteredPrompts.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredPrompts.length} saved prompt{filteredPrompts.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Grid */}
      {filteredPrompts.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <BookmarkX className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {searchQuery ? "No matching prompts" : "Your library is empty"}
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {searchQuery 
              ? "Try adjusting your search term."
              : "Save prompts from the catalog to build your personal library."
            }
          </p>
          {!searchQuery && (
            <Button variant="gradient" onClick={() => navigate("/")}>
              Browse Catalog
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
