import React from "react";
import { Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import { PortalHome, RequireSession } from "../Api/session";

const Artists = React.lazy(() => import("../Pages/Artists"));
const Contact = React.lazy(() => import("../Pages/Contact"));
const Equipment = React.lazy(() => import("../Pages/Equipment"));
const Join = React.lazy(() => import("../Pages/Join"));
const Privacy = React.lazy(() => import("../Pages/Privacy"));
const BlankPage = React.lazy(() => import("../Pages/BlankPage"));
const Login = React.lazy(() => import("../Pages/Login"));
const Profile = React.lazy(() => import("../Pages/Profile"));
const Songs = React.lazy(() => import("../Pages/Portal/Songs"));
const SongDetail = React.lazy(() => import("../Pages/Portal/Songs/SongDetail"));
const Clients = React.lazy(() => import("../Pages/Portal/Clients"));
const ClientDetail = React.lazy(() => import("../Pages/Portal/Clients/ClientDetail"));
const Invitation = React.lazy(() => import("../Pages/Invitation"));

export type MainNavItem = {
  label: string;
  path: string;
  matches: (pathname: string) => boolean;
  staffOnly?: boolean;
};

export const mainNavItems: MainNavItem[] = [
  {
    label: "Home",
    path: "/home",
    matches: (pathname) => pathname === "/" || pathname === "/home",
  },
  {
    label: "Studio",
    path: "/studio",
    matches: (pathname) =>
      pathname === "/studio" || pathname.startsWith("/studio/"),
  },
  {
    label: "Artists",
    path: "/artists",
    matches: (pathname) => pathname === "/artists",
  },
  {
    label: "Join",
    path: "/join",
    matches: (pathname) => pathname === "/join",
  },
];

/** Header nav inside the signed-in portal (/portal/*). */
export const portalNavItems: MainNavItem[] = [
  {
    label: "Clients",
    path: "/portal/clients",
    matches: (pathname) => pathname.startsWith("/portal/clients"),
    staffOnly: true,
  },
  {
    label: "Songs",
    path: "/portal/songs",
    matches: (pathname) => pathname.startsWith("/portal/songs"),
  },
];

export const isPortalPath = (pathname: string) => pathname.startsWith("/portal");

export const appRoutes: { path: string; element: React.ReactNode }[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/studio", element: <BlankPage /> },
  { path: "/studio/about", element: <BlankPage /> },
  { path: "/studio/equipment", element: <Equipment /> },
  { path: "/artists", element: <Artists /> },
  { path: "/join", element: <Join /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/equipment", element: <Navigate to="/studio/equipment" replace /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/verify-email", element: <Login /> },
  { path: "/profile", element: <Navigate to="/portal/profile" replace /> },
  { path: "/invitations", element: <Invitation /> },
  { path: "/portal", element: <PortalHome /> },
  { path: "/portal/clients", element: <RequireSession staff><Clients /></RequireSession> },
  { path: "/portal/clients/:clientId", element: <RequireSession staff><ClientDetail /></RequireSession> },
  { path: "/portal/songs", element: <RequireSession><Songs /></RequireSession> },
  { path: "/portal/songs/:songId", element: <RequireSession><SongDetail /></RequireSession> },
  { path: "/portal/profile", element: <RequireSession><Profile /></RequireSession> },
];
