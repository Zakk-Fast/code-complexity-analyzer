"use client";

import { useState, useEffect } from "react";
import Header from "./components/ui/Header";
import CodeAnalysisForm from "./components/CodeAnalysisForm";
import LoadingScreen from "./components/LoadingScreen";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isVisible={isVisible} />
      <CodeAnalysisForm isVisible={isVisible} />
    </div>
  );
}
