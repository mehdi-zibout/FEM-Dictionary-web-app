import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { IconSearch } from "./Icons";

function SearchInput({
  searchFor,
  setSearchFor,
  setShowNoResults,
}: {
  setShowNoResults: Dispatch<SetStateAction<boolean>>;
  searchFor: string;
  setSearchFor: Dispatch<SetStateAction<string>>;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    if (searchValue !== searchFor && searchFor) {
      setSearchValue(searchFor);
    }
  }, [searchFor]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchFor(searchValue);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue]);
  return (
    <div className="">
      <div
        className={`mt-[51.5px] border border-opacity-0   my-6  ${
          error
            ? "border-red border-opacity-100 "
            : "border-purple mb-[45px] tablet:mb-[43px]"
        }  focus-within:border-opacity-100 px-6 py-5 flex justify-between items-center w-full rounded-2xl bg-white-100 dark:bg-black-100`}
      >
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (searchValue.trim()) {
                setSearchFor(searchValue.trim());
              } else setError(true);
            }
          }}
          onBlur={() => {
            if (searchValue.trim()) {
              setSearchFor(searchValue.trim());
            } else setError(true);
          }}
          value={searchValue}
          onChange={(e) => {
            setShowNoResults(false);
            if (error && e.target.value) setError(false);
            setSearchValue(e.target.value);
          }}
          placeholder="Search for any word…"
          type="text"
          title="Search"
          aria-label="Search"
          className="font-bold outline-none w-full bg-white-100 dark:bg-black-100 text-hs placeholder:text-opacity-25  dark:text-white text-black-200"
        />
        <IconSearch />
      </div>
      {error && (
        <h4 className="text-red text-hs mt-2 mb-[45px] tablet:mb-[43px]">
          Whoops, can’t be empty…
        </h4>
      )}
    </div>
  );
}

export default SearchInput;
