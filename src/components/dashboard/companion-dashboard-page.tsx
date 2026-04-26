
import { Link } from "react-router-dom";
import { BarChart3, MessageCircle, Star, ToggleLeft, ToggleRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companionDashboard } from "@/lib/dashboard-mock";
import { useState, type ComponentType } from "react";

export function CompanionDashboardPage() {
  const [online, setOnline] = useState(companionDashboard.profile.online);
  const maxValue = Math.max(...companionDashboard.weeklyViews, 1);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">Minha Namorada</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/chat">Chat</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/painel">Painel Usuario</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/pagamentos">Pagamentos</Link>
          </Button>
        </div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/40">
              <Image
                src={companionDashboard.profile.photo}
                alt={companionDashboard.profile.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{companionDashboard.profile.name}</h1>
              <p className="text-sm text-rose-50">Painel da namorada</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => setOnline((value) => !value)}>
            {online ? <ToggleRight className="mr-2 h-4 w-4" /> : <ToggleLeft className="mr-2 h-4 w-4" />}
            {online ? "Status: Online" : "Status: Offline"}
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Conversas iniciadas"
          value={String(companionDashboard.stats.conversationsStarted)}
          icon={MessageCircle}
        />
        <MetricCard
          label="Avaliacao media"
          value={companionDashboard.stats.avgRating.toFixed(1)}
          icon={Star}
        />
        <MetricCard
          label="Avaliacoes recebidas"
          value={String(companionDashboard.stats.reviewsCount)}
          icon={BarChart3}
        />
        <MetricCard label="Ganhos estimados" value={companionDashboard.stats.earnings} icon={Wallet} />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="mb-4 text-xl font-semibold">Visualizacoes por semana</h2>
          <div className="flex h-44 items-end gap-3">
            {companionDashboard.weeklyViews.map((value, index) => (
              <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#c2185b] to-[#f06292]"
                  style={{ height: `${Math.max((value / maxValue) * 100, 10)}%` }}
                />
                <span className="text-xs text-muted-foreground">D{index + 1}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="mb-4 text-xl font-semibold">Avaliacoes recentes</h2>
          <div className="space-y-2">
            {companionDashboard.reviews.map((review, index) => (
              <div key={`${review.author}-${index}`} className="rounded-xl border border-border bg-background p-3">
                <p className="text-sm font-medium">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.text}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {review.rating.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-border bg-card p-5">
        <h2 className="text-xl font-semibold">Edicao rapida do perfil</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Atualize fotos, bio, disponibilidade e valores em um unico painel.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary">Editar fotos</Button>
          <Button variant="secondary">Atualizar bio</Button>
          <Button variant="secondary">Configurar disponibilidade</Button>
          <Button variant="secondary">Ajustar valores</Button>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </article>
  );
}
