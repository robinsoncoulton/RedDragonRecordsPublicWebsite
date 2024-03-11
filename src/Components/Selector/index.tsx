/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Option } from "./styles";
import { SelectorProps } from "./types";

const Selector: React.FC<SelectorProps> = ({ theme, options, onSelect }) => {
  const [selected, setSelected] = useState<string>(options[0]);

  const clickHandler = (option: string) => {
    setSelected(option);
  };

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <>
      <Container theme={theme}>
        {options.map((option) => (
          <Option
            theme={theme}
            selected={selected === option}
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
