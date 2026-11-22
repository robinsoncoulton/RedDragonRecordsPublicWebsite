import React from "react";
import { library } from "../../../Api/portal";

// Why the server left a song out, in words.
const REASONS: Record<string, string> = {
  stream_only: "streaming only",
  not_approved: "needs approval first",
  administrative_hold: "on hold",
  invoice_outstanding: "invoice unpaid",
  project_archived: "album archived",
  permission_denied: "no download access",
  file_not_ready: "file still processing",
};

/**
 * Downloads each song's newest version as its own file, named like the bounces. The server checks
 * every song; ones it leaves out are listed. Browsers may ask once to allow multiple downloads.
 */
export function useAlbumDownload(albumId: string) {
  const [progress, setProgress] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const busy = progress !== null;

  const start = async () => {
    if (busy) return;
    setProgress("Preparing…");
    setMessage(null);
    try {
      const { files, skipped } = await library.albumDownload(albumId);
      for (const [i, file] of Array.from(files.entries())) {
        setProgress(`Downloading ${i + 1} of ${files.length}…`);
        // Fetched, then saved from memory: following several attachment links from one page
        // cancels each pending download in turn, leaving only the last.
        const res = await fetch(file.url);
        if (!res.ok) throw new Error(`${file.filename} failed to download (${res.status})`);
        const href = URL.createObjectURL(await res.blob());
        const a = document.createElement("a");
        a.href = href;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(href), 10_000);
      }
      const left = skipped.map((s) => `${s.title} (${REASONS[s.reason] ?? s.reason.replace(/_/g, " ")})`);
      setMessage(
        `Downloaded ${files.length} ${files.length === 1 ? "song" : "songs"}.` +
          (left.length ? ` Not included: ${left.join(", ")}.` : "")
      );
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setProgress(null);
    }
  };

  return { start, busy, label: progress ?? "⤓ Download album", message };
}
