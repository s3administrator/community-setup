import { PLAN_ENTITLEMENTS_CONTENT } from "./stubs/plan-entitlements.ts"
import { AUDIT_LOGGER_CONTENT } from "./stubs/audit-logger.ts"
import { ANALYTICS_CONSENT_CONTENT } from "./stubs/analytics-consent.ts"
import { SEO_CONTENT } from "./stubs/seo.ts"
import { SEO_LANDING_PAGES_CONTENT } from "./stubs/seo-landing-pages.ts"
import { SERVER_METRICS_CONTENT } from "./stubs/server-metrics.ts"

export type StubEntry =
  | { type: "lib-critical"; path: string; content: string }
  | { type: "lib-empty"; path: string }
  | { type: "page"; path: string }
  | { type: "layout"; path: string }
  | { type: "route"; path: string; methods: string[] }
  | { type: "skip"; path: string }

/**
 * Complete registry of all stub paths, derived from the 5 cloud package manifests.
 * "skip" entries are real community files that must never be overwritten.
 */
export const COMMUNITY_STUBS: StubEntry[] = [
  // ─── @s3administrator/auth ───
  { type: "route", path: "src/app/api/auth/dev-login/route.ts", methods: ["POST"] },
  { type: "layout", path: "src/app/(auth)/layout.tsx" },
  { type: "skip", path: "src/app/(auth)/login/page.tsx" },
  { type: "page", path: "src/app/(auth)/verify/page.tsx" },
  { type: "lib-empty", path: "src/lib/email.ts" },

  // ─── @s3administrator/billing ───
  { type: "route", path: "src/app/api/stripe/checkout/route.ts", methods: ["POST"] },
  { type: "route", path: "src/app/api/stripe/checkout/guest/route.ts", methods: ["POST"] },
  { type: "route", path: "src/app/api/stripe/billing-summary/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/stripe/portal/route.ts", methods: ["POST"] },
  { type: "route", path: "src/app/api/stripe/webhook/route.ts", methods: ["POST"] },
  { type: "route", path: "src/app/api/plans/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/auth/subscribe-callback/route.ts", methods: ["GET"] },
  { type: "page", path: "src/app/(dashboard)/billing/page.tsx" },
  { type: "lib-empty", path: "src/lib/stripe.ts" },
  { type: "lib-empty", path: "src/lib/tiers.ts" },
  { type: "lib-empty", path: "src/lib/subscription-status.ts" },
  { type: "lib-critical", path: "src/lib/plan-entitlements.ts", content: PLAN_ENTITLEMENTS_CONTENT },

  // ─── @s3administrator/admin ───
  { type: "route", path: "src/app/api/admin/stats/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/admin/actions/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/admin/logs/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/admin/plans/route.ts", methods: ["GET", "POST"] },
  { type: "route", path: "src/app/api/admin/plans/[id]/route.ts", methods: ["PATCH", "DELETE"] },
  { type: "route", path: "src/app/api/admin/server-metrics/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/admin/subscriptions/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/admin/subscriptions/[id]/route.ts", methods: ["DELETE"] },
  { type: "route", path: "src/app/api/admin/transactions/route.ts", methods: ["GET", "POST"] },
  { type: "route", path: "src/app/api/admin/transactions/[id]/send/route.ts", methods: ["POST"] },
  { type: "route", path: "src/app/api/admin/users/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/admin/users/[id]/route.ts", methods: ["PATCH", "DELETE"] },
  { type: "page", path: "src/app/(admin)/admin/page.tsx" },
  { type: "page", path: "src/app/(admin)/admin/actions/page.tsx" },
  { type: "page", path: "src/app/(admin)/admin/logs/page.tsx" },
  { type: "page", path: "src/app/(admin)/admin/plans/page.tsx" },
  { type: "page", path: "src/app/(admin)/admin/server/page.tsx" },
  { type: "page", path: "src/app/(admin)/admin/subscriptions/page.tsx" },
  { type: "page", path: "src/app/(admin)/admin/transactions/page.tsx" },
  { type: "page", path: "src/app/(admin)/admin/users/page.tsx" },
  { type: "layout", path: "src/app/(admin)/layout.tsx" },
  { type: "lib-critical", path: "src/lib/server-metrics.ts", content: SERVER_METRICS_CONTENT },

  // ─── @s3administrator/audit ───
  { type: "route", path: "src/app/api/audit/actions/route.ts", methods: ["GET"] },
  { type: "route", path: "src/app/api/analytics/events/route.ts", methods: ["POST"] },
  { type: "page", path: "src/app/(dashboard)/audit-logs/page.tsx" },
  { type: "lib-critical", path: "src/lib/audit-logger.ts", content: AUDIT_LOGGER_CONTENT },
  { type: "lib-empty", path: "src/lib/audit-retention.ts" },

  // ─── @s3administrator/marketing ───
  { type: "layout", path: "src/app/(marketing)/layout.tsx" },
  { type: "page", path: "src/app/(marketing)/page.tsx" },
  { type: "page", path: "src/app/(marketing)/pricing/page.tsx" },
  { type: "page", path: "src/app/(marketing)/features/page.tsx" },
  { type: "page", path: "src/app/(marketing)/features/[slug]/page.tsx" },
  { type: "page", path: "src/app/(marketing)/providers/page.tsx" },
  { type: "page", path: "src/app/(marketing)/providers/[slug]/page.tsx" },
  { type: "page", path: "src/app/(marketing)/compare/page.tsx" },
  { type: "page", path: "src/app/(marketing)/compare/[slug]/page.tsx" },
  { type: "lib-critical", path: "src/lib/analytics-consent.ts", content: ANALYTICS_CONSENT_CONTENT },
  { type: "lib-critical", path: "src/lib/seo.ts", content: SEO_CONTENT },
  { type: "lib-critical", path: "src/lib/seo-landing-pages.ts", content: SEO_LANDING_PAGES_CONTENT },
]
