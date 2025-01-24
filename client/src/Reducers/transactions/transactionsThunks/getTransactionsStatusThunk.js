import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = import.meta.env.VITE_BACKEND_URL

export const getTransactionsByCustomId = createAsyncThunk(
    'transactions/getTransactionsByCustomId',
    async (credential, { rejectWithValue }) => {
        try {
              
            console.log("hhghhghg", credential)
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const response = await axios.get(`https://school-payment-dashboard-backend.onrender.com/api/v1/transactions/check-status`, {
                params: { id: credential },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
            

        } catch (error) {
            if (error.response) {
                // If error.response exists, it's from the server
                return rejectWithValue(error.response.data.message || 'Something went wrong on the server.');
              } else if (error.request) {
                // No response from server
                return rejectWithValue('No response received from the server. Please check your network.');
              } else {
                // If the error was in setting up the request
                return rejectWithValue(error.message || 'Something went wrong.');
              }
        }

    }
)