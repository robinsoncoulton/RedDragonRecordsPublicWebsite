// Auth slice of Server/examples/frontend/portal-api.ts. The session lives in an
// HttpOnly cookie set by the API, so every request uses `credentials: "include"`.

import { clearAudioCache } from "../Components/BeforeAfterPlayer/audioCache";

export const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://api.reddragonrecords.tw");

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message);
  }
}

async function api<T>(
  path: string,
  json?: unknown,
  method = json === undefined ? "GET" : "POST"
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    method,
    headers: json === undefined ? undefined : { "Content-Type": "application/json" },
    body: json === undefined ? undefined : JSON.stringify(json),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const e = body?.error ?? {};
    throw new ApiError(res.status, e.code ?? "UNKNOWN", e.message ?? res.statusText);
  }
  return body as T;
}

/** Follows ?page= until every row is loaded (the API caps pageSize at 100). */
async function allPages<T>(path: string): Promise<T[]> {
  const rows: T[] = [];
  const sep = path.includes("?") ? "&" : "?";
  for (let page = 1; ; page++) {
    const r = await api<{ data: T[]; meta: { total: number } }>(`${path}${sep}page=${page}&pageSize=100`);
    rows.push(...r.data);
    if (r.data.length === 0 || rows.length >= r.meta.total) return rows;
  }
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: "admin" | "staff" | "client" | "guest";
}

export const auth = {
  register: (name: string, email: string, password: string) =>
    api<{ data: { message: string } }>("/auth/register", { name, email, password }),
  login: async (email: string, password: string) =>
    (await api<{ data: { user: AuthUser } }>("/auth/login", { email, password })).data.user,
  // Cached audio is per browser, not per account, so it goes with the session.
  logout: () => api("/auth/logout", {}).finally(clearAudioCache),
  /** Null when not signed in. */
  me: async () => {
    try {
      return (await api<{ data: { user: AuthUser } }>("/auth/me")).data.user;
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) return null;
      throw e;
    }
  },
  verifyEmail: (token: string) => api("/auth/verify-email", { token }),
};

export interface Profile extends AuthUser {
  createdAt: string;
}

export interface Session {
  id: string;
  current: boolean;
  createdAt: string;
  expiresAt: string;
  ipAddress: string | null;
  userAgent: string | null;
}

export const account = {
  profile: async () => (await api<{ data: Profile }>("/users/me")).data,
  update: async (patch: { name?: string; image?: string | null }) =>
    (await api<{ data: Profile }>("/users/me", patch, "PATCH")).data,
  changePassword: (currentPassword: string, newPassword: string) =>
    api("/auth/change-password", { currentPassword, newPassword }),
  sessions: async () => (await api<{ data: Session[] }>("/auth/sessions")).data,
  revokeSession: (id: string) => api(`/auth/sessions/${id}`, undefined, "DELETE"),
  revokeOtherSessions: () => api("/auth/sessions/revoke-others", {}),
};

export interface Song {
  id: string;
  projectId: string;
  title: string;
  trackNumber: number | null;
  durationMs: number | null;
  status: string;
}

export interface AudioVersion {
  id: string;
  versionNumber: number;
  label: string;
  approvalStatus: "pending" | "changes_requested" | "approved" | "superseded";
  durationMs: number | null;
  visibility: "client" | "internal";
}

export type LibrarySong = Song & { projectTitle: string };

export const library = {
  /** Every song the user can see across their projects, A–Z by title. */
  songs: async (organisationId?: string): Promise<LibrarySong[]> => {
    // shortcut: one request per project (no all-songs endpoint); add GET /songs to the API if users get many projects.
    const projects = await allPages<{ id: string; title: string }>(
      organisationId ? `/projects?organisationId=${organisationId}` : "/projects"
    );
    const perProject = await Promise.all(
      projects.map(async (p) =>
        (await api<{ data: Song[] }>(`/projects/${p.id}/songs`)).data.map((s) => ({
          ...s,
          projectTitle: p.title,
        }))
      )
    );
    return perProject
      .flat()
      .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base", numeric: true }));
  },
  versions: async (songId: string) =>
    (await api<{ data: AudioVersion[] }>(`/songs/${songId}/versions`)).data,
  /** Staff only. "internal" hides the version (and its file) from the client. */
  setVisibility: async (versionId: string, visibility: AudioVersion["visibility"]) =>
    (await api<{ data: AudioVersion }>(`/versions/${versionId}`, { visibility }, "PATCH")).data,
};

/** <audio> src. The session cookie is sent because the API is same-site. */
export const streamUrl = (versionId: string) => `${API_URL}/versions/${versionId}/stream`;

export interface Comment {
  id: string;
  author: { id: string; name: string; image: string | null } | null;
  timestampMs: number | null;
  /** Null when the comment was deleted. */
  content: string | null;
  createdAt: string;
}

export type CommentThread = Comment & { replies: Comment[] };

export const songPage = {
  song: async (id: string) => (await api<{ data: Song }>(`/songs/${id}`)).data,
  project: async (id: string) =>
    (await api<{ data: { id: string; title: string } }>(`/projects/${id}`)).data,
  comments: async (versionId: string) =>
    (await api<{ data: CommentThread[] }>(`/versions/${versionId}/comments`)).data,
  addComment: async (versionId: string, content: string, timestampMs: number) =>
    (await api<{ data: Comment }>(`/versions/${versionId}/comments`, { content, timestampMs })).data,
};

export type MemberRole = "owner" | "manager" | "member" | "viewer";

export interface Client {
  id: string;
  name: string;
  displayName: string;
  contactEmail: string | null;
  createdAt: string;
}

export interface ClientMember {
  userId: string;
  name: string;
  email: string;
  image: string | null;
  role: MemberRole;
  joinedAt: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: MemberRole | null;
  status: "pending" | "accepted" | "revoked" | "expired";
  expiresAt: string;
  createdAt: string;
}

export const clients = {
  list: () => allPages<Client>("/clients?sort=name&order=asc"),
  get: async (id: string) => (await api<{ data: Client }>(`/clients/${id}`)).data,
  create: async (name: string) => (await api<{ data: Client }>("/clients", { name })).data,
  members: async (id: string) =>
    (await api<{ data: ClientMember[] }>(`/clients/${id}/members`)).data,
  /** Only invitations not yet accepted; accepted ones show up as members. */
  invitations: async (id: string) =>
    (await api<{ data: Invitation[] }>(`/clients/${id}/invitations`)).data,
  invite: (id: string, email: string, role: MemberRole) =>
    api(`/clients/${id}/invitations`, { email, role }),
  revokeInvitation: (id: string, invitationId: string) =>
    api(`/clients/${id}/invitations/${invitationId}`, undefined, "DELETE"),
};

export const invitations = {
  lookup: async (token: string) =>
    (
      await api<{
        data: { organisationName: string; email: string; status: Invitation["status"] };
      }>(`/invitations/${encodeURIComponent(token)}`)
    ).data,
  accept: (token: string) => api(`/invitations/${encodeURIComponent(token)}/accept`, {}),
};
