import React from "react";
import { Navigate } from "react-router-dom";
import Page from "../Components/Page";
import { auth, AuthUser } from "./portal";

type SessionContextType = {
  /** undefined while the first /auth/me is in flight, null when signed out. */
  user: AuthUser | null | undefined;
  setUser: (user: AuthUser | null) => void;
};

const SessionContext = React.createContext<SessionContextType>({
  user: undefined,
  setUser: () => {},
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<AuthUser | null | undefined>(undefined);
  React.useEffect(() => {
    // An unreachable API just shows the site as signed out.
    auth.me().then(setUser, () => setUser(null));
  }, []);
  return (
    <SessionContext.Provider value={{ user, setUser }}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => React.useContext(SessionContext);

export const isStaff = (user: AuthUser | null | undefined) =>
  user?.role === "admin" || user?.role === "staff";

/** Portal pages: render only for a signed-in user (and only staff when `staff`), else redirect. */
export const RequireSession: React.FC<{ children: React.ReactNode; staff?: boolean }> = ({
  children,
  staff,
}) => {
  const { user } = useSession();
  if (user === null) return <Navigate to="/login" replace />;
  if (user && staff && !isStaff(user)) return <Navigate to="/portal" replace />;
  return user ? <>{children}</> : <Page />;
};

/** /portal lands staff on their clients and everyone else on their songs. */
export const PortalHome: React.FC = () => {
  const { user } = useSession();
  return (
    <RequireSession>
      <Navigate to={isStaff(user) ? "/portal/clients" : "/portal/songs"} replace />
    </RequireSession>
  );
};
