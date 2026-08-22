import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Utils/Theme";
import { LocalisationProvider } from "./Localisation";
import { appRoutes } from "./Utils/routes";
import PageTracker from "./Analytics/PageTracker";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LocalisationProvider>
        <PageTracker />
        <React.Suspense fallback={null}>
          <Routes>
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </React.Suspense>
      </LocalisationProvider>
    </ThemeProvider>
  );
};

export default App;
