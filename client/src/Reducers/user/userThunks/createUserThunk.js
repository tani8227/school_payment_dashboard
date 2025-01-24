import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const localhost = import.meta.env.VITE_BACKEND_URL

export const createUser = createAsyncThunk(
    'Auth/createUser',
    async (credentials, { rejectWithValue }) => {
        try {
            console.log("Sending request with credentials:", credentials);
            const response = await axios.post(`${localhost}/api/v1/user/sign-up`, credentials, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            console.log("Response received:", response.data);

            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data.message || 'User creation failed');
            }

        } catch (error) {
            console.error("Error occurred:", error);
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Something went wrong');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

