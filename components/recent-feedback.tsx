import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { feedbackItems } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function RecentFeedback() {
  return (
    <Card className="p-3">
      <h2 className="text-base font-semibold mb-2">Recent Feedback</h2>

      <div className="space-y-3">
        {feedbackItems.map((item) => (
          <div key={item.id} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors">
            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{item.title}</p>
              <p className="text-xs text-gray-600 line-clamp-2">{item.details}</p>
              <p className="text-xs text-gray-500">{item.score}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-2">
        <Button variant="link" className="text-xs text-blue-600 p-0 h-auto">
          View All Feedback
        </Button>
      </div>
    </Card>
  )
}

