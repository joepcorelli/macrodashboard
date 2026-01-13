interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  changePercent: number;
  format?: 'number' | 'percent' | 'currency';
  precision?: number;
  loading?: boolean;
}

export default function MetricCard({
  title,
  value,
  change,
  changePercent,
  format = 'number',
  precision = 1,
  loading = false,
}: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percent':
        return `${val.toFixed(precision)}%`;
      case 'currency':
        return `$${val.toFixed(2)}`;
      default:
        return val.toLocaleString(undefined, {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        });
    }
  };

  const isPositive = change > 0;
  const isNegative = change < 0;

  // For unemployment, negative change is good
  // For job openings, positive change is good
  // We'll keep it neutral for now and just show the direction
  const changeColor = isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600';

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {formatValue(value)}
      </div>
      <div className={`text-sm ${changeColor} flex items-center gap-1`}>
        <span>{isPositive ? '↑' : isNegative ? '↓' : '→'}</span>
        <span>
          {Math.abs(change).toFixed(precision)} ({Math.abs(changePercent).toFixed(2)}%)
        </span>
        <span className="text-gray-500">vs last period</span>
      </div>
    </div>
  );
}
