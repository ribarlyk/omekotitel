import { Truck } from "lucide-react";

export const DeliveryBanner = () => (
  <div className="w-full bg-brand-nav text-white text-m py-2 px-4 flex items-center justify-center gap-2">
    <Truck size={24} className="shrink-0" />
    <span>Безплатна доставка при поръчки над 40,90 €</span>
  </div>
);