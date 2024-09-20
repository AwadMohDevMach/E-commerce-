import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils/index";
import { RootState } from "@store/index";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { auth } = getState() as RootState;

    try {
      const isRecordExist = await axios.get(
        `wishlist?userId=${auth.user?.id}&productsId=${id}`
      );
      if (isRecordExist.data.length > 0) {
        await axios.delete(`wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("wishlist", { userId: auth.user?.id, productsId: id });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
