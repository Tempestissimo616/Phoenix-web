import type { Experience, Project, Skill } from "@/types"

export const personalInfo = {
  name: "Yuexi Sun",
  title: "Seeking for Software development intern",
  location: "Hamilton, ON Canada",
  email: "g1916552264@gmail.com",
  bio: "I am currently a 3rd-year Computer Science student at McMaster University. Passionate full-stack developer with expertise in modern web technologies. Experienced in React, Next.js, Node.js, SpringCloud, SpringBoot development. Quick learner with excellent teamwork and communication skills.",
  avatar: "/image/Yuexi-Sun.jpg",
}

export const experiences: Experience[] = [
  {
    type: "internship",
    title: "Software Developer Enginneer Intern",
    company: "China Telecom Intelligent Security Co., Ltd.",
    location: "YuZhong District,Chongqing, China",
    duration: "May 2024 - August 2024",
    description:
      "Responsible for microservices backend development of the Chongqing Smart e-Map Traffic Control System, implementing backend components and MySQL schemas to keep monitoring real-time data provided from city traffic signals.",
    achievements: [
      "Implement signal light preset scripts and Backup Storage features",
      "Developed resuable generic BaseController for repetitive API and custom logging AOP",
      "Built MySQL schemas for Device Storage System",
    ],
    technologies: ["SpringBoot", "SpringCloud", "Java", "Nacos", "Redis", "MySQL", "Docker", "Postman"],
  },
]

