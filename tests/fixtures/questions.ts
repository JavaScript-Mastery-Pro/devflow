export interface TestQuestion {
  title: string;
  content: string;
  tags: string[];
}

export const SAMPLE_QUESTIONS: TestQuestion[] = [
  {
    title: "How to use React hooks effectively?",
    content:
      "I'm learning React and want to understand how to use hooks properly. What are the best practices?. What are the gotchas? What are the tradeoffs? Explain with examples.",
    tags: ["react", "javascript", "hooks"],
  },
  {
    title: "React state management patterns",
    content:
      "What are the different state management patterns available in modern React applications? I am particularly interested in understanding the trade-offs and knowing exactly when I should use the native Context API versus a library like Redux.",
    tags: ["state-management", "context", "redux"],
  },
  {
    title: "Optimizing React performance with useMemo",
    content: "How can I optimize my React app performance using useMemo and useCallback? What are the gotchas?",
    tags: ["react", "performance", "usememo", "optimization"],
  },

  {
    title: "Next.js routing best practices",
    content: "What are the best practices for routing in Next.js applications? How do I handle dynamic routes?",
    tags: ["nextjs", "routing", "typescript"],
  },
  {
    title: "Next.js App Router vs Pages Router",
    content: "What are the differences between App Router and Pages Router in Next.js? When should I use each?",
    tags: ["nextjs", "app-router", "pages-router", "migration"],
  },
  {
    title: "Server-side rendering optimization in Next.js",
    content: "How can I optimize SSR performance in Next.js? What are the trade-offs between SSR, SSG, and ISR?",
    tags: ["nextjs", "ssr", "ssg", "performance"],
  },

  {
    title: "Understanding JavaScript closures",
    content: "Can someone explain JavaScript closures with practical examples? When are they useful?",
    tags: ["javascript", "closures", "fundamentals"],
  },
  {
    title: "Async/await vs Promises",
    content: "What's the difference between using async/await and .then()/.catch()? Which approach is better?",
    tags: ["javascript", "async", "promises", "es6"],
  },

  {
    title: "Best practices for E2E testing",
    content: "What are the best practices for implementing end-to-end testing in web applications?",
    tags: ["testing", "e2e", "automation"],
  },
  {
    title: "Unit testing React components",
    content: "How do I write effective unit tests for React components? What should I test and what should I avoid?",
    tags: ["testing", "react", "jest", "unit-tests"],
  },
  {
    title: "Testing strategies for microservices",
    content:
      "What are the best testing strategies for microservices architecture? How do I handle integration testing?",
    tags: ["testing", "microservices", "integration", "architecture"],
  },

  {
    title: "Getting started with web development",
    content:
      "I'm new to web development. What technologies should I learn first? What's the recommended learning path?",
    tags: ["beginners", "web-development", "learning-path"],
  },
  {
    title: "Code review best practices",
    content: "What are the best practices for conducting code reviews? How can I give constructive feedback?",
    tags: ["code-review", "best-practices", "teamwork"],
  },
];
