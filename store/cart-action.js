import { authAction } from "./auth-slice";
import { cartAction } from "./cart-slice";

export const fetchCartData = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://foodease-backend-default-rtdb.firebaseio.com/users/${id}/cart.json`
      );

      if (!response.ok) {
        return {
          items: [],
          totalQuantity: 0,
        };

        // throw new Error("error");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();

      const items = cartData && cartData.items ? cartData.items : [];
      const totalQuantity =
        cartData && cartData.totalQuantity ? cartData.totalQuantity : 0;

      dispatch(
        cartAction.replaceCart({
          items,
          totalQuantity,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const sendCartData = (cart, id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://foodease-backend-default-rtdb.firebaseio.com/users/${id}/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("sendiing cartData failed");
      }
    };
    try {
      await sendRequest();
    } catch (err) {
      console.log(err);
      dispatch(authAction.setError(err.message));
    }
  };
};
