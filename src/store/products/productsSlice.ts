import { TLoading, TProducts , isString } from "../../types/shared";
import { createSlice } from "@reduxjs/toolkit";
import {actGetProductsByCatPrefix} from "@store/act/actGetProductsByCatPrefix";


interface IProuctsState {
  records : TProducts[],
  loading : TLoading,
  error : string | null,
};

const initialState : IProuctsState = {
  records: [],
  loading : "idle",
  error: null,
};

const productsSlice = createSlice({
    name : "products",
    initialState,
    reducers : {
      cleaUPproductsRecords : (state) =>{
        state.records = []
      }
    },
    extraReducers : (builder) => {
      builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      });
      builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.records = action.payload;
      });
      builder.addCase(actGetProductsByCatPrefix.rejected, (state,action) => {
        state.loading = 'failed';
        if(isString(action.payload)){
          state.error = action.payload
        }
      });
    }
})

export const {cleaUPproductsRecords} = productsSlice.actions;
export {actGetProductsByCatPrefix}
export default productsSlice.reducer