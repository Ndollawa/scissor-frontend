// import { useState } from "react";
import useLocalStorage from "./useLocalStorage";


const useToggle = (key:string, initValue:any)=>{
        // const [value, setValue] = useState(initValue);
        const [value, setValue] = useLocalStorage(key,initValue);

 const toggle = (value:any) =>{
        setValue((prev:any) =>{
                return typeof value === 'boolean' ?  value : !prev ;
        })
        // console.log(value)
 }    
      
      
      return  [value, toggle ]
}

export default useToggle;