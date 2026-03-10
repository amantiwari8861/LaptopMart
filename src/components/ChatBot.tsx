import { useState, useEffect, useRef, type KeyboardEvent, type JSX } from "react";
import { MessageCircle } from "lucide-react";
import { api } from "../config/springAiConfig";

interface ChatResponse {
  status: boolean;
  message: string;
}

type MessageType = "user" | "bot";

interface ChatMessage {
  type: MessageType;
  text: string;
}

export default function ChatBot(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = sessionStorage.getItem("chat_messages");
    return stored ? JSON.parse(stored) : [
      {
        "type": "bot",
        "text": "Hello, How can i assist you today ?"
      }
    ];
  });
  const [input, setInput] = useState<string>("");
  const [typingMessage, setTypingMessage] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [typingMessage]);

  useEffect(() => {
    scrollToBottom();
    sessionStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  const talkToBackend = async (prompt: string): Promise<string> => {
    try {
      const { data } = await api.post<ChatResponse>("/api/v1/chat", {
        message: prompt,
      });

      return data.status ? data.message : "Backend Not Responding!";
    } catch (error) {
      console.error(error);
      return "Something went wrong!";
    }
  };

  const fakeBotReply = async (text: string): Promise<void> => {
    const botResp = await talkToBackend(text);
    const reply = `Bot: ${botResp}`;

    let index = 0;
    setTypingMessage("");

    const interval = setInterval(() => {
      setTypingMessage((prev) => prev + reply[index]);
      index++;

      if (index >= reply.length) {
        clearInterval(interval);
        setMessages((prev) => [...prev, { type: "bot", text: reply }]);
        setTypingMessage("");
      }
    }, 20);
  };

  const sendMessage = (): void => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { type: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    fakeBotReply(input);

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 flex justify-between items-center">
            <h2 className="font-semibold">AI Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${msg.type === "user"
                    ? "bg-indigo-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow bg-white text-gray-800 rounded-bl-none">
                  {typingMessage}
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
