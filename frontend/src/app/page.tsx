"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChatHistory } from "@/hooks/useChatHistory";

export default function Home() {
  const router = useRouter();
  const { sessions, createNewSession } = useChatHistory();

  useEffect(() => {
    if (sessions.length > 0) {
      router.replace(`/c/${sessions[0].id}`);
    } else {
      const newSession = createNewSession();
      if (newSession) {
        router.replace(`/c/${newSession.id}`);
      }
    }
  }, [sessions, createNewSession, router]);

  return <div className="p-4 text-white">Redirecting...</div>;
}
