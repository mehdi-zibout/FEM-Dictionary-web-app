import { useEffect } from "react";
import DarkModeButton from "./components/DarkModeButton";
import PlayButton from "./components/PlayButton";

function App() {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <main className="transition-colors duration-500 bg-white dark:bg-black min-h-screen text-white text-hl font-mono">
      Hello World!
      <PlayButton />
      <DarkModeButton />
    </main>
  );
}

export default App;
