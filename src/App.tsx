import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Utils/Theme";
import { baseRoutes } from "./Utils/routes";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Routes>
        {baseRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
