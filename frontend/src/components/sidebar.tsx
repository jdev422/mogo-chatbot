"use client";

import { useRouter } from "next/navigation";
import { useChatHistoryContext } from "@/hooks/ChatHistoryProvider";

export function Sidebar() {
  const router = useRouter();
  const { sessions, currentSessionId, createNewSession, selectSession } =
    useChatHistoryContext();

  const handleNewChat = () => {
    const newSession = createNewSession();
    if (newSession) {
      router.push(`/c/${newSession.id}`);
    }
  };

  const handleSelectSession = (id: string) => {
    selectSession(id);
    router.push(`/c/${id}`);
  };

  return (
    <div className="relative justify-between group flex flex-col h-full gap-4 p-2 min-w-3xs bg-[#181818] text-white">
      <div>
        <button
          className="w-full bg-[#2a2a2a] hover:bg-[#333] text-white py-2 px-3 rounded text-sm"
          onClick={handleNewChat}
        >
          + New Chat
        </button>

        <div className="flex flex-col gap-1 mt-4 overflow-y-auto">
          Chats
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => handleSelectSession(session.id)}
              className={`text-left px-3 py-2 rounded text-sm truncate ${
                session.id === currentSessionId
                  ? "bg-[#3a3a3a]"
                  : "hover:bg-[#2a2a2a]"
              }`}
            >
              Chat from {new Date(session.createdAt).toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div className="justify-center px-2 py-2 w-full border-t border-[#323232] text-xs text-center">
        Malik Chatbot Version 0.10
      </div>
    </div>
  );
}
