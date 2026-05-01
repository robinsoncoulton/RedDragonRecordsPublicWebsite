import React from "react";

import Selector from "../Selector";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { useRouteNavigation } from "./useRouteNavigation";

const Navbar: React.FC<ThemedElementProps> = ({ theme }) => {
  const { options, selectedOption, onSelect } = useRouteNavigation();

  return (
    <Selector
      theme={theme}
      options={options}
      selectedOption={selectedOption}
      onSelect={onSelect}
    />
  );
};

export default Navbar;
