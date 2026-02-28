import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <div className="logo">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/omekotitel-bg_1.avif"
          alt="Омекотител лого"
          width={190}
          height={90}
        />
      </Link>
    </div>
  );
};
