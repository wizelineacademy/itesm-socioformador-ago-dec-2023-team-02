"use client";
import ConversationBody from "@/components/molecules/user/conversationBody/conversation-body";
import ThemeButton from "@/components/theme-button";

//Just for testing
export default function Home() {
  return (
    <section className="w-full justify-center">
      <ThemeButton />
      <div className="w-full justify-center">
    <ConversationBody />
      </div>
    </section>
  );
}
