import Home from "../Pages/Home";
import Artists from "../Pages/Artists";
import Contact from "../Pages/Contact";

export const baseRoutes = [
  {
    path: "/home",
    label: "Home",
    element: <Home />,
  },
  {
    path: "/artists",
    label: "Artists",
    element: <Artists />,
  },
  {
    path: "/contact",
    label: "Contact",
    element: <Contact />,
  },
];
