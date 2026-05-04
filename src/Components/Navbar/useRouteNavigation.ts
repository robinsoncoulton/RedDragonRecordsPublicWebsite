import { useLocation, useNavigate } from "react-router-dom";
import { mainNavItems, mainNavLabels } from "../../Utils/routes";
import { NonEmptyArray } from "../../types";

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const options = mainNavLabels as NonEmptyArray<string>;
  const selectedOption =
    mainNavItems.find((item) => item.matches(location.pathname))?.label ??
    mainNavItems[0].label;

  const onSelect = (selection: string) => {
    const item = mainNavItems.find((i) => i.label === selection);
    if (!item) return;
    if (item.matches(location.pathname)) return;
    navigate(item.path);
  };

  return { options, selectedOption, onSelect };
};
