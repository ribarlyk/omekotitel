export interface WishlistProduct {
  id: string;
  name: string;
  sku: string;
  url_key: string;
  thumbnail: {
    url: string;
    label: string;
  };
  price_range: {
    minimum_price: {
      final_price: {
        value: number;
        currency: string;
      };
    };
  };
}

export interface WishlistItem {
  id: string;
  product: WishlistProduct;
}

export interface Wishlist {
  id: string;
  items_count: number;
  items: WishlistItem[];
}
