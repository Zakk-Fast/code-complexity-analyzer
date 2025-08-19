import { type Suggestion } from "../../lib/api";

interface SuggestionCardProps {
  suggestion: Suggestion;
}

const severityConfig = {
  critical: {
    icon: "🔴",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
  },
  warning: {
    icon: "🟡",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
  },
  info: {
    icon: "🔵",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
  },
  good: {
    icon: "✅",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
  },
};

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const config = severityConfig[suggestion.severity];

  return (
    <div
      className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-lg flex-shrink-0 mt-0.5">{config.icon}</span>
        <p className={`text-sm ${config.textColor} leading-relaxed`}>
          {suggestion.message}
        </p>
      </div>
    </div>
  );
}
