export interface themeProps{
        typography: string;
        version: string;
        layout: string;
        primary: string;
        headerBg: string;
        navheaderBg:string;
        sidebarBg: string;
        sidebarStyle: string;
        sidebarPosition: string;
        headerPosition: string;
        containerLayout: string;
        direction: string;
      }

const ThemeOptions:themeProps[] =[
    
 { /* Default Theme */
    typography: "poppins",
    version: "light",
    layout: "vertical",
    headerBg: "color_1",
    primary: "color_1",
    navheaderBg: "color_1",
    sidebarBg: "color_1",
    sidebarStyle: "full",
    sidebarPosition: "fixed",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},
 {
    typography: "poppins",
    version: "light",
    layout: "vertical",
    primary: "color_15",
    headerBg: "color_1",
    navheaderBg: "color_13",
    sidebarBg: "color_13",
    sidebarStyle: "full",
    sidebarPosition: "fixed",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},
 {
    typography: "poppins",
    version: "light",
    layout: "vertical",
    primary: "color_7",
    headerBg: "color_1",
    navheaderBg: "color_7",
    sidebarBg: "color_1",
    sidebarStyle: "modern",
    sidebarPosition: "static",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},

 {
    typography: "poppins",
    version: "light",
    layout: "horizontal",
    primary: "color_3",
    headerBg: "color_1",
    navheaderBg: "color_1",
    sidebarBg: "color_3",
    sidebarStyle: "full",
    sidebarPosition: "fixed",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},
 {
    typography: "poppins",
    version: "light",
    layout: "vertical",
    primary: "color_9",
    headerBg: "color_9",
    navheaderBg: "color_9",
    sidebarBg: "color_1",
    sidebarStyle: "compact",
    sidebarPosition: "fixed",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},
 {
    typography: "poppins",
    version: "light",
    layout: "vertical",
    primary: "color_7",
    headerBg: "color_1",
    navheaderBg: "color_7",
    sidebarBg: "color_7",
    sidebarStyle: "icon-hover",
    sidebarPosition: "fixed",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},
 {
    typography: "poppins",
    version: "light",
    layout: "vertical",
    primary: "color_3",
    headerBg: "color_3",
    navheaderBg: "color_1",
    sidebarBg: "color_1",
    sidebarStyle: "mini",
    sidebarPosition: "fixed",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},
 {
    typography: "poppins",
    version: "light",
    layout: "vertical",
    primary: "color_2",
    headerBg: "color_1",
    navheaderBg: "color_2",
    sidebarBg: "color_2",
    sidebarStyle: "mini",
    sidebarPosition: "fixed",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},
 {
    typography: "poppins",
    version: "light",
    layout: "vertical",
    primary: "color_2",
    headerBg: "color_14",
    navheaderBg: "color_14",
    sidebarBg: "color_2",
    sidebarStyle: "full",
    sidebarPosition: "fixed",
    headerPosition: "fixed",
    containerLayout: "full",
    direction:""
},
    
]

export default ThemeOptions;