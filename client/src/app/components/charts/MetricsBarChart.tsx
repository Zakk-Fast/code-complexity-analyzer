import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface MetricsBarChartProps {
  functionCount: number;
  lineCount: number;
  conditionalCount: number;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

export default function MetricsBarChart({ 
  functionCount, 
  lineCount, 
  conditionalCount 
}: MetricsBarChartProps) {
  const data: ChartData[] = [
    { name: 'Functions', value: functionCount, color: '#3B82F6' },
    { name: 'Lines', value: lineCount, color: '#3B82F6' },
    { name: 'Conditionals', value: conditionalCount, color: '#3B82F6' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Code Metrics</h3>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}