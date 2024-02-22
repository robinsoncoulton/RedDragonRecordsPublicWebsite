import Home from "../Pages/Home";
// import Contact from "../Pages/Contact";
// import Gallery from "../Pages/Gallery";
// import Portfolio from "../Pages/Portfolio";
// import Error from "../Pages/Error";
import Construction from "../Components/Construction";

export const baseRoutes = [
  {
    path: "/",
    // element: <Construction/>
    element: <Home />,
  },
  {
    path: "About",
    element: <Construction />,
  },
  {
    path: "Contact",
    element: <Construction />,
  },
];
export const routes = [
  ...baseRoutes,
  //   {
  //     path: "*",
  //     element: <Construction />,
  //   },
];
