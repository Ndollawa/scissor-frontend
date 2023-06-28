import React from 'react'
import { Link } from 'react-router-dom'

const PageHeading = ({pageHeading}:{pageHeading:string}) => {
  return (
    <div className="form-head mb-sm-5 mb-3 d-flex flex-wrap align-items-center">
					<h2 className="font-w600 title mb-2 me-auto ">{pageHeading}</h2>
					<div className="weather-btn mb-2">
						<span className="me-3 font-w600 text-black"><i className="fa fa-cloud me-2"></i>21</span>
						<select className="form-control style-1 default-select  me-3 ">
							{/* <option>Medan, IDN</option>
							<option>Jakarta, IDN</option>
							<option>Surabaya, IDN</option> */}
						</select>
					</div>
					<Link to="" role="button" className="btn btn-secondary mb-2"><i className="las la-calendar scale5 me-3"></i>Filter Period</Link>
				</div>
  )
}

export default React.memo(PageHeading)