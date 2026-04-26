"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Ban, Check, CheckCheck, MessageCircle, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quickEmojis, quickStickers } from "@/lib/chat-mock";
import { getUnreadCount, useChatStore } from "@/store/chat-store";

export function ChatPage() {
  const [draft, setDraft] = useState("");
  const {
    conversations,
    messages,
    activeConversationId,
    setActiveConversation,
    sendMessage,
    toggleBlock,
  } = useChatStore();

  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId);
  const conversationMessages = messages.filter((message) => message.conversationId === activeConversationId);
  const unreadCount = getUnreadCount(conversations);

  const lastMessageByConversation = useMemo(() => {
    return conversations.reduce<Record<string, string>>((acc, conversation) => {
      const lastMessage = [...messages]
        .filter((message) => message.conversationId === conversation.id)
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0];
      acc[conversation.id] = lastMessage?.text ?? "Sem mensagens";
      return acc;
    }, {});
  }, [conversations, messages]);

  if (!activeConversation) return null;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex items-center justify-between">
        <p className="text-xl font-semibold text-primary">Minha Namorada</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/busca">Buscar perfis</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/cadastro">Criar conta</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/painel">Painel</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/pagamentos">Pagamentos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/verificacao">Verificacao</Link>
          </Button>
          <Button variant="ghost" asChild className="relative">
            <Link href="/chat">
              Chat
              {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </header>

      <section className="grid min-h-[70vh] gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl border border-border bg-card p-4">
          <h1 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <MessageCircle className="h-5 w-5 text-primary" />
            Inbox
          </h1>
          <div className="space-y-2">
            {conversations.map((conversation) => {
              const active = conversation.id === activeConversationId;
              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setActiveConversation(conversation.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                    active ? "border-primary bg-primary/5" : "border-border bg-background"
                  }`}
                >
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
                    <Image
                      src={conversation.avatar}
                      alt={`Avatar ${conversation.name}`}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-emerald-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{conversation.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {conversation.typing ? "Digitando..." : lastMessageByConversation[conversation.id]}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {conversation.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{activeConversation.name}</p>
                <p className="text-xs text-muted-foreground">
                  {activeConversation.blocked
                    ? "Contato bloqueado"
                    : activeConversation.typing
                      ? "Digitando..."
                      : activeConversation.online
                        ? "Online agora"
                        : "Offline"}
                </p>
              </div>
            </div>
            <Button
              variant={activeConversation.blocked ? "secondary" : "outline"}
              onClick={() => toggleBlock(activeConversation.id)}
            >
              <Ban className="mr-2 h-4 w-4" />
              {activeConversation.blocked ? "Desbloquear" : "Bloquear"}
            </Button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {conversationMessages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  message.sender === "me"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p>{message.text}</p>
                <div
                  className={`mt-1 flex items-center gap-1 text-[11px] ${
                    message.sender === "me" ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  <span>{new Date(message.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                  {message.sender === "me" && <MessageStatus status={message.status} />}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-4 py-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => sendMessage(activeConversation.id, emoji, "emoji")}
                  className="rounded-full border border-border bg-background px-2 py-1 text-sm"
                  disabled={activeConversation.blocked}
                >
                  {emoji}
                </button>
              ))}
              {quickStickers.map((sticker) => (
                <button
                  key={sticker}
                  type="button"
                  onClick={() => sendMessage(activeConversation.id, sticker, "sticker")}
                  className="rounded-full border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
                  disabled={activeConversation.blocked}
                >
                  {sticker}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-input bg-background px-3 py-2">
                <Smile className="h-4 w-4 text-muted-foreground" />
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={
                    activeConversation.blocked
                      ? "Desbloqueie para enviar mensagens"
                      : "Digite sua mensagem..."
                  }
                  className="w-full bg-transparent text-sm outline-none"
                  disabled={activeConversation.blocked}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && draft.trim()) {
                      sendMessage(activeConversation.id, draft, "text");
                      setDraft("");
                    }
                  }}
                />
              </div>
              <Button
                onClick={() => {
                  if (!draft.trim()) return;
                  sendMessage(activeConversation.id, draft, "text");
                  setDraft("");
                }}
                disabled={activeConversation.blocked || !draft.trim()}
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar
              </Button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function MessageStatus({ status }: { status: "sent" | "delivered" | "read" }) {
  if (status === "sent") return <Check className="h-3.5 w-3.5" />;
  if (status === "delivered") return <CheckCheck className="h-3.5 w-3.5" />;
  return <CheckCheck className="h-3.5 w-3.5 text-emerald-200" />;
}
