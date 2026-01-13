import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SeriesData } from '../types/fred';

interface TimeSeriesChartProps {
  data: SeriesData[];
  title: string;
  dataKey?: string;
  color?: string;
  loading?: boolean;
  yAxisFormat?: 'number' | 'percent' | 'currency';
}

export default function TimeSeriesChart({
  data,
  title,
  dataKey = 'value',
  color = '#3b82f6',
  loading = false,
  yAxisFormat = 'number',
}: TimeSeriesChartProps) {
  const formatYAxis = (value: number) => {
    switch (yAxisFormat) {
      case 'percent':
        return `${value}%`;
      case 'currency':
        return `$${value}`;
      default:
        return value.toLocaleString();
    }
  };

  const formatTooltip = (value: number) => {
    switch (yAxisFormat) {
      case 'percent':
        return `${value.toFixed(1)}%`;
      case 'currency':
        return `$${value.toFixed(2)}`;
      default:
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-100 rounded"></div>
      </div>
    );
  }

  // Format data for last 12 months by default
  const chartData = data.slice(-36).map(d => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit'
    }),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <Tooltip
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            name={title}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
