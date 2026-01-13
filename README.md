# US Jobs Market Dashboard

A real-time dashboard for monitoring US macroeconomic jobs data, providing insights for both employers and job seekers.

## Features

- **Key Metrics Overview**: Unemployment rate, labor force participation, job openings, quit rates, earnings, and payrolls
- **Job Seeker View**: Trends in unemployment and wage growth
- **Employer View**: Job openings and quit rates indicating labor market tightness
- **Labor Market Trends**: Long-term trends in workforce participation and total employment
- **Real-time Data**: Automatically fetches latest data from FRED API

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Fetching**: TanStack Query (React Query)
- **Data Source**: Federal Reserve Economic Data (FRED) API

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Open browser to http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

4. For subsequent deployments:
   ```bash
   vercel --prod
   ```

Alternatively, you can:
- Push to GitHub and connect the repository to Vercel through their web interface
- The dashboard will auto-deploy on every push to main

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

## Data Sources

All data is fetched from the [FRED API](https://fred.stlouisfed.org/docs/api/):
- **UNRATE**: Unemployment Rate
- **CIVPART**: Labor Force Participation Rate
- **JTSJOL**: Job Openings (JOLTS)
- **JTSQUL**: Quits (JOLTS)
- **CES0500000003**: Average Hourly Earnings
- **PAYEMS**: Total Nonfarm Payrolls

Data updates monthly following BLS release schedules.

## Optional: FRED API Key

The FRED API allows anonymous access with generous rate limits (2M calls/day). For production use with high traffic, you can:

1. Get a free API key from [FRED API Documentation](https://fred.stlouisfed.org/docs/api/api_key.html)
2. Add it to your `fetchFredSeries` function in `src/services/fredApi.ts`

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── MetricCard.tsx
│   │   └── TimeSeriesChart.tsx
│   ├── services/          # API services
│   │   └── fredApi.ts
│   ├── types/             # TypeScript types
│   │   └── fred.ts
│   ├── App.tsx            # Main dashboard
│   └── main.tsx           # App entry point
├── public/                # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vercel.json            # Vercel deployment config
```

## License

MIT
