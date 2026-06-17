'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function renderMarkdown(text: string) {
  // Convert markdown links [text](url) to HTML
  const withLinks = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" class="text-emerald-700 underline underline-offset-2 hover:text-emerald-800" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  // Convert **bold** to <strong>
  const withBold = withLinks.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Convert \n to <br>
  return withBold.replace(/\n/g, '<br/>');
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-3">
      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

export default function ChatUI({ variant = 'full' }: { variant?: 'full' | 'widget' }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hey! I'm your Sea to Sky trip planner. Tell me what you're planning — hiking, skiing, food, accommodation — and I'll help you make the most of your time in Squamish, Whistler, or Pemberton.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMsg =
          res.status === 429 && errorData.error
            ? errorData.error
            : "Sorry, I couldn't process that. Please try again.";
        setMessages([...newMessages, { role: 'assistant', content: errorMsg }]);
        setIsStreaming(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { role: 'assistant', content: assistantContent }]);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }

  const isWidget = variant === 'widget';

  return (
    <div className={`flex flex-col ${isWidget ? 'h-full' : 'h-[calc(100vh-12rem)]'}`}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] break-words [overflow-wrap:anywhere] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-700 text-white rounded-br-md'
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-md'
              }`}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
            />
          </div>
        ))}
        {isStreaming && messages[messages.length - 1]?.content === '' && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-3 py-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the Sea to Sky..."
            disabled={isStreaming}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
          >
            Send
          </button>
        </form>
        {isWidget && (
          <div className="text-center mt-2">
            <Link href="/chat" className="text-xs text-slate-400 hover:text-emerald-600 transition-colors">
              Open full trip planner &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
