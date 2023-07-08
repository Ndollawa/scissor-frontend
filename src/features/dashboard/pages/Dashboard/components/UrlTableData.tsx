import React, {useState, useEffect,useMemo } from 'react'
import Swal from 'sweetalert2'
import { HiQrCode } from 'react-icons/hi2'
import { BiCopyAlt, BiGlobeAlt, BiShareAlt } from 'react-icons/bi'
import QRCode  from 'qrcode'
import $ from 'jquery'
import copy from 'copy-to-clipboard'
import {useDeleteUrlMutation } from '../urlShortenerApiSlice'
import showToast from '../../../../../app/utils/hooks/showToast'
import initDataTables, { destroyDataTables } from '../../../../../app/utils/initDataTables'
import { useSelector} from 'react-redux'
import {useCompanyDetails} from '../../Settings/settingsConfigSlice'
import { Link } from 'react-router-dom'
import { IoAnalyticsSharp } from 'react-icons/io5'


interface modalDataProps {
    modalData:{
       data:{
          _id:string | number;
          originalURL: string;
          shortURL: string;
          user: string;
          traffic: any;
          clicks: number;
          status: string;
      } | null,
      showModal:boolean,
    } 
    }
const UrlTableData = ({url,index,showEditForm}:any) => {
   const {siteName} = useSelector(useCompanyDetails)
  const [qrcodeDataUrl, setQRCodeDataUrl] = useState('')
 
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton:false,
      timer: 3000,
      timerProgressBar: true
    })
 
    const [deleteUrl, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }]:any = useDeleteUrlMutation()
    const onDeleteUrl = async (_id:string) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-sm m-2 btn-success',
              cancelButton: 'btn btn-sm m-2 btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {  
              await deleteUrl({ _id })
        if(isDelError) return showToast('error',JSON.stringify(delerror?.data?.message))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Url has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Operation aborted, entry is safe  :)',
                'error'
              )
            }
          })
      
    }
// 

useEffect(() => {

  destroyDataTables($('#dataTable'))
    initDataTables($('#dataTable'),"Generated Links")
  return () => {
   destroyDataTables($('#dataTable'))
  }
}, [url])
const showDetails  = useMemo(()=>{ return async(shortURL:string)=>{
   // Generate QR code data URL
   const qrcodeDataUrl = await QRCode.toDataURL(shortURL);
   setQRCodeDataUrl(qrcodeDataUrl);
  Swal.fire({
    width: 400,
    padding: '3em',
    html: `<div class="d-flex align-items-center justify-content-center flex-column">
    <img src=${qrcodeDataUrl} alt="QR Code" width="320" /> </div>`,
    // allowOutsideClick:false,
    // allowEscapeKey:false,
    // showCancelButton:false,
    showConfirmButton:false,
    // color: '#000000',
    backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `
    });

  }},[])
    if (url) {
        const created = new Date(url.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })
        const urlData = {
        data:{
        _id:url?._id,
        originalURL:url.originalURL,
        shortURL:window.location.origin+"/"+url.shortURL,
        clicks:url.clicks,
        status:url.status

        },
        showModal:true
    }
    let urltatus
    switch (url.status) {
    case 'active':
        urltatus =<span className="badge rounded-pill light badge-success">{url.status}</span>
        break;
    case 'inactive':
        urltatus =<span className="badge rounded-pill light badge-warning">{url.status}</span>
        break;
   
    default:
        urltatus = ""
        break;
}
const share = async({data}:any)=>{
  const {shortURL} = data
  // const qrcodeDataUrl = await QRCode.toDataURL(shortURL);
try {
  await navigator.share({
  title:siteName,
  text:shortURL,
   url: shortURL,
  //  files: [qrcodeDataUrl]
  });
// Toast.fire({title:'Please Login / Register to Generate link',icon:'info'})

} catch (error) {
  Toast.fire({title:'Oops Something went wrong',icon:'error'})

}
}

const copyLink = (link:string)=> {
  copy(link)
  Toast.fire({title:'Link copied',icon:'success'})

}

        return (
            <tr key={url?._id}>
                    <td>{++index}</td>
                    <td><BiGlobeAlt fontSize={'1rem'}/>&ensp; <a className='d-flex w-40' href={url.originalURL} target='_blank'>{url.originalURL}</a></td>
                    <td>{urltatus}</td>
                    <td><i className="fa fa-users"></i>&ensp; ({url.clicks})</td>
                    <td>{created}</td>
                    <td>
                    <div className="d-flex align-items-center w-100 flex-no-wrap gap-2"  style={{width:'500px'}}>
                          <div className="input-group input-group-sm  w-100"><input type='text' className='form-control' value={window.location.origin+"/"+url.shortURL} readOnly /><span className="input-group-text"><button type="button" className="btn btn-dark light shadow btn-xs sharp me-1 p-1" title='Click to copy'  onClick={()=>copyLink(window.location.origin+"/"+url.shortURL)}><BiCopyAlt fontSize={'1rem'} /> </button></span></div> 
                            <Link type="button" className="btn btn-cyan light shadow btn-xs sharp me-1 p-1" title='View analytic' to={`/dashboard/url/${url?._id}`} > <IoAnalyticsSharp fontSize={'1rem'} /></Link>
                            <button type="button" className="btn btn-warning light shadow btn-xs sharp me-1 p-1" title='Click to copy'  onClick={()=>share(urlData)}> <BiShareAlt fontSize={'1rem'} /> </button>
                             <button type="button" className="btn btn-success light shadow btn-xs sharp me-1 p-1" title='Show QRcode'     onClick={()=>showDetails(window.location.origin+"/"+url?.shortURL)}><HiQrCode fontSize={'1rem'}/></button>
                            <button type="button" className="btn btn-info light shadow btn-xs sharp me-1 p-1" title='Click to edit'  onClick={()=>showEditForm(urlData)}><i className="fas fa-pencil-alt"></i></button>
                            <button className="btn light btn-danger shadow btn-xs sharp" onClick={()=>onDeleteUrl(url?._id)} title='Delete'><i className="fa fa-trash"></i></button>
                        </div>													
                    </td>												
                </tr>
        )
    
    } else return null
  
}

export default React.memo(UrlTableData)