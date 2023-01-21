import { useQuery } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import fetchWord from "../fetchWord";
import { IconNewWindow } from "./Icons";
import PlayButton from "./PlayButton";

type DefinitionProps = {
  word: string;
  phonetics: { text: string; audio: string }[];
  sourceUrls: string[];
  meanings: {
    partOfSpeech: "noun";
    definitions: {
      definition: string;
      synonyms: string[];
      antonyms: string[];
      example: string;
    }[];
    synonyms: string[];
    antonyms: string[];
  }[];
};

function Definition({
  searchFor,
  setSearchFor,
}: {
  searchFor: string;
  setSearchFor: Dispatch<SetStateAction<string>>;
}) {
  if (searchFor === "") return <div className=""></div>;
  const result = useQuery([searchFor], fetchWord);
  if (result.isLoading) return <div className="">Loading</div>;
  if (result.isError) return <div className="">Error</div>;
  console.log(result.data[0], "ohohoh");
  const {
    word,
    phonetics: [phonetic],
    meanings,
    sourceUrls,
  } = result.data[0] as DefinitionProps;
  const phoneticAudio = new Audio(phonetic.audio);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-hl">{word}</h1>
          <h6 className="text-hm text-purple mt-2">{phonetic.text}</h6>
        </div>
        <PlayButton onClick={() => phoneticAudio.play()} />
      </div>
      {meanings.map((meaning) => (
        <div key={meaning.partOfSpeech} className="mb-10">
          <div className="flex items-center justify-center my-10">
            <h5 className="text-hm italic pr-5 font-bold ">
              {meaning.partOfSpeech}
            </h5>
            <div className="mt-1 h-px w-full bg-white-200 dark:bg-black-300"></div>
          </div>
          <h4 className="text-hs text-white-300 mb-[25px]">Meaning</h4>
          <ul className="list-disc pl-10 marker:bg-red marker:text-purple  list-outside">
            {meaning.definitions.map((definition) => (
              <li key={definition.definition} className="pl-4 mb-3">
                {definition.definition}
                {definition?.example && (
                  <div className="mt-3 text-white-300 text-bodym">
                    “{definition.example}”
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="">
            {meaning.synonyms.length > 0 && (
              <div className="mt-10">
                <h5 className="text-hs text-white-300 inline-block ">
                  Synonyms
                </h5>
                {meaning.synonyms.map((synonym) => (
                  <button
                    onClick={() => setSearchFor(synonym)}
                    key={synonym}
                    className="text-purple font-bold text-hs px-4"
                  >
                    {synonym}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="border-t pt-4 dark:border-black-300 border-white-200 text-bodys underline text-white-300">
        Source
        <a
          target="_blank"
          href={sourceUrls[0]}
          className="ml-4  dark:text-white text-black"
        >
          {sourceUrls[0]}
          <IconNewWindow className="ml-2 inline-block" />
        </a>
      </div>
    </>
  );
}

export default Definition;