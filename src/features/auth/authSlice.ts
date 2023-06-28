import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../app/stores/store';
import userInterface from '../../app/utils/props/userProps';


interface authProps extends userInterface{
    token: string | null;
}
const authSlice = createSlice({
    name:'auth',
    initialState:{ 
        token: null, 
        user: { 
            _id:undefined,
            email:undefined,
            firstName:undefined,
            lastName:undefined,
            fullName:undefined,
            username:undefined,
            phone:undefined,
            dob:undefined,
            gender: undefined,
            address: undefined,
            city: undefined,
            online:{
                status:undefined,
                lastSeen:undefined,
             },
            state: undefined,
            country: undefined,
            occupation: undefined,
            bio: undefined,
            userImage:undefined,
            accountStatus:undefined,
            verificationStatus:undefined,
            accountSecurity_2FA:undefined,
            roles:undefined,
            

        }
    } as authProps, 
    reducers:{
        setCredentials: (state, action) =>{
            const {accessToken , user_info} = action.payload;
            state.token = accessToken;
            if(user_info){
                // console.log(user_info)
            state.user = user_info;
            }
        },
        logOut: (state):void =>{
            state.token = null;
            state.user = { 
                _id:undefined,
                email:undefined,
                firstName:undefined,
                lastName:undefined,
                fullName:undefined,
                username:undefined,
                phone:undefined,
                dob:undefined,
                gender: undefined,
                address: undefined,
                city: undefined,
                state: undefined,
                country: undefined,
                occupation: undefined,
                online:{
                    status:undefined,
                    lastSeen:undefined,
                 },
                bio: undefined,
                userImage:undefined,
                accountStatus:undefined,
                verificationStatus:undefined,
                accountSecurity_2FA:undefined,
                roles:undefined,
                }
        }
    },
   
})


 export const {setCredentials, logOut} = authSlice.actions;

 export default authSlice.reducer;
 export const selectCurrentToken = (state:RootState) => state.auth.token;
 export const selectCurrentUser = (state:RootState) => state.auth.user;