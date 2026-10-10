import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Page from "../../Components/Page";
import { useTheme } from "../../Utils/Theme";
import { auth, invitations } from "../../Api/portal";
import { useSession } from "../../Api/session";
import { forgetPendingInvite, rememberPendingInvite } from "../../Api/pendingInvite";
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
import { Shell } from "../Login/styles";

type Invite = Awaited<ReturnType<typeof invitations.lookup>>;
type Status = { tone: "success" | "error"; text: string } | null;

const Invitation: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useSession();
  const navigate = useNavigate();
  const token = useSearchParams()[0].get("token") ?? "";
  const [invite, setInvite] = React.useState<Invite | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [status, setStatus] = React.useState<Status>(null);

  React.useEffect(() => {
    invitations.lookup(token).then(setInvite, (e: Error) => setStatus({ tone: "error", text: e.message }));
    // So logging in later (after verifying email) can finish accepting.
    rememberPendingInvite(token);
  }, [token]);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setStatus(null);
    try {
      await action();
    } catch (e) {
      setStatus({ tone: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const register = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    run(async () => {
      await auth.register(String(form.get("name")), invite!.email, String(form.get("password")));
      setRegistered(true);
    });
  };

  const accept = () =>
    run(async () => {
      await invitations.accept(token);
      forgetPendingInvite();
      navigate("/portal");
    });

  const submit = (label: string) => (
    <SubmitButton theme={theme} type="submit" disabled={busy}>
      <SubmitButtonText>{label}</SubmitButtonText>
      <SubmitButtonFill theme={theme} />
      <SubmitButtonArrow theme={theme}>→</SubmitButtonArrow>
    </SubmitButton>
  );

  const body = () => {
    if (!invite || user === undefined) return null;
    if (invite.status !== "pending") {
      return <p>This invitation is {invite.status}. Ask Red Dragon Records to send a new one.</p>;
    }
    if (user) {
      return user.email.toLowerCase() === invite.email.toLowerCase() ? (
        <JoinForm onSubmit={(e) => { e.preventDefault(); accept(); }}>
          {submit(`Join ${invite.organisationName}`)}
        </JoinForm>
      ) : (
        <p>
          You're signed in as {user.email}, but this invitation is for {invite.email}. Log out and
          sign in with that address.
        </p>
      );
    }
    if (registered) {
      return (
        <p>
          Nearly there. We've emailed {invite.email} a link to confirm the address. Open it, then{" "}
          <Link to="/login">log in</Link> and you'll be added to {invite.organisationName}.
        </p>
      );
    }
    return (
      <JoinForm onSubmit={register}>
        <Field>
          <FieldLabel theme={theme}>Email</FieldLabel>
          <TextInput theme={theme} value={invite.email} readOnly autoComplete="email" />
        </Field>
        <Field>
          <FieldLabel theme={theme}>Your name</FieldLabel>
          <TextInput theme={theme} name="name" required autoComplete="name" />
        </Field>
        <Field>
          <FieldLabel theme={theme}>Choose a password</FieldLabel>
          <TextInput theme={theme} name="password" type="password" required autoComplete="new-password" />
        </Field>
        {submit("Create account")}
        <p style={{ textAlign: "center", margin: 0 }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </JoinForm>
    );
  };

  return (
    <Page>
      <Shell theme={theme}>
        {invite ? (
          <h1 style={{ marginTop: 0 }}>You're invited to {invite.organisationName}</h1>
        ) : null}
        {body()}
        {status ? (
          <FormStatus theme={theme} $tone={status.tone}>
            {status.text}
          </FormStatus>
        ) : null}
      </Shell>
    </Page>
  );
};

export default Invitation;
