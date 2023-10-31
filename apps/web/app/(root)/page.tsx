"use client";
import ConversationBody from "@/components/molecules/user/conversationBody/conversation-body";
import Settings from "@/components/shared/molecules/settings";
import ThemeButton from "@/components/theme-button";

//Just for testing
export default function Home(): JSX.Element {
  return (
    <section className="w-full justify-center">
      <ThemeButton />
      <Settings />
      <div className="w-full justify-center">
        <ConversationBody />
      </div>
    </section>
  );
}
