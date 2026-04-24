import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { baseRoutes } from "../../Utils/routes";
import Selector from "../Selector";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { NonEmptyArray } from "../../types";

const Navbar: React.FC<ThemedElementProps> = ({ theme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getOptions = (): NonEmptyArray<string> => {
    if (baseRoutes.length === 0) throw new Error("no routes found!");
    return baseRoutes.map((route) => route.label) as NonEmptyArray<string>;
  };

  const selectedOption =
    baseRoutes.find((route) => route.path === location.pathname)?.label ??
    baseRoutes[0].label;

  const clickHandler = (selection: string) => {
    const nextPath = baseRoutes.find((route) => route.label === selection)?.path;
    if (!nextPath || nextPath === location.pathname) return;
    navigate(nextPath);
  };

  return (
    <Selector
      theme={theme}
      options={getOptions()}
      selectedOption={selectedOption}
      onSelect={clickHandler}
    />
  );
};

export default Navbar;
