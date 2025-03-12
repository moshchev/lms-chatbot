"use client"

import { Card } from "@/components/ui/card"
import { MoreVertical, MessageSquare, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { CourseType } from "@/lib/types"

interface CourseCardProps {
  course: CourseType
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden border rounded-md h-full flex flex-col">
      <div className="relative">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-24 sm:h-28 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-center justify-center">
          <h3 className="text-white text-base sm:text-lg font-semibold text-center px-3">{course.title}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-1 right-1 text-white hover:bg-black/20 h-7 w-7">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View Course</DropdownMenuItem>
            <DropdownMenuItem>Course Settings</DropdownMenuItem>
            <DropdownMenuItem>Mark as Favorite</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-green-600 font-medium text-sm">{course.code}</p>
          <p className="text-xs text-gray-500">{course.year}</p>
        </div>

        <div className="flex mt-2 gap-2">
          {course.hasDiscussion && (
            <Button variant="outline" size="icon" className="h-7 w-7 p-0">
              <MessageSquare className="h-3.5 w-3.5" />
            </Button>
          )}

          {course.hasFiles && (
            <Button variant="outline" size="icon" className="h-7 w-7 p-0">
              <FileText className="h-3.5 w-3.5" />
            </Button>
          )}

          {course.hasCalendar && (
            <Button variant="outline" size="icon" className="h-7 w-7 p-0">
              <Calendar className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

