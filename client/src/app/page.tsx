"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "./constants";
import { analyzeCode, ApiError, type CodeAnalysisRequest } from "./lib/api";
import { useToast } from "./hooks/Toast";
import Header from "./components/ui/Header";
import CodeAnalysisForm from "./components/CodeAnalysisForm";
import LoadingScreen from "./components/LoadingScreen";
import ToastContainer from "./components/ui/Toast";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toasts, removeToast, success, error } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFormSubmit = async (request: CodeAnalysisRequest) => {
    setIsLoading(true);

    try {
      const result = await analyzeCode(request);

      localStorage.setItem("analysisResult", JSON.stringify(result));
      localStorage.setItem("analysisRequest", JSON.stringify(request));

      success("Code analysis completed successfully!");

      setTimeout(() => {
        router.push(ROUTES.RESULTS);
      }, 2500);
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
      <Header isVisible={isVisible} />
      <CodeAnalysisForm
        isVisible={isVisible}
        onSubmit={handleFormSubmit}
        onError={handleFormError}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
