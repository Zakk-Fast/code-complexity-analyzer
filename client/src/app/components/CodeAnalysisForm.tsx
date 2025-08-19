import { useState } from "react";
import { useRouter } from "next/navigation";
import { LANGUAGES, ROUTES } from "../constants";
import { analyzeCode, ApiError, type CodeAnalysisRequest } from "../lib/api";
import Tooltip from "./ui/Tooltip";

interface CodeAnalysisFormProps {
  isVisible?: boolean;
}

export default function CodeAnalysisForm({
  isVisible = true,
}: CodeAnalysisFormProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [filename, setFilename] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!code.trim()) {
      setError("Please enter some code to analyze");
      return;
    }
    if (!language) {
      setError("Please select a programming language");
      return;
    }
    if (!filename.trim()) {
      setError("Please enter a filename");
      return;
    }

    const request: CodeAnalysisRequest = {
      code_text: code,
      language: language,
      file_name: filename,
    };

    try {
      const result = await analyzeCode(request);

      // Store results in localStorage for the results page
      localStorage.setItem("analysisResult", JSON.stringify(result));
      localStorage.setItem("analysisRequest", JSON.stringify(request));

      // Navigate to results page
      router.push(ROUTES.RESULTS);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`Analysis failed: ${err.message}`);
      } else {
        setError("Failed to analyze code. Please try again.");
      }
      console.error("Analysis error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div
        className={`bg-white rounded-lg shadow-lg p-8 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Form Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Analyze Your Code
          </h2>

          <Tooltip content="AI-powered tool that analyzes code complexity, identifies issues, and provides improvement suggestions" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-gray-900"
              required
            />
          </div>

          {/* Language and Filename Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Programming Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 text-lg md:text-base appearance-none"
                required
              >
                <option value="">Select language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filename */}
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
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Analyze Code
          </button>
        </form>
      </div>
    </div>
  );
}
