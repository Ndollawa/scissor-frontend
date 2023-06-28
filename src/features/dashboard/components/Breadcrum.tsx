import React from 'react'
import pageProps from '../../../app/utils/props/pageProps'
import useTitle from '../../../app/utils/hooks/useTitle';


const Breadcrum:React.FC<pageProps> = ({pageData}:pageProps) => {
    const {pageTitle,coverImage}= pageData!;
    useTitle(`${pageTitle}`)
  return (

    <div className="row page-titles">
    <ul className="breadcrumb">
        <li className="breadcrumb active">{pageTitle}</li> 
    </ul>
</div>
   
  )
}

export default React.memo(Breadcrum)
