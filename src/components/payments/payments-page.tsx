"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Copy, CreditCard, QrCode, Receipt, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  mockPixCode,
  oneTimeUnlocks,
  paymentHistory,
  subscriptionPlans,
  type PaymentMethod,
} from "@/lib/payments-mock";

export function PaymentsPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<"gratuito" | "basico" | "premium">("premium");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("pix");
  const [selectedUnlock, setSelectedUnlock] = useState(oneTimeUnlocks[0]?.profile ?? "");
  const [completed, setCompleted] = useState(false);

  const selectedPlan = useMemo(
    () => subscriptionPlans.find((plan) => plan.id === selectedPlanId) ?? subscriptionPlans[0],
    [selectedPlanId],
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">Minha Namorada</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/busca">Buscar perfis</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/painel">Painel</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/verificacao">Verificacao</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/chat">Chat</Link>
          </Button>
        </div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <h1 className="text-3xl font-semibold md:text-4xl">Pagamentos e assinatura</h1>
        <p className="mt-2 text-sm text-rose-50 md:text-base">
          Escolha seu plano, pague com metodos locais e acompanhe todo historico em um so lugar.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="text-xl font-semibold">Planos mensais</h2>
          <div className="mt-4 grid gap-3">
            {subscriptionPlans.map((plan) => {
              const selected = selectedPlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected ? "border-primary bg-primary/5" : "border-border bg-background"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{plan.name}</p>
                    <p className="text-sm font-semibold text-primary">{plan.price}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature}>- {feature}</li>
                    ))}
                  </ul>
                  {plan.trialDays && (
                    <p className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-300">
                      Teste gratis de {plan.trialDays} dias
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="text-xl font-semibold">Pagamento unico por perfil</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Desbloqueie conversa individual sem trocar de plano.
          </p>
          <div className="mt-4 space-y-3">
            <label className="space-y-2">
              <p className="text-sm font-medium">Escolha o perfil</p>
              <select
                value={selectedUnlock}
                onChange={(event) => setSelectedUnlock(event.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                {oneTimeUnlocks.map((item) => (
                  <option key={item.profile} value={item.profile}>
                    {item.profile} - {item.price}
                  </option>
                ))}
              </select>
            </label>
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-sm">
                Conversa com <strong>{selectedUnlock}</strong>
              </p>
              <p className="text-xs text-muted-foreground">Valor unico: R$ 9,90</p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <MethodButton
              icon={QrCode}
              label="Pix"
              active={selectedMethod === "pix"}
              onClick={() => setSelectedMethod("pix")}
            />
            <MethodButton
              icon={CreditCard}
              label="Cartao"
              active={selectedMethod === "card"}
              onClick={() => setSelectedMethod("card")}
            />
            <MethodButton
              icon={Receipt}
              label="Boleto"
              active={selectedMethod === "boleto"}
              onClick={() => setSelectedMethod("boleto")}
            />
            <MethodButton
              icon={Wallet}
              label="PayPal"
              active={selectedMethod === "paypal"}
              onClick={() => setSelectedMethod("paypal")}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-background p-4 text-sm">
            {selectedMethod === "pix" && (
              <div className="space-y-3">
                <p className="font-medium">Pix - copia e cola</p>
                <p className="break-all text-xs text-muted-foreground">{mockPixCode}</p>
                <Button variant="outline" className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar codigo Pix
                </Button>
              </div>
            )}
            {selectedMethod === "card" && (
              <div className="space-y-2">
                <p className="font-medium">Cartao de credito/debito</p>
                <p className="text-xs text-muted-foreground">
                  Integracao preparada para Mercado Pago (checkout transparente no backend).
                </p>
              </div>
            )}
            {selectedMethod === "boleto" && (
              <div className="space-y-2">
                <p className="font-medium">Boleto bancario</p>
                <p className="text-xs text-muted-foreground">
                  Vencimento em 3 dias uteis apos emissao.
                </p>
              </div>
            )}
            {selectedMethod === "paypal" && (
              <div className="space-y-2">
                <p className="font-medium">Carteira digital (PayPal)</p>
                <p className="text-xs text-muted-foreground">
                  Opcao disponivel para pagamento internacional.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-background p-4">
            <p className="text-sm">
              Plano selecionado: <strong>{selectedPlan.name}</strong>
            </p>
            <p className="text-xs text-muted-foreground">{selectedPlan.price}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Renovacao automatica habilitada com cancelamento facil no painel.
            </p>
            <Button className="mt-4 w-full" onClick={() => setCompleted(true)}>
              Confirmar pagamento
            </Button>
          </div>

          {completed && (
            <p className="mt-3 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300">
              Pagamento simulado com sucesso! Recibo e nota fiscal serao enviados por e-mail no fluxo real.
            </p>
          )}
        </article>

        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="text-xl font-semibold">Historico de transacoes</h2>
          <div className="mt-4 space-y-2">
            {paymentHistory.map((item) => (
              <div key={`${item.date}-${item.description}`} className="rounded-xl border border-border bg-background p-3">
                <p className="text-sm font-medium">{item.description}</p>
                <p className="text-xs text-muted-foreground">
                  {item.date} - {item.method} - {item.amount}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

function MethodButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
        active ? "border-primary bg-primary/5" : "border-border bg-background"
      }`}
    >
      <Icon className="h-4 w-4 text-primary" />
      {label}
    </button>
  );
}
