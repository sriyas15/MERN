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

        getAllUsers:builder.query({
            query:()=>`/users/allUsers`,
            providesTags:["Users"]
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
                url:`/users/follow/${userToFollowId}`,
                method:"PUT"
            }),
            invalidatesTags:["Blogs","Users"]
        }),

        deleteUser:builder.mutation({
            query:(id)=>({
                url:`/users/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Users"]
        })

        
    }),
});

export const { useSignupMutation,useLoginMutation,
            useUpdateUserMutation,useLogoutMutation,
            useFollowMutation,useGetProfileQuery,
            useGetAllUsersQuery,useDeleteUserMutation } = authApiSlice
            