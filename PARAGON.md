# PARAGON.md

## Architecture & Infrastructure

### System Architecture Overview
This is a frontend-only dashboard application built with Next.js 15 using the App Router. It features a responsive layout with a sidebar navigation, header, and main content area. The app is structured around four main pages: Overview (home), Projects, Analytics, and Settings. All data is currently mocked with static arrays—no backend integration or data persistence exists yet.

- **Layers**:
  - **Presentation Layer**: React components using TypeScript, Tailwind CSS, and shadcn/ui for UI elements. Recharts for data visualizations.
  - **Layout Layer**: Root layout in `app/layout.tsx` wraps pages with `ThemeProvider` for dark/light mode support.
  - **No Business Logic Layer**: All logic is client-side; no server-side rendering specifics beyond Next.js defaults.
  - **No Data Layer**: Mock data hardcoded in page components.

- **Components**:
  - `components/dashboard-layout.tsx`: Wraps pages with sidebar and header.
  - `components/sidebar.tsx`: Navigation menu with links to pages; includes mock user profile.
  - `components/header.tsx`: Search bar and theme toggle.
  - `components/ui/`: Reusable shadcn/ui components (e.g., Button, Card, Input, Badge).
  - `components/theme-provider.tsx`: Manages theme switching with next-themes.

- **Pages**:
  - `/` (Overview): Stats cards, recent deployments list, quick actions (mock data).
  - `/projects`: Grid of project cards with status, framework, branch info (mock data).
  - `/analytics`: Charts for visitors, page views, revenue using Recharts (mock data).
  - `/settings`: Forms for profile, team, and danger zone (no functionality).

### Database Schema and Data Flow
- No database implemented. All data is static mock arrays defined within page components (e.g., `stats`, `projects`, `visitorsData`).
- Data flow: Client-side rendering only. No API calls, state management (e.g., no Redux/Zustand), or persistence.

### API Routes/Endpoints
- No API routes defined (no `app/api/` directory).
- For production, integrate with a backend (e.g., Next.js API routes, external service) to fetch real data.

### External Integrations
- **Recharts**: For interactive charts in analytics.
- **Lucide React**: Icon library.
- **Next Themes**: Theme management.
- No external APIs, auth services, or third-party dependencies beyond UI libraries.

### Authentication/Authorization Flows
- None implemented. Sidebar shows a mock user (hardcoded "John Doe").
- For real auth, add providers like NextAuth.js or Clerk in `app/layout.tsx`.

### Infrastructure Setup
- **Deployment**: Standard Next.js—build with `npm run build`, serve with `npm start`. Suitable for Vercel, Netlify, or any Node.js host.
- **Hosting**: Optimized for static export or serverless (Vercel recommended, given Vercel-inspired design).
- **CI/CD**: Not configured. Use GitHub Actions or Vercel for automated builds/deployments.
- **Environments**: Local dev only. Add `.env` for API keys/secrets when integrating backend.

### Key Service Interactions
- None—purely frontend. Future integrations could include:
  - Project management API (e.g., fetch projects from GitHub/CMS).
  - Analytics API (e.g., Google Analytics, Plausible).
  - Auth service.

## Development Workflow

