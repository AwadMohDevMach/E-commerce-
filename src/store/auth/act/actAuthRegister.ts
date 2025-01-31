import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
}

const actAuthRegister = createAsyncThunk("auth/actAuthRegister" , async(formData : TFormData , thunlApi)=>{

    const {rejectWithValue} = thunlApi

    try {
        const res = await axios.post("register" , formData)
        return res.data;

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default actAuthRegister;