"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import debounce from "lodash/debounce";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const debouncedNavigate = useRef(
    debounce((q: string) => {
      if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    }, 300)
  ).current;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    debouncedNavigate.cancel();
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
      setValue("");
    }
  };

  return (
    <form
      className="flex items-center w-full h-14 border border-gray-300 rounded-lg px-4 gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Търсене на продукти..."
        className="flex-1 outline-none bg-transparent"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Търси"
        className="p-2 rounded-lg hover:bg-brand-nav transition-colors duration-200 group cursor-pointer"
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
