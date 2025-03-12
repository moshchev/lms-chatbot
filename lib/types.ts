export interface CourseType {
  id: string
  title: string
  code: string
  year: string
  image: string
  hasDiscussion: boolean
  hasFiles: boolean
  hasCalendar: boolean
}

export interface TodoItemType {
  id: string
  title: string
  details: string
  date: string
}

export interface FeedbackItemType {
  id: string
  title: string
  details: string
  score: string
}

export interface ChatMessageType {
  id: string
  role: "user" | "assistant"
  content: string
}

