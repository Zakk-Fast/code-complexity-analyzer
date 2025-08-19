import { useState } from "react";
import { type CodeAnalysisRequest } from "../lib/api";
import Tooltip from "./ui/Tooltip";

interface CodeAnalysisFormProps {
  isVisible?: boolean;
  onSubmit: (request: CodeAnalysisRequest) => Promise<void>;
  onError: (message: string) => void;
}

export default function CodeAnalysisForm({
  isVisible = true,
  onSubmit,
  onError,
}: CodeAnalysisFormProps) {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      onError("Please enter some code to analyze");
      return;
    }
    if (!filename.trim()) {
      onError("Please enter a filename");
      return;
    }

    const request: CodeAnalysisRequest = {
      code_text: code,
      language: "unknown",
      file_name: filename,
    };

    if (typeof onSubmit === "function") {
      try {
        await onSubmit(request);
      } catch (error) {
        onError("Failed to analyze code. Please try again.");
        console.error("Form submission error:", error);
      }
    } else {
      console.error("onSubmit prop is not a function:", onSubmit);
      onError("Form configuration error. Please refresh and try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div
        className={`bg-white rounded-lg shadow-lg p-8 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Analyze Your Code
          </h2>
          <Tooltip content="AI-powered tool that analyzes code complexity, identifies issues, and provides improvement suggestions" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filename
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="filename.js"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            Analyze Code
          </button>
        </form>
      </div>
    </div>
  );
}
