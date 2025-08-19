import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants";
import {
  getHistory,
  removeFromHistory,
  clearHistory,
  formatTimestamp,
  isHistoryEnabled,
  setHistoryEnabled,
  type HistoryItem,
} from "../lib/history";

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistorySidebar({
  isOpen,
  onClose,
}: HistorySidebarProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyEnabled, setHistoryEnabledState] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setHistory(getHistory());
      setHistoryEnabledState(isHistoryEnabled());
    }
  }, [isOpen]);

  const handleItemClick = (item: HistoryItem) => {
    localStorage.setItem("analysisResult", JSON.stringify(item.result));
    localStorage.setItem("analysisRequest", JSON.stringify(item.request));
    onClose();
    router.push(ROUTES.RESULTS);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromHistory(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleToggleHistory = (enabled: boolean) => {
    setHistoryEnabled(enabled);
    setHistoryEnabledState(enabled);
  };

  const getComplexityColor = (score: number) => {
    if (score <= 30) return "bg-green-100 text-green-800";
    if (score <= 60) return "bg-blue-100 text-blue-800";
    if (score <= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Analysis History
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Save history</span>
              <button
                onClick={() => handleToggleHistory(!historyEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  historyEnabled ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    historyEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {!historyEnabled ? (
              <div className="p-4 text-center text-gray-500">
                <p className="text-sm">History is disabled</p>
                <p className="text-xs mt-1">
                  Enable above to start saving analyses
                </p>
              </div>
            ) : history.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">No history yet</p>
                <p className="text-xs mt-1">
                  Analyze some code to get started!
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {item.request.file_name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(
                              item.result.complexity_score
                            )}`}
                          >
                            {item.result.complexity_score}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span className="capitalize">
                            {item.result.language}
                          </span>
                          <span>•</span>
                          <span>{formatTimestamp(item.timestamp)}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteItem(item.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded cursor-pointer transition-opacity"
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {history.length > 0 && historyEnabled && (
            <div className="p-4 border-t">
              <button
                onClick={handleClearAll}
                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                Clear All History
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
