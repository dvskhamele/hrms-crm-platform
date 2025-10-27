# Tech Stack Audit

## Framework

*   **Framework:** [Next.js](https://nextjs.org/) (a React framework)
*   **React Version:** ^18.2.0

## Styling

*   **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)
*   **PostCSS:** Used for processing Tailwind CSS.

## Internationalization (i18n)

*   **Library:** [i18next](https://www.i18next.com/)
*   **Next.js Integration:** [next-i18next](https://github.com/i18next/next-i18next)

## Linting & Code Quality

*   **Linter:** ESLint (integrated with Next.js `next lint`)
*   **TypeScript:** Used for static typing.

## Package Management

*   **Package Manager:** npm

## Build & Deployment

*   **Build Tool:** `next build`
*   **Deployment Platform:** [Vercel](https://vercel.com/) (inferred from `vercel.json`)

## Analytics & Monitoring

*   No dedicated analytics or monitoring libraries found in `package.json`.

## Schedulers & Background Jobs

*   No dedicated libraries for schedulers or background jobs were found in `package.json`. The existing schedulers in `/schedulers` appear to be custom Node.js scripts.
