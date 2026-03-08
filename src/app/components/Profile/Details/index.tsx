"use client";

import { useState } from "react";

interface Props {
  firstname: string;
  lastname: string;
  email: string;
}

export const ProfileDetails = ({ firstname, lastname, email }: Props) => {
  const [first, setFirst] = useState(firstname);
  const [last, setLast] = useState(lastname);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up update customer mutation
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold uppercase text-gray-800 mb-1">Детайли</h2>
        <div className="h-0.5 w-10 bg-brand-action mb-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="email"
          value={email}
          readOnly
          className="border border-gray-200 rounded px-4 py-3 text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
        />
        <input
          type="text"
          name="firstname"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="Първо име"
          className="border border-gray-300 rounded px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-brand-nav"
        />
        <input
          type="text"
          name="lastname"
          value={last}
          onChange={(e) => setLast(e.target.value)}
          placeholder="Фамилия"
          className="border border-gray-300 rounded px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-brand-nav"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="border border-gray-400 text-gray-700 font-bold uppercase text-sm px-10 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Запази
        </button>
      </div>
    </form>
  );
};
