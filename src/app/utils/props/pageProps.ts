// enum sliderStyles {STYLE_1, STYL2, STYLE_3}
// enum aboutUsStyles {STYLE_1, STYL2, STYLE_3}
// enum ourServicesStyles {STYLE_1, STYL2, STYLE_3}
// enum testimonialsStyles {STYLE_1, STYL2, STYLE_3}
// enum whyUsStyles {STYLE_1, STYL2, STYLE_3}
// enum blogStyles {STYLE_1, STYL2, STYLE_3}
enum homeStyles {STYLE_1, STYL2, STYLE_3}
enum Styles{STYLE_1,STYLE_2, STYLE_3};
   
export default interface pageProps{
    pageData?:{
    pageTitle:string,
    coverImage?:string
  },
  homeSettings?:{
    // sliderStyle:sliderStyles,
    // aboutUsStyle:aboutUsStyles,
    // servicesStyle:ourServicesStyles,
    // testimonialStyle:testimonialsStyles,
    // blogStyle:blogStyles,
    // whyUsStyle:whyUsStyles,
    navStyle: Styles,
    homeStyle:homeStyles
  },
  companyData?:{
    siteName:string,
    description?:string,
    logo:string
    logoDark:string,
    email:string[],
    contact:string[],
    address:string,
    activeHours:string,
    facebookHandle:string,
    twitterHandle:string,
    instagram:string,
    whatsapp:string
  }
  }