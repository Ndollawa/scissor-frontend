import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../../../app/stores/store';
import { settingsProps } from '../../../../app/utils/props/settingsProps';

enum Styles{STYLE_1=1,STYLE_2, STYLE_3};
const initialState:settingsProps = {
        _id:"",
        landingPageConfig:{
            showBlog:false,
            showAffiliate:false,
            showTestimonial:false,
            navStyle:Styles.STYLE_1,
            sliderStyle:Styles.STYLE_1,
            aboutStyle:Styles.STYLE_1,
            testimonialStyle:Styles.STYLE_1,
            serviceStyle:Styles.STYLE_1,
            ourBenefitStyle:Styles.STYLE_2,
            whatWeOfferStyle:Styles.STYLE_1
        },
        dashboardConfig:{
            layoutOptions: {
            typography: "",
            version: "",
            layout: "",
            headerBg: "",
            primary: "",
            navheaderBg: "",
            sidebarBg: "",
            sidebarStyle: "",
            sidebarPosition: "",
            headerPosition: "",
            containerLayout: "",
            direction: ''

            }
        },
        companyDetails:{
            siteName:'',
            city:'',
            state:'',
            country:'',
            zip:'',
            description:'',
            email:[],
            contact:[],
            address:'',
            activeHours:'',
            socialMedia:{
            facebookHandle:'',
            twitterHandle:'',
            instagram:'',
            whatsapp:''
        } ,
        },  
        siteImages:{
            logo:'',
            logoIcon:'',
            logoDark:'',
            favicon:'',
            backgroundImage:'',
            aboutUsBg:'',
            pagesBg:'',
        },
        pages:{
            aboutUs:'',
            privacyPolicy:'',
            termsCondition:''
        }
}


export const settingsConfigSlice = createSlice({
    name:'settingsConfig',
    initialState,
    reducers:{
        setSettings:(state,action)=>{
            // console.log(action.payload);
            return action.payload
            // console.log(state);
        },
        setAppGeneralSetting:(state,action)=>{
            // const {}=action.payload;
            state.companyDetails={ ...state.companyDetails, ...action.payload };
        },
        setDashboardSetting:(state,action)=>{
            // console.log(action.payload)
            state.dashboardConfig.layoutOptions ={ ...state.dashboardConfig.layoutOptions, ...action.payload};
        },
        setPagesSetting:(state,action)=>{
            // const {}=action.payload;
            state.pages={...state.pages,...action.payload}
        },
        setAppHomepageSetting:(state,action)=>{
            // const {}=action.payload;
            state.landingPageConfig={...state.landingPageConfig,...action.payload}
        },
    

    }
})

export const useCompanyDetails = (state:RootState)=>state.settingsConfig.companyDetails;
export const useLandingPageConfig = (state:RootState)=>state.settingsConfig.landingPageConfig;
export const useDashboardConfig = (state:RootState)=>state.settingsConfig.dashboardConfig;
export const useSiteImages = (state:RootState)=>state.settingsConfig.siteImages;
export const usePages = (state:RootState)=>state.settingsConfig.pages;
export const useSettings = (state:RootState)=>state.settingsConfig
export const {setAppGeneralSetting,setDashboardSetting,setPagesSetting,setAppHomepageSetting,setSettings} = settingsConfigSlice.actions;
export default settingsConfigSlice.reducer;