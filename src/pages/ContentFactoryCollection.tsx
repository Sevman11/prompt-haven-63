import { useState } from "react";
import { 
  Filter, 
  Search, 
  ExternalLink, 
  Check, 
  X, 
  Eye,
  FileText,
  Image,
  Video,
  Calendar,
  Globe,
  RefreshCw,
  LayoutGrid,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface ContentItem {
  id: string;
  title: string;
  source: string;
  sourceType: "telegram" | "rss" | "vk" | "manual";
  date: string;
  format: "text" | "photo" | "video";
  summary: string;
  status: "new" | "in_progress" | "rejected";
  originalUrl?: string;
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Новые технологии в AI: что ждёт нас в 2025",
    source: "Tech News",
    sourceType: "telegram",
    date: "2025-01-14",
    format: "text",
    summary: "Обзор последних достижений в области искусственного интеллекта и прогнозы развития технологий на ближайший год.",
    status: "new",
    originalUrl: "https://example.com/article1"
  },
  {
    id: "2",
    title: "Инфографика: Тренды социальных сетей",
    source: "Marketing Pro",
    sourceType: "rss",
    date: "2025-01-13",
    format: "photo",
    summary: "Визуальный обзор ключевых трендов SMM на 2025 год с данными исследований.",
    status: "new",
    originalUrl: "https://example.com/article2"
  },
  {
    id: "3",
    title: "Видео-обзор: Лучшие инструменты для контент-мейкеров",
    source: "Content Hub",
    sourceType: "vk",
    date: "2025-01-12",
    format: "video",
    summary: "Подробный разбор 10 инструментов, которые помогут ускорить создание контента.",
    status: "in_progress",
    originalUrl: "https://example.com/video1"
  },
  {
    id: "4",
    title: "Как увеличить охваты в Telegram",
    source: "SMM Academy",
    sourceType: "telegram",
    date: "2025-01-11",
    format: "text",
    summary: "Практические советы по продвижению Telegram-каналов от экспертов отрасли.",
    status: "new"
  },
  {
    id: "5",
    title: "Кейс: Рост подписчиков на 300% за месяц",
    source: "Growth Hackers",
    sourceType: "manual",
    date: "2025-01-10",
    format: "text",
    summary: "Детальный разбор стратегии продвижения, которая принесла впечатляющие результаты.",
    status: "rejected"
  },
];

const sourceTypes = [
  { value: "all", label: "Все источники" },
  { value: "telegram", label: "Telegram" },
  { value: "rss", label: "RSS" },
  { value: "vk", label: "ВКонтакте" },
  { value: "manual", label: "Вручную" },
];

const formats = [
  { value: "all", label: "Все форматы" },
  { value: "text", label: "Текст" },
  { value: "photo", label: "Фото" },
  { value: "video", label: "Видео" },
];

