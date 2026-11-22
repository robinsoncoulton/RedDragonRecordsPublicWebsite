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
 * Downloads the album as one zip, built by the server, named like the bounces
 * (Artist-Album-48k.zip). The server checks every song; ones it can't include are listed.
 */
export function useAlbumDownload(albumId: string) {
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const start = async () => {
    if (busy) return;
    setBusy(true);
    setMessage(null);
    try {
      const { url, filename, fileCount, skipped } = await library.albumDownload(albumId);
      // The response is an attachment, so following the link saves it without leaving the page.
      const a = document.createElement("a");
      a.href = url;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      const left = skipped.map((s) => `${s.title} (${REASONS[s.reason] ?? s.reason.replace(/_/g, " ")})`);
      setMessage(
        `Downloading ${filename}: ${fileCount} ${fileCount === 1 ? "song" : "songs"}.` +
          (left.length ? ` Not included: ${left.join(", ")}.` : "")
      );
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return { start, busy, label: busy ? "Preparing…" : "⤓ Download album", message };
}
