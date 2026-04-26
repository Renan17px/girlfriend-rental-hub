import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarCheck, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useOverlays } from "@/store/overlays-store";

type Booking = {
  id: string;
  companion_name: string;
  scheduled_for: string | null;
  status: string;
  amount_cents: number;
  created_at: string;
};

type Payment = {
  id: string;
  item_name: string;
  amount_cents: number;
  status: string;
  created_at: string;
};

const formatBRL = (c: number) => `R$ ${(c / 100).toFixed(2).replace(".", ",")}`;

const MyBookingsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { openAuth } = useOverlays();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      openAuth("login");
      setLoading(false);
      return;
    }
    const load = async () => {
      const [{ data: b }, { data: p }] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("payments").select("*").order("created_at", { ascending: false }),
      ]);
      setBookings((b ?? []) as Booking[]);
      setPayments((p ?? []) as Payment[]);
      setLoading(false);
    };
    load();
  }, [user, authLoading, openAuth]);

  if (authLoading || loading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-12">
        <p className="text-muted-foreground">Carregando...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-12">
        <p className="text-muted-foreground">Faça login para ver seus agendamentos.</p>
        <Button asChild className="mt-4">
          <Link to="/">Voltar para o início</Link>
        </Button>
      </main>
    );
  }

  return (
    <motion.main
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-5xl space-y-10 px-4 py-12"
    >
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Meus Agendamentos</h1>
          <p className="text-sm text-muted-foreground">Histórico de encontros e pagamentos.</p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/">Voltar</Link>
        </Button>
      </header>

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <CalendarCheck className="h-5 w-5 text-primary" /> Encontros agendados
        </h2>
        {bookings.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Você ainda não tem encontros agendados.
          </p>
        ) : (
          <div className="space-y-2">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
              >
                <div>
                  <p className="font-medium">{b.companion_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(b.created_at).toLocaleDateString("pt-BR")} ·{" "}
                    <span
                      className={
                        b.status === "confirmed"
                          ? "text-emerald-600"
                          : b.status === "cancelled"
                          ? "text-destructive"
                          : "text-amber-600"
                      }
                    >
                      {b.status}
                    </span>
                  </p>
                </div>
                <p className="font-semibold">{formatBRL(b.amount_cents)}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Receipt className="h-5 w-5 text-primary" /> Pagamentos
        </h2>
        {payments.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Sem pagamentos registrados ainda.
          </p>
        ) : (
          <div className="space-y-2">
            {payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
              >
                <div>
                  <p className="font-medium">{p.item_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(p.created_at).toLocaleDateString("pt-BR")} · {p.status}
                  </p>
                </div>
                <p className="font-semibold">{formatBRL(p.amount_cents)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.main>
  );
};

export default MyBookingsPage;
