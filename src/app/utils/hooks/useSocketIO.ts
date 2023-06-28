import {io,Socket} from 'socket.io-client'
import { useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/auth/authSlice'

const useSocketIO = () =>{
const socket = useRef<any>()
const user = useSelector(selectCurrentUser)
useEffect(()=>{
   const socketIO:Socket = io('http://localhost:3501')
   socket.current = socketIO
   socket.current.emit('addUser', user._id)
   return ()=>{
    socket.current.disconnect()
}
},[])
return socket
}

export default useSocketIO