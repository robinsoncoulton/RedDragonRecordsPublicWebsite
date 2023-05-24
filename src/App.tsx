import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";  
import { routes } from './Utils/routes'

const App: React.FC = () => {
  
return (
    <React.StrictMode>
        <RouterProvider router={createBrowserRouter(routes)} />
    </React.StrictMode>
    )
}

export default App