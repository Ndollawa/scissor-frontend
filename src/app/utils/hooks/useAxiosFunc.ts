import { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { useState, useEffect } from "react";
import { URL } from "url";
const useAxiosFunc = () =>{
    

    const [response, setResponse] = useState([]);   
    const [error, setError] = useState('');  
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState<AbortController>();
    
const axiosFetch:Function | any = async (configObj:{axiosInstance:any,method:Method,url:URL,requestConfig:AxiosRequestConfig}) =>{
const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj

    try{
        setLoading(true);
        const ctrl = new AbortController();
        setController(ctrl)
        const res = await axiosInstance[method.toLowerCase()](url,{...requestConfig, signal:ctrl.signal});
        setResponse(res.data);
        // console.log(response)
    }catch(err:any){
        console.error(err.message);
        setError(err.message)
    }finally{
        setLoading(false);
    }
}

     useEffect(() => {
    
      return () => {
       controller && controller.abort();
      };
    }, [controller])
    return [response, error, loading, axiosFetch];
}

export default useAxiosFunc;