import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import { TProducts } from "@customTypes/shared";
import {axiosErrorHandler} from "@utils/index";

type TResponse = TProducts[]
const actGetProductWothItem = createAsyncThunk("cart/actGetProductWothItem" ,async (_,thunkApi)=>{
    const {rejectWithValue ,fulfillWithValue, getState , signal} = thunkApi
    const {cart} = getState() as RootState;
    const itemsId = Object.keys(cart.item)

    if(!itemsId.length){
        return fulfillWithValue([])
    }
    try {
        const items = itemsId.map((el) => (`id=${el}`)).join("&")
        const response = await axios.get<TResponse>(`products?${items}`, {signal})
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
})
export default actGetProductWothItem