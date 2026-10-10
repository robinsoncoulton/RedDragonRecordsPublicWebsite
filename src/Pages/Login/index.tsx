import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Page from "../../Components/Page";
import { useTheme } from "../../Utils/Theme";
import { auth } from "../../Api/portal";
import { useSession } from "../../Api/session";
import { acceptPendingInvite } from "../../Api/pendingInvite";
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
import { Shell } from "./styles";

type Status = { tone: "success" | "error"; text: string } | null;

// Accounts are created only from an invitation (see Pages/Invitation).
const Login: React.FC = () => {
  const { theme } = useTheme();
  const { user, setUser } = useSession();
  const [params] = useSearchParams();
  const token = params.get("token");
  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState<Status>(null);

  React.useEffect(() => {
    // /verify-email?token=… lands here from the verification email.
    if (!token) return;
    auth.verifyEmail(token).then(
      () => setStatus({ tone: "success", text: "Email verified. You can log in now." }),
      (e: Error) => setStatus({ tone: "error", text: e.message })
    );
  }, [token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setStatus(null);
    try {
      const signedIn = await auth.login(String(form.get("email")), String(form.get("password")));
      await acceptPendingInvite();
      setUser(signedIn);
    } catch (e) {
      setStatus({ tone: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  if (user) return <Navigate to="/portal" replace />;

  return (
    <Page>
      <Shell theme={theme}>
        <JoinForm onSubmit={handleSubmit}>
          <Field>
            <FieldLabel theme={theme}>Email</FieldLabel>
            <TextInput theme={theme} name="email" type="email" required autoComplete="email" />
          </Field>
          <Field>
            <FieldLabel theme={theme}>Password</FieldLabel>
            <TextInput theme={theme} name="password" type="password" required autoComplete="current-password" />
          </Field>
          <SubmitButton theme={theme} type="submit" disabled={busy}>
            <SubmitButtonText>Log in</SubmitButtonText>
            <SubmitButtonFill theme={theme} />
            <SubmitButtonArrow theme={theme}>→</SubmitButtonArrow>
          </SubmitButton>
        </JoinForm>
        {status ? (
          <FormStatus theme={theme} $tone={status.tone}>
            {status.text}
          </FormStatus>
        ) : null}
      </Shell>
    </Page>
  );
};

export default Login;
