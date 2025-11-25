import { apiSlice } from "../api/apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({

    endpoints:(builder)=>({

        getBlogs:builder.query({
            query:()=> "/blogs",
            providesTags:["Blogs"]
        }),

        toggleLike:builder.mutation({
            query:(blogId)=>({
                url:`/blogs/${blogId}/like`,
                method:"PUT"
            }),
            invalidatesTags:["Blogs"]
        })

    }),
});

export const { useGetBlogsQuery,useToggleLikeMutation } = blogApiSlice