import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Plus, Trash2, Send, Lock, LogOut, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Thread = { id: string; title: string; updated_at: string };
type Msg = { id: string; role: "user" | "assistant" | "system"; content: string };

export default function Coach() {
  const navigate = useNavigate();
  const { threadId } = useParams<{ threadId?: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auth + subscription gate
  useEffect(() => {
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/auth", { replace: true });
        return;
      }
      setUserId(sess.session.user.id);
      const { data: sub } = await supabase
        .from("coach_subscriptions")
        .select("is_active")
        .eq("user_id", sess.session.user.id)
        .maybeSingle();
      setIsActive(!!sub?.is_active);
    };
    init();
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  // Load threads when active
  useEffect(() => {
    if (!userId || !isActive) return;
    supabase
      .from("coach_threads")
      .select("id,title,updated_at")
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        const list = (data ?? []) as Thread[];
        setThreads(list);
        if (!threadId && list.length > 0) navigate(`/coach/${list[0].id}`, { replace: true });
      });
  }, [userId, isActive, threadId, navigate]);

  // Load messages for active thread
  useEffect(() => {
    if (!threadId) { setMessages([]); return; }
    supabase
      .from("coach_messages")
      .select("id, role, message, created_at")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setMessages((data ?? []).map((r: any) => ({
          id: r.id,
          role: r.role,
          content: r.message?.content ?? "",
        })));
      });
  }, [threadId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streamingText]);

  useEffect(() => { textareaRef.current?.focus(); }, [threadId]);

  const createThread = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("coach_threads")
      .insert({ user_id: userId, title: "New conversation" })
      .select("id,title,updated_at")
      .single();
    if (error) { toast.error(error.message); return; }
    setThreads((t) => [data as Thread, ...t]);
    navigate(`/coach/${(data as Thread).id}`);
  };

  const deleteThread = async (id: string) => {
    const { error } = await supabase.from("coach_threads").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    const remaining = threads.filter((t) => t.id !== id);
    setThreads(remaining);
    if (id === threadId) {
      if (remaining[0]) navigate(`/coach/${remaining[0].id}`);
      else navigate("/coach");
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !threadId || sending) return;
    const text = input.trim();
    setInput("");
    setSending(true);
    setStreamingText("");
    const optimisticUser: Msg = { id: `tmp-${Date.now()}`, role: "user", content: text };
    const nextMessages = [...messages, optimisticUser];
    setMessages(nextMessages);

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token;
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/coach-chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          threadId,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok || !res.body) {
        if (res.status === 402) { toast.error("Subscription required."); setIsActive(false); }
        else if (res.status === 429) toast.error("Rate limit hit — wait a moment.");
        else toast.error("Coach is unavailable right now.");
        setMessages(messages); // revert
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const data = t.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (typeof delta === "string") {
              assistant += delta;
              setStreamingText(assistant);
            }
          } catch { /* ignore */ }
        }
      }
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "assistant", content: assistant }]);
      setStreamingText("");
      // refresh thread list ordering / title
      supabase.from("coach_threads").select("id,title,updated_at").order("updated_at", { ascending: false }).then(({ data }) => setThreads((data ?? []) as Thread[]));
    } catch (e: any) {
      toast.error(e.message ?? "Send failed");
      setMessages(messages);
    } finally {
      setSending(false);
      textareaRef.current?.focus();
    }
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate("/auth"); };

  if (isActive === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Paywall
  if (!isActive) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet><title>Baseline AI Coach — Subscribe</title></Helmet>
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-xl w-full text-center bg-card border border-border rounded-2xl p-10">
            <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h1 className="font-bebas text-5xl tracking-wider mb-3">BASELINE AI COACH</h1>
            <p className="text-muted-foreground mb-6">
              Your private, evidence-based bodybuilding & performance coach. Programme design, nutrition, supplementation, recovery — on demand, 24/7.
            </p>
            <div className="text-3xl font-bold mb-1">£19<span className="text-base font-normal text-muted-foreground">/month</span></div>
            <p className="text-xs text-muted-foreground mb-6">Cancel anytime · UK billing</p>
            <Button size="lg" className="w-full mb-3" disabled>Subscribe — Coming Soon</Button>
            <p className="text-xs text-muted-foreground">Stripe checkout is being finalised. Email <a className="underline" href="mailto:support@baselinenutrition.co.uk">support@baselinenutrition.co.uk</a> to join the early access list.</p>
            <button onClick={signOut} className="mt-6 text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><LogOut className="w-3 h-3" /> Sign out</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet><title>Baseline AI Coach</title></Helmet>
      <Navbar />
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Thread sidebar */}
        <aside className="w-72 border-r border-border bg-card/40 flex flex-col">
          <div className="p-4 border-b border-border">
            <Button onClick={createThread} className="w-full" variant="default">
              <Plus className="w-4 h-4 mr-2" /> New conversation
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {threads.map((t) => (
              <div key={t.id} className={`group flex items-center gap-1 rounded-lg ${t.id === threadId ? "bg-primary/10" : "hover:bg-muted/50"}`}>
                <Link to={`/coach/${t.id}`} className="flex-1 truncate px-3 py-2 text-sm">{t.title}</Link>
                <button onClick={() => deleteThread(t.id)} aria-label="Delete" className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {threads.length === 0 && <p className="text-xs text-muted-foreground text-center p-4">No conversations yet. Start one above.</p>}
          </div>
          <div className="p-3 border-t border-border">
            <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><LogOut className="w-3 h-3" /> Sign out</button>
          </div>
        </aside>

        {/* Chat */}
        <section className="flex-1 flex flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {!threadId && (
              <div className="text-center text-muted-foreground mt-20">Select or create a conversation to start coaching.</div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "user" ? (
                  <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 text-sm whitespace-pre-wrap">{m.content}</div>
                ) : (
                  <div className="max-w-[85%] prose prose-sm dark:prose-invert">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {streamingText && (
              <div className="flex justify-start">
                <div className="max-w-[85%] prose prose-sm dark:prose-invert">
                  <ReactMarkdown>{streamingText}</ReactMarkdown>
                </div>
              </div>
            )}
            {sending && !streamingText && (
              <div className="text-sm text-muted-foreground inline-flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Coach is thinking…</div>
            )}
          </div>
          {threadId && (
            <div className="border-t border-border p-4">
              <div className="flex gap-2 items-end max-w-3xl mx-auto">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask about programming, nutrition, supplements, recovery…"
                  className="min-h-[52px] max-h-40 resize-none"
                  disabled={sending}
                />
                <Button onClick={sendMessage} disabled={sending || !input.trim()} size="icon" className="h-[52px] w-[52px] shrink-0">
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
