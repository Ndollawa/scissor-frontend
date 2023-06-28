// import {useState,useEffect} from 'react'
import useAxiosPrivate from './useAxiosPrivate'
import useAxiosFunc from './useAxiosFunc'
import $ from 'jquery'
// import showToast from './showToast'



const useFileUpload = ()=>{    
    const [response,error,loading,axiosFetch] = useAxiosFunc()
    const axios = useAxiosPrivate()
// const [files, setFiles] = useState([])
const getFile = (fileInput:any)=>{
    const files = fileInput.files
        const formData = new FormData()
        Object.keys(files).forEach(key => {
            formData.append("upload", files?.item(key))
            // console.log(files?.item(key).name)
        })
        return formData
}
const uploadFile = (formData:FormData, url:string)=>{
    if(formData.get('siteImage')){
//  axiosFetch({
//     axiosInstance:axios,
//     method:"post",
//     url,
//     requestConfig:{
//     data:{formData},
//     headers:{
//       "Content-Type":"multipart/form-data" ,
//     //   "Accepts":"multipart/form-data"
//     },
//    }
// });
axios.post(url,formData,{ headers:{
          "Content-Type":"multipart/form-data" 
        }})
console.log(response)
}
}
return {getFile, uploadFile}
}

export default useFileUpload