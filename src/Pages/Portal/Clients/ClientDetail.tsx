import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Page from "../../../Components/Page";
import Avatar from "../../../Components/Avatar";
import { designTokens } from "../../../DesignSystem";
import { getColors } from "../../../Styles/colors";
import { useTheme } from "../../../Utils/Theme";
import { ThemedElementProps } from "../../../Utils/Theme/types";
import {
  Client,
  ClientMember,
  clients,
  Invitation,
  library,
  LibrarySong,
  MemberRole,
} from "../../../Api/portal";
import { FormStatus, TextInput } from "../../Join/styles";
import { LinkButton, Shell } from "../../Login/styles";
import { IndexList, Meta, PortalTitle, SectionTitle, SlideIn, Sweep, useSweep } from "../IndexList";
import { songItems } from "../Songs";

const People = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Person = styled.li<ThemedElementProps>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.md} 0;
  border-bottom: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
`;

const Badge = styled.span<ThemedElementProps & { $tone: "joined" | "waiting" | "expired" }>`
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme, $tone }) =>
    $tone === "joined"
      ? getColors(theme).success
      : $tone === "expired"
      ? getColors(theme).danger
      : getColors(theme).textMuted};
`;

const InviteForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: ${designTokens.spacing.lg};
  align-items: center;
  margin-top: ${designTokens.spacing.lg};

  input {
    flex: 1 1 14rem;
    min-width: 0;
  }
`;

const Select = styled.select<ThemedElementProps>`
  font: inherit;
  color: ${({ theme }) => getColors(theme).text};
  background: transparent;
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
  border-radius: ${designTokens.radius.sm};
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
`;

const ROLES: { value: MemberRole; label: string }[] = [
  { value: "owner", label: "Owner (can invite others)" },
  { value: "manager", label: "Manager" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer (listen only)" },
];

const date = (iso: string) => new Date(iso).toLocaleDateString();

const ClientDetail: React.FC = () => {
  const { theme } = useTheme();
  const { clientId = "" } = useParams();
  const navigate = useNavigate();
  const { go, sweepProps } = useSweep();
  const [client, setClient] = React.useState<Client | null>(null);
  const [songs, setSongs] = React.useState<LibrarySong[] | null>(null);
  const [members, setMembers] = React.useState<ClientMember[]>([]);
  const [invites, setInvites] = React.useState<Invitation[]>([]);
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<MemberRole>("owner");
  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState<{ tone: "success" | "error"; text: string } | null>(null);

  const loadPeople = React.useCallback(
    () =>
      Promise.all([clients.members(clientId), clients.invitations(clientId)]).then(([m, i]) => {
        setMembers(m);
        setInvites(i.filter((inv) => inv.status !== "revoked"));
      }),
    [clientId]
  );

  React.useEffect(() => {
    const fail = (e: Error) => setStatus({ tone: "error", text: e.message });
    clients.get(clientId).then(setClient, fail);
    library.songs(clientId).then(setSongs, fail);
    loadPeople().catch(fail);
  }, [clientId, loadPeople]);

  const act = async (action: () => Promise<unknown>, success: string) => {
    setBusy(true);
    setStatus(null);
    try {
      await action();
      await loadPeople();
      setStatus({ tone: "success", text: success });
    } catch (e) {
      setStatus({ tone: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const invite = (e: React.FormEvent) => {
    e.preventDefault();
    const to = email.trim();
    act(async () => {
      await clients.invite(clientId, to, role);
      setEmail("");
    }, `Invitation sent to ${to}.`);
  };

  const backState = { backTo: `/portal/clients/${clientId}`, backLabel: client?.displayName ?? "Client" };

  return (
    <Page>
      <Shell theme={theme} $wide style={{ overflowX: "clip" }}>
        <Sweep {...sweepProps}>
          <SlideIn>
            <LinkButton
              theme={theme}
              type="button"
              style={{ alignSelf: "flex-start" }}
              onClick={() => navigate("/portal/clients")}
            >
              ← All clients
            </LinkButton>
            <div>
              <PortalTitle>{client?.displayName ?? " "}</PortalTitle>

              <SectionTitle>Songs</SectionTitle>
              <IndexList
                items={songs && songItems(songs)}
                empty="No songs for this client yet."
                onOpen={(item) => go(`/portal/songs/${item.id}`, backState)}
              />

              <SectionTitle>People</SectionTitle>
              {members.length === 0 && invites.length === 0 ? (
                <Meta theme={theme}>Nobody has access yet. Invite someone below.</Meta>
              ) : null}
              <People>
                {members.map((m) => (
                  <Person key={m.userId} theme={theme}>
                    <Avatar theme={theme} name={m.name} image={m.image} />
                    <div style={{ minWidth: 0 }}>
                      {m.name}
                      <Meta theme={theme}>
                        {m.email} · {m.role}
                      </Meta>
                    </div>
                    <Badge theme={theme} $tone="joined">
                      Joined {date(m.joinedAt)}
                    </Badge>
                  </Person>
                ))}
                {invites.map((inv) => (
                  <Person key={inv.id} theme={theme}>
                    <Avatar theme={theme} name={inv.email} image={null} />
                    <div style={{ minWidth: 0 }}>
                      {inv.email}
                      <Meta theme={theme}>
                        {inv.role ?? "member"} · invited {date(inv.createdAt)} ·{" "}
                        <LinkButton
                          theme={theme}
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            act(() => clients.revokeInvitation(clientId, inv.id), `Invitation to ${inv.email} revoked.`)
                          }
                        >
                          {inv.status === "expired" ? "Remove" : "Revoke"}
                        </LinkButton>
                      </Meta>
                    </div>
                    {inv.status === "expired" ? (
                      <Badge theme={theme} $tone="expired">
                        Expired {date(inv.expiresAt)}
                      </Badge>
                    ) : (
                      <Badge theme={theme} $tone="waiting">
                        Invited · not signed up
                      </Badge>
                    )}
                  </Person>
                ))}
              </People>

              <InviteForm onSubmit={invite}>
                <TextInput
                  theme={theme}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  aria-label="Email to invite"
                />
                <Select
                  theme={theme}
                  value={role}
                  onChange={(e) => setRole(e.target.value as MemberRole)}
                  aria-label="Role"
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </Select>
                <LinkButton theme={theme} type="submit" disabled={busy || !email.trim()}>
                  Send invite
                </LinkButton>
              </InviteForm>
              {status ? (
                <FormStatus theme={theme} $tone={status.tone}>
                  {status.text}
                </FormStatus>
              ) : null}
            </div>
          </SlideIn>
        </Sweep>
      </Shell>
    </Page>
  );
};

export default ClientDetail;