const FormatIcon = ({ format }: { format: string }) => {
  switch (format) {
    case "text":
      return <FileText className="h-4 w-4" />;
    case "photo":
      return <Image className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const SourceBadge = ({ sourceType }: { sourceType: string }) => {
  const colors: Record<string, string> = {
    telegram: "bg-blue-500/10 text-blue-500",
    rss: "bg-orange-500/10 text-orange-500",
    vk: "bg-sky-500/10 text-sky-500",
    manual: "bg-gray-500/10 text-gray-500",
  };

  const labels: Record<string, string> = {
    telegram: "Telegram",
    rss: "RSS",
    vk: "VK",
    manual: "Вручную",
  };

  return (
    <Badge variant="outline" className={cn("text-xs", colors[sourceType])}>
      {labels[sourceType]}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "new":
      return <Badge className="bg-green-500">Новый</Badge>;
    case "in_progress":
      return <Badge variant="secondary">В работе</Badge>;
    case "rejected":
      return <Badge variant="outline" className="text-red-500">Отклонён</Badge>;
    default:
      return null;
  }
};

export default function ContentFactoryCollection() {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("table");
  const [columns, setColumns] = useState<ColumnDef[]>([
    { id: "title", label: "Заголовок", visible: true },
    { id: "source", label: "Источник", visible: true },
    { id: "format", label: "Формат", visible: true },
    { id: "date", label: "Дата", visible: true },
    { id: "summary", label: "Описание", visible: true },
    { id: "status", label: "Статус", visible: true },
    { id: "actions", label: "Действия", visible: true },
  ]);

  const filteredContent = content.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === "all" || item.sourceType === selectedSource;
    const matchesFormat = selectedFormat === "all" || item.format === selectedFormat;
    return matchesSearch && matchesSource && matchesFormat;
  });

  const handleAction = (id: string, action: "approve" | "reject") => {
    setContent(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: action === "approve" ? "in_progress" : "rejected" };
      }
      return item;
    }));
  };

  const newCount = content.filter(c => c.status === "new").length;

  const filters: FilterOption[] = [
    {
      id: "source",
      label: "Источник",
      options: sourceTypes,
      value: selectedSource,
      onChange: setSelectedSource,
    },
    {
      id: "format",
      label: "Формат",
      options: formats,
      value: selectedFormat,
      onChange: setSelectedFormat,
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
            <Filter className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Сбор и фильтрация контента</h1>
            <p className="text-muted-foreground">Входящие материалы из подключённых источников</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 flex gap-4">
        <Card className="flex-1">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{content.length}</p>
              <p className="text-sm text-muted-foreground">Всего материалов</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <RefreshCw className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{newCount}</p>
              <p className="text-sm text-muted-foreground">Новых</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по заголовку или содержанию..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("cards")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TableControls
          columns={columns}
          onColumnsChange={setColumns}
          filters={filters}
        />
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {isColumnVisible("title") && <TableHead>Заголовок</TableHead>}
                  {isColumnVisible("source") && <TableHead>Источник</TableHead>}
                  {isColumnVisible("format") && <TableHead className="w-[100px]">Формат</TableHead>}
                  {isColumnVisible("date") && <TableHead className="w-[120px]">Дата</TableHead>}
                  {isColumnVisible("summary") && <TableHead className="hidden lg:table-cell">Описание</TableHead>}
                  {isColumnVisible("status") && <TableHead className="w-[120px]">Статус</TableHead>}
                  {isColumnVisible("actions") && <TableHead className="w-[220px] text-right">Действия</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.map((item) => (
                  <TableRow key={item.id} className={cn(
                    item.status === "rejected" && "opacity-50"
                  )}>
                    {isColumnVisible("title") && (
                      <TableCell>
                        <p className="font-medium line-clamp-1">{item.title}</p>
                      </TableCell>
                    )}
                    {isColumnVisible("source") && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{item.source}</span>
                          <SourceBadge sourceType={item.sourceType} />
                        </div>
                      </TableCell>
                    )}
                    {isColumnVisible("format") && (
                      <TableCell>
                        <div className={cn(
                          "flex items-center gap-1.5 text-sm",
                          item.format === "text" && "text-blue-500",
                          item.format === "photo" && "text-green-500",
                          item.format === "video" && "text-purple-500"
                        )}>
                          <FormatIcon format={item.format} />
                          <span className="capitalize">
                            {item.format === "text" ? "Текст" : item.format === "photo" ? "Фото" : "Видео"}
                          </span>
                        </div>
                      </TableCell>
                    )}
                    {isColumnVisible("date") && (
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.date).toLocaleDateString("ru-RU")}
                        </div>
                      </TableCell>
                    )}
                    {isColumnVisible("summary") && (
                      <TableCell className="hidden lg:table-cell">
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                      </TableCell>
                    )}
                    {isColumnVisible("status") && (
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                    )}
                    {isColumnVisible("actions") && (
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          {item.status === "new" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleAction(item.id, "approve")}
                                className="gap-1"
                              >
                                <Check className="h-4 w-4" />
                                В работу
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAction(item.id, "reject")}
                                className="gap-1"
                              >
                                <X className="h-4 w-4" />
                                Отклонить
                              </Button>
                            </>
                          )}
                          {item.originalUrl && (
                            <Button
                              size="sm"
                              variant="ghost"
                              asChild
                            >
                              <a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
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
      )}

      {/* Cards View */}
      {viewMode === "cards" && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredContent.map((item) => (
            <Card 
              key={item.id} 
              className={cn(
                "transition-all duration-200 hover:shadow-md",
                item.status === "rejected" && "opacity-60"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      item.format === "text" && "bg-blue-500/10 text-blue-500",
                      item.format === "photo" && "bg-green-500/10 text-green-500",
                      item.format === "video" && "bg-purple-500/10 text-purple-500"
                    )}>
                      <FormatIcon format={item.format} />
                    </div>
                    <SourceBadge sourceType={item.sourceType} />
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(item.date).toLocaleDateString("ru-RU")}</span>
                  <span>•</span>
                  <span>{item.source}</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleAction(item.id, "approve")}
                    disabled={item.status !== "new"}
                    className="flex-1 gap-1"
                  >
                    <Check className="h-4 w-4" />
                    В работу
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(item.id, "reject")}
                    disabled={item.status !== "new"}
                    className="flex-1 gap-1"
                  >
                    <X className="h-4 w-4" />
                    Отклонить
                  </Button>
                  {item.originalUrl && (
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                    >
                      <a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Материалы не найдены</h3>
          <p className="text-muted-foreground max-w-sm">
            Попробуйте изменить параметры фильтрации или дождитесь новых материалов.
          </p>
        </div>
      )}
    </div>
  );
}
