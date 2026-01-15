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

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get a free FRED API key:
   - Visit [https://fred.stlouisfed.org/docs/api/api_key.html](https://fred.stlouisfed.org/docs/api/api_key.html)
   - Request an API key (instant approval)

3. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

4. Add your API key to `.env`:
   ```
   VITE_FRED_API_KEY=your_actual_api_key_here
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

**Option 1: Via GitHub (Recommended)**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variable:
   - Go to Project Settings → Environment Variables
   - Add `VITE_FRED_API_KEY` with your API key value
4. Deploy! Your dashboard will auto-deploy on every push

**Option 2: Via CLI**
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add your API key as an environment variable:
   ```bash
   vercel env add VITE_FRED_API_KEY
   ```
   Enter your FRED API key when prompted

4. Redeploy:
   ```bash
   vercel --prod
   ```

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
