import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Highlight, Option } from "./styles";
import { SelectorProps } from "./types";

const Selector: React.FC<SelectorProps> = ({
  theme,
  options,
  selectedOption,
  onSelect,
}) => {
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [highlightPosition, setHighlightPosition] = useState({ left: 0, width: 0 });

  const updateHighlight = useCallback(() => {
    const selectedElement = optionRefs.current[selectedOption];
    if (!selectedElement) return;
    setHighlightPosition({
      left: selectedElement.offsetLeft,
      width: selectedElement.offsetWidth,
    });
  }, [selectedOption]);

  const clickHandler = (option: string) => {
    onSelect(option);
  };

  useEffect(() => {
    updateHighlight();
  }, [selectedOption, options, updateHighlight]);

  useEffect(() => {
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [updateHighlight]);

  return (
    <>
      <Container theme={theme}>
        <Highlight
          theme={theme}
          left={highlightPosition.left}
          width={highlightPosition.width}
        />
        {options.map((option) => (
          <Option
            key={option}
            ref={(ref) => {
              optionRefs.current[option] = ref;
            }}
            theme={theme}
            selected={selectedOption === option}
            onClick={() => clickHandler(option)}
          >
            {option}
          </Option>
        ))}
      </Container>
    </>
  );
};

export default Selector;
