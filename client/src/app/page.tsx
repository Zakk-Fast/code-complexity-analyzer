"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "./constants";
import { analyzeCode, ApiError, type CodeAnalysisRequest } from "./lib/api";
import Header from "./components/ui/Header";
import CodeAnalysisForm from "./components/CodeAnalysisForm";
import LoadingScreen from "./components/LoadingScreen";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

      router.push(ROUTES.RESULTS);
    } catch (err) {
      setIsLoading(false);
      console.error("Analysis error:", err);

      alert(
        err instanceof ApiError
          ? err.message
          : "Failed to analyze code. Please try again."
      );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isVisible={isVisible} />
      <CodeAnalysisForm isVisible={isVisible} onSubmit={handleFormSubmit} />
    </div>
  );
}
