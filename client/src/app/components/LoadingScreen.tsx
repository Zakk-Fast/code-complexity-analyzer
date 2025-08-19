import { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "../constants";

export default function LoadingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(Math.floor(Math.random() * LOADING_MESSAGES.length));
    }, 2000);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="mb-8">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        </div>

        {/* Loading Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {LOADING_MESSAGES[currentMessage]}
          </h2>
          <p className="text-gray-600">This may take a moment...</p>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform -skew-x-12"
                  style={{
                    animation: "slide 1.5s ease-in-out infinite",
                    backgroundSize: "30px 100%",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes slide {
              0% {
                transform: translateX(-100%) skewX(-12deg);
              }
              100% {
                transform: translateX(300%) skewX(-12deg);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
