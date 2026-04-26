export type PaymentMethod = "pix" | "card" | "boleto" | "paypal";

export type SubscriptionPlan = {
  id: "gratuito" | "basico" | "premium";
  name: string;
  price: string;
  description: string;
  features: string[];
  trialDays?: number;
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "gratuito",
    name: "Gratuito",
    price: "R$ 0",
    description: "Para explorar a plataforma.",
    features: ["Visualizar perfis", "3 mensagens/dia", "Favoritos limitados"],
  },
  {
    id: "basico",
    name: "Basico",
    price: "R$ 29,90/mes",
    description: "Mensagens ilimitadas e mais alcance.",
    features: ["Mensagens ilimitadas", "50 perfis/dia", "Suporte prioritario"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 79,90/mes",
    description: "Tudo ilimitado com destaque na busca.",
    features: ["Tudo ilimitado", "Badge especial", "Destaque na busca"],
    trialDays: 7,
  },
];

export const oneTimeUnlocks = [
  { profile: "Ana Lima", price: "R$ 9,90" },
  { profile: "Sofia Alves", price: "R$ 9,90" },
  { profile: "Gabriela Pires", price: "R$ 9,90" },
];

export const paymentHistory = [
  { date: "25/04/2026", description: "Plano Premium - Mensal", method: "Pix", amount: "R$ 79,90", status: "Pago" },
  { date: "18/04/2026", description: "Desbloqueio de conversa - Ana Lima", method: "Cartao", amount: "R$ 9,90", status: "Pago" },
  { date: "02/04/2026", description: "Plano Basico - Mensal", method: "Boleto", amount: "R$ 29,90", status: "Pago" },
];

export const mockPixCode =
  "00020126620014BR.GOV.BCB.PIX0114+55119999999995204000053039865802BR5925MINHA NAMORADA PAGAMENTOS6009SAO PAULO62070503***6304A1B2";
