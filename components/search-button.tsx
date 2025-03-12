"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to chatbot page with the search query as a parameter
      router.push(`/chatbot?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

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
        <Card className="absolute right-0 top-full mt-2 w-80 p-4 z-50 shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Search Canvas</h3>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search courses, assignments..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" disabled={!searchQuery.trim()}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="text-xs text-gray-500">
                Search results will be processed by Canvas AI assistant
              </div>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
} 