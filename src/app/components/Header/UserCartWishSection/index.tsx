import { User } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Phone } from "lucide-react";

export const UserCartWishSection = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="hidden xl:flex items-center gap-3">
        <div className="border border-gray-300 rounded-xl p-3">
          <Phone className="text-brand-action" strokeWidth={2} size={30} />
        </div>
        <address className="flex flex-col not-italic gap-1">
          <p className="text-[12px]! text-brand-nav">За поръчки и запитвания</p>
          <a
            href="tel:08888787852"
            className="text-[25px]! font-bold text-brand-nav"
          >
            0888787852
          </a>
        </address>
      </div>
      <div className="flex flex-col items-center">
        <User className="text-brand-action" strokeWidth={2} size={24} />
        <span className="text-xs text-brand-action">Профил</span>
      </div>
      <div className="flex flex-col items-center">
        <Heart className="text-brand-action" strokeWidth={2} size={24} />
        <span className="text-xs text-brand-action">Любими
        </span>
      </div>
      <div className="flex flex-col items-center">
        <ShoppingCart className="text-brand-action" strokeWidth={2} size={24} />
        <span className="text-xs text-brand-action">Количка</span>
      </div>
    </div>
  );
};
