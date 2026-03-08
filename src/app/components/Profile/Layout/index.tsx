"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ProfileSidebar } from "@/src/app/components/Profile/Sidebar";
import { ProfileDetails } from "@/src/app/components/Profile/Details";
import { ProfileWishlist } from "@/src/app/components/Profile/Wishlist";
import { ProfileSection } from "@/src/app/components/Profile/sections";

interface Customer {
  firstname: string;
  lastname: string;
  email: string;
}

interface Props {
  customer: Customer;
}

export const ProfileLayout = ({ customer }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const raw = searchParams.get("section");
  const section = Object.values(ProfileSection).includes(raw as ProfileSection)
    ? (raw as ProfileSection)
    : ProfileSection.Details;

  const setSection = (s: ProfileSection) => {
    router.replace(`/profil?section=${s}`, { scroll: false });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex gap-10">
      <ProfileSidebar activeSection={section} onSectionChange={setSection} />
      <main className="flex-1">
        {section === ProfileSection.Details && (
          <ProfileDetails
            firstname={customer.firstname}
            lastname={customer.lastname}
            email={customer.email}
          />
        )}
        {section === ProfileSection.Wishlist && <ProfileWishlist />}
        {section !== ProfileSection.Details && section !== ProfileSection.Wishlist && (
          <p className="text-gray-400 text-sm">Тази секция предстои.</p>
        )}
      </main>
    </div>
  );
};
