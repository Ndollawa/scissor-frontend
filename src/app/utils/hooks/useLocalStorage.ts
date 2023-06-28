import { useState, useEffect } from "react";

const getLocalValue =  (key:string, initValue:any)=>{
    //SSR eg. Next.JS
    if (typeof window === 'undefined') return initValue;

    //if a vlaue is already stored
    const localValue =JSON.parse(localStorage.getItem(key)!);
    if(localValue) return localValue;

    //return result of a func
    if (initValue instanceof Function) return initValue;

    return initValue;
}

const useLocalStorage = (key:string, initValue:any)=>{
        const [value, setValue] = useState(()=> getLocalValue(key,initValue));

        useEffect(()=>{
                localStorage.setItem(key, JSON.stringify(value));
        },[key,value])
        return [value,setValue];
}

export default useLocalStorage