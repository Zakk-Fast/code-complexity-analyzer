"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "./constants";
import { analyzeCode, ApiError, type CodeAnalysisRequest } from "./lib/api";
import { addToHistory, isHistoryEnabled } from "./lib/history";
import { useToast } from "./hooks/Toast";
import Header from "./components/ui/Header";
import CodeAnalysisForm from "./components/CodeAnalysisForm";
import LoadingScreen from "./components/LoadingScreen";
import ToastContainer from "./components/ui/Toast";
import HistorySidebar from "./components/HistorySidebar";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { toasts, removeToast, success, error } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFormSubmit = async (request: CodeAnalysisRequest) => {
    setIsLoading(true);

    try {
      const result = await analyzeCode(request);

      // Only save successful analyses to history
      if (result.success) {
        localStorage.setItem("analysisResult", JSON.stringify(result));
        localStorage.setItem("analysisRequest", JSON.stringify(request));

        if (isHistoryEnabled()) {
          addToHistory(request, result);
        }
        
        // Show success message
        success("Code analysis completed successfully!");
        
        router.push(ROUTES.RESULTS);
      } else {
        // Handle analysis that returned with errors
        setIsLoading(false);
        error(`Analysis completed but with errors: ${result.error || 'Unknown error'}`);
        return;
      }

    } catch (err) {
      setIsLoading(false);
      console.error("Analysis error:", err);

      if (err instanceof ApiError) {
        error(`Analysis failed: ${err.message}`);
      } else {
        error("Failed to analyze code. Please try again.");
      }
    }
  };

  const handleFormError = (message: string) => {
    error(message);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isVisible={isVisible}
        onHistoryClick={() => setIsHistoryOpen(true)}
      />
      <CodeAnalysisForm
        isVisible={isVisible}
        onSubmit={handleFormSubmit}
        onError={handleFormError}
      />
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
