import { createSlice } from "@reduxjs/toolkit";
import { TorderItem } from "@customTypes/orders";
import { TLoading } from "@customTypes/shared";
import actPlaceOreder from "./act/actPlaceOreder";
import { isString } from "../../types/shared";
import actGetOrders from "./act/actGetOrders";


interface IorderSlice {
    orderList: TorderItem[];
    error : null | string;
    loading : TLoading
}
const initialState : IorderSlice= {
    orderList: [],
    error: null,
    loading : "idle"
}

const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers : {
        resetOrederState : (state) => {
            state.loading = "idle"
            state.error = null
        }
    },
    extraReducers : (builder) => {
        builder.addCase(actPlaceOreder.pending , (state) => {
            state.loading = "pending"
            state.error = null
        }),
        builder.addCase(actPlaceOreder.fulfilled , (state) => {
            state.loading = "succeeded"
        }),
        builder.addCase(actPlaceOreder.rejected , (state , action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload as string
              }
        })

        // get order
        builder.addCase(actGetOrders.pending , (state) => {
            state.loading = "pending"
            state.error = null
        }),
        builder.addCase(actGetOrders.fulfilled , (state , action) => {
            state.loading = "succeeded"
            state.orderList = action.payload;
        }),
        builder.addCase(actGetOrders.rejected , (state , action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload as string
              }
        })
    }
})



export const {resetOrederState} = orderSlice.actions
export default orderSlice.reducer;