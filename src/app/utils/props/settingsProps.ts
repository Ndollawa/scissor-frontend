export interface settingsProps{
    _id:string;
    landingPageConfig:{
        showBlog:boolean;
        showAffiliate:boolean;
        showTestimonial:boolean;
        navStyle:number;
        sliderStyle:number;
        aboutStyle:number;
        testimonialStyle:number;
        serviceStyle:number;
        ourBenefitStyle:number;
        whatWeOfferStyle:number;    },
    dashboardConfig:{
        layoutOptions: {
        typography: string;
        version: string;
        layout: string;
        headerBg: string;
        primary: string;
        navheaderBg: string;
        sidebarBg: string;
        sidebarStyle: string;
        sidebarPosition: string;
        headerPosition: string;
        containerLayout: string;
        direction: string;
        }
    },
    companyDetails:{
        siteName:string;
        city:string;
        state:string;
        country:string;
        zip:string;
        description:string;
        email:string[],
        contact:string[],
        address:string;
        activeHours:string;
        socialMedia:{
        facebookHandle:string;
        twitterHandle:string;
        instagram:string;
        whatsapp:string;    } ,
    },  
    siteImages:{
        logo:string;
        logoIcon:string;
        logoDark:string;
        favicon:string;
        backgroundImage:string;
        aboutUsBg:string;
        pagesBg:string;
    },
    pages:{
        aboutUs:string;
        privacyPolicy:string;
        termsCondition:string;    }

}