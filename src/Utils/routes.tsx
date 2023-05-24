
import Home from '../Pages/Home';
import Contact from "../Pages/Contact";
import Gallery from "../Pages/Gallery";
import Portfolio from "../Pages/Portfolio";
import Error from "../Pages/Error";

export const baseRoutes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: 'Gallery',
        element: <Gallery/>
    },
    {
        path: 'Portfolio',
        element: <Portfolio/>
    },
    {
        path: 'Contact',
        element: <Contact/>
    },
]
export const routes = [
    ...baseRoutes,
    {
        path: '*',
        element: <Error/>
    },
]

