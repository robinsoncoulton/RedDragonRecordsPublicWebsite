import { useLocation, useNavigate } from "react-router-dom";
import { isPortalPath, mainNavItems, portalNavItems } from "../../Utils/routes";
import { NonEmptyArray } from "../../types";
import { isStaff, useSession } from "../../Api/session";

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSession();
  const items = isPortalPath(location.pathname)
    ? portalNavItems.filter((item) => !item.staffOnly || isStaff(user))
    : mainNavItems;
  const options = items.map((item) => item.label) as NonEmptyArray<string>;
  const selectedOption =
    items.find((item) => item.matches(location.pathname))?.label ?? items[0].label;

  const onSelect = (selection: string) => {
    const item = items.find((i) => i.label === selection);
    if (!item) return;
    if (item.matches(location.pathname)) return;
    navigate(item.path);
  };

  return { options, selectedOption, onSelect };
};
