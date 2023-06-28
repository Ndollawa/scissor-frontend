import React from 'react'
import { Link } from 'react-router-dom'
import OtherBody from '../dashboard/components/OtherBody'

const LockScreen = () => {
  return (
    <OtherBody>
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                    <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                                <div className="auth-form">
									<div className="text-center mb-3">
										<Link to="/" className="brand-logo">
											
										</Link>
									</div>
                                    <h4 className="text-center mb-4">Account Locked</h4>
                                    <form action="/">
                                        <div className="form-group">
                                            <label><strong>Password</strong></label>
                                            <input type="password" className="form-control" value="Password"/>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary btn-block">Unlock</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </OtherBody>
  )
}

export default LockScreen