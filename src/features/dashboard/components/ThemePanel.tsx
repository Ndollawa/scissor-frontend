import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDashboardConfigSettingsMutation } from "../pages/Settings/settingApiSlice";
import { setDashboardSetting } from '../pages/Settings/settingsConfigSlice';
import $ from 'jquery';
import ThemeOptions from "./Themes/ThemeOptions";
import { themeProps } from "./Themes/ThemeOptions";
import { useSettings} from "../pages/Settings/settingsConfigSlice";
import { useSelector } from "react-redux";


const ThemePanel = () => {
const dispatch = useDispatch();
const [dashboardConfigSetting,isLoading] = useDashboardConfigSettingsMutation();
 const settings = useSelector(useSettings)
 const {_id} =settings
const [toggleThemePanel, setToggleThemePanel] = React.useState(false);
useEffect(() => {
  $(document).on('click', '.dz_theme_demo', function(){
  var data = {...ThemeOptions[Number($(this).data('theme'))],direction:"ltr"};
  // console.log(Theme);

  (async()=>{
    try {
         await dashboardConfigSetting({_id,data}).unwrap();
         dispatch(setDashboardSetting(data))
       } catch (error) {
        console.log(error) 
       }
 })(); 
});


$(document).on('click', '.dz_theme_demo_rtl', function(){
  var data = {...ThemeOptions[Number($(this).data('theme'))],direction:"rtl"};
  // console.log(Theme);

  (async()=>{
    try {
         await dashboardConfigSetting({_id,data}).unwrap();
         dispatch(setDashboardSetting(data))
       } catch (error) {
        console.log(error) 
       }
 })(); 
});

  return () => {
   $('dz_theme_demo').off();
   $('dz_theme_demo_rtl').off();}
}, [])


const themesArray =[
"/dashboard-assets/images/themes/pic1.jpg",
"/dashboard-assets/images/themes/pic2.jpg",
"/dashboard-assets/images/themes/pic3.jpg",
"/dashboard-assets/images/themes/pic4.jpg",
"/dashboard-assets/images/themes/pic5.jpg",
"/dashboard-assets/images/themes/pic6.jpg",
"/dashboard-assets/images/themes/pic7.jpg",
"/dashboard-assets/images/themes/pic8.jpg"
]

const themes = themesArray.map((themeImage:string,i:number)=>{
  return (

<div key={i} className="col-xl-3 col-md-6 mb-4">
<div className="overlay-bx rounded-lg dz-demo-bx">
  <div className="overlay-wrapper rounded-lg">
    <img src={themeImage} alt="" className="w-100" />
  </div>
  <div className="overlay-layer">
    <Link
    to=""
    role="button"
      data-theme={(i +1)}
      className="btn dz_theme_demo btn-secondary btn-sm me-2"
    >
      Default
    </Link>
    <Link
    to=""
    role="button"
      data-theme={(i +1)}      className="btn dz_theme_demo_rtl btn-info btn-sm"
    >
      RTL Version
    </Link>
  </div>
</div>
<h5 className="text-white">Theme {(i +1)}</h5>
</div>
  )
})

// const deleteAllCookie = ()=>{

// }

// const themeChange = (theme:number, direction:string)=>{
//   var themeSettings:themeProps;
//   themeSettings = ThemeOptions[theme];
//   themeSettings.direction = direction;
//   // dezSettingsOptions = themeSettings; /* For Screen Resize */
//   // new dezSettings(themeSettings);
  
//   // setThemeInCookie(themeSettings);
// }
  return (
    <>
      <div className={toggleThemePanel?"dz-demo-panel show":"dz-demo-panel"}>
        <div className="bg-close"></div>
        <Link
          className="dz-demo-trigger"
          data-bs-toggle="tooltip"
          data-placement="right"
          data-original-title="Check out more demos"
          to=""
          role="button"
          onClick={()=>setToggleThemePanel(prev=> !prev)}
        >
          <span>
            <i className="las la-tint"></i>
          </span>
        </Link>
        <div className="dz-demo-inner">
          {/* <Link
            to=""
            role="button"
            className="btn btn-primary btn-sm px-2 py-1 mb-3"
            onClick={deleteAllCookie}
          >
            Delete All Cookie
          </Link> */}
          <div className="dz-demo-header">
            <h3 className="text-white">Select Theme</h3>
            <Link className="dz-demo-close" to="" role="button"  onClick={()=>setToggleThemePanel(false)}>
              <span>
                <i className="las la-times"></i>
              </span>
            </Link>
          </div>
          <div className="dz-demo-content">
            <div className="dz-wrapper row">
              
              {themes}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemePanel;
