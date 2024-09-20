import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { RootState } from "@store/index";

const actPlaceOreder = createAsyncThunk(
  "orders/actPlaceOreder",
  async (subtotal: number, thunkApu) => {
    const { rejectWithValue, getState } = thunkApu;
    const { auth, cart } = getState() as RootState;

    const orderItems = cart.productsFullInsfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cart.item[el.id || 0],
    }));

    try {
      const res = await axios.post("orders", {
        userId: auth.user?.id,
        items: orderItems,
        subtotal,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPlaceOreder;
