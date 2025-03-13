"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, Send, Calendar, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { ChatMessageType } from "@/lib/types"

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Canvas LMS assistant. How can I help you today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState<string>("")
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content: searchQuery,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setStreamingMessage("")

    try {
      // Create a temporary message ID for the streaming response
      const tempMessageId = (Date.now() + 1).toString()

      // Call our API route with streaming
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      // Set up streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        if (done) break;
        
        // Decode and accumulate the chunk
        const chunkText = decoder.decode(value, { stream: true });
        accumulatedText += chunkText;
        setStreamingMessage(accumulatedText);
      }

      // Add the complete assistant message
      const assistantMessage: ChatMessageType = {
        id: tempMessageId,
        role: "assistant",
        content: accumulatedText,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setStreamingMessage("")
      setSearchQuery("")
    } catch (error) {
      console.error("Error generating response:", error)

      // Add error message
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle pre-prompt clicks
  const handlePrePromptClick = (prompt: string) => {
    setSearchQuery(prompt)
    // Submit the form programmatically
    const formEvent = new Event('submit', { cancelable: true }) as unknown as React.FormEvent
    handleSearchSubmit(formEvent)
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, streamingMessage])

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchOpen])

  // Handle escape key to close search
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isSearchOpen])

  return (
    <div className="relative" ref={searchRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      {isSearchOpen && (
        <Card className="absolute right-0 top-full mt-2 w-96 p-4 z-50 shadow-lg animate-in fade-in slide-in-from-top-5 duration-300 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Canvas AI Assistant</h3>
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Pre-prompts section - only show if no messages except welcome */}
          {messages.length === 1 && !isLoading && (
            <div className="mb-4 space-y-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  className="justify-start text-sm h-auto py-2 px-3"
                  onClick={() => handlePrePromptClick("When is the next thesis registration deadline")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  When is the next thesis registration deadline?
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start text-sm h-auto py-2 px-3"
                  onClick={() => handlePrePromptClick("When is my next exam")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  When is my next exam?
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto max-h-80 mb-3 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-2 text-sm ${
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {/* Streaming message display */}
            {streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-2 text-sm bg-gray-100 text-gray-800">
                  {streamingMessage}
                </div>
              </div>
            )}
            
            {/* Loading indicator */}
            {isLoading && !streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-2 text-sm bg-gray-100 text-gray-800">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible div for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask anything about Canvas..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !searchQuery.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  )
} 