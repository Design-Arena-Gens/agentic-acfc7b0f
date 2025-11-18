import { clsx } from "clsx";

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  citations?: {
    id: string;
    title: string;
    excerpt: string;
  }[];
};

export function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant";
  const isSystem = message.role === "system";

  return (
    <div
      className={clsx(
        "w-full flex",
        isAssistant || isSystem ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={clsx(
          "max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed shadow",
          isSystem
            ? "bg-slate-800/70 border border-slate-700 text-slate-100"
            : isAssistant
            ? "bg-primary-500 text-white"
            : "bg-slate-100 text-slate-900"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.citations && message.citations.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.citations.map((citation) => (
              <div
                key={citation.id}
                className="rounded-xl bg-white/15 px-3 py-2 text-xs text-blue-50 backdrop-blur"
              >
                <p className="font-semibold text-blue-100">{citation.title}</p>
                <p className="text-blue-50/90">{citation.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
