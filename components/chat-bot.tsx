"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, Bot, AlertCircle } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Pakistani legal assistant. How can I help you with legal information today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      // Simple pattern matching for demo purposes
      if (input.toLowerCase().includes("constitution")) {
        response =
          "The Constitution of Pakistan is the supreme law of Pakistan. It was adopted on 12 April 1973 and provides a parliamentary form of government with a President as head of state and a Prime Minister as head of government."
      } else if (input.toLowerCase().includes("criminal") || input.toLowerCase().includes("penal")) {
        response =
          "The Pakistan Penal Code is the main criminal code of Pakistan. It was originally prepared by Lord Macaulay and was introduced in 1860 during the British Raj."
      } else if (input.toLowerCase().includes("divorce") || input.toLowerCase().includes("marriage")) {
        response =
          "Family law in Pakistan is primarily governed by the Muslim Family Laws Ordinance, 1961. For divorce matters, there are specific procedures that need to be followed depending on whether it's initiated by the husband (talaq) or wife (khula)."
      } else if (input.toLowerCase().includes("tax")) {
        response =
          "Tax laws in Pakistan are primarily governed by the Income Tax Ordinance, 2001 and the Sales Tax Act, 1990. The Federal Board of Revenue (FBR) is responsible for administering these laws."
      } else {
        response =
          "I can provide information about Pakistani laws including constitutional law, criminal law, family law, tax law, and more. Please ask a specific legal question, and I'll do my best to assist you."
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className="flex flex-col h-[500px] w-full max-w-md relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg animate-fade-in">
          <div className="text-center p-6">
            <AlertCircle className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Advanced Chatbot Coming Soon!</h3>
            <p className="text-white/90">
              Our AI-powered legal assistant will provide more accurate and detailed responses to your legal questions.
            </p>
          </div>
        </div>
      )}
      <div className="bg-primary text-white p-4 rounded-t-lg">
        <h3 className="font-bold text-lg">Legal Assistant</h3>
        <p className="text-sm opacity-80">Ask questions about Pakistani laws</p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 bg-white">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                  message.role === "user" ? "bg-beige-200 ml-2" : "bg-primary mr-2"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-primary" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div>
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-beige-100 text-gray-800 rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {message.content}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex max-w-[80%] flex-row">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary mr-2 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white rounded-b-lg flex items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Pakistani laws..."
          className="flex-grow"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="ml-2 bg-primary hover:bg-beige-600"
          disabled={isLoading || !input.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
