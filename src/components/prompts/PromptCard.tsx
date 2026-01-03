import { Heart, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  id: string;
  title: string;
  preview: string;
  tags: string[];
  model: "GPT" | "Claude" | "Gemini";
  isLiked?: boolean;
  onClick?: () => void;
  onLike?: () => void;
  className?: string;
}

const modelColors = {
  GPT: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  Claude: "bg-orange-500/10 text-orange-600 border-orange-200",
  Gemini: "bg-blue-500/10 text-blue-600 border-blue-200",
};

export function PromptCard({
  title,
  preview,
  tags,
  model,
  isLiked = false,
  onClick,
  onLike,
  className,
}: PromptCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/20 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Model badge */}
      <div className="mb-3 flex items-center justify-between">
        <Badge 
          variant="outline" 
          className={cn("text-xs font-medium border", modelColors[model])}
        >
          <Sparkles className="mr-1 h-3 w-3" />
          {model}
        </Badge>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation();
            onLike?.();
          }}
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-opacity",
            isLiked && "opacity-100 text-rose-500"
          )}
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        </Button>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Preview */}
      <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
        {preview}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
          >
            #{tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
            +{tags.length - 3}
          </span>
        )}
      </div>

      {/* Hover action */}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="soft"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Copy className="h-3.5 w-3.5 mr-1.5" />
          Copy
        </Button>
      </div>
    </div>
  );
}
