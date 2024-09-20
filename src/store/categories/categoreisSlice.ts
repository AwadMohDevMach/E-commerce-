import { TLoading, TCategory , isString } from "../../types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "@store/act/actGetCategories";


//type  TCategoriesState = {};
interface ICategoriesState {
  records : TCategory[],
  loading : TLoading,
  error : string | null,
};

const initialState : ICategoriesState = {
  records: [],
  loading : "idle",
  error: null,
};

const categoriesSlice = createSlice({
    name : "categories",
    initialState,
    reducers : {
      cleaUCategoriesRecords : (state) =>{
        state.records = []
      }
    },
    extraReducers : (builder) => {
      builder.addCase(actGetCategories.pending, (state) => {
        state.loading = 'pending';
      });
      builder.addCase(actGetCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.records = action.payload;
      });
      builder.addCase(actGetCategories.rejected, (state,action) => {
        state.loading = 'failed';
        if(isString(action.payload)){
          state.error = action.payload
        }
      });
    }
})

export {actGetCategories}
export const {cleaUCategoriesRecords} = categoriesSlice.actions
export default categoriesSlice.reducer