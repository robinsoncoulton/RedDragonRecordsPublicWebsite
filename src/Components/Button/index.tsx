import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({ handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
);

export default Button;
