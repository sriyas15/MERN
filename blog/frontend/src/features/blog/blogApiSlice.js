import { apiSlice } from "../api/apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({

    endpoints:(builder)=>({

        getBlogs:builder.query({
            query:()=> "/blogs",
            providesTags:["Blogs"]
        }),

        postBlog:builder.mutation({
            query:({formData})=>({
                url:`/blogs/post`,
                method:"POST",
                body:formData
            }),
            invalidatesTags:["Blogs"]
        }),


        editBlog:builder.mutation({
            query:({blogId,formData})=>({
                url:`/blogs/${blogId}`,
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["Blogs"]
        }),

        deleteBlog:builder.mutation({
            query:(blogId)=>({
                url:`/blogs/${blogId}`,
                method:"DELETE"
            }),
            invalidatesTags:["Blogs"]
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

export const { useGetBlogsQuery,useToggleLikeMutation,
                useEditBlogMutation,useDeleteBlogMutation,
                usePostBlogMutation,
            } = blogApiSlice