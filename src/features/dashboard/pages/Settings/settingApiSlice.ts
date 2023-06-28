import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";



const settingsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = settingsAdapter.getInitialState()

export const settingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSettings: builder.query<any, any>({
            query: () => ({
                url: '/settings',
                validateStatus: (response:any, result:any) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData:any) => {
                const loadedSettings = Object.values(responseData).map((setting:any) => {
                    setting.id = setting._id
                    // console.log(setting)
                    return setting
                });
                return settingsAdapter.setAll(initialState, loadedSettings)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Setting', id: 'LIST' },
                        ...result.ids.map((id:string) => ({ type: 'Setting', id }))
                    ]
                } else return [{ type: 'Setting', id: 'LIST' }]
            }
        }),
        addNewSetting: builder.mutation({
            query: initialSetting => ({
                url: '/settings',
                method: 'POST',
                body: {
                    ...initialSetting,
                }
            }),
            invalidatesTags: [
                { type: 'Setting', id: "LIST" }
            ]
        }),
        updateSetting: builder.mutation({
            query: initialSetting => ({
                url: '/settings',
                method: 'PATCH',
                body: {
                    ...initialSetting,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setting', id: arg.id }
            ]
        }),
        deleteSetting: builder.mutation({
            query: ({ _id }) => ({
                url: `/settings`,
                method: 'DELETE',
                body: { _id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setting', id: arg.id }
            ]
        }),
         generalSettings: builder.mutation({
            query:data=>({
                url: '/settings/general',
                method: 'POST',
                body:{
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setting', id: arg.id }
            ]
        }),
        homepageSettings:builder.mutation({
            query:data=>({
                url:'/settings/homepage-config',
                method:'POST',
                body:{
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setting', id: arg.id }
            ]
        }),
        pagesSettings:builder.mutation({
            query:data=>({
                url:'/settings/pages',
                method:'POST',
                body:{
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setting', id: arg.id }
            ]
        }),
        
        settingsUpload:builder.mutation<any, any>({
            query:data=>({
                url:'/settings/uploads',
                method:'POST',
                body:data,
            }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Setting', id: arg.id }
                ]
        }),
        settingsRemoveFile:builder.mutation<any, any>({
            query:data =>({
                url:'/settings/remove-uploads',
                method:'POST',
                body:data,
            }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Setting', id: arg.id }
                ]
        }),
        dashboardConfigSettings:builder.mutation({
            query:data=>({
                url:'/settings/dashboard-config',
                method:'POST',
                body:{
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setting', id: arg.id }
            ]
        }),
    }),    
})

export const {
    useGetSettingsQuery,
    useAddNewSettingMutation,
    useUpdateSettingMutation,
    useDeleteSettingMutation, 
    useSettingsUploadMutation,
    useSettingsRemoveFileMutation,
    useGeneralSettingsMutation,
    useDashboardConfigSettingsMutation,
    useHomepageSettingsMutation,
    usePagesSettingsMutation
} = settingsApiSlice

// returns the query result object
export const selectSettingsResult = settingsApiSlice.endpoints.getSettings.select('Setting')

// creates memoized selector
const selectSettingsData = createSelector(
    selectSettingsResult,
    settingsResult => settingsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllSettings,
    selectById: selectSettingById,
    selectIds: selectSettingIds
    // Pass in a selector that returns the notes slice of state
} = settingsAdapter.getSelectors((state:any) => selectSettingsData(state) ?? initialState)
