import React, {useState, useEffect,useMemo } from 'react'
import Swal from 'sweetalert2'
import { BiCopyAlt, BiGlobeAlt, BiShareAlt } from 'react-icons/bi'
import $ from 'jquery'
import {useGetUrlQuery } from '../urlShortenerApiSlice'
import initDataTables, { destroyDataTables } from '../../../../../app/utils/initDataTables'
import { useSelector} from 'react-redux'
import {useCompanyDetails,useSiteImages} from '../../Settings/settingsConfigSlice'


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
const AnalyticsTableData = ({url,index}:any) => {
   const {siteName} = useSelector(useCompanyDetails)
  const [qrcodeDataUrl, setQRCodeDataUrl] = useState('')
 
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton:false,
      timer: 3000,
      timerProgressBar: true
    })
 const data = [
  {
id:1,
year:'2013',
userGain:789,
userLost:76
 },
  {
id:2,
year:'2014',
userGain:89,
userLost:760
 },
  {
id:3,
year:'2015',
userGain:7389,
userLost:763
 },
  {
id:1,
year:'2016',
userGain:789,
userLost:76
 }
]
  
useEffect(() => {

  destroyDataTables($('#dataTable'))
    initDataTables($('#dataTable'),"Link Report")
  return () => {
   destroyDataTables($('#dataTable'))
  }
}, [url])
        const created = new Date(url.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })
    


        return (
            <tr key={url?._id}>
                    <td>{++index}</td>
                    <td><BiGlobeAlt fontSize={'1rem'}/>&ensp; <a href={url?.referrer} target='_blank'>{url.referrer}</a></td>
                    <td>{url?.userAgent}</td>
                    <td>{url.ip}</td>
                    <td>{url?.city}{url?.regionName}</td>
                    <td>{url?.country}</td>
                    <td>{url?.timezone}</td>
                    <td>{url?.isp}</td>
                    <td>{created}</td>
                    										
                </tr>
        )
    
   
}

export default React.memo(AnalyticsTableData)