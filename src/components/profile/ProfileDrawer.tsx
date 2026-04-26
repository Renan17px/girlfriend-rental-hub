import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOverlays, requireAuth } from "@/store/overlays-store";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BOOKING_PRICE_CENTS = 35000; // R$ 350,00
const SUBSCRIPTION_PRICE_CENTS = 9990; // R$ 99,90/mês

export function ProfileDrawer() {
  const { profileDrawer, closeProfileDrawer, openCheckout } = useOverlays();
  const { user } = useAuth();
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    setPhotoIdx(0);
  }, [profileDrawer?.id]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProfileDrawer();
    };
    if (profileDrawer) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [profileDrawer, closeProfileDrawer]);

  const handleBooking = () => {
    if (!profileDrawer) return;
    requireAuth(!!user, async () => {
      // create pending booking
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          user_id: user!.id,
          companion_id: profileDrawer.id,
          companion_name: profileDrawer.name,
          amount_cents: BOOKING_PRICE_CENTS,
        })
        .select("id")
        .single();
      if (error) {
        toast.error("Não foi possível criar o agendamento");
        return;
      }
      openCheckout({
        type: "booking",
        name: `Encontro com ${profileDrawer.name}`,
        reference: profileDrawer.id,
        amountCents: BOOKING_PRICE_CENTS,
        bookingId: data.id,
      });
    });
  };

  const handleSubscribe = () => {
    if (!profileDrawer) return;
    requireAuth(!!user, () => {
      openCheckout({
        type: "profile-subscription",
        name: `Acesso exclusivo: ${profileDrawer.name}`,
        reference: profileDrawer.id,
        amountCents: SUBSCRIPTION_PRICE_CENTS,
      });
    });
  };

  const profile = profileDrawer;
  const gallery = profile?.gallery ?? [];

  return (
    <AnimatePresence>
      {profile && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeProfileDrawer}
          />
          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col overflow-y-auto bg-background shadow-2xl"
          >
            <div className="relative">
              <div className="relative h-72 w-full overflow-hidden bg-muted">
                {gallery.length > 0 && (
                  <img
                    src={gallery[photoIdx]}
                    alt={`Foto ${photoIdx + 1} de ${profile.name}`}
                    className="h-full w-full object-cover"
                  />
                )}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setPhotoIdx((i) => (i - 1 + gallery.length) % gallery.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setPhotoIdx((i) => (i + 1) % gallery.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {gallery.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === photoIdx ? "w-6 bg-white" : "w-1.5 bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={closeProfileDrawer}
                className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 p-6">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {profile.name}, {profile.age}
                    </h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {profile.neighborhood} · {profile.city} - {profile.state}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
                    <Star className="h-4 w-4 fill-current text-primary" />
                    {profile.rating.toFixed(1)}
                  </div>
                </div>
                {profile.verified && (
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" /> Perfil verificado
                  </span>
                )}
              </div>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Bio
                </h3>
                <p className="text-sm leading-relaxed">{profile.bio}</p>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Interesses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <Calendar className="h-4 w-4" /> Disponibilidade
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {profile.availability.map((d) => (
                    <li key={d.day} className="flex items-center justify-between border-b border-border/50 pb-1.5 last:border-0">
                      <span className="font-medium">{d.day}</span>
                      <span className="text-muted-foreground">{d.slots.join(", ")}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Avaliações ({profile.reviewsCount})
                </h3>
                <div className="space-y-3">
                  {profile.reviews.map((r, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <p className="text-sm font-medium">{r.author}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`h-3.5 w-3.5 ${
                                idx < r.rating ? "fill-current text-primary" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.text}</p>
                      <p className="mt-1 text-xs text-muted-foreground/70">{r.date}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Encontro a partir de</span>
                  <span className="text-2xl font-semibold text-primary">
                    R$ {(BOOKING_PRICE_CENTS / 100).toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Acesso mensal</span>
                  <span className="text-base font-medium">
                    R$ {(SUBSCRIPTION_PRICE_CENTS / 100).toFixed(2).replace(".", ",")}/mês
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={handleBooking} className="w-full">
                    Agendar Encontro
                  </Button>
                  <Button onClick={handleSubscribe} variant="secondary" className="w-full">
                    Assinar acesso a este perfil
                  </Button>
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
