import React, { FormEvent,FormEventHandler,useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch,useSelector } from 'react-redux';
import { usePagesSettingsMutation } from '../settingApiSlice';
import { setPagesSetting, useSettings } from '../settingsConfigSlice';
import { usePages } from '../settingsConfigSlice';
import showToast from '../../../../../app/utils/hooks/showToast';


const PrivacyPolicy = () => {

  const pages = useSelector(usePages)
  const [privacy, setPrivacy] = useState(pages.privacyPolicy) 
  const dispatch = useDispatch();
  const [pagesSetting,isLoading] = usePagesSettingsMutation();
  const {_id} = useSelector(useSettings)

const updateSetting:FormEventHandler = async(e:FormEvent)=>{
  e.preventDefault();
  try {
    const data = {...pages,privacyPolicy:privacy}
    await  pagesSetting({_id,data}).unwrap();
   dispatch(setPagesSetting({data})) ;
   showToast('success',"Settings Updated successfully!")

  }  catch (error:any) {
    showToast('error',error)
  }
}

  return (
    <div className="card">
    <div className="card-header  bg-primary">
      <h4 className="card-title text-white">Privacy  and Policy</h4>
    </div>
    <div className="card-body">
      <div className="basic-form">
        <form onSubmit={updateSetting}>
          <div className='row'>
          
              <div className="col-md-12">

                  {/* <label><strong>Privacy and Policy</strong></label>
                */}<Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        value={privacy}
        onEditorChange={(newValue, editor)=>setPrivacy(newValue)}
        initialValue={pages.privacyPolicy}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
              </div>
          <div className="card-footer d-flex justify-content-end mt-10">
              <button type="submit" className="btn btn-primary">
                Update Page Info
              </button></div>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PrivacyPolicy);