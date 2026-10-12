import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Page from "../../../Components/Page";
import Avatar from "../../../Components/Avatar";
import BeforeAfterPlayer, {
  BeforeAfterPlayerHandle,
  BeforeAfterTrack,
} from "../../../Components/BeforeAfterPlayer";
import { formatTime } from "../../../Components/BeforeAfterPlayer/utils";
import { WAVEFORM_ROW_HEIGHT } from "../../../Components/BeforeAfterPlayer/waveform";
import { designTokens } from "../../../DesignSystem";
import { getColors } from "../../../Styles/colors";
import { useTheme } from "../../../Utils/Theme";
import { ThemedElementProps } from "../../../Utils/Theme/types";
import {
  AudioVersion,
  Comment,
  CommentThread,
  library,
  Song,
  songPage,
  streamUrl,
} from "../../../Api/portal";
import { isStaff, useSession } from "../../../Api/session";
import { FormStatus, TextArea } from "../../Join/styles";
import { LinkButton, Shell } from "../../Login/styles";
import { BackState, SlideIn } from "../IndexList";
import NoteMarkers, { NoteMarker } from "./NoteMarkers";

const TitleBlock = styled.div`
  min-width: 0;

  h1 {
    margin: 0;
    font-size: ${designTokens.fontSize["3xl"]};
    overflow-wrap: anywhere;
  }
`;

const Muted = styled.p<ThemedElementProps>`
  margin: 0;
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.sm};
`;

const NoteBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${designTokens.spacing.lg};
  flex-wrap: wrap;
`;

const Composer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
`;

const ComposerActions = styled.div`
  display: flex;
  gap: ${designTokens.spacing.lg};
  justify-content: flex-end;
`;

const Notes = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
`;

const Note = styled.li<ThemedElementProps & { $active: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.md};
  border-left: ${designTokens.borderWidth.strong} solid
    ${({ theme, $active }) => ($active ? getColors(theme).accent : "transparent")};
  background: ${({ theme, $active }) => ($active ? getColors(theme).surfaceMuted : "transparent")};
  transition: background ${designTokens.duration.fast} ${designTokens.easing.standard};
`;

const NoteBody = styled.div`
  min-width: 0;
  overflow-wrap: anywhere;

  p {
    margin: ${designTokens.spacing.xs} 0 0;
  }
`;

const NoteActions = styled.div`
  display: flex;
  gap: ${designTokens.spacing.md};
  margin-top: ${designTokens.spacing.xs};
  font-size: ${designTokens.fontSize.sm};
`;

const Reply = styled.div<ThemedElementProps>`
  margin-top: ${designTokens.spacing.sm};
  padding-left: ${designTokens.spacing.md};
  border-left: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
`;

