"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, MoreVertical, Phone, Video, Info } from "lucide-react"
import Image from "next/image"

interface Recipient {
  id: string
  name: string
  avatar: string
  specialization?: string
  caseType?: string
}

interface Message {
  id: string
  content: string
  sender: "user" | "recipient"
  timestamp: Date
  read: boolean
}

interface ChatInterfaceProps {
  recipient: Recipient
  userType: "lawyer" | "client"
}

export default function ChatInterface({ recipient, userType }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, how can I help you with your legal matter today?",
      sender: userType === "lawyer" ? "user" : "recipient",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
    },
    {
      id: "2",
      content: "I need assistance with my property dispute case. Can you help me understand the next steps?",
      sender: userType === "lawyer" ? "recipient" : "user",
      timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
      read: true,
    },
    {
      id: "3",
      content: "Of course, I'd be happy to help. Could you provide more details about your property dispute?",
      sender: userType === "lawyer" ? "user" : "recipient",
      timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
      read: true,
    },
    {
      id: "4",
      content:
        "I purchased a property in Islamabad last year, but now there's another person claiming ownership with what seems to be forged documents.",
      sender: userType === "lawyer" ? "recipient" : "user",
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      read: true,
    },
    {
      id: "5",
      content:
        "That's a serious issue. We'll need to gather all your ownership documents and file a proper case. I'll review your property documents and get back to you tomorrow.",
      sender: userType === "lawyer" ? "user" : "recipient",
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      read: userType === "client",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      read: false,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate reply after a delay (for demo purposes)
    if (messages.length % 2 === 0) {
      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Thank you for your message. I'll look into this and get back to you soon.",
          sender: "recipient",
          timestamp: new Date(),
          read: false,
        }
        setMessages((prevMessages) => [...prevMessages, replyMessage])
      }, 2000)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative w-10 h-10 mr-3">
            <Image src={recipient.avatar || "/placeholder.svg"} alt={recipient.name} fill className="rounded-full" />
          </div>
          <div>
            <h4 className="font-medium">{recipient.name}</h4>
            <p className="text-xs text-gray-500">{recipient.specialization || recipient.caseType || "Online"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Phone className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Video className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Info className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "recipient" && (
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image
                    src={recipient.avatar || "/placeholder.svg"}
                    alt={recipient.name}
                    fill
                    className="rounded-full"
                  />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-white border rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div
                  className={`text-xs mt-1 flex items-center justify-end ${
                    message.sender === "user" ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                  {message.sender === "user" && <span className="ml-1">{message.read ? "✓✓" : "✓"}</span>}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="mx-3 flex-grow"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-primary hover:bg-beige-600"
          disabled={!newMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}
