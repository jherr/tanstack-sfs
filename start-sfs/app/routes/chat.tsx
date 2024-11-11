import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, Message } from "ai";
import { useChat } from "ai/react";

import { Input } from "../components/ui/input";

const chat = createServerFn(
  "POST",
  async ({ messages }: { messages: Message[] }) => {
    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages: convertToCoreMessages(messages),
    });
    return result.toDataStreamResponse();
  }
);

export const Route = createFileRoute("/chat")({
  component: Chat,
});

const fetch: typeof window.fetch = async (input, init) => {
  return chat(JSON.parse(init!.body as string));
};

function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    fetch,
  });

  return (
    <div className="flex flex-col">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-0 mb-8 w-3/4">
        <Input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
