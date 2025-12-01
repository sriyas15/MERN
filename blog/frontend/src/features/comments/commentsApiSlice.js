import { apiSlice } from "../api/apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({

    endpoints:(builder)=>({

        getComments:builder.query({
            query:(blogId)=>`/comments/${blogId}`,
            providesTags:(result,error,blogId)=>[
                { type:"Comments", id:blogId }
            ]
        }),

        postComment:builder.mutation({
            query:({blogId,content})=>({
                url:`/comments/${blogId}`,
                method:"POST",
                body:{content}
            }),
            invalidatesTags:(result,error,{blogId})=>[
                { type:"Comments", id:blogId },
                "Blogs"
            ]
        }),

        editComment:builder.mutation({
            query:({content,id})=>({
                url:`/comments/update/${id}`,
                method:"PUT",
                body:{content}
            }),
            invalidatesTags:(result,error,{blogId})=>[
                { type:"Comments", id:blogId },
                "Blogs"
            ]
        }),

        deleteComment:builder.mutation({
            query:(id)=>({
                url:`/comments/delete/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:(result,error,{blogId})=>[
                { type:"Comments", id:blogId },
                "Blogs"
            ]
        }),

    }),
});

export const { useLazyGetCommentsQuery,usePostCommentMutation,
                useEditCommentMutation,useDeleteCommentMutation
             } = commentsApiSlice;