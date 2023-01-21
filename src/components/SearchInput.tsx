import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { IconSearch } from "./Icons";

function SearchInput({
  searchFor,
  setSearchFor,
}: {
  searchFor: string;
  setSearchFor: Dispatch<SetStateAction<string>>;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    if (searchValue !== searchFor) {
      setSearchValue(searchFor);
    }
  }, [searchFor]);
  return (
    <div className="">
      <div
        className={`mt-[51.5px] mb-[45px] tablet:mb-[43px] my-6  ${
          error ? "border-red border" : "border-purple"
        }  focus-within:border px-6 py-5 flex justify-between items-center w-full rounded-2xl bg-white-100 dark:bg-black-100`}
      >
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchFor(searchValue);
            }
          }}
          onBlur={() => {
            if (searchValue) {
              setSearchFor(searchValue);
            }
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for any word…"
          type="text"
          title="Search"
          aria-label="Search"
          className="font-bold outline-none w-full bg-white-100 dark:bg-black-100 text-hs placeholder:text-opacity-25  dark:text-white text-black-200"
        />
        <IconSearch />
      </div>
      {error && (
        <h4 className="text-red text-hs mt-2">Whoops, can’t be empty…</h4>
      )}
    </div>
  );
}

export default SearchInput;
