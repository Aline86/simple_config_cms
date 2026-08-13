import "server-only";

export interface UmamiStats {
  visitors: number;
  pageviews: number;
  visits: number;
  bounces: number;
}

let cached: { token: string; expiresAt: number } | null = null;

async function getToken(force = false): Promise<string> {
  if (!force && cached && Date.now() < cached.expiresAt) return cached.token;

  const res = await fetch(`${process.env.UMAMI_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: process.env.UMAMI_USERNAME,
      password: process.env.UMAMI_PASSWORD,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Connexion à Umami refusée.");

  const { token } = await res.json();
  cached = { token, expiresAt: Date.now() + 20 * 60 * 1000 };
  return token;
}

export async function getVisitors(days: number): Promise<UmamiStats> {
  const endAt = Date.now();
  const startAt = endAt - days * 86_400_000; // millisecondes, pas secondes

  const call = async (token: string) =>
    fetch(
      `${process.env.UMAMI_URL}/api/websites/${process.env.UMAMI_WEBSITE_ID}` +
        `/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 900 },
      },
    );

  let res = await call(await getToken());

  if (res.status === 401) res = await call(await getToken(true));

  if (!res.ok) throw new Error("Statistiques indisponibles.");

  const num = (v: unknown): number =>
    typeof v === "number" ? v : ((v as { value?: number })?.value ?? 0);

  const d = await res.json();
  return {
    visitors: num(d.visitors),
    pageviews: num(d.pageviews),
    visits: num(d.visits),
    bounces: num(d.bounces),
  };
}
