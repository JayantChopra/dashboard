# Dashboard

A modern, full-stack dashboard built with Next.js and shadcn/ui components, inspired by Vercel's design aesthetic.

## Features

- **Modern UI**: Clean and minimal design inspired by Vercel
- **Dark Mode**: Built-in dark mode support with theme toggle
- **Responsive Layout**: Fully responsive sidebar navigation and layout
- **Analytics**: Interactive charts and data visualizations using Recharts
- **Projects Management**: Grid view of projects with status indicators
- **TypeScript**: Fully typed with TypeScript for better developer experience
- **shadcn/ui**: Beautiful UI components built with Radix UI and Tailwind CSS

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
dashboard/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Overview/Dashboard page
│   ├── projects/          # Projects page
│   ├── analytics/         # Analytics page with charts
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── sidebar.tsx       # Navigation sidebar
│   ├── header.tsx        # Top header with search and theme toggle
│   ├── dashboard-layout.tsx # Main layout wrapper
│   └── theme-provider.tsx   # Theme provider for dark mode
└── lib/                  # Utility functions
    └── utils.ts          # CN utility for class names
```

## Pages

### Overview (/)
- Key metrics and statistics cards
- Recent deployments list
- Quick action buttons

### Projects (/projects)
- Grid view of all projects
- Project status indicators
- Search functionality
- Project details (framework, branch, deployment time)

### Analytics (/analytics)
- Visitor trends chart
- Page views statistics
- Revenue tracking
- Interactive data visualizations

### Settings (/settings)
- Profile management
- Team settings
- Account preferences

## Technologies Used

- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Re-usable component library
- **Recharts**: Composable charting library
- **Lucide Icons**: Beautiful icon set
- **next-themes**: Dark mode support

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## License

MIT

## Test Update Sat Jan  3 18:16:02 EST 2026
