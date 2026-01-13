export interface FredObservation {
  date: string;
  value: string;
}

export interface FredSeriesResponse {
  observations: FredObservation[];
}

export interface SeriesData {
  date: string;
  value: number;
}

export interface MetricData {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  data: SeriesData[];
}
