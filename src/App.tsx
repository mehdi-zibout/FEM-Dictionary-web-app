import { useEffect } from "react";
import DarkModeButton from "./components/DarkModeButton";
import PlayButton from "./components/PlayButton";
import SearchInput from "./components/SearchInput";

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
    <main className="transition-colors duration-500 bg-white dark:bg-black min-h-screen text-white ">
      Hello World!
      <PlayButton />
      <DarkModeButton />
      <div className="p-6">
        <SearchInput />
      </div>
      <div className="p-6">
        <SearchInput error />
      </div>
    </main>
  );
}

export default App;
