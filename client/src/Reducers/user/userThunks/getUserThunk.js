import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = import.meta.env.VITE_BACKEND_URL

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, { rejectWithValue }) => {
        try {
            
            const token = localStorage.getItem('token');

            
            if (!token) {
                console.log("API Error:",token);
                return rejectWithValue("No token found, user not authenticated");
            }

            
            const response = await axios.get(`${localhost}/api/v1/user/get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            
            return response.data; 
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);

            return rejectWithValue(
                error.response?.data || "Failed to fetch user data"
            );
        }
    }
);
