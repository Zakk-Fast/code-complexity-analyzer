export const LOADING_MESSAGES = [
  "Analyzing your code...",
  "Checking under the couch cushions for bugs...",
  "Looking up how to center a div...",
  "Googling: 'what is JavaScript'...",
  "Teaching AI about semicolons...",
  "Calculating complexity score...",
  "Finding optimization opportunities...",
  "Reviewing your variable names...",
  "Scanning for code smells...",
  "Consulting the rubber duck...",
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const ROUTES = {
  HOME: "/",
  RESULTS: "/results",
} as const;
