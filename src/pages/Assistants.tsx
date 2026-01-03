import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AssistantCard } from "@/components/assistants/AssistantCard";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const emojiOptions = ["🤖", "✍️", "💻", "📊", "🎨", "🔍", "⚖️", "🎯", "💡", "🚀"];
const colorOptions = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#6366F1", "#EC4899", "#14B8A6"];

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

  const handleCreateAssistant = () => {
    if (!newAssistant.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your assistant.",
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
      title: "Assistant created",
      description: `${assistant.name} has been added to your assistants.`,
    });
  };

  const handleDeleteAssistant = (id: string) => {
    setAssistants((prev) => prev.filter((a) => a.id !== id));
    toast({
      title: "Assistant deleted",
      description: "The assistant has been removed.",
    });
  };

  const handleChat = (assistant: typeof assistants[0]) => {
    navigate("/chat");
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">My Assistants</h1>
          <p className="text-muted-foreground">Create and manage your custom AI assistants</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Assistant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Assistant</DialogTitle>
              <DialogDescription>
                Configure your custom AI assistant with a unique personality.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* Icon selector */}
              <div className="space-y-2">
                <Label>Icon</Label>
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
                <Label>Color</Label>
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newAssistant.name}
                  onChange={(e) => setNewAssistant((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Marketing Expert"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAssistant.description}
                  onChange={(e) => setNewAssistant((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this assistant specializes in..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleCreateAssistant}>
                Create Assistant
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search assistants..."
          className="pl-10"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAssistants.map((assistant, index) => (
          <div
            key={assistant.id}
            className={cn("animate-fade-in opacity-0", `stagger-${(index % 6) + 1}`)}
          >
            <AssistantCard
              {...assistant}
              onChat={() => handleChat(assistant)}
              onEdit={() => toast({ title: "Edit coming soon" })}
              onDelete={() => handleDeleteAssistant(assistant.id)}
            />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredAssistants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-3xl">
            🤖
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">No assistants found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {searchQuery ? "Try a different search term." : "Create your first custom AI assistant to get started."}
          </p>
          {!searchQuery && (
            <Button variant="gradient" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Assistant
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
