"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/src/app/contexts/CartContext";
import { magentoImageUrl } from "@/src/app/utils/image";

export const CartPanel = () => {
  const { cart, itemCount, loading, removeFromCart } = useCart();

  if (loading) return <p className="text-gray-500 text-sm">Зареждане...</p>;

  if (!cart || itemCount === 0)
    return <p className="text-gray-500 text-sm">Количката ви е празна.</p>;

  const total = cart.prices.grand_total;

  return (
    <div className="flex flex-col h-full gap-6">
      <ul className="flex flex-col gap-4">
        {cart.items.filter((item) => item.product).map((item) => {
          const price = item.product.price_range.minimum_price.final_price;
          return (
            <li key={item.id} className="flex gap-3">
              <Link href={`/product/${item.product.url_key}`} className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-100">
                <Image
                  src={magentoImageUrl(item.product.thumbnail.url)}
                  alt={item.product.thumbnail.label || item.product.name}
                  fill
                  className="object-contain"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product.url_key}`} className="text-sm font-medium text-brand-nav line-clamp-2 hover:underline">
                  {item.product.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {item.quantity} бр. &times; {price.value.toFixed(2)} {price.currency}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-300 hover:text-red-400 text-lg leading-none cursor-pointer shrink-0"
                aria-label="Премахни"
              >
                &times;
              </button>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-gray-200 pt-4 mt-auto">
        <div className="flex justify-between text-sm font-semibold text-brand-nav mb-4">
          <span>Общо</span>
          <span>
            {total.value.toFixed(2)} {total.currency}
          </span>
        </div>
        <a
          href="/checkout"
          className="block w-full bg-brand-action text-white text-center py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Към плащане
        </a>
      </div>
    </div>
  );
};
