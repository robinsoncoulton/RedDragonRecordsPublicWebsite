import React from "react";
import styled from "styled-components";
import Page from "../../Components/Page";
import Avatar from "../../Components/Avatar";
import { designTokens } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { useTheme } from "../../Utils/Theme";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { account, auth, Profile as ProfileData, Session } from "../../Api/portal";
import { useSession } from "../../Api/session";
import {
  Field,
  FieldLabel,
  FormStatus,
  JoinForm,
  SubmitButton,
  SubmitButtonArrow,
  SubmitButtonFill,
  SubmitButtonText,
  TextInput,
} from "../Join/styles";
import { LinkButton, Shell } from "../Login/styles";

const Section = styled.section<ThemedElementProps>`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
  padding: ${designTokens.spacing.xxl} 0;
  border-top: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: ${designTokens.fontSize.xl};
`;

const Identity = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.lg};
  padding-bottom: ${designTokens.spacing.xxl};
  min-width: 0;

  h1 {
    margin: 0;
    font-size: ${designTokens.fontSize["2xl"]};
  }
`;

const Muted = styled.p<ThemedElementProps>`
  margin: 0;
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.sm};
  overflow-wrap: anywhere;
`;

const SessionRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${designTokens.spacing.md};
`;

const SessionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
`;

type Status = { tone: "success" | "error"; text: string } | null;

const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

// Stops SubmitButton repetition across three forms.
const Submit: React.FC<{ busy: boolean; children: React.ReactNode }> = ({ busy, children }) => {
  const { theme } = useTheme();
  return (
    <SubmitButton theme={theme} type="submit" disabled={busy}>
      <SubmitButtonText>{children}</SubmitButtonText>
      <SubmitButtonFill theme={theme} />
      <SubmitButtonArrow theme={theme}>→</SubmitButtonArrow>
    </SubmitButton>
  );
};

/** Runs an API action with a busy flag and a success/error message. */
const useAction = () => {
  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState<Status>(null);
  const run = async (action: () => Promise<unknown>, success?: string) => {
    setBusy(true);
    setStatus(null);
    try {
      await action();
      if (success) setStatus({ tone: "success", text: success });
    } catch (e) {
      setStatus({ tone: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  return { busy, status, run };
};

const StatusLine: React.FC<{ status: Status }> = ({ status }) => {
  const { theme } = useTheme();
  return status ? (
    <FormStatus theme={theme} $tone={status.tone}>
      {status.text}
    </FormStatus>
  ) : null;
};

const Profile: React.FC = () => {
  const { theme } = useTheme();
  const { user, setUser } = useSession();
  const [profile, setProfile] = React.useState<ProfileData | null>(null);
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [image, setImage] = React.useState("");
  const details = useAction();
  const password = useAction();
  const devices = useAction();

  const loadSessions = React.useCallback(() => account.sessions().then(setSessions), []);

  React.useEffect(() => {
    if (!user) return;
    account.profile().then((p) => {
      setProfile(p);
      setImage(p.image ?? "");
    });
    loadSessions();
  }, [user, loadSessions]);

  if (!user || !profile) {
    return (
      <Page>
        <Shell theme={theme} $wide />
      </Page>
    );
  }

  const saveDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get("name")).trim();
    details.run(async () => {
      const updated = await account.update({ name, image: image.trim() || null });
      setProfile(updated);
      setUser(updated);
    }, "Profile saved.");
  };

  const changePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    password.run(async () => {
      await account.changePassword(String(data.get("current")), String(data.get("next")));
      form.reset();
      await loadSessions(); // the server signs out other devices on password change
    }, "Password changed. Other devices were signed out.");
  };

  return (
    <Page>
      <Shell theme={theme} $wide>
        <Identity>
          <Avatar theme={theme} name={profile.name} image={image.trim() || null} size="5rem" />
          <div style={{ minWidth: 0 }}>
            <h1>{profile.name}</h1>
            <Muted theme={theme}>
              {profile.email} · {profile.emailVerified ? "verified" : "not verified"}
            </Muted>
            <Muted theme={theme}>
              {profile.role} · member since {formatDate(profile.createdAt)}
            </Muted>
          </div>
        </Identity>

        <Section theme={theme}>
          <SectionTitle>Account details</SectionTitle>
          <JoinForm onSubmit={saveDetails}>
            <Field>
              <FieldLabel theme={theme}>Name</FieldLabel>
              <TextInput theme={theme} name="name" required defaultValue={profile.name} autoComplete="name" />
            </Field>
            <Field>
              <FieldLabel theme={theme}>Avatar image URL</FieldLabel>
              <TextInput
                theme={theme}
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://…"
              />
            </Field>
            <Submit busy={details.busy}>Save</Submit>
            <StatusLine status={details.status} />
          </JoinForm>
        </Section>

        <Section theme={theme}>
          <SectionTitle>Change password</SectionTitle>
          <JoinForm onSubmit={changePassword}>
            <Field>
              <FieldLabel theme={theme}>Current password</FieldLabel>
              <TextInput theme={theme} name="current" type="password" required autoComplete="current-password" />
            </Field>
            <Field>
              <FieldLabel theme={theme}>New password</FieldLabel>
              <TextInput theme={theme} name="next" type="password" required autoComplete="new-password" />
            </Field>
            <Submit busy={password.busy}>Change password</Submit>
            <StatusLine status={password.status} />
          </JoinForm>
        </Section>

        <Section theme={theme}>
          <SectionTitle>Signed-in devices</SectionTitle>
          <SessionList>
            {sessions.map((s) => (
              <SessionRow key={s.id}>
                <div style={{ minWidth: 0 }}>
                  <div>{s.current ? "This device" : s.userAgent ?? "Unknown device"}</div>
                  <Muted theme={theme}>
                    {s.ipAddress ?? "unknown IP"} · since {formatDate(s.createdAt)}
                  </Muted>
                </div>
                {s.current ? null : (
                  <LinkButton
                    theme={theme}
                    type="button"
                    disabled={devices.busy}
                    onClick={() => devices.run(() => account.revokeSession(s.id).then(loadSessions))}
                  >
                    Sign out
                  </LinkButton>
                )}
              </SessionRow>
            ))}
          </SessionList>
          {sessions.length > 1 ? (
            <LinkButton
              theme={theme}
              type="button"
              disabled={devices.busy}
              onClick={() => devices.run(() => account.revokeOtherSessions().then(loadSessions))}
            >
              Sign out all other devices
            </LinkButton>
          ) : null}
          <StatusLine status={devices.status} />
        </Section>

        <Section theme={theme}>
          <JoinForm
            onSubmit={(e) => {
              e.preventDefault();
              devices.run(async () => {
                await auth.logout();
                setUser(null);
              });
            }}
          >
            <Submit busy={devices.busy}>Log out</Submit>
          </JoinForm>
        </Section>
      </Shell>
    </Page>
  );
};

export default Profile;
