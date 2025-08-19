interface CodeSummaryProps {
  summary: string[];
  functionBreakdown: string[];
}

export default function CodeSummary({
  summary,
  functionBreakdown,
}: CodeSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Code Summary</h3>

      <div className="space-y-4">
        <div>
          {summary.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-700 leading-relaxed mb-3 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {functionBreakdown.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-800 mb-3">
              Function Analysis
            </h4>
            <div className="space-y-2">
              {functionBreakdown.map((func, index) => (
                <div key={index} className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-700">{func}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {summary.length === 0 && functionBreakdown.length === 0 && (
        <p className="text-gray-500 text-center py-8">No summary available</p>
      )}
    </div>
  );
}
