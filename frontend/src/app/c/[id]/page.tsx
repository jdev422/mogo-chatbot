"use client";

import ChatLayout from "../../../components/ChatLayout";
import { useParams } from "next/navigation";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useEffect } from "react";

const Home = () => {
  const params = useParams();
  const chatId = params?.id as string;

  const { sessions, currentSessionId, selectSession } = useChatHistory();

  useEffect(() => {
    if (chatId && chatId !== currentSessionId) {
      selectSession(chatId);
    }
  }, [chatId, currentSessionId, selectSession]);

  const currentChatSession = sessions.find((session) => session.id === chatId);
  const initialMessages = currentChatSession?.messages ?? [];

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center">
      <ChatLayout
        key={chatId}
        id={chatId}
        initialMessages={initialMessages}
        currentSession={currentChatSession}
      />
    </main>
  );
};

export default Home;