export const projects: Project[] = [
  {
    title: "Phoenix Website",
    description:
      "A full-stack personal modern platform built with Next.js to document my computer-science history.",
    image: "/image/itself.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma", "Vercel", "NextAuth", "Prisma", "MySQL"],
    achievements: [
      "Dynamic dashboard visualizations with scroll-triggered effects",
      "Physics-based animations with gesture support",
      "Time-aware theme with auto-sync/manual mode",
      "Deployment on Cloud with auto-updating",
    ],
    github: "https://github.com/Tempestissimo616/Phoenix-web",
    demo: "https://demo.example.com",
    color: "from-blue-500 to-cyan-500",
    detailTitle: "TraceMyself Tracking System",
    period: "May 2025 – Present",
    detailDescription:[
      "Built a full-stack personal knowledge-tracking platform with Next.js and TypeScript to document my computer-science history, including features such as clear pagination with sorting, searchable categories, and progress tagging.",
      "Implemented secure, role-based authentication and session management with NextAuth.js.",
      "Built a dynamic, time-aware UI system with auto-theming and physics-based animations using Tailwind with Framer Motion, featuring real-time theme previews and cinematic transitions.",
      "Integrated Prisma with MySQL to model data relationships and ensure type-safe database interactions.",
      "Optimized web performance by implementing lazy loading, image compression, etc. in Next.js.",
      "Deploying to Vercel Cloud Server: Phoenix Web (Application is still in Progress...)"
    ],
    display: false,
  },
  {
    title: "AI Q&A System",
    description:
      "Designed and build a full-stack single page web program by using Spring boot and React to develop several features liks task management, audit processes, and AI Q&A system.",
    image: "/image/Springboot.png",
    technologies: ["SpringBoot", "SpringSecurity", "JWT", "Java", "React", "Vite", "Python BeautifulSoup", "MySQL", "Docker"],
    achievements: [
      "Build Register and Login REST APIs using Spring Security and JWT",
      "Implement task management features for user to create or update their task lists",
      "Integrated ChatGPT API to automatically respond by gathering data from Web Dom using web scraping",
      "Developed context-aware chat by storing & retrieving conversation history from MySQL",
    ],
    github: "https://github.com/username/task-manager",
    demo: "https://task-demo.example.com",
    color: "from-purple-500 to-pink-500",
    detailTitle: "AI Q&A System: full-stack web app development",
    period: "2023 – 2024",
    detailDescription:[
      "Built Register and Login REST APIs using Spring Security and JWT to implement Role-Based Authorization.",
      "Designed style Web Pages and interactive chat components with Material-UI to achieve user-friendly UI.",
      "Integrated ChatGPT API to automatically respond by gathering data from Web DOM using web scraping.",
      "Automated ChatGPT responses by combining answers from Web DOM using free ChatGPT usage limits with auto-login Chrome extension JSON script instead of Paid API.",
      "New Feature: Developed context-aware chat by storing & retrieving conversation history from MySQL."
    ],
    display: false,
  },
  {
    title: "NLP-Based Sentiment Analysis for Amazon Text-Review",
    description:
      "Developed a sentiment classification system comparing the accuracy results from NLTK-based VADER models and transformer-based RoBERTa models within real-world 500k+ Amazon product reviews.",
    image: "/image/NLP-image.png",
    technologies: ["Python", "PyTorch", "Pandas", "Matplotlib", "NLTK", "HuggingFace"],
    achievements: [
      "Compare VADER and RoBERTa sentiment outputs to visualize diff model behavior",
      "Leveraged Pandas combined with outlier handling strategies to improve evaluation",
      "Customized a Hugging Face Transformer-based RoBERTa",
      "Extract contextual logits with softmax post-processing",
    ],
    github: "https://github.com/username/blog",
    demo: "https://blog.example.com",
    color: "from-green-500 to-teal-500",
    detailTitle: "NLP-Based Sentiment Analysis for Amazon Text-Review",
    period: "Jan 2025 – Apr 2025",
    detailDescription:[
      "Developed a sentiment classification system using Natural Language Processing (NLP) to analyze emotional tone in real-world Amazon product review datasets, comparing the accuracy results from NLTK-based VADER models and transformer-based RoBERTa models within 500k+ product reviews.",
      "Built a data scraper using Playwright (Python) to extract dynamically rendered Amazon reviews from JavaScript-heavy web pages to search missing data with preventing runtime interruption ability.",
      "Customized a Hugging Face Transformer-based RoBERTa with PyTorch to extract contextual logits and convert them to interpretable sentiment scores via softmax post-processing.",
      "Designed a unified evaluation pipeline to align and compare VADER and RoBERTa sentiment outputs to visualize model behavior such as confidence and correlation using Seaborn pair plot.",
      "Leveraged Pandas, tqdm, and matplotlib, combined with outlier handling strategies to improve evaluation."
    ],
    display: false,
  },
  {
    title: "Train Pathfinding Visualizer",
    description:
      "Developed comparative pathfinding analyzer implementing A* with heuristic function vs Dijkstra's algorithms.  (School Project)",
    image: "/image/Visualizer.png",
    technologies: ["Python", "Pandas", "Matplotlib", "A* Algorithms", "Data Structure"],
    achievements: [
      "Processed real-world London Underground dataset",
      "A* improving 35% runtime speed compared with Dijkstra’s algorithm",
      "Visualized shortest path using Matplotlib across 45,000+ station pairs",
    ],
    github: "https://github.com/username/ai-chat",
    demo: "https://chat-demo.example.com",
    color: "from-orange-500 to-red-500",
    detailTitle: "Train Pathfinding Visualizer (School Team Project)",
    period: "Winter 2024",
    detailDescription:[
      "Developed comparative pathfinding analyzer implementing A* (with heuristic function) vs Dijkstra's algorithms, improving 35% runtime speed compared with Dijkstra’s algorithm.",
      "Processed real-world London Underground dataset with adaptive graph weighting.",
      "Visualized performance metrics (time/space complexity) using Matplotlib across 45,000+ station pairs."
    ],
    display: false,
  },
]

export const skills: Skill[] = [
  { name: "Java", level: 85 },
  { name: "Python", level: 80 },
  { name: "C", level: 60 },
  { name: "JavaScript", level: 80 },
  { name: "TypeScript", level: 80 },
  { name: "SQL", level: 75 },
  { name: "React", level: 75 },
  { name: "Next.js", level: 80 },
  { name: "SpringBoot", level: 80 },
  { name: "SpringCloud", level: 70 },
  { name: "Node.js", level: 70 },
  { name: "Web Scraper", level: 70 },
  { name: "Docker", level: 65 },
  { name: "Unity", level: 65 },
]
