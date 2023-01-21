import { useState } from "react";
import type { SetStateAction, Dispatch } from "react";
import { IconArrowDown } from "./Icons";

function SelectFont({ font, setFont }: SelectFontProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex justify-center items-center"
        aria-label="change font"
      >
        <h5 className="mr-[1.125rem] text-bodym">
          {font === "font-mono"
            ? "Mono"
            : font === "font-sans"
            ? "Sans Serif"
            : "Serif"}
        </h5>
        <IconArrowDown className="mt-0.5" />
      </button>
      {showDropdown && (
        <ul className="absolute top-10 -left-10 p-6 rounded-2xl text-bodym  dark:bg-black-100 bg-white shadow-[0px_5px_30px_rgba(0,0,0,0.1)] dark:shadow-[0px_5px_30px_rgb(164,69,237)] w-fit">
          <li className="font-sans hover:text-purple">
            <button onClick={() => handleChangeFont("font-sans")}>
              Sans Serif
            </button>
          </li>
          <li className="font-serif py-4 hover:text-purple ">
            <button onClick={() => handleChangeFont("font-serif")}>
              Serif
            </button>
          </li>
          <li className="font-mono hover:text-purple">
            <button onClick={() => handleChangeFont("font-mono")}>Mono</button>
          </li>
        </ul>
      )}
    </div>
  );
  function handleChangeFont(font: "font-sans" | "font-serif" | "font-mono") {
    localStorage.setItem("font", font);
    setFont(font);
  }
}

type SelectFontProps = {
  font: "font-sans" | "font-serif" | "font-mono";
  setFont: Dispatch<SetStateAction<"font-sans" | "font-serif" | "font-mono">>;
};

export default SelectFont;
