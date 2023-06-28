import React, {ChangeEvent,FormEvent,useState } from 'react'
import { useAddNewUrlMutation } from '../urlShortenerApiSlice'
import { BsToggle2Off, BsToggle2On} from 'react-icons/bs';
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import showToast from '../../../../../app/utils/hooks/showToast'
import { useSelector} from 'react-redux'
import { selectCurrentUser } from '../../../../auth/authSlice'
 
const CreateUrlForm = () => {

  const [originalURL, setOriginalURL] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [customUrl, setCustomUrl] = useState('')
    const [urlOption, setUrlOption] = useState(false)
    const [qrcodeDataUrl, setQRCodeDataUrl] = useState('')
const [status, setStatus] = useState('active')
const [show, setShow] = useState(false)
const currentUser = useSelector(selectCurrentUser)
const [addNewUrl, {
  isLoading,
  isSuccess,
  isError,
  error
}]:any = useAddNewUrlMutation()

// const navigate = useNavigate()

React.useEffect(() => {
  if (isSuccess) {
     setCustomUrl('')
     setOriginalURL('')
     setUrlOption(false)
     setStatus('active')
      setShow(false)
  }
}, [isSuccess])

const canSave = [originalURL,status].every(Boolean) && !isLoading

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


const handleSubmit = async(e:FormEvent)=>{
e.preventDefault();
 if (canSave) {
      await addNewUrl({ originalURL,user:currentUser?._id,customUrl,status })
      if(isError) return showToast('error',JSON.stringify(error?.data?.message))
     showToast('success', 'Url created successfully')
  }

}

  return (
    <>
<button type="button" className="btn btn-primary mb-2 rounded-pill pull-right"  onClick={handleShow}>Add New</button>
  
<Modal show={show} size="lg" centered backdrop='static'
 onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Url</Modal.Title>
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
            Generate Url          </Button>
        </Modal.Footer>
            </form>
      </Modal>
    </>
  )
}

export default React.memo(CreateUrlForm)