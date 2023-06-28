import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { apiSlice } from "../../../../app/api/apiSlice";
import userInterface from "../../../../app/utils/props/userProps";





const usersAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<any, any>({
            query: () => ({
                url: '/users',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData:userInterface) => {
                const loadedUsers = Object.values(responseData).map((user:any) => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUser => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUser,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUser => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUser,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        checkDuplicateUser: builder.mutation({
            query: userInfo => ({
                url: '/checkduplicate',
                method: 'POST',
                body: {
                    ...userInfo,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        userUpload:builder.mutation<any, any>({
            query:data=>({
                url:'users/uploads/avatar',
                method:'POST',
                body:data,
            }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Setting', id: arg.id }
                ]
        }),
        userRemoveFile:builder.mutation<any, any>({
            query:data =>({
                url:'/users/remove-uploads',
                method:'POST',
                body:data,
            }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Setting', id: arg.id }
                ]
        }),
        deleteUser: builder.mutation({
            query: ({ _id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { _id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useUserUploadMutation,
    useUserRemoveFileMutation,
    useCheckDuplicateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select('User')

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the notes slice of state
} = usersAdapter.getSelectors((state:any) => selectUsersData(state) ?? initialState)