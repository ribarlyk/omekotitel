import CREATE_CART_AFTER_SIGNIN from "@/src/app/qraphql/mutation/create-cart-after-signin.graphql";
import GENERATE_AUTH_TOKEN from "@/src/app/qraphql/mutation/generate-customer-token.graphql";
import REVOKE_CUSTOMER_TOKEN from "@/src/app/qraphql/mutation/revoke-customer-token.graphql";
import CREATE_CUSTOMER from "@/src/app/qraphql/mutation/create-customer.graphql";
import CREATE_EMPTY_CART from "@/src/app/qraphql/mutation/create-empty-cart.graphql";
import ADD_PRODUCT_TO_CART from "@/src/app/qraphql/mutation/add-product-to-cart.graphql";
import MERGE_CARTS from "@/src/app/qraphql/mutation/merge-carts.graphql";
import REMOVE_ITEM_FROM_CART from "@/src/app/qraphql/mutation/remove-item-from-cart.graphql";
import UPDATE_CART_ITEM_QUANTITY from "@/src/app/qraphql/mutation/update-cart-item-quantity.graphql";

export const Mutations = {
  CREATE_CART_AFTER_SIGNIN,
  CREATE_CUSTOMER,
  GENERATE_AUTH_TOKEN,
  REVOKE_CUSTOMER_TOKEN,
  CREATE_EMPTY_CART,
  ADD_PRODUCT_TO_CART,
  MERGE_CARTS,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
};
