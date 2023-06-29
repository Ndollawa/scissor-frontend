import React, {ChangeEvent,FormEvent,useState,useEffect} from 'react'
import { useUpdateUrlMutation} from '../urlShortenerApiSlice'
import {Modal} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { BsToggle2Off, BsToggle2On} from 'react-icons/bs';
import showToast from '../../../../../app/utils/hooks/showToast'
import { useSelector} from 'react-redux'
import { selectCurrentUser } from '../../../../auth/authSlice'




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
const EditUrlModal = ({modalData:{data,showModal}}:modalDataProps) => {
  const [originalURL, setOriginalURL] = useState(data?.originalURL!)
    // const [shortUrl, setShortUrl] = useState(data?.shortURL!)
    const [customUrl, setCustomUrl] = useState('')
    const [urlOption, setUrlOption] = useState(false)
    // const [qrcodeDataUrl, setQRCodeDataUrl] = useState('')
const [status, setStatus] = useState(data?.status!)
const [show, setShow] = useState(false)
const currentUser = useSelector(selectCurrentUser)

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [updateUrl, {
  isLoading,
  isSuccess,
  isError,
  error
}]:any = useUpdateUrlMutation()

// const navigate = useNavigate()
React.useEffect(() => {
  if (isSuccess) {
     
      setShow(false)
  }
}, [isSuccess])
useEffect(() => {
  setShow(showModal)
  setOriginalURL(data?.originalURL!)
    return () => {
      setShow(false)
      setStatus(data?.status!)
      
    };
  }, [data])
const canSave = [originalURL,status].every(Boolean) && !isLoading

const handleSubmit = async(e:FormEvent)=>{
e.preventDefault();
 if (canSave) {
      await updateUrl({_id:data?._id, originalURL,user:currentUser?._id,customUrl,status})
      if(isError) return showToast('error',JSON.stringify(error?.data?.message))
      showToast('success', 'Url updated successfully')
  }

}

  return (
    <>
  
  
  <Modal show={show} size="lg" centered backdrop='static'
 onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Url</Modal.Title>
        </Modal.Header>
         <form onSubmit={handleSubmit}>
        <Modal.Body>
               
        <div className="card-body">
          <div className="basic-form">
              <div className="row">
                <div className="mb-3 col-md-9">
                  <label className="form-label"><strong>Original URL</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={originalURL}
                    onChange={(e)=>setOriginalURL(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-3">
                  <label className="form-label"><strong>Status</strong></label>
                  <select
                    id="inputState"
                    className="default-select form-control wide"
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                   
                  >
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </select>
                </div>
                <div className='col-12'>
        
                <label htmlFor='urlOption'  className='p-10 m-3'>{urlOption?<BsToggle2On className='text-primary fw-bold' fontSize={'2rem'}/>:<BsToggle2Off className='text-primary fw-bold' fontSize={'2rem'}/>}</label>
                <input
                id="urlOption"
                type="checkbox"
                  className="setting-checkbox d-none"
                  checked={urlOption}
                  readOnly
                  onClick={()=>{setUrlOption((prev:boolean)=>!prev)}}
                /><span className='fw-bold mr-2'>Use custom URL?</span>
                 </div>

               {urlOption && <div className="col-12">
                  <label className="form-label"><strong>Custom URL</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={customUrl}
                    onChange={(e)=>setCustomUrl(e.target.value)}
                  />
                </div>
             }
                
              
               
              </div>
             
          </div>
  
                    </div>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={!canSave}  >
            Update Url
          </Button>
        </Modal.Footer>
            </form>
      </Modal>
    </>
  )
}

export default React.memo(EditUrlModal)