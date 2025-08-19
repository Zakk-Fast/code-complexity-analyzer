import { useState } from "react";

interface TooltipProps {
  content: string;
  className?: string;
}

export default function Tooltip({ content, className = "" }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium transition-colors"
      >
        ?
      </button>

      {showTooltip && (
        <div className="absolute right-0 top-8 w-64 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg z-10">
          <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
          {content}
        </div>
      )}
    </div>
  );
}
