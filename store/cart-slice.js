import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, changed: false },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.changed = true;
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const existingItems = state.items.find(
        (item) => item.name === newItem.name
      );
      state.totalQuantity++;
      state.changed = true;

      // checking if an item exist
      // if it does not exist we add a total new item
      if (!existingItems) {
        state.items.push({
          name: newItem.name,
          image: newItem.image,
          discountPrice: newItem.price - (newItem.price * 10) / 100,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          totalDiscountPrice: newItem.price - (newItem.price * 10) / 100,
        });
      } else {
        // if it does, we increament the total price and quantity
        existingItems.totalPrice += existingItems.price;
        existingItems.quantity++;
        existingItems.totalDiscountPrice += existingItems.discountPrice;
      }
    },

    removeFromCart(state, action) {
      const removedItem = state.items.find(
        (item) => item.name === action.payload
      );
      state.totalQuantity--;
      state.changed = true;

      // checking if the quantity of the item we are tying to remove is === 1
      if (removedItem.quantity === 1) {
        // if it is === 1 we remove the total item from the lis
        state.items = state.items.filter(
          (item) => item.name !== removedItem.name
        );
      } else {
        // else we reduce the total quantity and the total price
        removedItem.quantity--;
        removedItem.totalPrice -= removedItem.price;
        removedItem.totalDiscountPrice -= removedItem.discountPrice;
      }
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice;
