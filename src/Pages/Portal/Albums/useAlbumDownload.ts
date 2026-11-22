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

const GAP_MS = 1000; // browsers drop downloads started in the same instant

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
        // The response is an attachment, so following the link saves it without leaving the page.
        const a = document.createElement("a");
        a.href = file.url;
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        await new Promise((resolve) => setTimeout(resolve, GAP_MS));
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
