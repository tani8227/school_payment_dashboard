import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Reducers/user/userSlice.jsx'
import transactionReducer from '../Reducers/transactions/transactionSlice.jsx';

 const store = configureStore(
    {
        reducer:
        {
           Auth:userReducer,
           Transactions:transactionReducer
        }

    })

    export default store;