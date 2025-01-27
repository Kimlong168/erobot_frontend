import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Set initial theme based on localStorage, only on the client
  useEffect(() => {
    const savedTheme = localStorage?.getItem("mode");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Add or remove dark mode class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // switch theme
  const handleThemeSwitch = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("mode", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
