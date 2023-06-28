import React from 'react'
import { useSelector } from 'react-redux';
import {useCompanyDetails,useDashboardConfig} from '../pages/Settings/settingsConfigSlice';


const OtherBody = ({children}:{children:React.ReactNode}) => {
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

  return (
    <>
      <div className="body vh-100" data-typography={typography} data-theme-version={version} data-layout={layout} data-nav-headerbg={headerBg} data-headerbg={navheaderBg} data-sidebar-style={sidebarStyle} data-sidebarbg={sidebarBg} data-sidebar-position={sidebarPosition} data-header-position={headerPosition} data-container={containerLayout} data-direction={direction} data-primary={primary}>
              <div className="authincation w-100 h-100">
                {children}
              </div>

          </div>
    </>
  )
}

export default React.memo(OtherBody)