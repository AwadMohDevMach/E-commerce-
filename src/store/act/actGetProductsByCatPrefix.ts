import { TProducts } from "@customTypes/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProducts[];

export const actGetProductsByCatPrefix = createAsyncThunk(
  "categories/actGetCategories",
  async (prefix : string, thunkApi) => {
    const { rejectWithValue , signal } = thunkApi;
    try {
      const response = await axios.get<TResponse>(
        `products?cat_prefix=${prefix}`,{
          signal
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // response is key word
        return rejectWithValue(error.response?.data.message);
      } else {
        return rejectWithValue("an unexpected error");
      }
    }
  }
);
