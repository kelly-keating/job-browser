import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const DarkModeContext = createContext<{
  isDark: boolean;
  toggle: () => void;
}>({
  isDark: true,
  toggle: () => {},
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    window.api.getSettings().then((settings) => {
      setIsDark(settings.darkMode);
    });
  }, []);

  const toggle = () => {
    const newState = !isDark;
    setIsDark(newState);
    window.api.saveSettings({ darkMode: newState });
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
