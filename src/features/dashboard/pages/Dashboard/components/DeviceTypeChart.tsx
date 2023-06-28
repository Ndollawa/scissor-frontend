import React, { useEffect } from 'react'
import 'morris.js/morris.css'
import  'morris.js/morris'

const DeviceTypeChart = ({ data }:any) => {
  useEffect(() => {
    if (data && data.length > 0) {
    //   Create the doughnut chart
      Morris.Donut({
        element: 'device-type-chart',
        data: data,
        resize: true
      });
    }
  }, [data]);

  return <div id="device-type-chart" />;
};

export default DeviceTypeChart;
