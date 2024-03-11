import React from "react";
import { ThemeToggleProps } from "./types";
import { Container, Sun, Moon } from "./styles";

const ThemeToggle: React.FC<ThemeToggleProps> = ({ handleClick, theme }) => {
  const clickHandler = () => {
    console.log("handling click... ", theme);
    handleClick();
  };

  return (
    <Container onClick={() => clickHandler()} theme={theme}>
      <Sun theme={theme} />
      <Moon theme={theme} />
    </Container>
  );
};

export default ThemeToggle;
