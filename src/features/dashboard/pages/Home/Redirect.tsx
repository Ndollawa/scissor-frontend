import React, { useCallback, useEffect, useState } from 'react';
import { useParams,  useNavigate} from 'react-router-dom';
import {PulseLoader} from 'react-spinners'
import { useUpdateUrlClickMutation, useGetUrlQuery } from '../Dashboard/urlShortenerApiSlice';
import { useSelector} from 'react-redux'
import { selectCurrentUser } from '../../../auth/authSlice'
import OtherBody from '../../components/OtherBody'
import { urlProps } from '../../../../app/utils/props/urlProps';

const Redirect = () => {
    const currentUser = useSelector(selectCurrentUser)
    const [isRedirecting, setIsRedirecting] = useState(true)
  const {urlLink} = useParams()
  const navigate = useNavigate()
    // console.log(urlLink)
    const [updateUrlClick, {
      isLoading,
      isSuccess,
      isError,
      error
    }]= useUpdateUrlClickMutation()
  const { linkInfo } = useGetUrlQuery("urlList", {
    selectFromResult: ({ data }) => ({
      linkInfo: data?.ids?.map((id:string)=>data?.entities[id]).find((link:urlProps)=>(link?.shortURL === urlLink && link?.status === 'active'))			 
    }),
    }) 
    const updateClick = useCallback(
       async()=>{
      if(!linkInfo) return
      await updateUrlClick({ _id:linkInfo?._id})
    }
     ,[linkInfo]
    )

  useEffect(() => {  
    // if(linkInfo) 
 if(!linkInfo) return navigate('/error/404')
  updateClick()
 window.location.replace(linkInfo?.originalURL)
// setIsRedirecting(false)
  })

  return (
    <OtherBody>
    <div className="h-100 w-100 bg-secondary pt-4">        
    <div className='d-flex align-items-center h-100 justify-content-center gap-2' style={{marginRight:'4rem'}}>
<h2 className='text-white'>Redirecting</h2><br/><br/>
<PulseLoader  loading={isRedirecting} color={'#ffffff'} size={'0.8rem'} />
     </div>
    </div>
</OtherBody>
  )
}

export default React.memo(Redirect)