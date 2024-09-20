import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "@store/act//actLikeToggle";
import actGetWishlist from "./actGetWishlist";
import { authLogout } from "@store/auth/authSlice";
import { TLoading, TProducts, isString } from "../../types/shared";

interface IWishlist {
  itemsId: number[];
  error: null | string;
  loading: TLoading;
  productsFullInfo: TProducts[];
}

const initialState: IWishlist = {
  itemsId: [],
  error: null,
  loading: "idle",
  productsFullInfo: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productsFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productsFullInfo") {
        state.productsFullInfo = action.payload.data as TProducts[];
      } else if(action.payload.dataType === "productsId") {
        state.itemsId = action.payload.data as number[];
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    builder.addCase(authLogout , state => {
      state.itemsId = [];
      state.productsFullInfo = [];
    })
  },
});
export const { productsFullInfoCleanUp } = wishlistSlice.actions;
export { actLikeToggle, actGetWishlist };
export default wishlistSlice.reducer;
