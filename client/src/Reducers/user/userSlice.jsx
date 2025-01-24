import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./userThunks/createUserThunk.jsx";
import { loginUser } from "./userthunks/loginUserThunk.jsx";
import { getUser } from "./userThunks/getUserThunk.jsx";

const initialState=
{
    authUser:null,
    loading:false,
    allUsers:null,

}

const userReducer=createSlice(
    {
        name:'Auth',
        initialState,
        reducers:
        {
               
               logout: (state, action) => {
                 state.authUser = null;
                 state.token = null;
                 localStorage.removeItem('token');
                 window.location.reload();
               },

        },
        extraReducers:(builder)=>
            {
                builder
                       .addCase(createUser.pending, (state)=>
                        {
                            state.loading = true;
                        })

                       .addCase(createUser.fulfilled, (state, action)=>
                        {
                            state.loading= false;
                            state.authUser=action.payload;
                        })

                       .addCase(createUser.rejected, (state, action)=>
                        {
                            state.loading= false;
                            state.authUser=null;
                        })

                builder
                
                       .addCase(loginUser.pending, (state, action)=>
                        {
                            state.loading=true;

                        })
                        .addCase(loginUser.fulfilled, (state, action)=>
                            {
                                state.loading=false;
                                state.allUsers=action.payload
                            })

                         .addCase(loginUser.rejected, (state, action)=>
                            {
                                state.loading= false;
                                state.allUsers=null;

                            })   
                builder
                
                       .addCase(getUser.pending, (state, action)=>
                        {
                            state.loading=true;

                        })
                        .addCase(getUser.fulfilled, (state, action)=>
                            {
                                state.loading=false;
                                state.authUser=action.payload
                            })

                         .addCase(getUser.rejected, (state, action)=>
                            {
                                state.loading= false;
                                state.authUser=null;

                            })   
            }
    })


    export default userReducer.reducer;
    export const Actions= userReducer.actions
