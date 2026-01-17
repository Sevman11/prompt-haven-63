import { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  Eye,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TableControls, ColumnDef, FilterOption } from "@/components/ui/table-controls";
import { cn } from "@/lib/utils";

interface CheckItem {
  id: string;
  source: string;
  sourceIcon: string;
  channelName: string;
  title: string;
  credibilityScore: number;
  description: string;
  status: "pending" | "approved" | "rejected";
}

const mockItems: CheckItem[] = [
  {
    id: "1",
    source: "Habr",
    sourceIcon: "📡",
    channelName: "Habr - Технологии",
    title: "Новые технологии в AI: что ждёт нас в 2025",
    credibilityScore: 92,
    description: "Обзор основных трендов в развитии искусственного интеллекта на ближайший год",
    status: "pending",
  },
  {
    id: "2",
    source: "Telegram",
    sourceIcon: "📱",
    channelName: "@technews_ru",
    title: "Запуск нового сервиса генерации видео",
    credibilityScore: 78,
    description: "Компания OpenAI представила новый инструмент для создания видео из текста",
    status: "pending",
  },
  {
    id: "3",
    source: "YouTube",
    sourceIcon: "🎬",
    channelName: "TechReviews Channel",
    title: "Обзор GPT-5: что нового?",
    credibilityScore: 65,
    description: "Первый взгляд на возможности новой версии языковой модели",
    status: "pending",
  },
  {
    id: "4",
    source: "Дзен",
    sourceIcon: "📰",
    channelName: "AI News Дзен",
    title: "Как AI меняет рынок труда",
    credibilityScore: 45,
    description: "Анализ влияния автоматизации на различные профессии",
    status: "pending",
  },
];

const sourceOptions = [
  { value: "all", label: "Все источники" },
  { value: "habr", label: "Habr" },
  { value: "telegram", label: "Telegram" },
  { value: "youtube", label: "YouTube" },
  { value: "dzen", label: "Дзен" },
];

export default function ContentFactoryCheck() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CheckItem[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [columns, setColumns] = useState<ColumnDef[]>([
    { id: "source", label: "Источник", visible: true },
    { id: "title", label: "Название", visible: true },
    { id: "credibility", label: "Достоверность", visible: true },
    { id: "description", label: "Описание", visible: true },
    { id: "actions", label: "Действия", visible: true },
  ]);

  const getCredibilityColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getCredibilityBg = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: "approved" as const } : item
    ));
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: "rejected" as const } : item
    ));
  };

  const handleView = (id: string) => {
    navigate(`/content-factory/verification?id=${id}`);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.channelName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === "all" || item.source.toLowerCase() === selectedSource;
    return matchesSearch && matchesSource;
  });

  const pendingCount = items.filter(i => i.status === "pending").length;
  const approvedCount = items.filter(i => i.status === "approved").length;

  const filters: FilterOption[] = [
    {
      id: "source",
      label: "Источник",
      options: sourceOptions,
      value: selectedSource,
      onChange: setSelectedSource,
    },
  ];

  const isColumnVisible = (columnId: string) =>
    columns.find(c => c.id === columnId)?.visible ?? true;

  return (
    <TooltipProvider>
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Проверка материалов</h1>
            <p className="text-muted-foreground">Оценка достоверности и отбор контента для публикации</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-sm text-muted-foreground">Всего материалов</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
            <p className="text-sm text-muted-foreground">Ожидают проверки</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">{approvedCount}</div>
            <p className="text-sm text-muted-foreground">Одобрено</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск материалов..."
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
                {isColumnVisible("source") && <TableHead className="w-[180px]">Источник</TableHead>}
                {isColumnVisible("title") && <TableHead>Название</TableHead>}
                {isColumnVisible("credibility") && <TableHead className="w-[150px]">Достоверность</TableHead>}
                {isColumnVisible("description") && <TableHead className="hidden md:table-cell">Описание</TableHead>}
                {isColumnVisible("actions") && <TableHead className="w-[200px] text-right">Действия</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className={cn(
                  item.status === "approved" && "bg-green-500/5",
                  item.status === "rejected" && "bg-red-500/5 opacity-50"
                )}>
                  {isColumnVisible("source") && (
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.sourceIcon}</span>
                          <span className="text-sm font-medium">{item.source}</span>
                        </div>
                        <p className="text-xs text-muted-foreground pl-7">{item.channelName}</p>
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible("title") && (
                    <TableCell>
                      <p className="font-medium">{item.title}</p>
                    </TableCell>
                  )}
                  {isColumnVisible("credibility") && (
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={item.credibilityScore} 
                            className="h-2 w-16"
                            indicatorClassName={getCredibilityBg(item.credibilityScore)}
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={cn("text-sm font-bold cursor-help", getCredibilityColor(item.credibilityScore))}>
                                {item.credibilityScore}%
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>Рассчитано на основе 3 авторитетных источников и алгоритмов проверки фактов.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible("description") && (
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </TableCell>
                  )}
                  {isColumnVisible("actions") && (
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(item.id)}
                          className="gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">Просмотр</span>
                        </Button>
                        {item.status === "pending" && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleApprove(item.id)}
                              className="gap-1"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="hidden sm:inline">В работу</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(item.id)}
                              className="gap-1"
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="hidden sm:inline">Отклонить</span>
                            </Button>
                          </>
                        )}
                        {item.status === "approved" && (
                          <Badge className="bg-green-500">Одобрено</Badge>
                        )}
                        {item.status === "rejected" && (
                          <Badge variant="destructive">Отклонено</Badge>
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
    </TooltipProvider>
  );
}
