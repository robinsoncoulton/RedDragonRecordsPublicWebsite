export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface ThemedElementProps {
  theme: Theme;
}
