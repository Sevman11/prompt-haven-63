import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, Sparkles, Trash2, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { historyItems as initialHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const modelColors = {
  GPT: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  Claude: "bg-orange-500/10 text-orange-600 border-orange-200",
  Gemini: "bg-blue-500/10 text-blue-600 border-blue-200",
};

export default function History() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState(initialHistory);

  const filteredHistory = history.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Conversation deleted",
      description: "The conversation has been removed from your history.",
    });
  };

  const handleClearAll = () => {
    setHistory([]);
    toast({
      title: "History cleared",
      description: "All conversations have been removed.",
    });
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">History</h1>
          <p className="text-muted-foreground">Your recent conversations and generations</p>
        </div>
        {history.length > 0 && (
          <Button variant="outline" onClick={handleClearAll} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search history..."
          className="pl-10"
        />
      </div>

      {/* History list */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-card-hover hover:border-primary/20 cursor-pointer animate-fade-in opacity-0",
                `stagger-${(index % 6) + 1}`
              )}
              onClick={() => navigate("/chat")}
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                  <Badge
                    variant="outline"
                    className={cn("text-xs shrink-0", modelColors[item.model])}
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    {item.model}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{item.preview}</p>
              </div>

              {/* Date */}
              <span className="hidden sm:block text-sm text-muted-foreground shrink-0">
                {item.date}
              </span>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/chat")}>
                    Continue conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {searchQuery ? "No matching conversations" : "No history yet"}
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {searchQuery 
              ? "Try adjusting your search term."
              : "Start a conversation to see your history here."
            }
          </p>
          {!searchQuery && (
            <Button variant="gradient" onClick={() => navigate("/chat")}>
              Start Chatting
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
