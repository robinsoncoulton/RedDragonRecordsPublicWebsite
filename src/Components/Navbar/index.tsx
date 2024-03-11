import React from "react";

import { baseRoutes } from "../../Utils/routes";
import Selector from "../Selector";
import { ThemedElementProps } from "../../Theme/types";
import { NonEmptyArray } from "../../types";
import { useNavigate } from "react-router";

const Navbar: React.FC<ThemedElementProps> = ({ theme }) => {
  const navigate = useNavigate();

  const getOptions = (): NonEmptyArray<string> => {
    const routes = baseRoutes.map((route) =>
      route.path === "/"
        ? "Home"
        : route.path.charAt(0).toUpperCase() + route.path.slice(1)
    );

    if (routes.length === 0) throw new Error("no routes found!");
    return routes as NonEmptyArray<string>;
  };

  const clickHandler = (selection: string) => {
    navigate(`/${selection === "Home" ? "" : selection.toLowerCase()}`);
  };

  return (
    <Selector theme={theme} options={getOptions()} onSelect={clickHandler} />
  );
};

export default Navbar;
