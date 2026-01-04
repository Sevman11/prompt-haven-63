import { useState } from "react";
import { 
  Check, 
  Gem,
  Zap,
  Crown,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Бесплатный",
    price: "0",
    period: "навсегда",
    description: "Для знакомства с платформой",
    icon: Zap,
    features: [
      "10 генераций в день",
      "Базовые модели",
      "Водяной знак",
      "Стандартная скорость",
    ],
    popular: false,
  },
  {
    id: "starter",
    name: "Стартовый",
    price: "490",
    period: "/месяц",
    description: "Для личного использования",
    icon: Gem,
    features: [
      "100 генераций в день",
      "Все модели",
      "Без водяного знака",
      "Приоритетная очередь",
      "История генераций",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Профессиональный",
    price: "990",
    period: "/месяц",
    description: "Для профессионалов",
    icon: Crown,
    features: [
      "500 генераций в день",
      "Все модели включая Premium",
      "Без водяного знака",
      "Максимальный приоритет",
      "API доступ",
      "ИИ Сотрудники",
      "Приоритетная поддержка",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Бизнес",
    price: "2990",
    period: "/месяц",
    description: "Для команд и компаний",
    icon: Rocket,
    features: [
      "Безлимитные генерации",
      "Все Premium функции",
      "Командный доступ (до 10 чел.)",
      "Выделенный сервер",
      "Персональный менеджер",
      "SLA 99.9%",
      "Кастомные интеграции",
    ],
    popular: false,
  },
];

export default function Subscription() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          ПОДПИСКА И ПОПОЛНЕНИЕ СЧЕТА
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Нейросети на русском языке без сложных промптов. Выберите подписку или пополните счёт разово.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 p-1 bg-secondary rounded-xl">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              billingPeriod === "monthly"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Ежемесячно
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              billingPeriod === "yearly"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Ежегодно
            <span className="ml-2 text-xs text-primary">-20%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const yearlyPrice = Math.round(parseInt(plan.price) * 0.8 * 12);
          const displayPrice = billingPeriod === "yearly" && plan.price !== "0"
            ? Math.round(parseInt(plan.price) * 0.8)
            : plan.price;
          
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl bg-card border transition-all",
                "animate-fade-in opacity-0",
                `stagger-${(index % 6) + 1}`,
                plan.popular 
                  ? "border-primary shadow-card-hover scale-[1.02]" 
                  : "border-border hover:border-primary/50 hover:shadow-card-hover"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Популярный
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Icon */}
                <div 
                  className={cn(
                    "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
                    plan.popular ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Name & Description */}
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{displayPrice}₽</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-auto p-6 pt-0">
                <Button 
                  variant={plan.popular ? "gradient" : "outline"} 
                  className="w-full"
                >
                  {plan.price === "0" ? "Начать бесплатно" : "Выбрать план"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* One-time payment */}
      <div className="mt-12 max-w-2xl mx-auto text-center">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Разовое пополнение
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Не хотите оформлять подписку? Пополните баланс на любую сумму
          </p>
          <Button variant="outline" className="gap-2">
            <Gem className="h-4 w-4" />
            Пополнить баланс
          </Button>
        </div>
      </div>
    </div>
  );
}
