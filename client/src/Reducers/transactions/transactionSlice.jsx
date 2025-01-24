import { createSlice } from '@reduxjs/toolkit';
import { getTransactions } from './transactionsThunks/getTransactionThunk';
import { getTransactionsByCustomId } from './transactionsThunks/getTransactionsStatusThunk';
import { getUpdateTransactionStatus } from './transactionsThunks/getUpdateTransactionStatusThunk';

const initialState = {
  transactions: [],
  loading:false,
  error: null,
  transactionsStatus:null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    builder
      .addCase(getTransactionsByCustomId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsByCustomId.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionsStatus = action.payload;
      })
      .addCase(getTransactionsByCustomId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    builder
      .addCase(getUpdateTransactionStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUpdateTransactionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionsStatus = action.payload;
      })
      .addCase(getUpdateTransactionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
