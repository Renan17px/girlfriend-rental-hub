import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { useOverlays } from "@/store/overlays-store";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Mínimo de 6 caracteres").max(128),
});

const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Informe seu nome").max(80),
    email: z.string().trim().email("E-mail inválido").max(255),
    password: z.string().min(6, "Mínimo de 6 caracteres").max(128),
    confirm: z.string(),
    terms: z.literal(true, { errorMap: () => ({ message: "Aceite os termos" }) }),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "As senhas não conferem",
  });

export function AuthModals() {
  const { authView, closeAuth, openAuth, authPendingAction } = useOverlays();
  const { signIn, signUp, resetPassword, user } = useAuth();
  const [loading, setLoading] = useState(false);

  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup state
  const [name, setName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);

  // run pending action after successful auth
  useEffect(() => {
    if (user && authPendingAction) {
      const action = authPendingAction;
      closeAuth();
      setTimeout(action, 50);
    }
  }, [user, authPendingAction, closeAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await signIn(parsed.data.email, parsed.data.password);
    setLoading(false);
    if (error) {
      toast.error(error.includes("Invalid") ? "E-mail ou senha incorretos" : error);
    } else {
      toast.success("Bem-vindo de volta!");
      if (!authPendingAction) closeAuth();
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse({
      name,
      email: sEmail,
      password: sPassword,
      confirm,
      terms,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await signUp(parsed.data.email, parsed.data.password, parsed.data.name);
    setLoading(false);
    if (error) {
      toast.error(error.includes("registered") ? "E-mail já cadastrado" : error);
    } else {
      toast.success("Conta criada! Verifique seu e-mail se necessário.");
    }
  };

  const handleReset = async () => {
    if (!email) {
      toast.error("Informe seu e-mail acima");
      return;
    }
    const { error } = await resetPassword(email);
    if (error) toast.error(error);
    else toast.success("Enviamos um link de redefinição para seu e-mail");
  };

  return (
    <Dialog open={authView !== null} onOpenChange={(o) => !o && closeAuth()}>
      <DialogContent className="sm:max-w-md">
        {authView === "login" ? (
          <>
            <DialogHeader>
              <DialogTitle>Entrar</DialogTitle>
              <DialogDescription>Acesse sua conta RentalGirl.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="login-email">E-mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="login-password">Senha</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Esqueci a senha
              </button>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => openAuth("signup", authPendingAction ?? undefined)}
                >
                  Criar conta
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Criar conta</DialogTitle>
              <DialogDescription>Leva menos de um minuto.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="su-name">Nome</Label>
                <Input id="su-name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="su-email">E-mail</Label>
                <Input
                  id="su-email"
                  type="email"
                  value={sEmail}
                  onChange={(e) => setSEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="su-pass">Senha</Label>
                  <Input
                    id="su-pass"
                    type="password"
                    value={sPassword}
                    onChange={(e) => setSPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="su-confirm">Confirmar senha</Label>
                  <Input
                    id="su-confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
              </div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <Checkbox
                  checked={terms}
                  onCheckedChange={(v) => setTerms(v === true)}
                  className="mt-0.5"
                />
                <span>Aceito os termos de uso e política de privacidade.</span>
              </label>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Criando..." : "Criar conta"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => openAuth("login", authPendingAction ?? undefined)}
                >
                  Entrar
                </button>
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
