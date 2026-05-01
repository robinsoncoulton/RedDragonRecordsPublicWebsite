import React from "react";
import { Container, Title } from "./styles";
import { ThemedElementProps } from "../../Utils/Theme/types";

const TitleBadge: React.FC<ThemedElementProps> = ({ theme }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;
    const syncScale = () => {
      const widthRatio = container.clientWidth / title.scrollWidth;
      const heightRatio = container.clientHeight / title.scrollHeight;
      const nextScale = Math.max(Math.min(widthRatio, heightRatio), 0);
      setScale((prev) => (Math.abs(prev - nextScale) < 0.001 ? prev : nextScale));
    };
    syncScale();
    const ro = new ResizeObserver(syncScale);
    ro.observe(container);
    ro.observe(title);
    window.addEventListener("resize", syncScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncScale);
    };
  }, []);

  return (
    <Container ref={containerRef} theme={theme}>
      <Title ref={titleRef} theme={theme} style={{ transform: `scale(${scale})` }}>
        Red Dragon Records
      </Title>
    </Container>
  );
};

export default TitleBadge;
