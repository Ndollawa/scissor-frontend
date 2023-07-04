import React, { useEffect } from 'react'
import 'morris.js/morris.css'
import  'morris.js/morris'
import Raphael from 'raphael';

const DeviceTypeChart = ({ data }:any) => {
  useEffect(() => {
    if (data && data.length > 0) {
 
    Morris.Donut({
      element: 'device-type-chart',
      data: data,
      resize: true,
      colors: ['#EB8153', 'rgb(255, 92, 0)', '#6418C3'],
      //responsive:true,
      
    });
  }
  }, []);

  return <div id="device-type-chart" />;
};

export default DeviceTypeChart;
