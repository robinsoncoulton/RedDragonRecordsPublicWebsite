// Shows a page's last-loaded data straight away, then the server's answer once it arrives,
// so revisits don't wait on the API (and the audio, already cached, starts at once).
// Storage can be missing or full (private windows, quota); then it just loads normally.
const PREFIX = "rdr-remembered:";

function read<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Calls `apply` with the remembered value (if any), then with the fresh one only if it differs,
 * so a player isn't reloaded for an unchanged list. Resolves when the fresh value is in.
 */
export async function rememberedThenFresh<T>(
  key: string,
  load: () => Promise<T>,
  apply: (value: T) => void,
): Promise<void> {
  const old = read<T>(key);
  if (old !== undefined) apply(old);
  const fresh = await load();
  const json = JSON.stringify(fresh);
  if (old === undefined || JSON.stringify(old) !== json) apply(fresh);
  try {
    localStorage.setItem(PREFIX + key, json);
  } catch {
    // Full or blocked storage only means no head start next time.
  }
}

/** Remembered data belongs to whoever is signed in, so it goes on login and logout. */
export function forgetRemembered() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // Nothing stored.
  }
}
