import React from "react";
import { Link } from "react-router-dom";
import { baseRoutes } from "../../Utils/routes";
import { StyledNav } from "./styles";

const Navbar: React.FC = () => {
  return (
    <StyledNav>
      {baseRoutes.map((route) => (
        <Link key={route.path} to={route.path}>
          {route.path === "/"
            ? "Home"
            : route.path.charAt(0).toUpperCase() + route.path.slice(1)}
        </Link>
      ))}
    </StyledNav>
  );
};

export default Navbar;