const SongDetail: React.FC = () => {
  const { theme } = useTheme();
  const { songId = "" } = useParams();
  const navigate = useNavigate();
  const back = (useLocation().state as BackState | null) ?? {};
  const playerRef = React.useRef<BeforeAfterPlayerHandle>(null);
  const noteRefs = React.useRef(new Map<string, HTMLLIElement>());

  const [song, setSong] = React.useState<Song | null>(null);
  const [projectTitle, setProjectTitle] = React.useState("");
  const [versions, setVersions] = React.useState<AudioVersion[] | null>(null);
  // Mirrors of the player's state, polled each frame (it has no change events).
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [currentMs, setCurrentMs] = React.useState(0);
  const [durationMs, setDurationMs] = React.useState(0);
  const [threads, setThreads] = React.useState<Record<string, CommentThread[]>>({});
  const [noteAt, setNoteAt] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState("");
  const [posting, setPosting] = React.useState(false);
  const [activeNote, setActiveNote] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const me = useSession().user;
  const staff = isStaff(me);
  // One open editor at a time: editing a comment, or replying to a thread.
  const [editing, setEditing] = React.useState<{ id: string; draft: string } | null>(null);
  const [replyTo, setReplyTo] = React.useState<{ id: string; draft: string } | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await songPage.song(songId);
      if (cancelled) return;
      setSong(s);
      songPage.project(s.projectId).then((p) => !cancelled && setProjectTitle(p.title), () => {});
      const list = await library.versions(songId);
      if (!cancelled) setVersions([...list].sort((a, b) => a.versionNumber - b.versionNumber));
    })().catch((e: Error) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [songId]);

  // Oldest first, so the player reads top to bottom as the song's history.
  const tracks = React.useMemo<BeforeAfterTrack[]>(
    () =>
      (versions ?? []).map((v) => ({
        src: streamUrl(v.id),
        label: `v${v.versionNumber} · ${v.label}`,
        credentials: "include",
      })),
    [versions]
  );

  React.useEffect(() => {
    if (!versions?.length) return;
    let frame = 0;
    let showedNewest = false;
    const tick = () => {
      const player = playerRef.current;
      if (player?.isReady()) {
        if (!showedNewest) {
          player.select(versions.length - 1);
          showedNewest = true;
        }
        setActiveIndex(player.getActiveIndex());
        setDurationMs(Math.round(player.getDuration() * 1000));
        // 50 ms steps keep re-renders cheap while playing.
        setCurrentMs(Math.round(player.getCurrentTime() * 20) * 50);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [versions]);

  const version = versions?.[activeIndex];

  // Every version's notes, so each waveform row can show its own avatars.
  React.useEffect(() => {
    if (!versions) return;
    let cancelled = false;
    Promise.all(versions.map(async (v) => [v.id, await songPage.comments(v.id)] as const)).then(
      (entries) => !cancelled && setThreads(Object.fromEntries(entries)),
      (e: Error) => !cancelled && setError(e.message)
    );
    return () => {
      cancelled = true;
    };
  }, [versions]);

  // After the list re-renders (possibly for another version), bring the note into view.
  React.useEffect(() => {
    if (activeNote) noteRefs.current.get(activeNote)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeNote, activeIndex]);

  const toggleHidden = async () => {
    if (!version) return;
    try {
      const updated = await library.setVisibility(version.id, version.visibility === "internal" ? "client" : "internal");
      setVersions((all) => all?.map((v) => (v.id === updated.id ? { ...v, visibility: updated.visibility } : v)) ?? null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const seek = (ms: number) => playerRef.current?.seek(ms / 1000);

  const startNote = () => {
    playerRef.current?.pause();
    setNoteAt(currentMs);
    setActiveNote(null);
  };

  // A note on another version switches the player (and the feed below) to that version.
  const focusNote = (id: string, ms: number, row = activeIndex) => {
    if (row !== activeIndex) {
      playerRef.current?.select(row);
      setActiveIndex(row);
    }
    seek(ms);
    setActiveNote(id);
  };

  const postNote = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!version || noteAt === null || !draft.trim()) return;
    setPosting(true);
    try {
      const created = await songPage.addComment(version.id, draft.trim(), noteAt);
      const fresh = await songPage.comments(version.id);
      setThreads((all) => ({ ...all, [version.id]: fresh }));
      setDraft("");
      setNoteAt(null);
      setActiveNote(created.id);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPosting(false);
    }
  };

  const refreshThreads = async (versionId: string) => {
    const fresh = await songPage.comments(versionId);
    setThreads((all) => ({ ...all, [versionId]: fresh }));
  };

  const act = async (action: () => Promise<unknown>) => {
    if (!version) return;
    setPosting(true);
    try {
      await action();
      await refreshThreads(version.id);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPosting(false);
    }
  };

  const startEdit = (c: Comment) => {
    setReplyTo(null);
    setEditing({ id: c.id, draft: c.content ?? "" });
  };

  const startReply = (threadId: string) => {
    setEditing(null);
    setReplyTo({ id: threadId, draft: "" });
  };

  const saveEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!editing?.draft.trim()) return;
    act(async () => {
      await songPage.editComment(editing.id, editing.draft.trim());
      setEditing(null);
    });
  };

  const sendReply = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!version || !replyTo?.draft.trim()) return;
    act(async () => {
      await songPage.reply(version.id, replyTo.id, replyTo.draft.trim());
      setReplyTo(null);
    });
  };

  const remove = (c: Comment, isThread: boolean) => {
    if (!window.confirm(isThread ? "Delete this note and all its replies?" : "Delete this reply?")) return;
    act(() => songPage.deleteComment(c.id));
  };

  // Same rules as the API: authors edit their own; authors and staff delete.
  const mine = (c: Comment) => c.content !== null && c.author?.id === me?.id;

  const editor = (value: string, onChange: (v: string) => void, onSubmit: (e: React.SyntheticEvent) => void, onCancel: () => void, label: string) => (
    <Composer onSubmit={onSubmit}>
      <TextArea
        theme={theme}
        autoFocus
        rows={2}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSubmit(e);
          if (e.key === "Escape") onCancel();
        }}
      />
      <ComposerActions>
        <LinkButton theme={theme} type="button" onClick={onCancel}>
          Cancel
        </LinkButton>
        <LinkButton theme={theme} type="submit" disabled={posting || !value.trim()}>
          {posting ? "Saving…" : label}
        </LinkButton>
      </ComposerActions>
    </Composer>
  );

  const commentBody = (c: Comment, isThread: boolean) =>
    editing?.id === c.id ? (
      editor(editing.draft, (draft) => setEditing({ id: c.id, draft }), saveEdit, () => setEditing(null), "Save")
    ) : (
      <>
        <p>
          {c.content ?? <em>Deleted</em>}
          {c.edited && c.content !== null ? <Muted theme={theme} as="span"> (edited)</Muted> : null}
        </p>
        {c.content !== null && (mine(c) || staff) ? (
          <NoteActions>
            {mine(c) ? (
              <LinkButton theme={theme} type="button" onClick={() => startEdit(c)}>
                Edit
              </LinkButton>
            ) : null}
            <LinkButton theme={theme} type="button" disabled={posting} onClick={() => remove(c, isThread)}>
              Delete
            </LinkButton>
          </NoteActions>
        ) : null}
      </>
    );

  const timed = (version ? threads[version.id] ?? [] : [])
    .filter((t) => t.timestampMs !== null)
    .sort((a, b) => a.timestampMs! - b.timestampMs!);
  const markers: NoteMarker[] = (versions ?? []).flatMap((v, row) =>
    (threads[v.id] ?? [])
      .filter((t) => t.timestampMs !== null && t.content !== null)
      .map((t) => ({
        id: t.id,
        row,
        timestampMs: t.timestampMs!,
        author: t.author?.name ?? "Someone",
        image: t.author?.image ?? null,
        content: t.content!,
      }))
  );

  return (
    <Page>
      <Shell theme={theme} $wide style={{ maxWidth: "960px" }}>
        <SlideIn>
          <LinkButton
            theme={theme}
            type="button"
            style={{ alignSelf: "flex-start" }}
            onClick={() => navigate(back.backTo ?? "/portal/songs")}
          >
            ← {back.backLabel ?? "All songs"}
          </LinkButton>

          {song ? (
            <TitleBlock>
              <h1>{song.title}</h1>
              <Muted theme={theme}>
                {[projectTitle, version && `v${version.versionNumber} · ${version.label}`]
                  .filter(Boolean)
                  .join(" · ")}
              </Muted>
              {staff && version ? (
                <LinkButton theme={theme} type="button" onClick={toggleHidden}>
                  {version.visibility === "internal" ? "Hidden from client · Show" : "Hide from client"}
                </LinkButton>
              ) : null}
            </TitleBlock>
          ) : null}

          {error ? (
            <FormStatus theme={theme} $tone="error">
              {error}
            </FormStatus>
          ) : null}
          {versions?.length === 0 ? (
            <Muted theme={theme}>No audio uploaded for this song yet.</Muted>
          ) : null}

          {tracks.length ? (
            <BeforeAfterPlayer
              ref={playerRef}
              theme={theme}
              tracks={tracks}
              showWaveform
              showProgress
              waveformOverlay={
                <NoteMarkers
                  theme={theme}
                  durationMs={durationMs}
                  currentMs={currentMs}
                  activeRow={activeIndex}
                  rowHeight={WAVEFORM_ROW_HEIGHT}
                  markers={markers}
                  activeId={activeNote}
                  onOpen={(m) => focusNote(m.id, m.timestampMs, m.row)}
                />
              }
            />
          ) : null}

          {version && durationMs ? (
            noteAt === null ? (
              <NoteBar>
                <Muted theme={theme}>
                  Notes are left on {version.label}. Switch versions above to see theirs.
                </Muted>
                <LinkButton theme={theme} type="button" onClick={startNote}>
                  + Note at {formatTime(currentMs / 1000)}
                </LinkButton>
              </NoteBar>
            ) : (
              <Composer onSubmit={postNote}>
                <label htmlFor="note">
                  Note on {version.label} at {formatTime(noteAt / 1000)}
                </label>
                <TextArea
                  id="note"
                  theme={theme}
                  autoFocus
                  rows={3}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) postNote(e);
                    if (e.key === "Escape") setNoteAt(null);
                  }}
                  placeholder="What should change here?"
                />
                <ComposerActions>
                  <LinkButton theme={theme} type="button" onClick={() => setNoteAt(null)}>
                    Cancel
                  </LinkButton>
                  <LinkButton theme={theme} type="submit" disabled={posting || !draft.trim()}>
                    {posting ? "Posting…" : "Post note"}
                  </LinkButton>
                </ComposerActions>
              </Composer>
            )
          ) : null}

          {timed.length ? (
            <Notes>
              {timed.map((t) => (
                <Note
                  key={t.id}
                  theme={theme}
                  $active={t.id === activeNote}
                  ref={(el) => {
                    if (el) noteRefs.current.set(t.id, el);
                    else noteRefs.current.delete(t.id);
                  }}
                >
                  <Avatar theme={theme} name={t.author?.name ?? "?"} image={t.author?.image ?? null} />
                  <NoteBody>
                    <LinkButton theme={theme} type="button" onClick={() => focusNote(t.id, t.timestampMs!)}>
                      {formatTime(t.timestampMs! / 1000)}
                    </LinkButton>{" "}
                    <strong>{t.author?.name ?? "Someone"}</strong>
                    {commentBody(t, true)}
                    {t.replies.map((r) => (
                      <Reply key={r.id} theme={theme}>
                        <strong>{r.author?.name ?? "Someone"}</strong>
                        {commentBody(r, false)}
                      </Reply>
                    ))}
                    {t.content === null ? null : replyTo?.id === t.id ? (
                      <Reply theme={theme}>
                        {editor(replyTo.draft, (draft) => setReplyTo({ id: t.id, draft }), sendReply, () => setReplyTo(null), "Reply")}
                      </Reply>
                    ) : (
                      <NoteActions>
                        <LinkButton theme={theme} type="button" onClick={() => startReply(t.id)}>
                          {t.replies.length ? `Reply · ${t.replies.length} ${t.replies.length === 1 ? "reply" : "replies"}` : "Reply"}
                        </LinkButton>
                      </NoteActions>
                    )}
                  </NoteBody>
                </Note>
              ))}
            </Notes>
          ) : null}
        </SlideIn>
      </Shell>
    </Page>
  );
};

export default SongDetail;
