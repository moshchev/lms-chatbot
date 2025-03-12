import { Card } from "@/components/ui/card"
import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { todoItems } from "@/lib/data"

export default function ToDoList() {
  return (
    <Card className="p-3 mb-4">
      <h2 className="text-base font-semibold mb-2">To Do</h2>

      <div className="space-y-3">
        {todoItems.map((item) => (
          <div key={item.id} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
            <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <a href="#" className="text-xs text-green-600 hover:underline font-medium block truncate">
                {item.title}
              </a>
              <p className="text-xs text-gray-600 line-clamp-2">{item.details}</p>
              <p className="text-xs text-gray-600">{item.date}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 flex-shrink-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-2">
        <Button variant="link" className="text-xs text-blue-600 p-0 h-auto">
          Show All
        </Button>
      </div>
    </Card>
  )
}

