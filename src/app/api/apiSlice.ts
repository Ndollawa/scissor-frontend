import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../../features/auth/authSlice';
import { RootState } from '../stores/store';



 // Prepare the headers with token 
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders:(headers,{getState}) =>{
        const token =(getState() as RootState).auth.token;
        //   headers.set("Content-Type","multipart/form-data")
        //   headers.set("Accepts","application/json")
        //   headers.set("Accepts","multiparts/form-data")https://scissor-backend-11sy.onrender.com
        // console.log(token)
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers;
    }
})


const baseQueryWithReauth:BaseQueryFn = async (args,api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions);

    if(result?.error?.status === 403){

        //request to get a new token
        const refreshResult:any  = await baseQuery('/auth/refresh',api,extraOptions);
        
        if(refreshResult?.data){
            // stores a new token
            api.dispatch(setCredentials({...refreshResult.data}))
            // retry the original query with the new token
            result = await baseQuery(args,api, extraOptions)
        }else{
            if(refreshResult?.error?.status === 403){
                refreshResult.error.data =  "Access Forbidden"
                // api.dispatch(logOut())refreshResult?.error?.status === 401 &&  
            }else
            if(refreshResult?.error?.status === 401 && refreshResult?.error?.data?.message === 'expired'){
                refreshResult.error.data =  "Your login session has expired"
                api.dispatch(logOut())
                
            }
            return refreshResult
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes:['User','Setting','Message','Conversation','Notification','Contact','Url','Todo',"Note",'Diary'],
    endpoints: (builders) =>({})

})