import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localhost = import.meta.env.VITE_BACKEND_URL

export const getUpdateTransactionStatus = createAsyncThunk(
  'transactions/updateTransactionStatus',
  async (transactionData, { rejectWithValue }) => {  
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue('No token found. Please login.');
      }

      const response = await axios.post(`https://school-payment-dashboard-backend.onrender.com/api/v1/transactions/update-status`, transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response);  

      return response.data;
    } catch (error) {
      console.error("Error occurred in getUpdateTransactionStatus thunk:", error);

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
);
