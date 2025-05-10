"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, Bot } from "lucide-react"

interface QuickChatProps {
  lawyerId?: string
  lawyerName?: string
}

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function QuickChat({ lawyerId, lawyerName = "Legal Assistant" }: QuickChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm ${lawyerName}. How can I help you with your legal matter today?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    hasProvidedInfo: false,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

    // If user hasn't provided contact info and this is their first message
    if (!userInfo.hasProvidedInfo && messages.length === 1) {
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          content:
            "Thank you for your message. To connect you with the right legal expert, could you please provide your name, email, and phone number?",
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsLoading(false)
      }, 1000)
      return
    }

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
      } else if (
        !userInfo.hasProvidedInfo &&
        (input.toLowerCase().includes("@") ||
          input.toLowerCase().includes("email") ||
          input.toLowerCase().includes("phone") ||
          input.toLowerCase().includes("name"))
      ) {
        response =
          "Thank you for providing your contact information. A qualified lawyer will reach out to you shortly to discuss your legal matter in detail."
        setUserInfo({
          ...userInfo,
          hasProvidedInfo: true,
        })
      } else {
        response =
          "Thank you for your question. This is a complex legal matter that requires personalized attention. Would you like to schedule a consultation with a specialized lawyer to discuss this in detail?"
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
    <div className="flex flex-col h-[500px] w-full max-w-md">
      <div className="bg-primary text-white p-4 rounded-t-lg">
        <h3 className="font-bold text-lg">Chat with {lawyerName}</h3>
        <p className="text-sm opacity-80">Ask questions about your legal matter</p>
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
          placeholder={userInfo.hasProvidedInfo ? "Type your message..." : "Enter your name, email and phone..."}
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
