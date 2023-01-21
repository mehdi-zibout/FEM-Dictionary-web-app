import { useEffect } from "react";
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
    <div className="bg-white min-h-screen text-white text-hl font-mono">
      Hello World!
      <PlayButton />
    </div>
  );
}

export default App;
