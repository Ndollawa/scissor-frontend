   import pageProps from "./props/pageProps"

   enum Styles{STYLE_1,STYLE_2, STYLE_3};
   enum homeStyles {STYLE_1, STYL2, STYLE_3}
   const siteInfo:pageProps ={
        companyData:{ 
                 siteName:"PayBuddie",
                 logo:"",
                 logoDark:"",
                 description:"",
                 email:["paybuddie@support.com"],
                 contact:['08155393750'],
                 address:"14 Etta Agbor Road Calabar, CRS",
                 activeHours:"Mon - Fri: 7:00am - 6:00pm  Saturday: 9:00am - 5:00pm  Sunday: Closed",
                 facebookHandle:"https://www.facebook.com/paybuddie",
                 twitterHandle:"https://www.twitter.com/paybuddie",
                 instagram:"https://www.instagram.com/paybuddie",
                 whatsapp:"https://www.whatsapp.com/paybuddie"
             },
             homeSettings:{
                navStyle:Styles.STYLE_1,
                homeStyle:homeStyles.STYLE_1
             }

         }
 export default siteInfo;