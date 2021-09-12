const { createSlice } = require ('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers:{
    showMiniCart(state){
      state.showMiniCart = true;
    },
    hideMiniCart(state){
      state.showMiniCart = false;
    },

    addToCart(state, action){
      // send product info from DetailPage
      const newCartItem = action.payload; // { id, product, quantity }
      
      const index = state.cartItems.findIndex(x => x.id === newCartItem.id);
      if(index >=0){
        // set quantity
        state.cartItems[index].quantity += newCartItem.quantity;

      }else{
        // add new cart item
        state.cartItems.push(newCartItem);
      }
    },

    setQuantity(state, action){
      const { id, quantity } = action.payload;
      // check product is available
      const index = state.cartItems.findIndex(x => x.id === id);
      if( index >=0 ){
        state.cartItems[index].quantity = quantity;
      }
    },

    removeCartItem(state, action){
      const removeId = action.payload; // { id }
      state.cartItems = state.cartItems.filter(x => x.id !== removeId);
    },
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeCartItem } = actions;
export default reducer;