export type MessageStatus = "sent" | "delivered" | "read";

export type ChatMessage = {
  id: string;
  conversationId: string;
  sender: "me" | "other";
  text: string;
  createdAt: string;
  status: MessageStatus;
  kind?: "text" | "emoji" | "sticker";
};

export type ChatConversation = {
  id: string;
  profileId: string;
  name: string;
  avatar: string;
  online: boolean;
  blocked: boolean;
  unreadCount: number;
  typing: boolean;
};

export const initialConversations: ChatConversation[] = [
  {
    id: "c-ana-lima",
    profileId: "ana-lima",
    name: "Ana Lima",
    avatar:
      "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?auto=format&fit=crop&w=300&q=80",
    online: true,
    blocked: false,
    unreadCount: 2,
    typing: false,
  },
  {
    id: "c-isabela-costa",
    profileId: "isabela-costa",
    name: "Isabela Costa",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    online: false,
    blocked: false,
    unreadCount: 0,
    typing: false,
  },
  {
    id: "c-sofia-alves",
    profileId: "sofia-alves",
    name: "Sofia Alves",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    online: true,
    blocked: false,
    unreadCount: 1,
    typing: true,
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    conversationId: "c-ana-lima",
    sender: "other",
    text: "Oi! Vi seu perfil e adorei sua proposta para o fim de semana :)",
    createdAt: "2026-04-25T18:50:00.000Z",
    status: "read",
  },
  {
    id: "m2",
    conversationId: "c-ana-lima",
    sender: "me",
    text: "Que bom! Podemos conversar por aqui e alinhar os detalhes.",
    createdAt: "2026-04-25T18:51:00.000Z",
    status: "read",
  },
  {
    id: "m3",
    conversationId: "c-ana-lima",
    sender: "other",
    text: "Perfeito, qual horario voce costuma ter disponibilidade?",
    createdAt: "2026-04-25T18:52:00.000Z",
    status: "delivered",
  },
  {
    id: "m4",
    conversationId: "c-isabela-costa",
    sender: "other",
    text: "Boa noite, tudo bem? Podemos conversar sobre um evento corporativo.",
    createdAt: "2026-04-25T17:20:00.000Z",
    status: "read",
  },
  {
    id: "m5",
    conversationId: "c-sofia-alves",
    sender: "other",
    text: "Oi! Estou online agora, se quiser seguimos por aqui.",
    createdAt: "2026-04-25T19:14:00.000Z",
    status: "sent",
  },
];

export const quickEmojis = ["😊", "🔥", "✨", "💬", "❤️", "😉"];
export const quickStickers = ["[Sticker: Coracao]", "[Sticker: Oi!]", "[Sticker: Vamos conversar]"];
