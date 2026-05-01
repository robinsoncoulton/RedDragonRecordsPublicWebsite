import { useLocation, useNavigate } from "react-router-dom";
import { baseRoutes } from "../../Utils/routes";
import { NonEmptyArray } from "../../types";

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const options = baseRoutes.map((route) => route.label) as NonEmptyArray<string>;
  const selectedOption =
    baseRoutes.find((route) => route.path === location.pathname)?.label ??
    baseRoutes[0].label;

  const onSelect = (selection: string) => {
    if (selection === "Contact") {
      window.location.assign("mailto:contact@reddragonrecords.tw");
      return;
    }
    const nextPath = baseRoutes.find((route) => route.label === selection)?.path;
    if (!nextPath || nextPath === location.pathname) return;
    navigate(nextPath);
  };

  return { options, selectedOption, onSelect };
};
