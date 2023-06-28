import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/auth/authSlice'
import useLocalStorage from './useLocalStorage'
import useSocketIO from './useSocketIO'

const useUserActivity = ()=>{
const [lastSeen, setLastSeen] = useLocalStorage('lastSeen',new Date())
const currentUser = useSelector(selectCurrentUser)
const socket = useSocketIO()
const {_id,online:onlineStatus} = currentUser

// console.log(onlineStatus)
const checkConnectivity = async() =>{
    try {
      const online = await fetch('1pixel.png')
      
if( online.status >= 200 && online.status < 300  ) socket.current.emit('userActivity', {_id,online:{...onlineStatus,status:true}})
    } catch (error) {
      socket.current.emit('userActivity', {_id,online:{...onlineStatus,status:false}}) 
    }
}
const checkInActivity = async() =>{
(lastSeen < Date.now())? socket.current.emit('userActivity', {_id,online:{...onlineStatus,status:false}}):  socket.current.emit('userActivity', {_id,online:{status:true,lastSeen:Date.now()}})
}
const updateLastSeen = async() =>{
setLastSeen(Date.now() + 60000)
}
useEffect(() => {
    const interval = setInterval( async()=>{
checkInActivity()
// await checkConnectivity()
    },5000)
  return () =>clearInterval(interval)
}, [])
useEffect(() => {
    window.addEventListener('click',updateLastSeen)
    window.addEventListener('keypress',updateLastSeen)
    window.addEventListener('scroll',updateLastSeen)
    window.addEventListener('mousemove',updateLastSeen)
  return () => {
    window.removeEventListener('click',updateLastSeen)
    window.removeEventListener('keypress',updateLastSeen)
    window.removeEventListener('scroll',updateLastSeen)
    window.removeEventListener('mousemove',updateLastSeen)
  };
}, [])
}

export default useUserActivity