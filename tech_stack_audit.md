# Tech Stack Audit - HRMSCRM Project

## Frontend
*   **Framework:** Next.js (v13+ App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Library:** React
*   **Routing:** Next.js Router (`next/navigation`)
*   **SEO Management:** `next/head` (for meta tags, structured data)
*   **Data Fetching (Simulated):** `localStorage` for client-side tool data persistence.

## Backend (Inferred/Placeholder - not directly modified by autonomous agent)
*   **Runtime:** Node.js
*   **Framework:** Express (based on `server.js` in `backend/`)
*   **Database:** MongoDB (mentioned in `frontend/src/app/home/page.tsx` as a technology)
*   **Authentication:** JWT (mentioned in `frontend/src/app/home/page.tsx` as a technology)

## Schedulers (Planned/Implemented by autonomous agent)
*   **PageScheduler:** (Planned)
*   **ToolScheduler:** (Planned)
*   **AutoReport:** (Planned)

## Analytics
*   **Logging:** Custom `logAnalyticsEvent` utility (`frontend/src/utils/analytics.ts`) for console logging (simulating external analytics service).
*   **Events Tracked:** ToolOpened, ToolSubmitted, ToolResultViewed, LeadCaptured.

## Storage (for autonomous agent generated data)
*   `/data/prelogin_results/`: JSON files for tool results (simulated).
*   `/data/prelogin_leads/`: JSON files for lead capture (simulated).
*   `/data/analytics_events.log`: Log file for analytics events (simulated).

## Deployment (Inferred - not directly modified by autonomous agent)
*   Vercel (mentioned in `frontend/src/app/home/page.tsx` as a technology)

## General Notes
*   Strict adherence to JavaScript-only (TypeScript used for type safety).
*   No external AI/GPT/API dependencies for generated tools.
*   Emphasis on end-to-end functionality within the frontend context, simulating backend interactions where necessary (e.g., local storage for data persistence).
