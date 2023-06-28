import React,{useState,useEffect, ReactNode} from "react";
import { Link } from "react-router-dom";
import $ from 'jquery'
import Preloader from "./Preloader";
import { useIsLoading } from "./PreloaderSlice";
import Header from "./Header";
import SideBar from "./SideBar";
// import Chatbox from "./ChatBox";
import Footer from "./Footer";
import { useSelector } from 'react-redux';
import {useCompanyDetails,useDashboardConfig, useSiteImages} from '../pages/Settings/settingsConfigSlice';
import { selectCurrentUser } from "../../auth/authSlice";
import useWindowSize from "../../../app/utils/hooks/useWindowSize";
import AppSettings from "./AppSettings";
import ThemePanel from "./ThemePanel";
// import useUserActivity from "../../../app/utils/hooks/useUserActivity";


const MainBody = ({children}:{children:React.ReactNode}) => {
const currentUser = useSelector(selectCurrentUser)
// useUserActivity()
    const isLoading = useSelector(useIsLoading);
    // console.log(isLoading)
    const [isToggled,setIsToggled] = useState(false);
    const {width, height} =useWindowSize();  
const pageData ={
    pageTitle: 'Dashboard'
}
const {siteName} = useSelector(useCompanyDetails);
const {logo,favicon,logoDark} = useSelector(useSiteImages);
const {layoutOptions} = useSelector(useDashboardConfig);
const {
    typography,
    version,
    layout,
    headerBg,
    primary,
    navheaderBg,
    sidebarBg,
    sidebarStyle,
    sidebarPosition,
    headerPosition,
    containerLayout,
    direction
} = layoutOptions;

const toggleMenu = ()=>{
setIsToggled(prev=> !prev);

}
let menuWrapperStyle = isToggled? "menu-toggle " : " ";
menuWrapperStyle += !isLoading ? " show" :" ";


useEffect(() => {
var body = $('#body');
var html = $('html');
    if(width! < 1200) {
        body.attr("data-layout", "vertical");
        body.attr("data-container", "wide");
    }

    if(width! > 767 && width! < 1200) {
        body.attr("data-sidebar-style", "mini");
    }

    if(width! < 768) {
        body.attr("data-sidebar-style", "overlay");
    }
//   return () => {
//     effect
//   };
}, [width])

var handleMiniSidebar = function() {
    $("ul#menu>li").on('click', function() {
        const sidebarStyle = $('#body').attr('data-sidebar-style');
        if (sidebarStyle === 'mini') {
            // console.log($(this).find('ul'))
            $(this).find('ul').stop()
        }
    })
}
handleMiniSidebar()

var handleMinHeight = function() {
    var win_h = window.outerHeight;
    var win_h = window.outerHeight;
    if (win_h > 0 ? win_h : height) {
        $(".content-body").css("min-height", (win_h + 60) + "px");
    };
}
handleMinHeight()

var handleHeaderHight = function() {
    const headerHight = $('.header').innerHeight();
    $(window).scroll(function() {
        if ($('#body').attr('data-layout') === "horizontal" && $('#body').attr('data-header-position') === "static" && $('#body').attr('data-sidebar-position') === "fixed")
            $(this.window).scrollTop()! >= headerHight! ? $('.deznav').addClass('fixed') : $('.deznav').removeClass('fixed')
    });
}
handleHeaderHight()


  return (
   <>
   <div  id="body" data-typography={typography} data-theme-version={version} data-layout={layout} data-nav-headerbg={headerBg} data-headerbg={navheaderBg} data-sidebar-style={sidebarStyle} data-sidebarbg={sidebarBg} data-sidebar-position={sidebarPosition} data-header-position={headerPosition} data-container={containerLayout} data-direction={direction} data-primary={primary}>

{/* <!--*******************
    Preloader startdirection={direction}
********************--> */}
<Preloader/>
{/* <!--*******************
    Preloader end
********************-->

<!--**********************************
    Main wrapper start
***********************************-->className="show menu-toggle" */}
<div id="main-wrapper" className={ menuWrapperStyle} >
{/* 
    <!--**********************************
        Nav header start
    ***********************************--> */}
           <div className="nav-header">
            <Link to="/dashboard" className="brand-logo">
             { (favicon && logo && logoDark)?  (isToggled || width! < 728 || sidebarStyle === 'mini') ?<img src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+favicon} alt={siteName} width='30'/> :<img src={version === 'dark'? process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logoDark : process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logo} alt={siteName} width='150'/>
              : <h3 className={`${(isToggled || width! < 728 || sidebarStyle === 'mini') ? 'fs-16 ' : 'fs-36 '}font-weight-9000 text-secondary`}>{siteName}</h3> } 
          </Link>

            <div className="nav-control">
                <div className={isToggled?"hamburger is-active": "hamburger"} onClick={toggleMenu}>
                    <span className="line"></span><span className="line"></span><span className="line"></span>
                </div>
            </div>
        </div>
        {/* <!--**********************************
            Nav header end
        ***********************************--> */}
	    {/* <!--**********************************
            Chat box Start
        ***********************************--> */}
          {/* <Chatbox/> */}
        {/* <!--**********************************
            Chat box End
        ***********************************--> */}
        <Header />
        <SideBar />
        	
		{/* <!--**********************************
            Content body start
        ***********************************--> */}
        {/* <Breadcrum /> */}
        <div className="content-body" style={{position:'relative',height:'fit-content(100%)'}}>
			
				
            {children}
   
        </div>
      </div>
        {/* <AppSettings/>
        <ThemePanel/> */}
    </div>
    <Footer />
   </>
  )
}

export default React.memo(MainBody)

