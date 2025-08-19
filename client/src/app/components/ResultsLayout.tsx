import { type AnalysisResult, type CodeAnalysisRequest } from "../lib/api";
import { ComplexityGauge, MetricsBarChart } from "./charts";
import SuggestionsList from "./results/SuggestionsList";
import CodeSummary from "./results/CodeSummary";

interface ResultsLayoutProps {
  analysisResult: AnalysisResult;
  originalRequest: CodeAnalysisRequest;
}

export default function ResultsLayout({
  analysisResult,
  originalRequest,
}: ResultsLayoutProps) {
  const {
    language,
    complexity_score,
    function_count,
    line_count,
    conditional_statements_count,
    suggestions_list,
    summary,
    function_breakdown,
  } = analysisResult;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
        <div className="flex items-center space-x-4 mt-1 text-gray-600">
          <span>
            File:{" "}
            <span className="font-medium">{originalRequest.file_name}</span>
          </span>
          <span className="text-gray-400">•</span>
          <span>
            Language: <span className="font-medium capitalize">{language}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ComplexityGauge score={complexity_score} />
        <MetricsBarChart
          functionCount={function_count}
          lineCount={line_count}
          conditionalCount={conditional_statements_count}
        />
      </div>

      <div className="mb-8">
        <SuggestionsList suggestions={suggestions_list} />
      </div>

      <div>
        <CodeSummary summary={summary} functionBreakdown={function_breakdown} />
      </div>
    </div>
  );
}
