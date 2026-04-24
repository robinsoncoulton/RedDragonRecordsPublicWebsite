import React from "react";
import { PaperTexture } from "@paper-design/shaders-react";
import { useTheme } from "../../Utils/Theme";
import { getColors } from "../../Styles/colors";
import "./posterFrame.css";

const PosterFrame = ({ children }) => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  return (
    <div className="poster-frame">
      <div className="poster-frame__texture" aria-hidden="true">
        <PaperTexture
          colorBack={colors.background}
          colorFront={colors.backgroundAccent}
          contrast={0.12}
          roughness={1}
          fiber={0.05}
          fiberSize={0.01}
          crumples={0}
          crumpleSize={0.01}
          folds={0}
          foldCount={1}
          drops={0}
          fade={0}
          seed={0}
          scale={0.5}
          fit="cover"
        />
      </div>
      <div className="poster-frame__inner">
        <div className="poster-frame__content">{children}</div>
      </div>
    </div>
  );
};

export default PosterFrame;
