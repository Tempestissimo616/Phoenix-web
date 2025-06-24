import type { Experience, Project, Skill } from "@/types"

export const personalInfo = {
  name: "Yuexi Sun",
  title: "Full Stack Developer | React & Node.js Expert",
  location: "Hamilton, ON Canada",
  email: "g1916552264@gmail.com",
  bio: "Passionate full-stack developer with expertise in modern web technologies. Experienced in React, Next.js, and Node.js development, committed to building high-quality, user-friendly web applications. Quick learner with excellent teamwork and communication skills.",
  avatar: "/Yuexi Sun.jpg?height=160&width=160",
}

export const experiences: Experience[] = [
  {
    type: "internship",
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "Beijing, China",
    duration: "Jun 2023 - Sep 2023",
    description:
      "Responsible for frontend development of the company's main products, building user interfaces with React and TypeScript, optimizing page performance, and enhancing user experience.",
    achievements: [
      "Improved page loading speed by 40%",
      "Refactored 3 core components, improving code reusability",
      "Participated in design system construction, unified UI standards",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
]

export const projects: Project[] = [
  {
    title: "E-commerce Platform Frontend",
    description:
      "A modern e-commerce platform built with Next.js, featuring product display, shopping cart, order management, and payment integration.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    achievements: [
      "Implemented complete shopping flow",
      "Integrated payment system with Stripe",
      "Responsive design for all devices",
      "SEO optimized with 95+ Lighthouse score",
    ],
    github: "https://github.com/username/ecommerce",
    demo: "https://demo.example.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Task Management Application",
    description:
      "A comprehensive task management tool supporting project grouping, task assignment, progress tracking, and real-time collaboration features.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    achievements: [
      "Real-time collaboration support",
      "Data visualization dashboard",
      "Mobile-responsive design",
      "Advanced filtering and search",
    ],
    github: "https://github.com/username/task-manager",
    demo: "https://task-demo.example.com",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Personal Blog System",
    description:
      "A feature-rich personal blog built with Next.js and MDX, supporting Markdown writing, code highlighting, and comment system.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL", "Vercel"],
    achievements: [
      "SEO optimized with dynamic sitemap",
      "Dark mode support",
      "Comment and search functionality",
      "Analytics integration",
    ],
    github: "https://github.com/username/blog",
    demo: "https://blog.example.com",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "AI-Powered Chat Application",
    description:
      "An intelligent chat application with AI integration, featuring real-time messaging, file sharing, and smart conversation analysis.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["React", "OpenAI API", "WebSocket", "Redis", "Docker"],
    achievements: [
      "AI-powered conversation insights",
      "Real-time file sharing",
      "End-to-end encryption",
      "Scalable microservices architecture",
    ],
    github: "https://github.com/username/ai-chat",
    demo: "https://chat-demo.example.com",
    color: "from-orange-500 to-red-500",
  },
]

export const skills: Skill[] = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Next.js", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "MongoDB", level: 80 },
]
