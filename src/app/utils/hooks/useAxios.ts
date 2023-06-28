import { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
const useAxios = (configObj:any) =>{
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj

    const [response, setResponse] = useState([]);   
    const [error, setError] = useState('');  
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    
    const refetch = () =>setRefresh(prev=> !prev);
    useEffect(() => {
        const controller = new AbortController();
const fetchData = async () => {
        try{
            const res = await axiosInstance[method.toLowerCase()](url,{ ...requestConfig, signal:controller.signal});

            setResponse(res.data);
            // console.log(res);
        }catch(err:any){
            console.error(err.message);
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }
    fetchData();
      return () => {
       controller && controller.abort();
      };

      //eslint-disable-next-line
    }, [refresh])
    return [response, error, loading, refetch];
}

export default useAxios;