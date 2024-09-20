import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TFormData = {
  email: string;
  password: string;
};
type Trespose = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.post<Trespose>("login", formData);
      console.log(res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
