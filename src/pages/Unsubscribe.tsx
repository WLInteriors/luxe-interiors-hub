import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type State =
  | { kind: "loading" }
  | { kind: "ready" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid" });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_KEY } }
        );
        const data = await res.json();
        if (!res.ok) {
          setState({ kind: "invalid" });
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setState({ kind: "already" });
          return;
        }
        setState({ kind: "ready" });
      } catch {
        setState({ kind: "error", message: "Couldn't validate this link." });
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setState({ kind: "success" });
      } else if (data.reason === "already_unsubscribed") {
        setState({ kind: "already" });
      } else {
        setState({ kind: "error", message: data.error || "Something went wrong." });
      }
    } catch {
      setState({ kind: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <Layout>
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl mb-6">Email Preferences</h1>

          {state.kind === "loading" && (
            <p className="text-muted-foreground">Checking your link…</p>
          )}

          {state.kind === "invalid" && (
            <p className="text-muted-foreground">
              This unsubscribe link is invalid or has expired.
            </p>
          )}

          {state.kind === "already" && (
            <p className="text-muted-foreground">
              You're already unsubscribed from our emails.
            </p>
          )}

          {state.kind === "ready" && (
            <>
              <p className="text-muted-foreground mb-8">
                Click below to confirm you'd like to stop receiving emails from us.
              </p>
              <button
                onClick={confirm}
                className="bg-primary text-primary-foreground px-10 py-4 text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                Confirm Unsubscribe
              </button>
            </>
          )}

          {state.kind === "submitting" && (
            <p className="text-muted-foreground">Processing…</p>
          )}

          {state.kind === "success" && (
            <p className="text-muted-foreground">
              You've been unsubscribed. We won't email you again.
            </p>
          )}

          {state.kind === "error" && (
            <p className="text-destructive">{state.message}</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Unsubscribe;
