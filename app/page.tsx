"use client";

import { FormEvent, useState } from "react";
import { MessageBubble, type Message } from "@/components/MessageBubble";
import { LoadingDots } from "@/components/LoadingDots";

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-1",
      role: "system",
      content:
        "Soy AeroBot. Respondo únicamente usando la documentación recuperada. Si no existe referencia, responderé: 'No encontré esa información en la documentación de familiarización.'"
    }
  ]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: trimmed })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        citations: data.citations
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallbackMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "No encontré esa información en la documentación de familiarización."
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_#05203f,_#020817_60%)] px-4 pb-16 pt-10 text-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <header className="mb-10 flex flex-col gap-3 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-primary-100">AeroBot</h1>
          <p className="text-sm text-slate-300">
            Asistente técnico experto en documentación de familiarización de aeronaves. Todas las respuestas se basan exclusivamente en los fragmentos recuperados.
          </p>
        </header>

        <section className="flex-1 space-y-4 overflow-y-auto rounded-3xl border border-slate-800/70 bg-slate-900/40 p-6 shadow-lg backdrop-blur">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-primary-500/40 px-4 py-3 text-sm text-primary-50 shadow">
                <LoadingDots />
              </div>
            </div>
          )}
        </section>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full flex-col gap-3 rounded-3xl border border-slate-800/60 bg-slate-900/70 p-4 shadow-xl backdrop-blur"
        >
          <label htmlFor="question" className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Consulta técnica
          </label>
          <textarea
            id="question"
            name="question"
            rows={3}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ejemplo: ¿Cómo se restablece la potencia eléctrica si falla un generador?"
            className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-500/40"
          />
          <div className="flex items-center justify-end gap-3">
            <p className="text-xs text-slate-500">
              AeroBot sólo utiliza documentación recuperada. Sin contexto válido responderá con el mensaje reglamentario.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-400 disabled:cursor-not-allowed disabled:bg-primary-700"
            >
              {isLoading ? "Buscando" : "Consultar"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
