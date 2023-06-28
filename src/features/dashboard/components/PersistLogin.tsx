import { Outlet , useLocation, Navigate} from "react-router-dom";
import React,{ useState, useEffect,useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRefreshMutation } from "../../auth/authApiSlice";
import { selectCurrentToken } from '../../auth/authSlice';
import { setPreloader } from "./PreloaderSlice";
import useLocalStorage from "../../../app/utils/hooks/useLocalStorage";
import { useDashboardConfig } from '../pages/Settings/settingsConfigSlice';
import Preloader from "./Preloader";

const PersistLogin = () =>{
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [ persist ]:any = useLocalStorage('persist',false);
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const location = useLocation();
    const dispatch = useDispatch();


const [refresh,{
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
}] = useRefreshMutation();

const {layoutOptions} = useSelector(useDashboardConfig);
const {
    typography,
    version,
    layout,
    headerBg,
    primary,
    navheaderBg,
    sidebarBg,
    sidebarStyle,
    sidebarPosition,
    headerPosition,
    containerLayout,
    direction
} = layoutOptions;

useEffect(() =>{

    if(effectRan.current === true || process.env.NODE_ENV !== 'development'){
        // react 18 strict mode
        const verifyRefreshToken = async () =>{
            try{
                await refresh();
                setTrueSuccess(true)
            }catch(error){
                console.error(error);
            }
           
        }
        if(!token && persist){verifyRefreshToken()} 
       
    }
  return () =>{
     effectRan.current = true;
    }
  //eslint-disable-next-line
}, [])
 let content;
 if(!persist){
    content =  <Outlet/>
          }else if(isLoading){
            content =(
            <div className="body vh-100" data-typography={typography} data-theme-version={version} data-layout={layout} data-nav-headerbg={headerBg} data-headerbg={navheaderBg} data-sidebar-style={sidebarStyle} data-sidebarbg={sidebarBg} data-sidebar-position={sidebarPosition} data-header-position={headerPosition} data-container={containerLayout} data-direction={direction} data-primary={primary}>
                    <div className="authincation h-100">
                   <Preloader/>
                    </div>
      
                </div>)
                }else if(isError){
                  content = <Navigate to={'/auth/login'} replace state={{from:location}}/>

                }else if(!isLoading && isSuccess && trueSuccess){
                   content = <Outlet/> 
                }else if(token && isUninitialized){
                  content =  <Outlet/>
                }
    useEffect(()=>{
dispatch(setPreloader(isLoading? true :false))
},[isLoading])            
    return(
        <>
        {content}
        </>
    )
}

export default React.memo(PersistLogin);