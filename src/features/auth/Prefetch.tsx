import { store } from "../../app/stores/store";
import {usersApiSlice} from "../dashboard/pages/Users/usersApiSlice";
// import { messagesApiSlice } from "../dashboard/pages/Messenger/messagesApiSlice";
import { urlApiSlice } from "../dashboard/pages/Dashboard/urlShortenerApiSlice";
import { settingsApiSlice } from "../dashboard/pages/Settings/settingApiSlice";
import {useSelector} from 'react-redux';
import { selectCurrentUser } from "./authSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch =()=>{
  const user = useSelector(selectCurrentUser)
  useEffect(() => {
    store.dispatch(settingsApiSlice.util.prefetch('getSettings', 'settingsList', { force: true }))
    store.dispatch(urlApiSlice.util.prefetch('getUrl', 'urlsList', { force: true }))
   if(user._id){
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    // store.dispatch(conversationsApiSlice.util.prefetch('getConversations', 'conversationsList', { force: true }))
    // store.dispatch(messagesApiSlice.util.prefetch('getMessages', 'messagesList', { force: true }))
   } 
}, [])
    return <Outlet/>
}

export default Prefetch