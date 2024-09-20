import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProducts } from "@customTypes/shared";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { RootState } from "@store/index";


type TDataType = "productsFullInfo" | "productsId";
type TResponse = TProducts[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    
    try {
      const userWishlist = await axios.get<{ productsId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "productsId") {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productsId);
        return { data: concatenatedItemsId, dataType: "productsId" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productsId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
