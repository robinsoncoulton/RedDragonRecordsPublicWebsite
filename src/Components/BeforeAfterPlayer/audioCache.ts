// Keeps every loaded version's audio in the browser's Cache Storage, so reopening
// a song plays from disk instead of downloading each version again. A version's
// audio never changes, so a cached copy never goes stale.
// shortcut: entries stay until logout (clearAudioCache), even for versions the user
// later loses access to; prune against the visible versions if that matters.
const CACHE = "rdr-audio";

// Cache Storage only exists on https (and localhost).
const hasCache = () => typeof caches !== "undefined";

export async function fetchAudio(src: string, credentials?: RequestCredentials): Promise<ArrayBuffer> {
  const cache = hasCache() ? await caches.open(CACHE).catch(() => undefined) : undefined;
  const hit = await cache?.match(src);
  if (hit) return hit.arrayBuffer();

  const response = await fetch(src, { credentials });
  if (!response.ok) throw new Error(`Audio failed to load (${response.status})`);
  const data = await response.arrayBuffer();
  // Copied before decodeAudioData detaches `data`. A full disk only skips caching.
  const type = response.headers.get("Content-Type") ?? "application/octet-stream";
  cache?.put(src, new Response(data.slice(0), { headers: { "Content-Type": type } })).catch(() => {});
  return data;
}

export const clearAudioCache = () => (hasCache() ? caches.delete(CACHE).catch(() => false) : Promise.resolve(false));
