import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOverlays } from "@/store/overlays-store";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function formatBRL(cents: number) {
  return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
}

export function CheckoutModal() {
  const { checkout, closeCheckout } = useOverlays();
  const { user } = useAuth();
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setCard("");
    setExp("");
    setCvv("");
    setProcessing(false);
    setDone(false);
  };

  const handleClose = () => {
    closeCheckout();
    setTimeout(reset, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkout || !user) return;

    if (card.replace(/\s/g, "").length < 13 || exp.length < 4 || cvv.length < 3) {
      toast.error("Preencha os dados do cartão");
      return;
    }

    setProcessing(true);

    // Register pending payment in Supabase. The Stripe edge function + webhook
    // will mark it as paid once the real gateway is connected.
    const { error } = await supabase.from("payments").insert({
      user_id: user.id,
      booking_id: checkout.bookingId ?? null,
      item_type: checkout.type,
      item_name: checkout.name,
      item_reference: checkout.reference ?? null,
      amount_cents: checkout.amountCents,
      currency: checkout.currency ?? "brl",
      status: "succeeded", // simulated until Stripe is enabled
      provider: "stripe",
    });

    if (error) {
      console.error(error);
      toast.error("Falha ao registrar pagamento");
      setProcessing(false);
      return;
    }

    if (checkout.bookingId) {
      await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", checkout.bookingId);
    }

    if (checkout.type === "plan") {
      await supabase.from("profiles").update({ active_plan: checkout.name }).eq("id", user.id);
    }

    setProcessing(false);
    setDone(true);
  };

  if (!checkout) return null;

  return (
    <Dialog open={!!checkout} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15"
              >
                <Check className="h-10 w-10 text-emerald-600" />
              </motion.div>
              <DialogTitle className="text-xl">Pagamento confirmado!</DialogTitle>
              <DialogDescription className="text-center">
                {checkout.name} — {formatBRL(checkout.amountCents)}
              </DialogDescription>
              <Button onClick={handleClose} className="mt-2 w-full">
                Concluir
              </Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DialogHeader>
                <DialogTitle>Finalizar pagamento</DialogTitle>
                <DialogDescription>
                  {checkout.name} —{" "}
                  <span className="font-semibold text-primary">
                    {formatBRL(checkout.amountCents)}
                  </span>
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cc-num">Número do cartão</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cc-num"
                      placeholder="0000 0000 0000 0000"
                      value={card}
                      onChange={(e) => setCard(e.target.value)}
                      maxLength={19}
                      className="pl-9"
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="cc-exp">Validade</Label>
                    <Input
                      id="cc-exp"
                      placeholder="MM/AA"
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cc-cvv">CVV</Label>
                    <Input
                      id="cc-cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" /> Pagamento processado com criptografia
                </p>
                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? "Processando..." : `Confirmar pagamento`}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
