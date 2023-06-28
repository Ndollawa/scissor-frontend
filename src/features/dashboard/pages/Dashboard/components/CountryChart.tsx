import React, { useEffect } from 'react';
// import { useChart } from '@amcharts/amcharts5/react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";


const CountryChart = () => {
    useEffect(()=>{
        const chartDiv = document.getElementById("chartdiv")!
     let root = am5.Root.new(chartDiv); 
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1()
  })
); 
let polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"]
    })
  );  
    },[])


  return (
    <div>
      <h2>Visited Countries Map</h2>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}  />
    </div>
  );
};

export default CountryChart;
