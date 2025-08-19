import { useRouter } from "next/navigation";
import { ROUTES } from "../../constants";

interface ResultsHeaderProps {
  fileName?: string;
}

export default function ResultsHeader({ fileName }: ResultsHeaderProps) {
  const router = useRouter();

  const handleNewAnalysis = () => {
    localStorage.removeItem("analysisResult");
    localStorage.removeItem("analysisRequest");

    router.push(ROUTES.HOME);
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                CodeAnalyzer AI
              </h1>
              {fileName && (
                <p className="text-sm text-gray-500">Analyzing: {fileName}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleNewAnalysis}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">New Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
}
