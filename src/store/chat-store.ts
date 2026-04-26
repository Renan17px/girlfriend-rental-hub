"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  initialConversations,
  initialMessages,
  type ChatConversation,
  type ChatMessage,
  type MessageStatus,
} from "@/lib/chat-mock";

type ChatState = {
  conversations: ChatConversation[];
  messages: ChatMessage[];
  activeConversationId: string;
  setActiveConversation: (conversationId: string) => void;
  sendMessage: (conversationId: string, text: string, kind?: "text" | "emoji" | "sticker") => void;
  setConversationTyping: (conversationId: string, typing: boolean) => void;
  setMessageStatus: (messageId: string, status: MessageStatus) => void;
  toggleBlock: (conversationId: string) => void;
  markAsRead: (conversationId: string) => void;
};

const defaultConversationId = initialConversations[0]?.id ?? "";

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: initialConversations,
      messages: initialMessages,
      activeConversationId: defaultConversationId,

      setActiveConversation: (conversationId) => {
        set((state) => ({
          activeConversationId: conversationId,
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, unreadCount: 0, typing: false }
              : conversation,
          ),
        }));
      },

      sendMessage: (conversationId, text, kind = "text") => {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        const messageId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const message: ChatMessage = {
          id: messageId,
          conversationId,
          sender: "me",
          text: trimmedText,
          createdAt: new Date().toISOString(),
          status: "sent",
          kind,
        };

        set((state) => ({
          messages: [...state.messages, message],
        }));

        setTimeout(() => {
          get().setMessageStatus(messageId, "delivered");
        }, 500);
        setTimeout(() => {
          get().setMessageStatus(messageId, "read");
        }, 1400);
      },

      setConversationTyping: (conversationId, typing) => {
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId ? { ...conversation, typing } : conversation,
          ),
        }));
      },

      setMessageStatus: (messageId, status) => {
        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === messageId ? { ...message, status } : message,
          ),
        }));
      },

      toggleBlock: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, blocked: !conversation.blocked }
              : conversation,
          ),
        }));
      },

      markAsRead: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, unreadCount: 0, typing: false }
              : conversation,
          ),
        }));
      },
    }),
    {
      name: "mn-chat-store",
      partialize: (state) => ({
        conversations: state.conversations,
        messages: state.messages,
        activeConversationId: state.activeConversationId,
      }),
    },
  ),
);

export function getUnreadCount(conversations: ChatConversation[]) {
  return conversations.reduce((total, conversation) => total + conversation.unreadCount, 0);
}
