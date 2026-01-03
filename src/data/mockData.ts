export const prompts = [
  {
    id: "1",
    title: "Marketing Email Generator",
    preview: "Create compelling marketing emails that convert. This prompt helps you craft persuasive copy with strong CTAs, personalized greetings, and benefit-focused content that drives engagement.",
    tags: ["marketing", "email", "copywriting"],
    model: "GPT" as const,
    isLiked: true,
  },
  {
    id: "2",
    title: "Code Review Assistant",
    preview: "Get detailed code reviews with suggestions for improvements, best practices, and potential bugs. Perfect for maintaining code quality in your projects.",
    tags: ["code", "development", "review"],
    model: "Claude" as const,
    isLiked: false,
  },
  {
    id: "3",
    title: "Blog Post Outline Creator",
    preview: "Generate structured blog post outlines with engaging headlines, subheadings, and key points. Optimized for SEO and reader engagement.",
    tags: ["content", "blogging", "SEO"],
    model: "GPT" as const,
    isLiked: false,
  },
  {
    id: "4",
    title: "Product Description Writer",
    preview: "Transform features into benefits with compelling product descriptions that sell. Perfect for e-commerce and landing pages.",
    tags: ["ecommerce", "copywriting", "sales"],
    model: "Gemini" as const,
    isLiked: true,
  },
  {
    id: "5",
    title: "SQL Query Optimizer",
    preview: "Analyze and optimize SQL queries for better performance. Get suggestions for indexing, query restructuring, and best practices.",
    tags: ["database", "SQL", "optimization"],
    model: "Claude" as const,
    isLiked: false,
  },
  {
    id: "6",
    title: "Social Media Caption Generator",
    preview: "Create engaging social media captions with relevant hashtags and emojis. Optimized for different platforms and audiences.",
    tags: ["social", "marketing", "engagement"],
    model: "GPT" as const,
    isLiked: false,
  },
  {
    id: "7",
    title: "Technical Documentation Writer",
    preview: "Generate clear, concise technical documentation from code or specifications. Includes API references, guides, and examples.",
    tags: ["documentation", "technical", "API"],
    model: "Claude" as const,
    isLiked: true,
  },
  {
    id: "8",
    title: "Customer Support Response",
    preview: "Craft empathetic and helpful customer support responses. Handles complaints, inquiries, and feedback professionally.",
    tags: ["support", "customer", "service"],
    model: "Gemini" as const,
    isLiked: false,
  },
];

export const assistants = [
  {
    id: "1",
    name: "Copywriter",
    description: "Expert in crafting compelling marketing copy, headlines, and persuasive content that converts readers into customers.",
    icon: "✍️",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "Programmer",
    description: "Full-stack development assistant skilled in debugging, code optimization, and implementing new features across multiple languages.",
    icon: "💻",
    color: "#10B981",
  },
  {
    id: "3",
    name: "Data Analyst",
    description: "Transform raw data into actionable insights with statistical analysis, visualization recommendations, and trend identification.",
    icon: "📊",
    color: "#8B5CF6",
  },
  {
    id: "4",
    name: "UX Designer",
    description: "User experience expert providing interface feedback, accessibility audits, and design improvement suggestions.",
    icon: "🎨",
    color: "#F59E0B",
  },
  {
    id: "5",
    name: "SEO Specialist",
    description: "Optimize content for search engines with keyword research, meta tag suggestions, and content structure improvements.",
    icon: "🔍",
    color: "#EF4444",
  },
  {
    id: "6",
    name: "Legal Advisor",
    description: "Review contracts, terms of service, and legal documents with suggestions for clarity and compliance.",
    icon: "⚖️",
    color: "#6366F1",
  },
];

export const chatHistory = [
  {
    id: "1",
    role: "user" as const,
    content: "Can you help me write a marketing email for our new product launch?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "assistant" as const,
    content: "I'd be happy to help you craft a compelling marketing email! To create the most effective email, I'll need a few details:\n\n1. What is the product you're launching?\n2. Who is your target audience?\n3. What's the main benefit or value proposition?\n4. Do you have any specific call-to-action in mind?\n\nOnce you provide these details, I'll create a personalized email that captures attention and drives conversions.",
    timestamp: "10:30 AM",
  },
  {
    id: "3",
    role: "user" as const,
    content: "It's a project management tool for remote teams. Target audience is startup founders and team leads. Main benefit is seamless async collaboration.",
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    role: "assistant" as const,
    content: "Here's a compelling marketing email for your project management tool:\n\n**Subject: Stop scheduling another meeting. Start shipping faster.**\n\nHi [First Name],\n\nRemember when your team actually had time to do deep work?\n\nNeither do we. That's why we built [Product Name] – the project management tool designed for teams who are tired of being in meetings about meetings.\n\n**What makes us different:**\n• Async-first collaboration that respects time zones\n• Smart notifications that know when not to interrupt\n• Visual project timelines that update themselves\n\n**Early adopters are seeing:**\n→ 40% fewer meetings per week\n→ 3x faster project delivery\n→ Teams that actually enjoy working together\n\n[Try it free for 14 days – no credit card required]\n\nBest,\n[Your Name]\n\nP.S. We're offering founding members 50% off for life. This offer expires [date].\n\n---\n\nWant me to create any variations or adjust the tone?",
    timestamp: "10:32 AM",
  },
];

export const libraryItems = prompts.filter(p => p.isLiked);

export const historyItems = [
  {
    id: "1",
    title: "Marketing Email for Product Launch",
    preview: "Generated compelling email copy for new SaaS product...",
    date: "Today, 10:32 AM",
    model: "GPT" as const,
  },
  {
    id: "2",
    title: "Code Review: Authentication Module",
    preview: "Analyzed security patterns and suggested improvements...",
    date: "Today, 9:15 AM",
    model: "Claude" as const,
  },
  {
    id: "3",
    title: "Blog Post: Remote Work Trends",
    preview: "Created outline and draft for 2000-word article...",
    date: "Yesterday, 4:45 PM",
    model: "GPT" as const,
  },
  {
    id: "4",
    title: "SQL Query Optimization",
    preview: "Optimized complex join query, reduced execution time by 60%...",
    date: "Yesterday, 2:30 PM",
    model: "Claude" as const,
  },
  {
    id: "5",
    title: "Customer Support Templates",
    preview: "Generated 5 response templates for common issues...",
    date: "Dec 28, 2024",
    model: "Gemini" as const,
  },
];
