
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brazilStates, citiesByState, hobbiesList } from "@/lib/mock-data";

type AccountType = "cliente" | "namorada" | "";

type FormState = {
  accountType: AccountType;
  name: string;
  birthDate: string;
  email: string;
  password: string;
  phone: string;
  whatsapp: string;
  state: string;
  city: string;
  neighborhood: string;
  bio: string;
  heightCm: number;
  zodiac: string;
  languages: string;
  hobbies: string[];
  availability: string[];
  priceInfo: string;
  acceptedTerms: boolean;
};

const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const initialState: FormState = {
  accountType: "",
  name: "",
  birthDate: "",
  email: "",
  password: "",
  phone: "",
  whatsapp: "",
  state: "",
  city: "",
  neighborhood: "",
  bio: "",
  heightCm: 165,
  zodiac: "",
  languages: "",
  hobbies: [],
  availability: [],
  priceInfo: "",
  acceptedTerms: false,
};

export function SignupPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const totalSteps = form.accountType === "namorada" ? 5 : 4;
  const cityOptions = citiesByState[form.state] ?? [];

  const photoPreviews = useMemo(() => photos.map((file) => URL.createObjectURL(file)), [photos]);

  useEffect(() => {
    return () => {
      photoPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [photoPreviews]);

  const validateCurrentStep = () => {
    if (step === 1 && !form.accountType) return "Escolha um tipo de conta para continuar.";
    if (step === 2) {
      if (!form.name || !form.birthDate || !form.email || !form.password || !form.phone) {
        return "Preencha os campos obrigatorios da etapa 2.";
      }
    }
    if (step === 3 && (!form.state || !form.city)) {
      return "Selecione estado e cidade para continuar.";
    }
    if (step === 4 && form.accountType === "namorada") {
      if (photos.length < 2 || photos.length > 10) return "Envie entre 2 e 10 fotos.";
      if (!form.bio || !form.zodiac || !form.languages) return "Complete os dados principais do perfil.";
      if (form.hobbies.length < 3) return "Selecione ao menos 3 hobbies/interesses.";
      if (!form.availability.length) return "Selecione pelo menos um dia de disponibilidade.";
      if (form.bio.length > 500) return "A bio deve ter no maximo 500 caracteres.";
    }
    if (step === totalSteps && !form.acceptedTerms) {
      return "Voce precisa aceitar os Termos e a Politica de Privacidade.";
    }
    return "";
  };

  const goNext = () => {
    const message = validateCurrentStep();
    if (message) {
      setError(message);
      return;
    }
    setError("");

    if (step === totalSteps) {
      setCompleted(true);
      return;
    }

    setStep((current) => current + 1);
  };

  const goBack = () => {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
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
            <Link to="/chat">Chat</Link>
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
        </div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-[#880e4f] via-[#c2185b] to-[#e91e63] p-6 text-white">
        <h1 className="text-3xl font-semibold md:text-4xl">Criar conta</h1>
        <p className="mt-2 text-sm text-rose-50 md:text-base">
          Em poucos passos voce entra na plataforma com seguranca e praticidade.
        </p>
      </section>

      <div className="rounded-3xl border border-border bg-card p-6">
        <Progress step={step} totalSteps={totalSteps} />

        {completed ? (
          <div className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200">
            <p className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 className="h-5 w-5" />
              Cadastro concluido com sucesso!
            </p>
            <p className="mt-2 text-sm">
              Sua conta foi criada em modo demonstracao. No proximo passo vamos conectar backend, autenticacao e verificacoes reais.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {step === 1 && (
              <section className="grid gap-3 md:grid-cols-2">
                <SelectCard
                  title="Quero conhecer namoradas"
                  selected={form.accountType === "cliente"}
                  onClick={() => updateField("accountType", "cliente")}
                />
                <SelectCard
                  title="Quero me cadastrar como namorada"
                  selected={form.accountType === "namorada"}
                  onClick={() => updateField("accountType", "namorada")}
                />
              </section>
            )}

            {step === 2 && (
              <section className="grid gap-4 md:grid-cols-2">
                <Input label="Nome completo*" value={form.name} onChange={(v) => updateField("name", v)} />
                <Input
                  label="Data de nascimento*"
                  type="date"
                  value={form.birthDate}
                  onChange={(v) => updateField("birthDate", v)}
                />
                <Input label="E-mail*" type="email" value={form.email} onChange={(v) => updateField("email", v)} />
                <Input
                  label="Senha*"
                  type="password"
                  value={form.password}
                  onChange={(v) => updateField("password", v)}
                />
                <Input label="Telefone*" value={form.phone} onChange={(v) => updateField("phone", v)} />
                <Input
                  label="WhatsApp (opcional)"
                  value={form.whatsapp}
                  onChange={(v) => updateField("whatsapp", v)}
                />
              </section>
            )}

            {step === 3 && (
              <section className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Estado*"
                  value={form.state}
                  onChange={(value) => {
                    updateField("state", value);
                    updateField("city", "");
                  }}
                  options={brazilStates}
                />
                <Select
                  label="Cidade*"
                  value={form.city}
                  onChange={(value) => updateField("city", value)}
                  options={cityOptions}
                  disabled={!form.state}
                />
                <Input
                  label="Bairro (opcional)"
                  value={form.neighborhood}
                  onChange={(v) => updateField("neighborhood", v)}
                />
              </section>
            )}

            {step === 4 && form.accountType === "namorada" && (
              <section className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-medium">Upload de fotos (2 a 10)</p>
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                    <UploadCloud className="h-4 w-4" />
                    Clique para selecionar imagens JPG, PNG ou WEBP
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={(event) => {
                        const files = Array.from(event.target.files ?? []);
                        const merged = [...photos, ...files].slice(0, 10);
                        setPhotos(merged);
                      }}
                    />
                  </label>
                  <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-5">
                    {photoPreviews.map((preview) => (
                      <div
                        key={preview}
                        className="relative h-20 w-full overflow-hidden rounded-lg"
                      >
                        <Image
                          src={preview}
                          alt="Preview da foto"
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 33vw, 20vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Textarea label="Bio (ate 500 caracteres)*" value={form.bio} onChange={(v) => updateField("bio", v)} />
                  <Input
                    label={`Altura: ${(form.heightCm / 100).toFixed(2)}m`}
                    type="range"
                    value={String(form.heightCm)}
                    min="150"
                    max="190"
                    onChange={(v) => updateField("heightCm", Number(v))}
                  />
                  <Input label="Signo*" value={form.zodiac} onChange={(v) => updateField("zodiac", v)} />
                  <Input
                    label="Idiomas* (separados por virgula)"
                    value={form.languages}
                    onChange={(v) => updateField("languages", v)}
                  />
                  <Input
                    label="Valor/hora ou pacote (opcional)"
                    value={form.priceInfo}
                    onChange={(v) => updateField("priceInfo", v)}
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Hobbies e interesses (minimo 3)*</p>
                  <div className="flex flex-wrap gap-2">
                    {hobbiesList.map((hobby) => {
                      const selected = form.hobbies.includes(hobby);
                      return (
                        <button
                          type="button"
                          key={hobby}
                          onClick={() =>
                            updateField(
                              "hobbies",
                              selected
                                ? form.hobbies.filter((item) => item !== hobby)
                                : [...form.hobbies, hobby],
                            )
                          }
                          className={`rounded-full border px-3 py-1 text-xs ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background"
                          }`}
                        >
                          {hobby}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Disponibilidade semanal*</p>
                  <div className="flex flex-wrap gap-2">
                    {weekdays.map((day) => {
                      const selected = form.availability.includes(day);
                      return (
                        <button
                          type="button"
                          key={day}
                          onClick={() =>
                            updateField(
                              "availability",
                              selected
                                ? form.availability.filter((item) => item !== day)
                                : [...form.availability, day],
                            )
                          }
                          className={`rounded-full border px-3 py-1 text-xs ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {step === totalSteps && (
              <section className="space-y-3">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4">
                  <input
                    type="checkbox"
                    checked={form.acceptedTerms}
                    onChange={(event) => updateField("acceptedTerms", event.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Li e aceito os <strong>Termos de Uso</strong> e a <strong>Politica de Privacidade</strong>. Autorizo tratamento de dados conforme LGPD e confirmo que sou maior de 18 anos.
                  </span>
                </label>
              </section>
            )}

            {error && (
              <p className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={goBack} disabled={step === 1}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Voltar
              </Button>
              <Button onClick={goNext}>
                {step === totalSteps ? "Concluir cadastro" : "Continuar"}
                {step !== totalSteps && <ChevronRight className="ml-1 h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Progress({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Etapa {step} de {totalSteps}
      </p>
      <div className="mt-2 h-2 rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}

function SelectCard({
  title,
  selected,
  onClick,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        selected ? "border-primary bg-primary/5" : "border-border bg-background"
      }`}
    >
      <p className="font-medium">{title}</p>
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  max?: string;
}) {
  return (
    <label className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2 md:col-span-2">
      <p className="text-sm font-medium">{label}</p>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={500}
        rows={4}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <label className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
