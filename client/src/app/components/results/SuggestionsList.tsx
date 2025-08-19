import { type Suggestion } from "../../lib/api";
import SuggestionCard from "./SuggestionCard";

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const severityOrder = {
  critical: 1,
  warning: 2,
  info: 3,
  good: 4,
};

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  const sortedSuggestions = [...suggestions].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        AI Suggestions
      </h3>

      <div className="space-y-4">
        {sortedSuggestions.map((suggestion, index) => (
          <SuggestionCard key={index} suggestion={suggestion} />
        ))}
      </div>

      {suggestions.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No suggestions available
        </p>
      )}
    </div>
  );
}
