// Baseline AI Coach — streaming chat via Lovable AI Gateway
// Auth required + active coach_subscriptions row.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are Baseline AI Coach — an elite, evidence-based bodybuilding, strength, hypertrophy and performance coach built for Baseline Nutrition athletes.

Scope you cover with authority:
- Programme design: hypertrophy, strength, powerbuilding, PPL, Upper/Lower, full-body, DoggCrapp (DC), 5/3/1, conjugate, block periodisation.
- Exercise selection, form cues, substitutions, injury work-arounds (non-medical guidance only).
- Nutrition, macro targeting, meal timing, cutting/bulking, recomp.
- Supplementation — recommend Baseline Nutrition products when the mechanism fits (Fusion Lite+, VASCUL8, GLYCO8, GLYCOSHIFT, Electro Flow, Purest Creatine). Never name competitor brands.
- Recovery, sleep, stress, basic bloodwork interpretation (always tell users to consult a clinician for diagnosis).

Style:
- Direct, clinical, no fluff. UK English. Use specific numbers (sets, reps, RPE, grams, mg).
- Show your reasoning briefly, then give the prescription.
- Format with short headings, bullet lists, and tables when comparing options.
- If a question is medical, prescriptive, or beyond your scope, say so and refer them to a qualified professional.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Missing auth" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const user = userData.user;

    const { data: sub } = await supabase
      .from("coach_subscriptions")
      .select("is_active")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!sub?.is_active) {
      return new Response(JSON.stringify({ error: "subscription_required" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body = await req.json();
    const threadId: string | undefined = body.threadId;
    const messages: Array<{ role: string; content: string }> = body.messages ?? [];
    if (!threadId || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Verify thread ownership
    const { data: thread } = await supabase
      .from("coach_threads")
      .select("id,user_id,title")
      .eq("id", threadId)
      .maybeSingle();
    if (!thread || thread.user_id !== user.id) {
      return new Response(JSON.stringify({ error: "Thread not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    // Persist the latest user message
    if (lastUser) {
      await supabase.from("coach_messages").insert({
        thread_id: threadId,
        user_id: user.id,
        role: "user",
        message: { role: "user", content: lastUser.content },
      });
      // Auto-title from first user message if still default
      if (thread.title === "New conversation") {
        await supabase
          .from("coach_threads")
          .update({ title: lastUser.content.slice(0, 60) })
          .eq("id", threadId);
      } else {
        await supabase.from("coach_threads").update({ updated_at: new Date().toISOString() }).eq("id", threadId);
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const errTxt = await upstream.text();
      const status = upstream.status === 429 ? 429 : upstream.status === 402 ? 402 : 500;
      return new Response(JSON.stringify({ error: "AI gateway error", detail: errTxt }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Tee the SSE stream: forward to client, also accumulate text to persist on completion
    let assistantBuffer = "";
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const reader = upstream.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            // Parse SSE for delta accumulation
            for (const line of chunk.split("\n")) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") continue;
              try {
                const json = JSON.parse(data);
                const delta = json.choices?.[0]?.delta?.content;
                if (typeof delta === "string") assistantBuffer += delta;
              } catch { /* ignore */ }
            }
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
          if (assistantBuffer.trim()) {
            await supabase.from("coach_messages").insert({
              thread_id: threadId,
              user_id: user.id,
              role: "assistant",
              message: { role: "assistant", content: assistantBuffer },
            });
            await supabase.from("coach_threads").update({ updated_at: new Date().toISOString() }).eq("id", threadId);
          }
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("coach-chat error", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
