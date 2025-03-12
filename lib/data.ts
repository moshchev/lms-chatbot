import type { CourseType, TodoItemType, FeedbackItemType } from "@/lib/types"

export const courses: CourseType[] = [
  {
    id: "1",
    title: "Entrepreneurship",
    code: "2321 Elec_MGT70934_PL",
    year: "2024/2025 WS",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Campus-Banner_1200x200px_4.jpg-Ol8rbgkPifMIYIbnxQAbjjCUCnARqd.png",
    hasDiscussion: true,
    hasFiles: true,
    hasCalendar: false,
  },
  {
    id: "2",
    title: "MADS Study Guide 23",
    code: "2321 MADS_MADS-SG-23_PL",
    year: "2024/2025 WS",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Campus-Banner_1200x200px_4.jpg-Ol8rbgkPifMIYIbnxQAbjjCUCnARqd.png",
    hasDiscussion: true,
    hasFiles: true,
    hasCalendar: true,
  },
  {
    id: "3",
    title: "Natural Language Processing",
    code: "2321 MADS_MGT73324_PL",
    year: "2024/2025 WS",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Campus-Banner_1200x200px_4.jpg-Ol8rbgkPifMIYIbnxQAbjjCUCnARqd.png",
    hasDiscussion: true,
    hasFiles: true,
    hasCalendar: false,
  },
  {
    id: "4",
    title: "Cooperation Company Project",
    code: "2321 MADS_INF73368_PL",
    year: "2024/2025 WS",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Campus-Banner_1200x200px_4.jpg-Ol8rbgkPifMIYIbnxQAbjjCUCnARqd.png",
    hasDiscussion: true,
    hasFiles: true,
    hasCalendar: false,
  },
  {
    id: "5",
    title: "Deep Learning",
    code: "2321 MADS_MGT75023_PL",
    year: "2024/2025 WS",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Campus-Banner_1200x200px_4.jpg-Ol8rbgkPifMIYIbnxQAbjjCUCnARqd.png",
    hasDiscussion: true,
    hasFiles: true,
    hasCalendar: false,
  },
  {
    id: "6",
    title: "Strategy and Performance Management",
    code: "2321 MADS_MGT73367_PL",
    year: "2024/2025 WS",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Campus-Banner_1200x200px_4.jpg-Ol8rbgkPifMIYIbnxQAbjjCUCnARqd.png",
    hasDiscussion: true,
    hasFiles: true,
    hasCalendar: false,
  },
  {
    id: "7",
    title: "Exam Quantitative Fundamentals",
    code: "2023-214_MAS-E-QUF-Q1/2023",
    year: "",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Campus-Banner_1200x200px_4.jpg-Ol8rbgkPifMIYIbnxQAbjjCUCnARqd.png",
    hasDiscussion: false,
    hasFiles: true,
    hasCalendar: false,
  },
  {
    id: "8",
    title: "Exam Computational Statistics",
    code: "2023-217_MAS-E-CSP-Q2/2023",
    year: "",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Campus-Banner_1200x200px_4.jpg-Ol8rbgkPifMIYIbnxQAbjjCUCnARqd.png",
    hasDiscussion: false,
    hasFiles: true,
    hasCalendar: false,
  },
]

export const todoItems: TodoItemType[] = [
  {
    id: "1",
    title: "Interim Examination Schedule // March 03 2025",
    details: "MADS Study Guide 23",
    date: "Feb 26 at 5pm",
  },
  {
    id: "2",
    title: "Interim Examination Schedule // March 03 2025",
    details: "MADS Study Guide 23",
    date: "Feb 26 at 5pm",
  },
  {
    id: "3",
    title: "Additional learning rooms for exam preparation",
    details: "MADS Study Guide 23",
    date: "Feb 28 at 10am",
  },
  {
    id: "4",
    title: "Entrepreneurship, Dr. Sebastian Schäfer",
    details: "Entrepreneurship",
    date: "Mar 3 at 10am",
  },
  {
    id: "5",
    title: "Entrepreneurship, Dr. Sebastian Schäfer",
    details: "Entrepreneurship",
    date: "Mar 3 at 11:45am",
  },
]

export const feedbackItems: FeedbackItemType[] = [
  {
    id: "1",
    title: "One-on-one Assessment",
    details: "2321 MADS_INF73368_PL",
    score: "57 out of 60",
  },
  {
    id: "2",
    title: "Group Evaluation Form",
    details: "",
    score: "",
  },
]

