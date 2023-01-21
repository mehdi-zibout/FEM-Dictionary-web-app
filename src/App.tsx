import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DarkModeButton from "./components/DarkModeButton";
import Definition from "./components/Definition";
import Navbar from "./components/Navbar";
import PlayButton from "./components/PlayButton";
import SearchInput from "./components/SearchInput";
import SelectFont from "./components/SelectFont";

const data = {
  word: "keyboard",
  phonetic: "/ˈkiːbɔːd/",
  phonetics: [
    {
      text: "/ˈkiːbɔːd/",
      audio: "",
    },
    {
      text: "/ˈkiːbɔːd/",
      audio: "",
    },
    {
      text: "/ˈkibɔɹd/",
      audio:
        "https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3",
      sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=1755168",
      license: {
        name: "BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
    },
  ],
  meanings: [
    {
      partOfSpeech: "noun",
      definitions: [
        {
          definition:
            "(etc.) A set of keys used to operate a typewriter, computer etc.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.",
          synonyms: [],
          antonyms: [],
        },
      ],
      synonyms: ["electronic keyboard"],
      antonyms: [],
    },
    {
      partOfSpeech: "verb",
      definitions: [
        {
          definition: "To type on a computer keyboard.",
          synonyms: [],
          antonyms: [],
          example: "Keyboarding is the part of this job I hate the most.",
        },
      ],
      synonyms: [],
      antonyms: [],
    },
  ],
  license: {
    name: "CC BY-SA 3.0",
    url: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  sourceUrls: ["https://en.wiktionary.org/wiki/keyboard"],
};

function App() {
  const [searchFor, setSearchFor] = useState("keyboard");
  const [showNoResults, setShowNoResults] = useState(false);
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
        return "font-serif";
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
        "transition-colors py-14 tablet:px-10 px-6  duration-500 bg-white dark:bg-black min-h-screen text-black-200 dark:text-white " +
        font
      }
    >
      <h1 className="hidden">Search for any word</h1>
      <div className="desktop:w-[46.06rem] mx-auto w-full">
        <Navbar font={font} setFont={setFont} />
        <SearchInput
          setShowNoResults={setShowNoResults}
          searchFor={searchFor}
          setSearchFor={setSearchFor}
        />

        {searchFor && (
          <Definition
            setDidntFindIt={setShowNoResults}
            setSearchFor={setSearchFor}
            searchFor={searchFor}
          />
        )}
        {showNoResults && (
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[64px]">😕</h3>
            <h1 className="text-black-200 dark:text-white  text-hs mb-6 mt-11">
              No Definitions Found
            </h1>
            <p className="text-white-300 text-bodym text-center">
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div>
        )}
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
