import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Shield, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const requestControllerRef = useRef<AbortController | null>(null);

  // Initialize messages based on current language
  useEffect(() => {
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    setIsLoading(false);
    setError(null);
    setInputValue("");
    setMessages([
      {
        role: "model",
        text:
          language === "fr"
            ? "Bonjour ! Je suis Shield Assistant. Je peux vous orienter sur nos services IT, la cybersécurité ou le Store."
            : "Hello! I am Shield Assistant. I can guide you through our IT services, cybersecurity support or Store.",
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  useEffect(() => {
    return () => requestControllerRef.current?.abort();
  }, []);

  // Scroll to bottom whenever messages list grows
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setError(null);
    const controller = new AbortController();
    requestControllerRef.current?.abort();
    requestControllerRef.current = controller;
    const requestLanguage = language;

    try {
      // Reconstitute context for server-side Gemini chat API
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          language,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(
          language === "fr"
            ? "Une erreur rÃ©seau est survenue lors de la communication."
            : "A network error occurred during communication."
        );
      }

      const data = await res.json();

      if (controller.signal.aborted || requestLanguage !== language) return;
      
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.text || "...",
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error(err);
      setError(err.message || "Failed to contact Shield Assistant");
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  const currentSuggestions = [
    t("chat.suggest1"),
    t("chat.suggest2"),
    t("chat.suggest3"),
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-[360px] sm:w-[400px] h-[550px] bg-white border border-slate-200/80 rounded-[32px] shadow-[0_30px_70px_rgba(10,27,51,0.18)] flex flex-col overflow-hidden mb-4 select-text"
          >
            {/* Header portion with deep cyan-teal colors matching the corporate style */}
            <div className="bg-[#0b7c9e] text-white p-5 flex items-center justify-between border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 shadow-inner relative">
                  <Shield className="w-5.5 h-5.5 text-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0b7c9e] animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-[15px] font-bold tracking-tight leading-tight">
                    {t("chat.title")}
                  </h3>
                  <span className="text-[11px] text-white/70 font-mono tracking-wide">
                    {t("chat.subtitle")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close Assistant panel"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/20 max-h-[380px]">
              {messages.map((msg, idx) => {
                const isModel = msg.role === "model";
                return (
                  <div
                    key={idx}
                    className={`flex ${isModel ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[82%] px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
                        isModel
                          ? "bg-white border border-slate-100 text-slate-800 rounded-tl-sm font-sans"
                          : "bg-[#0b7c9e] text-white rounded-tr-sm font-sans"
                      }`}
                    >
                      {isModel && (
                        <div className="flex items-center gap-1 mb-1 font-display text-[10px] font-bold tracking-wider text-[#0b7c9e] uppercase">
                          <Sparkles className="w-3 h-3" />
                          Shield Assistant
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span className={`block text-[9px] mt-1.5 font-mono text-right ${
                        isModel ? "text-slate-400" : "text-white/60"
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bot Loading/Typing feedback */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-[#0b7c9e] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#0b7c9e] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#0b7c9e] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error feedback */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-rose-700 text-xs shadow-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold">{error}</p>
                    <button
                      onClick={() => handleSendMessage(inputValue)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 underline hover:no-underline cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> {language === "fr" ? "RÃ©essayer" : "Retry"}
                    </button>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick interactive suggestion pills inside helper drawer */}
            {messages.length === 1 && (
              <div className="px-5 py-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 select-none bg-slate-50/50">
                {currentSuggestions.map((suggestion, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-[11px] font-medium text-slate-text bg-white border border-slate-200/40 hover:border-[#0b7c9e]/40 hover:text-[#0b7c9e] px-3 py-1.5 rounded-full transition-all text-left cursor-pointer active:scale-95 shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input fields */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 border-t border-slate-100 bg-white flex items-center gap-2 select-none"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-slate-100/60 border border-transparent focus:border-[#0b7c9e]/20 focus:bg-white px-4 py-2.5 rounded-full text-[13px] outline-none transition-all placeholder:text-slate-400 text-slate-800 font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-[#0b7c9e] hover:bg-[#0b7c9e]/90 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md select-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher bubble button */}
      <motion.button
        id="chatbot-launcher-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#0b7c9e] text-white flex items-center justify-center shadow-[0_15px_35px_rgba(11,124,158,0.35)] hover:shadow-[0_20px_45px_rgba(11,124,158,0.45)] cursor-pointer select-none border border-[#0ea5e9]/30 relative group overflow-hidden"
        aria-label="Open support chat Assistant"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-400 rounded-full border-2 border-[#0b7c9e]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
