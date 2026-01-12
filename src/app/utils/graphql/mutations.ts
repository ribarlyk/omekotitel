import CREATE_CART_AFTER_SIGNIN from "@/src/app/qraphql/mutation/create-cart-after-signin.graphql";
import GENERATE_AUTH_TOKEN from "@/src/app/qraphql/mutation/generate-customer-token.graphql";
import REVOKE_CUSTOMER_TOKEN from "@/src/app/qraphql/mutation/revoke-customer-token.graphql";
import CREATE_CUSTOMER from "@/src/app/qraphql/mutation/create-customer.graphql"

export const Mutations = {
  CREATE_CART_AFTER_SIGNIN,
  CREATE_CUSTOMER,
  GENERATE_AUTH_TOKEN,
  REVOKE_CUSTOMER_TOKEN,
};
