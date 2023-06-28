import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import { authProps } from "../props/authProps";

const useAuth = ()=>{

    const token =useSelector(selectCurrentToken)
    let isAdmin, isUser, isDev, isStaff = false
    let role = 'User'
    if(token){
        const decodedToken:authProps['auth'] | undefined = jwtDecode(token)
        const {username,user,roles}= decodedToken?.userInfo!
        
        isUser = roles?.includes(1002)
        isStaff = roles?.includes(10003)!
        isAdmin = roles?.includes(1001)
        isDev = roles?.includes(1000)

        if(isAdmin) role = "Admin" 
        if(isDev) role = "Developer" 
        if(isUser) role = "User" 
        if(isStaff) role = "Staff" 
    }
    return {username:'',user: '', roles:[], isAdmin,isDev,isStaff,role}
}

export default useAuth