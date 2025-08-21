import { type AnalysisResult, type CodeAnalysisRequest } from "./api";

export interface HistoryItem {
  id: string;
  timestamp: number;
  request: CodeAnalysisRequest;
  result: AnalysisResult;
  success: boolean;
  error?: string;
}

const HISTORY_KEY = "codeAnalysisHistory";
const HISTORY_ENABLED_KEY = "historyEnabled";

export function isHistoryEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const enabled = localStorage.getItem(HISTORY_ENABLED_KEY);
  return enabled !== "false";
}

export function setHistoryEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_ENABLED_KEY, enabled.toString());
}

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
}

export function addToHistory(
  request: CodeAnalysisRequest,
  result: AnalysisResult
): void {
  if (typeof window === "undefined" || !isHistoryEnabled()) return;

  try {
    const history = getHistory();
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      request,
      result,
      success: result.success,
      error: result.error,
    };

    const updatedHistory = [newItem, ...history].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function removeFromHistory(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const history = getHistory();
    const updatedHistory = history.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to remove from history:", error);
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
}

export function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return new Date(timestamp).toLocaleDateString();
}
