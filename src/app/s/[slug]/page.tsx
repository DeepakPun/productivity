import { redirect, notFound } from "next/navigation";
import { Redis } from "@upstash/redis";
import type { LinkData } from "@/app/api/shorten/route";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const HASH_KEY = "short_links";

export default async function ShortRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const link = await redis.hget<LinkData>(HASH_KEY, slug);

  if (!link || !link.url) {
    notFound();
  }

  // Increment click counter in Redis
  await redis.hset(HASH_KEY, {
    [slug]: { ...link, clicks: (link.clicks || 0) + 1 },
  });

  redirect(link.url);
}
