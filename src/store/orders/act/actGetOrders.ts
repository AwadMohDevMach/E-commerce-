import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { RootState } from "@store/index";
import { TorderItem } from "@customTypes/orders";

type TResponse = TorderItem[];

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkApi) => {
    const { rejectWithValue, getState, signal } = thunkApi;
    const { auth } = getState() as RootState;

    try {
      const res = await axios.get<TResponse>(`orders?userId=${auth.user?.id}`, {
        signal,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetOrders;
