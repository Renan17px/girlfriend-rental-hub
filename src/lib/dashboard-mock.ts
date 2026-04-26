export const userDashboard = {
  profile: {
    name: "Marcos Andrade",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    plan: "Premium",
  },
  recentConversations: [
    { name: "Ana Lima", lastMessage: "Podemos conversar sobre sabado?", time: "19:42" },
    { name: "Sofia Alves", lastMessage: "Estou online agora.", time: "18:10" },
    { name: "Isabela Costa", lastMessage: "Obrigada pelo contato.", time: "Ontem" },
  ],
  favorites: [
    { name: "Ana Lima", city: "Sao Paulo - SP", rating: 4.9 },
    { name: "Gabriela Pires", city: "Curitiba - PR", rating: 4.8 },
    { name: "Sofia Alves", city: "Rio de Janeiro - RJ", rating: 4.9 },
  ],
  payments: [
    { label: "Plano Premium - Abril", amount: "R$ 79,90", status: "Pago" },
    { label: "Desbloqueio de conversa", amount: "R$ 9,90", status: "Pago" },
    { label: "Plano Premium - Maio", amount: "R$ 79,90", status: "Agendado" },
  ],
};

export const companionDashboard = {
  profile: {
    name: "Ana Lima",
    photo:
      "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?auto=format&fit=crop&w=300&q=80",
    online: true,
  },
  weeklyViews: [24, 31, 28, 40, 46, 38, 52],
  stats: {
    conversationsStarted: 84,
    avgRating: 4.9,
    reviewsCount: 112,
    earnings: "R$ 6.840,00",
  },
  reviews: [
    { author: "Cliente Premium", text: "Excelente conversa e pontualidade.", rating: 5 },
    { author: "Rafael, 31", text: "Perfil muito educado e simpatico.", rating: 5 },
    { author: "Joao, 28", text: "Experiencia positiva do inicio ao fim.", rating: 4 },
  ],
};
