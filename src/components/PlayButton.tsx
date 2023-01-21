import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IconPlay } from "./Icons";

function PlayButton({
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      aria-label="play sound"
      className={
        "group w-[4.69rem] h-[4.69rem] bg-purple bg-opacity-25 hover:bg-opacity-100 rounded-full transition duration-200" +
        (className || "")
      }
      {...props}
    >
      <IconPlay className="fill-purple group-hover:fill-white  transition-all duration-200" />
    </button>
  );
}

export default PlayButton;
