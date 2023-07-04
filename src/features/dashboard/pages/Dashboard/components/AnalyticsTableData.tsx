import React, { useEffect} from 'react'
import { BiGlobeAlt } from 'react-icons/bi'
import $ from 'jquery'
import initDataTables, { destroyDataTables } from '../../../../../app/utils/initDataTables'


const AnalyticsTableData = ({url,index}:any) => {
 
  
  
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
                    <td>{url?.ipInfo?.city}</td>
                    <td>{url?.ipInfo?.country}</td>
                    <td>{url?.ipInfo?.timezone}</td>
                    <td>{url?.ipInfo?.isp}</td>
                    <td>{url?.createdAt}</td>
                    										
                </tr>
        )
    
   
}

export default React.memo(AnalyticsTableData)