### Build/Lint/Test Commands
- **Install Dependencies**: `npm install`
- **Development Server**: `npm run dev` (runs on http://localhost:3000)
- **Build for Production**: `npm run build` (creates `.next/` optimized bundle)
- **Start Production Server**: `npm start`
- **Linting**: `npm run lint` (ESLint with Next.js config; focuses on core-web-vitals, disables `no-img-element`)
- **Testing**: No tests configured (no `jest` or `vitest` in package.json). Add with `npm install --save-dev jest @testing-library/react` and run `npm test`.
  - For single tests: Once set up, use `npm test -- path/to/test-file.test.tsx`.
- **Type Checking**: Implicit in build/lint; explicit with `tsc --noEmit`.

### Deployment Process and Environments
- **Local**: `npm run dev`.
- **Staging/Production**: Push to Git repo, deploy via Vercel/Netlify CLI (`vercel deploy` or `netlify deploy`).
- Environments: Use `.env.local` for local vars; Vercel/Netlify handle env vars via dashboard.
- No multi-env setup (dev/staging/prod) beyond basic.

### Database Migrations and Seeding
- N/A (no DB). When adding (e.g., Prisma + PostgreSQL):
  - Install: `npm install prisma @prisma/client`
  - Init: `npx prisma init`
  - Migrations: `npx prisma migrate dev`
  - Seeding: Define in `prisma/seed.ts`, run `npx prisma db seed`.

### Local Development Setup
1. Clone repo: `git clone <repo-url> && cd dashboard`
2. Install: `npm install`
3. Run: `npm run dev`
4. Open: http://localhost:3000
5. Editor: VS Code recommended (with TypeScript, Tailwind IntelliSense extensions).
6. shadcn/ui: Components added via `npx shadcn-ui@latest add <component>` (e.g., button, card).

## Code Patterns & Style

### Code Style Guidelines
- **TypeScript**: Strict typing; all components/pages typed.
- **Imports**: Absolute with `@/` alias (configured in `tsconfig.json`). Group by type (e.g., React, components, utils).
- **Formatting**: Prettier (implicit via ESLint/Next.js); consistent indentation (2 spaces).
- **Naming**: PascalCase for components, camelCase for vars/functions. Descriptive names (e.g., `DashboardLayout`).
- **Error Handling**: Minimal (no errors in UI yet); use try-catch in future async ops.
- **Class Names**: Use `cn()` utility from `lib/utils.ts` for conditional Tailwind classes (combines clsx + twMerge).

### Common Patterns
- **Mock Data**: Static arrays in pages for stats, projects, charts (e.g., `const projects = [...]`).
- **Responsive Design**: Tailwind classes (e.g., `md:grid-cols-2 lg:grid-cols-4`).
- **Theme Integration**: `ThemeProvider` wraps app; theme-aware classes (e.g., `bg-background`).
- **Client Components**: Marked with `"use client"` for hooks like `usePathname`, `useTheme`.
- **Recharts**: Responsive containers with custom gradients/tooltips for charts.
- **No State Management**: Local state only (none currently); consider TanStack Query for data fetching.

### Directory Structure and Module Organization
```
dashboard/
├── app/                    # Next.js App Router pages/layouts
│   ├── globals.css         # Global Tailwind styles
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx            # Overview page
│   ├── projects/           # Projects page
│   │   └── page.tsx
│   ├── analytics/          # Analytics page with charts
│   │   └── page.tsx
│   └── settings/           # Settings page
│       └── page.tsx
├── components/             # Reusable React components
│   ├── ui/                 # shadcn/ui primitives (Button, Card, etc.)
│   ├── dashboard-layout.tsx # Main layout (Sidebar + Header + children)
│   ├── header.tsx          # Top bar with search/theme
│   ├── sidebar.tsx         # Navigation
│   └── theme-provider.tsx  # Dark/light mode wrapper
├── lib/                    # Shared utilities
│   └── utils.ts            # cn() for Tailwind class merging
├── public/                 # Static assets (empty)
├── .eslintrc.json          # ESLint config
├── next.config.ts          # Next.js config (empty)
├── package.json            # Dependencies/scripts
├── tailwind.config.ts      # Tailwind setup with shadcn
├── tsconfig.json           # TypeScript config with path aliases
└── README.md               # Project overview
```

### Where to Find Specific Functionality
- **Auth Logic**: None; add in `app/layout.tsx` or middleware.
- **UI Components**: `components/ui/` for shadcn; custom in `components/`.
- **Data/Logic**: Mocked in pages; centralize in `lib/` or `hooks/` for real app.
- **Styling**: `app/globals.css` + Tailwind; themes via `next-themes`.
- **Charts**: Recharts in `app/analytics/page.tsx`.
- **Navigation**: `components/sidebar.tsx` with Next.js Link.

## Critical Context

### Important Gotchas or Edge Cases
- **Mock Data Only**: All pages use hardcoded data—real app needs backend integration to avoid stale UI.
- **No Error Boundaries**: Add React ErrorBoundary for production robustness.
- **Client-Side Only**: Some pages have `"use client"`; ensure SSR-friendly where possible.
- **Theme Hydration**: Suppresses warnings in layout; test theme persistence on reload.
- **Responsive Breakpoints**: Tailwind defaults (sm:640px, md:768px, lg:1024px)—test on mobile.
- **No Accessibility**: Add ARIA labels to icons/buttons; audit with Lighthouse.

### Areas Requiring Special Attention During Review
- **Data Fetching**: When adding APIs, use `getServerSideProps` or RSC; handle loading/error states.
- **Performance**: Recharts charts are heavy—optimize with `Suspense` or lazy loading.
- **Security**: No auth; review for XSS in future user inputs (e.g., settings forms).
- **Testing Gaps**: No unit/integration tests; prioritize pages with forms/charts.
- **Scalability**: Grid layouts may break with many projects; paginate/infinite scroll.

### Dependencies and Their Purposes
- **next@15.0.3**: Core framework.
- **react@^18.3.1**: UI library.
- **tailwindcss@^3.4.15**: Styling.
- **@radix-ui/** (via shadcn): Accessible primitives.
- **recharts@^3.4.1**: Charts.
- **lucide-react@^0.453.0**: Icons.
- **next-themes@^0.4.6**: Theme management.
- Dev: ESLint, TypeScript, PostCSS/Autoprefixer.

### Cursor/Copilot Rules
- No `.cursor/rules/` or `.github/copilot-instructions.md` found. Follow standard Next.js/shadcn best practices: Use TypeScript, keep components small, prefer composition over inheritance.

This document provides a high-level overview for quick onboarding. For deeper dives, inspect pages/components directly. Update as features (e.g., backend, auth) are added.