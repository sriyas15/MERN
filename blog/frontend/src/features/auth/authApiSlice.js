import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        signup:builder.mutation({
            query:(userData)=>({
                url:"users/register",
                method:"POST",
                body:userData
            }),
        }),

        login:builder.mutation({
            query:(userData)=>({
                url:"users/login",
                method:"POST",
                body:userData
            })
        }),
        
    }),
});

export const { useSignupMutation,useLoginMutation } = authApiSlice