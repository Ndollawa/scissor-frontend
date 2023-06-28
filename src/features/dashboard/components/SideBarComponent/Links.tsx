import { IoHomeOutline, IoWalletOutline} from 'react-icons/io5'
import {BiCalendarAlt, BiNotepad} from 'react-icons/bi'
import {RxDashboard} from 'react-icons/rx'
import { HiOutlineUsers} from 'react-icons/hi2'

export type sideBarLink ={
    id:number;
    icon?: string|JSX.Element;
    title?:string;
    path?:string;
    isActive?: undefined | boolean | null;
    isOpen?: undefined | boolean | null;
    children?:{
        id:number;
        icon?: string|JSX.Element;
        title?:string;
        path?:string;
        isActive?: undefined | boolean | null;
        isOpen?: undefined | boolean | null;
        children?:{
            id:number,
        path:string,
        title:string,
        icon?: string|JSX.Element,
        }[]
    }[]


 }[]
 export const UserLinks:sideBarLink=[
     {
        id:0,
        title:'Home',
        icon:<IoHomeOutline  fontSize={"2rem"}/>,
        path:"/"
    },
     {  id:1,
    title:'Dashboard',
    icon:<RxDashboard fontSize={"2rem"}/>,
    path:"/dashboard"},
    {
        id:2,
    title:'Notes',
    icon:<BiNotepad fontSize={"2rem"}/>,
    path:"/dashboard/notes"
    },
    {
        id:4,
        title:'Calendar',
        icon:<BiCalendarAlt fontSize={"2rem"}/>,
        path:"/dashboard/calendar"
    },
    
    ]

    export const AdminLinks:sideBarLink =[{
        id:6,
        title:'User Management',
        icon:<HiOutlineUsers fontSize={"2rem"}/>,
        // path:
        isOpen:false,
        children:[
         { 
            id:6.0,
            title:'Users',
        // icon:
            path: '/users'
        },
        {
            id:6.1,
            title:'Team members',
            // icon:
                path: '/our-team'
        }],
        
    },
    // {
    //     id:7,
    //     title:'Blog Post Management',
    //     icon:<FaPodcast fontSize={"2rem"}/>,
    //     path:'/dashboard/posts',
    //     isActive:false,
    //     isOpen:false
    // }
    // ,{
    //     id:8,
    //     title:'Rooms Management',
    //     icon:<IoChatbubblesOutline fontSize={"2rem"}/>,
    //     path:'/dashboard/rooms',
    //     isActive:false,
    //     isOpen:false
    // }
    // ,{
    //     id:9,
    //     title:'Slider Management',
    //     icon:<TfiLayoutMediaCenter fontSize={"2rem"}/>,
    //     path:'/dashboard/slides',
    //     isActive:false,
    //     isOpen:false
    // }
    // ,{
    //     id:10,
    //     title:'Team Management',
    //     icon:<FaPeopleArrows fontSize={"2rem"}/>,
    //     path:'/dashboard/our-team',
    //     isActive:false,
    //     isOpen:false
    // }
    // ,{
    //     id:11,
    //     title:'Services Management',
    //     icon:<FaServicestack fontSize={"2rem"}/>,
    //     path:'/dashboard/services',
    //     isActive:false,
    //     isOpen:false
    // }
    // ,{
    //     id:12,
    //     title:'FAQ Management',
    //     icon:<FaRegQuestionCircle fontSize={"2rem"}/>,
    //     path:'/dashboard/faq',
    //     isActive:false,
    //     isOpen:false
    // }
]