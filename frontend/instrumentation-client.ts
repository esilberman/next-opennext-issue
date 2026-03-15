import posthog from 'posthog-js';

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ENVIRONMENT !== 'local') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/ingest',
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: '2026-01-30',
    capture_exceptions: true,
    capture_pageview: false, // Manual tracking for Next.js App Router
    persistence: 'cookie',
    // @ts-ignore
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: { password: true },
      recordCrossOriginIframes: true,
    },
    debug: process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev',
  });
}