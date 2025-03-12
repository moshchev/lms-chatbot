import { Button } from "@/components/ui/button"
import { MoreVertical, MessageCircle } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import CourseCard from "@/components/course-card"
import ToDoList from "@/components/todo-list"
import RecentFeedback from "@/components/recent-feedback"
import { courses } from "@/lib/data"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1">
        <header className="flex items-center justify-between border-b p-4 bg-white">
          <div className="flex items-center gap-4 ml-10 md:ml-0">
            <Link href="/" className="text-blue-800 hidden md:block">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 19.5V4.5C3 3.4 3.9 2.5 5 2.5H19C20.1 2.5 21 3.4 21 4.5V19.5C21 20.6 20.1 21.5 19 21.5H5C3.9 21.5 3 20.6 3 19.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M3 7.5H21" stroke="currentColor" strokeWidth="2" />
                <path d="M7 5.5V1.5" stroke="currentColor" strokeWidth="2" />
                <path d="M17 5.5V1.5" stroke="currentColor" strokeWidth="2" />
                <path d="M6.5 11.5H8.5" stroke="currentColor" strokeWidth="2" />
                <path d="M11.5 11.5H13.5" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 11.5H18.5" stroke="currentColor" strokeWidth="2" />
                <path d="M6.5 15.5H8.5" stroke="currentColor" strokeWidth="2" />
                <path d="M11.5 15.5H13.5" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 15.5H18.5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <img
                src="/placeholder.svg?height=40&width=160"
                alt="Frankfurt School of Finance & Management"
                className="h-8 md:h-10"
              />
            </div>
          </div>
        </header>

        <main className="p-3 flex flex-col lg:flex-row">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="w-full lg:w-80 mt-4 lg:mt-0 lg:ml-4">
            <ToDoList />
            <RecentFeedback />
          </div>
        </main>
      </div>
    </div>
  )
}

