const hexToRgb = (hex: string, opacity?: string): string => {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b}${opacity ? ", " + opacity : ""})`;
};

export default hexToRgb;
