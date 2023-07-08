import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "../../../../app/stores/store";
import { apiSlice } from "../../../../app/api/apiSlice";
import { urlProps } from "../../../../app/utils/props/urlProps";
// import urlProps from "../../../../app/utils/props/urlProps";
// interface urlProp extends  urlProps{}



    const urlAdapter = createEntityAdapter({
        sortComparer: (a:any, b:any) => {
          const createdAtA = a?.createdAt || 0;
          const createdAtB = b?.createdAt || 0;
          return createdAtB - createdAtA; // Sort in descending order
        },
      });


const initialState = urlAdapter.getInitialState()

export const urlApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUrl: builder.query<any, any>({
            query: () => ({
                url: '/shorten-url',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData:any) => {
                const loadedUrl = responseData.map((url:any) => {
                    url.id = url._id
                    return url
                });
                return urlAdapter.setAll(initialState, loadedUrl)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Url', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Url', id }))
                    ]
                } else return [{ type: 'Url', id: 'LIST' }]
            }
        }),
        addNewUrl: builder.mutation({
            query: url => ({
                url: '/shorten-url',
                method: 'POST',
                body: url
            }),
            invalidatesTags: [
                { type: 'Url', id: "LIST" }
            ]
        }),
        updateUrl: builder.mutation({
            query: url => ({
                url: '/shorten-url',
                method: 'PATCH',
                body: url,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Url', id: arg.id }
            ]
        }),
        updateUrlClick: builder.mutation({
            query: url => ({
                url: '/shorten-url/click',
                method: 'PATCH',
                body: url,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Url', id: arg.id }
            ]
        }),
        deleteUrl: builder.mutation({
            query: ({ _id }) => ({
                url: `/url`,
                method: 'DELETE',
                body: { _id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Url', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUrlQuery,
    useAddNewUrlMutation,
    useUpdateUrlMutation,
    useUpdateUrlClickMutation,
    useDeleteUrlMutation,
} = urlApiSlice

// returns the query result object
export const selectUrlResult = urlApiSlice.endpoints.getUrl.select("Url")

// creates memoized selector
const selectUrlData = createSelector(
    selectUrlResult,
    urlResult => urlResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUrl,
    selectById: selectUrlById,
    selectIds: selectUrlIds
    // Pass in a selector that returns the notes slice of state
} = urlAdapter.getSelectors((state:RootState) => selectUrlData(state) ?? initialState)