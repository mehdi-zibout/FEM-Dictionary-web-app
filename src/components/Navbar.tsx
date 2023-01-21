import type { Dispatch, SetStateAction } from "react";
import DarkModeButton from "./DarkModeButton";
import { Logo } from "./Icons";
import SelectFont from "./SelectFont";

function Navbar({ font, setFont }: NavbarProps) {
  return (
    <div className="flex justify-between items-center">
      <Logo />
      <div className="flex items-center">
        <SelectFont font={font} setFont={setFont} />
        <DarkModeButton />
      </div>
    </div>
  );
}

type NavbarProps = {
  font: "font-sans" | "font-serif" | "font-mono";
  setFont: Dispatch<SetStateAction<"font-sans" | "font-serif" | "font-mono">>;
};

export default Navbar;
