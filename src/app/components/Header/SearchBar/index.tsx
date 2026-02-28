"use client";

import { Search } from "lucide-react";
import { useState } from "react";

type SearchTerm = string;

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<SearchTerm>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search")?.toString().trim();

    console.log("Търсене на:", query);
    setSearchTerm("");

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form
      className="flex items-center w-full h-14 border border-gray-300 rounded-lg px-4 gap-2"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="search"
        placeholder="Търсене на продукти..."
        className="flex-1 outline-none bg-transparent"
        value={searchTerm}
        onChange={handleChange}
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Търси"
        className="p-2 rounded-lg hover:bg-brand-nav transition-colors duration-200 group"
      >
        <Search
          className="text-brand-action group-hover:text-white"
          size={20}
          strokeWidth={2}
        />
      </button>
    </form>
  );
};
