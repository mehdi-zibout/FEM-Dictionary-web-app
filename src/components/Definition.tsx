import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { IconNewWindow } from "./Icons";
import PlayButton from "./PlayButton";

type DefinitionProps = {
  word: string;
  phonetics?: { text: string; audio: string }[];
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
  setDidntFindIt,
}: {
  searchFor: string;
  setSearchFor: Dispatch<SetStateAction<string>>;
  setDidntFindIt: Dispatch<SetStateAction<boolean>>;
}) {
  const result = useQuery<DefinitionProps[]>([searchFor], async () => {
    const apiRes = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchFor}`
    );
    if (!apiRes.ok) {
      setSearchFor("");
      setDidntFindIt(true);
      throw new Error("cant find it");
    }
    setDidntFindIt(false);
    return apiRes.json();
  });
  if (result.isLoading)
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin w-16 h-16 rounded-full border-y border-purple"></div>
      </div>
    );
  if (result.isError)
    return (
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-[64px]">😕</h3>
        <h1 className="text-black-200 dark:text-white  text-hs mb-6 mt-11">
          Something wrong happened! try again later.{" "}
        </h1>
      </div>
    );
  const { word, phonetics, meanings, sourceUrls } = result.data[0];
  const phonetic = findAudio(phonetics);
  const phoneticAudio = new Audio(phonetic?.audio);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-hl">{word}</h1>
          <h6 className="text-hm text-purple mt-2">{phonetic.text}</h6>
        </div>
        {phonetic.audio && (
          <PlayButton
            className="disabled:cursor-not-allowed"
            onClick={() => phoneticAudio.play()}
          />
        )}
      </div>
      {meanings.map((meaning, index) => (
        <div key={meaning.partOfSpeech + index} className="mb-10">
          <div className="flex items-center justify-center my-10">
            <h5 className="text-hm italic pr-5 font-bold ">
              {meaning.partOfSpeech}
            </h5>
            <div className="mt-1 h-px w-full bg-white-200 dark:bg-black-300"></div>
          </div>
          <h4 className="text-hs text-white-300 mb-[25px]">Meaning</h4>
          <ul className="list-disc pl-10 marker:bg-red marker:text-purple  list-outside">
            {meaning.definitions.map((definition, index) => (
              <li
                key={definition.definition + index}
                className="pl-4 mb-3 text-bodym"
              >
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
                {meaning.synonyms.map((synonym, index) => (
                  <button
                    onClick={() => setSearchFor(synonym)}
                    key={synonym + index}
                    className="text-purple font-bold hover:underline text-hs px-4"
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
          className="tablet:ml-4 mt-2 tablet:mt-0 block tablet:inline-block  dark:text-white text-black"
        >
          {sourceUrls[0]}
          <IconNewWindow className="ml-2 inline-block" />
        </a>
      </div>
    </>
  );
}

export default Definition;

function findAudio(
  phonetics:
    | {
        text: string;
        audio: string;
      }[]
    | undefined
) {
  if (phonetics && phonetics.length > 0) {
    for (let index = 0; index < phonetics.length; index++) {
      if (phonetics[index].audio) return phonetics[index];
    }
    return phonetics[0];
  }
  return { text: "", audio: "" };
}
