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

        getProfile:builder.query({
            query:()=> `/users/profile`,
            providesTags:["Users"]
        }),

        updateUser:builder.mutation({
            query:({userId,formData})=>({
                url:`users/${userId}`,
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["Users"]
            
        }),

        logout:builder.mutation({
            query:(data)=>({
                url:'/users/logout',
                method:'POST',
                body:data
            }),
        }),

        follow:builder.mutation({
            query:(userToFollowId)=>({
                url:`/users/${userToFollowId}/follow`,
                method:"PUT"
            }),
            invalidatesTags:["Blogs"]
        })
        
    }),
});

export const { useSignupMutation,useLoginMutation,
            useUpdateUserMutation,useLogoutMutation,
            useFollowMutation,useGetProfileQuery } = authApiSlice
            