import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import pageProps from '../../../app/utils/props/pageProps';


const Header:React.FC<pageProps> = ({pageData}:pageProps) => {
    // const {companyData, homeSettings} = useContext(DataContext); 
	// const {siteName,logo,logoDark,email,contact,address,activeHours,facebookHandle,twitterHandle,instagram,whatsapp} = companyData!
  return (
    <>
   
   <div className="header">
            <div className="header-content">
                <Nav pageData={pageData}/>
				<div className="sub-header">
					<div className="d-flex align-items-center flex-wrap me-auto">
						<h5 className="dashboard_bar">{pageData?.pageTitle}</h5>
					</div>
					<div className="d-flex align-items-center">
						<Link to="" className="btn btn-xs btn-primary light me-1">Today</Link>
						<Link to="" className="btn btn-xs btn-primary light me-1">Month</Link>
						<Link to="" className="btn btn-xs btn-primary light">Year</Link>
					</div>
				</div>
			</div>
        </div>
    </>
  )
}

export default React.memo(Header)