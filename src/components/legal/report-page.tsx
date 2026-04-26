
import { Link } from "react-router-dom";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  "Perfil falso",
  "Conteudo inadequado",
  "Assedio ou comportamento ofensivo",
  "Tentativa de golpe/fraude",
  "Menor de idade suspeita",
  "Outro",
];

export function ReportPage() {
  const [profileName, setProfileName] = useState("");
  const [reason, setReason] = useState(reasons[0]);
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">Minha Namorada</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/termos">Termos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/privacidade">Privacidade</Link>
          </Button>
        </div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <h1 className="text-3xl font-semibold md:text-4xl">Denuncias e moderacao</h1>
        <p className="mt-2 text-sm text-rose-50 md:text-base">
          Canal seguro para relatar condutas inadequadas. Analise inicial em ate 24 horas.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
            <ShieldAlert className="h-4 w-4 text-primary" />
            Enviar denuncia
          </h2>
          <div className="mt-4 space-y-3">
            <label className="space-y-1">
              <p className="text-sm font-medium">Nome do perfil</p>
              <input
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                placeholder="Ex: Ana Lima"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="space-y-1">
              <p className="text-sm font-medium">Motivo</p>
              <select
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                {reasons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1">
              <p className="text-sm font-medium">Detalhes</p>
              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                rows={5}
                placeholder="Descreva o ocorrido com o maximo de contexto..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
            <Button
              onClick={() => setSubmitted(true)}
              disabled={!profileName.trim() || !details.trim()}
            >
              Enviar denuncia
            </Button>
            {submitted && (
              <p className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300">
                Denuncia recebida com sucesso. Nossa equipe vai retornar com atualizacao em ate 24h.
              </p>
            )}
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-card p-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-4 w-4 text-primary" />
            Politica de acao
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>- Triagem automatica inicial por risco de conteudo.</li>
            <li>- Revisao humana para casos sensiveis e reincidencia.</li>
            <li>- Bloqueio preventivo quando houver indicio de fraude.</li>
            <li>- Notificacao para o denunciante sobre decisao final.</li>
            <li>- Registro de auditoria para compliance e seguranca.</li>
          </ul>
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Priorizamos denuncias envolvendo suspeita de menor de idade.
          </p>
        </article>
      </section>
    </main>
  );
}
