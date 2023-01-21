import { useEffect } from "react";

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
    <div className="bg-white dark:bg-black min-h-screen text-white text-hl font-mono">
      Hello World!
    </div>
  );
}

export default App;
