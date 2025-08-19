import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ComplexityGaugeProps {
  score: number;
  maxScore?: number;
}

export default function ComplexityGauge({
  score,
  maxScore = 100,
}: ComplexityGaugeProps) {
  const percentage = Math.min(score, maxScore);
  const remaining = maxScore - percentage;

  const data = [
    { name: "score", value: percentage },
    { name: "remaining", value: remaining },
  ];

  const getComplexityLabel = (score: number): string => {
    if (score <= 30) return "Low complexity";
    if (score <= 60) return "Moderate complexity";
    if (score <= 80) return "High complexity";
    return "Very high complexity";
  };

  const getScoreColor = (score: number): string => {
    if (score <= 30) return "#10B981";
    if (score <= 60) return "#3B82F6";
    if (score <= 80) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Complexity Score
      </h3>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={getScoreColor(score)} />
              <Cell fill="#F3F4F6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-800">{score}</div>
          <div className="text-sm text-gray-500">/{maxScore}</div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">{getComplexityLabel(score)}</p>
      </div>
    </div>
  );
}
