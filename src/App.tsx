import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./Utils/routes";
import { ThemeProvider } from "./Theme";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
