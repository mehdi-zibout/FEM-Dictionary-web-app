import { useState } from "react";
import { Moon } from "./Icons";

function DarkModeButton() {
  const [isLight, setIsLight] = useState(() => getThemeValue());
  return (
    <div className="flex justify-center items-center w-fit">
      <button
        onClick={handleToggleTheme}
        aria-label={`toggle ${isLight ? "dark" : "light"} mode`}
        className={`w-10 h-5 ${
          isLight ? "bg-white-300" : "bg-purple"
        } rounded-full p-[3px] mr-4 block`}
      >
        <div
          className={`bg-white w-3.5 h-3.5 rounded-full ${
            isLight ? "" : "translate-x-5"
          } transition-transform duration-300 `}
        ></div>
      </button>
      <Moon
        className={"-mt-0.5 transition-all duration-1000  "}
        isDark={!isLight}
      />
    </div>
  );

  function getThemeValue() {
    if (!("theme" in localStorage)) {
      const isLight = !window.matchMedia("(prefers-color-scheme: dark)")
        .matches;
      localStorage.setItem("theme", isLight ? "light" : "dark");
      return isLight;
    } else {
      if (localStorage.theme === "dark") return false;
      else return true;
    }
  }

  function handleToggleTheme() {
    setIsLight(!isLight);
    if (isLight) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
}

export default DarkModeButton;
