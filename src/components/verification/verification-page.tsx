
import { Link } from "react-router-dom";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  Camera,
  CheckCircle2,
  CircleDashed,
  FileBadge,
  MailCheck,
  Phone,
  ScanFace,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { initialVerificationSteps, type VerificationStep } from "@/lib/verification-mock";

type LiveAction = "piscar" | "virar";

export function VerificationPage() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [liveAction, setLiveAction] = useState<LiveAction>("piscar");
  const [liveCompleted, setLiveCompleted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const documentVerified = frontUploaded && backUploaded;
  const analysisReady = emailVerified && phoneVerified && documentVerified && liveCompleted;

  const steps = useMemo<VerificationStep[]>(() => {
    return initialVerificationSteps.map((step) => {
      if (step.id === "email") {
        return {
          ...step,
          status: emailVerified ? "done" : "in_progress",
        };
      }
      if (step.id === "phone") {
        return {
          ...step,
          status: emailVerified ? (phoneVerified ? "done" : "in_progress") : "pending",
        };
      }
      if (step.id === "document") {
        return {
          ...step,
          status:
            emailVerified && phoneVerified
              ? documentVerified
                ? "done"
                : "in_progress"
              : "pending",
        };
      }
      if (step.id === "face") {
        return {
          ...step,
          status:
            emailVerified && phoneVerified && documentVerified
              ? liveCompleted
                ? "done"
                : "in_progress"
              : "pending",
        };
      }
      if (step.id === "analysis") {
        return {
          ...step,
          status: submitted ? "in_progress" : "pending",
        };
      }
      return step;
    });
  }, [documentVerified, emailVerified, liveCompleted, phoneVerified, submitted]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">Minha Namorada</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/painel">Painel</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/pagamentos">Pagamentos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/chat">Chat</Link>
          </Button>
        </div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <h1 className="text-3xl font-semibold md:text-4xl">Verificacao de identidade</h1>
        <p className="mt-2 text-sm text-rose-50 md:text-base">
          Processo em etapas para garantir autenticidade, seguranca e conformidade com LGPD.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <aside className="rounded-3xl border border-border bg-card p-5">
          <h2 className="mb-4 text-lg font-semibold">Progresso da verificacao</h2>
          <div className="space-y-2">
            {steps.map((step) => (
              <div key={step.id} className="rounded-xl border border-border bg-background p-3">
                <p className="inline-flex items-center gap-2 text-sm font-medium">
                  <StepIcon status={step.status} />
                  {step.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground">
            Perfis sem verificacao continuam visiveis com aviso de status &ldquo;Aguardando verificacao&rdquo;.
          </div>
        </aside>

        <div className="space-y-4">
          <Card
            title="1) Verificacao de e-mail"
            description="Confirme para desbloquear as proximas etapas."
            icon={MailCheck}
            done={emailVerified}
          >
            <Button onClick={() => setEmailVerified(true)} disabled={emailVerified}>
              {emailVerified ? "E-mail confirmado" : "Simular clique no link de confirmacao"}
            </Button>
          </Card>

          <Card
            title="2) Verificacao de telefone (OTP)"
            description="Envio de SMS com codigo de 6 digitos."
            icon={Phone}
            done={phoneVerified}
            disabled={!emailVerified}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setSmsSent(true)}
                disabled={!emailVerified || phoneVerified}
              >
                {smsSent ? "SMS reenviado" : "Enviar codigo OTP"}
              </Button>
              <input
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder="Digite 123456"
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                disabled={!smsSent || phoneVerified || !emailVerified}
              />
              <Button
                onClick={() => setPhoneVerified(otp === "123456")}
                disabled={!smsSent || phoneVerified || otp.length !== 6}
              >
                Confirmar OTP
              </Button>
            </div>
            {!phoneVerified && otp.length === 6 && otp !== "123456" && (
              <p className="text-xs text-rose-600 dark:text-rose-300">
                Codigo invalido. Use 123456 para a simulacao.
              </p>
            )}
          </Card>

          <Card
            title="3) Documento (RG/CNH)"
            description="Upload de frente e verso com legibilidade."
            icon={FileBadge}
            done={documentVerified}
            disabled={!phoneVerified}
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                variant={frontUploaded ? "secondary" : "outline"}
                onClick={() => setFrontUploaded(true)}
                disabled={!phoneVerified}
              >
                {frontUploaded ? "Frente enviada" : "Enviar frente"}
              </Button>
              <Button
                variant={backUploaded ? "secondary" : "outline"}
                onClick={() => setBackUploaded(true)}
                disabled={!phoneVerified}
              >
                {backUploaded ? "Verso enviado" : "Enviar verso"}
              </Button>
            </div>
          </Card>

          <Card
            title="4) Selfie com liveness"
            description="Detecta autenticidade com acao guiada."
            icon={ScanFace}
            done={liveCompleted}
            disabled={!documentVerified}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={liveAction === "piscar" ? "secondary" : "outline"}
                onClick={() => setLiveAction("piscar")}
                disabled={!documentVerified}
              >
                Piscar
              </Button>
              <Button
                variant={liveAction === "virar" ? "secondary" : "outline"}
                onClick={() => setLiveAction("virar")}
                disabled={!documentVerified}
              >
                Virar o rosto
              </Button>
              <Button onClick={() => setLiveCompleted(true)} disabled={!documentVerified || liveCompleted}>
                <Camera className="mr-2 h-4 w-4" />
                Concluir selfie ({liveAction})
              </Button>
            </div>
          </Card>

          <Card
            title="5) Analise IA + revisao humana"
            description="Prazo de resposta de ate 48 horas."
            icon={ShieldCheck}
            done={submitted}
            disabled={!analysisReady}
          >
            <Button onClick={() => setSubmitted(true)} disabled={!analysisReady || submitted}>
              {submitted ? "Analise em andamento" : "Enviar para analise"}
            </Button>
            {submitted && (
              <p className="mt-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300">
                Processo iniciado. Seu perfil recebeu status &ldquo;Aguardando verificacao&rdquo;.
              </p>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}

function StepIcon({ status }: { status: "pending" | "in_progress" | "done" }) {
  if (status === "done") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (status === "in_progress") return <CircleDashed className="h-4 w-4 text-primary" />;
  return <CircleDashed className="h-4 w-4 text-muted-foreground" />;
}

function Card({
  title,
  description,
  icon: Icon,
  done,
  disabled,
  children,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  done?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`rounded-3xl border border-border bg-card p-5 transition ${
        disabled ? "opacity-70" : ""
      }`}
    >
      <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
        <Icon className="h-4 w-4 text-primary" />
        {title}
        {done && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">{children}</div>
    </article>
  );
}
