"use client";

import { useState, useEffect } from "react";
import type { LinkData } from "@/app/api/shorten/route";

export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [links, setLinks] = useState<Record<string, LinkData>>({});
  const [loading, setLoading] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function fetchLinks() {
    const res = await fetch("/api/shorten");
    if (!res.ok) return;
    const data = await res.json();
    setLinks(data.links || {});
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, customSlug }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setUrl("");
    setCustomSlug("");
    fetchLinks();
  }

  async function handleDelete(slug: string) {
    await fetch("/api/shorten", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    fetchLinks();
  }

  function handleCopy(slug: string, fullShortUrl: string) {
    navigator.clipboard.writeText(fullShortUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 1500);
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 text-zinc-100">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          URL Shortener
        </h1>
        <p className="text-sm text-zinc-400">
          Create and manage short links hosted on your productivity domain.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-sm"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300">
            Destination URL
          </label>
          <input
            type="url"
            required
            placeholder="https://deepakpun.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300">
            Custom Slug <span className="text-zinc-500">(optional)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. yelpcamp"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition disabled:opacity-50 shrink-0 cursor-pointer"
            >
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/50 border border-red-900/60 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}
      </form>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-zinc-200">Shortened Links</h2>
        {Object.keys(links).length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-400">
            No links shortened yet. Paste a URL above to create your first one.
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800 border border-zinc-800 rounded-xl bg-zinc-900/80 overflow-hidden">
            {Object.entries(links).map(([slug, data]) => {
              const fullShortUrl = `${origin}/s/${slug}`;
              return (
                <li
                  key={slug}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-800/40 transition"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2.5">
                      <a
                        href={fullShortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline truncate"
                      >
                        {fullShortUrl}
                      </a>
                      <span className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded-full shrink-0">
                        {data.clicks ?? 0}{" "}
                        {data.clicks === 1 ? "click" : "clicks"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">{data.url}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(slug, fullShortUrl)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedSlug === slug ? "Copied!" : "Copy"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(slug)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/60 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
