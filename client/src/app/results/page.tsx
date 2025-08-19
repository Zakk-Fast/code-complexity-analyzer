"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type AnalysisResult, type CodeAnalysisRequest } from "../lib/api";
import { ROUTES } from "../constants";
import ResultsHeader from "../components/results/ResultsHeader";
import ResultsLayout from "../components/ResultsLayout";
import ToastContainer from "../components/ui/Toast";
import { useToast } from "../hooks/Toast";

export default function ResultsPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [originalRequest, setOriginalRequest] =
    useState<CodeAnalysisRequest | null>(null);
  const [error, setError] = useState<string>("");
  const { toasts, removeToast, success } = useToast();
  const router = useRouter();

  useEffect(() => {
    try {
      const resultData = localStorage.getItem("analysisResult");
      const requestData = localStorage.getItem("analysisRequest");

      if (!resultData || !requestData) {
        setError("No analysis data found. Please run a new analysis.");
        return;
      }

      const result: AnalysisResult = JSON.parse(resultData);
      const request: CodeAnalysisRequest = JSON.parse(requestData);

      if (!result.is_code) {
        setError(
          "The submitted text was not recognized as code. Please try again with valid code."
        );
        return;
      }

      setAnalysisResult(result);
      setOriginalRequest(request);

      success("Code analysis completed successfully!");
    } catch (err) {
      console.error("Error loading analysis data:", err);
      setError("Failed to load analysis data. Please run a new analysis.");
    }
  }, [success]);

  // Handle error states
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ResultsHeader />
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push(ROUTES.HOME)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!analysisResult || !originalRequest) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ResultsHeader />
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResultsHeader fileName={originalRequest.file_name} />
      <ResultsLayout
        analysisResult={analysisResult}
        originalRequest={originalRequest}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
