import { useState } from "react";
import { 
  FileEdit, 
  Eye,
  Pencil,
  CheckCircle2,
  XCircle,
  Search,
  Image
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
import { cn } from "@/lib/utils";

interface BasePostItem {
  id: string;
  title: string;
  text: string;
  image: string | null;
  model: string;
  prompt: string;
  basePost: string;
  socialNetworks: string[];
  status: "draft" | "ready" | "rejected";
}

const mockItems: BasePostItem[] = [
  {
    id: "1",
    title: "Новые технологии в AI: что ждёт нас в 2025",
    text: "Искусственный интеллект продолжает развиваться стремительными темпами...",
    image: "/placeholder.svg",
    model: "GPT-4",
    prompt: "Напиши пост про тренды AI в 2025 году",
    basePost: "Готовый базовый пост с ключевыми тезисами...",
    socialNetworks: ["telegram", "vk", "instagram"],
    status: "ready",
  },
  {
    id: "2",
    title: "Запуск нового сервиса генерации видео",
    text: "Компания OpenAI представила новый инструмент для создания видео...",
    image: null,
    model: "Claude 3",
    prompt: "Новость о Sora от OpenAI",
    basePost: "Сгенерированный базовый пост...",
    socialNetworks: ["telegram", "shorts"],
    status: "draft",
  },
  {
    id: "3",
    title: "Обзор GPT-5: что нового?",
    text: "Первый взгляд на возможности новой версии языковой модели...",
    image: "/placeholder.svg",
    model: "GPT-4",
    prompt: "Обзор GPT-5",
    basePost: "Базовый пост для обзора...",
    socialNetworks: ["telegram", "vk"],
    status: "draft",
  },
];

const socialIcons: Record<string, string> = {
  telegram: "📱",
  vk: "💬",
  instagram: "📸",
  shorts: "🎬",
};

export default function ContentFactoryBasePost() {
  const navigate = useNavigate();
  const [items, setItems] = useState<BasePostItem[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState("");

  const handleView = (id: string) => {
    navigate(`/content-factory/verification?id=${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/content-factory/verification?id=${id}&edit=true`);
  };

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: "ready" as const } : item
    ));
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: "rejected" as const } : item
    ));
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const draftCount = items.filter(i => i.status === "draft").length;
  const readyCount = items.filter(i => i.status === "ready").length;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FileEdit className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Базовые посты</h1>
            <p className="text-muted-foreground">Создание и редактирование базового контента для публикаций</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-sm text-muted-foreground">Всего постов</p>
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
            <div className="text-2xl font-bold text-green-500">{readyCount}</div>
            <p className="text-sm text-muted-foreground">Готовы к публикации</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск постов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead className="hidden lg:table-cell">Текст</TableHead>
                <TableHead className="w-[80px]">Картинка</TableHead>
                <TableHead className="hidden md:table-cell">Нейросеть</TableHead>
                <TableHead className="hidden xl:table-cell">Промт</TableHead>
                <TableHead>Соц сети</TableHead>
                <TableHead className="w-[220px] text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className={cn(
                  item.status === "ready" && "bg-green-500/5",
                  item.status === "rejected" && "bg-red-500/5 opacity-50"
                )}>
                  <TableCell>
                    <p className="font-medium line-clamp-2">{item.title}</p>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.text}</p>
                  </TableCell>
                  <TableCell>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Image className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{item.model}</Badge>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.prompt}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {item.socialNetworks.map((network) => (
                        <span key={network} className="text-lg" title={network}>
                          {socialIcons[network]}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(item.id)}
                        title="Просмотр"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item.id)}
                        title="Редактировать"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {item.status === "draft" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(item.id)}
                            className="gap-1"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            В работу
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(item.id)}
                            className="gap-1"
                          >
                            <XCircle className="h-4 w-4" />
                            Отмена
                          </Button>
                        </>
                      )}
                      {item.status === "ready" && (
                        <Badge className="bg-green-500">Готов</Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
