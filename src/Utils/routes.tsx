import React from "react";
import { Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import { NonEmptyArray } from "../types";

const Artists = React.lazy(() => import("../Pages/Artists"));
const Contact = React.lazy(() => import("../Pages/Contact"));
const Equipment = React.lazy(() => import("../Pages/Equipment"));
const Join = React.lazy(() => import("../Pages/Join"));
const Privacy = React.lazy(() => import("../Pages/Privacy"));
const BlankPage = React.lazy(() => import("../Pages/BlankPage"));

export type MainNavItem = {
  label: string;
  path: string;
  matches: (pathname: string) => boolean;
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

export const mainNavLabels = mainNavItems.map(
  (item) => item.label
) as NonEmptyArray<string>;

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
];
