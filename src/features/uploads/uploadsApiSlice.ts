import { apiSlice } from "../../app/api/apiSlice";

export const uploadsApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
       
        upload:builder.mutation<any, any>({
            query:(req:{data:any; url:string})=>({
                url:req.url,
                method:'POST',
                body:req.data,
            }),
        }),
        removeFile:builder.mutation<any, any>({
            query:(req:{data:any; url:string}) =>({
                url:req.url,
                method:'POST',
                body:req.data,
            }),
        }),
    })
})

export const {
    useUploadMutation,
    useRemoveFileMutation,
} = uploadsApiSlice;