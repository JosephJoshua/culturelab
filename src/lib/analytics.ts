type AnalyticsEvent =
  | { name: "view_home_cta"; payload?: Record<string, unknown> }
  | { name: "start_registration"; payload?: Record<string, unknown> }
  | { name: "complete_registration"; payload?: Record<string, unknown> }
  | { name: "start_payment"; payload?: Record<string, unknown> }
  | { name: "complete_payment"; payload?: Record<string, unknown> }
  | { name: "newsletter_signup"; payload?: Record<string, unknown> }
  | { name: "membership_interest"; payload?: Record<string, unknown> };

export function trackEvent(event: AnalyticsEvent) {
  // Stub for future analytics provider integration.
  // eslint-disable-next-line no-console
  console.log("[analytics]", event.name, event.payload ?? {});
}
