"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, CreditCard, Heart, MessageCircle, Settings, ShieldAlert, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userDashboard } from "@/lib/dashboard-mock";
import { type ComponentType, type ReactNode } from "react";

export function UserDashboardPage() {
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
            <Link href="/chat">Chat</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/pagamentos">Pagamentos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/painel/namorada">Painel Namorada</Link>
          </Button>
        </div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/40">
            <Image
              src={userDashboard.profile.photo}
              alt={userDashboard.profile.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Ola, {userDashboard.profile.name}</h1>
            <p className="text-sm text-rose-50">
              Plano atual: <strong>{userDashboard.profile.plan}</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <Card title="Minhas conversas recentes" icon={MessageCircle}>
          <div className="space-y-2">
            {userDashboard.recentConversations.map((conversation) => (
              <div key={conversation.name} className="rounded-xl border border-border bg-background p-3">
                <p className="text-sm font-medium">{conversation.name}</p>
                <p className="truncate text-xs text-muted-foreground">{conversation.lastMessage}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{conversation.time}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Perfis favoritos" icon={Heart}>
          <div className="space-y-2">
            {userDashboard.favorites.map((favorite) => (
              <div key={favorite.name} className="rounded-xl border border-border bg-background p-3">
                <p className="text-sm font-medium">{favorite.name}</p>
                <p className="text-xs text-muted-foreground">{favorite.city}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {favorite.rating.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Historico de pagamentos" icon={CreditCard}>
          <div className="space-y-2">
            {userDashboard.payments.map((payment) => (
              <div key={payment.label} className="rounded-xl border border-border bg-background p-3">
                <p className="text-sm font-medium">{payment.label}</p>
                <p className="text-xs text-muted-foreground">{payment.amount}</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] ${
                    payment.status === "Pago"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 rounded-3xl border border-border bg-card p-5 md:grid-cols-2">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium">
            <Settings className="h-4 w-4 text-primary" />
            Configuracoes de conta
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Alterar senha</p>
            <p>Atualizar e-mail</p>
            <p>Preferencias de notificacoes</p>
            <p>Gerenciar renovacao automatica</p>
          </div>
        </div>
        <div className="space-y-2 rounded-2xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-900/40 dark:bg-rose-950/20">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-rose-700 dark:text-rose-300">
            <ShieldAlert className="h-4 w-4" />
            Zona sensivel
          </p>
          <p className="text-sm text-rose-700 dark:text-rose-300">
            Excluir conta com confirmacao em duas etapas e prazo de processamento.
          </p>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Solicitar exclusao de conta
          </Button>
        </div>
      </section>

      <footer className="rounded-3xl border border-border bg-card p-5">
        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Bell className="h-4 w-4 text-primary" />
          Notificacoes push no chat e renovacoes de plano serao conectadas no backend.
        </p>
      </footer>
    </main>
  );
}

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-border bg-card p-5">
      <h2 className="mb-4 inline-flex items-center gap-2 text-lg font-semibold">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </h2>
      {children}
    </article>
  );
}
