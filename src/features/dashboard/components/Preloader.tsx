import React from 'react';
import { useSelector } from 'react-redux';
import { useIsLoading } from './PreloaderSlice';

const Preloader = () => {
  const isLoading = useSelector(useIsLoading);
  return (
    <div id="preloader" style={isLoading? undefined:{display:"none"} }>
    <div className="sk-three-bounce">
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
    </div>
</div>
  )
}

export default React.memo(Preloader)