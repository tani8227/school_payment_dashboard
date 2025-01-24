import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Reducers/user/userSlice.js'
import transactionReducer from '../Reducers/transactions/transactionSlice.js';

 const store = configureStore(
    {
        reducer:
        {
           Auth:userReducer,
           Transactions:transactionReducer
        }

    })

    export default store;