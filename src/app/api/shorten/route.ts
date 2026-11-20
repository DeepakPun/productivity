import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const HASH_KEY = "short_links";

export type LinkData = {
  url: string;
  clicks: number;
};

function generateCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// GET: List all shortened URLs with click counts
export async function GET() {
  const rawLinks = await redis.hgetall<Record<string, LinkData>>(HASH_KEY);
  return NextResponse.json({ links: rawLinks || {} });
}

// POST: Create a new short URL
export async function POST(req: Request) {
  try {
    const { url, customSlug } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json(
        { error: "Enter a valid URL starting with http/https" },
        { status: 400 },
      );
    }

    const slug = customSlug?.trim() || generateCode();

    const exists = await redis.hexists(HASH_KEY, slug);
    if (exists) {
      return NextResponse.json(
        { error: "That short code already exists" },
        { status: 409 },
      );
    }

    const data: LinkData = { url: url.trim(), clicks: 0 };
    await redis.hset(HASH_KEY, { [slug]: data });

    return NextResponse.json({ slug, ...data });
  } catch {
    return NextResponse.json(
      { error: "Failed to shorten URL" },
      { status: 500 },
    );
  }
}

// DELETE: Remove a shortened URL
export async function DELETE(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await redis.hdel(HASH_KEY, slug);
    return NextResponse.json({ deleted: slug });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 },
    );
  }
}
