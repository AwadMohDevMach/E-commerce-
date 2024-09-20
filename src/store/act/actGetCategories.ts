import { TCategory } from "@customTypes/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {axiosErrorHandler} from "@utils/index";

type TResponse = TCategory[];

export const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkApi) => {
    const { rejectWithValue , signal } = thunkApi;
    try {
      const response = await axios.get<TResponse>(
        "categories" , {signal}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
