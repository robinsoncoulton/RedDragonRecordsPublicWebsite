import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { designTokens } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { Theme, ThemedElementProps } from "../../Utils/Theme/types";
import { useSession } from "../../Api/session";
import Avatar from "../Avatar";

const Button = styled.button<ThemedElementProps>`
  display: inline-flex;
  align-items: center;
  gap: ${designTokens.spacing.sm};
  background: transparent;
  border: 0;
  padding: ${designTokens.spacing.xs} 0;
  color: ${({ theme }) => getColors(theme).text};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.compact};
  white-space: nowrap;
  cursor: pointer;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.regular} solid
      ${({ theme }) => getColors(theme).accent};
    outline-offset: 2px;
  }
`;

/** "Log in" when signed out, avatar + "Profile" when signed in. */
const AccountButton: React.FC<{ theme: Theme; onNavigate?: () => void }> = ({
  theme,
  onNavigate,
}) => {
  const { user } = useSession();
  const navigate = useNavigate();
  // Render nothing until the session check finishes, so it doesn't flash "Log in".
  if (user === undefined) return null;
  const go = (path: string) => {
    navigate(path);
    onNavigate?.();
  };
  return user ? (
    <Button theme={theme} type="button" onClick={() => go("/portal/profile")}>
      <Avatar theme={theme} name={user.name} image={user.image} />
      Profile
    </Button>
  ) : (
    <Button theme={theme} type="button" onClick={() => go("/login")}>
      Log in
    </Button>
  );
};

export default AccountButton;
