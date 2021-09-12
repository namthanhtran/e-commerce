import { createSelector  } from "@reduxjs/toolkit";

const cartItemSelector = (state) => state.cart.cartItems;

export const cartItemCountSelector = createSelector(
  cartItemSelector,
  (cartItem) => cartItem.reduce((count, item) => count + item.quantity , 0) 
)
export const cartItemPrice = createSelector(
  cartItemSelector,
  (cartItem) => cartItem.reduce((item) => item.quantity , 0) 
)

export const cartTotalSelector = createSelector(
  cartItemSelector,
  (cartItem) => cartItem.reduce((total, item) => total + (item.product.salePrice * item.quantity) , 0) 
)