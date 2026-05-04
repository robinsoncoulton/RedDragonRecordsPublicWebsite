import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Utils/Theme";
import { appRoutes } from "./Utils/routes";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
