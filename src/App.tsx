import React,{useContext} from 'react'
import {Navigate, Routes,Route,useLocation} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {ToastContainer} from 'react-toastify'
import { selectCurrentToken } from './features/auth/authSlice';
import RequireAuth from './features/dashboard/components/RequireAuth';
import PersistLogin from './features/dashboard/components/PersistLogin';
import Prefetch from './features/auth/Prefetch';


// Error pages
import Error400 from './features/errorPages/Error400';
import Error401 from './features/errorPages/Error401';
import Error403 from './features/errorPages/Error403';
import Error404 from './features/errorPages/Error404';
import Error500 from './features/errorPages/Error500';
import Error503 from './features/errorPages/Error503';

// dashboar pages
import Dashboard from './features/dashboard/pages/Dashboard/HomePage'
import Home from './features/dashboard/pages/Home/Home'
import Profile from './features/dashboard/pages/Profile/Profile';
import ProfileEdit from './features/dashboard/pages/Profile/ProfileEdit';
// import Chat from './features/dashboard/pages/Messenger/Chat';
import User from './features/dashboard/pages/Users/User';

// auth routes
import Login from './features/auth/Login';
import LockScreen from './features/auth/LockScreen';
import Register from './features/auth/Register';

// settings
import SiteSettings from './features/dashboard/pages/Settings/SiteSettings';
import GeneralSettings from './features/dashboard/pages/Settings/components/GeneralSettings';
import HomePageSettings from './features/dashboard/pages/Settings/components/HomePageSettings';
import AboutUs from './features/dashboard/pages/Settings/components/AboutUs';
import TermsConditionsSetting from './features/dashboard/pages/Settings/components/TermsConditions';
import PrivacyPolicySetting from './features/dashboard/pages/Settings/components/PrivacyPolicy';
import SiteImage from './features/dashboard/pages/Settings/components/SiteImage';
import Layout from './features/Layout/Layout';
import { useGetSettingsQuery } from './features/dashboard/pages/Settings/settingApiSlice';
import { setSettings,  useSettings } from './features/dashboard/pages/Settings/settingsConfigSlice';
import Notes from './features/dashboard/pages/Note/Notes';
import Calendar from './features/dashboard/pages/Calendar/Calendar';
import Redirect from './features/dashboard/pages/Home/Redirect';
import URLAnalytics from './features/dashboard/pages/Dashboard/URLAnalytics';
// import SocketIO from './app/utils/context/SocketIO';


const App= ()=>{
const [pageTitle, setPageTitle] = React.useState("Home");
const location  = useLocation()
// console.log('location',location)
const dispatch = useDispatch()
const currentToken = useSelector(selectCurrentToken)
const {
    data: settings,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSettingsQuery('settingList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })
  //  const {_id} = useSelector(useSettings)
  const { setting } = useGetSettingsQuery("settingsList", {
    selectFromResult: ({ data }) => ({
        setting: data?.entities[data.ids[0]]
    }),
  })
  // console.log(_id)
  React.useEffect(() => {
    if(!isLoading && isSuccess) dispatch(setSettings(setting))
   
  }, [setting,isSuccess,isLoading])
  return (
      
            <>
                    
            <ToastContainer/>
          <Routes>
            {/* Public Routes */}{/* ^/$|/index(.html)? */}
            
              
            <Route element={<Prefetch/>}>
            <Route path="/" element={<Layout pageData={{pageTitle:pageTitle,coverImage:'assets/images/backgrounds/page-header-bg-1-1.jpg'}}/>} >
                <Route index element={<Home/>} />
               <Route path="/:urlLink" element={<Redirect />} />
                {/*  <Route path="contact" element={<Contact pageData={{pageTitle:"Contact"}}/>} /> */}
 
                <Route path="auth" >
                      <Route path="login" element={currentToken?<Navigate state={{from:location.pathname}} to={'/dashboard'}/> :<Login />} />
                      <Route path="register" element={currentToken?<Navigate state={{from:location.pathname}} to={'/dashboard'}/> :<Register/>} />
                  
              </Route>
                <Route path="error" >
                      <Route path="400" element={<Error400 />} />
                      <Route path="401" element={<Error401 />} />
                      <Route path="403" element={<Error403 />} />
                      <Route path="404" element={<Error404 />} />
                      <Route path="500" element={<Error500 />} />
                      <Route path="503" element={<Error503/>} />
              </Route>
              </Route>
            

          
           
             {/* End Public Routes */}

              {/* Protected Routes */}

            <Route element={<PersistLogin />} >
            <Route element={<RequireAuth allowedRoles={[1002,1003]} />} >
            <Route path="/dashboard" element={<Layout pageData={{pageTitle:"Dashboard"}}/>} >
                  <Route index element={<Dashboard/>} />
                  <Route path="notes" element={<Notes/>} />
                  <Route path="calendar" element={<Calendar/>} />
                  <Route path="profile" element={<Profile/>} />
                  <Route path="profile/edit" element={<ProfileEdit />} />
                  <Route path="url/:id" element={<URLAnalytics />} />
                  {/* <Route path="contacts" element={<Contacts pageData={{pageTitle:"Contacts",coverImage:'assets/images/backgrounds/page-header-bg-1-1.jpg'}}/>} />
                  <Route path="users" element={<Users pageData={{pageTitle:"Users",coverImage:'assets/images/backgrounds/page-header-bg-1-1.jpg'}}/>} /> */}
                  <Route path="users/user/:userId" element={<User pageData={{pageTitle:"User",coverImage:'assets/images/backgrounds/page-header-bg-1-1.jpg'}}/>} />
                  {/* <Route path="messenger" element={<Chat pageData={{pageTitle:"Messenger",coverImage:'assets/images/backgrounds/page-header-bg-1-1.jpg'}}/>} />
                  <Route path="messenger/:id" element={<Chat pageData={{pageTitle:"Messenger",coverImage:'assets/images/backgrounds/page-header-bg-1-1.jpg'}}/>} /> */}
                 
            <Route element={<RequireAuth allowedRoles={[1000,1001]} />} >
                 <Route path="settings/" element={<SiteSettings/>} >
                      <Route index element={<GeneralSettings/>} />
                      <Route path="general" element={<GeneralSettings/>} />
                      <Route path="home-page" element={<HomePageSettings/>} />
                      <Route path="about-us" element={<AboutUs/>} />
                      <Route path="privacy-and-policy" element={<PrivacyPolicySetting/>} />
                      <Route path="contact-us" element={<SiteSettings/>} />
                      <Route path="site-images" element={<SiteImage/>} />
                      <Route path="terms-and-conditions" element={<TermsConditionsSetting/>} />
                  </Route> 
              </Route>
            </Route> 
             {/* End Protected Routes */}
            </Route>
            </Route>
           </Route>
            <Route path='*'  element={<Navigate to="error/404" state={{from:location.pathname}}/>}/>
          </Routes>
</>
  );
}

export default React.memo(App);
