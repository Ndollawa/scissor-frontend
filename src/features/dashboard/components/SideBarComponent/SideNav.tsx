import React ,{ReactNode, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {UserLinks, AdminLinks} from './Links';



interface sideBarLink{
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


 };
const SideNav = () => {
let [userLink, setUserLink] = React.useState(UserLinks)
let [adminLink, setAdminLink] = React.useState(AdminLinks)


const toggleMenu = (id:number,type:string)=>{
   console.log(id+" "+type)
   if(type === "user-main-menu"){
      setUserLink((prevValue)=>{
       return prevValue.map((menu)=>{ return menu.id === id ? {...menu, isOpen:!menu.isOpen } : menu})
       } );
    }else if(type === "user-sub-menu"){
      setUserLink((prevValue)=>{
         return prevValue.map((menu)=>{
            return menu.id === Math.ceil(id) ?
            { ...menu,children:menu.children!.map((smenu)=>{
               return  smenu.id === id ?
                {...smenu, isOpen:!menu.isOpen } : smenu
            })} : menu
         } )
         } )
   }
    else if(type === "admin-main-menu"){
      setAdminLink((prevValue)=>{
         return prevValue.map((menu)=>{ return menu.id === id ? {...menu, isOpen:!menu.isOpen } : menu})
         } )
   }
    else if(type === "admin-sub-menu"){
      setAdminLink((prevValue)=>{
         return prevValue.map((menu)=>{
            return menu.id === Math.ceil(id) ?
            { ...menu,children:menu.children!.map((smenu)=>{
               return  smenu.id === id ?
                {...smenu, isOpen:!menu.isOpen } : smenu
            })} : menu
         } )
         } )
   }
    
}
   const userLinks:ReactNode = userLink.map((link:sideBarLink)=>{
         
      return(<li key={link.id} onClick={ link.children? ()=>toggleMenu(link.id,"user-main-menu"): undefined} className={link.isOpen? "mm-active":undefined}><Link className={link.children?"has-arrow ai-icon":"ai-icon"} to={link.path? link.path : ""} aria-expanded={link.isOpen?"true" : "false"}>
                        {link.icon}
                        <span className="nav-text">{link.title}</span>
                    </Link>
                 {link.children ?  <ul className={link.isOpen? "left mm-show mm-collapse":"mm-collapse"} aria-expanded={link.isOpen?"true" : "false"}>
                    {
                 link.children.map((sublink)=>{
                    return(<li key={`sub-menu${sublink.id}`}  onClick={sublink.children?()=>toggleMenu(sublink.id,"user-sub-menu"): undefined}><Link to={sublink.path!} >{sublink.title}<span className="badge badge-xs badge-success">New</span></Link>
                    {sublink.children ?  <ul className="mm-collapse" aria-expanded={sublink.isOpen?"true" : "false"}>
                    {
                 sublink.children.map((innersublink)=>{
                    return(<li key={`inner-menu${innersublink.id}`}><Link to={innersublink.path}>{innersublink.title}</Link></li>)

                 })
                 }</ul>:null}
                 </li>)
                })
            }</ul>:null}</li>)}
            )
          
   const adminLinks:ReactNode = adminLink.map((link:sideBarLink)=>{
         
      return(<li key={link.id} onClick={link.children?()=>toggleMenu(link.id,"admin-main-menu"): undefined} className={link.isOpen? "mm-active":undefined}><Link className={link.children?"has-arrow ai-icon":"ai-icon"} to={link.path? link.path : ""} aria-expanded={link.isOpen?"true" : "false"}>
                        {link.icon}
                        <span className="nav-text">{link.title}</span>
                    </Link>
                 {link.children ?  <ul className={link.isOpen? "left mm-show mm-collapse":"mm-collapse"} aria-expanded={link.isOpen?"true" : "false"}>
                    {
                 link.children.map((sublink)=>{
                    return(<li key={`sub-menu${sublink.id}`}  onClick={sublink.children?()=>toggleMenu(sublink.id,"admin-sub-menu"): undefined}><Link to={sublink.path!} >{sublink.title}<span className="badge badge-xs badge-success">New</span></Link>
                    {sublink.children ?  <ul className="mm-collapse" aria-expanded={sublink.isOpen?"true" : "false"}>
                    {
                 sublink.children.map((innersublink)=>{
                    return(<li key={`inner-menu${innersublink.id}`}><Link to={innersublink.path}>{innersublink.title}</Link></li>)

                 })
                 }</ul>:null}
                 </li>)
                })
            }</ul>:null}</li>)}
            )
          
       

  return (

       
             <ul className="metismenu" id="menu">
                   {userLinks}     
        
                  {/* <li className="nav-label">Admin Section</li>
                  {adminLinks} */}
            </ul> 
  )
}

export default React.memo(SideNav)