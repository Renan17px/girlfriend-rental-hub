
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  featuredProfiles,
  plans,
  platformStats,
  testimonials,
  type FeaturedProfile,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

const fadeInUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

function ProfileCard({ profile }: { profile: FeaturedProfile }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={profile.image}
          alt={`Foto de perfil ${profile.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {profile.category}
        </span>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              {profile.name}, {profile.age}
            </h3>
            <p className="text-sm text-muted-foreground">
              {profile.city} - {profile.state}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
            <Star className="h-3.5 w-3.5 fill-current" />
            {profile.rating.toFixed(1)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.verified && (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Perfil verificado
            </span>
          )}
          {profile.online && (
            <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-medium text-rose-700 dark:text-rose-300">
              Online agora
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" asChild>
            <Link to={`/perfil/${profile.id}`}>Ver perfil</Link>
          </Button>
          <Button variant="secondary" className="flex-1" asChild>
            <Link to="/chat">Chat</Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useUiStore();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="secondary"
      className="rounded-full"
      onClick={() => setTheme(nextTheme)}
    >
      {theme === "dark" ? (
        <Sun className="mr-2 h-4 w-4" />
      ) : (
        <Moon className="mr-2 h-4 w-4" />
      )}
      {theme === "dark" ? "Modo claro" : "Modo escuro"}
    </Button>
  );
}

export function HomePage() {
  const { theme } = useUiStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-20 px-4 py-8 sm:px-6 md:py-12">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">Minha Namorada</p>
        <div className="flex items-center gap-2">
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
      </div>
      <motion.section
        className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#880e4f] via-[#c2185b] to-[#e91e63] px-6 py-12 text-white shadow-2xl sm:px-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Plataforma premium de companhia
          </span>
          <ThemeToggle />
        </div>
        <h1 className="max-w-3xl text-4xl leading-tight font-bold md:text-6xl">
          Sua companhia ideal, quando e onde voce precisar.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-rose-50 md:text-lg">
          Conecte-se com perfis reais, avaliados e verificados para encontros,
          eventos e experiencias memoraveis com seguranca.
        </p>
        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-white/15 p-4 backdrop-blur-sm sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 text-black">
            <Search className="h-5 w-5 text-[#c2185b]" />
            <input
              placeholder="Busque por cidade, bairro ou interesse"
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
            />
          </div>
          <Button className="h-11 rounded-xl bg-[#880e4f] hover:bg-[#6b0b3e]" asChild>
            <Link to="/busca">Buscar agora</Link>
          </Button>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {platformStats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <p className="text-3xl font-semibold text-primary">{item.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </motion.section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Perfis em destaque</h2>
          <Button variant="outline" asChild>
            <Link to="/busca">Explorar todos</Link>
          </Button>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {featuredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </motion.div>
      </section>

      <motion.section
        className="grid gap-5 rounded-3xl border border-border bg-card p-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        {testimonials.map((item) => (
          <div
            key={item.author}
            className="rounded-2xl border border-border/60 bg-background p-4"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{item.text}&rdquo;
            </p>
            <p className="mt-3 text-sm font-semibold text-primary">
              {item.author}
            </p>
          </div>
        ))}
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="space-y-6"
      >
        <h2 className="text-3xl font-semibold">Como funciona</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "1. Busque",
              icon: Search,
              text: "Filtre por cidade, interesses e disponibilidade em segundos.",
            },
            {
              title: "2. Converse",
              icon: MessageCircle,
              text: "Abra o chat interno com seguranca e alinhe os detalhes.",
            },
            {
              title: "3. Encontre",
              icon: Heart,
              text: "Viva uma experiencia unica com companhia alinhada ao seu estilo.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <step.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="space-y-6"
      >
        <h2 className="text-3xl font-semibold">Planos e precos</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "rounded-3xl border p-6",
                plan.highlight
                  ? "border-primary bg-gradient-to-b from-rose-50 to-card shadow-lg dark:from-rose-950/40"
                  : "border-border bg-card",
              )}
            >
              <p className="text-sm text-muted-foreground">{plan.name}</p>
              <p className="mt-2 text-3xl font-semibold">{plan.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={plan.highlight ? "default" : "secondary"}>
                Escolher plano
              </Button>
            </article>
          ))}
        </div>
      </motion.section>

      <footer className="mb-4 grid gap-4 rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-foreground">Minha Namorada</p>
          <p className="mt-2">
            Plataforma brasileira focada em conexoes reais, seguras e com
            experiencia premium.
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-foreground">Links legais</p>
          <p>
            <Link to="/termos" className="hover:text-primary">
              Termos de uso
            </Link>
          </p>
          <p>
            <Link to="/privacidade" className="hover:text-primary">
              Politica de privacidade
            </Link>
          </p>
          <p>
            <Link to="/denuncias" className="hover:text-primary">
              Central de suporte
            </Link>
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-foreground">Redes sociais</p>
          <p>Instagram</p>
          <p>TikTok</p>
          <p>X / Twitter</p>
        </div>
      </footer>
    </main>
  );
}
