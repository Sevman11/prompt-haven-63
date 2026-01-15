import { useState } from "react";
import { CreditCard, Gem, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface TopUpBalanceDialogProps {
  trigger: React.ReactNode;
}

const presetAmounts = [
  { value: "100", label: "100", gems: 100 },
  { value: "500", label: "500", gems: 550, bonus: "+10%" },
  { value: "1000", label: "1000", gems: 1150, bonus: "+15%" },
  { value: "5000", label: "5000", gems: 6000, bonus: "+20%" },
];

const paymentMethods = [
  { id: "card", label: "Банковская карта", icon: "💳" },
  { id: "sbp", label: "СБП", icon: "🏦" },
  { id: "yoomoney", label: "ЮMoney", icon: "💰" },
];

export function TopUpBalanceDialog({ trigger }: TopUpBalanceDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const isCustom = selectedAmount === "custom";
  const currentPreset = presetAmounts.find(a => a.value === selectedAmount);
  const displayAmount = isCustom ? customAmount : selectedAmount;
  const displayGems = isCustom ? Number(customAmount) || 0 : currentPreset?.gems || 0;

  const handleSubmit = () => {
    console.log("Top up:", { amount: displayAmount, gems: displayGems, paymentMethod });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gem className="h-5 w-5 text-primary" />
            Пополнение баланса
          </DialogTitle>
          <DialogDescription>
            Выберите сумму пополнения и способ оплаты
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount Selection */}
          <div className="space-y-3">
            <Label>Сумма пополнения</Label>
            <div className="grid grid-cols-2 gap-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount.value}
                  type="button"
                  onClick={() => setSelectedAmount(amount.value)}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                    selectedAmount === amount.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  )}
                >
                  <span className="text-lg font-bold">{amount.label} ₽</span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Gem className="h-3 w-3" />
                    {amount.gems} гемов
                  </span>
                  {amount.bonus && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {amount.bonus}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSelectedAmount("custom")}
                className={cn(
                  "w-full flex items-center justify-center p-3 rounded-xl border-2 transition-all",
                  isCustom
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <span className="text-sm font-medium">Другая сумма</span>
              </button>
              {isCustom && (
                <Input
                  type="number"
                  placeholder="Введите сумму в рублях"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="10"
                />
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label>Способ оплаты</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="grid gap-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <RadioGroupItem value={method.id} />
                    <span className="text-lg">{method.icon}</span>
                    <span className="font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">К оплате:</span>
              <span className="font-bold">{displayAmount || 0} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Вы получите:</span>
              <span className="font-bold flex items-center gap-1">
                <Gem className="h-4 w-4 text-primary" />
                {displayGems} гемов
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            className="w-full gap-2"
            disabled={!displayAmount || Number(displayAmount) < 10}
          >
            <CreditCard className="h-4 w-4" />
            Перейти к оплате
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
