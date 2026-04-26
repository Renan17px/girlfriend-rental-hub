
import { Link } from "react-router-dom";
import { FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "1. Elegibilidade e idade minima",
    text: "A plataforma e exclusiva para maiores de 18 anos. O cadastro implica declaracao expressa de maioridade e consentimento para validacao.",
  },
  {
    title: "2. Uso adequado da plataforma",
    text: "E proibido qualquer conteudo ilegal, ofensivo, discriminatorio, violento ou que viole direitos de terceiros. O descumprimento pode gerar suspensao imediata.",
  },
  {
    title: "3. Seguranca e autenticidade",
    text: "Perfis podem passar por verificacoes de e-mail, telefone, documento e biometria facial. A plataforma pode solicitar nova verificacao a qualquer momento.",
  },
  {
    title: "4. Pagamentos, planos e cancelamento",
    text: "Assinaturas podem ter renovacao automatica com cancelamento simples no painel. Valores, beneficios e prazos sao informados antes da confirmacao.",
  },
  {
    title: "5. Moderacao e denuncias",
    text: "Denuncias sao analisadas em ate 24h. Conteudos inadequados podem ser removidos, com bloqueio parcial ou permanente de contas reincidentes.",
  },
];

export function TermsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">RentalGirl</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/">Inicio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/privacidade">Privacidade</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/denuncias">Denuncias</Link>
          </Button>
        </div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <h1 className="text-3xl font-semibold md:text-4xl">Termos de uso</h1>
        <p className="mt-2 text-sm text-rose-50 md:text-base">
          Regras para uma experiencia segura, transparente e respeitosa para todas as pessoas.
        </p>
      </section>

      <section className="space-y-3 rounded-3xl border border-border bg-card p-6">
        {sections.map((section) => (
          <article key={section.title} className="rounded-2xl border border-border bg-background p-4">
            <h2 className="inline-flex items-center gap-2 text-base font-semibold">
              <FileText className="h-4 w-4 text-primary" />
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{section.text}</p>
          </article>
        ))}
      </section>

      <footer className="rounded-3xl border border-border bg-card p-5">
        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Ao continuar usando a plataforma, voce concorda com estes termos e com a politica de privacidade.
        </p>
      </footer>
    </main>
  );
}
