import { useState } from "react";
import { 
  Mail, 
  Gem,
  Crown,
  Lock,
  Bell,
  LogOut,
  Trash2,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    marketing: false,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Выход из аккаунта",
      description: "Вы успешно вышли из системы",
    });
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(false);
    toast({
      title: "Аккаунт удалён",
      description: "Ваш аккаунт был удалён",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Профиль</h1>
        <p className="text-muted-foreground">Управление аккаунтом и настройками</p>
      </div>

      <div className="space-y-6">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Данные аккаунта
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-xl bg-secondary">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Mail className="h-4 w-4" />
                  Почта
                </div>
                <p className="font-medium text-foreground">user@example.com</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Gem className="h-4 w-4" />
                  Баланс
                </div>
                <p className="font-medium text-foreground">12 кристаллов</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Crown className="h-4 w-4" />
                  Тариф
                </div>
                <p className="font-medium text-foreground">Профессиональный</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Смена пароля
            </CardTitle>
            <CardDescription>Обновите пароль для защиты аккаунта</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Текущий пароль</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Новый пароль</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button variant="gradient">Сохранить пароль</Button>
          </CardContent>
        </Card>

        {/* Change Email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Смена e-mail
            </CardTitle>
            <CardDescription>Измените адрес электронной почты</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">Новый e-mail</Label>
              <Input id="newEmail" type="email" placeholder="newemail@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Пароль для подтверждения</Label>
              <Input id="passwordConfirm" type="password" />
            </div>
            <Button variant="gradient">Изменить e-mail</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Уведомления
            </CardTitle>
            <CardDescription>Настройте получение уведомлений</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>E-mail уведомления</Label>
                <p className="text-sm text-muted-foreground">Получать уведомления на почту</p>
              </div>
              <Switch 
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Браузерные уведомления</Label>
                <p className="text-sm text-muted-foreground">Push-уведомления в браузере</p>
              </div>
              <Switch 
                checked={notifications.browser}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, browser: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Маркетинговые рассылки</Label>
                <p className="text-sm text-muted-foreground">Новости и специальные предложения</p>
              </div>
              <Switch 
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Аккаунт</CardTitle>
            <CardDescription>Выход и удаление аккаунта</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Выйти
              </Button>
              
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Удалить аккаунт
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Удалить аккаунт?</DialogTitle>
                    <DialogDescription>
                      Это действие необратимо. Все ваши данные, генерации и настройки будут удалены навсегда.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Удалить навсегда
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
