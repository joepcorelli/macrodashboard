import { FredSeriesResponse, SeriesData, MetricData } from '../types/fred';

const FRED_API_BASE = 'https://api.stlouisfed.org/fred';

// FRED API is free and doesn't require authentication for basic use
// For production, you might want to get a free API key from https://fred.stlouisfed.org/docs/api/api_key.html

interface FetchSeriesParams {
  seriesId: string;
  startDate?: string;
  endDate?: string;
}

export async function fetchFredSeries({
  seriesId,
  startDate,
  endDate,
}: FetchSeriesParams): Promise<SeriesData[]> {
  const params = new URLSearchParams({
    series_id: seriesId,
    file_type: 'json',
  });

  if (startDate) params.append('observation_start', startDate);
  if (endDate) params.append('observation_end', endDate);

  const url = `${FRED_API_BASE}/series/observations?${params}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`FRED API error: ${response.statusText}`);
  }

  const data: FredSeriesResponse = await response.json();

  return data.observations
    .filter((obs) => obs.value !== '.')
    .map((obs) => ({
      date: obs.date,
      value: parseFloat(obs.value),
    }));
}

export function calculateMetricData(data: SeriesData[]): MetricData {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const current = sortedData[sortedData.length - 1]?.value || 0;
  const previous = sortedData[sortedData.length - 2]?.value || 0;
  const change = current - previous;
  const changePercent = previous !== 0 ? (change / previous) * 100 : 0;

  return {
    current,
    previous,
    change,
    changePercent,
    data: sortedData,
  };
}

// FRED Series IDs for key economic indicators
export const FRED_SERIES = {
  UNEMPLOYMENT_RATE: 'UNRATE',
  LABOR_FORCE_PARTICIPATION: 'CIVPART',
  JOB_OPENINGS: 'JTSJOL', // JOLTS Total Job Openings
  HIRES: 'JTSHIL', // JOLTS Total Hires
  QUITS: 'JTSQUL', // JOLTS Total Quits
  LAYOFFS: 'JTSLDL', // JOLTS Total Layoffs
  AVERAGE_HOURLY_EARNINGS: 'CES0500000003', // Average Hourly Earnings of All Employees
  NONFARM_PAYROLLS: 'PAYEMS', // All Employees, Total Nonfarm
  UNEMPLOYED_PERSONS: 'UNEMPLOY',
} as const;
