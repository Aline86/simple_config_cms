"use client";

import { useEffect, useState } from "react";

const PERIODS = [
  { days: 1, label: "Dernières 24 h" },
  { days: 7, label: "7 derniers jours" },
  { days: 30, label: "30 derniers jours" },
  { days: 90, label: "90 derniers jours" },
  { days: 365, label: "12 derniers mois" },
];

const nf = new Intl.NumberFormat("fr-FR");

export default function VisitorCount() {
  const [days, setDays] = useState(30);
  const [visitors, setVisitors] = useState<number | null>(null);
  const [pageviews, setPageviews] = useState<number | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const ctrl = new AbortController();
    setState("loading");

    fetch(`/api/edition/visitor?days=${days}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setVisitors(d.visitors);
        setPageviews(d.pageviews);
        setState("ready");
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setState("error");
      });

    return () => ctrl.abort();
  }, [days]);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="visitor-period"
          className="text-xs uppercase tracking-wide text-neutral-500"
        >
          Visiteurs
        </label>
        <select
          id="visitor-period"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="rounded border border-neutral-200 bg-white px-2 py-1 text-sm text-neutral-700"
        >
          {PERIODS.map((p) => (
            <option key={p.days} value={p.days}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div aria-live="polite" className="mt-3">
        {state === "loading" && (
          <div className="h-9 w-24 animate-pulse rounded bg-neutral-100" />
        )}

        {state === "error" && (
          <p className="text-sm text-red-700">
            Chiffres indisponibles.{" "}
            <button
              onClick={() => setDays((d) => d)}
              className="underline underline-offset-2"
            >
              Réessayer
            </button>
          </p>
        )}

        {state === "ready" && (
          <>
            <p className="text-3xl font-medium tabular-nums text-neutral-900">
              {nf.format(visitors ?? 0)}
            </p>
            <p className="mt-0.5 text-sm text-neutral-500">
              {nf.format(pageviews ?? 0)} pages vues
            </p>
          </>
        )}
      </div>
    </div>
  );
}
