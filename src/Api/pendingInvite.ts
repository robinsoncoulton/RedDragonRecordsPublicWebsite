import { invitations } from "./portal";

// Lets an invite survive the email-verification detour: saved on the invite
// page, accepted on the next login. Browser storage is only a convenience here;
// if it's lost, the invite link still works once signed in.
const KEY = "rdr.pendingInvite";

export const rememberPendingInvite = (token: string) => {
  try {
    localStorage.setItem(KEY, token);
  } catch {}
};

export const forgetPendingInvite = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {}
};

/** Accepts a saved invite, if any. A failure is ignored: the link still works. */
export const acceptPendingInvite = async () => {
  let token: string | null = null;
  try {
    token = localStorage.getItem(KEY);
  } catch {}
  if (!token) return;
  await invitations.accept(token).catch(() => {});
  forgetPendingInvite();
};
