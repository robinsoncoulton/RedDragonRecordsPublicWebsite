import React from "react";
import styled from "styled-components";
import { designTokens } from "../../DesignSystem";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { getColors } from "../../Styles/colors";
import { Theme } from "../../Utils/Theme/types";

const Circle = styled.span<ThemedElementProps & { $size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: ${designTokens.radius.round};
  overflow: hidden;
  background: ${({ theme }) => getColors(theme).surfaceMuted};
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
  color: ${({ theme }) => getColors(theme).text};
  font-family: var(--font-body);
  font-size: calc(${({ $size }) => $size} * 0.4);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type AvatarProps = {
  theme: Theme;
  name: string;
  image: string | null;
  size?: string;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const Avatar: React.FC<AvatarProps> = ({ theme, name, image, size = designTokens.size.controlSm }) => {
  const [broken, setBroken] = React.useState(false);
  React.useEffect(() => setBroken(false), [image]);
  return (
    <Circle theme={theme} $size={size} aria-hidden>
      {image && !broken ? (
        <img src={image} alt="" onError={() => setBroken(true)} />
      ) : (
        initials(name)
      )}
    </Circle>
  );
};

export default Avatar;
