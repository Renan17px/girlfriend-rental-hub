
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, type ComponentType } from "react";
import {
  Flag,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProfileDetails } from "@/lib/profile-mock";

export function ProfilePage({ profile }: { profile: ProfileDetails }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">Minha Namorada</p>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link to="/">Inicio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/busca">Buscar perfis</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/cadastro">Criar conta</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/painel">Painel</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/pagamentos">Pagamentos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/verificacao">Verificacao</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/chat">Chat</Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-3">
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-border bg-card">
            <Image
              src={profile.gallery[activeImage]}
              alt={`Foto de ${profile.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {profile.gallery.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setActiveImage(index)}
                className={`relative h-24 overflow-hidden rounded-2xl border ${
                  activeImage === index ? "border-primary" : "border-border"
                }`}
              >
                <Image
                  src={image}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5 rounded-3xl border border-border bg-card p-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold">
              {profile.name}, {profile.age}
            </h1>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {profile.city} - {profile.state} | Bairro {profile.neighborhood}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Perfil Verificado
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                Aguardando verificacao
              </span>
            )}
            {profile.online && (
              <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-medium text-rose-700 dark:text-rose-300">
                Online agora
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              <Star className="h-3.5 w-3.5 fill-current" />
              {profile.rating.toFixed(1)} ({profile.reviewsCount} avaliacoes)
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoCard label="Altura" value={`${(profile.heightCm / 100).toFixed(2)}m`} icon={Ruler} />
            <InfoCard label="Signo" value={profile.zodiac} icon={Sparkles} />
            <InfoCard
              label="Idiomas"
              value={profile.languages.join(", ")}
              icon={Languages}
            />
            <InfoCard
              label="Disponibilidade"
              value="Agenda semanal ativa"
              icon={ShieldCheck}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map((hobby) => (
              <span key={hobby} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                {hobby}
              </span>
            ))}
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <Button asChild>
              <Link to="/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                Iniciar chat
              </Link>
            </Button>
            <Button variant="secondary">
              <Heart className="mr-2 h-4 w-4" />
              Favoritar
            </Button>
            <Button variant="outline">
              <Flag className="mr-2 h-4 w-4" />
              Denunciar
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold">Disponibilidade</h2>
          <div className="mt-4 space-y-3">
            {profile.availability.map((item) => (
              <div
                key={item.day}
                className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm"
              >
                <span className="font-medium">{item.day}</span>
                <span className="text-muted-foreground">{item.slots.join(" | ")}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold">Localizacao aproximada</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mapa generico de regiao para preservar privacidade e seguranca.
          </p>
          <div className="mt-4 flex h-56 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40">
            <div className="text-center">
              <MapPin className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 text-sm">
                {profile.city} - {profile.state}
              </p>
              <p className="text-xs text-muted-foreground">Bairro {profile.neighborhood}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">Avaliacoes</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {profile.reviews.map((review, index) => (
            <article key={`${review.author}-${index}`} className="rounded-2xl border border-border p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">{review.author}</span>
                <span className="text-muted-foreground">{review.date}</span>
              </div>
              <div className="mb-2 flex items-center gap-1 text-primary">
                {Array.from({ length: review.rating }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">
      <p className="mb-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
