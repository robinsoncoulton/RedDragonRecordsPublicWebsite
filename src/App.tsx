import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Utils/Theme";
import { LocalisationProvider } from "./Localisation";
import { appRoutes } from "./Utils/routes";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LocalisationProvider>
        <Routes>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </LocalisationProvider>
    </ThemeProvider>
  );
};

export default App;
