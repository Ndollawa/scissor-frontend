import React, { useState } from 'react';
import {NavDropdown} from 'react-bootstrap';
import { FaCogs, FaUserCog } from 'react-icons/fa';
import { IoLogOutOutline} from 'react-icons/io5'
import Swal from 'sweetalert2'
import {Button} from 'react-bootstrap'
import {RxDashboard} from 'react-icons/rx'
import QRCode from 'qrcode'
import copy from 'copy-to-clipboard'
import { useAddNewUrlMutation } from '../Dashboard/urlShortenerApiSlice';
import { useSelector} from 'react-redux'
import { selectCurrentUser } from '../../../auth/authSlice'
import {useCompanyDetails,useSiteImages} from '../Settings/settingsConfigSlice'
import useUserImage from '../../../../app/utils/hooks/useUserImage';
import { useSendLogoutMutation } from '../../../auth/authApiSlice'

   
import OtherBody from '../../components/OtherBody'
import { BsToggle2Off, BsToggle2On} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BiArrowToRight, BiCopyAlt } from 'react-icons/bi';

const Home = () => {
    const [originalUrl, setOriginalUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [customUrl, setCustomUrl] = useState('')
    const [urlOption, setUrlOption] = useState(false)
    const [qrcodeDataUrl, setQRCodeDataUrl] = useState('')
    const currentUser = useSelector(selectCurrentUser)
    const userImage = useUserImage(currentUser)
   const {siteName} = useSelector(useCompanyDetails)
   const {logo,logoDark} = useSelector(useSiteImages)
   const [sendLogout] = useSendLogoutMutation()

  const[addNewUrl,{
    data,
    error,
    isError,
    isLoading,
    isSuccess
  }] = useAddNewUrlMutation()
  const Toast = Swal.mixin({
     toast: true,
     position: 'top-end',
     showConfirmButton:false,
     timer: 3000,
     timerProgressBar: true
   })
    const handleShorten = async () => {
      if(!currentUser?._id) return  Toast.fire({title:'Please Login / Register to Generate link',icon:'info'})
      if(originalUrl ==='') return  Toast.fire({title:'Please enter a valid link',icon:'error'})
    await addNewUrl({ originalURL:originalUrl,user:currentUser?._id,customUrl });
    if(!isLoading && isSuccess){
console.log(data)
        const { status,message,newURL:{originalURL,shortURL} } = data
        if(status === 'success'){
            Swal.fire({
                title:'SUCCESS: Link generated successfully',
                text:message,
                icon:'success',
                
            })
           
             setShortUrl(shortURL);
  
        // Generate QR code data URL
        const qrcodeDataUrl = await QRCode.toDataURL(window.location.origin+"/"+shortURL);
        setQRCodeDataUrl(qrcodeDataUrl);
        }else{
 Swal.fire({
                title:'ERROR! Something went wrong.',
                text:message,
                icon:'success',

            })
        }
       
    }else{
        
   }
    }
    const copyLink = (link:string)=> {
      copy(link)
      Toast.fire({title:'Copied',icon:'success'})
    
    }
  return (
    <OtherBody>
    <div className="h-100 w-100 bg-secondary pt-4">        
    <div className='d-flex justify-content-end gap-2' style={{marginRight:'4rem'}}>
        {currentUser._id?
                     <NavDropdown title={<div className='d-flex gap-2 align-items-center text-white'>{currentUser?.fullName || currentUser?.username}<img src={userImage} width='30' height={'30'} className='border-color-primary object-fit-cover border-1 rounded-circle' alt='avatar'/></div>} id="basic-nav-dropdown">
              <NavDropdown.Item href="/dashboard"><RxDashboard fontSize={'1.2rem'}/> Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/profile">
               <FaUserCog fontSize={'1.2rem'}/> My Profile
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="/dashboard/messenger"><HiOutlineChatBubbleLeftRight fontSize={'1.2rem'}/> Messenger</NavDropdown.Item> */}
              <NavDropdown.Item href="/dashboard/profile-settings"><FaCogs fontSize={'1.2rem'}/> Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onclick={()=>sendLogout()}><IoLogOutOutline fontSize={'1.2rem'}/>
                Logout
              </NavDropdown.Item>
            </NavDropdown> :  <><Button href="auth/register" size="sm" className="btn-primary rounded-pill btn btn-sm text-white">Register</Button>
                    <Button href="auth/login"className="btn-primary rounded-pill btn btn-sm text-white"  size="sm">Login</Button></>
                   
           
                } 
           
        </div>
        <div className="row justify-content-center h-100 align-items-center">

            <div className="col-md-7 col-sm-11">
                <div className="form-input-content text-center error-page">
                <div>
      <h1 className='text-white mb-3'>{siteName}</h1>
      <div className='d-flex align-items-center justify-content-center' style={{padding:'5px',background: 'linear-gradient(90.44deg, rgba(248,52,246) 0.6%,rgba(152,38,252,90%))', borderRadius:'4rem',boxShadow:'0.2rem 0.5rem 1rem black'}}>
      <div className='form-group w-100 mb-0' style={{padding:'3px 4px',backgroundColor:'white', borderRadius:'4rem'}}>
        <div className="input-group align-items-center">
        <span className="input-group-text bg-primary rounded-circle text-white fs-16 " style={{width:'3rem',height:'3rem'}}><i className="fa fa-search"></i></span>
        <input
          type="text"
          placeholder="Enter a URL"
          className='form-control border-0'
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <span className="input-group-text bg-primary rounded-pill" style={{height:'2.5`rem'}}>
        <button onClick={handleShorten} className='btn btn-sm border-0 outline-0 text-white'>Shorten</button>

        </span>
        </div>
        </div>
      </div>
      {urlOption && <div className="form-group col-lg-6 col-sm-7 d-flex justify-content-center">
        <input className="form-control rounded-pill mt-4" onChange={(e)=>setCustomUrl(e.target.value)} placeholder='Enter custom URL @example myurl'/>
      </div> }
      <div className=''>
        <span className='text-white fs-13 fw-bold mx-2'>Use custom URL?</span>
                <label htmlFor='urlOption'  className='p-10 m-3'>{urlOption?<BsToggle2On className='text-primary fw-bold' fontSize={'2rem'}/>:<BsToggle2Off className='text-primary fw-bold' fontSize={'2rem'}/>}</label>
                <input
                id="urlOption"
                type="checkbox"
                  className="setting-checkbox d-none"
                  checked={urlOption}
                  readOnly
                  onClick={()=>{setUrlOption((prev:boolean)=>!prev)}}
                />
                 </div>

      {shortUrl && (
        <div className='col-12 d-flex align-items-center justify-content-center flex-column m-auto'>
          <img src={qrcodeDataUrl} className='mx-2 w-100' alt="QR Code"width={'240'} />
          <div className="input-group w-50 input-group-sm flex-no-wrap my-2"><input type='text' className='form-control' value={window.location.origin+"/"+shortUrl} readOnly /><span className="input-group-text"><button type="button" className="btn btn-dark light shadow btn-xs sharp me-1 p-1"   onClick={()=>copyLink(window.location.origin+"/"+shortUrl)}><BiCopyAlt fontSize={'1rem'} /> </button></span></div> 
                           
        </div>
      )}
    </div>
                </div>
            </div>
            {!currentUser?._id && <>
            <div className="row col-md-6">
            <div className="col-md-4 col-sm-12">
                <div className="card px-2 py-4 d-flex justify-content-center"><div className="  p-2 fs-15">
                  <h4 className='text-secondary fw-900 text-center'>Custom URL Shortening</h4>
                  <p className="paragraph s-card ">With Scissor, you have the power to create custom, branded short links. Whether you want to promote your brand or make your links more memorable, Scissor enables you to choose your own unique URL. Say goodbye to long and complex URLs, and say hello to concise and customized links that reflect your brand identity.
</p>
                   </div>
                <button className=' w-75 h-10 mx-auto btn-secondary btn-sm rounded-pill btn-sm mt-3'>Read More <BiArrowToRight className='text-primary' fontSize={'2rem'}/></button>
                
                </div>
            </div>
            <div className="col-md-4 col-sm-12">
                <div className="card px-2 py-4 d-flex justify-content-center "><div className=" p-2 fs-15">
                  <h4 className="text-secondary fw-900 text-center">
                  Analytics and Insights
                  </h4>
                 <p className='s-card '>Gain valuable insights into your link performance with Scissor's robust analytics. Track the number of clicks, analyze geographic data, and understand user engagement. With our comprehensive analytics dashboard, you can measure the effectiveness of your campaigns, identify trends, and make data-driven decisions to optimize your marketing strategies.
</p></div>
                <button className=' w-75 h-10 mx-auto btn-secondary btn-sm rounded-pill btn-sm mt-3'>Read More <BiArrowToRight className='text-primary' fontSize={'2rem'}/></button>
                
                </div>
            </div>
            <div className="col-md-4 col-sm-12">
                <div className="card px-2 py-4 d-flex justify-content-center  "><div className=" p-2 fs-15">
                    <h4 className="text-secondary fw-900 text-center">
                    Advanced Link Management
                  </h4> 
                  <p className="paragraph s-card">Scissor offers advanced link management features to streamline your workflow. Organize your links into folders, categorize them based on campaigns or channels, and easily search for specific links. Take control of your link portfolio and efficiently manage your shortened URLs with Scissor's intuitive interface.
</p></div>
                <button className=' w-75 h-10 mx-auto btn-secondary btn-sm rounded-pill btn-sm mt-3'>Read More <BiArrowToRight className='text-primary' fontSize={'2rem'}/></button>
                </div>
            </div>
          
            </div>
           </> 

            }
        </div>
    </div>
</OtherBody>
  )
}

export default React.memo(Home)