// import { act } from "@testing-library/react";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      const tempCart = state.cart.find((p) => p.id === id + color);

      if (tempCart) {
        const tempCart = state.cart.map((item) => {
          if (item.id === id + color) {
            let updateAmount = item.amount + amount;
            if (updateAmount >= item.max) {
              updateAmount = item.max;
            }
            return { ...item, amount: updateAmount };
          } else {
            return item;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newProductToCart = {
          id: id + color,
          name: product.name,
          color: color,
          image: product.images[0].url,
          max: product.stock,
          amount,
          price: product.price,
        };
        return { ...state, cart: [...state.cart, newProductToCart] };
      }

    case REMOVE_CART_ITEM:
      const itemId = action.payload;
      const updated_cart = state.cart.filter((item) => item.id !== itemId);

      return { ...state, cart: updated_cart };
    case CLEAR_CART:
      return { ...state, cart: [] };

    case TOGGLE_CART_ITEM_AMOUNT:
      const { value, itId } = action.payload;

      const updateedAmount = state.cart.map((item) => {
        if (item.id === itId) {
          if (value === "inc") {
            let tempAmount = item.amount + 1;
            if (tempAmount >= item.max) {
              tempAmount = item.max;
            }
            return { ...item, amount: tempAmount };
          }
          if (value === "dic") {
            let tempAmount = item.amount - 1;
            if (tempAmount < 1) {
              tempAmount = 1;
            }
            return { ...item, amount: tempAmount };
          }
        }
        return item;
      });
      return { ...state, cart: updateedAmount };

    case COUNT_CART_TOTALS:
      const { total_items, total_price } = state.cart.reduce(
        (total, item) => {
          const { amount, price } = item;
          total.total_items += amount;
          total.total_price += amount * price;
          return total;
        },
        { total_items: 0, total_price: 0 }
      );
      return { ...state, total_items, total_price };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
