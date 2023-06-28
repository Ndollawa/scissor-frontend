import React from 'react';
import OtherBody from '../dashboard/components/OtherBody';
import { useNavigate } from 'react-router-dom'



const Error503 = () => {
    const navigate =useNavigate()
  return (
    <OtherBody>
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-5">
                    <div className="form-input-content text-center error-page">
                        <h1 className="error-text font-weight-bold">503</h1>
                        <h4><i className="fa fa-times-circle text-danger"></i> Service Unavailable</h4>
                        <p>Sorry, we are under maintenance!</p>
						<div>
                            <button className="btn btn-primary" onClick={()=>navigate(-2)}>Click to go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </OtherBody>
  )
}

export default React.memo(Error503)
