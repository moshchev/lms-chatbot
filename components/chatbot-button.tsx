"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ChatbotButton() {
  const router = useRouter()

  const handleChatClick = () => {
    router.push('/chatbot')
  }

  return (
    <Button 
      variant="ghost" 
      className="flex items-center gap-2" 
      onClick={handleChatClick}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden md:inline">Chat</span>
    </Button>
  )
} 