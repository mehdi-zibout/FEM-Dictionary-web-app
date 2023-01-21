import { useState } from "react";
import { IconSearch } from "./Icons";

function SearchInput({ error }: { error?: boolean }) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="">
      <div
        className={`${
          error ? "border-red border" : "border-purple"
        }  focus-within:border px-6 py-5 flex justify-between items-center w-full rounded-2xl bg-white-100 dark:bg-black-100`}
      >
        <input
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
