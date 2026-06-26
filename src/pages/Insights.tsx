import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Lock, RefreshCw, Inbox, Beaker, Gift, TrendingUp } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

type LabelCount = { label: string; count: number };
type Insights = {
  totals: { all: number; requests: number; surveys: number };
  goals: LabelCount[];
  spend: LabelCount[];
  buyingFactor: LabelCount[];
  brands: LabelCount[];
  requestedProducts: LabelCount[];
  series: { date: string; submissions: number }[];
  recent: { kind: string; when: string; summary: string }[];
};

const STORAGE_KEY = "insights_password";

const Insights = () => {
  const [password, setPassword] = useState(() => sessionStorage.getItem(STORAGE_KEY) ?? "");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (pwd: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke<Insights>(
        "feedback-insights",
        { headers: { "x-admin-password": pwd } },
      );
      if (fnError || !result) throw new Error(fnError?.message ?? "Failed to load");
      setData(result);
      setAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, pwd);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load insights");
      setAuthed(false);
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) load(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Insights · Baseline Nutrition</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-24">
          <form
            onSubmit={(e) => { e.preventDefault(); load(password); }}
            className="w-full max-w-sm flex flex-col gap-4 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Lock className="w-4 h-4 text-primary" /> Insights dashboard
            </div>
            <p className="text-sm text-muted-foreground">Enter the admin password to view aggregated submission data.</p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
            />
            <Button type="submit" disabled={loading || !password} className="uppercase tracking-wider font-bold">
              {loading ? "Checking…" : "Unlock"}
            </Button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </form>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Insights · Baseline Nutrition</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Navbar />

      <main className="flex-1 py-12 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Internal</span>
              <h1 className="font-display text-3xl md:text-5xl uppercase tracking-tight mt-1">Competitive Insights</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Aggregated signals from supplement requests and the customer survey.
              </p>
            </div>
            <Button variant="outline" onClick={() => load(password)} disabled={loading} className="gap-2">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </header>

          {data && (
            <>
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard icon={<Inbox className="w-5 h-5" />} label="Total submissions" value={data.totals.all} />
                <StatCard icon={<Beaker className="w-5 h-5" />} label="Product requests" value={data.totals.requests} />
                <StatCard icon={<Gift className="w-5 h-5" />} label="Survey responses" value={data.totals.surveys} />
              </section>

              <section className="bg-card border border-border rounded-2xl p-6">
                <SectionTitle icon={<TrendingUp className="w-4 h-4" />} title="Submissions, last 30 days" />
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <defs>
                        <linearGradient id="sub" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                      <Area dataKey="submissions" stroke="hsl(var(--primary))" fill="url(#sub)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <BarCard title="Most requested supplements" data={data.requestedProducts} empty="No product requests yet." />
                <BarCard title="Brands customers currently use" data={data.brands} empty="No brand mentions yet." />
                <BarCard title="Primary training goal" data={data.goals} empty="No survey responses yet." />
                <BarCard title="Monthly supplement spend" data={data.spend} empty="No spend data yet." />
                <div className="lg:col-span-2">
                  <BarCard title="What matters most when buying" data={data.buyingFactor} empty="No survey responses yet." />
                </div>
              </section>

              <section className="bg-card border border-border rounded-2xl p-6">
                <SectionTitle title="Recent submissions" />
                {data.recent.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nothing submitted yet.</p>
                ) : (
                  <ul className="divide-y divide-border">
                    {data.recent.map((r, i) => (
                      <li key={i} className="py-3 flex items-center justify-between gap-3 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${
                          r.kind === "request" ? "bg-primary/10 text-primary" : "bg-foreground/5 text-foreground"
                        }`}>
                          {r.kind}
                        </span>
                        <span className="flex-1 truncate text-foreground">{r.summary || "—"}</span>
                        <span className="text-muted-foreground text-xs whitespace-nowrap">
                          {new Date(r.when).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
    <div>
      <div className="text-3xl font-bold tabular-nums">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  </div>
);

const SectionTitle = ({ icon, title }: { icon?: React.ReactNode; title: string }) => (
  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
    {icon}
    {title}
  </h2>
);

const BarCard = ({ title, data, empty }: { title: string; data: LabelCount[]; empty: string }) => (
  <div className="bg-card border border-border rounded-2xl p-6">
    <SectionTitle title={title} />
    {data.length === 0 ? (
      <p className="text-sm text-muted-foreground">{empty}</p>
    ) : (
      <div style={{ height: Math.max(160, data.length * 32) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
            <YAxis type="category" dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} width={140} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

export default Insights;
