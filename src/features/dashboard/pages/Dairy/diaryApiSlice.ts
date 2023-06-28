import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";
import { RootState } from "../../../../app/stores/store";

const diaryAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = diaryAdapter.getInitialState()

export const diaryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDiary: builder.query<any,any>({
            query: () => ({
                url: '/diary',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData:any) => {
                const loadedDiary = responseData.map((diary:any) => {
                    diary.id = diary._id
                    return diary
                });
                return diaryAdapter.setAll(initialState, loadedDiary)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Diary', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Diary', id }))
                    ]
                } else return [{ type: 'Diary', id: 'LIST' }]
            }
        }),
        addNewDiary: builder.mutation({
            query: initialDiary => ({
                url: '/diary',
                method: 'POST',
                body: {
                    ...initialDiary,
                }
            }),
            invalidatesTags: [
                { type: 'Diary', id: "LIST" }
            ]
        }),
        updateDiary: builder.mutation({
            query: initialDiary => ({
                url: '/diary',
                method: 'PATCH',
                body: {
                    ...initialDiary,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Diary', id: arg.id }
            ]
        }),
        deleteDiary: builder.mutation({
            query: ({ id }) => ({
                url: `/diary`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Diary', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetDiaryQuery,
    useAddNewDiaryMutation,
    useUpdateDiaryMutation,
    useDeleteDiaryMutation,
} = diaryApiSlice

// returns the query result object
export const selectDiaryResult = diaryApiSlice.endpoints.getDiary.select('Diary')

// creates memoized selector
const selectDiaryData = createSelector(
    selectDiaryResult,
    diaryResult => diaryResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDiary,
    selectById: selectDiaryById,
    selectIds: selectDiaryIds
    // Pass in a selector that returns the diary slice of state
} = diaryAdapter.getSelectors((state:RootState) => selectDiaryData(state) ?? initialState)