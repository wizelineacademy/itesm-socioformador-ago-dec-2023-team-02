"use client";
import Settings from "@/components/shared/molecules/settings";
import ConversationBody from "@/components/user/conversationBody/molecules/conversation-body";

//Just for testing
export default function Home(): JSX.Element {
  return (
    <section className="w-full justify-center">
      <ConversationBody />
      <Settings />
    </section>
  );
}
