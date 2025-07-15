import { useState, useEffect, useCallback } from "react";
import { Message } from "ai";

type ChatSession = {
  id: string;
  messages: Message[];
  createdAt: number;
};

const STORAGE_KEY = "chat_sessions";

export function useChatHistory() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      setSessions(raw ? JSON.parse(raw) : []);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions, isLoaded]);

  const createNewSession = useCallback(() => {
    if (!isLoaded) return null;

    const id = Date.now().toString();
    const newSession: ChatSession = {
      id,
      messages: [],
      createdAt: Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(id);
    return newSession;
  }, [isLoaded]);

  const updateCurrentSession = (message: Message) => {
    if (!currentSessionId) return;
    setSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? { ...s, messages: [...s.messages, message] }
          : s
      )
    );
  };

  const updateSessionMessages = (id: string, messages: Message[]) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, messages } : s))
    );
  };

  const selectSession = (id: string) => {
    setCurrentSessionId(id);
  };

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  return {
    sessions,
    currentSession,
    currentSessionId,
    createNewSession,
    updateCurrentSession,
    updateSessionMessages,
    selectSession,
    isLoaded,
  };
}
