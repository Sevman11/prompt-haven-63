import { useState } from "react";
import { 
  Rocket, 
  Eye,
  Pencil,
  Send,
  XCircle,
  Search,
  Image,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableControls, ColumnDef, FilterOption } from "@/components/ui/table-controls";
import { cn } from "@/lib/utils";

interface PublicationItem {
  id: string;
  title: string;
  text: string;
  image: string | null;
  socialNetwork: string;
  socialIcon: string;
  channel: string;
  status: "draft" | "scheduled" | "published" | "cancelled";
  publishDate: string | null;
}

const mockItems: PublicationItem[] = [
  {
    id: "1",
    title: "Новые технологии в AI",
    text: "🤖 Искусственный интеллект продолжает развиваться...",
    image: "/placeholder.svg",
    socialNetwork: "Telegram",
    socialIcon: "📱",
    channel: "@my_tech_channel",
    status: "scheduled",
    publishDate: "2025-01-20 10:00",
  },
  {
    id: "2",
    title: "Новые технологии в AI",
    text: "Искусственный интеллект продолжает развиваться стремительными темпами...",
    image: "/placeholder.svg",
    socialNetwork: "ВКонтакте",
    socialIcon: "💬",
    channel: "Моя группа VK",
    status: "draft",
    publishDate: null,
  },
  {
    id: "3",
    title: "",
    text: "AI в 2025 году 🚀 Тренды которые изменят всё...",
    image: "/placeholder.svg",
    socialNetwork: "Instagram",
    socialIcon: "📸",
    channel: "@my_instagram",
    status: "draft",
    publishDate: null,
  },
  {
    id: "4",
    title: "AI в 2025",
    text: "🤖 Будущее уже здесь! ТОП-3 тренда AI...",
    image: null,
    socialNetwork: "Shorts",
    socialIcon: "🎬",
    channel: "My YouTube Channel",
    status: "published",
    publishDate: "2025-01-15 14:30",
  },
];

const socialNetworkOptions = [
  { value: "all", label: "Все соцсети" },
  { value: "telegram", label: "Telegram" },
  { value: "vk", label: "ВКонтакте" },
  { value: "instagram", label: "Instagram" },
  { value: "shorts", label: "Shorts" },
];

const statusOptions = [
  { value: "all", label: "Все статусы" },
  { value: "draft", label: "Черновик" },
  { value: "scheduled", label: "Запланировано" },
  { value: "published", label: "Опубликовано" },
  { value: "cancelled", label: "Отменено" },
];

export default function ContentFactoryPublicationsList() {
  const navigate = useNavigate();
  const [items, setItems] = useState<PublicationItem[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [columns, setColumns] = useState<ColumnDef[]>([
    { id: "title", label: "Заголовок", visible: true },
    { id: "text", label: "Текст", visible: true },
    { id: "image", label: "Картинка", visible: true },
    { id: "socialNetwork", label: "Соц сеть", visible: true },
    { id: "channel", label: "Канал", visible: true },
    { id: "status", label: "Статус", visible: true },
    { id: "publishDate", label: "Дата публикации", visible: true },
    { id: "actions", label: "Действия", visible: true },
  ]);

  const handleView = (id: string) => {
    navigate(`/content-factory/publications/edit?id=${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/content-factory/publications/edit?id=${id}&edit=true`);
  };

  const handlePublish = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: "published" as const, publishDate: new Date().toISOString() } : item
    ));
  };

  const handleCancel = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: "cancelled" as const } : item
    ));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNetwork = selectedNetwork === "all" || item.socialNetwork.toLowerCase() === selectedNetwork;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesNetwork && matchesStatus;
  });

  const draftCount = items.filter(i => i.status === "draft").length;
  const scheduledCount = items.filter(i => i.status === "scheduled").length;
  const publishedCount = items.filter(i => i.status === "published").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft": return <Badge variant="outline">Черновик</Badge>;
      case "scheduled": return <Badge className="bg-blue-500">Запланировано</Badge>;
      case "published": return <Badge className="bg-green-500">Опубликовано</Badge>;
      case "cancelled": return <Badge variant="destructive">Отменено</Badge>;
      default: return null;
    }
  };

  const filters: FilterOption[] = [
    {
      id: "network",
      label: "Соц сеть",
      options: socialNetworkOptions,
      value: selectedNetwork,
      onChange: setSelectedNetwork,
    },
    {
      id: "status",
      label: "Статус",
      options: statusOptions,
      value: selectedStatus,
      onChange: setSelectedStatus,
    },
  ];

  const isColumnVisible = (columnId: string) =>
    columns.find(c => c.id === columnId)?.visible ?? true;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Публикации</h1>
            <p className="text-muted-foreground">Список подготовленных материалов для публикации</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-sm text-muted-foreground">Всего</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-500">{draftCount}</div>
            <p className="text-sm text-muted-foreground">Черновики</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-500">{scheduledCount}</div>
            <p className="text-sm text-muted-foreground">Запланировано</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">{publishedCount}</div>
            <p className="text-sm text-muted-foreground">Опубликовано</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск публикаций..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <TableControls
          columns={columns}
          onColumnsChange={setColumns}
          filters={filters}
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {isColumnVisible("title") && <TableHead>Заголовок</TableHead>}
                {isColumnVisible("text") && <TableHead className="hidden md:table-cell">Текст</TableHead>}
                {isColumnVisible("image") && <TableHead className="w-[80px]">Картинка</TableHead>}
                {isColumnVisible("socialNetwork") && <TableHead>Соц сеть</TableHead>}
                {isColumnVisible("channel") && <TableHead>Канал</TableHead>}
                {isColumnVisible("status") && <TableHead>Статус</TableHead>}
                {isColumnVisible("publishDate") && <TableHead className="hidden lg:table-cell">Дата публикации</TableHead>}
                {isColumnVisible("actions") && <TableHead className="w-[220px] text-right">Действия</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className={cn(
                  item.status === "published" && "bg-green-500/5",
                  item.status === "cancelled" && "bg-red-500/5 opacity-50"
                )}>
                  {isColumnVisible("title") && (
                    <TableCell>
                      <p className="font-medium line-clamp-1">{item.title || "—"}</p>
                    </TableCell>
                  )}
                  {isColumnVisible("text") && (
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.text}</p>
                    </TableCell>
                  )}
                  {isColumnVisible("image") && (
                    <TableCell>
                      {item.image ? (
                        <img src={item.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Image className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                  )}
                  {isColumnVisible("socialNetwork") && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.socialIcon}</span>
                        <span className="text-sm">{item.socialNetwork}</span>
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible("channel") && (
                    <TableCell>
                      <p className="text-sm text-muted-foreground">{item.channel}</p>
                    </TableCell>
                  )}
                  {isColumnVisible("status") && (
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  )}
                  {isColumnVisible("publishDate") && (
                    <TableCell className="hidden lg:table-cell">
                      {item.publishDate ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {item.publishDate}
                        </div>
                      ) : "—"}
                    </TableCell>
                  )}
                  {isColumnVisible("actions") && (
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleView(item.id)} title="Просмотр">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item.id)} title="Редактировать">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {item.status === "draft" && (
                          <>
                            <Button variant="default" size="sm" onClick={() => handlePublish(item.id)} className="gap-1">
                              <Send className="h-4 w-4" />
                              Опубликовать
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleCancel(item.id)} className="gap-1">
                              <XCircle className="h-4 w-4" />
                              Отмена
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
