"use client";

import { useAuthenticate } from "@/src/app/hooks/useAuthentication";
import { ProfileSection, SECTION_LABELS } from "@/src/app/components/Profile/sections";

const SECTIONS = Object.values(ProfileSection);

interface Props {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}

export const ProfileSidebar = ({ activeSection, onSectionChange }: Props) => {
  const { handleLogout } = useAuthenticate();

  return (
    <aside className="w-52 shrink-0">
      <h2 className="text-xl font-bold uppercase text-gray-800 mb-1">Моят профил</h2>
      <div className="h-0.5 w-10 bg-brand-action mb-6" />
      <div className="flex flex-col gap-1">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSectionChange(s)}
            className={`text-sm py-1 text-left transition-colors cursor-pointer ${
              activeSection === s
                ? "text-brand-action font-semibold"
                : "text-gray-500 hover:text-brand-action"
            }`}
          >
            {SECTION_LABELS[s]}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="text-sm py-1 text-left text-gray-500 hover:text-brand-action transition-colors cursor-pointer mt-1"
        >
          Изход
        </button>
      </div>
    </aside>
  );
};
