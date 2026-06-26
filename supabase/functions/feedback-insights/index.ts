// Aggregates submissions from public.product_feedback for the insights dashboard.
// Returns counts only — no names, emails, or freeform text are returned, so the
// payload is safe to render in the (password-gated) admin UI.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const ADMIN_PASSWORD = Deno.env.get("INSIGHTS_PASSWORD") ?? "38475554";

type Row = {
  kind: string;
  created_at: string;
  payload: Record<string, unknown>;
};

const tally = (rows: Row[], key: string) => {
  const map = new Map<string, number>();
  for (const r of rows) {
    const v = r.payload?.[key];
    if (typeof v === "string" && v.trim().length > 0) {
      const norm = v.trim();
      map.set(norm, (map.get(norm) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
};

// Split a freeform brands string ("Optimum Nutrition, MyProtein; Bulk") into
// normalised tokens for a brand frequency chart.
const tallyBrands = (rows: Row[]) => {
  const map = new Map<string, number>();
  const STOP = new Set(["", "n/a", "na", "none", "nothing", "-"]);
  for (const r of rows) {
    const raw = r.payload?.current_brands;
    if (typeof raw !== "string") continue;
    raw
      .split(/[,;\/\n]+/)
      .map((b) => b.trim().toLowerCase())
      .filter((b) => b && !STOP.has(b) && b.length < 60)
      .forEach((b) => {
        const pretty = b.replace(/\b\w/g, (c) => c.toUpperCase());
        map.set(pretty, (map.get(pretty) ?? 0) + 1);
      });
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
};

const tallyRequests = (rows: Row[]) => {
  const map = new Map<string, number>();
  for (const r of rows) {
    const p = r.payload?.product;
    if (typeof p === "string" && p.trim()) {
      const key = p.trim().toLowerCase();
      const pretty = key.replace(/\b\w/g, (c) => c.toUpperCase());
      map.set(pretty, (map.get(pretty) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const provided = req.headers.get("x-admin-password");
  if (provided !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await supabase
    .from("product_feedback")
    .select("kind, created_at, payload")
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const rows = (data ?? []) as Row[];
  const surveys = rows.filter((r) => r.kind === "survey");
  const requests = rows.filter((r) => r.kind === "request");

  // Last 30 days time series
  const days = 30;
  const series: { date: string; submissions: number }[] = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    series.push({ date: d.toISOString().slice(5, 10), submissions: 0 });
  }
  for (const r of rows) {
    const created = new Date(r.created_at);
    const idx = days - 1 - Math.floor((today.getTime() - created.getTime()) / 86400000);
    if (idx >= 0 && idx < days) series[idx].submissions += 1;
  }

  const insights = {
    totals: {
      all: rows.length,
      requests: requests.length,
      surveys: surveys.length,
    },
    goals: tally(surveys, "primary_goal"),
    spend: tally(surveys, "monthly_spend"),
    buyingFactor: tally(surveys, "buying_factor"),
    brands: tallyBrands(surveys),
    requestedProducts: tallyRequests(requests),
    series,
    recent: rows.slice(0, 10).map((r) => ({
      kind: r.kind,
      when: r.created_at,
      summary:
        r.kind === "request"
          ? String(r.payload?.product ?? "")
          : `${r.payload?.primary_goal ?? ""} · ${r.payload?.monthly_spend ?? ""}`,
    })),
  };

  return new Response(JSON.stringify(insights), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
