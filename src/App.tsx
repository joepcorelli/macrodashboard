import { useQuery } from '@tanstack/react-query';
import MetricCard from './components/MetricCard';
import TimeSeriesChart from './components/TimeSeriesChart';
import { fetchFredSeries, calculateMetricData, FRED_SERIES } from './services/fredApi';

function App() {
  // Fetch unemployment rate
  const { data: unemploymentData, isLoading: unemploymentLoading, error: unemploymentError } = useQuery({
    queryKey: ['unemployment'],
    queryFn: () => fetchFredSeries({ seriesId: FRED_SERIES.UNEMPLOYMENT_RATE }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch labor force participation
  const { data: laborForceData, isLoading: laborForceLoading } = useQuery({
    queryKey: ['laborForce'],
    queryFn: () => fetchFredSeries({ seriesId: FRED_SERIES.LABOR_FORCE_PARTICIPATION }),
    staleTime: 1000 * 60 * 60,
  });

  // Fetch job openings
  const { data: jobOpeningsData, isLoading: jobOpeningsLoading } = useQuery({
    queryKey: ['jobOpenings'],
    queryFn: () => fetchFredSeries({ seriesId: FRED_SERIES.JOB_OPENINGS }),
    staleTime: 1000 * 60 * 60,
  });

  // Fetch quits
  const { data: quitsData, isLoading: quitsLoading } = useQuery({
    queryKey: ['quits'],
    queryFn: () => fetchFredSeries({ seriesId: FRED_SERIES.QUITS }),
    staleTime: 1000 * 60 * 60,
  });

  // Fetch average hourly earnings
  const { data: earningsData, isLoading: earningsLoading } = useQuery({
    queryKey: ['earnings'],
    queryFn: () => fetchFredSeries({ seriesId: FRED_SERIES.AVERAGE_HOURLY_EARNINGS }),
    staleTime: 1000 * 60 * 60,
  });

  // Fetch nonfarm payrolls
  const { data: payrollsData, isLoading: payrollsLoading } = useQuery({
    queryKey: ['payrolls'],
    queryFn: () => fetchFredSeries({ seriesId: FRED_SERIES.NONFARM_PAYROLLS }),
    staleTime: 1000 * 60 * 60,
  });

  // Calculate metrics
  const unemploymentMetric = unemploymentData ? calculateMetricData(unemploymentData) : null;
  const laborForceMetric = laborForceData ? calculateMetricData(laborForceData) : null;
  const jobOpeningsMetric = jobOpeningsData ? calculateMetricData(jobOpeningsData) : null;
  const quitsMetric = quitsData ? calculateMetricData(quitsData) : null;
  const earningsMetric = earningsData ? calculateMetricData(earningsData) : null;
  const payrollsMetric = payrollsData ? calculateMetricData(payrollsData) : null;

  // Calculate job openings per unemployed person
  const openingsPerUnemployed =
    jobOpeningsMetric && unemploymentData && payrollsData
      ? (jobOpeningsMetric.current * 1000) / (unemploymentMetric!.current * payrollsMetric!.current / 100)
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            US Jobs Market Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Data source: Federal Reserve Economic Data (FRED)
          </p>
        </div>
      </header>

      {/* API Key Error Banner */}
      {unemploymentError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-900 font-semibold mb-2">FRED API Key Required</h3>
            <p className="text-red-800 text-sm mb-3">
              To use this dashboard, you need a free FRED API key.
            </p>
            <ol className="text-red-800 text-sm space-y-1 mb-3 list-decimal list-inside">
              <li>Get a free API key at: <a href="https://fred.stlouisfed.org/docs/api/api_key.html" target="_blank" rel="noopener noreferrer" className="underline font-semibold">fred.stlouisfed.org/docs/api/api_key.html</a></li>
              <li>Create a <code className="bg-red-100 px-1 rounded">.env</code> file in the project root</li>
              <li>Add: <code className="bg-red-100 px-1 rounded">VITE_FRED_API_KEY=your_api_key_here</code></li>
              <li>Restart the dev server</li>
            </ol>
            <p className="text-red-700 text-xs">Error: {(unemploymentError as Error).message}</p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Unemployment Rate"
              value={unemploymentMetric?.current || 0}
              change={unemploymentMetric?.change || 0}
              changePercent={unemploymentMetric?.changePercent || 0}
              format="percent"
              loading={unemploymentLoading}
            />
            <MetricCard
              title="Labor Force Participation"
              value={laborForceMetric?.current || 0}
              change={laborForceMetric?.change || 0}
              changePercent={laborForceMetric?.changePercent || 0}
              format="percent"
              loading={laborForceLoading}
            />
            <MetricCard
              title="Job Openings (thousands)"
              value={jobOpeningsMetric?.current || 0}
              change={jobOpeningsMetric?.change || 0}
              changePercent={jobOpeningsMetric?.changePercent || 0}
              precision={0}
              loading={jobOpeningsLoading}
            />
            <MetricCard
              title="Quit Rate (thousands)"
              value={quitsMetric?.current || 0}
              change={quitsMetric?.change || 0}
              changePercent={quitsMetric?.changePercent || 0}
              precision={0}
              loading={quitsLoading}
            />
            <MetricCard
              title="Average Hourly Earnings"
              value={earningsMetric?.current || 0}
              change={earningsMetric?.change || 0}
              changePercent={earningsMetric?.changePercent || 0}
              format="currency"
              loading={earningsLoading}
            />
            <MetricCard
              title="Nonfarm Payrolls (thousands)"
              value={payrollsMetric?.current || 0}
              change={payrollsMetric?.change || 0}
              changePercent={payrollsMetric?.changePercent || 0}
              precision={0}
              loading={payrollsLoading}
            />
          </div>
        </section>

        {/* Job Seeker Perspective */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Job Seeker View
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TimeSeriesChart
              data={unemploymentData || []}
              title="Unemployment Rate (%)"
              color="#ef4444"
              loading={unemploymentLoading}
              yAxisFormat="percent"
            />
            <TimeSeriesChart
              data={earningsData || []}
              title="Average Hourly Earnings ($)"
              color="#10b981"
              loading={earningsLoading}
              yAxisFormat="currency"
            />
          </div>
          {openingsPerUnemployed && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Job Market Health:</strong> There are approximately{' '}
                <span className="font-bold">{openingsPerUnemployed.toFixed(2)}</span> job
                openings per unemployed person.
                {openingsPerUnemployed > 1
                  ? ' This suggests a tight labor market favorable to job seekers.'
                  : ' This suggests increased competition for available positions.'}
              </p>
            </div>
          )}
        </section>

        {/* Employer Perspective */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Employer View
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TimeSeriesChart
              data={jobOpeningsData || []}
              title="Job Openings (thousands)"
              color="#3b82f6"
              loading={jobOpeningsLoading}
            />
            <TimeSeriesChart
              data={quitsData || []}
              title="Quits (thousands)"
              color="#f59e0b"
              loading={quitsLoading}
            />
          </div>
        </section>

        {/* Labor Market Trends */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Labor Market Trends
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TimeSeriesChart
              data={laborForceData || []}
              title="Labor Force Participation Rate (%)"
              color="#8b5cf6"
              loading={laborForceLoading}
              yAxisFormat="percent"
            />
            <TimeSeriesChart
              data={payrollsData || []}
              title="Total Nonfarm Payrolls (thousands)"
              color="#06b6d4"
              loading={payrollsLoading}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-600 text-center">
            Last updated: {new Date().toLocaleDateString()} | Data updates monthly from FRED API
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
