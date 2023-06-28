import React from 'react'
import OtherBody from '../dashboard/components/OtherBody'
import { useNavigate, useLocation } from 'react-router-dom'



const Error404 = () => {
    const navigate =useNavigate()   
const location = useLocation();
const from = location.state?.from ?? location.state?.from?.pathname ?? '/';
// console.log(location)
  return (
  <OtherBody>
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-8">
                    <div className="form-input-content text-center error-page">
                        <h1 className="error-text font-weight-bold">404</h1>
                        <h4><i className="fa fa-exclamation-triangle text-warning"></i> The page you were looking for is not found!</h4>
                        <p>You may have mistyped the address or the page may have moved.</p>
						<div>
                            <button className="btn btn-primary" onClick={()=>navigate(from)}>Click to go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</OtherBody>
  )
}

export default React.memo(Error404)
