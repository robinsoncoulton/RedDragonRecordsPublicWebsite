import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { designTokens } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { useTheme } from "../../Utils/Theme";
import { ThemedElementProps } from "../../Utils/Theme/types";

const STAGGER_MS = 45;
const MAX_STAGGERED = 20;
const EXIT_MS = 380;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(48px); }
  to { opacity: 1; transform: none; }
`;

/** Detail pages enter from the right, where the index swept away to the left. */
export const SlideIn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.xl};
  animation: ${slideIn} 450ms ${designTokens.easing.out} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/** Pass as navigate state so a detail page's back link returns to where it was opened from. */
export type BackState = { backTo?: string; backLabel?: string };

export const PortalTitle = styled.h1`
  margin: 0 0 ${designTokens.spacing.xl};
  font-size: ${designTokens.fontSize["3xl"]};
  overflow-wrap: anywhere;
`;

export const SectionTitle = styled.h2`
  margin: ${designTokens.spacing.xxl} 0 ${designTokens.spacing.md};
  font-size: ${designTokens.fontSize.xl};
`;

export const Meta = styled.span<ThemedElementProps>`
  display: block;
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.sm};
  overflow-wrap: anywhere;
`;

export const Sweep = styled.div<{ $leaving: boolean }>`
  transition: transform ${EXIT_MS}ms ${designTokens.easing.in},
    opacity ${EXIT_MS}ms ${designTokens.easing.in};
  ${({ $leaving }) =>
    $leaving &&
    css`
      transform: translateX(-35%);
      opacity: 0;
      pointer-events: none;
    `}
`;

/** `go(path)` sweeps the <Sweep {...sweepProps}> wrapper left and fades it out, then navigates. */
export const useSweep = () => {
  const navigate = useNavigate();
  const [target, setTarget] = React.useState<{ path: string; state?: BackState } | null>(null);
  const go = (path: string, state?: BackState) => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) navigate(path, { state });
    else setTarget({ path, state });
  };
  const sweepProps = {
    $leaving: target !== null,
    onTransitionEnd: (e: React.TransitionEvent<HTMLDivElement>) => {
      // Two properties transition; navigate once.
      if (e.target === e.currentTarget && e.propertyName === "opacity" && target) navigate(target.path, { state: target.state });
    },
  };
  return { go, sweepProps };
};

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Row = styled.li<ThemedElementProps & { $index: number }>`
  border-bottom: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
  animation: ${fadeUp} 420ms ${designTokens.easing.out} both;
  animation-delay: ${({ $index }) => Math.min($index, MAX_STAGGERED) * STAGGER_MS}ms;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const RowButton = styled.button<ThemedElementProps>`
  width: 100%;
  display: grid;
  grid-template-columns: 2.5ch 1fr auto;
  align-items: baseline;
  gap: ${designTokens.spacing.lg};
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.md};
  background: none;
  border: 0;
  font: inherit;
  text-align: left;
  color: ${({ theme }) => getColors(theme).text};
  cursor: pointer;
  transition: background ${designTokens.duration.fast} ${designTokens.easing.standard},
    padding-left ${designTokens.duration.fast} ${designTokens.easing.standard};

  &:hover {
    background: ${({ theme }) => getColors(theme).surfaceMuted};
    padding-left: ${designTokens.spacing.lg};
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.regular} solid
      ${({ theme }) => getColors(theme).accent};
    outline-offset: -2px;
  }
`;

const Letter = styled.span<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.sm};
`;

const Name = styled.span`
  min-width: 0;
  font-size: ${designTokens.fontSize.xl};
  overflow-wrap: anywhere;
`;

export type IndexItem = { id: string; title: string; meta?: string; aside?: string };

/** A–Z index whose rows fade in one after another. Items must already be sorted. */
export const IndexList: React.FC<{
  items: IndexItem[] | null;
  empty: string;
  onOpen: (item: IndexItem) => void;
}> = ({ items, empty, onOpen }) => {
  const { theme } = useTheme();
  if (items === null) return <Meta theme={theme}>Loading…</Meta>;
  if (items.length === 0) return <Meta theme={theme}>{empty}</Meta>;
  return (
    <List>
      {items.map((item, i) => {
        // Show the initial only on the first item of each letter, like an index.
        const letter = item.title.charAt(0).toUpperCase();
        const showLetter = i === 0 || items[i - 1].title.charAt(0).toUpperCase() !== letter;
        return (
          <Row key={item.id} theme={theme} $index={i}>
            <RowButton theme={theme} type="button" onClick={() => onOpen(item)}>
              <Letter theme={theme} aria-hidden>
                {showLetter ? letter : ""}
              </Letter>
              <Name>
                {item.title}
                {item.meta ? <Meta theme={theme}>{item.meta}</Meta> : null}
              </Name>
              <Meta theme={theme}>{item.aside ?? ""}</Meta>
            </RowButton>
          </Row>
        );
      })}
    </List>
  );
};
