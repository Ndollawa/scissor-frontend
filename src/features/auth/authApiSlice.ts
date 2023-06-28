import { apiSlice } from "../../app/api/apiSlice";
import { logOut , setCredentials} from "./authSlice";
import jwt_decode from 'jwt-decode';
import { authProps } from "../../app/utils/props/authProps";
import localStorage from "redux-persist/es/storage";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation<any, any>({
           query:credentials=>({
                url: '/auth/login',
                method: 'POST',
                body:{
                    ...credentials
                },
                
            }),
        }),
        register:builder.mutation({
            query:credentials=>({
                url:'/auth/register',
                method:'POST',
                body:{
                    ...credentials
                }
            })
        }),
        sendLogout:builder.mutation<any, void>({
            query:()=>({
                url:'/auth/logout',
                method:'POST',
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try {
                //    const data =
                    await queryFulfilled
                   dispatch(logOut())
                    setTimeout(()=>{
                   dispatch(apiSlice.util.resetApiState())
                    },1000) 
                    localStorage.removeItem('persist:rootApp')
                } catch (error) {
                    console.log(error)
                }
            }
        }),   
         refresh:builder.mutation<any, void>({
            query:()=>({
                url:'/auth/refresh',
                method:'GET',
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const {data}= await queryFulfilled
                    const{accessToken} = data
                    // console.log(accessToken)
                    const decodedToken:authProps['auth'] | undefined = accessToken
                    ? jwt_decode(accessToken)
                       : undefined;
                    const  user_info = decodedToken?.userInfo
            //    console.log(user_info)
                    dispatch(setCredentials({accessToken,user_info}))
                } catch (error) {
                    
                    console.log(error)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useSendLogoutMutation 
} = authApiSlice;