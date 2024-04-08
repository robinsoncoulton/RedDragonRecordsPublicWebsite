import React, { useState } from "react";
import { routes } from "./Utils/routes";
import { ThemeProvider } from "./Theme";

const App: React.FC = () => {
  const [page] = useState(routes[0]);

  return (
    <React.StrictMode>
      <ThemeProvider>{page.element}</ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
