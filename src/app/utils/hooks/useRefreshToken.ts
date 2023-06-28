import axios from "../../api/axios";
import jwt_decode from 'jwt-decode';
import {useDispatch,useSelector} from 'react-redux';
import { authProps } from "../props/authProps";
import {setCredentials} from '../../../features/auth/authSlice';

const useRefreshToken = ()=>{
   const dispatch = useDispatch()
    const refresh = async ()=>{
        const response = await axios.get('/auth/refresh',{
            withCredentials:true
        });
       const token =response.data.accessToken;
        const decodedToken:authProps['auth'] | undefined = token
        ? jwt_decode(token)
           : undefined;
        dispatch(setCredentials({user:decodedToken?.userInfo,accessToken:token }))
    //   console.log(response.data)
        return response.data.accessToken;
    }
    return refresh;
}
export default useRefreshToken;