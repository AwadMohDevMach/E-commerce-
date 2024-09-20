import { TLoading, TProducts, isString } from "../../types/shared";
import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector } from "./selectros";
import actGetProductWithItem from "@store/cart/act/actGetProductWithItem";

interface ICartState {
  item: { [key: string]: number };
  productsFullInsfo: TProducts[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  item: {},
  productsFullInsfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.item[id]) {
        state.item[id]++;
      } else {
        state.item[id] = 1;
      }
    },
    changeQuqntityHandler: (state, action) => {
      state.item[action.payload.id] = action.payload.quantity;
    },
    cartRemoveItem: (state, action) => {
      delete state.item[action.payload];
      state.productsFullInsfo = state.productsFullInsfo.filter(
        (el) => el.id !== action.payload
      );
    },
    cleanUpCartProductsFullInsfo: (state) => {
      state.productsFullInsfo = [];
    },
    clearCartAfterPlaceOlder: (state) => {
      state.item = {};
      state.productsFullInsfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductWithItem.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductWithItem.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInsfo = action.payload;
    });
    builder.addCase(actGetProductWithItem.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { getCartTotalQuantitySelector, actGetProductWithItem };
export const {
  addToCart,
  changeQuqntityHandler,
  cartRemoveItem,
  cleanUpCartProductsFullInsfo,
  clearCartAfterPlaceOlder,
} = cartSlice.actions;
export default cartSlice.reducer;
