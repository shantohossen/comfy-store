import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getFromLocalStorae = () => {
  let storage = localStorage.getItem("cart");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};
const initialState = {
  cart: getFromLocalStorae(),
  total_items: 0,
  total_price: 0,
  shipping_fee: 530,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, amount, product },
    });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  const toggoleAmount = (value, itId) => {
    console.log("eee");
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { value, itId } });
  };

  // set cart item to the localStorage
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeItem, toggoleAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
