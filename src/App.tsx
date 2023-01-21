import { useEffect, useState } from "react";
import DarkModeButton from "./components/DarkModeButton";
import Navbar from "./components/Navbar";
import PlayButton from "./components/PlayButton";
import SearchInput from "./components/SearchInput";
import SelectFont from "./components/SelectFont";

function App() {
  const [font, setFont] = useState<"font-sans" | "font-serif" | "font-mono">(
    () => {
      const localFont = localStorage.font as string;
      if (
        localFont === "font-sans" ||
        localFont === "font-serif" ||
        localFont === "font-mono"
      ) {
        return localFont;
      } else {
        localStorage.setItem("font", "font-sans");
        return "font-sans";
      }
    }
  );
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
    const localFont = localStorage.font;
    if (
      localFont === "sans serif" ||
      localFont === "serif" ||
      localFont === "mono"
    ) {
      setFont(localFont);
    }
  }, []);
  return (
    <main
      className={
        "transition-colors    py-14 tablet:px-10 px-6  duration-500 bg-white dark:bg-black min-h-screen text-black-200 dark:text-white " +
        font
      }
    >
      <div className="desktop:w-[46.06rem] mx-auto w-full">
        <Navbar font={font} setFont={setFont} />
        {/* Hello World!
        <PlayButton />
        <DarkModeButton />
        <div className="p-6">
          <SearchInput />
        </div>
        <div className="p-6">
          <SearchInput error />
        </div>
        <div className="p-5">
          <SelectFont font={font} setFont={setFont} />
        </div> */}
      </div>
    </main>
  );
}

export default App;
