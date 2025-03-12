"use client"

import { Calendar, FileText, Home, MessageSquare, Settings, Users, Book, Clock, HelpCircle, Menu, X } from "lucide-react"
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only run client-side code after component is mounted
  useEffect(() => {
    setMounted(true)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const NavItems = () => (
    <nav className="flex flex-col items-center gap-6">
      <Link href="/" className="text-blue-600 hover:text-blue-800">
        <Home className="h-6 w-6" />
      </Link>
      <Link href="#" className="text-gray-500 hover:text-gray-700">
        <FileText className="h-6 w-6" />
      </Link>
      <Link href="#" className="text-gray-500 hover:text-gray-700">
        <Users className="h-6 w-6" />
      </Link>
      <Link href="#" className="text-gray-500 hover:text-gray-700">
        <Calendar className="h-6 w-6" />
      </Link>
      <Link href="#" className="text-gray-500 hover:text-gray-700">
        <Book className="h-6 w-6" />
      </Link>
      <Link href="#" className="text-gray-500 hover:text-gray-700">
        <Clock className="h-6 w-6" />
      </Link>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              href="/chatbot" 
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <MessageSquare className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Canvas Chatbot</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Link href="#" className="text-gray-500 hover:text-gray-700">
        <HelpCircle className="h-6 w-6" />
      </Link>
      <Link href="#" className="text-gray-500 hover:text-gray-700">
        <Settings className="h-6 w-6" />
      </Link>
    </nav>
  )

  // Don't render anything different on server vs client to avoid hydration errors
  if (!mounted) {
    return (
      <div className="w-16 bg-white border-r flex-col items-center py-4 hidden md:flex">
        <div className="mb-6">
          <Avatar className="h-10 w-10">
            <img src="/placeholder.svg?height=40&width=40" alt="User" />
          </Avatar>
        </div>
        <NavItems />
      </div>
    );
  }

  // Mobile menu toggle button
  const MobileMenuButton = () => (
    <Button 
      variant="ghost" 
      size="icon" 
      className="md:hidden fixed top-4 left-4 z-50" 
      onClick={toggleMobileMenu}
    >
      {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  )

  // After mounted, we can use client-side logic
  // Desktop sidebar
  if (!isMobile) {
    return (
      <div className="w-16 bg-white border-r flex flex-col items-center py-4 hidden md:flex">
        <div className="mb-6">
          <Avatar className="h-10 w-10">
            <img src="/placeholder.svg?height=40&width=40" alt="User" />
          </Avatar>
        </div>
        <NavItems />
      </div>
    )
  }

  // Mobile view
  return (
    <>
      <MobileMenuButton />
      
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col items-center p-4 h-full">
          <div className="mb-6 mt-10">
            <Avatar className="h-10 w-10">
              <img src="/placeholder.svg?height=40&width=40" alt="User" />
            </Avatar>
          </div>
          <NavItems />
        </div>
      </div>
    </>
  )
}

