import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = import.meta.env.VITE_BACKEND_URL

export const loginUser = createAsyncThunk(
    'Auth/loginUser',
    async (creadentials, { rejectWithValue }) => {
        try {
            console.log(creadentials);
            const response = await axios.post(`https://school-payment-dashboard-backend.onrender.com/api/v1/user/login`, creadentials,
                {
                    headers: {
                        'Content-Type': 'application/json'  
                    }
                });
            
                if (response.status === 200) {
                    localStorage.setItem('userId', response.data.data._id)
                    localStorage.setItem('token', response.data.token);
                    return response.data;
                } else {
                    return rejectWithValue(response.data.message || 'User not found');
                }
                               
        } catch (error)
        {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Something went wrong');
            }else {
                return rejectWithValue(error.message);
            }
        }
    }
)