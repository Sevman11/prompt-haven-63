import { MessageSquare, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AssistantCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  onChat?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function AssistantCard({
  name,
  description,
  icon,
  color,
  onChat,
  onEdit,
  onDelete,
  className,
}: AssistantCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/20",
        className
      )}
    >
      {/* Menu */}
      <div className="absolute right-4 top-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Icon */}
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
        style={{ backgroundColor: `${color}15` }}
      >
        <span>{icon}</span>
      </div>

      {/* Content */}
      <h3 className="mb-2 text-lg font-semibold text-foreground">{name}</h3>
      <p className="mb-6 flex-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Action */}
      <Button variant="soft" className="w-full" onClick={onChat}>
        <MessageSquare className="mr-2 h-4 w-4" />
        Start Chat
      </Button>
    </div>
  );
}
