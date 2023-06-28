import React from 'react'
import { NavLink,useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import OtherBody from '../dashboard/components/OtherBody'

const Error401 = () => {
    
const location = useLocation();
const from = location.state?.from ?? location.state?.from?.pathname 

  return (
   <OtherBody>
    <Helmet>
        <title>401 Error Unauthorized</title>
    </Helmet>
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-5">
                    <div className="form-input-content text-center error-page">
                        <h1 className="error-text font-weight-bold">401</h1>
                        <h4><i className="fa fa-thumbs-down text-danger"></i> Bad Request</h4>
                        <p>Oppps!!!, Your Login session has expired.<br/> Please log back in</p>
						<div>
                            <NavLink className="btn btn-primary" to="/auth/login" replace state={{ from: location.pathname }}>
                                Login
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </OtherBody>
  )
}

export default React.memo(Error401)
