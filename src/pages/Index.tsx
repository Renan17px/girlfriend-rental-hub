import { motion } from "framer-motion";
import { Heart, MessageCircle, Search, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredProfiles, plans, platformStats, testimonials, type FeaturedProfile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const navLinks = [
  { href: "#destaques", label: "Perfis" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#depoimentos", label: "Depoimentos" },
];

function ProfileCard({ profile }: { profile: FeaturedProfile }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1.5 hover:shadow-elegant"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={profile.image}
          alt={`Foto de ${profile.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-md">
          {profile.category}
        </span>
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-soft">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {profile.rating.toFixed(1)}
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-serif text-2xl font-semibold leading-tight">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-sm text-white/85">{profile.city} — {profile.state}</p>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {profile.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3 w-3" /> Verificada
            </span>
          )}
          {profile.online && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
            </span>
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <Button className="flex-1">Ver perfil</Button>
          <Button variant="outline" className="flex-1">Conversar</Button>
        </div>
      </div>
    </motion.article>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full gradient-hero shadow-soft">
              <Heart className="h-4 w-4 text-white" fill="currentColor" />
            </span>
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              Minha Namorada
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex">Entrar</Button>
            <Button className="rounded-full px-5">Criar conta</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-24">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative mt-10 overflow-hidden rounded-[2.5rem] gradient-hero px-8 py-16 text-white shadow-elegant sm:px-14 sm:py-24"
        >
          {/* decorative orbs */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Experiência premium
            </span>
            <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Companhia refinada,<br />
              <span className="italic text-accent">quando você desejar.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Conexões reais, perfis verificados e uma curadoria pensada para
              encontros, eventos e momentos verdadeiramente memoráveis.
            </p>

            <div className="mt-10 flex max-w-xl flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 text-foreground">
                <Search className="h-5 w-5 text-primary" />
                <input
                  placeholder="Cidade, bairro ou interesse"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90">
                Buscar agora
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" /> Perfis verificados
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-accent" fill="currentColor" /> Avaliação média 4.8
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" /> 18.400+ membros
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {platformStats.map((item) => (
            <div key={item.label} className="bg-card p-8 text-center">
              <p className="font-serif text-4xl font-semibold text-primary">{item.value}</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </motion.section>

        {/* Featured profiles */}
        <section id="destaques" className="mt-24 space-y-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Curadoria</p>
              <h2 className="mt-2 font-serif text-4xl font-medium md:text-5xl">Perfis em destaque</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Selecionados por avaliações, verificação e relevância para você.
              </p>
            </div>
            <Button variant="outline" className="rounded-full">Explorar todos</Button>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {featuredProfiles.map((p) => <ProfileCard key={p.id} profile={p} />)}
          </motion.div>
        </section>

        {/* How it works */}
        <motion.section
          id="como-funciona"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mt-28 overflow-hidden rounded-3xl border border-border gradient-blush p-10 md:p-14"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Simples e seguro</p>
            <h2 className="mt-2 font-serif text-4xl font-medium md:text-5xl">Como funciona</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { title: "Busque", icon: Search, text: "Filtre por cidade, interesses e disponibilidade em segundos." },
              { title: "Converse", icon: MessageCircle, text: "Abra o chat interno com segurança e alinhe os detalhes." },
              { title: "Encontre", icon: Heart, text: "Viva uma experiência única alinhada ao seu estilo." },
            ].map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-border bg-card p-7 shadow-card">
                <span className="absolute -top-4 left-7 rounded-full gradient-hero px-3 py-1 text-xs font-semibold text-white shadow-soft">
                  0{i + 1}
                </span>
                <step.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 font-serif text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Plans */}
        <motion.section
          id="planos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="mt-28 space-y-10"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Planos</p>
            <h2 className="mt-2 font-serif text-4xl font-medium md:text-5xl">Escolha sua experiência</h2>
            <p className="mt-3 text-muted-foreground">Comece grátis. Faça upgrade quando quiser.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={cn(
                  "relative rounded-3xl border p-8 transition-smooth hover:-translate-y-1",
                  plan.highlight
                    ? "border-primary bg-card shadow-elegant"
                    : "border-border bg-card shadow-card hover:shadow-soft",
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-gold px-4 py-1 text-xs font-semibold text-accent-foreground shadow-soft">
                    Mais popular
                  </span>
                )}
                <p className="text-sm uppercase tracking-wider text-muted-foreground">{plan.name}</p>
                <p className="mt-3 font-serif text-4xl font-semibold text-foreground">{plan.price}</p>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full rounded-full" variant={plan.highlight ? "default" : "outline"}>
                  Escolher plano
                </Button>
              </article>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          id="depoimentos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mt-28"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Depoimentos</p>
            <h2 className="mt-2 font-serif text-4xl font-medium md:text-5xl">Histórias reais</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.author} className="rounded-3xl border border-border bg-card p-7 shadow-card">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 font-serif text-xl leading-relaxed text-foreground">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 text-sm font-medium text-muted-foreground">
                  — {t.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mt-28 overflow-hidden rounded-[2rem] gradient-hero px-8 py-16 text-center text-white shadow-elegant sm:px-14"
        >
          <h2 className="mx-auto max-w-2xl font-serif text-4xl font-medium md:text-5xl">
            Pronto para a sua próxima <span className="italic text-accent">conexão</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Cadastro gratuito em menos de um minuto. Cancele quando quiser.
          </p>
          <Button size="lg" className="mt-8 rounded-full bg-white px-8 text-primary hover:bg-white/90">
            Criar minha conta
          </Button>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full gradient-hero">
                <Heart className="h-4 w-4 text-white" fill="currentColor" />
              </span>
              <span className="font-serif text-xl font-semibold">Minha Namorada</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Plataforma brasileira focada em conexões reais, seguras e com experiência premium.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider">Legal</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Termos de uso</a></li>
              <li><a href="#" className="hover:text-primary">Política de privacidade</a></li>
              <li><a href="#" className="hover:text-primary">Central de suporte</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider">Redes</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>X / Twitter</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Minha Namorada. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
